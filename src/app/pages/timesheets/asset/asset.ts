export interface Asset {
    
    id: number;
    typeOfAsset:string;
    assetSerialNo:number;
    loanAccountNumber:string;
    assetCode:string;
    description:string;
    Make:string;
    model:string;
    yearOfManufacturing:number;
    chassisNumber:string;
    engineModel:string;
    engineCapacity:string;
    registrationNumber:number;
    originalCost:number;
    currentValue:number;
    statusOFASSET:string;
    miscRemarks:string;
    owner:string;
    ownerType:string;
    valuationDate:Date;
    builtArea:string;
    area:string;
    taluka:string;
    district:string;
    machineryName:string;
    invoiceNo:string;
    underConstructionYn:string;
    dateExpectedCompletion:Date;
    constructionComplete:string;
    yearsOfConstComplete:number;
    npaFlag:string;
    createdDate:Date;
    isEdit:any;
}
