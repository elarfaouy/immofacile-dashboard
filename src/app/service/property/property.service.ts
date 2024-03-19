import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PageablePropertiesInterface} from "../../property/models/PageableProperties.interface";
import {map} from "rxjs/operators";
import {PropertyInterface} from "../../property/models/Property.interface";

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  url = 'http://localhost:8080/api/property';

  constructor(
    private http: HttpClient
  ) {
  }

  getProperties(page: number, size: number, status: string): Observable<PageablePropertiesInterface> {
    let standardInterfaceObservable = this.http.get<PropertyStandardInterface>(this.url, {
      params: {
        page: page,
        size: size,
        status: status
      }
    });

    return standardInterfaceObservable.pipe(
      map(standardInterface => standardInterface.data)
    );
  }

  deleteProperty(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  updatePropertyStatus(id: number, status: string): Observable<PropertyInterface> {
    let observable = this.http.put<any>(`${this.url}/status/${id}`, {status: status});

    return observable.pipe(
      map(standardInterface => standardInterface.data)
    );
  }
}

interface PropertyStandardInterface {
  status: string;
  message: string;
  data: PageablePropertiesInterface;
  errors: null | Record<string, string>;
}
