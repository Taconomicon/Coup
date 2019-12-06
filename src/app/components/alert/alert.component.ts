import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/_services';
import { Alert } from 'src/app/_models';

@Component({
    selector: 'alert',
    templateUrl: 'alert.component.html',
    styleUrls: ['alert.component.scss'],
})

export class AlertComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    alert: any;

    constructor(private alertService: AlertService) {}

    ngOnInit() {
        this.subscription = this.alertService.getMessage().subscribe((alert: Alert) => {
            console.log('Alert recieved:', alert);
            this.alert = alert;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}