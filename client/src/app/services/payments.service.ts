import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IAppState} from "../common/interfaces";
import {NgRedux} from "@angular-redux/store";
import {StoreConst} from "../common/const";
import {Subject} from "rxjs/Rx";
import {Apartment, ApartmentDebt, ApartmentsDash, ApartmentTenant} from '../../../../shared/models'
import {Observable} from "rxjs";
import * as _ from 'lodash'
import API_URL = StoreConst.API_URL;

@Injectable({
  providedIn: 'root'
})
export class ApartmentService {


  apartmentsPaymentsUrl = `${API_URL}payments`;
  apartmentUrl = `${API_URL}apartments/`;
  apartmentsDash: ApartmentsDash[];
  public selectedApartment: Apartment;
  private selectedApartmentdSource = new Subject<void>();
  public selectedApartmentdSource$ = this.selectedApartmentdSource.asObservable();

  constructor(private http: HttpClient, private ngRedux: NgRedux<IAppState>) {
    this.ngRedux.select('apartmentsDash').subscribe((apartmentsDash: ApartmentsDash[]) =>
      this.apartmentsDash = apartmentsDash);
    this.ngRedux.select('selectedApartment').subscribe((apartment: Apartment) => {
        this.selectedApartment = apartment;
        this.selectedApartmentdSource.next();
      }
    )
  }



  get apartmentDebt(): number {

    return _.sumBy(this.selectedApartment.apartmentPayments, i => i.debt);
  }

  getApartmentsPayments(): Observable<[ApartmentDebt]> {
    return this.http.get<[ApartmentDebt]>(this.apartmentsPaymentsUrl)
  }

  loadSelectedApartmentDetails(id: number): Observable<[[ApartmentDebt], [ApartmentTenant], [Apartment]]> {
    let url = `${this.apartmentUrl}${id}`;
    return this.http.get<[[ApartmentDebt], [ApartmentTenant], [Apartment]]>(url)

  }

  saveApartmentDetail(obj: Apartment) {
    console.log(obj);
  }

  containsTenant(apartmentTenant: ApartmentTenant): boolean {
    let l = this.selectedApartment.apartmentTenants.filter(i => i.id === apartmentTenant.id);
    let res = l.length > 0;
    return res;
  }
}
