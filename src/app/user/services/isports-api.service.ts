import { Injectable } from '@angular/core';
import { Observable, concatMap, forkJoin, from, map, switchMap } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class IsportsApiService {
  constructor() {}

  getMatchPreview(matchId: any): Observable<any> {
    return from(
      axios.get('http://localhost:3000/api/football/match', {
        params: { matchId: matchId },
      })
    ).pipe(map((match: any) => match.data.response[0]));
  }

  getMatchPredictions(matchId: any): Observable<any> {
    return from(
      axios.get('http://localhost:3000/api/football/predictions', {
        params: { matchId: matchId },
      })
    ).pipe(
      map((match: any) => {
        let matchPredictions = {
          comparison: match.data.response[0].comparison,
          h2h: match.data.response[0].h2h,
          teams: {
            home: { name: match.data.response[0].teams.home.name },
            away: { name: match.data.response[0].teams.away.name },
          },
        };

        return matchPredictions;
      })
    );
  }

  getLivescores(livescoresParams: any): Observable<any> {
    return from(
      axios.get('http://localhost:3000/api/football/livescores', {
        params: { ...livescoresParams },
      })
    ).pipe(
      switchMap((livescoresResponse: any) => {
        const livescoresData = livescoresResponse.data;

        return this.getLeagues().pipe(
          map((leaguesData: any) => {
            return {
              livescores: livescoresData,
              leagues: leaguesData,
            };
          })
        );
      }),
      map(({ livescores, leagues }: { livescores: any; leagues: any }) => {
        let groupedByLeagueId = livescores?.response.reduce(
          (acc: any, obj: any) => {
            let leagueIndexInAcc = acc.findIndex((item: any) => {
              return item.league.league.id === obj.league.id;
            });

            let accHasLeague = leagueIndexInAcc >= 0 ? true : false;
            if (accHasLeague) {
              acc[leagueIndexInAcc].matches.push(obj);
            } else {
              let leagueIndex = leagues.findIndex((leagues: any) => {
                return leagues.league.id == obj.league.id;
              });
              acc.push({ league: leagues[leagueIndex], matches: [obj] });
            }

            return acc.sort(
              (a: any, b: any) => a.league.league?.id - b.league.league?.id
            );
          },
          []
        );
        return groupedByLeagueId;
      })
    );
  }

  getStandings(leagueId: number, season: number): Observable<any> {
    return from(
      axios.get('http://localhost:3000/api/football/standings', {
        params: { leagueId: leagueId, season: season },
      })
    ).pipe(map((x: any) => x?.data.response[0]));
  }

  getLeagues(): Observable<any> {
    return from(axios.get('http://localhost:3000/api/football/leagues')).pipe(
      map((x: any) => x?.data.response)
    );
  }

  getLeaguesSeasons(): Observable<any> {
    return from(
      axios.get('http://localhost:3000/api/football/leagues/seasons')
    ).pipe(map((x: any) => x?.data.response));
  }

  getLineups(matchId: any): Observable<any> {
    return from(
      axios.get('http://localhost:3000/api/football/lineups', {
        params: { matchId: matchId },
      })
    ).pipe(
      map((x: any) => {
        return x?.data.response;
      })
    );
  }

  getLeagueTeams(leagueId: number, season: number): Observable<any> {
    return from(
      axios.get('http://localhost:3000/api/league/teams', {
        params: { leagueId: leagueId, season: season },
      })
    ).pipe(
      concatMap((response: any) => {
        const teams = response?.data.response;
        const requests = teams.map((team: any) =>
          this.getTeamDetails(team.team.id, season, leagueId)
        );

        return forkJoin(requests);
      }),
      map((data) => this.convertToLeagueStatistics(data))
    );
  }

  convertToLeagueStatistics(data: any): any {
    let leagueStatistics = {
      mostWins: null,
      bestWinningStreak: null,
      mostDraws: null,
      bestDrawingStreak: null,
      mostLoses: null,
      bestLosingStreak: null,
      mostCleanSheets: null,
      mostfailedToScore: null,
      mostRedCards: null,
      mostYellowCards: null,
      mostPenaltiesGained: null,
      mostPenaltiesToGoalPercentage: null,
    };

    data.sort(
      (a: any, b: any) => b.fixtures.wins.total - a.fixtures.wins.total
    );
    leagueStatistics.mostWins = data.map((teamStats: any) => {
      return {
        team: teamStats.team,
        value: teamStats.fixtures.wins.total,
      };
    });

    data.sort(
      (a: any, b: any) => b.biggest.streak.wins - a.biggest.streak.wins
    );
    leagueStatistics.bestWinningStreak = data.map((teamStats: any) => {
      return {
        team: teamStats.team,
        value: teamStats.biggest.streak.wins,
      };
    });

    data.sort(
      (a: any, b: any) => b.fixtures.draws.total - a.fixtures.draws.total
    );
    leagueStatistics.mostDraws = data.map((teamStats: any) => {
      return {
        team: teamStats.team,
        value: teamStats.fixtures.draws.total,
      };
    });

    data.sort(
      (a: any, b: any) => b.biggest.streak.draws - a.biggest.streak.draws
    );
    leagueStatistics.bestDrawingStreak = data.map((teamStats: any) => {
      return {
        team: teamStats.team,
        value: teamStats.biggest.streak.draws,
      };
    });

    data.sort(
      (a: any, b: any) => b.fixtures.loses.total - a.fixtures.loses.total
    );
    leagueStatistics.mostLoses = data.map((teamStats: any) => {
      return {
        team: teamStats.team,
        value: teamStats.fixtures.loses.total,
      };
    });

    data.sort(
      (a: any, b: any) => b.biggest.streak.loses - a.biggest.streak.loses
    );
    leagueStatistics.bestLosingStreak = data.map((teamStats: any) => {
      return {
        team: teamStats.team,
        value: teamStats.biggest.streak.loses,
      };
    });

    data.sort((a: any, b: any) => b.clean_sheet.total - a.clean_sheet.total);
    leagueStatistics.mostCleanSheets = data.map((teamStats: any) => {
      return {
        team: teamStats.team,
        value: teamStats.clean_sheet.total,
      };
    });

    data.sort(
      (a: any, b: any) => b.failed_to_score.total - a.failed_to_score.total
    );
    leagueStatistics.mostfailedToScore = data.map((teamStats: any) => {
      return {
        team: teamStats.team,
        value: teamStats.failed_to_score.total,
      };
    });

    data.sort((a: any, b: any) => {
      let totalRedsA: number = Object.values(
        a.cards.red as { total: number }[]
      ).reduce((acc: any, curr: any) => {
        return acc + (curr.total || 0);
      }, 0);
      let totalRedsB: number = Object.values(
        b.cards.red as { total: number }[]
      ).reduce((acc: any, curr: any) => {
        return acc + (curr.total || 0);
      }, 0);
      return totalRedsB - totalRedsA;
    });

    leagueStatistics.mostRedCards = data.map((teamStats: any) => {
      return {
        team: teamStats.team,
        value: Object.values(teamStats.cards.red as { total: number }[]).reduce(
          (acc: any, curr: any) => {
            return acc + (curr.total || 0);
          },
          0
        ),
      };
    });

    data.sort((a: any, b: any) => {
      let totalYellowsA: number = Object.values(
        a.cards.yellow as { total: number }[]
      ).reduce((acc: any, curr: any) => {
        return acc + (curr.total || 0);
      }, 0);
      let totalYellowsB: number = Object.values(
        b.cards.yellow as { total: number }[]
      ).reduce((acc: any, curr: any) => {
        return acc + (curr.total || 0);
      }, 0);
      return totalYellowsB - totalYellowsA;
    });

    leagueStatistics.mostYellowCards = data.map((teamStats: any) => {
      return {
        team: teamStats.team,
        value: Object.values(
          teamStats.cards.yellow as { total: number }[]
        ).reduce((acc: any, curr: any) => {
          return acc + (curr.total || 0);
        }, 0),
      };
    });

    data.sort((a: any, b: any) => b.penalty.total - a.penalty.total);

    leagueStatistics.mostPenaltiesGained = data.map((teamStats: any) => {
      return {
        team: teamStats.team,
        value: teamStats.penalty.total,
      };
    });

    data.sort(
      (a: any, b: any) => b.penalty.scored.total - a.penalty.scored.total
    );
    leagueStatistics.mostPenaltiesToGoalPercentage = data.map(
      (teamStats: any) => {
        return {
          team: teamStats.team,
          value: teamStats.penalty.scored.percentage,
        };
      }
    );

    return leagueStatistics;
  }

  getTeamDetails(
    teamId: number,
    season: number,
    leagueId: number
  ): Observable<any> {
    return from(
      axios.get(`http://localhost:3000/api/team/statistics`, {
        params: { teamId: teamId, season: season, leagueId: leagueId },
      })
    ).pipe(
      map((x: any) => {
        return x?.data.response;
      })
    );
  }
}
