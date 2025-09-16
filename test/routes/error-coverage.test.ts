import supertest from 'supertest';
import app from '../../src/app';

const request = supertest(app);

describe('Error handling coverage', () => {

  it('devrait couvrir le catch block avec jouer pour joueur inexistant', async () => {
    await request.get('/api/v1/jeu/redemarrerJeu');
    
    const response = await request.get('/api/v1/jeu/jouer/JoueurInexistant');
    expect(response.status).toBe(404);
  });

});
