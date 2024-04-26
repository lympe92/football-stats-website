export interface LeagueStatistics {
  bestDrawingStreak: {
    team: { id: number; logo: string; name: string };
    value: number;
  }[];
  bestLosingStreak: {
    team: { id: number; logo: string; name: string };
    value: number;
  }[];
  bestWinningStreak: {
    team: { id: number; logo: string; name: string };
    value: number;
  }[];
  mostCleanSheets: {
    team: { id: number; logo: string; name: string };
    value: number;
  }[];
  mostDraws: {
    team: { id: number; logo: string; name: string };
    value: number;
  }[];
  mostLoses: {
    team: { id: number; logo: string; name: string };
    value: number;
  }[];
  mostPenaltiesGained: {
    team: { id: number; logo: string; name: string };
    value: number;
  }[];
  mostPenaltiesToGoalPercentage: {
    team: { id: number; logo: string; name: string };
    value: number;
  }[];
  mostRedCards: {
    team: { id: number; logo: string; name: string };
    value: number;
  }[];
  mostWins: {
    team: { id: number; logo: string; name: string };
    value: number;
  }[];
  mostYellowCards: {
    team: { id: number; logo: string; name: string };
    value: number;
  }[];
  mostfailedToScore: {
    team: { id: number; logo: string; name: string };
    value: number;
  }[];
}
