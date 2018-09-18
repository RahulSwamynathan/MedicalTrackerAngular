import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMedicalComponent } from './patient-medical.component';

describe('PatientMedicalComponent', () => {
  let component: PatientMedicalComponent;
  let fixture: ComponentFixture<PatientMedicalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientMedicalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientMedicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
