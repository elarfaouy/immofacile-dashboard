import {Component, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {UserInterface} from "../../user/models/user.interface";
import {select, Store} from "@ngrx/store";
import {selectUsers} from "../../user/selectors/user.selectors";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {UserActions} from "../../user/actions/user.actions";

@Component({
  selector: 'app-agencies-page',
  templateUrl: './agencies-page.component.html',
  styleUrl: './agencies-page.component.css'
})
export class AgenciesPageComponent {
  users: Observable<UserInterface[]> = this.store.pipe(select(selectUsers));
  displayedColumns: string[] = ["username", "firstName", "LastName", "email", "licenseNumber", "actions"];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(UserActions.loadUsers({onlyWantToBeAgent: true}));

    this.users.subscribe(
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

  acceptUserAsAgent(username: string): void {
    if (window.confirm("Are you sure you want to accept this user as an agent?")) {
      this.store.dispatch(UserActions.acceptUserAsAgent({username}));
    }
  }

  deleteUser(username: string): void {
    if (window.confirm("Are you sure you want to delete this user?")) {
      this.store.dispatch(UserActions.deleteUser({username}));
    }
  }
}
