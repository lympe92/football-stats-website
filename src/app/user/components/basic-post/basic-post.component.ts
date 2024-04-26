import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/shared/models/post';
@Component({
  selector: 'app-basic-post',
  templateUrl: './basic-post.component.html',
  styleUrls: ['./basic-post.component.scss'],
})
export class BasicPostComponent {
  @Input() post!: Post;
  constructor(private _router: Router) {}

  onPostNavigate(): void {
    this._router.navigate([
      `/post/${this.post.timestamp}/${this.post.title.split(' ').join('-')}`,
    ]);
  }
}
