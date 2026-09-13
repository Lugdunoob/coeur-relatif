#!/usr/bin/env python3
"""Génère docs/etat.md : la seule page à ouvrir pour savoir où en est l'idée.
Lu depuis les fichiers, jamais saisi à la main. Sans dépendance externe."""
import re, sys, pathlib, datetime as dt
root = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else '.')
now = dt.datetime.now(dt.timezone.utc)

def head(md):
    m = re.match(r'---\n(.*?)\n---', md, re.S)
    d = {}
    if m:
        for line in m.group(1).splitlines():
            if ':' in line:
                k, v = line.split(':', 1); d[k.strip()] = v.strip().strip('"')
    return d

def section(md, title):
    m = re.search(rf'^## {re.escape(title)}\n(.*?)(?=^## |\Z)', md, re.S | re.M)
    return m.group(1).strip() if m else ''

def parse_dt(s):
    try: return dt.datetime.fromisoformat(s.replace('Z', '+00:00'))
    except Exception: return None

cartes = []
for f in sorted((root / 'docs/cartes').glob('*.md')):
    md = f.read_text(); h = head(md)
    if not h.get('carte'): continue
    veto = parse_dt(h.get('veto_jusqu_au', ''))
    journal = section(md, 'Journal de décision')
    decision = next((l.strip('- *') for l in journal.splitlines() if l.strip().startswith('- **Décision')), '')
    a_trancher = [l for l in section(md, 'Résumé de fin de carte').splitlines() if 'À trancher' in l]
    cartes.append(dict(f=f, **h, veto=veto, decision=decision.replace('Décision** : ', ''), a_trancher=a_trancher))

def prog(c):
    n = c['nom'].lower()
    if c['carte'] in ('01', '02', '03'): return 'A cadrage'
    if c['carte'] in ('04', '05', '06'): return 'B plan'
    if 'lot' in n: return 'C lots'
    if 'recette' in n: return 'Recette (fondateur)'
    if 'retro' in n or 'rétro' in n: return 'Rétro'
    return 'D pilote'

ICON = {'a_faire': '·', 'en_cours': '…', 'review': '?', 'changements_demandes': '↩', 'approuvee': '✓', 'vetoee': '✗'}
out = [f"# État de l'idée\n\n_Généré le {now:%Y-%m-%d %H:%M} UTC par `scripts/etat.py`. Ne pas éditer._\n"]

ouverts = [c for c in cartes if c.get('statut') == 'approuvee' and c['veto'] and c['veto'] > now]
out.append("## Veto possible maintenant\n")
if ouverts:
    for c in ouverts:
        reste = c['veto'] - now
        out.append(f"- **Carte {c['carte']} {c['nom']}** : encore {reste.seconds // 3600 + reste.days * 24} h. Décision : {c['decision'] or '(voir la carte)'}. `/regie:veto {c['carte']} <raison>`")
else:
    out.append("- Aucune fenêtre ouverte.")

bloques = [c for c in cartes if c.get('statut') in ('changements_demandes',)]
if (root / 'BLOCKED.md').exists():
    out.append("\n## Bloqué\n\n- `BLOCKED.md` existe : une décision t'attend, ou un obstacle. Lis-le, tranche, relance le loop.")

out.append("\n## Où on en est\n")
out.append("| Programme | Carte | Agent | Statut | Décision |")
out.append("|---|---|---|---|---|")
for c in cartes:
    out.append(f"| {prog(c)} | {c['carte']} {c['nom']} | {c.get('agent','')} | {ICON.get(c.get('statut',''),'')} {c.get('statut','')} | {c['decision'][:90]} |")

encours = [c for c in cartes if c.get('statut') not in ('approuvee', 'vetoee')]
out.append("\n## Prochaines étapes\n")
for c in encours[:3]:
    out.append(f"- Carte {c['carte']} {c['nom']} ({c.get('agent','')}) : {c.get('porte','')}")
if not encours: out.append("- Toutes les cartes connues sont closes. Programme suivant dans `docs/programme.md`.")

at = [(c, l) for c in cartes for l in c['a_trancher'] if 'aucun' not in l.lower()]
if at:
    out.append("\n## À trancher (notes des agents, non bloquantes)\n")
    for c, l in at[:10]: out.append(f"- Carte {c['carte']} : {l.strip('- ').replace('**À trancher** : ', '')}")

ml = list(root.glob('.loop/*-method-log.md'))
if ml:
    lignes = [l for l in ml[0].read_text().splitlines() if l.strip()]
    gen = [l for l in lignes if 'GENERIQUE' in l]
    out.append(f"\n## Méthode\n\n- {len(lignes)} ajustements de méthode journalisés, dont {len(gen)} marqués génériques pour la prochaine rétro.")

retros = sorted(root.glob('docs/retro-*.md'))
if retros:
    out.append("\n## Rétros\n")
    for r in retros: out.append(f"- `{r.name}`")

out.append("\n## Feuille de route\n\nVoir `docs/programme.md` (loops, ordre, état) et les jalons GitHub si le miroir est activé.")
(root / 'docs/etat.md').write_text('\n'.join(out) + '\n')
print(f"docs/etat.md : {len(cartes)} cartes, {len(ouverts)} veto ouverts")
