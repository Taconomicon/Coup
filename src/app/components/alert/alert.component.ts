import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/_services';
import { Alert } from 'src/app/_models';
import { filter } from 'rxjs/operators';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
    selector: 'alert',
    templateUrl: 'alert.component.html',
    styleUrls: ['alert.component.scss'],
    animations: [
        trigger('alertAnimation', [
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

export class AlertComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    alerts = {};
    alertList = [];

    constructor(private alertService: AlertService) {}

    ngOnInit() {
        this.subscription = this.alertService.getMessage().pipe(
            filter(msg => msg instanceof Alert)
        ).subscribe((alert: Alert) => {
            this.alerts[alert.id] = alert;
            this.alertList.push(alert.id);
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    // Remove from alert list
    dismiss(id: number): void {
        console.log('List before reduce:', this.alertList);

        this.alertList = this.alertList.filter((entry) => entry !== id);
        console.log('List after reduce:', this.alertList);

        if (this.alerts[id]) {
            this.alerts[id] = undefined;
        }
    }
}
