import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
// .
class MatchController {
  static async findMatches(req: Request, res: Response) {
    const { inProgress } = req.query;

    if (typeof inProgress === 'string') {
      const inProgressMatches = await MatchService.findInProgress(inProgress);
      return res.status(200).json(inProgressMatches);
    }

    const allMatches = await MatchService.findAllMatches();
    return res.status(200).json(allMatches);
  }

  static async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    await MatchService.finishMatch(Number(id));

    res.status(200).json({ message: 'Finished' });
  }

  static async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    await MatchService.updateMatch(Number(id), req.body);

    res.status(200).json({ message: 'Match updated' });
  }

  static async createMatch(req: Request, res: Response) {
    const create = await MatchService.createMatch(req.body);

    if (typeof create === 'string') {
      if (create.includes('possible')) return res.status(422).json({ message: create });
      return res.status(404).json({ message: create });
    }

    res.status(201).json(create);
  }
}

export default MatchController;
