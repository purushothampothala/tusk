import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UcicComponent } from './ucic.component';

describe('CreateComponent', () => {
  let component: UcicComponent;
  let fixture: ComponentFixture<UcicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UcicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UcicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
