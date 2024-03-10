import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EditorDashboardComponent } from './editor/components/editor-dashboard/editor-dashboard.component';

const routes: Routes = [ { path: '', component: AppComponent },
{ path: 'editor', component: EditorDashboardComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
