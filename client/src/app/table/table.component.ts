import {HttpClient} from '@angular/common/http';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Observable} from 'rxjs';
import {ApartmentsDash, IAppState} from "../common/interfaces";
import {ApartmentService} from "../services/payments.service";
import {NgRedux} from "@angular-redux/store";

/**
 * @title Table retrieving data through HTTP
 */
@Component({
  selector: 'data-table',
  styleUrls: ['./table.component.scss'],
  templateUrl: './table.component.html',
})
export class TableComponent implements OnInit, AfterViewInit {
  displayedColumns = ['id', 'floor', 'debt', 'details'];
  exampleDatabase: ExampleHttpDao | null;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<ApartmentsDash>
  apartmentsDash: ApartmentsDash[];

  constructor(private http: HttpClient,
              private  apartmentService: ApartmentService,
              private ngRedux: NgRedux<IAppState>) {
    this.ngRedux.select('apartmentsDash').subscribe((apartmentsDash: ApartmentsDash[]) => {
        this.apartmentsDash = apartmentsDash;
        this.dataSource = new MatTableDataSource(this.apartmentService.apartmentsDash);
        this.dataSource.sort = this.sort;
      }
    );
  }


  ngAfterViewInit(): void {

  }

  ngOnInit() {

    // this.exampleDatabase = new ExampleHttpDao(this.http);
    // this.exampleDatabase.getData()
    //   .subscribe((data => {
    //     this.data = data;
    //     this.isLoadingResults = false;
    //   }))
    // If the user changes the sort order, reset back to the first page.

    // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    //
    // merge(this.sort.sortChange, this.paginator.page)
    //   .pipe(
    //     startWith({}),
    //     switchMap(() => {
    //       this.isLoadingResults = true;
    //       return this.exampleDatabase!.getRepoIssues(
    //         this.sort.active, this.sort.direction, this.paginator.pageIndex);
    //     }),
    //     map(data => {
    //       // Flip flag to show that loading has finished.
    //       this.isLoadingResults = false;
    //       this.isRateLimitReached = false;
    //       this.resultsLength = data.total_count;
    //
    //       return data.items;
    //     }),
    //     catchError(() => {
    //       this.isLoadingResults = false;
    //       // Catch if the GitHub API has reached its rate limit. Return empty data.
    //       this.isRateLimitReached = true;
    //       return observableOf([]);
    //     })
    //   ).subscribe(data => this.data = data);
  }
}

export interface GithubApi {
  items: GithubIssue[];
  total_count: number;
}

export interface GithubIssue {
  created_at: string;
  number: string;
  state: string;
  title: string;
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDao {
  constructor(private http: HttpClient) {
  }

  getRepoIssues(sort: string, order: string, page: number): Observable<GithubApi> {
    const href = 'https://api.github.com/search/issues';
    const requestUrl =
      `${href}?q=repo:angular/material2&sort=${sort}&order=${order}&page=${page + 1}`;

    return this.http.get<GithubApi>(requestUrl);
  }

  getData(): Observable<any> {
    const href = 'https://jsonplaceholder.typicode.com/posts';

    return this.http.get(href)

  }
}
