import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgreementMaster} from './agreement-master';
import { MdmService } from 'src/app/core/services/mdm.service';
@Component({
  selector: 'app-ucic',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.scss']
})
export class AgreementComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  agreementDetails: AgreementMaster[];
  
  term: any;

  // page
  currentpage: number;

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private mdmservice:MdmService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Admin' }, { label: 'Agreement Details', active: true }];

    this.formData = this.formBuilder.group({
      sourceSystemNumber: ['', [Validators.required]],
      loanAccountNumber: ['', [Validators.required]],
      customerNumber: ['', [Validators.required]],
      accountStatus: ['', [Validators.required]],
      branchCode: ['', [Validators.required]],
      portfolioCode: ['', [Validators.required]],
      loanType: ['', [Validators.required]],
      schemeCode: ['', [Validators.required]],
      applicationReferenceId: ['', [Validators.required]],
      salesPerson: ['', [Validators.required]],
      dealerCode: ['', [Validators.required]],
      dealerSalesPerson: ['', [Validators.required]],
      repaymentFrequency: ['', [Validators.required]],
      paymentType: ['', [Validators.required]],
      disbursementDate: ['', [Validators.required]],
      loanStartDate: ['', [Validators.required]],
      loanEndDate: ['', [Validators.required]],
      tenor: ['', [Validators.required]],
      cycleDay: ['', [Validators.required]],
      graceDays: ['', [Validators.required]],
      sanctionAmount: ['', [Validators.required]],
      loanAmount: ['', [Validators.required]],
      interestRateType: ['', [Validators.required]],
      plr: ['', [Validators.required]],
      margins: ['', [Validators.required]],
      actualInterestRate: ['', [Validators.required]],
      installmentAmount: ['', [Validators.required]],
      downPayment: ['', [Validators.required]],
      downPaymentPercentage: ['', [Validators.required]],
      bucketCode: ['', [Validators.required]],
      nextDueDate: ['', [Validators.required]],
      odDays: ['', [Validators.required]],
      excessAmount: ['', [Validators.required]],
      lastAmountPaid: ['', [Validators.required]],
      lastPaymentDate: ['', [Validators.required]],
      odAmount: ['', [Validators.required]],
      osAmount: ['', [Validators.required]],
      writeOffFlag: ['', [Validators.required]],
      writeOffAmount: ['', [Validators.required]],
      writeOffDate: ['', [Validators.required]],
      writeOffReason1: ['', [Validators.required]],
      delinquencyStartDate: ['', [Validators.required]],
      nonStarterFlag: ['', [Validators.required]],
      osPrinAmount: ['', [Validators.required]],
      odPrinAmount: ['', [Validators.required]],
      repoflag: ['', [Validators.required]],
      loanRestructuredYN: ['', [Validators.required]],
      restructuredScheme: ['', [Validators.required]],
      moratApplied: ['', [Validators.required]],
      moratPeriod: ['', [Validators.required]],
      pslCategory: ['', [Validators.required]],
      pslSector: ['', [Validators.required]],
      pslSubCategory: ['', [Validators.required]],
      pslInvestmentInPlantMachinary: ['', [Validators.required]],
      pslWeekerSection: ['', [Validators.required]],
      pslPurpose: ['', [Validators.required]],
      gstnNumber: ['', [Validators.required]],
    
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
    this.mdmservice.viewAgreement().subscribe(
      (data) => {
        console.log('Data from backend is ' + data);
        this.agreementDetails = data;
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

  saveAgreement() {
    const currentDate = new Date();
    if (this.formData.valid) {
      const projectData: JSON = <JSON><any>{
      "sourceSystemNumber" : this.formData.get('sourceSystemNumber').value,
      "accountStatus": this.formData.get('accountStatus').value,
      "loanAccountNumber": this.formData.get('loanAccountNumber').value,
      "customerNumber": this.formData.get('customerNumber').value,
      "branchCode": this.formData.get('branchCode').value,
      "portfolioCode": this.formData.get('portfolioCode').value,
      "loanType": this.formData.get('loanType').value,
      "schemeCode" : this.formData.get('schemeCode').value,
      "applicationReferenceId": this.formData.get('applicationReferenceId').value,
      "salesPerson": this.formData.get('salesPerson').value,
      "dealerCode": this.formData.get('dealerCode').value,
      "dealerSalesPerson": this.formData.get('dealerSalesPerson').value,
      "repaymentFrequency": this.formData.get('repaymentFrequency').value,
      "paymentType": this.formData.get('paymentType').value,
      "disbursementDate" : this.formData.get('disbursementDate').value,
      "loanStartDate": this.formData.get('loanStartDate').value,
      "loanEndDate": this.formData.get('loanEndDate').value,
      "tenor": this.formData.get('tenor').value,
      "cycleDay": this.formData.get('cycleDay').value,
      "graceDays": this.formData.get('graceDays').value,
      "sanctionAmount": this.formData.get('sanctionAmount').value,
      "loanAmount" : this.formData.get('loanAmount').value,
      "interestRateType": this.formData.get('interestRateType').value,
      "plr": this.formData.get('plr').value,
      "margins": this.formData.get('margins').value,
      "actualInterestRate": this.formData.get('actualInterestRate').value,
      "installmentAmount": this.formData.get('installmentAmount').value,
      "downPayment": this.formData.get('downPayment').value,
      "downPaymentPercentage" : this.formData.get('downPaymentPercentage').value,
      "bucketCode": this.formData.get('bucketCode').value,
      "nextDueDate": this.formData.get('nextDueDate').value,
      "odDays": this.formData.get('odDays').value,
      "excessAmount": this.formData.get('excessAmount').value,
      "lastAmountPaid": this.formData.get('lastAmountPaid').value,
      "lastPaymentDate": this.formData.get('lastPaymentDate').value,
      "odAmount" : this.formData.get('odAmount').value,
      "osAmount": this.formData.get('osAmount').value,
      "writeOffFlag": this.formData.get('writeOffFlag').value,
      "writeOffReason1": this.formData.get('writeOffReason1').value,
      "writeOffAmount": this.formData.get('writeOffAmount').value,
      "writeOffDate": this.formData.get('writeOffDate').value,
      "delinquencyStartDate": this.formData.get('delinquencyStartDate').value,
      "nonStarterFlag": this.formData.get('nonStarterFlag').value,
      "osPrinAmount" : this.formData.get('osPrinAmount').value,
      "odPrinAmount": this.formData.get('odPrinAmount').value,
      "repoflag": this.formData.get('repoflag').value,
      "loanRestructuredYN": this.formData.get('loanRestructuredYN').value,
      "restructuredScheme": this.formData.get('restructuredScheme').value,
      "moratApplied": this.formData.get('moratApplied').value,
      "moratPeriod": this.formData.get('moratPeriod').value,
      "pslCategory" : this.formData.get('pslCategory').value,
      "pslSector": this.formData.get('pslSector').value,
      "pslSubCategory": this.formData.get('pslSubCategory').value,
      "pslInvestmentInPlantMachinary": this.formData.get('pslInvestmentInPlantMachinary').value,
      "pslWeekerSection": this.formData.get('pslWeekerSection').value,
      "pslPurpose": this.formData.get('pslPurpose').value,
      "gstnNumber": this.formData.get('gstnNumber').value,
      "createdDate": currentDate
      }
     
      console.log('Data is '+JSON.stringify(projectData));

      this.mdmservice.createAgreement(JSON.stringify(projectData)).subscribe(
        (data) => {
          console.log('Data from backend is ' + data);
          this._fetchData();
        });
        this.modalService.dismissAll()
    }
    this.submitted = true
  }

  editUcic(id:number, row: AgreementMaster) {
    console.log("inside edit employee"+id + " row "+JSON.stringify(row));
    
    if (id === 0) {
     this.mdmservice.createAgreement(row).subscribe((newUser: AgreementMaster) => {
        id = newUser.id;
        row.isEdit = false;
      });
    } else {
      this.mdmservice.createAgreement(row).subscribe(() => (row.isEdit = true));
    
    }
    this.mdmservice.createAgreement(row).subscribe(
      (data) => {
        console.log('Deleted the data  ' + data);
        this._fetchData();
      });
 
  }

  onEdit(item: any) {
  
    this.agreementDetails.forEach(element => {
      element.isEdit = false;
    });
    item.isEdit = true;
  }

  deleteAgreement(id: number) {
    console.log('Data from the front ed is : '+id);
    if (confirm('Are you sure you want to delete this?')) {
      this.mdmservice.deleteAgreement(id).subscribe(
        (data) => {
          console.log('Deleted the data  ' + data);
          this._fetchData();
        });
    }
  }
}
