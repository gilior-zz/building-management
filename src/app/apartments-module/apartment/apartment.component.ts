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
    this.createForm();
    this.subscription = this.apartmentService.selectedApartmentdSource$.subscribe(() => {
      this.rebuildForm();
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
      this.apartmentService.loadSelectedApartmentDetails(id);
    })
  }

  rebuildForm() {
    this.apartmentForm.reset({
      id: this.apartmentService.selectedApartment.apartmentsDash.id,
      floor: this.apartmentService.selectedApartment.apartmentsDash.floor,
      debt: this.apartmentService.selectedApartment.apartmentsDash.debt,
    });
    this.setInfos(this.apartmentService.selectedApartment.apartmentInfo);
  }

  onSubmit() {
    let obj = this.generateObj();
    this.apartmentService.saveApartmentDetail(obj)
  }

  generateObj(): Apartment {
    let id = this.apartmentForm.value.id;
    let floor = this.apartmentForm.value.floor;
    let apartmentInfo = this.apartmentForm.value.apartmentInfo.map(info => {
        return {...info}
      }
    );
    return <Apartment>{apartmentsDash: {id: id}, apartmentInfo: apartmentInfo};
  }

  createForm() {
    this.apartmentForm = this.fb.group({
      id: ['', Validators.required],
      apartmentInfo: this.fb.array([]), // <-- secretLairs as an empty FormArray
      status: ['', Validators.required],
      debt: ['', Validators.required]
    });
  }

  setInfos(apartmentInfo: ApartmentInfo[]) {
    const infos = apartmentInfo.map(info => this.fb.group(info));
    const infosFormArray = this.fb.array(infos);
    this.apartmentForm.setControl('apartmentInfo', infosFormArray);
  }

  addInfo() {
    this.apartmentInfo.push(this.fb.group(<ApartmentInfo>{
      name: '',
      email: '',
      phone: '',
      status: 'tenant',
      id: -1,
      toDelete: false
    }));
  }


  toggleDeleted(i: number) {
    let markAsDeleted = !this.apartmentInfo.at(i).get('toDelete').value;
    this.apartmentInfo.at(i).get('toDelete').setValue(markAsDeleted);
  }

  getActionBtnTxt(i: number) {
    let markAsDeleted = this.apartmentInfo.at(i).get('toDelete').value;
    return markAsDeleted ? 'ביטול' : 'הסרת איש קשר'
  }
}
