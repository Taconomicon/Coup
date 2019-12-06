import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './_guards/auth.guard';
import {
  RegisterComponent,
  LoginComponent,
  ThreadsComponent,
} from './components';

const routes: Routes = [
  { path: '', component: ThreadsComponent, },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '**/*',
    component: AppComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
