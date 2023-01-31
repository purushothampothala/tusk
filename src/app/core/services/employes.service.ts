import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployesService {
  constructor(
    private db: AngularFirestore
    ) { }

    saveEmployeeHours(employee: Employee): any {
      this.db.collection('employee-hours').add(employee);
  }

 /* getEmployeeHoursByDepartment(departmentId: string): Observable<Employee[]> {
    const filteredEmployees = this.db.collection('employee-hours', ref => ref.where('departmentId', '==', departmentId));
    return filteredEmployees.snapshotChanges().pipe(
        map((items: DocumentChangeAction<Employee>[]): Employee[] => {
            return items.map((item: DocumentChangeAction<Employee>): Employee => {
                return {
                    id: item.payload.doc.id,
                   
                    name: item.payload.doc.data().name,
                    
                    monday: item.payload.doc.data().monday,
                    tuesday: item.payload.doc.data().tuesday,
                    wednesday: item.payload.doc.data().wednesday,
                    thursday: item.payload.doc.data().thursday,
                    friday: item.payload.doc.data().friday,
                    saturday: item.payload.doc.data().saturday,
                    sunday: item.payload.doc.data().sunday,
                };
            });
        })
    );
}*/

updateEmployeeHours(employee: Employee): any {
  this.db.collection('employee-hours').doc(employee.id).set(employee);
}

deleteEmployeeHours(employee: Employee): any {
  this.db.collection('employee-hours').doc(employee.id).delete();
}

}
