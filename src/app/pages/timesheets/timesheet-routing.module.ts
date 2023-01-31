import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UcicComponent } from './ucic/ucic.component';
import { FormComponent } from './form/form.component';
import { AssetComponent } from './asset/asset.component';
import { BucketComponent } from './bucket/bucket.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { AgreementComponent } from './agreement/agreement.component';
import { CustomerrelationshipComponent } from './customerrelationship/customerrelationship.component';
import { ManagerComponent } from './manager/manager.component';
import { EmpReportingComponent } from './empreporting/empreporting.component';
const routes: Routes = [
  {path : '' , redirectTo :'employees' , pathMatch:'full'},
  {path:'asset' , component:AssetComponent},
  {path:'ucic' , component:UcicComponent},
  {path:'form' , component:FormComponent},
  {path:'bucket' , component:BucketComponent},
  {path:'agreement' , component:AgreementComponent},
  {path:'manager' , component:ManagerComponent},
  {path:'schedule' , component:ScheduleComponent},
  {path:'customerrelationship',component:CustomerrelationshipComponent},
  {path:'empreporting',component:EmpReportingComponent},
 
  ]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimesheetRoutingModule { }
