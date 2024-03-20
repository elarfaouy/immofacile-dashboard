import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {ReportInterface} from "../models/report.interface";

export const ReportActions = createActionGroup({
  source: 'Report',
  events: {
    'Load Reports': emptyProps(),
    'Load Reports Success': props<{ data: ReportInterface[] }>(),
    'Load Reports Failure': props<{ error: string }>(),
    'Update Report Status': props<{ id: number, status: string }>(),
    'Update Report Status Success': props<{ data: ReportInterface }>(),
    'Update Report Status Failure': props<{ error: string }>(),
    'Delete Report': props<{ id: number }>(),
    'Delete Report Success': props<{ id: number }>(),
    'Delete Report Failure': props<{ error: string }>()
  }
});
