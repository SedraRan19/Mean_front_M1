import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbReservationComponent } from './nb-reservation.component';

describe('NbReservationComponent', () => {
  let component: NbReservationComponent;
  let fixture: ComponentFixture<NbReservationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NbReservationComponent]
    });
    fixture = TestBed.createComponent(NbReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
