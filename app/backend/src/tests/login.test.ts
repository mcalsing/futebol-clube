import * as sinon from 'sinon';
import * as chai from 'chai';
import UserModel from '../database/models/UserModel';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste no endpoint /login', () => {
  afterEach(() => { sinon.restore() })

  describe('Testes em caso de login inválido', () => {
    it('Dado email inválido deve retornar o erro: Unauthorized', async () => {
      sinon.stub(UserModel, 'findOne').resolves(undefined);

      const response = await chai.request(app).post('/login')
        .send({ email: 'invalid@admin.com', password: 'secret_admin'});
      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.deep.equal({ message: 'Invalid email or password'});
    })

    it('Sem passar email no objeto de login', async () => {
      sinon.stub(UserModel, 'findOne').resolves({
        id: 1,
        username: 'Admin',
        role: 'admin',
        email: 'admin@admin.com',
        password: 'pass',
      } as UserModel);

      const response = await chai.request(app)
      .post('/login')
      .send({ password: 'senha_admin'});
      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({ message: 'All fields must be filled'});
    })

    it('Caso token não for encontrado', async () => {
      const response = await chai.request(app).get('/login/role')

      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.deep.equal({ message: 'Token not found' });
   });
  })
})