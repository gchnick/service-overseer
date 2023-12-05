import { DatePipe, NgSwitch } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import {
  Block,
  RegistryIconService,
  UiCardComponent,
  UiTabComponent,
  UiTypescaleComponent,
} from '@nikosoftware/core-ui';
import {
  uiIconExplore,
  uiIconFeedback,
  uiIconPinDrop,
} from '@nikosoftware/core-ui/svg-icons';
import { Territory } from '../show-territories/show-territories.component';

type BockId = 'limits' | 'meeting-places' | 'report';

const blocks: Block[] = [
  { id: 'limits', icon: 'explore', label: 'Límites' },
  { id: 'meeting-places', icon: 'pin_drop', label: 'Puntos de encuentro' },
  { id: 'report', icon: 'feedback', label: 'Informes' },
];

@Component({
  selector: 'app-territory-details',
  standalone: true,
  imports: [
    NgSwitch,
    DatePipe,
    UiTypescaleComponent,
    UiCardComponent,
    UiTabComponent,
  ],
  templateUrl: './territory-details.component.html',
  styleUrls: ['./territory-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TerritoryDetailsComponent implements OnInit {
  readonly #registryIconService = inject(RegistryIconService);
  @Input() territory?: Territory;
  blocks = blocks;

  selectedTab = signal<BockId>('limits');

  ngOnInit(): void {
    this.#registryIcons();
  }

  #registryIcons() {
    this.#registryIconService.registerIcons([
      uiIconExplore,
      uiIconPinDrop,
      uiIconFeedback,
    ]);
  }

  onSelectedTab(tab: string) {
    this.selectedTab.set(tab as BockId);
  }
}
