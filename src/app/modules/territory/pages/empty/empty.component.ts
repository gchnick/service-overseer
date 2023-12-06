import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UiIconComponent, UiTypescaleComponent } from '@nikosoftware/core-ui';
import { uiIcon } from '@nikosoftware/core-ui/svg-icons';

@Component({
  selector: 'app-empty',
  standalone: true,
  imports: [UiIconComponent, UiTypescaleComponent],
  template: `
    <div class="Empty-wrapper">
      <ui-icon class="Empty-icon" [name]="icon" />
      <ui-typescale
        class="Empty-label"
        type="label"
        size="large"
        [text]="label" />
    </div>
  `,
  styles: `
  :host {
    height: 100%;
    width: 100%;
    display: grid;
    place-items: center;

    & .Empty-wrapper {
      display: grid;
      place-items: center;

      & .Empty-icon {
        fill: var(--m3-on-surface);
        height: 100px;
        width: 100px;
      }

      & .Empty-label {
        color: var(--m3-on-surface);
      }
    }
  }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyComponent {
  @Input({ required: true }) icon!: uiIcon;
  @Input({ required: true }) label!: string;
}
