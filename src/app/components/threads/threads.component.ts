import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertService, AuthenticationService, UserService } from 'src/app/_services';
import { User } from 'src/app/_models';
import { Subscription } from 'rxjs';

enum FunFacts {
  Hello = 'Hello World!',
  Intro = "Someday you'll be able to post messages on this website! That'll be cool.",
  Contact = "If you have questions about this project, please message me on GitHub!",
  Lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vestibulum non arcu quis dignissim. Vivamus quis nulla ipsum. Suspendisse eget lobortis dui. Praesent laoreet est sed ullamcorper mattis. Duis id magna massa. Nulla scelerisque egestas rhoncus. Mauris vel dui sollicitudin, commodo ante quis, eleifend odio. Maecenas ex ligula, ultrices id efficitur ac, iaculis at risus. Phasellus facilisis metus et nulla pulvinar sagittis. Donec et odio sed metus sollicitudin fermentum eget in augue. Sed porttitor egestas cursus. Donec elementum lectus sed dui posuere, sit amet efficitur orci aliquam. Cras elementum nisi non luctus porttitor."
}

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
    private alertService: AlertService,
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
    const rand = new Date().getMilliseconds() % 4;
    this.alertService.success(FunFacts[Object.keys(FunFacts)[rand]], true);

    this.dotsActive = !this.dotsActive;
    setTimeout(() => {
      this.dotsActive2 = !this.dotsActive2;
    }, 700);
  }

}
