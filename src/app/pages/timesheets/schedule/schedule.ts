export interface Schedule {
    
    id: number;
    dueDate:Date;
    installmentAmount:number;
    principalPartOfInstallment:number;
    interestPartOfInstallment:number;
    tdsPartOfInstallment:number;
    installmentAmountPaidTillDate:Date;
    principalAmountPaid:number;
    tdsAmountPaid:number;
    interestAmountPaid:number;
    BalancePartOfInstallment:number;
    lastPaymentDate:Date;
    status:String;
    createdDate:Date;
    isEdit:any;
}
