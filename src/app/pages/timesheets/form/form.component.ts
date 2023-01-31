import { Component, EventEmitter, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Timesheetweek } from 'src/app/core/models/timeweek.model';
//import { TimesheetweekService } from 'src/app/core/services/timesheetweek.service';
import { CalendarOptions, EventClickArg, EventApi } from '@fullcalendar/angular';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import { Department } from 'src/app/core/models/department';
import { Employee } from 'src/app/core/models/employee';


import { EmployesService } from 'src/app/core/services/employes.service';
import { DepartmentsService } from 'src/app/core/services/departments.service';
import { DatePipe } from '@angular/common';
import { TimesheetweekService } from 'src/app/core/services/timesheetweek.service';

export class TimeDetails {
  empId: string;
  workDate: any;
  hours: number;
  projectId: any;
  taskId: any;
}



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {

 datOfWeek:number= 0;
  pipe = new DatePipe('en-US');
  getDateOfIndex(index: number): string {

    if (index === 0) {
      return 'Project';
    }
    if(index === 8) {
      return 'Hours';
    }
       const now = new Date();
    const weekStartDate = new Date(now);
    weekStartDate.setDate(weekStartDate.getDate() - weekStartDate.getDay() +(index)+this.datOfWeek);
    let mondayDate = this.pipe.transform(weekStartDate, 'MMM-dd-yyyy');
    return mondayDate;
  }
   setDateOfWeek(ddd){
    this.datOfWeek=this.datOfWeek+ddd;
  }
   employeeNameFC = new FormControl();
  // employees: Employee[] = [];
  employees: Array<Employee> = [];
  employeeId = 0;
  weekdays: string[] = ['select', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday','total'];
  calenderOptions: CalendarOptions = {
    firstDay: 1,
    initialView: "dayGridWeek",
    aspectRatio: 12,
  }
  timesheetweek: Timesheetweek = new Timesheetweek();
  submitted = false;
  blankRowArray: Array<Employee> = [];
  blankRowData = new Timesheetweek();
  hideMultiSelectDropdownAll: boolean[] = [];
    constructor(private service: TimesheetweekService,private router: Router) { }
  ngOnInit() {
  }
  getTotalHours(blankRowArray): number {
    
    return blankRowArray.monday + blankRowArray.tuesday + blankRowArray.wednesday
      + blankRowArray.thursday + blankRowArray.friday + blankRowArray.saturday + blankRowArray.sunday;
   
  }

  



 addBlankRow() {
  
    this.blankRowArray.push({
      monday: 0,
      tuesday: 0,
      wednesday: 0,
      thursday: 0,
      friday: 0,
      saturday: 0,
      sunday: 0,
      projectId: 0,
      taskId: 0
    });
  }
  deleteRow(index) {
    this.blankRowArray.splice(index, 1);
  }
 /* newEmployee(): void {
    this.submitted = false;
    this.timesheetweek = new Timesheetweek();
  }*/
  save() {
    console.log ('data is timesheet '+JSON.stringify(this.blankRowArray));
    let timesheetData: Array<TimeDetails> =[];
    
    for(let i=0; i<this.blankRowArray.length; i++){
      let timeData = new TimeDetails();
      timeData.empId="1234";
      timeData.projectId=1234;
      timeData.taskId=1234;
      timeData.hours=this.blankRowArray[i].monday;
      timeData.workDate=this.getDateOfIndex(1);
      timesheetData.push(timeData);

      timeData = new TimeDetails();
      timeData.empId="1234";
      timeData.projectId=1234;
      timeData.taskId=1234;
      timeData.hours=this.blankRowArray[i].tuesday;
      timeData.workDate=this.getDateOfIndex(2);
      timesheetData.push(timeData);

      timeData = new TimeDetails();
      timeData.empId="1234";
      timeData.projectId=1234;
      timeData.taskId=1234;
      timeData.hours=this.blankRowArray[i].wednesday;
      timeData.workDate=this.getDateOfIndex(3);
      timesheetData.push(timeData);


      timeData = new TimeDetails();
      timeData.empId="1234";
      timeData.projectId=1234;
      timeData.taskId=1234;
      timeData.hours=this.blankRowArray[i].thursday;
      timeData.workDate=this.getDateOfIndex(4);
      timesheetData.push(timeData);

      timeData = new TimeDetails();
      timeData.empId="1234";
      timeData.projectId=1234;
      timeData.taskId=1234;
      timeData.hours=this.blankRowArray[i].friday;
      timeData.workDate=this.getDateOfIndex(5);
      timesheetData.push(timeData);

      timeData = new TimeDetails();
      timeData.empId="1234";
      timeData.projectId=1234;
      timeData.taskId=1234;
      timeData.hours=this.blankRowArray[i].saturday;
      timeData.workDate=this.getDateOfIndex(6);
      timesheetData.push(timeData);

      timeData = new TimeDetails();
      timeData.empId="1234";
      timeData.projectId=1234;
      timeData.taskId=1234;
      timeData.hours=this.blankRowArray[i].sunday;
      timeData.workDate=this.getDateOfIndex(7);
      timesheetData.push(timeData);
    }
    const data:JSON=<JSON><any>{
      "data":timesheetData
    }
    console.log('Timesheet details look like '+JSON.stringify(data));
    console.log('Timesheet details look like '+timesheetData);

    this.service.createEmployee(JSON.stringify(data)).subscribe(
      data => {
       
        this.goToList();
      }, error => console.log(error));
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  goToList() {
    this.router.navigate(['']);
  }

}



