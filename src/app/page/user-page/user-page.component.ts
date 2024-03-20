import {Component, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {UserInterface} from "../../user/models/user.interface";
import {selectUsers} from "../../user/selectors/user.selectors";
import {UserActions} from "../../user/actions/user.actions";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent {
  users: Observable<UserInterface[]> = this.store.pipe(select(selectUsers));
  displayedColumns: string[] = ["username", "firstName", "LastName", "email", "role", "actions"];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(UserActions.loadUsers({onlyWantToBeAgent: false}));

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

  suspendUser(username: string): void {
    if (window.confirm("Are you sure you want to suspend this user?")) {
      this.store.dispatch(UserActions.suspendUser({username}));
    }
  }

  activateUser(username: string): void {
    if (window.confirm("Are you sure you want to activate this user?")) {
      this.store.dispatch(UserActions.unsuspendUser({username}));
    }
  }

  deleteUser(username: string): void {
    if (window.confirm("Are you sure you want to delete this user?")) {
      this.store.dispatch(UserActions.deleteUser({username}));
    }
  }
}
