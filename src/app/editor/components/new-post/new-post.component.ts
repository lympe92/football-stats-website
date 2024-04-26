import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FirebaseApiService } from '../../../shared/services/firebase-api.service';
import { PostFormComponent } from './post-form/post-form.component';
import { take } from 'rxjs';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent {
  @ViewChild(PostFormComponent) postFormComponet!: PostFormComponent;
  postForm!: FormGroup;

  constructor(
    private _firebaseServvice: FirebaseApiService,
    private _router: Router,
    private _snackBarService: SnackBarService
  ) {}

  getFormValue(value: FormGroup): void {
    this.postForm = value;
  }

  savePost(): void {
    this.setTimestampToPost();
    this._firebaseServvice
      .savePost(this.postForm.value)
      .pipe(take(1))
      .subscribe(
        () => {
          this._snackBarService.openSnackBar('Post created succesfully!');
          this.postFormComponet.resetPostFormAndValues();
          this.onPostsNavigate();
        },
        (error) => {
          this._snackBarService.openSnackBar(
            'There is a problem with post creation!'
          );
        }
      );
  }

  private setTimestampToPost(): void {
    this.postForm.get('timestamp')?.setValue(Date.now());
  }

  onPostsNavigate(): void {
    this._router.navigate(['editor/posts']);
  }
}
