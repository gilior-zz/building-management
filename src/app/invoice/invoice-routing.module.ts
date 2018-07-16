import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InvoiceProducerComponent} from "./invoice-producer/invoice-producer.component";

const routes: Routes = [
  {path:'invoice',component:InvoiceProducerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
