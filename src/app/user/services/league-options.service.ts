import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  combineLatestWith,
  filter,
  map,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LeagueOptionsService {
  selectedLeague$ = new BehaviorSubject<any>(null);
  selectedSeason$ = new BehaviorSubject<any>(null);
  constructor() {}

  updateSelectedLeague(value: any): void {
    this.selectedLeague$.next(value);
  }

  getSelectedLeague(): Observable<any> {
    return this.selectedLeague$.asObservable();
  }

  updateSelectedSeason(value: any): void {
    this.selectedSeason$.next(value);
  }

  getSelectedSeason(): Observable<any> {
    return this.selectedSeason$.asObservable();
  }

  getLeagueOptions(): Observable<any> {
    return this.selectedLeague$.pipe(
      combineLatestWith(this.selectedSeason$),
      filter(([league, season]) => league && season),
      map(([league, season]) => {
        return {
          league: league,
          season: season,
        };
      })
    );
  }
}
