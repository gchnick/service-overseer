import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { EMPTY, Observable, catchError, of, throwError } from 'rxjs';
import { Territory } from '../models/types';
import {
  TerritoryRequest,
  TerritoryService,
} from '../services/territory.service';

@Injectable({ providedIn: 'root' })
export class TerritoryNode extends TerritoryService {
  readonly #http = inject(HttpClient);

  override getAll(): Observable<Territory[]> {
    return this.#http.get<Territory[]>(this.BASE_URL);
  }

  override getOne(number: number): Observable<Territory | null> {
    return this.#http.get<Territory>(`${this.BASE_URL}/${number}`).pipe(
      catchError(error => {
        if (error.status === 404) {
          return of(null);
        }

        return throwError(() => error);
      })
    );
  }

  override create(territory: TerritoryRequest): Observable<Territory> {
    return this.#http.post<Territory>(this.BASE_URL, territory).pipe(
      catchError(error => {
        console.log('Error: ', error); // TODO: System of Notification
        return EMPTY;
      })
    );
  }
}
