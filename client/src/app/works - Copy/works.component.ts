import {Component, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {IWork} from '../../../../shared/models'
import {NgRedux} from "@angular-redux/store";
import {IActionPayload, IAppState} from "../common/interfaces";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import * as _ from "lodash";
import {StoreConst} from "../common/const";

/**
 * @title Table with expandable rows
 */
@Component({
  selector: 'table-expandable-rows-example',
  styleUrls: ['works.component.scss'],
  templateUrl: 'works.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class WorksComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<IWork>;
  // columnsToDisplay = ['name', 'weight', 'symbol', 'position'];
  columnsToDisplay: { [key: string]: string } = {

    'title': 'שם',
    'description': 'תיאור',
    'fromDate': 'מתאריך',
    'toDate': 'לתאריך',
    'provider': 'ספק',
    'payment': 'תשלום',
  }

  private works: IWork[];


  constructor(private ngRedux: NgRedux<IAppState>) {
    this.ngRedux.select('works').subscribe((works: IWork[]) => {
        this.works = works;
        this.dataSource = new MatTableDataSource(this.works);
        this.dataSource.sort = this.sort;
      }
    );
  }

  get columnsNamesArray(): Array<string> {
    return _.keys(this.columnsToDisplay);
  }

  ngOnInit() {
    this.ngRedux.dispatch(<IActionPayload>{
      type: StoreConst.LOAD_DATA,
      meta: {
        continueWith: StoreConst.DATA_LOADED_WORKS,
        body: undefined,
        url: `${StoreConst.API_URL}works`
      }
    })
  }
}



/**  Copyright 2018 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license */
