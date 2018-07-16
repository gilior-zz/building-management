import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceProducerComponent } from './invoice-producer.component';

describe('InvoiceProducerComponent', () => {
  let component: InvoiceProducerComponent;
  let fixture: ComponentFixture<InvoiceProducerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceProducerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceProducerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
