import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartComponent } from 'ng-apexcharts';
import { Observable } from 'rxjs';
import { MatchPredictions } from 'src/app/user/models/match-predictions';
import { MatchPreview } from 'src/app/user/models/match-preview';
import { Player } from 'src/app/user/models/player';
import { IsportsApiService } from 'src/app/user/services/isports-api.service';
import { MatchPreviewService } from 'src/app/user/services/match-preview.service';

@Component({
  selector: 'app-match-preview',
  templateUrl: './match-preview.component.html',
  styleUrls: ['./match-preview.component.scss'],
})
export class MatchPreviewComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions!: Partial<any>;
  matchId!: number;
  match$!: Observable<MatchPreview>;

  constructor(
    private _route: ActivatedRoute,
    private _apiService: IsportsApiService,
    private _matchPreviewService: MatchPreviewService
  ) {}

  ngOnInit(): void {
    this.matchId = this._route.snapshot.params['matchId'];
    this.match$ = this._apiService.getMatchPreview(this.matchId);

    this.loadMatchPredictions();
  }

  private loadMatchPredictions(): void {
    this._apiService
      .getMatchPredictions(this.matchId)
      .subscribe((matchPredictions: MatchPredictions) => {
        if (matchPredictions.h2h.length === 0) return;
        this.chartOptions =
          this._matchPreviewService.getComparisonChartOptions(matchPredictions);
      });
  }

  onOrganizePlayersIntoLines(
    startingXI: Player[] | undefined,
    teamsSquad: any
  ): any {
    let organizedPlayers: Player[][] =
      this._matchPreviewService.getOrganizedPlayersToLines(
        startingXI,
        teamsSquad
      );

    return this._matchPreviewService.sortPlayersIntoLines(organizedPlayers);
  }

  onIsPercentage(str: string): boolean {
    const percentageRegex = /^(\d+\.?\d*|\.\d+)%$/;

    return percentageRegex.test(str);
  }

  onCovertPercentageToNumber(str: string): number {
    return +str.slice(0, str.length - 1);
  }
}
