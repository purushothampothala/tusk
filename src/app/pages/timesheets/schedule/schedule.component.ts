import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Schedule} from './schedule';
import { FormGroup } from '@angular/forms';
import { MdmService } from 'src/app/core/services/mdm.service';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  scheduleDetails: Schedule[];
  submitted = false;
    formData: FormGroup;
    term:any;
  constructor(private route:ActivatedRoute,
              private router:Router,
              private mdmService:MdmService,private modalService: NgbModal, private formBuilder: FormBuilder,) { }

              ngOnInit() {
                 this.formData = this.formBuilder.group({
                  dueDate: ['', [Validators.required]],
                  installmentAmount: ['', [Validators.required]],
                  principalPartOfInstallment: ['', [Validators.required]],
                  interestPartOfInstallment: ['', [Validators.required]],
                  tdsPartOfInstallment: ['', [Validators.required]],
                  installmentAmountPaidTillDate: ['', [Validators.required]],
                  principalAmountPaid: ['', [Validators.required]],
                  tdsAmountPaid: ['', [Validators.required]],
                  interestAmountPaid: ['', [Validators.required]],
                  balancePartOfInstallment: ['', [Validators.required]],
                  lastPaymentDate: ['', [Validators.required]],
                  status: ['', [Validators.required]],
                });
            
                this._fetchData();
              }
            
             

    private _fetchData() {
      this.mdmService.viewSchedule().subscribe(
        (data) => {
          console.log('Data from backend is ' + data);
          this.scheduleDetails = data;
        });
    }
    get form() {
      return this.formData.controls;
    }
 /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {
    this.modalService.open(content);
  }

  saveSchedule() {
    const currentDate = new Date();
    if (this.formData.valid) {
      const projectData: JSON = <JSON><any>{
      "dueDate" : this.formData.get('dueDate').value,
      "installmentAmount": this.formData.get('installmentAmount').value,
      "principalPartOfInstallment": this.formData.get('principalPartOfInstallment').value,
      "interestPartOfInstallment": this.formData.get('interestPartOfInstallment').value,
      "tdsPartOfInstallment": this.formData.get('tdsPartOfInstallment').value,
      "installmentAmountPaidTillDate": this.formData.get('installmentAmountPaidTillDate').value,
      "principalAmountPaid": this.formData.get('principalAmountPaid').value,
      "tdsAmountPaid": this.formData.get('tdsAmountPaid').value,
      "interestAmountPaid": this.formData.get('interestAmountPaid').value,
      "balancePartOfInstallment": this.formData.get('BalancePartOfInstallment').value,
      "lastPaymentDate": this.formData.get('lastPaymentDate').value,
      "status": this.formData.get('status').value,

      "createdDate": currentDate
      
      }
     
      console.log('Data is '+JSON.stringify(projectData));

      this.mdmService.createSchedule(JSON.stringify(projectData)).subscribe(
        (data) => {
          console.log('Data from backend is ' + data);
          this._fetchData();
        });
        this.modalService.dismissAll()
    }
    this.submitted = true
  }

  editSchedule(id:number, row: Schedule) {
    console.log("inside edit employee"+id + " row "+JSON.stringify(row));
    
    if (id === 0) {
     this.mdmService.createSchedule(row).subscribe((newUser: Schedule) => {
        id = newUser.id;
        row.isEdit = false;
      });
    } else {
      this.mdmService.createSchedule(row).subscribe(() => (row.isEdit = true));
    
    }
    this.mdmService.createSchedule(row).subscribe(
      (data) => {
        console.log('Deleted the data  ' + data);
        this._fetchData();
      });
 
  }

  onEdit(item: any) {
  
    this.scheduleDetails.forEach(element => {
      element.isEdit = false;
    });
    item.isEdit = true;
  }

  deleteSchedule(id: number) {
    console.log('Data from the front ed is : '+id);
    if (confirm('Are you sure you want to delete this?')) {
      this.mdmService.deleteSchedule(id).subscribe(
        (data) => {
          console.log('Deleted the data  ' + data);
          this._fetchData();
        });
    }
  }
   
  }

  
  
 