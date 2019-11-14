import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Coup';
  dotsActive = false;
  dotsActive_2 = false;

  ngOnInit() {}

  toggleDots() {
    this.dotsActive = !this.dotsActive;
    setTimeout(() => {
      this.dotsActive_2 = !this.dotsActive_2;
    }, 700);
  }
}
