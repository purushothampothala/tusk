import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import { ReactiveFormsModule } from '@angular/forms';
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import { TimesheetRoutingModule } from './timesheet-routing.module';
import { UcicComponent } from './ucic/ucic.component';
import { AssetComponent } from './asset/asset.component';
import { BucketComponent } from './bucket/bucket.component';
import { FormsModule } from '@angular/forms';
import { FormComponent } from './form/form.component';


import { Ng5SliderModule } from 'ng5-slider';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbNavModule, NgbDropdownModule, NgbPaginationModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { ScheduleComponent } from './schedule/schedule.component';
import { CustomerrelationshipComponent } from './customerrelationship/customerrelationship.component';
import { AgreementComponent } from './agreement/agreement.component';
import { ManagerComponent } from './manager/manager.component';
import { EmpReportingComponent } from './empreporting/empreporting.component';

@NgModule({
  declarations: [
    UcicComponent,
    AssetComponent,
    BucketComponent,
    CustomerrelationshipComponent,
    AgreementComponent,
    ManagerComponent,
    EmpReportingComponent,
    ScheduleComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    NgbNavModule,
     DropzoneModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgbModalModule,
    FormsModule,
    FullCalendarModule,
    NgxPaginationModule,
    TimesheetRoutingModule
  ]
})
export class TimesheetModule { }
