import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Territory } from '../models/types';

export type TerritoryRequest = Omit<
  Territory,
  'id' | 'urlMapImage' | 'isLocked' | 'meetingPlaces'
>;

export abstract class TerritoryService {
  protected readonly BASE_URL = `${environment.API_BASE_URL}/territories`;

  abstract getAll(): Observable<Territory[]>;

  abstract getOne(number: number): Observable<Territory | null>;

  abstract create(territory: TerritoryRequest): Observable<Territory>;
}
