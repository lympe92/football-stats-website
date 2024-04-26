import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Post } from 'src/app/shared/models/post';
import { FirebaseApiService } from 'src/app/shared/services/firebase-api.service';
@Component({
  selector: 'app-news-by-category',
  templateUrl: './news-by-category.component.html',
  styleUrls: ['./news-by-category.component.scss'],
})
export class NewsByCategoryComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  @Input() category!: string;
  posts$!: Observable<Post[]>;
  constructor(
    private _route: ActivatedRoute,
    private _fireBaseService: FirebaseApiService
  ) {}

  ngOnInit(): void {
    this._route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: Params) => {
        this.category = params['category'];
        this.posts$ = this._fireBaseService.fetchPostsByCategory(this.category);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
