import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/shared/models/post';
@Component({
  selector: 'app-side-post',
  templateUrl: './side-post.component.html',
  styleUrls: ['./side-post.component.scss'],
})
export class SidePostComponent {
  @Input() post!: Post;
  constructor(private _router: Router) {}

  onNavigateToCategory(event: any): void {
    event.stopPropagation();
    this._router.navigate([`/categories/${event.target.innerHTML.trim()}`]);
  }

  onPostNavigate(post: Post): void {
    this._router.navigate([
      `/post/${post.timestamp}/${post.title.split(' ').join('-')}`,
    ]);
  }
}
