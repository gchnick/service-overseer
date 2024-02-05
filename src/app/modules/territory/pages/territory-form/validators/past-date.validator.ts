import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const pastDateValidator = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const date = new Date(control.value);
    const now = new Date();
    return date < now ? null : { pastDate: true };
  };
};
