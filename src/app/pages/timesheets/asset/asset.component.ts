import { Component, OnInit } from '@angular/core';
import { TimesheetService } from 'src/app/core/services/timesheet.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Asset } from './asset';
import { FormGroup } from '@angular/forms';
import { MdmService } from 'src/app/core/services/mdm.service';
@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss']
})
export class AssetComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  assetDetails: Asset[];

  term: any;

  // page
  currentpage: number;

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private mdmservice: MdmService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Admin' }, { label: 'asset Details', active: true }];

    this.formData = this.formBuilder.group({
      loanAccountNumber: ['', [Validators.required]],
      typeOfAsset: ['', [Validators.required]],
      assetSerialNo: ['', [Validators.required]],
      assetCode: ['', [Validators.required]],
      description: ['', [Validators.required]],
      make: ['', [Validators.required]],
      model: ['', [Validators.required]],
      yearOfManufacturing: ['', [Validators.required]],
      chassisNumber: ['', [Validators.required]],
      engineModel: ['', [Validators.required]],
      engineCapacity: ['', [Validators.required]],
      applicationNumber: ['', [Validators.required]],
      registrationNumber: ['', [Validators.required]],
      originalCost: ['', [Validators.required]],
      currentValue: ['', [Validators.required]],
      statusOfAsset: ['', [Validators.required]],
      miscRemarks: ['', [Validators.required]],
      owner: ['', [Validators.required]],
      ownerType: ['', [Validators.required]],
      valuationDate: ['', [Validators.required]],
      builtArea: ['', [Validators.required]],
      area: ['', [Validators.required]],
      taluka: ['', [Validators.required]],
      district: ['', [Validators.required]],
      machineryName: ['', [Validators.required]],
      invoiceNo: ['', [Validators.required]],
      underConstructionYn: ['', [Validators.required]],
      dateExpectedCompletion: ['', [Validators.required]],
      constructionComplete: ['', [Validators.required]],
      yearsOfConstComplete: ['', [Validators.required]],
      npaFlag: ['', [Validators.required]],



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
    this.mdmservice.viewAsset().subscribe(
      (data) => {
        console.log('Data from backend is ' + data);
        this.assetDetails = data;
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

  saveAsset() {
    const currentDate = new Date();
    if (this.formData.invalid) {
      const assetData: JSON = <JSON><any>{
        "loanAccountNumber": this.formData.get('loanAccountNumber').value,
        "typeOfAsset": this.formData.get('typeOfAsset').value,
        "assetSerialNo": this.formData.get('assetSerialNo').value,
        "assetCode": this.formData.get('assetCode').value,
        "description": this.formData.get('description').value,
        "make": this.formData.get('make').value,
        "model": this.formData.get('model').value,
        "yearOfManufacturing": this.formData.get('yearOfManufacturing').value,
        "chassisNumber": this.formData.get('chassisNumber').value,
        "engineModel": this.formData.get('engineModel').value,
        "engineCapacity": this.formData.get('engineCapacity').value,
        "applicationNumber": this.formData.get('applicationNumber').value,
        "registrationNumber": this.formData.get('registrationNumber').value,
        "originalCost": this.formData.get('originalCost').value,
        "currentValue": this.formData.get('currentValue').value,
        "statusOfAsset": this.formData.get('statusOfAsset').value,
        "miscRemarks": this.formData.get('miscRemarks').value,
        "owner": this.formData.get('owner').value,
        "ownerType": this.formData.get('ownerType').value,
        "valuationDate": this.formData.get('valuationDate').value,
        "builtArea": this.formData.get('builtArea').value,
        "area": this.formData.get('area').value,
        "taluka": this.formData.get('taluka').value,
        "district": this.formData.get('district').value,
        "machineryName": this.formData.get('machineryName').value,
        "invoiceNo": this.formData.get('invoiceNo').value,
        "underConstructionYn": this.formData.get('underConstructionYn').value,
        "dateExpectedCompletion": this.formData.get('dateExpectedCompletion').value,
        "constructionComplete": this.formData.get('constructionComplete').value,
        "yearsOfConstComplete": this.formData.get('constructionComplete').value,
        "npaFlag": this.formData.get('npaFlag').value,
        "createdDate": currentDate

      }
      console.log('Data from backend is 1 ');
      console.log('Data is ' + JSON.stringify(assetData));

      this.mdmservice.createAsset(JSON.stringify(assetData)).subscribe(
        (data) => {
          console.log('Data from backend is ' + data);
          this._fetchData();
        });
      this.modalService.dismissAll()
    }
    this.submitted = true
  }


  editAsset(id: number, row: Asset) {
    console.log("inside edit employee" + id + " row " + JSON.stringify(row));

    if (id === 0) {
      this.mdmservice.createAsset(row).subscribe((newUser: Asset) => {
        id = newUser.id;
        row.isEdit = false;
      });
    } else {
      this.mdmservice.createAsset(row).subscribe(() => (row.isEdit = true));

    }
    this.mdmservice.createAsset(row).subscribe(
      (data) => {
        console.log('Deleted the data  ' + data);
        this._fetchData();
      });

  }

  onEdit(item: any) {

    this.assetDetails.forEach(element => {
      element.isEdit = false;
    });
    item.isEdit = true;
  }

  deleteAsset(id: number) {
    console.log('Data from the front ed is : ' + id);
    if (confirm('Are you sure you want to delete this?')) {
      this.mdmservice.deleteAsset(id).subscribe(
        (data) => {
          console.log('Deleted the data  ' + data);
          this._fetchData();
        });
    }
  }
}
