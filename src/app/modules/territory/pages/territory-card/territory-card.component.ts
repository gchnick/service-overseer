import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  booleanAttribute,
} from '@angular/core';
import { UiCardComponent } from '@nikosoftware/core-ui';

@Component({
  selector: 'app-territory-card',
  standalone: true,
  imports: [CommonModule, UiCardComponent],
  templateUrl: './territory-card.component.html',
  styleUrls: ['./territory-card.component.css'],
})
export class TerritoryCardComponent {
  @Output() cardClick = new EventEmitter<number>();
  @Input({ required: true }) id!: string;
  @Input({ required: true }) number!: number;
  @Input({ required: true }) label!: string;
  @Input({ transform: booleanAttribute }) selected!: boolean;

  @HostBinding('class') get clazz() {
    return this.selected ? 'TerritoryCard is-selected' : 'TerritoryCard';
  }

  @HostListener('click')
  onClick() {
    this.cardClick.emit(this.number);
  }
}
