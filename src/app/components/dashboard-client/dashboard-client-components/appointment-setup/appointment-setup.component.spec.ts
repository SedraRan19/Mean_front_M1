import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentSetupComponent } from './appointment-setup.component';

describe('AppointmentSetupComponent', () => {
  let component: AppointmentSetupComponent;
  let fixture: ComponentFixture<AppointmentSetupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentSetupComponent]
    });
    fixture = TestBed.createComponent(AppointmentSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
