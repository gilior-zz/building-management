import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {IAppState} from "../../common/interfaces";
import {Apartment, ApartmentDebt, ApartmentTenant} from '../../../../../shared/models'
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ApartmentService} from "../../services/payments.service";
import {Subscription} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {StoreConst} from "../../common/const";
import {NgRedux} from "@angular-redux/store";
import APARTMENT_SELECTED = StoreConst.APARTMENT_SELECTED;

@Component({
  selector: 'apartment',
  templateUrl: './apartment.component.html',
  styleUrls: ['./apartment.component.scss']
})
export class ApartmentComponent implements OnInit, OnDestroy {


  public apartment: Apartment = this.apartmentService.selectedApartment;
  public payments: ApartmentDebt[];
  private subscription: Subscription;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              public  apartmentService: ApartmentService,
              private  authService: AuthService,
              private ngRedux: NgRedux<IAppState>) {

    this.subscription = this.apartmentService.selectedApartmentdSource$.subscribe(() => {
        this.payments = this.apartmentService.selectedApartment.apartmentPayments;
    })

  }


  get currentUser(): ApartmentTenant {
    return this.authService.user
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = +params.get('id');
      this.apartmentService.loadSelectedApartmentDetails(id)
        .subscribe((apartment: [[ApartmentDebt], [ApartmentTenant], [Apartment]]) => {
          this.ngRedux.dispatch({
            type: APARTMENT_SELECTED,
            meta: null,
            payload: <Apartment>{
              floor: apartment[2][0].floor,
              id: apartment[2][0].id,
              apartmentTenants: apartment[1],
              apartmentPayments: apartment[0]
            },
          })
        })
    })
  }
}



