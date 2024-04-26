import { Player } from './player';

export interface MatchPreview {
  fixture: {
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
  };
  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string | null;
    season: number;
    round: string;
  };
  teams: {
    home: {
      id: number;
      name: string;
      logo: string;
      winner: boolean;
    };
    away: {
      id: number;
      name: string;
      logo: string;
      winner: boolean;
    };
  };
  goals: {
    home: number;
    away: number;
  };
  score: {
    halftime: {
      home: number;
      away: number;
    };
    fulltime: {
      home: number;
      away: number;
    };
    extratime: {
      home: number;
      away: number;
    };
    penalty: {
      home: number;
      away: number;
    };
  };
  events: Event[];
  lineups: {
    team: {
      id: number;
      name: string;
      logo: string;
      colors: {
        player: {
          primary: string;
          number: number;
          border: string;
        };
        goalkeeper: {
          primary: string;
          number: number;
          border: string;
        };
      };
    };
    formation: string;
    startXI: Player[];
    substitutes: {
      player: {
        id: number;
        name: string;
        number: number;
        pos: string;
        grid: string;
      };
    }[];
    coach: {
      id: number;
      name: string;
    };
  }[];

  players: {
    team: {
      id: number;
      name: string;
      logo: string;
      update: Date;
    };
    players: [
      {
        player: {
          id: number;
          name: string;
          photo: string;
          grid: string;
          number: number;
        };
        statistics: [
          {
            games: {
              minutes: number;
              number: number;
              position: string;
              rating: string;
              captain: boolean;
              substitute: boolean;
            };
            offsides: number | null;
            shots: {
              total: number | null;
              on: number | null;
            };
            goals: {
              total: number | null;
              conceded: number | null;
              assists: number | null;
              saves: number | null;
            };
            passes: {
              total: number | null;
              key: number | null;
              accuracy: number | null;
            };
            tackles: {
              total: number | null;
              blocks: number | null;
              interceptions: number | null;
            };
            duels: {
              total: number | null;
              won: number | null;
            };
            dribbles: {
              attempts: number | null;
              success: number | null;
              past: number | null;
            };
            fouls: {
              drawn: number | null;
              committed: number | null;
            };
            cards: {
              yellow: number | null;
              red: number | null;
            };
            penalty: {
              won: number | null;
              commited: number | null;
              scored: number | null;
              missed: number | null;
              saved: number | null;
            };
          }
        ];
      }
    ];
  }[];

  statistics: {
    statistics: {
      type: string;
      value: any;
    }[];
    team: { id: number; logo: string; name: string };
  }[];
}
