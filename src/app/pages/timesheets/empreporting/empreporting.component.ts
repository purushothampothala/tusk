import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpReportingMaster } from './empreporting-master';
import { MdmService } from 'src/app/core/services/mdm.service';
@Component({
  selector: 'app-empreporting',
  templateUrl: './empreporting.component.html',
  styleUrls: ['./empreporting.component.scss']
})
export class EmpReportingComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  empreportingDetails: EmpReportingMaster[];
  
  term: any;

  // page
  currentpage: number;

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private mdmservice:MdmService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Admin' }, { label: 'EmpReporting Details', active: true }];

    this.formData = this.formBuilder.group({
      empId: ['', [Validators.required]],
      empManagerId: ['', [Validators.required]],
      empManagerName: ['', [Validators.required]],
      empManagerMobileNo: ['', [Validators.required]],
      empManagerEmailId: ['', [Validators.required]],
      empManagerFromDate: ['', [Validators.required]],
      empManagerToDate: ['', [Validators.required]],

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
    this.mdmservice.viewEmpReport().subscribe(
      (data) => {
        console.log('Data from backend is ' + data);
        this.empreportingDetails = data;
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

  saveEmpReport() {
    const currentDate = new Date();
    if (this.formData.valid) {
      const projectData: JSON = <JSON><any>{
      "empId" : this.formData.get('empId').value,
      "empManagerId": this.formData.get('empManagerId').value,
      "empManagerName": this.formData.get('empManagerName').value,
      "empManagerMobileNo": this.formData.get('empManagerMobileNo').value,
      "empManagerEmailId": this.formData.get('empManagerEmailId').value,
      "empManagerFromDate": this.formData.get('empManagerFromDate').value,
      "empManagerToDate": this.formData.get('empManagerToDate').value,
      "status":'Active',

      "createdDate": currentDate
      
      }
     
      console.log('Data is '+JSON.stringify(projectData));

      this.mdmservice.createEmpReport(JSON.stringify(projectData)).subscribe(
        (data) => {
          console.log('Data from backend is ' + data);
          this._fetchData();
        });
        this.modalService.dismissAll()
    }
    this.submitted = true
  }

  editUcic(id:number, row: EmpReportingMaster) {
    console.log("inside edit employee"+id + " row "+JSON.stringify(row));
    
    if (id === 0) {
     this.mdmservice.createUcic(row).subscribe((newUser: EmpReportingMaster) => {
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
  
    this.empreportingDetails.forEach(element => {
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
