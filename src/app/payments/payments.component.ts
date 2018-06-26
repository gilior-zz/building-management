import {Component, OnInit} from '@angular/core';
import {Apartment} from "../model/interfaces";
import {ApartmentService} from "../services/payments.service";

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  apartments: Apartment[] = [];

  constructor(private  apartmentService: ApartmentService) {
  }

  ngOnInit() {
    this.apartmentService.getApartments()
      .subscribe((apartments) => {
        this.apartments = apartments;
      })
  }

}
