export interface MatchPredictions {
  comparison: Comparison;
  h2h: H2HMatch[];
  teams: {
    home: {
      name: string;
    };
    away: {
      name: string;
    };
  };
}

interface Comparison {
  form: {
    home: string;
    away: string;
  };
  att: {
    home: string;
    away: string;
  };
  def: {
    home: string;
    away: string;
  };
  poisson_distribution: {
    home: string;
    away: string;
  };
  h2h: {
    home: string;
    away: string;
  };
  goals: {
    home: string;
    away: string;
  };
  total: {
    home: string;
    away: string;
  };
}

interface Fixture {
  id: number;
  referee: string;
  timezone: string;
  date: string;
  timestamp: number;
  periods: {
    first: number;
    second: number;
  };
  venue: {
    id: number;
    name: string;
    city: string;
  };
  status: {
    long: string;
    short: string;
    elapsed: number;
  };
}

interface League {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
  round: string;
}

interface Team {
  id: number;
  name: string;
  logo: string;
  winner: boolean | null;
}

interface Score {
  halftime: {
    home: number | null;
    away: number | null;
  };
  fulltime: {
    home: number | null;
    away: number | null;
  };
  extratime: {
    home: number | null;
    away: number | null;
  };
  penalty: {
    home: number | null;
    away: number | null;
  };
}

interface H2HMatch {
  fixture: Fixture;
  league: League;
  teams: {
    home: Team;
    away: Team;
  };
  goals: {
    home: number;
    away: number;
  };
  score: Score;
}
