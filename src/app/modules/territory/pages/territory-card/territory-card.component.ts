import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-territory-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './territory-card.component.html',
  styleUrls: ['./territory-card.component.css'],
})
export class TerritoryCardComponent {
  @Output() selected = new EventEmitter<number>();
  @Input({ required: true }) id!: string;
  @Input({ required: true }) number!: number;
  @Input({ required: true }) label!: string;
  @Input() isSelected = false;

  @HostBinding('class.isSelected') get _isSeleted() {
    return this.isSelected;
  }

  @HostListener('click')
  onClick() {
    this.selected.emit(this.number);
  }
}
