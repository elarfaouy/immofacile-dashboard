import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReport from '../reducers/report.reducer';

export const selectReportState = createFeatureSelector<fromReport.State>(
  fromReport.reportFeatureKey
);

export const selectReports = createSelector(
  selectReportState,
  (state: fromReport.State) => state.reports
);

export const selectError = createSelector(
  selectReportState,
  (state: fromReport.State) => state.error
);
