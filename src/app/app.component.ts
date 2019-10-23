import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Coup';

  ngOnInit() {
    // Spin up those dots
    setTimeout(function () {
      document.getElementById("dot_1").classList.toggle("fade1")
      document.getElementById("dot_2").classList.toggle("fade2")
      document.getElementById("arrow").classList.toggle("fade3")
    }, 7500);
  }
}
