import { Observable } from 'rxjs';
import { Territory } from '../pages/show-territories/show-territories.component';
import { TerritoryReturnValue } from '../pages/territory-form/territory-form.component';

export abstract class TerritoryService {
  abstract getAll(): Observable<Territory[]>;

  abstract getOne(number: number): Observable<Territory | null>;

  abstract create(territory: TerritoryReturnValue): Observable<Territory>;
}
