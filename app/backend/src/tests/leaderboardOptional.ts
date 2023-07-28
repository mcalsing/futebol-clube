public static async getOverallLeaderboard() {
    const teams = await TeamModel.findAll();
    const result = await Promise.all(teams.map(async (team) => {
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


public static async getOverallLeaderboard() {
  const teams = await TeamModel.findAll();
  const result = await Promise.all(teams.map(async (team) => {
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

  return LeaderBoardService.resultSort(result).map((teamStats) => ({
    ...teamStats,
    totalPoints: teamStats.totalVictories * 3 + teamStats.totalDraws,
    goalsBalance: teamStats.goalsFavor - teamStats.goalsOwn,
    efficiency: ((teamStats.totalPoints / (teamStats.totalGames * 3)) * 100).toFixed(2) }));
}