import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpReportingComponent } from './empreporting.component';

describe('CreateComponent', () => {
  let component: EmpReportingComponent;
  let fixture: ComponentFixture<EmpReportingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpReportingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
