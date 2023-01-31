import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient} from '@angular/common/http';

import { User } from '../models/auth.models';
import { map } from 'rxjs/operators';



@Injectable({ providedIn: 'root' })
export class UserProfileService {
    private customHttpClient: HttpClient;
    currentUserSubject: any;
    constructor(private http: HttpClient,private backend:HttpBackend) { 
        this.customHttpClient = new HttpClient(backend);
    }

    getAll() {
        return this.http.get<User[]>(`/api/login`);
    }

     register1(user: User) {
        return this.http.post(`/users/register`, user);
     }

    register(user: User) {
        console.log("this is testing 111");
        const username=user.username;
        const email=user.email;
        const password=user.password;
        return this.customHttpClient
        .post<any>("http://localhost:8080/api/auth/signup", { username, email, password })
            .pipe(map(user => {
                  console.log('Data for testing is ' + JSON.stringify(user));
                  return user;
        }));
    }
}
