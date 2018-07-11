import {Injectable} from '@angular/core';
import {NgRedux} from "@angular-redux/store";
import {IAppState, MetaData} from "../common/interfaces";
import {HttpClient} from "@angular/common/http";
import {StoreConst} from "../common/const";
import META_DATA_LOADED = StoreConst.META_DATA_LOADED;

@Injectable()
export class MetaDataService {
  url = ' http://localhost:3000/metaData';

  public metaData: MetaData;

  constructor(private ngRedux: NgRedux<IAppState>, private httpClient: HttpClient) {
    this.httpClient.get(this.url)
      .subscribe((metaData) => {
        this.ngRedux.dispatch({
          type: META_DATA_LOADED,
          meta: null,
          payload: metaData,
        })
      })
    this.ngRedux.select('metaData')
      .subscribe(i => this.metaData = i)
  }
}
