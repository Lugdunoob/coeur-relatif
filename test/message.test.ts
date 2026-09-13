import { describe, expect, it } from 'vitest';
import { formaterMessagePublic } from '../src/domain/message.js';

// CA-06 : le message public ne contient ni minutes, ni effort, ni aucun nombre
// autre que les étoiles (représentées en symboles, jamais en chiffre).
describe('CA-06 : message public sans aucun chiffre', () => {
  it('contient le prénom, les étoiles en symboles, l\'activité, et rien d\'autre', () => {
    const message = formaterMessagePublic({ prenom: 'Noé', etoiles: 4, activite: 'course' });
    expect(message).toContain('Noé');
    expect(message).toContain('★★★★');
    expect(message).toContain('course');
    expect(message).not.toMatch(/[0-9]/);
  });
});
