import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-post-dialog',
  templateUrl: './edit-post-dialog.component.html',
  styleUrls: ['./edit-post-dialog.component.scss'],
})
export class EditPostDialog {
  postForm!: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  getFormValue(value: FormGroup): void {
    this.postForm = value;
  }
}
