import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { IsportsApiService } from '../../services/isports-api.service';
import { Params } from '@angular/router';
import { LeagueData } from '../../models/league-data';
import { Season } from '../../models/season';
import { LeagueOptionsService } from '../../services/league-options.service';
@Component({
  selector: 'app-league-options',
  templateUrl: './league-options.component.html',
  styleUrls: ['./league-options.component.scss'],
})
export class LeagueOptionsComponent implements OnInit, OnChanges, OnDestroy {
  @Input() urlParams!: Params;
  destroy$ = new Subject<void>();
  leagues$!: Observable<LeagueData[]>;
  selectedLeague$!: Observable<any>;
  selectedSeason$!: Observable<any>;
  seasons: number[] = [];
  constructor(
    private _apiService: IsportsApiService,
    private _leagueOptionsService: LeagueOptionsService
  ) {}

  ngOnInit(): void {
    this.selectedLeague$ = this._leagueOptionsService.getSelectedLeague();
    this.selectedSeason$ = this._leagueOptionsService.getSelectedSeason();

    this._leagueOptionsService
      .getLeagueOptions()
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ league, season }) => {
        if (!this.seasons.includes(season)) {
          let lastSeason = this.seasons[this.seasons.length - 1];

          this.updateSelectedSeasonObs(lastSeason);
          return;
        }
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['urlParams'].firstChange) {
      this.updateSelectedLeagueObs(null);
      this.getLeagues(this.urlParams);
    }
  }

  private getLeagues(leagueParams: Params): void {
    this.leagues$ = this._apiService
      .getLeagues()
      .pipe(
        tap((leaguesData: LeagueData[]) =>
          this.updateLeagueSelections(leaguesData, leagueParams)
        )
      );
  }

  private updateLeagueSelections(
    leaguesData: LeagueData[],
    leagueParams: Params
  ): void {
    let selectedLeague: LeagueData = this.findSelectedLeagueFromId(
      leaguesData,
      +leagueParams['leagueId']
    );

    this.seasons = this.getLeagueSeasons(selectedLeague);

    this.updateSelectedLeagueObs(selectedLeague);

    let selectedSeason = leagueParams['season']
      ? +leagueParams['season']
      : this.seasons[this.seasons.length - 1];
    this.updateSelectedSeasonObs(selectedSeason);
  }

  onSeasonChange(value: number): void {
    this.updateSelectedSeasonObs(value);
  }

  onLeagueChange(value: LeagueData): void {
    this.seasons = this.getLeagueSeasons(value);
    this.updateSelectedLeagueObs(value);
  }

  private updateSelectedLeagueObs(league: LeagueData | null): void {
    this._leagueOptionsService.updateSelectedLeague(league);
  }

  private updateSelectedSeasonObs(season: number | null): void {
    this._leagueOptionsService.updateSelectedSeason(season);
  }

  private getLeagueSeasons(league: LeagueData): number[] {
    return league.seasons.reduce((acc: number[], season: Season) => {
      acc.push(season.year);

      return acc;
    }, []);
  }

  private findSelectedLeagueFromId(
    leaguesData: LeagueData[],
    leagueId: number
  ): LeagueData {
    return leaguesData.filter(
      (league: LeagueData) => league.league.id === leagueId
    )[0];
  }

  ngOnDestroy(): void {
    this.updateSelectedLeagueObs(null);
    this.updateSelectedSeasonObs(null);
    this.destroy$.next();
    this.destroy$.complete();
  }
}
