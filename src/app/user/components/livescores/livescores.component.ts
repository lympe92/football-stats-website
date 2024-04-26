import { Component, OnDestroy, OnInit } from '@angular/core';
import { IsportsApiService } from '../../services/isports-api.service';
import { Router } from '@angular/router';
import { LivescoresService } from '../../services/livescores.service';
import { FormGroup } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatchData } from '../../models/match';
import { LeagueMatchesData } from '../../models/League-matches-data';
import { LivescoreFetchOptions } from '../../models/livescores-fetch-options';
import {
  Observable,
  Subject,
  interval,
  startWith,
  switchMap,
  takeUntil,
} from 'rxjs';

@Component({
  selector: 'app-livescores',
  templateUrl: './livescores.component.html',
  styleUrls: ['./livescores.component.scss'],
})
export class LivescoresComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  calendarDates!: string[];
  selectedDate!: string;
  livescoresForm!: FormGroup;
  leagueMatchesData$!: Observable<LeagueMatchesData[]>;

  constructor(
    private _apiService: IsportsApiService,
    private _router: Router,
    private _livescoresService: LivescoresService
  ) {
    this.calendarDates = this._livescoresService.getCalendarDates();
    this.selectedDate = this.calendarDates[1];
  }

  ngOnInit(): void {
    this.getLivescoresForm();
    this.getLivescores(this.livescoresForm.value);

    this.handleLivescoresFormChanges();
  }

  private getLivescoresForm(): void {
    this.livescoresForm = this._livescoresService.getLivescoresForm();
    this.livescoresForm.get('selectedDate')?.patchValue(this.selectedDate);
  }

  private handleLivescoresFormChanges(): void {
    this.livescoresForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((formValue: LivescoreFetchOptions) => {
        if (!formValue.allScoresMode && !formValue.selectedMatchesIds) {
          this.livescoresForm.get('allScoresMode')?.patchValue(true);
          return;
        }
        this.getLivescores(this.livescoresForm.value);
      });
  }

  onMatchNavigate(match: MatchData): void {
    this._router.navigate([`/match-preview/${match.fixture.id}`]);
  }

  private getLivescores(livescoresParams: LivescoreFetchOptions): void {
    this.leagueMatchesData$ = interval(30000).pipe(
      startWith(null),
      switchMap((_) => this._apiService.getLivescores(livescoresParams))
    );
  }

  onChangeField(value: MatTabChangeEvent): void {
    let boolean = value.tab.textLabel === 'All scores' ? true : false;
    this.livescoresForm.get('allScoresMode')?.patchValue(boolean);
  }

  onPreviousDate(): void {
    let index = this.calendarDates.findIndex(
      (date) => date === this.selectedDate
    );
    this.selectedDate = this.calendarDates[index - 1];
    this.livescoresForm.get('selectedDate')?.patchValue(this.selectedDate);
  }

  onNextDate(): void {
    let index = this.calendarDates.findIndex(
      (date) => date === this.selectedDate
    );
    this.selectedDate = this.calendarDates[index + 1];

    this.livescoresForm.get('selectedDate')?.patchValue(this.selectedDate);
  }

  onAddMatchToMyScores(match: MatchData): void {
    let selectedMatchesIdsFormGroup =
      this.livescoresForm.get('selectedMatchesIds');
    let selectedMatchesIds = selectedMatchesIdsFormGroup?.value ?? [];
    selectedMatchesIds.push(match.fixture.id);

    selectedMatchesIdsFormGroup?.patchValue(selectedMatchesIds);
  }

  onRemoveMatchFromMyScores(match: MatchData): void {
    let selectedMatchesIdsFormGroup =
      this.livescoresForm.get('selectedMatchesIds');
    let selectedMatchesIds = selectedMatchesIdsFormGroup?.value ?? [];

    let index = selectedMatchesIds.findIndex(
      (id: number) => id === match.fixture.id
    );
    if (index < 0) return;
    selectedMatchesIds.splice(index, 1);

    if (selectedMatchesIds.length === 0) selectedMatchesIds = null;
    selectedMatchesIdsFormGroup?.patchValue(selectedMatchesIds ?? null);
  }

  onIsMatchSelected(match: MatchData): boolean {
    return !!this.livescoresForm
      .get('selectedMatchesIds')
      ?.value?.includes(match.fixture.id);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
