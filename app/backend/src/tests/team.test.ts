import * as sinon from 'sinon';
import * as chai from 'chai';
import TeamModel from '../database/models/TeamModel'
import TeamService from '../services/TeamService';
import teamMock from './teamMock';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;


describe('Testado o endpoint /teams', () => {
  afterEach(() => { sinon.restore() })

  describe('Testando a função findAll', () => {  

    it('Verificar se a função retorna array vazio', async () => {
        sinon.stub(TeamModel, 'findAll').resolves([]);

        const teams = await TeamService.findAll();

        expect(teams).to.be.deep.equal([])
    })

    it('Verificar se a função retorna array populado', async () => {
        sinon.stub(TeamModel, 'findAll').resolves(teamMock);

        const teams = await TeamService.findAll();

        expect(teams).to.be.deep.equal(teamMock);
    })
    it('Verificar se a função retorna o status correto', async () => {
      const response = await chai.request(app).get('/teams');

      expect(response.status).to.be.equal(200);
    })
  })

  describe('Testado a função findById', () => {
    it('Verificar se a função retorna o time com o id solicitado', async () => {
        sinon.stub(TeamModel, 'findByPk').resolves({ id: 5, teamName: 'Cruzeiro' } as TeamModel)
        
        const response = await TeamService.findById(5);

        expect(response).to.be.deep.equal({ id: 5, teamName: 'Cruzeiro' })
    })

    it('Verificar se a função retorna o status correto', async () => {
        sinon.stub(TeamService, 'findById').resolves({ id: 5, teamName: 'Cruzeiro' } as TeamModel);

        const response = await chai.request(app).get('/teams/:id');

        expect(response.status).to.be.equal(200);
    })
  })
});