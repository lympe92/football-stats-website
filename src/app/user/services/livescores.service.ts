import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class LivescoresService {
  constructor(private fb: FormBuilder) {}

  getCalendarDates(): string[] {
    let today = new Date(); 
    let yesterday = new Date(today); 
    yesterday.setDate(today.getDate() - 1); 

    let tomorrow = new Date(today); 
    tomorrow.setDate(today.getDate() + 1); 

    return [
      this.formatDate(yesterday),
      this.formatDate(today),
      this.formatDate(tomorrow),
    ];
  }

  formatDate(date: Date): string {
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    let day = date.getDate().toString().padStart(2, '0'); 
    return `${year}-${month}-${day}`;
  }

  getLivescoresForm(): FormGroup {
    return this.fb.group({
      live: [false],
      selectedDate: [null],
      allScoresMode: [true],
      selectedMatchesIds: [null],
    });
  }
}
