import { Component, OnInit } from '@angular/core';
import { Timesheet } from 'src/app/core/models/timesheet';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { TimesheetService } from 'src/app/core/services/timesheet.service';
import { MdmService } from 'src/app/core/services/mdm.service';
import { Customerrelationship } from './customerrelationship';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customerrelationship',
  templateUrl: './customerrelationship.component.html',
  styleUrls: ['./customerrelationship.component.scss']
})
export class CustomerrelationshipComponent implements OnInit {
  customerrelationshipDetails: Customerrelationship[];
  submitted = false;
    formData: FormGroup;
    term:any;
  constructor(private route:ActivatedRoute,
              private router:Router,
              private mdmService:MdmService,private modalService: NgbModal, private formBuilder: FormBuilder,) { }

              ngOnInit() {
               
                this.formData = this.formBuilder.group({
             
                  customerNumber: ['', [Validators.required]],
                  loanAccountNumber: ['', [Validators.required]],
                  roleAssociation: ['', [Validators.required]],
                
                  });
            
                /**
                 * Fetches the data
                 */
                this._fetchData();
              }
            

  private _fetchData() {
    this.mdmService.viewCr().subscribe(
      (data) => {
        console.log('Data from backend is ' + data);
        this.customerrelationshipDetails = data;
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
  saveCr() {
    const currentDate = new Date();
    if (this.formData.valid) {
      const bucketData: JSON = <JSON><any>{
      "loanAccountNumber" : this.formData.get('loanAccountNumber').value,
      "customerNumber": this.formData.get('customerNumber').value,
      "roleAssociation": this.formData.get('roleAssociation').value,
  
      "createdDate": currentDate
      }
     
      console.log('Data is '+JSON.stringify(bucketData));

      this.mdmService.createCr(JSON.stringify(bucketData)).subscribe(
        (data) => {
          console.log('Data from backend is ' + data);
          this._fetchData();
        });
        this.modalService.dismissAll()
    }
    this.submitted = true
  }

  editCr(id:number, row: Customerrelationship) {
    console.log("inside edit employee"+id + " row "+JSON.stringify(row));
    
    if (id === 0) {
     this.mdmService.createCr(row).subscribe((newUser: Customerrelationship) => {
        id = newUser.id;
        row.isEdit = false;
      });
    } else {
      this.mdmService.createCr(row).subscribe(() => (row.isEdit = true));
    
    }
    this.mdmService.createCr(row).subscribe(
      (data) => {
        console.log('Deleted the data  ' + data);
        this._fetchData();
      });
 
  }

  onEdit(item: any) {
  
    this.customerrelationshipDetails.forEach(element => {
      element.isEdit = false;
    });
    item.isEdit = true;
  }

  deleteCr(id: number) {
    console.log('Data from the front ed is : '+id);
    if (confirm('Are you sure you want to delete this?')) {
      this.mdmService.deleteCr(id).subscribe(
        (data) => {
          console.log('Deleted the data  ' + data);
          this._fetchData();
        });
    }
  }
  }



