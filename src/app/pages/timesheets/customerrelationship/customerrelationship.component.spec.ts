import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerrelationshipComponent } from './customerrelationship.component';

describe('UpdateComponent', () => {
  let component: CustomerrelationshipComponent;
  let fixture: ComponentFixture<CustomerrelationshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerrelationshipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerrelationshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
