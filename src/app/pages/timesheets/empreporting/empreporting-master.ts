export interface EmpReportingMaster {

    id: number;
    empId:string;
    empManagerId:string;
    empManagerName:string;
    empManagerMobileNo:string;
    empManagerEmailId:string;
    empManagerFromDate:string;
    empManagerToDate:string;
    status:string;
    createdDate:Date;
    isEdit:any;
}
