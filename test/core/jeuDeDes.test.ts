import 'jest-extended';
import { JeuDeDes } from '../../src/core/jeuDeDes';

describe('JeuDeDesTest', () => {
  let jdd: JeuDeDes;
  beforeEach(async () => {
    jdd = new JeuDeDes();
  });

  it(`devrait n'avoir aucun joueur au début`, async () => {
    expect(jdd.joueurs).toEqual("[]")
  })

  it('devrait retourner une valeur entre 3 et 18', () => {
    for (let i = 0; i < 200; i++) {
      expect(jdd.brasser()).toBeWithin(3, 19);
    }
  })

  it('devrait retourner finalement toutes les valeurs entre 3 et 18', () => {
    const resultats = new Set();
    for (let i = 0; i < 500; i++) {
      resultats.add(jdd.brasser())
    }
    expect(resultats.size).toBe(16);
    for (let i = 2; i < 18; i++) {
      expect(resultats.has(i + 1)).toBeTrue();
    }
    // cas particuliers
    expect(resultats.has(2)).toBeFalsy();
    expect(resultats.has(19)).toBeFalsy();
  })

  it('devrait redémarrer le jeu et supprimer tous les joueurs', () => {
    jdd.demarrerJeu('TestJoueur1');
    jdd.demarrerJeu('TestJoueur2');
    
    const joueursAvant = JSON.parse(jdd.joueurs);
    expect(joueursAvant.length).toBe(2);
    
    const resultat = jdd.redemarrerJeu();
    
    const joueursApres = JSON.parse(jdd.joueurs);
    expect(joueursApres.length).toBe(0);
    
    const resultatObj = JSON.parse(resultat);
    expect(resultatObj.message).toInclude("redémarrer");
  })

});
