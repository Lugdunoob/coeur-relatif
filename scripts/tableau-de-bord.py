#!/usr/bin/env python3
"""Génère le tableau de bord : docs/tableau-de-bord/index.html + data.json.
Lit uniquement les fichiers du dépôt. Neutre : aucune décision, aucune opinion,
seulement ce qui est écrit. Usage : python3 scripts/tableau-de-bord.py [racine]
"""
import re, json, pathlib, subprocess, sys, datetime as dt

root = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else '.')

def sh(*args):
    return subprocess.run(list(args), cwd=str(root), capture_output=True, text=True).stdout.strip()

def head(md):
    m = re.match(r'---\n(.*?)\n---', md, re.S)
    d = {}
    if m:
        for line in m.group(1).splitlines():
            if ':' in line:
                k, v = line.split(':', 1)
                d[k.strip()] = v.strip().strip('"')
    return d

def section(md, title):
    m = re.search(rf'^## {re.escape(title)}\n(.*?)(?=^## |\Z)', md, re.S | re.M)
    return m.group(1).strip() if m else ''

def json_block(md):
    m = re.search(r'```json\n(.*?)\n```', md, re.S)
    if not m: return {}
    try: return json.loads(m.group(1))
    except Exception: return {}

now = dt.datetime.now(dt.timezone.utc).replace(microsecond=0)

# ---------- cartes ----------
cartes = []
for f in sorted(root.glob('docs/cartes/*.md')):
    md = f.read_text()
    h = head(md)
    journal = section(md, 'Journal de décision')
    challenge = section(md, 'Challenge')
    reponses = section(md, 'Réponses de l\'auteur')
    a_trancher_matches = [re.sub(r'\s+', ' ', m).strip() for m in re.findall(r'\*\*À trancher\*\*\s*:\s*(.+?)(?=\n-\s\*\*|\Z)', section(md, 'Résumé de fin de carte'), re.S)]
    meta = json_block(md)
    veto = h.get('veto_jusqu_au', '')
    veto_dt = None
    try: veto_dt = dt.datetime.fromisoformat(veto.replace('Z', '+00:00'))
    except Exception: pass
    cartes.append({
        'carte': h.get('carte'), 'nom': h.get('nom'), 'agent': h.get('agent'),
        'statut': h.get('statut'), 'veto_jusqu_au': veto, 'approuvee_le': h.get('approuvee_le'),
        'livrable': h.get('livrable'), 'porte': h.get('porte'),
        'journal': journal, 'challenge': challenge, 'reponses': reponses,
        'a_trancher': [a.strip() for a in a_trancher_matches
                       if a.strip() and not re.match(r'^(rien|aucune?)\b', a.strip().lower())],
        'veto_ouvert': bool(veto_dt and veto_dt > now),
        'metadata': meta,
    })

# ---------- décisions à prendre (fait, pas jugement) ----------
a_prendre = []
for c in cartes:
    if c['veto_ouvert']:
        a_prendre.append({'type': 'veto', 'carte': c['carte'], 'nom': c['nom'],
                           'texte': f"Fenêtre de veto ouverte jusqu'au {c['veto_jusqu_au']}.", 'veto_jusqu_au': c['veto_jusqu_au']})
    for a in c['a_trancher']:
        a_prendre.append({'type': 'a_trancher', 'carte': c['carte'], 'nom': c['nom'], 'texte': a})
if (root / 'BLOCKED.md').exists():
    a_prendre.append({'type': 'bloque', 'carte': None, 'nom': 'Blocage', 'texte': (root / 'BLOCKED.md').read_text()[:600]})

# ---------- produit : cadrage, exigences, spec ----------
# Les metadata structurées vivent dans la carte qui a produit le document, pas dans
# le document final lui-même (docs/cadrage.md, docs/exigences.md, docs/spec.md sont
# de la prose ; docs/cartes/NN-*.md porte le bloc JSON).
def lire_meta_carte(numero):
    for f in root.glob(f'docs/cartes/{numero}-*.md'):
        return json_block(f.read_text())
    return {}

produit = {
    'cadrage': lire_meta_carte('01'),
    'exigences': lire_meta_carte('02'),
    'spec': lire_meta_carte('03'),
}

# ---------- lots, depuis docs/lots.md ----------
lots_md = (root / 'docs/lots.md').read_text() if (root / 'docs/lots.md').exists() else ''
lots = []
for m in re.finditer(r'## (Lot \d+[^\n]*)\n\*\*Critères\*\* : ([^\n]*?)\.\n', lots_md):
    titre = m.group(1).strip()
    crits = [c.strip().rstrip('.') for c in m.group(2).replace('aucun', '').split(',') if c.strip()]
    lots.append({'titre': titre, 'criteres': crits})

# ---------- critères verts : vérité terrain, en exécutant vraiment les tests ----------
# (pas une inférence depuis git : le fait qu'un test passe ou non, ici, maintenant)
criteres_ids = []
m6 = root / 'docs/cartes/06-tests-acceptation.md'
if m6.exists():
    criteres_ids = json_block(m6.read_text()).get('criteres_couverts', [])

# correspondance CA -> fichier de test, depuis docs/test-plan.md
test_plan = (root / 'docs/test-plan.md').read_text() if (root / 'docs/test-plan.md').exists() else ''
ca_vers_fichier = {}
for row in re.finditer(r'\|\s*(CA-[\w-]+)\s*\|[^|]*\|\s*`([^`]+)`\s*\|', test_plan):
    ca_vers_fichier[row.group(1)] = row.group(2)

fichiers_ok = set()
vitest_json = root / '.tableau-de-bord-vitest.json'
subprocess.run(['npx', 'vitest', 'run', '--reporter=json', f'--outputFile={vitest_json.name}'],
               cwd=str(root), capture_output=True, text=True)
try:
    vres = json.loads(vitest_json.read_text())
    for tf in vres.get('testResults', []):
        rel = 'test/' + pathlib.Path(tf['name']).name
        if tf.get('status') == 'passed' or (tf.get('assertionResults') and all(a['status'] == 'passed' for a in tf['assertionResults'])):
            fichiers_ok.add(rel)
finally:
    vitest_json.unlink(missing_ok=True)

verts = [ca for ca, fichier in ca_vers_fichier.items() if fichier in fichiers_ok]
for l in lots:
    couverts = [c for c in l['criteres'] if c]
    if couverts and all(c in verts for c in couverts):
        l['statut'] = 'termine'
    elif any(c in verts for c in couverts):
        l['statut'] = 'en_cours'
    else:
        l['statut'] = 'a_faire'

commits = sh('git', 'log', '--oneline', '-20').splitlines()

data = {
    'idee': 'Cœur relatif',
    'depot': 'Lugdunoob/coeur-relatif',
    'genere_le': now.isoformat(),
    'a_prendre': a_prendre,
    'cartes': cartes,
    'produit': produit,
    'lots': lots,
    'criteres_ids': criteres_ids,
    'criteres_verts': verts,
    'commits': commits,
}
out_dir = root / 'docs/tableau-de-bord'
out_dir.mkdir(parents=True, exist_ok=True)
(out_dir / 'data.json').write_text(json.dumps(data, ensure_ascii=False, indent=2))
print(f"data.json : {len(cartes)} cartes, {len(a_prendre)} décisions à prendre, {len(verts)}/{len(criteres_ids)} critères verts")
