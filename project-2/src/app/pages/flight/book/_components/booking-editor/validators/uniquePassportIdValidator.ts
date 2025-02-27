import { AbstractControl, FormArray, ValidationErrors } from '@angular/forms';

export function uniquePassportIdValidator(
  control: AbstractControl
): ValidationErrors | null {
  if (!(control instanceof FormArray)) return null;

  const passportIds = control.controls
    .map((group: AbstractControl) => group.get('passportId')?.value)
    .filter((id) => id !== null && id !== undefined && id !== '');

  const uniqueIds = new Set(passportIds);
  return uniqueIds.size !== passportIds.length
    ? { duplicatePassportIds: true }
    : null;
}
