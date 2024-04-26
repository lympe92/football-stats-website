import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditorModule } from './editor/editor.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignUpModule } from './sign-up-admin/sign-up.module'; 
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EditorModule,
    SharedModule,
    BrowserAnimationsModule,
    SignUpModule,
    UserModule,    
  ],
 
  bootstrap: [AppComponent],
})
export class AppModule {}
