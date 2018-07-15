import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Apartment, ApartmentTenant} from "../../common/interfaces";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ApartmentService} from "../../services/payments.service";
import {Subscription} from "rxjs/Rx";
import {AuthService} from "../../services/auth.service";
import {uniqueEmailPhoneValidator} from "./uniqe-email-phone.directive";

@Component({
  selector: 'apartment',
  templateUrl: './apartment.component.html',
  styleUrls: ['./apartment.component.scss']
})
export class ApartmentComponent implements OnInit, OnDestroy {
  requiredFields: Array<string> = ['name', 'mail', 'family', 'phone']
  private apartmentForm: FormGroup;
  private apartment: Apartment = this.apartmentService.selectedApartment;
  private subscription: Subscription;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              public  apartmentService: ApartmentService,
              private  authService: AuthService) {
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
    return res;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = +params.get('id');
      this.apartmentService.loadSelectedApartmentDetails(id);
    })
  }

  rebuildForm() {
    this.apartmentForm.reset({
        id: this.apartmentService.selectedApartment.apartmentsDash.id,
        floor: this.apartmentService.selectedApartment.apartmentsDash.floor,
        debt: this.apartmentService.selectedApartment.apartmentsDash.debt
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
    return <Apartment>{apartmentsDash: {id: id}, apartmentTenants: apartmentInfo};
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
    let l = this.fb.group({
      name: ['', Validators.required],
      family: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      status: 'tenant',
      id: this.apartmentService.selectedApartment.apartmentsDash.id,
      toDelete: false,
      isNew: true
    })

    this.apartmentTenants.push(l);
  }


}
