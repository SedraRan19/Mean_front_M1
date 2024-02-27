import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionClientComponent } from './inscription-client.component';

describe('InscriptionClientComponent', () => {
  let component: InscriptionClientComponent;
  let fixture: ComponentFixture<InscriptionClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InscriptionClientComponent]
    });
    fixture = TestBed.createComponent(InscriptionClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
