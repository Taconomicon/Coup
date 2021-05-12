import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, AuthenticationService } from 'src/app/_services';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [
        trigger('fadeInOut', [
          transition(':enter', [
            style({opacity: 0 }),
            animate('0.3s ease-in', style({opacity: '1'}))
          ]) ,
          transition(':leave', [
            style({opacity: 1}),
            animate('0.3s ease-out', style({opacity: '0'}))
          ])
        ])
      ]
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
    ) {
        // Redirect if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // Get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    }

    // Helper for easy access to form fields
    get f(): { [key: string]: AbstractControl; } { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // Return if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    console.error('Error recieved from auth service:', error.error);
                    this.alertService.error(error.error.message);
                    this.loading = false;
                });
    }
}