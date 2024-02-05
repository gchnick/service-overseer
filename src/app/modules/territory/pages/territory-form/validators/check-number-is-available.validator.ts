import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable, map } from 'rxjs';
import { TerritoryService } from '../../../services/territory.service';

export function checkNumberIsAvailableValidator(
  territoryService: TerritoryService
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return territoryService
      .getOne(control.value)
      .pipe(
        map(isAvailable =>
          !isAvailable ? null : { checkNumberIsAvailable: true }
        )
      );
  };
}
