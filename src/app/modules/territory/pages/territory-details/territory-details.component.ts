import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Territory } from '../show-territories/show-territories.component';

@Component({
  selector: 'app-territory-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './territory-details.component.html',
  styleUrls: ['./territory-details.component.css'],
})
export class TerritoryDetailsComponent {
  @Input() territory?: Territory;
}
