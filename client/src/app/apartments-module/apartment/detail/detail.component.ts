import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IAppState} from "../../../common/interfaces";
import {Apartment, ApartmentDebt, ApartmentTenant} from '../../../../../../shared/models'
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ApartmentService} from "../../../services/payments.service";
import {Subscription} from "rxjs";
import {AuthService} from "../../../services/auth.service";
import {uniqueEmailPhoneValidator} from "../uniqe-email-phone.directive";
import {StoreConst} from "../../../common/const";
import {NgRedux} from "@angular-redux/store";
import APARTMENT_SELECTED = StoreConst.APARTMENT_SELECTED;

@Component({
  selector: 'detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
  requiredFields: Array<string> = ['name', 'mail', 'family', 'phone']
  public apartmentForm: FormGroup;
  @Input() public apartment: Apartment
  private subscription: Subscription;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              public  apartmentService: ApartmentService,
              private  authService: AuthService,
              private ngRedux: NgRedux<IAppState>) {
    this.createForm();
    this.subscription = this.apartmentService.selectedApartmentdSource$.subscribe(() => {
      this.rebuildForm();

    })

  }


  get apartmentTenants(): FormArray {
    return this.apartmentForm.get('apartmentTenants') as FormArray;
  };

  get currentUser(): ApartmentTenant {
    return this.authService.user
  }

  get userBelongsToApartment(): boolean {
    let res = this.apartmentService.containsTenant(this.currentUser);
    console.log()
    return res;
  }

  get debtIcon() {
    return this.apartmentService.apartmentDebt == 0 ? 'smiley' : 'sad'
  }

  get hasSelectedApartment(): boolean {
    return this.apartmentService.selectedApartment !== undefined;
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

  rebuildForm() {
    this.apartmentForm.reset({
        id: this.apartmentService.selectedApartment.id,
        floor: this.apartmentService.selectedApartment.floor,
        debt: this.apartmentService.apartmentDebt
      },
    );
    this.setInfos(this.apartmentService.selectedApartment.apartmentTenants.map(i => {
      return <ApartmentTenant>{...i, toDelete: false, isNew: false}
    }));
  }

  onSubmit() {
    let obj = this.generateObj();
    this.apartmentService.saveApartmentDetail(obj)
  }

  generateObj(): Apartment {
    let id = this.apartmentForm.value.id;
    let floor = this.apartmentForm.value.floor;
    let apartmentInfo = this.apartmentForm.value.apartmentTenants.map(info => {
        return {...info}
      }
    );
    return <Apartment>{apartmentTenants: apartmentInfo, id: id, floor: floor};
    // return <Apartment>{apartmentsDash: {apartment_id: id}, apartmentTenants: apartmentInfo};
  }

  createForm() {
    this.apartmentForm = this.fb.group({
      id: [''],
      apartmentTenants: this.fb.array([]), // <-- secretLairs as an empty FormArray
      status: [''],
      debt: ['']
    }, {validators: uniqueEmailPhoneValidator});
  }

  setInfos(apartmentTenants: ApartmentTenant[]) {
    const infos = apartmentTenants.map(info => this.fb.group(info));
    infos.forEach(i => {
        for (let control in i.controls) {
          if (this.requiredFields.indexOf(control) != -1)
            i.get(control).setValidators(Validators.required)
        }
      }
    )

    const infosFormArray = this.fb.array(infos);
    this.apartmentForm.setControl('apartmentTenants', infosFormArray);
  }

  addInfo() {
    let grp = this.fb.group({
      name: ['', Validators.required],
      family: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      status: 'tenant',
      apartmentID: this.apartmentService.selectedApartment.id,
      id:-1,
      toDelete: false,
      isNew: true
    })
    this.apartmentTenants.push(grp);
  }


}
