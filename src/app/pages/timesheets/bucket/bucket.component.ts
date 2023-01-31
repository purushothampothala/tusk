import { Component, OnInit } from '@angular/core';
import { Timesheet } from 'src/app/core/models/timesheet';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { TimesheetService } from 'src/app/core/services/timesheet.service';
import { MdmService } from 'src/app/core/services/mdm.service';
import { Bucket } from './bucket';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-update',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.scss']
})
export class BucketComponent implements OnInit {
  bucketDetails: Bucket[];
  submitted = false;
    formData: FormGroup;
    term:any;
  constructor(private route:ActivatedRoute,
              private router:Router,
              private mdmService:MdmService,private modalService: NgbModal, private formBuilder: FormBuilder,) { }

              ngOnInit() {
               
                this.formData = this.formBuilder.group({
             
                  bucketCode: ['', [Validators.required]],
                  loanAccountNumber: ['', [Validators.required]],
                  overDueAmount: ['', [Validators.required]],
                  runTime: ['', [Validators.required]],
                  });
            
                /**
                 * Fetches the data
                 */
                this._fetchData();
              }
            

  private _fetchData() {
    this.mdmService.viewBucket().subscribe(
      (data) => {
        console.log('Data from backend is ' + data);
        this.bucketDetails = data;
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
  saveBucket() {
    const currentDate = new Date();
    if (this.formData.valid) {
      const bucketData: JSON = <JSON><any>{
      "loanAccountNumber" : this.formData.get('loanAccountNumber').value,
      "bucketCode": this.formData.get('bucketCode').value,
      "overDueAmount": this.formData.get('overDueAmount').value,
      "runTime": this.formData.get('runTime').value,
      "createdDate": currentDate
      }
     
      console.log('Data is '+JSON.stringify(bucketData));

      this.mdmService.createBucket(JSON.stringify(bucketData)).subscribe(
        (data) => {
          console.log('Data from backend is ' + data);
          this._fetchData();
        });
        this.modalService.dismissAll()
    }
    this.submitted = true
  }

  editBucket(id:number, row: Bucket) {
    console.log("inside edit employee"+id + " row "+JSON.stringify(row));
    
    if (id === 0) {
     this.mdmService.createBucket(row).subscribe((newUser: Bucket) => {
        id = newUser.id;
        row.isEdit = false;
      });
    } else {
      this.mdmService.createBucket(row).subscribe(() => (row.isEdit = true));
    
    }
    this.mdmService.createBucket(row).subscribe(
      (data) => {
        console.log('Deleted the data  ' + data);
        this._fetchData();
      });
 
  }

  onEdit(item: any) {
  
    this.bucketDetails.forEach(element => {
      element.isEdit = false;
    });
    item.isEdit = true;
  }

  deleteBucket(id: number) {
    console.log('Data from the front ed is : '+id);
    if (confirm('Are you sure you want to delete this?')) {
      this.mdmService.deleteBucket(id).subscribe(
        (data) => {
          console.log('Deleted the data  ' + data);
          this._fetchData();
        });
    }
  }
  }



