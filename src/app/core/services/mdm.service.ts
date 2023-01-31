import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction} from '@angular/fire/firestore';
import { getFirebaseBackend } from '../../authUtils';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/auth.models';
import { Observable } from 'rxjs';
import { Department } from '../models/department';
import { map } from 'rxjs/operators';
import { Employee } from '../models/employee';

const BASE_URL = "http://localhost:8080/api/auth";
@Injectable({ providedIn: 'root' })

export class MdmService {
  httpOptions: { headers: HttpHeaders; };
  
  constructor(private http: HttpClient) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`,
    });
    this.httpOptions = { headers: headers };
  }
  
  createUcic(ucic: any): Observable<any> {
    //this.getTokenAndSetHeaders();
    return this.http.post(
      BASE_URL + "/createucic",
      ucic,
      this.httpOptions
    );
  }
  createAgreement(agreement: any): Observable<any> {
    //this.getTokenAndSetHeaders();
    return this.http.post(
      BASE_URL + "/createagreement",
      agreement,
      this.httpOptions
    );
  }
  createAsset(asset: any): Observable<any> {
    //this.getTokenAndSetHeaders();
    return this.http.post(
      BASE_URL + "/createAsset",
      asset,
      this.httpOptions
    );
  }
  createBucket(bucket: any): Observable<any> {
    //this.getTokenAndSetHeaders();
    return this.http.post(
      BASE_URL + "/createBucket",
      bucket,
      this.httpOptions
    );
  }
  createSchedule(schedule: any): Observable<any> {
    //this.getTokenAndSetHeaders();
    return this.http.post(
      BASE_URL + "/createSchedule",
      schedule,
      this.httpOptions
    );
  }
  createManager(manager: any): Observable<any> {
    //this.getTokenAndSetHeaders();
    return this.http.post(
      BASE_URL + "/createManager",
      manager,
      this.httpOptions
    );
  }
  createEmpReport(empReporting: any): Observable<any> {
    //this.getTokenAndSetHeaders();
    return this.http.post(
      BASE_URL + "/createEmpReport",
      empReporting,
      this.httpOptions
    );
  }
  createCr(cr: any): Observable<any> {
    //this.getTokenAndSetHeaders();
    return this.http.post(
      BASE_URL + "/createcr",
      cr,
      this.httpOptions
    );
  }

  viewUcic(): Observable<any> {
    //this.getTokenAndSetHeaders();
    return this.http.get(
      BASE_URL + "/getUcic",
      this.httpOptions
    );
  }
  viewManager(): Observable<any> {
    //this.getTokenAndSetHeaders();
    return this.http.get(
      BASE_URL + "/getManager",
      this.httpOptions
    );
  }
  viewEmpReport(): Observable<any> {
    //this.getTokenAndSetHeaders();
    return this.http.get(
      BASE_URL + "/getEmpReport",
      this.httpOptions
    );
  }
  viewEmpReport1(empManagerId: string):Observable<any> {
    //this.getTokenAndSetHeaders();
    return this.http.get(
      BASE_URL + "/getEmpReport/"+empManagerId,
      this.httpOptions
    );
  }
  viewAgreement(): Observable<any> {
    //this.getTokenAndSetHeaders();
    return this.http.get(
      BASE_URL + "/getAgreement",
      this.httpOptions
    );
  }
  viewAsset(): Observable<any> {
    //this.getTokenAndSetHeaders();
    return this.http.get(
      BASE_URL + "/getAsset",
      this.httpOptions
    );
  }
  viewBucket(): Observable<any> {
    //this.getTokenAndSetHeaders();
    return this.http.get(
      BASE_URL + "/getBucket",
      this.httpOptions
    );
  }
  viewSchedule(): Observable<any> {
    //this.getTokenAndSetHeaders();
    return this.http.get(
      BASE_URL + "/getSchedule",
      this.httpOptions
    );
  }
  viewCr(): Observable<any> {
    //this.getTokenAndSetHeaders();
    return this.http.get(
      BASE_URL + "/getCr",
      this.httpOptions
    );
  }
  deleteUcic(id: number): Observable<any> {
  
    return this.http.delete(
      BASE_URL + '/deleteucic/'+id,
      this.httpOptions
    );
  }

  deleteManager(id: number): Observable<any> {
  
    return this.http.delete(
      BASE_URL + '/deleteManager/'+id,
      this.httpOptions
    );
  }
  deleteAgreement(id: number): Observable<any> {
  
    return this.http.delete(
      BASE_URL + '/deleteagreement/'+id,
      this.httpOptions
    );
  }
  deleteAsset(id: number): Observable<any> {
  
    return this.http.delete(
      BASE_URL + '/deleteAsset/'+id,
      this.httpOptions
    );
  }
  deleteBucket(id: number): Observable<any> {
  
    return this.http.delete(
      BASE_URL + '/deleteBucket/'+id,
      this.httpOptions
    );
  }
  deleteSchedule(id: number): Observable<any> {
  
    return this.http.delete(
      BASE_URL + '/deleteSchedule/'+id,
      this.httpOptions
    );
  }
  deleteCr(id: number): Observable<any> {
  
    return this.http.delete(
      BASE_URL + '/deleteCr/'+id,
      this.httpOptions
    );
  }
  
}
