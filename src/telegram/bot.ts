// Lot 6 (carte 17) : adaptateur `grammY`, aucun calcul ici (ADR-0004). Traduit les
// mises à jour Telegram en appels aux fonctions pures de `src/domain/` et au dépôt
// (`Repository`), rien de plus.
import { Bot, InlineKeyboard } from 'grammy';
import type { Repository } from '../db/repository.js';
import { peutEnregistrer } from '../domain/consentement.js';
import {
  ACTIVITES,
  DUREES_MINUTES,
  DUREE_LABELS,
  EFFORTS_MOTS,
  type ChoixDeclaration,
} from '../domain/parsing.js';
import { declarerSeance } from '../domain/declarer.js';
import { formaterMessagePublic } from '../domain/message.js';
import { enregistrerCoeur } from '../domain/coeurs.js';
import { mesDonnees, supprimerMesDonnees } from '../domain/donnees.js';

// Texte de consentement PROVISOIRE : la version définitive est écrite par la carte
// Pilote (skill `consentement`, programme D — voir docs/spec.md, « Ce qui n'est pas
// ici »). Celui-ci couvre les points exigés par P1 (ce qui est stocké, ce qui ne l'est
// jamais, durée de conservation, comment supprimer) pour permettre la Recette réelle.
const TEXTE_CONSENTEMENT = `Bienvenue dans le pilote « Cœur relatif ».

Ce qui est enregistré si tu acceptes : les activités que tu déclares (nom, durée,
effort ressenti) et les cœurs ❤️ posés sur les séances.
Ce qui n'est jamais enregistré : fréquence cardiaque, distance, allure, position, âge,
poids — aucun de ces champs n'existe dans ce bot.
Conservation : jusqu'à la fin du pilote + 30 jours, puis suppression automatique.
Suppression à tout moment : tape /supprimer.

Réponds « J'accepte » pour commencer.`;

const PROMPT_AUTRE_ACTIVITE = "Quelle est l'activité ? Réponds directement à ce message.";
const MESSAGE_INCOMPRIS = "Je n'ai pas compris. Tape /declarer pour enregistrer une séance, /mesdonnees ou /supprimer.";
const LONGUEUR_MAX_ACTIVITE_LIBRE = 30;

function tronquerActivite(texte: string): string {
  const nettoye = texte.trim().replace(/\|/g, ' ');
  return nettoye.slice(0, LONGUEUR_MAX_ACTIVITE_LIBRE);
}

function clavierActivites(): InlineKeyboard {
  const clavier = new InlineKeyboard();
  for (const activite of ACTIVITES) {
    clavier.text(activite, `da|${activite}`).row();
  }
  return clavier.text('Autre', 'da|__autre__');
}

function clavierDurees(activite: string): InlineKeyboard {
  const clavier = new InlineKeyboard();
  for (const duree of DUREES_MINUTES) {
    clavier.text(DUREE_LABELS[duree], `dd|${activite}|${duree}`).row();
  }
  return clavier;
}

function clavierEfforts(activite: string, duree: number): InlineKeyboard {
  const clavier = new InlineKeyboard();
  for (const effortMot of EFFORTS_MOTS) {
    clavier.text(effortMot, `de|${activite}|${duree}|${effortMot}`).row();
  }
  return clavier;
}

export interface OptionsBot {
  token: string;
  repo: Repository;
  // Non défini tant que le groupe Telegram du pilote n'existe pas encore : la
  // déclaration fonctionne quand même, seule la publication P4 est différée.
  groupChatId: number | undefined;
}

export function creerBot({ token, repo, groupChatId }: OptionsBot): Bot {
  const bot = new Bot(token);

  // Règle Telegram (docs/contracts.md) : répondre 200 au webhook quel que soit le
  // résultat du traitement. grammY rejette la promesse de `handleUpdate` sans ce
  // gestionnaire (ex. callback_query périmé, chat bloqué) ; webhook.ts a aussi son
  // propre filet de sécurité, mais l'erreur doit être journalisée ici, au plus près.
  bot.catch((erreur) => {
    console.error('Erreur non gérée dans un gestionnaire grammY :', erreur);
  });

  bot.command('start', async (ctx) => {
    const idTelegram = String(ctx.from?.id);
    const personne = await repo.getPersonne(idTelegram);
    if (personne && peutEnregistrer(personne)) {
      await ctx.reply('Tu as déjà accepté. Tape /declarer pour enregistrer une séance.');
      return;
    }
    const clavier = new InlineKeyboard().text("J'accepte", 'consentement:accepte');
    await ctx.reply(TEXTE_CONSENTEMENT, { reply_markup: clavier });
  });

  bot.callbackQuery('consentement:accepte', async (ctx) => {
    const idTelegram = String(ctx.from.id);
    await repo.upsertPersonne({
      idTelegram,
      prenom: ctx.from.first_name,
      consentementHorodate: new Date(),
    });
    await ctx.answerCallbackQuery();
    await ctx.editMessageText('Merci, enregistré. Tape /declarer pour ta première séance.');
  });

  bot.command('declarer', async (ctx) => {
    const idTelegram = String(ctx.from?.id);
    const personne = await repo.getPersonne(idTelegram);
    if (!personne || !peutEnregistrer(personne)) {
      await ctx.reply("Il faut d'abord accepter : tape /start.");
      return;
    }
    await ctx.reply('Quelle activité ?', { reply_markup: clavierActivites() });
  });

  // CA-03 : trois choix par boutons, « Autre » seule échappatoire en texte libre.
  bot.callbackQuery(/^da\|(.+)$/, async (ctx) => {
    // Groupe de capture non optionnel : toujours présent quand le motif a filtré cette
    // mise à jour (grammY ne déclenche ce gestionnaire qu'en cas de correspondance).
    const choix = ctx.match[1] as string;
    await ctx.answerCallbackQuery();
    if (choix === '__autre__') {
      await ctx.api.sendMessage(ctx.chat!.id, PROMPT_AUTRE_ACTIVITE, {
        reply_markup: { force_reply: true, selective: true },
      });
      return;
    }
    await ctx.editMessageText(`Activité : ${choix}\nDurée ?`, { reply_markup: clavierDurees(choix) });
  });

  bot.callbackQuery(/^dd\|(.+)\|(\d+)$/, async (ctx) => {
    const [, activite, dureeTexte] = ctx.match as unknown as [string, string, string];
    const duree = Number(dureeTexte);
    await ctx.answerCallbackQuery();
    await ctx.editMessageText(`Activité : ${activite}\nDurée : ${DUREE_LABELS[duree as (typeof DUREES_MINUTES)[number]] ?? dureeTexte}\nEffort ressenti ?`, {
      reply_markup: clavierEfforts(activite, duree),
    });
  });

  bot.callbackQuery(/^de\|(.+)\|(\d+)\|(.+)$/, async (ctx) => {
    const [, activite, dureeTexte, effortMot] = ctx.match as unknown as [string, string, string, string];
    await ctx.answerCallbackQuery();
    await finaliserDeclaration(ctx.chat!.id, ctx.from.id, { activite, minutes: Number(dureeTexte), effortMot });
  });

  bot.on('message:text', async (ctx) => {
    if (ctx.message.reply_to_message?.text === PROMPT_AUTRE_ACTIVITE) {
      const activite = tronquerActivite(ctx.message.text);
      if (activite === '') {
        await ctx.reply("Le nom de l'activité ne peut pas être vide. Retape /declarer.");
        return;
      }
      await ctx.reply(`Activité : ${activite}\nDurée ?`, { reply_markup: clavierDurees(activite) });
      return;
    }

    if (ctx.message.text.startsWith('/')) return; // commande inconnue, ignorée silencieusement
    await ctx.reply(MESSAGE_INCOMPRIS);
  });

  bot.command('mesdonnees', async (ctx) => {
    const idTelegram = String(ctx.from?.id);
    const donnees = await mesDonnees(repo, idTelegram, new Date());
    if (donnees.length === 0) {
      await ctx.reply('Aucune séance notée cette semaine.');
      return;
    }
    await ctx.reply(`Tes étoiles cette semaine : ${donnees.map((d) => '★'.repeat(d.etoiles)).join(', ')}`);
  });

  bot.command('supprimer', async (ctx) => {
    const idTelegram = String(ctx.from?.id);
    await supprimerMesDonnees(repo, idTelegram);
    await ctx.reply('Toutes tes données ont été supprimées.');
  });

  // CA-09 : un ❤️ posé sur un message de séance est compté en privé, jamais public.
  // Réaction d'un membre identifié uniquement (pas d'admin anonyme, ctx.from présent) ;
  // seul l'ajout d'un ❤️ est traité (une réaction retirée ne retire pas le cœur —
  // limitation acceptée pour un pilote à douze personnes, voir carte 17).
  bot.on('message_reaction', async (ctx) => {
    const evenement = ctx.messageReaction;
    if (!evenement.user) return;
    const avaitCoeur = evenement.old_reaction.some((r) => r.type === 'emoji' && r.emoji === '❤');
    const aCoeur = evenement.new_reaction.some((r) => r.type === 'emoji' && r.emoji === '❤');
    if (avaitCoeur || !aCoeur) return;

    const seance = await repo.seanceParMessage(evenement.message_id);
    if (!seance) return;

    await enregistrerCoeur(repo, {
      id: `${seance.id}-${evenement.user.id}-${evenement.date}`,
      seanceId: seance.id,
      donneurId: String(evenement.user.id),
      horodatage: new Date(evenement.date * 1000),
    });
  });

  async function finaliserDeclaration(chatId: number, idTelegramFrom: number, choix: ChoixDeclaration): Promise<void> {
    const idTelegram = String(idTelegramFrom);
    const resultat = await declarerSeance(repo, idTelegram, choix);
    if (!resultat) {
      await bot.api.sendMessage(chatId, MESSAGE_INCOMPRIS);
      return;
    }
    const { seanceId, activite, etoiles } = resultat;
    const personne = await repo.getPersonne(idTelegram);

    if (etoiles === null) {
      // CA-04 : réponse strictement « enregistré » pendant la calibration.
      await bot.api.sendMessage(chatId, 'enregistré');
      return;
    }

    await bot.api.sendMessage(chatId, `Enregistré : ${activite}, ${'★'.repeat(etoiles)}.`);

    // Groupe pas encore configuré (avant la création du vrai groupe Telegram du
    // pilote, ou pendant les tout premiers essais privés) : la séance reste
    // enregistrée, seule la publication P4 est différée.
    if (groupChatId === undefined) return;

    const message = await bot.api.sendMessage(
      groupChatId,
      formaterMessagePublic({ prenom: personne?.prenom ?? 'Quelqu\'un', etoiles, activite }),
    );
    await repo.enregistrerMessageSeance(seanceId, message.message_id);
  }

  return bot;
}
