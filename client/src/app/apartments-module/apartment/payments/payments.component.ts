import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
@Input() payments;
public  cols:string[]=['year','month','amount','payment','debt']
  constructor() { }

  ngOnInit() {
  }

}
