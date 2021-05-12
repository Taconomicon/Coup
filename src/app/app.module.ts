import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackendProviderMock } from './_mocks';
import { JwtInterceptor } from './_interceptors';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  RegisterComponent,
  NavbarComponent,
  UserDisplayComponent,
  DotsComponent,
  LoginComponent,
  ThreadsComponent,
  AlertComponent,
} from './components';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    NavbarComponent,
    UserDisplayComponent,
    DotsComponent,
    LoginComponent,
    RegisterComponent,
    ThreadsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    BackendProviderMock
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
