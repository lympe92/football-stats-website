import { Component, OnDestroy, OnInit } from '@angular/core';
import { IsportsApiService } from '../../services/isports-api.service';
import { Observable, Subject, of, takeUntil } from 'rxjs';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LeagueData } from '../../models/league-data';
import { LeagueOptionsService } from '../../services/league-options.service';
@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss'],
})
export class StandingsComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  standings$!: Observable<any>;
  leagues$!: Observable<LeagueData[]>;
  field: string = 'all';
  seasons: number[] = [];
  urlParams!: Params;
  displayedColumns: string[] = [
    'position',
    'name',
    'matches',
    'wins',
    'draws',
    'loses',
    'goalsFor',
    'goalsAgainst',
    'goalsDifference',
    'form',
    'points',
  ];
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _apiService: IsportsApiService,
    private _leagueOptionsService: LeagueOptionsService
  ) {}

  ngOnInit(): void {
    this._route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: Params) => {
        window.scrollTo(0, 0);
        this.standings$ = of(null);
        this.urlParams = params;
        this.standings$ = this._apiService.getStandings(
          +params['leagueId'],
          +params['season']
        );
      });

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
      `standings/${leagueOptions.league.league.id}/${leagueOptions.season}`,
    ]);
  }

  onChangeField(value: MatTabChangeEvent): void {
    this.field = value.tab.textLabel.toLowerCase();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
