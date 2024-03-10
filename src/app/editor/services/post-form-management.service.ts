import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/shared/models/post';

@Injectable({
  providedIn: 'root',
})
export class PostFormManagementService {
  constructor(private fb: FormBuilder) {}

  getPostForm(post?: Post): FormGroup {
    return this.fb.group({
      title: [post?.title ?? null,Validators.required],
      text: [post?.text ?? null],
      tags: [post?.tags ?? null,Validators.required],
      status: [post?.status ?? null],
      categories: [post?.categories ?? null,Validators.required],
    });
  }
}
