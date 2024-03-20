import {Component, ViewChild} from '@angular/core';
import {PropertyInterface} from "../../property/models/Property.interface";
import {Observable} from "rxjs";
import {PageablePropertiesInterface} from "../../property/models/PageableProperties.interface";
import {select, Store} from "@ngrx/store";
import {selectPropertyPageable} from "../../property/selectors/property.selectors";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort, Sort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {PropertyActions} from "../../property/actions/property.actions";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {
  PropertyUpdateStatusDialogComponent
} from "../../component/property-update-status-dialog/property-update-status-dialog.component";
import {ReportInterface} from "../../report/models/report.interface";
import {selectReports} from "../../report/selectors/report.selectors";
import {ReportActions} from "../../report/actions/report.actions";
import {
  ReportUpdateStatusDialogComponent
} from "../../component/report-update-status-dialog/report-update-status-dialog.component";

@Component({
  selector: 'app-report-page',
  templateUrl: './report-page.component.html',
  styleUrl: './report-page.component.css'
})
export class ReportPageComponent {
  reports: Observable<ReportInterface[]> = this.store.pipe(select(selectReports));
  selectedStatus: string = "";
  displayedColumns: string[] = ["id", "reason", "property", "reporter", "status", "actions"];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private store: Store,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.store.dispatch(ReportActions.loadReports());

    this.reports.subscribe(
      data => {
        if (data) {
          this.dataSource = new MatTableDataSource<any>(data);
          this.dataSource.paginator = this.paginator;
        } else {
          this.dataSource = new MatTableDataSource<any>([]);
        }
      },
      error => console.error(error)
    );
  }

  onStatusChange(): void {
    this.reports.subscribe(
      data => {
        if (data) {
          data = this.selectedStatus === "" ? data : data.filter(report => report.status === this.selectedStatus);
          this.dataSource = new MatTableDataSource<any>(data);
          this.dataSource.paginator = this.paginator;
        } else {
          this.dataSource = new MatTableDataSource<any>([]);
        }
      },
      error => console.error(error)
    );
  }

  deleteReport(id: number): void {
    if (window.confirm("Are you sure you want to delete this report?")) {
      this.store.dispatch(ReportActions.deleteReport({id}));
    }
  }

  updateReportStatus(id: number, status: string): void {
    this.dialog.open(ReportUpdateStatusDialogComponent, {
      data: {
        id: id,
        status: status
      }
    });
  }
}
