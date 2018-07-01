import {Component, OnInit} from '@angular/core';
import {Apartment} from "../../common/interfaces";
import {ApartmentService} from "../../services/payments.service";
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'payments',
  templateUrl: './apartments.component.html',
  styleUrls: ['./apartments.component.scss']
})
export class ApartmentsComponent implements OnInit {
  constructor(private  apartmentService: ApartmentService) {
  }

  // apartments: Apartment[] = [];

  get apartments(): Apartment[] {
    return this.apartmentService.apartments;
  }

  ngOnInit() {

    this.apartmentService.getApartments();
    // .subscribe((apartments) => {
    //   this.apartments = apartments;
    // })
  }

}
