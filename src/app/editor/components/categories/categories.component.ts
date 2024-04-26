import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PostFormManagementService } from '../../services/post-form-management.service';
import { FirebaseApiService } from '../../../shared/services/firebase-api.service';
import { Observable, take } from 'rxjs';
import { PostCategory } from 'src/app/shared/models/post-category';
import { DeleteDialog } from '../../dialogs/delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  categoryForm!: FormGroup;
  postCategories$!: Observable<PostCategory[]>;
  displayedColumns: string[] = ['title', 'description', 'delete'];
  constructor(
    private _postService: PostFormManagementService,
    private _firebaseService: FirebaseApiService,
    public dialog: MatDialog,
    private _snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.postCategories$ = this._firebaseService.fetchCategories();
    this.categoryForm = this.getCategoryForm();
  }
  private getCategoryForm(): FormGroup {
    return this._postService.getCategoryForm();
  }

  onDeletePostDialog(category: PostCategory): void {
    const dialogRef = this.dialog.open(DeleteDialog, {
      data: {
        value: 'category',
      },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) this.deleteCategory(category);
    });
  }

  onSaveCategory(): void {
    this._firebaseService
      .saveCategory(this.categoryForm.value)
      .pipe(take(1))
      .subscribe((x: any) => {
        this._snackBarService.openSnackBar('Category created succesfully!');

        this.postCategories$ = this._firebaseService.fetchCategories();
        this.categoryForm.reset();
      });
  }

  private deleteCategory(category: PostCategory): void {
    this._firebaseService
      .deleteCategory(category)
      .pipe(take(1))
      .subscribe((x) => {
        this._snackBarService.openSnackBar('Category deleted succesfully!');
        this.postCategories$ = this._firebaseService.fetchCategories();
      });
  }
}
