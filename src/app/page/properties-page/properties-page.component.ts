import {Component, ViewChild} from '@angular/core';
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-properties-page',
  templateUrl: './properties-page.component.html',
  styleUrl: './properties-page.component.css'
})
export class PropertiesPageComponent {
  private _sub!: Subscription;
  statusFilter: string = "";
  displayedColumns: string[] = ["id", "type", "address", "area", "price", "status", "actions"];
  competitions: any[] = [];
  dataSource = new MatTableDataSource<any>(this.competitions);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
              private _bottomSheet: MatBottomSheet,
              private _liveAnnouncer: LiveAnnouncer,) {
  }

  ngOnInit(): void {
    // this._sub = this._competitionService.getCompetitions().subscribe(
    //   data => {
    //     this.competitions = data.content;
    //     this.dataSource = new MatTableDataSource<any>(this.competitions);
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    //   },
    //   error => console.error(error)
    // )
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
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

  filterData(selectedStatus: string): void {
    if (selectedStatus === "") {
      this.dataSource = new MatTableDataSource<any>(this.competitions);
    } else {
      this.dataSource = new MatTableDataSource<any>(this.competitions.filter(item => item.status === selectedStatus));
    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openBottomSheet(): void {
    // this.authService.hasRightAuthority("WRITE_COMPETITION").subscribe(
    //   (hasRight) => {
    //     if (hasRight) {
    //       this._bottomSheet.open(BottomSheetComponent);
    //     }
    //   }
    // );
  }
}
