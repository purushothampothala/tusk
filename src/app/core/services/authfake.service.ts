import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { User } from '../models/auth.models';

@Injectable({ providedIn: 'root' })
export class AuthfakeauthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    private customHttpClient: HttpClient;

    constructor(private http: HttpClient, backend: HttpBackend) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        this.customHttpClient = new HttpClient(backend);
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login1(email: string, password: string) {
        console.log('this is 1');
        return this.http.post<any>(`/users/authenticate`, { email, password })
            .pipe(map(user => {
                console.log('this is 11');
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    }

    login(email: string, password: string) {
        
        console.log("this is testing 111");
        return this.customHttpClient
            .post<any>("http://localhost:8080/api/auth/signin", { email, password })
            .pipe(
                map(user => {
                    
                    const body = {
                        id: user.id,
                        email: user.email,
                        username: user.username,
                       // empId:user.empId,
                        //firstName: user.firstName,
                        //lastName: user.lastName,
                        token: user.accessToken
                    };
                    console.log('Data for testing is ' + user);
                    if (user && user.accessToken) {
                        localStorage.setItem('currentUser', JSON.stringify(user));
                        localStorage.setItem('users', JSON.stringify(user));
                        this.currentUserSubject.next(user);
                    }
                    return user;
                }));
    }



    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
