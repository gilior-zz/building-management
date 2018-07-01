import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Apartment, IAppState} from "../common/interfaces";
import {NgRedux} from "@angular-redux/store";
import {StoreConst} from "../common/const";
import {Subject} from "rxjs/Rx";
import APARTMENTS_LOADED = StoreConst.APARTMENTS_LOADED;
import APARTMENT_SELECTED = StoreConst.APARTMENT_SELECTED;

@Injectable({
  providedIn: 'root'
})
export class ApartmentService {

  postsUrl = ' http://localhost:3000/apartments';
  apartments: Apartment[];
  public selectedApartment: Apartment;
  private selectedApartmentdSource = new Subject<void>();
  public selectedApartmentdSource$ = this.selectedApartmentdSource.asObservable();

  constructor(private http: HttpClient, private ngRedux: NgRedux<IAppState>) {
    this.ngRedux.select('apartments').subscribe((apartments: Apartment[]) =>
      this.apartments = apartments);
    this.ngRedux.select('selectedApartmentID').subscribe((selectedApartmentID: number) => {
        if (this.apartments) {
          this.selectedApartment = this.apartments.filter(i => i.id === selectedApartmentID)[0];
          this.selectedApartmentdSource.next();
        }

      }
    )
  }

  getApartments(): void {
    this.http.get<Apartment[]>(this.postsUrl)
      .subscribe((apartments) => {
        this.ngRedux.dispatch({
          type: APARTMENTS_LOADED,
          meta: null,
          payload: apartments,
        })
      })
  }

  setSelectedApartment(id: number) {
    this.ngRedux.dispatch({
      type: APARTMENT_SELECTED,
      meta: null,
      payload: id,
    })
  }
}
