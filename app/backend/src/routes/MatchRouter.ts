import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import verifyToken from '../utils/validateJWT';

const matchRouter = Router();

matchRouter.get('/teste', (_req, res) => res.json({ ok: 'matches' }));

matchRouter.get('/', MatchController.findMatches);
matchRouter.patch('/:id/', verifyToken, MatchController.updateMatch);
matchRouter.patch('/:id/finish', verifyToken, MatchController.finishMatch);
matchRouter.post('/', verifyToken, MatchController.createMatch);

export default matchRouter;
