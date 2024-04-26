import { LeagueData } from './league-data';
import { MatchData } from './match';

export interface LeagueMatchesData {
  league: LeagueData;
  matches: MatchData[];
}
