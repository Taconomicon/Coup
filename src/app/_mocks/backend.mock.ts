import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { User } from 'src/app/_models';

/**
 * Sourced with changes: https://github.com/cornflourblue/angular-7-registration-login-example-cli
 */

// Array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];

@Injectable()
export class BackendMock implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        /**
         * Call materialize and dematerialize to ensure delay in call below,
         * even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
         */
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/register') && method === 'POST':
                    return register();
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                case url.match(/\/users\/\d+$/) && method === 'GET':
                    return getUserById();
                case url.match(/\/users\/\d+$/) && method === 'DELETE':
                    return deleteUser();
                default:
                    // Pass through any requests not handled above
                    return next.handle(request);
            }
        }

        function register() {
            const user = body;

            if (users.find((account: User) => account.username === account.username)) {
                return error('Sorry, the username "' + user.username + '" is already taken :(');
            }

            user.id = users.length ? Math.max(...users.map((account: User) => account.id)) + 1 : 1;

            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));

            return ok();
        }

        function authenticate() {
            const { username, password } = body;
            // ToDo -- Check against hashed, encrypted password, match on that...
            const user = users.find((account: User)  =>
                account.username === username &&
                account.password === password);

            return user ?
                ok({
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    // ToDo -- Use a real token pls
                    token: 'fake-jwt-token'
                }) :
                error('Username or password is incorrect.');
        }

        function getUsers() {
            return isLoggedIn() ?
                ok(users) :
                unauthorized();
        }

        function getUserById() {
            if (!isLoggedIn()) {
                return unauthorized();
            }

            const user = users.find((account: User) => account.id === idFromUrl());
            return ok(user);
        }

        function deleteUser() {
            if (!isLoggedIn()) {
                return unauthorized();
            }

            users = users.filter((account: User) => account.id !== idFromUrl());
            localStorage.setItem('users', JSON.stringify(users));
            return ok();
        }

        function ok(content?) {
            return of(new HttpResponse({ status: 200, body: content }));
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorized' } });
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1], 10);
        }
    }
}

export const BackendProviderMock = {
    provide: HTTP_INTERCEPTORS,
    useClass: BackendMock,
    multi: true
};
