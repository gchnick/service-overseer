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
  templateUrl: './territory-card.component.html',
  styleUrls: ['./territory-card.component.css'],
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
