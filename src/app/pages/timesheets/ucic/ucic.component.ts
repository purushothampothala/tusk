import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UcicMaster } from './ucic-master';
import { MdmService } from 'src/app/core/services/mdm.service';
@Component({
  selector: 'app-ucic',
  templateUrl: './ucic.component.html',
  styleUrls: ['./ucic.component.scss']
})
export class UcicComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  ucicDetails: UcicMaster[];
  
  term: any;

  // page
  currentpage: number;

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private mdmservice:MdmService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Admin' }, { label: 'Project Details', active: true }];

    this.formData = this.formBuilder.group({
      sourceSystemName: ['', [Validators.required]],
      applicationNumber: ['', [Validators.required]],
      loanAccountNumber: ['', [Validators.required]],
      customerNumber: ['', [Validators.required]],
      accountStatus: ['', [Validators.required]],
      ucic: ['', [Validators.required]],
      gucic: ['', [Validators.required]],

    });

    this.currentpage = 1;

    /**
     * Fetches the data
     */
    this._fetchData();
  }

  /**
   * Fetch Timesheet data for a given employee Id.
   */
  private _fetchData() {
    this.mdmservice.viewUcic().subscribe(
      (data) => {
        console.log('Data from backend is ' + data);
        this.ucicDetails = data;
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

  saveUcic() {
    const currentDate = new Date();
    if (this.formData.valid) {
      const projectData: JSON = <JSON><any>{
      "sourceSystemName" : this.formData.get('sourceSystemName').value,
      "applicationNumber": this.formData.get('applicationNumber').value,
      "loanAccountNumber": this.formData.get('loanAccountNumber').value,
      "customerNumber": this.formData.get('customerNumber').value,
      "accountStatus": this.formData.get('accountStatus').value,
      "ucic": this.formData.get('ucic').value,
      "gucic": this.formData.get('gucic').value,
       
      "createdDate": currentDate
      
      }
     
      console.log('Data is '+JSON.stringify(projectData));

      this.mdmservice.createUcic(JSON.stringify(projectData)).subscribe(
        (data) => {
          console.log('Data from backend is ' + data);
          this._fetchData();
        });
        this.modalService.dismissAll()
    }
    this.submitted = true
  }

  editUcic(id:number, row: UcicMaster) {
    console.log("inside edit employee"+id + " row "+JSON.stringify(row));
    
    if (id === 0) {
     this.mdmservice.createUcic(row).subscribe((newUser: UcicMaster) => {
        id = newUser.id;
        row.isEdit = false;
      });
    } else {
      this.mdmservice.createUcic(row).subscribe(() => (row.isEdit = true));
    
    }
    this.mdmservice.createUcic(row).subscribe(
      (data) => {
        console.log('Deleted the data  ' + data);
        this._fetchData();
      });
 
  }

  onEdit(item: any) {
  
    this.ucicDetails.forEach(element => {
      element.isEdit = false;
    });
    item.isEdit = true;
  }

  deleteUcic(id: number) {
    console.log('Data from the front ed is : '+id);
    if (confirm('Are you sure you want to delete this?')) {
      this.mdmservice.deleteUcic(id).subscribe(
        (data) => {
          console.log('Deleted the data  ' + data);
          this._fetchData();
        });
    }
  }
}
