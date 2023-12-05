import { Observable } from 'rxjs';
import { Territory } from '../pages/show-territories/show-territories.component';

export type TerritoryRequest = Omit<
  Territory,
  'id' | 'urlMapImage' | 'isLocked' | 'meetingPlaces'
>;

export abstract class TerritoryService {
  abstract getAll(): Observable<Territory[]>;

  abstract getOne(number: number): Observable<Territory | null>;

  abstract create(territory: TerritoryRequest): Observable<Territory>;
}
