import { Component } from '@angular/core';
import { FirebaseApiService } from '../../../shared/services/firebase-api.service';
import { Observable } from 'rxjs';
import { Post } from 'src/app/shared/models/post';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialog } from '../../dialogs/delete-dialog/delete-dialog.component';
import { EditPostDialog } from '../../dialogs/edit-post-dialog/edit-post-dialog.component';
import { take } from 'rxjs/operators';
import { PostCategory } from 'src/app/shared/models/post-category';
import { FormControl } from '@angular/forms';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss'],
})
export class AllPostsComponent {
  posts$!: Observable<Post[]>;
  postCategories$!: Observable<PostCategory[]>;
  postStatuses = ['draft', 'visible'];
  categoriesControl = new FormControl([]);
  statusControl = new FormControl([]);
  displayedColumns: string[] = [
    'title',
    'status',
    'categories',
    'tags',
    'edit',
    'delete',
  ];

  constructor(
    private _firebaseService: FirebaseApiService,
    public dialog: MatDialog,
    private _snackBarService: SnackBarService
  ) {
    this.fetchAllPosts();
    this.fetchCategories();
  }

  private fetchAllPosts(): void {
    this.posts$ = this._firebaseService.fetchPosts();
  }

  private fetchCategories(): void {
    this.postCategories$ = this._firebaseService.fetchCategories();
  }

  onFetchPostsBySearch(): void {
    let selectedCategories = this.categoriesControl.value;
    let statusControl = this.statusControl.value;
    this.posts$ = this._firebaseService.fetchFilteredPosts(
      statusControl,
      selectedCategories
    );
  }

  onOpenEditPostDialog(post: Post): void {
    const dialogRef = this.dialog.open(EditPostDialog, {
      maxWidth: '900px',
      height: '80%',
      width: '90%',
      data: {
        post: post,
      },
    });

    dialogRef.afterClosed().subscribe((post: Post) => {
      if (!post) return;
      this._firebaseService
        .updatePost(post)
        .pipe(take(1))
        .subscribe((x: any) => {
          this._snackBarService.openSnackBar('Post edited succesfully!');
          this.fetchAllPosts();
        });
    });
  }

  onDeletePostDialog(post: Post): void {
    const dialogRef = this.dialog.open(DeleteDialog, {
      data: {
        value: 'post',
      },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) this.onDeletePost(post);
    });
  }

  onDeletePost(post: Post): void {
    this._firebaseService
      .deletePost(post)
      .pipe(take(1))
      .subscribe((x: void) => {
        this.fetchAllPosts();
        this._snackBarService.openSnackBar('Post deleted succesfully!');
      });
  }

  reversePosts(posts: Post[]): Post[] {
    return posts.reverse();
  }
}
