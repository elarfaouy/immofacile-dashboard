import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ReportInterface} from "../../report/models/report.interface";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  url = 'http://localhost:8080/api/property/report';

  constructor(
    private http: HttpClient
  ) {
  }

  getReports(): Observable<ReportInterface[]> {
    let observable = this.http.get<any>(this.url);

    return observable.pipe(
      map(standardInterface => standardInterface.data)
    );
  }

  updateReportStatus(id: number, status: string): Observable<ReportInterface> {
    let observable = this.http.put<any>(`${this.url}/status/${id}`, {}, {
      params: {
        status: status
      }
    });

    return observable.pipe(
      map(standardInterface => standardInterface.data)
    );
  }

  deleteReport(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
