import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, map, takeUntil } from 'rxjs';
import { Post } from 'src/app/shared/models/post';
import { FirebaseApiService } from 'src/app/shared/services/firebase-api.service';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  posts$ = new BehaviorSubject<Post[]>([]);
  tacticPost$!: Observable<Post>;
  playerPost$!: Observable<Post>;
  tacticPreviewPost$!: Observable<Post[]>;
  hideLoadMore: boolean = false;
  constructor(
    private _fireBaseService: FirebaseApiService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.tacticPost$ = this._fireBaseService
      .fetchPostsByCategory('tactical theory', 1)
      .pipe(map((posts) => posts[0]));
    this.playerPost$ = this._fireBaseService
      .fetchPostsByCategory('player analysis', 1)
      .pipe(map((posts) => posts[0]));
    this.tacticPreviewPost$ = this._fireBaseService.fetchPostsByCategory(
      'tactical preview',
      5
    );

    this.onLoadMorePosts();
  }

  onNavigate(url: string): void {
    this._router.navigate([url]);
  }

  onLoadMorePosts(): void {
    this._fireBaseService
      .fetchNextFiveVisiblePosts(
        this.posts$.value[this.posts$.value.length - 1]?.timestamp
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe((fetchedPosts: Post[]) => {
        if (fetchedPosts.length === 0) {
          this.hideLoadMoreButton();
        }
        this.posts$.next([...this.posts$.value, ...fetchedPosts]);
      });
  }

  hideLoadMoreButton(): void {
    this.hideLoadMore = true;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
