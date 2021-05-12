import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Alert } from 'src/app/_models';

@Injectable({ providedIn: 'root' })
export class AlertService {
    private subject = new Subject<any>();
    private keepAfterNavigationChange = false;

    constructor(private router: Router) {
        // Clear alert message on route change
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterNavigationChange) {
                    // Only keep for a single location change
                    this.keepAfterNavigationChange = false;
                } else {
                    // Clear alert
                    this.subject.next();
                }
            }
        });
    }

    success(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        console.log('Sending success', message);
        this.subject.next(new Alert(message,  true));
    }

    error(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        console.log('Sending error', message);
        this.subject.next(new Alert(message,  false));
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
