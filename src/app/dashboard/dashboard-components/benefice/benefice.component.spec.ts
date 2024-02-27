import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficeComponent } from './benefice.component';

describe('BeneficeComponent', () => {
  let component: BeneficeComponent;
  let fixture: ComponentFixture<BeneficeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BeneficeComponent]
    });
    fixture = TestBed.createComponent(BeneficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
