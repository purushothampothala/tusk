import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/signin';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})

export class JWTAuthService {
    constructor(private http: HttpClient) { }

    login(email: string, password: string): Observable<any> {
        console.log('parameter is '+email+'****'+password);
        return this.http.post(AUTH_API, 
            { email: email, password: password }            
        , httpOptions);
    }

    register(username: string, email: string, password: string): Observable<any> {
        return this.http.post(AUTH_API + '/signup', {
            username,
            email,
            password
        }, httpOptions);
    }
}