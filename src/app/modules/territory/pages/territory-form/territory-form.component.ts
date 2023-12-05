import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  DialogActionsDirective,
  UiButtonComponent,
  UiTextfieldComponent,
} from '@nikosoftware/core-ui';
import { UiEventEmitterService } from '@nikosoftware/core-ui/event-emitter';

interface TerritoryForm {
  basic: FormGroup<{
    label: FormControl<string>;
    number: FormControl<number>;
    lastDateCompleted: FormControl<Date>;
  }>;
  limits: FormGroup<{
    NORTH: FormControl<string>;
    SOUTH: FormControl<string>;
    EAST: FormControl<string>;
    WEST: FormControl<string>;
  }>;
}

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TerritoryFormComponent {
  readonly #fb = inject(NonNullableFormBuilder);
  readonly #eventEmitter = inject(UiEventEmitterService);
  path = signal(1);

  form = this.#fb.group<TerritoryForm>({
    basic: this.#fb.group({
      label: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
        ],
      ],
      number: [0, [Validators.min(1), Validators.max(100)]],
      lastDateCompleted: [new Date(), [Validators.required]], // TODO: NoFutereDate
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

  onClickNext() {
    this.path.set(2);
  }

  onClickBack() {
    this.path.set(1);
  }

  onClose(success: boolean) {
    this.#eventEmitter.emit('app.territory.new.dialog.close', {
      success,
      data: success
        ? {
            label: this.form.controls.basic.controls.label.value,
            number: this.form.controls.basic.controls.number.value,
            lastDateCompleted:
              this.form.controls.basic.controls.lastDateCompleted.value,
            limits: {
              NORTH: this.form.controls.limits.controls.NORTH.value,
              SOUTH: this.form.controls.limits.controls.SOUTH.value,
              EAST: this.form.controls.limits.controls.EAST.value,
              WEST: this.form.controls.limits.controls.WEST.value,
            },
          }
        : undefined,
    });
  }
}
