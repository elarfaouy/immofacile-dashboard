import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, map} from 'rxjs/operators';
import {of} from 'rxjs';
import {ReportActions} from '../actions/report.actions';
import {ReportService} from "../../service/report/report.service";


@Injectable()
export class ReportEffects {

  loadReports$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ReportActions.loadReports),
      concatMap(() =>
        this.reportService.getReports().pipe(
          map(data => ReportActions.loadReportsSuccess({data})),
          catchError(error => of(ReportActions.loadReportsFailure({error}))))
      )
    );
  });

  updateReportStatus$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ReportActions.updateReportStatus),
      concatMap(({id, status}) =>
        this.reportService.updateReportStatus(id, status).pipe(
          map(data => ReportActions.updateReportStatusSuccess({data})),
          catchError(error => of(ReportActions.updateReportStatusFailure({error}))))
      )
    );
  });

  deleteReport$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ReportActions.deleteReport),
      concatMap(({id}) =>
        this.reportService.deleteReport(id).pipe(
          map(() => ReportActions.deleteReportSuccess({id})),
          catchError(error => of(ReportActions.deleteReportFailure({error}))))
      )
    );
  });


  constructor(
    private actions$: Actions,
    private reportService: ReportService
  ) {
  }
}
