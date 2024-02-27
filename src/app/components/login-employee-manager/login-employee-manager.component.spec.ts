import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginEmployeeManagerComponent } from './login-employee-manager.component';

describe('LoginEmployeeManagerComponent', () => {
  let component: LoginEmployeeManagerComponent;
  let fixture: ComponentFixture<LoginEmployeeManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginEmployeeManagerComponent]
    });
    fixture = TestBed.createComponent(LoginEmployeeManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
