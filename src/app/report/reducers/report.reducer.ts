import {createFeature, createReducer, on} from '@ngrx/store';
import {ReportActions} from '../actions/report.actions';
import {ReportInterface} from "../models/report.interface";

export const reportFeatureKey = 'report';

export interface State {
  reports: ReportInterface[];
  error: string | null;
}

export const initialState: State = {
  reports: [],
  error: null
};

export const reducer = createReducer(
  initialState,
  on(ReportActions.loadReports, state => state),
  on(ReportActions.loadReportsSuccess, (state, action) => ({
    ...state,
    reports: action.data
  })),
  on(ReportActions.loadReportsFailure, (state, action) => ({
    ...state,
    error: action.error
  })),
  on(ReportActions.updateReportStatus, state => state),
  on(ReportActions.updateReportStatusSuccess, (state, action) => ({
    ...state,
    reports: state.reports.map(report => report.id === action.data.id ? action.data : report)
  })),
  on(ReportActions.updateReportStatusFailure, (state, action) => ({
    ...state,
    error: action.error
  })),
  on(ReportActions.deleteReport, state => state),
  on(ReportActions.deleteReportSuccess, (state, action) => ({
    ...state,
    reports: state.reports.filter(report => report.id !== action.id)
  })),
  on(ReportActions.deleteReportFailure, (state, action) => ({
    ...state,
    error: action.error
  }))
);

export const reportFeature = createFeature({
  name: reportFeatureKey,
  reducer,
});

