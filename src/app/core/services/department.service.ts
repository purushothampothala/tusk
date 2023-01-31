import { Injectable } from '@angular/core';

import { getFirebaseBackend } from '../../authUtils';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/auth.models';
import { Observable } from 'rxjs';
import { Department } from '../models/department';

@Injectable({ providedIn: 'root' })

export class AuthenticationService {

    departments: Department[] = [
        {id: '1', name: 'Customer Success'},
        {id: '2', name: 'Sales'},
        {id: '3', name: 'Finance'},
    ];
    
      constructor(
        private http: HttpClient
      ) { }
    
      getDeparments(): Observable<Department[]> {
        return this.http.get<Department[]>(`https://hr-timesheet-test.firebaseio.com/departments.json`);
    }
    
    }
    