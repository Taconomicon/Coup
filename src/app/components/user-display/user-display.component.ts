import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertService, AuthenticationService, UserService } from 'src/app/_services';
import { User } from 'src/app/_models';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'user-display',
  templateUrl: './user-display.component.html',
  styleUrls: ['./user-display.component.scss']
})
export class UserDisplayComponent implements OnInit, OnDestroy {
  userSub: Subscription;
  user: User;

  constructor(
    private readonly router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private userService: UserService
  ) {
    this.userSub = this.authenticationService.currentUser.subscribe((user: User) => {
      this.user = user;
    });
  }

  mysteryBox() {
    if (new Date().getMilliseconds() % 2) {
      this.alertService.error('Lose!');
    } else {
      this.alertService.success('Win!');
    }
  }

  logout() {
    console.log('Logging out...');
    this.authenticationService.logout();
    this.router.navigate(['.']);
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
