import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Apartment, ApartmentInfo} from "../../common/interfaces";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ApartmentService} from "../../services/payments.service";
import {Subscription} from "rxjs/Rx";

@Component({
  selector: 'apartment',
  templateUrl: './apartment.component.html',
  styleUrls: ['./apartment.component.scss']
})
export class ApartmentComponent implements OnInit, OnDestroy {
  private apartmentForm: FormGroup;
  private apartment: Apartment = this.apartmentService.selectedApartment;
  private subscription: Subscription;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private  apartmentService: ApartmentService) {
    this.subscription = this.apartmentService.selectedApartmentdSource$.subscribe(() => {
      this.createForm();
    })

  }

  get apartmentInfo(): FormArray {
    return this.apartmentForm.get('apartmentInfo') as FormArray;
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = +params.get('id');
      this.apartmentService.setSelectedApartment(id);
    })
  }

  rebuildForm() {
    this.apartmentForm.reset({
      id: this.apartment.id,
      status: this.apartment.status,
      debt: this.apartment.debt,
    });
    this.setInfos(this.apartment.apartmentInfo);
  }

  createForm() {
    this.apartmentForm = this.fb.group({
      id: [this.apartment.id, Validators.required],
      apartmentInfo: this.fb.array([]), // <-- secretLairs as an empty FormArray
      status: [this.apartment.status, Validators.required],
      debt: [this.apartment.debt, Validators.required]
    });
    this.setInfos(this.apartment.apartmentInfo);

  }

  setInfos(apartmentInfo: ApartmentInfo[]) {
    const infos = apartmentInfo.map(info => this.fb.group(info));
    const infosFormArray = this.fb.array(infos);
    this.apartmentForm.setControl('apartmentInfo', infosFormArray);
  }

  addInfo() {
    this.apartmentInfo.push(this.fb.group(<ApartmentInfo>{name: '', email: '', phone: ''}));
  }


}
