import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenceManagementComponent } from './preference-management.component';

describe('PreferenceManagementComponent', () => {
  let component: PreferenceManagementComponent;
  let fixture: ComponentFixture<PreferenceManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreferenceManagementComponent]
    });
    fixture = TestBed.createComponent(PreferenceManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
