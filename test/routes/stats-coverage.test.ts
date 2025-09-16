import supertest from 'supertest';
import 'jest-extended';
import app from '../../src/app';

const request = supertest(app);

describe('Stats page - branch coverage for ternary operator', () => {

  it('devrait couvrir les deux branches de joueur.lancers > 0 ? ... : 0', async () => {
    await request.get('/api/v1/jeu/redemarrerJeu');
    
    await request.post('/api/v1/jeu/demarrerJeu').send({ nom: 'TestPlayer' });
    
    const statsZero = await request.get('/stats');
    expect(statsZero.status).toBe(200);
    
    await request.get('/api/v1/jeu/jouer/TestPlayer');
    
    const statsPositif = await request.get('/stats');
    expect(statsPositif.status).toBe(200);
  });

});