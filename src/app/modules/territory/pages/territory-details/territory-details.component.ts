import { DatePipe, NgIf, NgOptimizedImage, NgSwitch } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import {
  Block,
  RegistryIconService,
  UiCardComponent,
  UiIconButtonComponent,
  UiTabComponent,
  UiTypescaleComponent,
} from '@nikosoftware/core-ui';
import {
  uiIconEditFill,
  uiIconExplore,
  uiIconFeedback,
  uiIconMoreVert,
  uiIconPinDrop,
} from '@nikosoftware/core-ui/svg-icons';
import { EmptyComponent } from '../empty/empty.component';
import { Territory } from '../show-territories/show-territories.component';

type BockId = 'limits' | 'meeting-places' | 'report';

const tabs: Block[] = [
  { id: 'limits', icon: 'explore', label: 'Límites' },
  { id: 'meeting-places', icon: 'pin_drop', label: 'Puntos de encuentro' },
  { id: 'report', icon: 'feedback', label: 'Informes' },
];

@Component({
  selector: 'app-territory-details',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgIf,
    NgSwitch,
    DatePipe,
    UiTypescaleComponent,
    UiCardComponent,
    UiTabComponent,
    UiIconButtonComponent,
    EmptyComponent,
  ],
  templateUrl: './territory-details.component.html',
  styleUrls: ['./territory-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TerritoryDetailsComponent implements OnInit {
  @HostBinding('class.TerritoryDetails') clazz = true;
  readonly #registryIconService = inject(RegistryIconService);
  @Input() territory?: Territory;
  tabs = tabs;

  selectedTab = signal<BockId>('limits');

  ngOnInit(): void {
    this.#registryIcons();
  }

  #registryIcons() {
    this.#registryIconService.registerIcons([
      uiIconEditFill,
      uiIconMoreVert,
      uiIconExplore,
      uiIconPinDrop,
      uiIconFeedback,
    ]);
  }

  onSelectedTab(tab: string) {
    this.selectedTab.set(tab as BockId);
  }
}
