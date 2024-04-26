import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { StatisticsService } from '../../services/statistics.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LeagueStatistics } from '../../models/league-statistics';
import { LeagueOptionsService } from '../../services/league-options.service';
import { LeagueData } from '../../models/league-data';
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  leagueStatistics$!: Observable<LeagueStatistics>;
  urlParams!: Params;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _statisticsService: StatisticsService,
    private _leagueOptionsService: LeagueOptionsService
  ) {}

  ngOnInit(): void {
    this._route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: Params) => {
        window.scrollTo(0, 0);
        this.urlParams = params;

        this._statisticsService.fetchLeagueStatisticsFromApi(
          +params['leagueId'],
          +params['season']
        );
      });

    this.leagueStatistics$ = this._statisticsService.getLeagueStatistics();
    this._leagueOptionsService
      .getLeagueOptions()
      .pipe(takeUntil(this.destroy$))
      .subscribe((value: any) => {
        this.navigateToLeagueOptions(value);
      });
  }

  private navigateToLeagueOptions(leagueOptions: {
    league: LeagueData;
    season: number;
  }): void {
    this._router.navigate([
      `statistics/${leagueOptions.league.league.id}/${leagueOptions.season}`,
    ]);
  }

  ngOnDestroy(): void {
    this._statisticsService.setLeagueStatistics(null);
    this.destroy$.next();
    this.destroy$.complete();
  }
}
