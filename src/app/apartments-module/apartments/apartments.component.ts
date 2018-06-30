import {Component, OnInit} from '@angular/core';
import {Apartment} from "../../common/interfaces";
import {ApartmentService} from "../../services/payments.service";

@Component({
  selector: 'payments',
  templateUrl: './apartments.component.html',
  styleUrls: ['./apartments.component.scss']
})
export class ApartmentsComponent implements OnInit {
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
