import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/shared/models/post';
import { PostCategory } from 'src/app/shared/models/post-category';

@Injectable({
  providedIn: 'root',
})
export class PostFormManagementService {
  constructor(private fb: FormBuilder) {}

  getPostForm(post?: Post): FormGroup {
    return this.fb.group({
      title: [post?.title ?? null, Validators.required],
      featuredImage: [post?.featuredImage ?? null],
      text: [post?.text ?? null],
      tags: [post?.tags ?? null, Validators.required],
      status: [post?.status ?? null, [Validators.required]],
      categories: [post?.categories ?? null, [Validators.required]],
      timestamp: [post?.timestamp ?? null],
    });
  }

  getCategoryForm(category?: PostCategory): FormGroup {
    return this.fb.group({
      title: [category?.title ?? null, Validators.required],
      description: [category?.description ?? null],
    });
  }
}
