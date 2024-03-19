import {Component, ViewChild} from '@angular/core';
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {PageEvent} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {PropertyActions} from "../../property/actions/property.actions";
import {PropertyInterface} from "../../property/models/Property.interface";
import {selectPropertyPageable} from "../../property/selectors/property.selectors";
import {PageablePropertiesInterface} from "../../property/models/PageableProperties.interface";

@Component({
  selector: 'app-properties-page',
  templateUrl: './properties-page.component.html',
  styleUrl: './properties-page.component.css'
})
export class PropertiesPageComponent {
  pageEvent: {
    pageIndex: number;
    pageSize: number;
    length: number;
  } = {pageIndex: 0, pageSize: 2, length: 0};
  properties: PropertyInterface[] = [];
  pageable: Observable<PageablePropertiesInterface | null> = this.store.pipe(select(selectPropertyPageable));
  selectedStatus: string = "";
  displayedColumns: string[] = ["id", "type", "address", "area", "price", "status", "actions"];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private store: Store,
    private _liveAnnouncer: LiveAnnouncer,) {
  }

  ngOnInit(): void {
    this.store.dispatch(PropertyActions.loadPropertys({
      page: this.pageEvent.pageIndex,
      size: this.pageEvent.pageSize,
      status: this.selectedStatus
    }));

    this.pageable.subscribe(
      data => {
        if (data) {
          this.pageEvent.length = data.totalElements;
          this.dataSource = new MatTableDataSource<any>(data.content);
          this.dataSource.sort = this.sort;
        } else {
          this.dataSource = new MatTableDataSource<any>([]);
        }
      },
      error => console.error(error)
    );
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent.pageSize = e.pageSize;
    this.pageEvent.pageIndex = e.pageIndex;
    this.store.dispatch(PropertyActions.loadPropertys({
      page: this.pageEvent.pageIndex,
      size: this.pageEvent.pageSize,
      status: this.selectedStatus
    }));
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  onStatusChange(): void {
    this.store.dispatch(PropertyActions.loadPropertys({
      page: this.pageEvent.pageIndex,
      size: this.pageEvent.pageSize,
      status: this.selectedStatus
    }));
  }

  deleteProperty(id: number): void {
    if (window.confirm("Are you sure you want to delete this property?")) {
      this.store.dispatch(PropertyActions.deleteProperty({id}));
    }
  }
}
