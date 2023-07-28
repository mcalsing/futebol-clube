import { Router } from 'express';
import TeamController from '../controllers/TeamController';

const teamRouter = Router();

teamRouter.get('/teste', (_req, res) => res.json({ ok: 'teams' }));

teamRouter.get('/', TeamController.findAll);
teamRouter.get('/:id', TeamController.findById);

export default teamRouter;
