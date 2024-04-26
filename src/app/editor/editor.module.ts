import { NgModule, OnInit } from '@angular/core';
import { EditorDashboardComponent } from './components/editor-dashboard/editor-dashboard.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { SharedModule } from '../shared/shared.module';
import { AsideMenuComponent } from './components/aside-menu/aside-menu.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AllPostsComponent } from './components/all-posts/all-posts.component';
import { EditorRoutingModule } from './editor-routing.module';
import { DeleteDialog } from './dialogs/delete-dialog/delete-dialog.component';
import { EditPostDialog } from './dialogs/edit-post-dialog/edit-post-dialog.component';
import { PostFormComponent } from './components/new-post/post-form/post-form.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    EditorDashboardComponent,
    NewPostComponent,
    AsideMenuComponent,
    CategoriesComponent,
    AllPostsComponent,
    DeleteDialog,
    EditPostDialog,
    PostFormComponent,
  ],
  imports: [CommonModule, EditorRoutingModule, SharedModule],
})
export class EditorModule implements OnInit {
  ngOnInit(): void {}
}
