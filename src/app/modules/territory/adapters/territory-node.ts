import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of, tap, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Territory } from '../pages/show-territories/show-territories.component';
import {
  TerritoryRequest,
  TerritoryService,
} from '../services/territory.service';

@Injectable({ providedIn: 'root' })
export class TerritoryNode extends TerritoryService {
  readonly #http = inject(HttpClient);
  readonly #BASE_URL = `${environment.API_BASE_URL}/territories`;

  override getAll(): Observable<Territory[]> {
    return this.#http.get<Territory[]>(this.#BASE_URL);
  }

  override getOne(number: number): Observable<Territory | null> {
    return this.#http.get<Territory>(`${this.#BASE_URL}/${number}`).pipe(
      catchError(error => {
        if (error.status === 404) {
          return of(null);
        }

        return throwError(() => error);
      })
    );
  }

  override create(territory: TerritoryRequest): Observable<Territory> {
    console.log('Territory to create -> ', territory);
    return this.#http.post<Territory>(this.#BASE_URL, territory).pipe(
      tap(t => console.log('Territory created -> ', t)),
      catchError(error => {
        console.log('Error: ', error);
        return throwError(() => error); // TODO: System of Notification
      })
    );
  }
}
