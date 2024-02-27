import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiffreAffaireComponent } from './chiffre-affaire.component';

describe('ChiffreAffaireComponent', () => {
  let component: ChiffreAffaireComponent;
  let fixture: ComponentFixture<ChiffreAffaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChiffreAffaireComponent]
    });
    fixture = TestBed.createComponent(ChiffreAffaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
