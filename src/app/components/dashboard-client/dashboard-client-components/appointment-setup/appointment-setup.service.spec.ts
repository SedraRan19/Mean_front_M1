import { TestBed } from '@angular/core/testing';

import { AppointmentSetupService } from './appointment-setup.service';

describe('AppointmentSetupService', () => {
  let service: AppointmentSetupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointmentSetupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
