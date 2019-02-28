import {Component, Input, OnInit} from '@angular/core';
import {ApartmentService} from "../../../../services/payments.service";

@Component({
  selector: 'app-detail-header',
  templateUrl: './detail-header.component.html',
  styleUrls: ['./detail-header.component.scss']
})
export class DetailHeaderComponent implements OnInit {
@Input() debt:number;
  constructor(public  apartmentService: ApartmentService) { }

  ngOnInit() {
  }

  get hasSelectedApartment(): boolean {
    return this.apartmentService.selectedApartment !== undefined;
  }

  get debtIcon() {
    return this.apartmentService.apartmentDebt == 0 ? 'smiley' : 'sad'
  }

}
