import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TimeDetails } from 'src/app/pages/timesheet/form/form.component';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})

export class TimesheetweekService {

  private baseUrl = "http://localhost:8080/api/v1/timesheet";
  httpClient: any;
  url: string;
 
  constructor(private http: HttpClient) { }

  getEmployee(id: number | undefined): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createEmployee(timesheetData: any): any {
      return this.http.post(this.baseUrl, timesheetData);
  }
  

  updateEmployee(id: number | undefined, value: any): Observable<Object> {
    return this.http.put(this.baseUrl + "/" + id, value);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + "/" + id, { responseType: 'text' });
  }

  getEmployeesList(page: number): Observable<any> {
    return this.http.get(this.baseUrl + '?page=' + page);
  }




}
