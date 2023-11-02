import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Territory } from '../show-territories/show-territories.component';

interface TerritoryForm {
  label: FormControl<string>;
  number: FormControl<number>;
  lastDateCompleted: FormControl<Date>;
  limits: FormGroup<{
    NORTH: FormControl<string>;
    SOUTH: FormControl<string>;
    EAST: FormControl<string>;
    WEST: FormControl<string>;
  }>;
}

export type TerritoryReturnValue = Omit<
  Territory,
  'id' | 'isLocked' | 'urlMapImage' | 'meetingPlaces'
>;

@Component({
  selector: 'app-territory-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './territory-form.component.html',
  styleUrls: ['./territory-form.component.css'],
})
export class TerritoryFormComponent {
  @Output() returnValue = new EventEmitter<TerritoryReturnValue>();
  readonly #fb = inject(NonNullableFormBuilder);
  form = this.#fb.group<TerritoryForm>({
    label: this.#fb.control('', Validators.required),
    number: this.#fb.control(0, Validators.min(1)),
    lastDateCompleted: this.#fb.control(new Date(), Validators.required), // TODO: NoFutereDate
    limits: this.#fb.group({
      NORTH: ['', Validators.required],
      SOUTH: ['', Validators.required],
      EAST: ['', Validators.required],
      WEST: ['', Validators.required],
    }),
  });

  createOnClick() {
    this.returnValue.emit({
      label: this.form.controls.label.value,
      number: this.form.controls.number.value,
      lastDateCompleted: this.form.controls.lastDateCompleted.value,
      limits: {
        NORTH: this.form.controls.limits.controls.NORTH.value,
        SOUTH: this.form.controls.limits.controls.SOUTH.value,
        EAST: this.form.controls.limits.controls.EAST.value,
        WEST: this.form.controls.limits.controls.WEST.value,
      },
    });
  }
}
