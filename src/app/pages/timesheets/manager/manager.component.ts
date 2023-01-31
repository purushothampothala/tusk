import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManagerMaster} from './manager-master';
import { MdmService } from 'src/app/core/services/mdm.service';
@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  managerDetails: ManagerMaster[];
  
  term: any;

  // page
  currentpage: number;

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private mdmservice:MdmService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Admin' }, { label: 'Manager Details', active: true }];

    this.formData = this.formBuilder.group({
      managerName: ['', [Validators.required]],
      managerEmpId: ['', [Validators.required]],
      managerEmailId: ['', [Validators.required]],
      managerMobileNo: ['', [Validators.required]],
      managerFromDate: ['', [Validators.required]],
      managerToDate: ['', [Validators.required]],
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
    this.mdmservice.viewManager().subscribe(
      (data) => {
        console.log('Data from backend is ' + data);
        this.managerDetails = data;
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

  saveManager() {
    const currentDate = new Date();
    if (this.formData.valid) {
      const projectData: JSON = <JSON><any>{
      "managerName" : this.formData.get('managerName').value,
      "managerEmpId": this.formData.get('managerEmpId').value,
      "managerEmailId": this.formData.get('managerEmailId').value,
      "managerMobileNo": this.formData.get('managerMobileNo').value,
      "managerFromDate": this.formData.get('managerFromDate').value,
      "managerToDate": this.formData.get('managerToDate').value,
       
      "createdDate": currentDate
      
      }
     
      console.log('Data is '+JSON.stringify(projectData));

      this.mdmservice.createManager(JSON.stringify(projectData)).subscribe(
        (data) => {
          console.log('Data from backend is ' + data);
          this._fetchData();
        });
        this.modalService.dismissAll()
    }
    this.submitted = true
  }

  editManager(id:number, row: ManagerMaster) {
    console.log("inside edit employee"+id + " row "+JSON.stringify(row));
    
    if (id === 0) {
     this.mdmservice.createManager(row).subscribe((newUser: ManagerMaster) => {
        id = newUser.id;
        row.isEdit = false;
      });
    } else {
      this.mdmservice.createManager(row).subscribe(() => (row.isEdit = true));
    
    }
    this.mdmservice.createManager(row).subscribe(
      (data) => {
        console.log('Deleted the data  ' + data);
        this._fetchData();
      });
 
  }

  onEdit(item: any) {
  
    this.managerDetails.forEach(element => {
      element.isEdit = false;
    });
    item.isEdit = true;
  }

  deleteManager(id: number) {
    console.log('Data from the front ed is : '+id);
    if (confirm('Are you sure you want to delete this?')) {
      this.mdmservice.deleteManager(id).subscribe(
        (data) => {
          console.log('Deleted the data  ' + data);
          this._fetchData();
        });
    }
  }
}
