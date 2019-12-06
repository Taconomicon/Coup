import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dots',
  templateUrl: './dots.component.html',
  styleUrls: ['./dots.component.scss']
})
export class DotsComponent implements OnInit {
  private _active: boolean;
  private _arrow: boolean;

  private elementIds = [];

  private toggle() {
    for (let i = 0; i < 3; i++) {
      document.getElementById(this.elementIds[i]).classList.toggle(`fade${i+1}`);
    }
  }

  @Input()
  set arrow(arrow: boolean) {
    this._arrow = arrow;
  }

  @Input()
  set active(active: boolean) {
    this._active = active;
    if (this.elementIds.length > 0) {
      this.toggle();
    }
  }

  constructor() {}

  ngOnInit() {
    console.log('Dots init:', this._active, this._arrow);

    for(let i = 0; i < 3; i++) {
      this.elementIds[i] = 'dot_' + Math.random().toString(36).substr(2, 9);
    }

    // Only set if true on first load
    if (this._active) {
      this.toggle();
    }
  }
}
