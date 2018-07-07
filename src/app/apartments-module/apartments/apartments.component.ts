import {Component, OnInit} from '@angular/core';
import {Apartment, ApartmentsDash} from "../../common/interfaces";
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

  // mainInfo: Apartment[] = [];

  get apartmentsDash(): ApartmentsDash[] {
    return this.apartmentService.apartmentsDash;
  }

  ngOnInit() {

    this.apartmentService.getApartments();
    // .subscribe((mainInfo) => {
    //   this.mainInfo = mainInfo;
    // })
  }

}
