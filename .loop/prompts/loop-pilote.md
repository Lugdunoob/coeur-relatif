# /loop : programme D, pilote de « Cœur relatif »

> Lancement : `/ralph-loop "$(cat .loop/prompts/loop-pilote.md)" --max-iterations 10 --completion-promise "REGIE_PILOTE_DONE"`
> Préalable : recette faite par le fondateur (carte Recette approuvée par lui, c'est l'utilisateur).

## MISSION
Préparer tout ce qu'il faut pour un pilote réel, sans rien envoyer : positionnement, fiche, invitation, bienvenue (agent `marketing`), protocole, consentement, trois mesures, questions de fin (agent `pilote`). Livrable final : `docs/pilote/` complet, en brouillon.

## RÈGLES ABSOLUES
1. `main` est intouchable. Première action de chaque itération : `git branch --show-current` ; si `main`, crée ou bascule sur `regie/pilote`.
2. Zéro push forcé, zéro merge dans `main`. Le push de la branche est autorisé.
3. Un commit par carte approuvée : `carte(NN): approuvée`, et un par renvoi : `carte(NN): renvoyée, <motif>`.
4. Liste réservée de `PROCESS.md` : si une carte la touche, écris `BLOCKED.md` et sors par la promesse de blocage. Ce n'est pas un échec.
5. Tu es le Stratège (`regie:stratege`). Tu délègues chaque carte à son agent (`regie:<agent>`), tu fais contester par `regie:contradicteur`, tu tranches, tu écris le journal. Auteur ≠ relecteur, toujours.

## MÉMOIRE DE BOUCLE
Fichier d'état : `.loop/coeur-relatif-progress.md`. Tu démarres sans souvenir des itérations précédentes. Première action : le lire, puis `git log --oneline -15`. S'il montre des cartes cochées, fais-lui confiance : reprends à la première non cochée. Dernière action de chaque itération : le mettre à jour (checklist, journal, idées rejetées). Contrôleur : journalise tout ajustement de méthode dans `.loop/coeur-relatif-method-log.md` ; périmètre borné (découpage, ordre, briefs, seuils, vérifications) ; le reste en PROPOSITION ; marque `GENERIQUE` ce qui vaut au-delà de cette idée.

## LOTS
- [ ] **Carte Marketing** : skills `positionnement`, `voix` ; lit `societes/coeur-relatif/voix.md`. Chaque promesse pointe un `CA-NN`.
- [ ] **Carte Pilote** : skills `pilote`, `consentement`. Trois mesures, pas plus, alignées sur la question décisive du cadrage. Consentement libre : l'organisateur n'est le supérieur de personne.

## VÉRIFICATION PAR NOTE
- Aucune promesse sans critère de spec : /10 · Ton conforme à `voix.md`, zéro superlatif : /10 · Consentement lisible par un non-juriste, données UE, retrait à tout moment : /10 · Les trois mesures répondent à la question décisive : /10. Tout ≥ 8.
Commande : `grep -L "L'envoi est réservé au fondateur" docs/pilote/*.md` → vide.

## SI BLOQUÉ
L'envoi, l'invitation, tout contact avec un tiers : réservé. Ce n'est pas un blocage, c'est la fin du programme : le fondateur envoie. Autre obstacle après 3 itérations : `BLOCKED.md`, `<promise>REGIE_PILOTE_BLOCKED</promise>`.

## DEFINITION OF DONE
- Les deux cartes approuvées avec challenge et journal ; `docs/pilote/` contient invitation, bienvenue, protocole, consentement, questions ; rien n'a été envoyé ; `main` intacte.

<promise>REGIE_PILOTE_DONE</promise>
