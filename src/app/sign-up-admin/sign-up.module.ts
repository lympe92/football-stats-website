import { NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SingUpRoutingModule } from './sign-up-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SignInComponent } from './sign-in/sign-in.component';

@NgModule({
  declarations: [SignUpComponent, SignInComponent],
  imports: [BrowserModule, SingUpRoutingModule, SharedModule],
})
export class SignUpModule implements OnInit {
  ngOnInit(): void {}
}
