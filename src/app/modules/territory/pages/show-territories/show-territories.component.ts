import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Fab, RegistryIconService, ReturnValue } from '@nikosoftware/core-ui';
import { UiEventEmitterService } from '@nikosoftware/core-ui/event-emitter';
import { uiIconHomePin } from '@nikosoftware/core-ui/svg-icons';
import {
  TerritoryRequest,
  TerritoryService,
} from '../../services/territory.service';

enum Days {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}

enum Moments {
  MORNING = 'MORNING',
  AFTERNOON = 'AFTERNOON',
  EVENING = 'EVENING',
  NIGHT = 'NIGHT',
}

type Available = {
  frequency: string;
  moment: Moments;
};

type Availability = Partial<Record<Days, Available>>;

enum CardinalPoint {
  NORTH = 'NORTH',
  SOUTH = 'SOUTH',
  EAST = 'EAST',
  WEST = 'WEST',
}

type MeetingPlace = {
  id?: string;
  place: string;
  phone?: string;
  latitude?: string;
  longitude?: string;
  fieldService: boolean;
  availability?: Availability;
};

type Limits = Partial<Record<CardinalPoint, string>>;

export type Territory = {
  id: string;
  number: number;
  label: string;
  urlMapImage?: string;
  limits: Limits;
  lastDateCompleted: Date;
  isLocked: boolean;
  meetingPlaces?: MeetingPlace[];
};

const fabs: Fab[] = [
  {
    size: 'extended',
    color: 'primary',
    icon: 'add',
    label: 'Nuevo territorio',
    eventName: 'app.territory.new.dialog.open',
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

  ngOnInit(): void {
    this.#registryIcons();
    this.#addAndRemoveFabsToCoreUiNavitation();
    this.#initTerritoriesList();
  }

  #registryIcons() {
    this.#registryIconService.registerIcons([uiIconHomePin]);
  }

  #addAndRemoveFabsToCoreUiNavitation() {
    this.#eventEmitter.emit('core.ui.navigation.fabs.add', fabs);
    this.#destroyRef.onDestroy(() => {
      this.#eventEmitter.emit('core.ui.navigation.fabs.clean');
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
