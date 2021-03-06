import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserDisplayComponent } from './user-display/user-display.component';
import { DotsComponent } from './dots/dots.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserDisplayComponent,
    DotsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
