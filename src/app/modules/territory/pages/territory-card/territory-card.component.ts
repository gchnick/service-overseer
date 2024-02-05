import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  booleanAttribute,
} from '@angular/core';
import {
  UiAvatarHeaderComponent,
  UiCardComponent,
} from '@nikosoftware/core-ui';

@Component({
  selector: 'app-territory-card',
  standalone: true,
  imports: [DatePipe, UiCardComponent, UiAvatarHeaderComponent],
  template: `<ui-card
    class="TerritoryCard-card"
    [variant]="selected ? 'filled' : 'outlined'">
    <ui-avatar-header
      class="TerritoryCard-avatar"
      [initial]="number.toString()"
      [header]="name"
      [subhead]="(lastDateCompleted | date) ?? ''" />
  </ui-card> `,
  styles: `:host.TerritoryCard {
    display: block;
    flex: auto;
    height: fit-content;

    position: relative;
    overflow: hidden;
    border-radius: 12px;

    & .u-ripples {
      position: absolute;
      background: var(--m3-on-secondary-container);
      border-radius: 50%;
      opacity: 1;
      pointer-events: none;
      transform: translate(-50%, -50%) scale(0);
      animation: ripples 0.6s ease-in;
    }
    
    & .TerritoryCard-card  {
      width: 100%;
    }

    
  }

  @keyframes ripples {
    to {
      transform: translate(-50%, -50%) scale(3);
      opacity: 0;
    }
  }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TerritoryCardComponent {
  @Output() cardClick = new EventEmitter<number>();
  @Input({ required: true }) number!: number;
  @Input({ required: true }) name!: string;
  @Input({ required: true }) lastDateCompleted!: Date;
  @Input({ transform: booleanAttribute }) selected!: boolean;

  @HostBinding('class') get clazz() {
    return this.selected ? 'TerritoryCard is-selected' : 'TerritoryCard';
  }

  @HostListener('click')
  onClick() {
    this.cardClick.emit(this.number);
  }
}
