import {IActionPayload, IMetadata} from "../common/interfaces";
import {StoreConst} from "../common/const";
import {NgRedux} from "@angular-redux/store";
import {Injectable} from "@angular/core";

@Injectable()
export class InfoService {
  tenantId: number;
  tenantstUrl = `${StoreConst.API_URL}tenants/`;

  constructor(private ngRedux: NgRedux<any>) {
  }


  deleteTenant(toDelete: boolean) {


    // this.heroService.saveTaxReturn(this.currentTaxReturn).subscribe();

    this.ngRedux.dispatch(<IActionPayload>{
      type: StoreConst.UPDATE_DATA,
      meta: <IMetadata>{
        continueWith: StoreConst.TENANT_DATA_UPDATED,
        url: `${this.tenantstUrl}${this.tenantId}`,
        body: {columnName: 'deleted', newVlaue: toDelete}
      }
    })
  }
}


