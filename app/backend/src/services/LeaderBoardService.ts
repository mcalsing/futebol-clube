import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';
import { ITeamStats, ILeaderboard } from '../interfaces/TeamStats';

class LeaderBoardService {
  public static async getTeamStats(id: number): Promise<ITeamStats> {
    const matches = await MatchModel.findAll({
      where: { inProgress: false, homeTeamId: id },
    });

    return {
      totalGames: matches.length,
      totalVictories: matches.filter((match) => match.homeTeamGoals > match.awayTeamGoals).length,
      totalLosses: matches.filter((match) => match.homeTeamGoals < match.awayTeamGoals).length,
      totalDraws: matches.filter((match) => match.homeTeamGoals === match.awayTeamGoals).length,
      goalsFavor: matches.reduce((total, match) => total + match.homeTeamGoals, 0),
      goalsOwn: matches.reduce((total, match) => total + match.awayTeamGoals, 0),
    };
  }

  public static async getLeaderboard() {
    const teams = await TeamModel.findAll();
    const result = teams.map(async (team) => {
      const teamStats = await LeaderBoardService.getTeamStats(team.id);
      const { totalVictories, totalDraws } = teamStats;
      const totalPoints = totalVictories * 3 + totalDraws;
      const goalsBalance = teamStats.goalsFavor - teamStats.goalsOwn;
      const efficiency = ((totalPoints / (teamStats.totalGames * 3)) * 100).toFixed(2);

      return {
        name: team.teamName,
        ...teamStats,
        totalPoints,
        goalsBalance,
        efficiency,
      };
    });

    const finalResult = await Promise.all(result);

    const sorted = LeaderBoardService.resultSort(finalResult);
    return sorted;
  }

  // ========================== VISITANTES ==========================

  public static async getTeamStatsAway(id: number): Promise<ITeamStats> {
    const matches = await MatchModel.findAll({
      where: { inProgress: false, awayTeamId: id },
    });

    return {
      totalGames: matches.length,
      totalVictories: matches.filter((match) => match.awayTeamGoals > match.homeTeamGoals).length,
      totalLosses: matches.filter((match) => match.awayTeamGoals < match.homeTeamGoals).length,
      totalDraws: matches.filter((match) => match.awayTeamGoals === match.homeTeamGoals).length,
      goalsFavor: matches.reduce((total, match) => total + match.awayTeamGoals, 0),
      goalsOwn: matches.reduce((total, match) => total + match.homeTeamGoals, 0),
    };
  }

  public static async getLeaderboardAway() {
    const teams = await TeamModel.findAll();
    const result = teams.map(async (team) => {
      const teamStats = await LeaderBoardService.getTeamStatsAway(team.id);
      const { totalVictories, totalDraws } = teamStats;
      const totalPoints = totalVictories * 3 + totalDraws;
      const goalsBalance = teamStats.goalsFavor - teamStats.goalsOwn;
      const efficiency = ((totalPoints / (teamStats.totalGames * 3)) * 100).toFixed(2);

      return {
        name: team.teamName,
        ...teamStats,
        totalPoints,
        goalsBalance,
        efficiency,
      };
    });

    const finalResult = await Promise.all(result);

    const sorted = LeaderBoardService.resultSort(finalResult);
    return sorted;
  }

  // ========================== Overall ==========================

  public static async getOverallLeaderboard() {
    // const teams = await TeamModel.findAll();
    const result = await Promise.all((await TeamModel.findAll()).map(async (team) => {
      const homeTeamStats = await LeaderBoardService.getTeamStats(team.id);
      const awayTeamStats = await LeaderBoardService.getTeamStatsAway(team.id);

      return { name: team.teamName,
        totalGames: homeTeamStats.totalGames + awayTeamStats.totalGames,
        totalVictories: homeTeamStats.totalVictories + awayTeamStats.totalVictories,
        totalLosses: homeTeamStats.totalLosses + awayTeamStats.totalLosses,
        totalDraws: homeTeamStats.totalDraws + awayTeamStats.totalDraws,
        goalsFavor: homeTeamStats.goalsFavor + awayTeamStats.goalsFavor,
        goalsOwn: homeTeamStats.goalsOwn + awayTeamStats.goalsOwn };
    }));

    const finalResult = result.map((teamStats) => {
      const totalPoints = teamStats.totalVictories * 3 + teamStats.totalDraws;
      const goalsBalance = teamStats.goalsFavor - teamStats.goalsOwn;
      const efficiency = ((totalPoints / (teamStats.totalGames * 3)) * 100).toFixed(2);

      return { ...teamStats, totalPoints, goalsBalance, efficiency };
    });

    return LeaderBoardService.resultSort(finalResult);
  }

  public static async resultSort(array: ILeaderboard[]) {
    const result = array.sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }
      if (b.totalVictories !== a.totalVictories) {
        return b.totalVictories - a.totalVictories;
      }
      if (b.goalsBalance !== a.goalsBalance) {
        return b.goalsBalance - a.goalsBalance;
      }
      return b.goalsFavor - a.goalsFavor;
    });
    return result;
  }
}

export default LeaderBoardService;
