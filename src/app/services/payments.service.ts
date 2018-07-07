import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Apartment, ApartmentsDash, IAppState} from "../common/interfaces";
import {NgRedux} from "@angular-redux/store";
import {StoreConst} from "../common/const";
import {Subject} from "rxjs/Rx";
import APARTMENT_SELECTED = StoreConst.APARTMENT_SELECTED;
import MAININFO_LOADED = StoreConst.APARTMENTS_DASH_LOADED;

@Injectable({
  providedIn: 'root'
})
export class ApartmentService {

  url = ' http://localhost:3000/';
  apartmentsDashUrl = `${this.url}apartmentsDash`;
  apartmentUrl = `${this.url}apartments/`;
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

  getApartments(): void {
    this.http.get<ApartmentsDash[]>(this.apartmentsDashUrl)
      .subscribe((mainInfos) => {
        this.ngRedux.dispatch({
          type: MAININFO_LOADED,
          meta: null,
          payload: mainInfos,
        })
      })
  }

  loadSelectedApartmentDetails(id: number) {
    let url = `${this.apartmentUrl}${id}`;
    this.http.get<Apartment>(url)
      .subscribe(apartment => {
        this.ngRedux.dispatch({
          type: APARTMENT_SELECTED,
          meta: null,
          payload: apartment,
        })
      })

  }

  saveApartmentDetail(obj: Apartment) {
    console.log(obj);
  }
}
