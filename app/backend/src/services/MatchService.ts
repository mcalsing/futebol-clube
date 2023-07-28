import { IMatch } from '../interfaces/Match';
import { ICreateMatch } from '../interfaces/CreateMatch';
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';

class MatchService {
  static async findAllMatches(): Promise<MatchModel[]> {
    const allMatches = await MatchModel.findAll({
      include: [
        {
          attributes: { exclude: ['id'] },
          model: TeamModel,
          as: 'homeTeam',
        },
        {
          attributes: { exclude: ['id'] },
          model: TeamModel,
          as: 'awayTeam',
        },
      ] });
    return allMatches;
  }

  static async findInProgress(inProgress: string): Promise<MatchModel[]> {
    const allMatches = await MatchModel.findAll({
      where: {
        inProgress: inProgress === 'true',
      },
      include: [
        {
          attributes: { exclude: ['id'] },
          model: TeamModel,
          as: 'homeTeam',
        },
        {
          attributes: { exclude: ['id'] },
          model: TeamModel,
          as: 'awayTeam',
        },
      ] });
    return allMatches;
  }

  static async finishMatch(id: number) {
    const finish = await MatchModel.update({ inProgress: false }, {
      where: { id } });
    return finish;
  }

  static async updateMatch(id: number, body: IMatch) {
    const update = await MatchModel.update({
      homeTeamGoals: body.homeTeamGoals,
      awayTeamGoals: body.awayTeamGoals,
    }, { where: { id } });
    return update;
  }

  static async createMatch(body: ICreateMatch) {
    if (body.homeTeamId === body.awayTeamId) {
      return 'It is not possible to create a match with two equal teams';
    }

    if (body.homeTeamId > 16 || body.awayTeamId > 16) {
      return 'There is no team with such id!';
    }

    const create = await MatchModel.create({ ...body, inProgress: true });
    return create;
  }
}

export default MatchService;
