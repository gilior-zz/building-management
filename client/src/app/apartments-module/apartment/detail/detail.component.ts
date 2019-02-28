import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {IAppState} from "../../../common/interfaces";
import {Apartment, ApartmentTenant, PartialApartmentTenant} from '../../../../../../shared/models'
import {ActivatedRoute} from "@angular/router";
import {ApartmentService} from "../../../services/payments.service";
import {Observable, Subscription} from "rxjs";
import {AuthService} from "../../../services/auth.service";
import {uniqueEmailPhoneValidator} from "../uniqe-email-phone.directive";
import {NgRedux, select} from "@angular-redux/store";
import {mailPtrn, patternValidator, phonePtrn} from "../../../services/pattern.directive";


@Component({
  selector: 'detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy, AfterViewInit {
  @select() rootReducer$: Observable<IAppState>;

  requiredFields: Array<string> = ['name', 'mail', 'family', 'phone']
  validationFields: { [field: string]: ValidatorFn[] } = {
    'name': [Validators.maxLength(10)],
    'email': [patternValidator(mailPtrn), Validators.maxLength(100)],
    'family': [Validators.maxLength(10)],
    'phone': [Validators.minLength(10), Validators.maxLength(10), patternValidator(phonePtrn)]
  }
  // }
  public apartmentForm: FormGroup;

  // maxLength: { [filed: string]: number } = {
  //   'name': 10,
  //   'mail': 30,
  //   'family': 10,
  //   'phone': 10,
  @Input() public apartment: Apartment
  public showHeader = false;
  private subscription: Subscription;
  private selectedApartment: Apartment;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              public  apartmentService: ApartmentService,
              private  authService: AuthService,
              private ngRedux: NgRedux<IAppState>) {
    this.createForm();
    this.subscription = this.apartmentService.selectedApartmentdSource$.subscribe(() => {
      this.rebuildForm();
      this.showHeader = true;
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

  get showAddButton(): boolean {
    return this.userBelongsToApartment && this.currentUser.status == 'owner';
  }

  setInfos(apartmentTenants: PartialApartmentTenant[]) {
    const infos = apartmentTenants.map(info => this.fb.group(info));
    infos.forEach(i => {
        for (let control in i.controls) {
          // i.get(control).valueChanges.subscribe(j => console.log(j))
          if (this.validationFields[control])
            i.get(control).setValidators(<ValidatorFn[]>[Validators.required, ...this.validationFields[control]])
        }
      }
    )

    const infosFormArray = this.fb.array(infos);
    this.apartmentForm.setControl('apartmentTenants', infosFormArray);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.ngRedux.select('selectedApartment').subscribe((apartment: Apartment) => {
      this.selectedApartment = apartment;

    })
    // this.route.paramMap.subscribe((params: ParamMap) => {
    //   let id = +params.get('id');
    //   this.ngRedux.dispatch(<IActionPayload>{
    //     type: StoreConst.LOAD_DATA,
    //     meta: {
    //       continueWith: StoreConst.DATA_LOADED_ + 'SelectedApartmentDetails',
    //       body: undefined,
    //       url: `${StoreConst.API_URL}apartments/${id}`
    //     }
    //   })
    // this.apartmentService.loadSelectedApartmentDetails(id)
    //   .subscribe((apartment: [[ApartmentDebt], [ApartmentTenant], [Apartment]]) => {
    //     this.ngRedux.dispatch({
    //       type: APARTMENT_SELECTED,
    //       meta: null,
    //       payload: <Apartment>{
    //         floor: apartment[2][0].floor,
    //         id: apartment[2][0].id,
    //         apartmentTenants: apartment[1],
    //         apartmentPayments: apartment[0]
    //       },
    //     })
    //   })
    // })
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


  addInfo() {
    let grp = this.fb.group({
      name: ['', Validators.required],
      family: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      status: 'tenant',
      apartmentID: this.apartmentService.selectedApartment.id,
      id: undefined,
      toDelete: false,
      isNew: true
    })
    this.apartmentTenants.push(grp);
  }

  ngAfterViewInit(): void {
    // console.log('ngAfterViewInit')
  }


  addTenant() {
    let grp = this.fb.group({
      name: ['', [Validators.required, ...this.validationFields['name']]],
      family: ['', [Validators.required, ...this.validationFields['family']]],
      email: ['', [Validators.required, ...this.validationFields['email']]],
      phone: ['', [Validators.required, ...this.validationFields['phone']]],
      status: ['tenant'],
      apartmentID: this.apartmentService.selectedApartment.id,
      id: undefined,
      toDelete: false,
      isNew: true
    })
    this.apartmentTenants.push(grp);
  }
}
