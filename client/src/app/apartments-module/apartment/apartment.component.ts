import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {IActionPayload, IAppState} from "../../common/interfaces";
import {Apartment, ApartmentDebt, ApartmentTenant} from '../../../../../shared/models'
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ApartmentService} from "../../services/payments.service";
import {Subscription} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {StoreConst} from "../../common/const";
import {NgRedux} from "@angular-redux/store";

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
      this.ngRedux.dispatch(<IActionPayload>{
        type: StoreConst.LOAD_DATA,
        meta: {
          continueWith: StoreConst.DATA_LOADED_ + 'SelectedApartmentDetails',
          body: undefined,
          url: `${StoreConst.API_URL}apartments/${id}`
        }
      })
    })
  }
}



