import { NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EditorDashboardComponent } from './components/editor-dashboard/editor-dashboard.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { SharedModule } from '../shared/shared.module';
import { Post } from '../shared/models/post';

@NgModule({
  declarations: [EditorDashboardComponent, NewPostComponent],
  imports: [BrowserModule, SharedModule],
})
export class EditorModule implements OnInit {
  ngOnInit(): void {}
}
