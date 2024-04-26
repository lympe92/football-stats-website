import { Injectable } from '@angular/core';
import { MatchPredictions } from '../models/match-predictions';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root',
})
export class MatchPreviewService {
  getComparisonChartOptions(matchPredictions: MatchPredictions): Partial<any> {
    let chartOptions: Partial<any> = {
      series: this.getChartOptionsSeries(matchPredictions),
      chart: {
        toolbar: {
          show: false,
          tools: {
            download: false,
          },
        },
        height: 350,
        type: 'radar',
        dropShadow: {
          enabled: true,
          blur: 1,
          left: 1,
          top: 1,
        },
      },
      yaxis: {
        stepSize: 10,
        
      },
      xaxis: {
        categories: [
          'Strength',
          'Attacking',
          'Defensive',
          'Form',
          'Goals h2h',
          'h2h',
        ],
      },
    };

    return chartOptions;
  }

  private getChartOptionsSeries(
    matchPredictions: MatchPredictions
  ): [{ name: string; data: string[] }, { name: string; data: string[] }] {
    return [
      {
        name: matchPredictions.teams.home.name,
        data: [
          matchPredictions.comparison.total.home,
          matchPredictions.comparison.att.home,
          matchPredictions.comparison.def.home,
          matchPredictions.comparison.form.home,
          matchPredictions.comparison.goals.home,
          matchPredictions.comparison.h2h.home,
        ],
      },
      {
        name: matchPredictions.teams.away.name,
        data: [
          matchPredictions.comparison.total.away,
          matchPredictions.comparison.att.away,
          matchPredictions.comparison.def.away,
          matchPredictions.comparison.form.away,
          matchPredictions.comparison.goals.away,
          matchPredictions.comparison.h2h.away,
        ],
      },
    ];
  }

  getOrganizedPlayersToLines(
    startingXI: Player[] | undefined,
    teamsSquad: any
  ): Player[][] {
    let organizedPlayers: Player[][] = [];
    startingXI?.forEach((startingPlayer: Player) => {
      const grid = startingPlayer.player.grid[0];

      const row = parseInt(grid);
      if (!organizedPlayers[row]) {
        organizedPlayers[row] = [];
      }

      let player: Player = teamsSquad?.find(
        (player: Player) => player.player.id === startingPlayer.player.id
      ) as Player;
      if (player) {
        player.player.grid = startingPlayer.player.grid;
        player.player.number = startingPlayer.player.number;
      }

      organizedPlayers[row].push(player ?? startingPlayer);
    });
    return organizedPlayers;
  }

  sortPlayersIntoLines(organizedPlayers: Player[][]): Player[][] {
    organizedPlayers.forEach((line: Player[]) => {
      line.sort((a: Player, b: Player) => {
        const gridA = a.player.grid.split(':');
        const gridB = b.player.grid.split(':');
        return parseInt(gridA[1]) - parseInt(gridB[1]);
      });
    });
    return organizedPlayers.filter((line: Player[]) => line.length > 0);
  }
}
