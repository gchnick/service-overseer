import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  CoreEvents,
  Fab,
  RegistryIconService,
  ReturnValue,
} from '@nikosoftware/core-ui';
import { UiEventEmitterService } from '@nikosoftware/core-ui/event-emitter';
import { uiIconHomePin } from '@nikosoftware/core-ui/svg-icons';
import { Territory } from '../../models/types';
import {
  TerritoryRequest,
  TerritoryService,
} from '../../services/territory.service';
import { NewTerritoryEvents } from './events/new-territory';

const fabs: Fab[] = [
  {
    size: 'extended',
    color: 'primary',
    icon: 'add',
    label: 'Nuevo territorio',
    eventName: NewTerritoryEvents.OPEN_DIALOG,
    tooltop: 'Crear un nuevo territorio',
  },
];

@Component({
  selector: 'app-show-territories',
  templateUrl: './show-territories.component.html',
  styleUrls: ['./show-territories.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowTerritoriesComponent implements OnInit {
  readonly #territoryService = inject(TerritoryService);
  readonly #registryIconService = inject(RegistryIconService);
  readonly #eventEmitter = inject(UiEventEmitterService);
  readonly #destroyRef = inject(DestroyRef);

  territories = signal<Territory[]>([]);
  toDetails = signal<Territory | undefined>(undefined);
  dialogEvents = NewTerritoryEvents;

  ngOnInit(): void {
    this.#registryIcons();
    this.#addAndRemoveFabsToCoreUiNavitation();
    this.#initTerritoriesList();
  }

  #registryIcons() {
    this.#registryIconService.registerIcons([uiIconHomePin]);
  }

  #addAndRemoveFabsToCoreUiNavitation() {
    this.#eventEmitter.emit(CoreEvents.NAVIGATION_ADD_FABS, fabs);
    this.#destroyRef.onDestroy(() => {
      this.#eventEmitter.emit(CoreEvents.NAVIGATION_CLEAN_FABS);
    });
  }

  #initTerritoriesList() {
    this.#territoryService
      .getAll()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(t => {
        this.territories.set(t);
      });
  }

  onCardClick(number: number) {
    const toDetails = this.territories().find(t => t.number === number);
    this.toDetails.set(toDetails);
  }

  onReturnValue({ success, data }: ReturnValue) {
    if (success) {
      this.#territoryService
        .create(data as TerritoryRequest)
        .subscribe(newTerritory => {
          this.territories.update(t => [...t, newTerritory]);
        });
    }
  }
}
