export interface ITeamStats {
  totalGames: number;
  totalVictories: number;
  totalLosses: number;
  totalDraws: number;
  goalsFavor: number;
  goalsOwn: number;
}

export interface ILeaderboard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: string;
}
