import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  MatChipEditedEvent,
  MatChipInputEvent,
  MatChipListbox,
} from '@angular/material/chips';
import { Editor } from 'ngx-editor';
import { Observable } from 'rxjs';
import { FirebaseApiService } from 'src/app/shared/services/firebase-api.service';
import { PostFormManagementService } from 'src/app/editor/services/post-form-management.service';
import { Post } from 'src/app/shared/models/post';
import { PostCategory } from 'src/app/shared/models/post-category';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() post!: Post;
  @Output() emitPostForm = new EventEmitter<FormGroup>();
  @ViewChild('chipListbox') categoriesChipListBox!: MatChipListbox;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  postCategories$!: Observable<PostCategory[]>;
  tags: string[] = [];
  postForm!: FormGroup;
  editor!: Editor;
  html = '';

  constructor(
    private _postService: PostFormManagementService,
    private _firebaseService: FirebaseApiService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.editor = new Editor();
    this.postForm = this.getPostForm();
    this.postCategories$ = this._firebaseService.fetchCategories();
    this.emitForm();
  }

  ngAfterViewInit(): void {
    this.updateTagsAndCategories();
  }

  private getPostForm(): FormGroup {
    return this._postService.getPostForm(this.post ?? null);
  }

  private updateTagsAndCategories(): void {
    this.tags = this.postForm.get('tags')?.value ?? [];
    let categories = this.postForm.get('categories')?.value;
    this.categoriesChipListBox.writeValue(categories);
    this.cd.detectChanges();
  }

  onIsInitialCategory(category: PostCategory): boolean {
    return this.post
      ? Object.keys(this.postForm.get('categories')?.value)?.includes(
          category.title
        )
      : false;
  }

  onUpdateCategoriesValue(event: any): void {
    let newValue = event.value;
    const object: any = {};
    newValue.forEach((item: any) => {
      object[item] = true;
    });
    this.postForm.get('categories')?.setValue(object);
    this.emitForm();
  }

  onAddTag(event: MatChipInputEvent): void {
    const tag = (event.value || '').trim();

    if (tag) {
      this.tags.push(tag);
      this.emitForm();
    }

    event.chipInput!.clear();
  }

  onRemoveTag(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
      this.emitForm();
    }
  }

  onEditTag(tag: string, event: MatChipEditedEvent): void {
    const value = event.value.trim();

    if (!value) {
      this.onRemoveTag(tag);
      this.emitForm();
      return;
    }

    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags[index] = value;
    }
    this.emitForm();
  }

  onStructureFormImageClick(event: any) {
    let fileList = event.target.files;
    const file: File = fileList[0];

    let reader = new FileReader();
    let imageUrl = null;
    reader.onload = (event: any) => {
      imageUrl = event.target.result;
      this.postForm.get('featuredImage')?.setValue(imageUrl);
    };
    reader.readAsDataURL(file);
  }

  onClick(fileUpload: HTMLInputElement) {
    fileUpload.click();
  }

  resetPostFormAndValues(): void {
    this.postForm.reset();
    this.tags = [];
    this.categoriesChipListBox.writeValue(null);
  }

  emitForm(): void {
    this.emitPostForm.emit(this.postForm);
  }

  getTagsPlaceholder(): string {
    return this.tags.length < 5
      ? 'Add up to 5 tags and press enter...'
      : 'Remove a tag to add a new one...';
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
