import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService, UserService } from 'src/app/_services';
import { User } from 'src/app/_models';
import { Subscription } from 'rxjs';


@Component({
  selector: 'threads',
  templateUrl: './threads.component.html',
  styleUrls: ['./threads.component.scss']
})
export class ThreadsComponent implements OnInit, OnDestroy {
  userSub: Subscription;
  user: User;

  dotsActive = false;
  dotsActive2 = false;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    this.userSub = this.authenticationService.currentUser.subscribe((user: User) => {
      this.user = user;
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  toggleDots() {
    this.dotsActive = !this.dotsActive;
    setTimeout(() => {
      this.dotsActive2 = !this.dotsActive2;
    }, 700);
  }

}
