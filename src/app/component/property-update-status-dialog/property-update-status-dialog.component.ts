import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {PropertyActions} from "../../property/actions/property.actions";

@Component({
  selector: 'app-property-update-status-dialog',
  templateUrl: './property-update-status-dialog.component.html',
  styleUrl: './property-update-status-dialog.component.css'
})
export class PropertyUpdateStatusDialogComponent implements OnInit {
  selectedStatus: string = "";

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number, status: string },
    private store: Store,
    ) {}

  ngOnInit(): void {
    this.selectedStatus = this.data.status;
  }

  updatePropertyStatus() {
    this.store.dispatch(PropertyActions.updatePropertyStatus({
      id: this.data.id,
      status: this.selectedStatus
    }));
  }
}
