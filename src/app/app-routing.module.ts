import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorRoutingModule } from './editor/editor-routing.module';
import { UserRoutingModule } from './user/user-routing.module';
import { SignUpModule } from './sign-up-admin/sign-up.module';
import { PostPreviewComponent } from './shared/components/post-preview/post-preview.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'sign-in',
    loadChildren: () =>
      import('./sign-up-admin/sign-up.module').then((m) => m.SignUpModule),
  },
  { path: 'post/:timestamp/:title', component: PostPreviewComponent },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    EditorRoutingModule,
    UserRoutingModule,
    SignUpModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
