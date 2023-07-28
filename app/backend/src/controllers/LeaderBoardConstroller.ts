import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';

class LeaderBoardController {
  static async findAllMatches(req: Request, res: Response) {
    const allMatches = await LeaderBoardService.getLeaderboard();
    return res.status(200).json(allMatches);
  }

  static async findAllMatchesAway(req: Request, res: Response) {
    const allMatches = await LeaderBoardService.getLeaderboardAway();
    return res.status(200).json(allMatches);
  }

  static async findAllMatchesOverAll(req: Request, res: Response) {
    const allMatches = await LeaderBoardService.getOverallLeaderboard();
    return res.status(200).json(allMatches);
  }
}

export default LeaderBoardController;
