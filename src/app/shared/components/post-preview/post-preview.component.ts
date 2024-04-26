import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FirebaseApiService } from '../../services/firebase-api.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Post } from '../../models/post';
import { Editor } from 'ngx-editor';

@Component({
  selector: 'app-post-preview',
  templateUrl: './post-preview.component.html',
  styleUrls: ['./post-preview.component.scss'],
})
export class PostPreviewComponent implements OnInit, OnDestroy {
  constructor(
    private _route: ActivatedRoute,
    private _firebaseService: FirebaseApiService,
    private _router: Router
  ) {}
  destroy$ = new Subject<void>();
  post$!: Observable<Post>;
  posts$!: Observable<Post[]>;
  editor!: Editor;

  ngOnInit(): void {
    this.editor = new Editor();
    this._route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: Params) => {
        let timestamp = params['postId'];
        this.post$ = this._firebaseService.fetchPost(timestamp);
      });

    this.posts$ = this._firebaseService.fetchNextFiveVisiblePosts();
  }

  onPostNavigate(post: Post): void {
    this._router.navigate([
      `/post/${post.timestamp}/${post.title.split(' ').join('-')}`,
    ]);
  }

  onNavigateToCategory(category: string): void {
    this._router.navigate([`/categories/${category}`]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
