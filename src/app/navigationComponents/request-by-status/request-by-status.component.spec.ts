import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestByStatusComponent } from './request-by-status.component';

describe('RequestByStatusComponent', () => {
  let component: RequestByStatusComponent;
  let fixture: ComponentFixture<RequestByStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestByStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestByStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
