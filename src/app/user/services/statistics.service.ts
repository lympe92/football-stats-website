import { Injectable } from '@angular/core';
import { IsportsApiService } from './isports-api.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  leagueStatistics = new BehaviorSubject(null);
  constructor(private _apiService: IsportsApiService) {}

  fetchLeagueStatisticsFromApi(leagueId: number, season: number): void {
    this._apiService
      .getLeagueTeams(leagueId, season)
      .subscribe((x: any) => this.setLeagueStatistics(x));
  }

  setLeagueStatistics(data: any): void {
    this.leagueStatistics.next(data);
  }

  getLeagueStatistics(): Observable<any> {
    return this.leagueStatistics.asObservable();
  }
}
