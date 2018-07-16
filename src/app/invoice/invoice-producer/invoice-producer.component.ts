import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MetaDataService} from "../../services/meta-data.service";

@Component({
  selector: 'app-invoice-producer',
  templateUrl: './invoice-producer.component.html',
  styleUrls: ['./invoice-producer.component.scss']
})
export class InvoiceProducerComponent implements OnInit {

  invoiceForm: FormGroup;
  apartments: Array<{ isChecked: boolean }> = Array(this.metaDataService.metaData.numberOfApartmrnts).fill(false);

  constructor(private fb: FormBuilder, private metaDataService: MetaDataService) {
    this.createForm();
  }

  get apartmentsControl(): FormArray {
    return this.invoiceForm.get('apartments') as FormArray;
  };

  ngOnInit() {
  }

  setAddresses() {
    const addressFGs = this.apartments.map(i => this.fb.group(i));
    const arr = this.fb.array(addressFGs);
    this.invoiceForm.setControl('apartments', arr);
  }

  private createForm() {
    this.invoiceForm = this.fb.group({
      amount: [0, Validators.required],
      checkAll: [false]
    })
    this.setAddresses();
  }
}
