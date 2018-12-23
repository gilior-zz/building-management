import {Component, OnInit} from '@angular/core';
import {IAppState} from "../../common/interfaces";
import {ApartmentService} from "../../services/payments.service";
import {ApartmentDebt,ApartmentsDash} from '../../../../../shared/models'
import {NgRedux} from "@angular-redux/store";
import {StoreConst} from "../../common/const";
import MAININFO_LOADED = StoreConst.APARTMENTS_DASH_LOADED;

@Component({
  selector: 'payments',
  templateUrl: './apartments.component.html',
  styleUrls: ['./apartments.component.scss']
})
export class ApartmentsComponent implements OnInit {
  constructor(public  apartmentService: ApartmentService,
              private  ngRedux: NgRedux<IAppState>) {
  }

  // mainInfo: Apartment[] = [];

  get apartmentsDash(): ApartmentsDash[] {
    return this.apartmentService.apartmentsDash;
  }

  ngOnInit() {

    this.apartmentService.getApartmentsPayments()
      .subscribe((apartmentDebt: [ApartmentDebt]) => {
        this.ngRedux.dispatch({
          type: MAININFO_LOADED,
          meta: null,
          payload: apartmentDebt,
        })
      })
  }

}
