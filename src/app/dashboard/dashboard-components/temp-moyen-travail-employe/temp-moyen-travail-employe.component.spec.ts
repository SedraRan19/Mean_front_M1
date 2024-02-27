import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempMoyenTravailEmployeComponent } from './temp-moyen-travail-employe.component';

describe('TempMoyenTravailEmployeComponent', () => {
  let component: TempMoyenTravailEmployeComponent;
  let fixture: ComponentFixture<TempMoyenTravailEmployeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TempMoyenTravailEmployeComponent]
    });
    fixture = TestBed.createComponent(TempMoyenTravailEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
