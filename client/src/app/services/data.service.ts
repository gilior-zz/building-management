import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IMetadata} from "../common/interfaces";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) {
  }

  udpateData(metaData: IMetadata): Observable<any> {
    return this.httpClient.put(metaData.url, metaData.body)
  }
}
