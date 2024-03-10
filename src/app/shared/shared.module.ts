import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio'; 
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [],
  imports: [BrowserModule,ReactiveFormsModule,MatInputModule,MatRadioModule,AngularEditorModule,FormsModule  ],
  exports: [ReactiveFormsModule,MatInputModule,MatRadioModule,AngularEditorModule ,FormsModule],
})
export class SharedModule {}
