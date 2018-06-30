import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {Apartment} from "../common/interfaces";

@Injectable({
  providedIn: 'root'
})
export class ApartmentService {

  postsUrl = ' http://localhost:3000/apartments';

  constructor(private http: HttpClient) {
  }

  getApartments(): Observable<Apartment[]> {
    return this.http.get<Apartment[]>(this.postsUrl)
  }
}
