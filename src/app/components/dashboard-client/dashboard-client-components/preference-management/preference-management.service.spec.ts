import { TestBed } from '@angular/core/testing';

import { PreferenceManagementService } from './preference-management.service';

describe('PreferenceManagementService', () => {
  let service: PreferenceManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreferenceManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
