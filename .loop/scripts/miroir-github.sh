#!/usr/bin/env bash
# Miroir à sens unique : chaque carte devient une issue GitHub, chaque programme un jalon.
# Les fichiers restent la vérité ; les issues servent à suivre et à être notifié sur téléphone.
# Idempotent. Nécessite `gh` authentifié et un remote GitHub. Usage : bash scripts/miroir-github.sh
set -euo pipefail
command -v gh >/dev/null || { echo "gh absent, miroir ignoré"; exit 0; }
gh repo view >/dev/null 2>&1 || { echo "pas de remote GitHub, miroir ignoré"; exit 0; }
for m in "A cadrage" "B plan" "C lots" "D pilote"; do
  gh api -X GET repos/{owner}/{repo}/milestones -f state=all --jq '.[].title' | grep -qx "$m" || gh api -X POST repos/{owner}/{repo}/milestones -f title="$m" >/dev/null
done
for l in statut:a_faire statut:en_cours statut:review statut:changements_demandes statut:approuvee statut:vetoee veto-ouvert; do
  gh label create "$l" --force >/dev/null 2>&1 || true
done
now=$(date -u +%Y-%m-%dT%H:%M)
for f in docs/cartes/*.md; do
  nn=$(sed -n 's/^carte: *//p' "$f" | head -1); [ -z "$nn" ] && continue
  nom=$(sed -n 's/^nom: *//p' "$f" | head -1); agent=$(sed -n 's/^agent: *//p' "$f" | head -1)
  statut=$(sed -n 's/^statut: *//p' "$f" | head -1); porte=$(sed -n 's/^porte: *//p' "$f" | head -1 | tr -d '"')
  veto=$(sed -n 's/^veto_jusqu_au: *//p' "$f" | head -1)
  case "$nn" in 01|02|03) ms="A cadrage";; 04|05|06) ms="B plan";; *) case "$nom" in *[Ll]ot*) ms="C lots";; *) ms="D pilote";; esac;; esac
  titre="Carte $nn · $nom"
  body="Fichier : \`$f\` · Agent : \`$agent\` · Porte : $porte"$'\n'"Statut : **$statut**"$'\n'"Veto jusqu'au : ${veto:-—}"$'\n\n'"Pour annuler dans la fenêtre : \`/regie:veto $nn <raison>\`. Ce miroir est généré, ne pas éditer."
  num=$(gh issue list --state all --search "\"$titre\" in:title" --json number,title --jq ".[] | select(.title==\"$titre\") | .number" | head -1)
  labels="statut:$statut"; [ -n "$veto" ] && [[ "$veto" > "$now" ]] && [ "$statut" = approuvee ] && labels="$labels,veto-ouvert"
  if [ -z "$num" ]; then
    gh issue create --title "$titre" --body "$body" --milestone "$ms" --label "$labels" >/dev/null && echo "créée : $titre"
  else
    gh issue edit "$num" --body "$body" --milestone "$ms" >/dev/null
    for l in statut:a_faire statut:en_cours statut:review statut:changements_demandes statut:approuvee statut:vetoee veto-ouvert; do gh issue edit "$num" --remove-label "$l" >/dev/null 2>&1 || true; done
    gh issue edit "$num" --add-label "$labels" >/dev/null
    if [ "$statut" = approuvee ] && [ -n "$veto" ] && [[ "$veto" < "$now" ]]; then gh issue close "$num" >/dev/null 2>&1 || true; fi
    [ "$statut" = vetoee ] && gh issue close "$num" --reason "not planned" >/dev/null 2>&1 || true
  fi
done
echo "miroir à jour"
