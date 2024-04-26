import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorDashboardComponent } from './components/editor-dashboard/editor-dashboard.component';
import { AllPostsComponent } from './components/all-posts/all-posts.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AuthGuard } from 'src/core/auth/auth-guard';

const routes: Routes = [
  {
    path: 'editor',
    component: EditorDashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'posts',
        pathMatch: 'full',
      },
      { path: 'posts', component: AllPostsComponent },
      { path: 'new-post', component: NewPostComponent },
      { path: 'categories', component: CategoriesComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditorRoutingModule {}
