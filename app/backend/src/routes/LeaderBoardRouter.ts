import { Router } from 'express';
import LeaderBoardController from '../controllers/LeaderBoardConstroller';

const leaderboardRouter = Router();

leaderboardRouter.get('/', LeaderBoardController.findAllMatchesOverAll);
leaderboardRouter.get('/home', LeaderBoardController.findAllMatches);
leaderboardRouter.get('/away', LeaderBoardController.findAllMatchesAway);

export default leaderboardRouter;
