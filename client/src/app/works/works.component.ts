import {Component, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {NgRedux} from "@angular-redux/store";
import {IActionPayload, IAppState} from "../common/interfaces";
import {ActivatedRoute, Router} from "@angular/router";
import {IWork, IWorkExtraDetails} from '../../../../shared/models'
import {StoreConst} from "../common/const";
import * as _ from 'lodash'

@Component({
  selector: 'works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class WorksComponent implements OnInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<IWork>
  columnsToDisplay: { [key: string]: string } = {

    'title': 'שם',
    'description': 'תיאור',
    'fromDate': 'מתאריך',
    'toDate': 'לתאריך',
    'provider': 'ספק',
    'payment': 'תשלום',
  }

  // columnsToDisplay = ['name', 'weight', 'symbol', 'position'];
  expandedElement: IWork | null;
  private works: IWork[];
  isExpansionDetailRow = (i: number, row: any) => false;
  constructor(private ngRedux: NgRedux<IAppState>, private router: Router, private activatedRoute: ActivatedRoute) {
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




