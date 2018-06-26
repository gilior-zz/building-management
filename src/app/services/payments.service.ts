import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  postsUrl = ' http://localhost:3000/posts';

  constructor(private http: HttpClient) {
  }

  getPosts():Observable<any>{
    return this.http.get(this.postsUrl)
  }
}
