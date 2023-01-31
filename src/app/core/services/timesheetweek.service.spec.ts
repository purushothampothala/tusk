import { TestBed } from '@angular/core/testing';

import { TimesheetweekService } from './timesheetweek.service';

describe('TimesheetweekService', () => {
  let service: TimesheetweekService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimesheetweekService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
