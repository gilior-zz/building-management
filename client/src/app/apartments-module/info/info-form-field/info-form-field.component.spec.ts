import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoFormFieldComponent } from './info-form-field.component';

describe('InfoFormFieldComponent', () => {
  let component: InfoFormFieldComponent;
  let fixture: ComponentFixture<InfoFormFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoFormFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
