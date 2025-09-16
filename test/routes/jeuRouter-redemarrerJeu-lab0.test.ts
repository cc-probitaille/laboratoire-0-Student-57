import supertest from 'supertest';
import 'jest-extended';
import app from '../../src/app';
import { jeuRoutes } from "../../src/routes/jeuRouter";

const request = supertest(app);

const testNom1 = 'Jean-Marc-redemarrer';
const testNom2 = 'Pierre-redemarrer';

describe('GET /api/v1/jeu/redemarrerJeu', () => {

  beforeAll(async () => {
    await request.post('/api/v1/jeu/demarrerJeu').send({ nom: testNom1 });
    await request.post('/api/v1/jeu/demarrerJeu').send({ nom: testNom2 });
  });

  it('devrait répondre avec succès (code 200) et retourner du JSON', async () => {
    const response = await request.get('/api/v1/jeu/redemarrerJeu');
    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body.message).toBe('Success');
  });

  it('devrait supprimer tous les joueurs (postcondition)', async () => {
    const joueursJSON = jeuRoutes.controleurJeu.joueurs;
    const joueursArray = JSON.parse(joueursJSON);
    expect(joueursArray.length).toBe(0);
  });

  it('devrait retourner 404 quand on essaie de jouer après redemarrerJeu', async () => {
    const response = await request.get('/api/v1/jeu/jouer/' + testNom1);
    expect(response.status).toBe(404);
  });

});
