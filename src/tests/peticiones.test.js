const supertest = require('supertest');
const app = require('../index');

const api = supertest(app);

describe('Pruebas en rutas', () => {

    test('retorna los repositorios de github', async() => {
        await api
                .get('/api/github')
                .expect(200)
                .expect('Content-Type', /application\/json/);
    });
});