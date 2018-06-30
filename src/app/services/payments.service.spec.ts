import { TestBed, inject } from '@angular/core/testing';
import {ApartmentService} from "./payments.service";



describe('PaymentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApartmentService]
    });
  });

  it('should be created', inject([ApartmentService], (service: ApartmentService) => {
    expect(service).toBeTruthy();
  }));
});
