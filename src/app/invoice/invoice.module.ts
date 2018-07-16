import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceProducerComponent } from './invoice-producer/invoice-producer.component';
import {SharedModule} from "../common/shared.module";

@NgModule({
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    SharedModule
  ],
  declarations: [InvoiceProducerComponent]
})
export class InvoiceModule { }
