import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/shared/models/post';
@Component({
  selector: 'app-post-header-card',
  templateUrl: './post-header-card.component.html',
  styleUrls: ['./post-header-card.component.scss'],
})
export class PostHeaderCardComponent {
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
