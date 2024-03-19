import {Component, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatDialog} from "@angular/material/dialog";
import {ArticleAddDialogComponent} from "../../component/article-add-dialog/article-add-dialog.component";

@Component({
  selector: 'app-articles-page',
  templateUrl: './articles-page.component.html',
  styleUrl: './articles-page.component.css'
})
export class ArticlesPageComponent {
  private _sub!: Subscription;
  statusFilter: string = "";
  displayedColumns: string[] = ["id", "title", "author", "category", "publishedAt", "status", "actions"];
  competitions: any[] = [];
  dataSource = new MatTableDataSource<any>(this.competitions);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
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

  openArticleAddDialog(): void {
    const dialogRef = this.dialog.open(ArticleAddDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
