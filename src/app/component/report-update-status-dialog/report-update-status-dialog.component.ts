import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {PropertyActions} from "../../property/actions/property.actions";
import {ReportActions} from "../../report/actions/report.actions";

@Component({
  selector: 'app-report-update-status-dialog',
  templateUrl: './report-update-status-dialog.component.html',
  styleUrl: './report-update-status-dialog.component.css'
})
export class ReportUpdateStatusDialogComponent {
  selectedStatus: string = "";

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number, status: string },
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.selectedStatus = this.data.status;
  }

  updateReportStatus() {
    this.store.dispatch(ReportActions.updateReportStatus({
      id: this.data.id,
      status: this.selectedStatus
    }));
  }
}
