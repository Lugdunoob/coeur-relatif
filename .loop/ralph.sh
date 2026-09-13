#!/usr/bin/env bash
# Loop à contexte frais pour un lot : relance `claude -p` avec un contexte neuf à chaque itération.
# Usage : bash .loop/ralph.sh lot-01 25
set -euo pipefail
SLUG="${1:?slug, ex. lot-01}"; MAX_ITER="${2:-25}"
PROMPT_FILE=".loop/prompts/loop-${SLUG}.md"
[ -f "$PROMPT_FILE" ] || { echo "prompt absent : $PROMPT_FILE"; exit 4; }
LOG_DIR=".loop/runs/${SLUG}-$(date +%Y%m%d-%H%M%S)"; mkdir -p "$LOG_DIR"
MAIN_SHA="$(git rev-parse main)"
git checkout -B "$SLUG" 2>/dev/null || git checkout "$SLUG"
echo lot > .loop/phase
TAG="$(echo "$SLUG" | tr 'a-z-' 'A-Z_')"
for i in $(seq 1 "$MAX_ITER"); do
  echo "=== ${SLUG} itération $i/$MAX_ITER ==="
  OUT="$LOG_DIR/iter-$i.log"
  claude -p "$(cat "$PROMPT_FILE")" --permission-mode acceptEdits 2>&1 | tee "$OUT"
  grep -q "STATUS: ${TAG}_DONE" "$OUT" && { echo "terminé à l'itération $i"; rm -f .loop/phase; exit 0; }
  grep -q "STATUS: ${TAG}_BLOCKED" "$OUT" && { echo "bloqué à l'itération $i, voir BLOCKED.md"; rm -f .loop/phase; exit 2; }
  [ "$(git rev-parse main)" = "$MAIN_SHA" ] || { echo "main a bougé, arrêt d'urgence"; rm -f .loop/phase; exit 3; }
done
echo "budget épuisé sans complétion, voir $LOG_DIR"; rm -f .loop/phase; exit 1
