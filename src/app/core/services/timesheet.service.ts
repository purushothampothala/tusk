import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {
  private baseUrl = "http://localhost:8080/api/v1/employeestimesheet";
  constructor(private http:HttpClient) { }

  getEmployee(id: number | undefined) : Observable<any>{
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createEmployee(employee : Object) : Observable<Object> {
    return this.http.post(this.baseUrl , employee);
  }

  updateEmployee(id: number | undefined, value: any):Observable<Object>{
    return this.http.put(this.baseUrl + "/" + id , value);
  }

  deleteEmployee(id:number) : Observable<any>{
    return this.http.delete(this.baseUrl + "/" + id , {responseType : 'text'});
  }

  getEmployeesList() : Observable<any>{
    return this.http.get(this.baseUrl);
  }

  getUsers(page: number): Observable<any>{
    return this.http.get(this.baseUrl + '?page=' + page);
  }

}
