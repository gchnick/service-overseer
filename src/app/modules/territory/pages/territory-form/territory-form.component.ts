import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  DialogActionsDirective,
  UiButtonComponent,
  UiTextfieldComponent,
} from '@nikosoftware/core-ui';
import { UiEventEmitterService } from '@nikosoftware/core-ui/event-emitter';
import { TerritoryService } from '../../services/territory.service';
import { NewTerritoryEvents } from '../show-territories/events/new-territory';
import { errorsDictionary } from './errors.dictionary';
import { checkNumberIsAvailableValidator } from './validators/check-number-is-available.validator';
import { pastDateValidator } from './validators/past-date.validator';

@Component({
  selector: 'app-territory-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    UiTextfieldComponent,
    UiButtonComponent,
    DialogActionsDirective,
  ],
  templateUrl: './territory-form.component.html',
  styleUrls: ['./territory-form.component.css'],
})
export class TerritoryFormComponent {
  readonly #fb = inject(FormBuilder);
  readonly #territoryService = inject(TerritoryService);
  readonly #eventEmitter = inject(UiEventEmitterService);
  step = signal(1);

  form = this.#fb.group({
    basic: this.#fb.group({
      label: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
        ],
      ],
      number: [
        null,
        {
          validators: [
            Validators.required,
            Validators.min(1),
            Validators.max(100),
          ],
          asyncValidators: checkNumberIsAvailableValidator(
            this.#territoryService
          ),
          updateOn: 'blur',
        },
      ],
      lastDateCompleted: [
        null,
        { validators: [Validators.required, pastDateValidator()] },
      ],
    }),
    limits: this.#fb.group({
      NORTH: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
        ],
      ],
      SOUTH: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
        ],
      ],
      EAST: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
        ],
      ],
      WEST: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
        ],
      ],
    }),
  });

  get number() {
    return this.form.controls.basic.controls.number;
  }

  get label() {
    return this.form.controls.basic.controls.label;
  }

  get lastDateCompleted() {
    return this.form.controls.basic.controls.lastDateCompleted;
  }

  get NORTH() {
    return this.form.controls.limits.controls.NORTH;
  }

  get SOUTH() {
    return this.form.controls.limits.controls.SOUTH;
  }

  get EAST() {
    return this.form.controls.limits.controls.EAST;
  }

  get WEST() {
    return this.form.controls.limits.controls.WEST;
  }

  supportingText(control: FormControl<unknown | null>): string | undefined {
    for (const errorCode in errorsDictionary) {
      if (control.touched && control.getError(errorCode)) {
        return errorsDictionary[errorCode];
      }
    }
    return undefined;
  }

  onClickNext() {
    this.step.set(2);
  }

  onClickBack() {
    this.step.set(1);
  }

  onClose(success: boolean) {
    this.#eventEmitter.emit(NewTerritoryEvents.CLOSE_DIALOG, {
      success,
      data: success
        ? { ...this.form.value.basic, limits: this.form.value.limits }
        : undefined,
    });
  }
}
