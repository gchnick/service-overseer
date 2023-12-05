import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { Fab, ReturnValue } from '@nikosoftware/core-ui';
import { UiEventEmitterService } from '@nikosoftware/core-ui/event-emitter';
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
export class ShowTerritoriesComponent implements OnInit, OnDestroy {
  readonly #territoryService = inject(TerritoryService);
  readonly #eventEmitter = inject(UiEventEmitterService);

  territoryToDetail = signal<Territory | undefined>(undefined);
  territories$ = this.#territoryService.getAll();

  ngOnInit(): void {
    this.#eventEmitter.emit('core.ui.navigation.fabs.add', fabs);
  }

  ngOnDestroy(): void {
    this.#eventEmitter.emit('core.ui.navigation.fabs.clean');
  }

  onCardClick(number: number) {
    this.#territoryService.getOne(number).subscribe(t => {
      this.territoryToDetail.set(t ?? undefined);
    });
  }

  onReturnValue({ success, data }: ReturnValue) {
    if (success) {
      this.#territoryService
        .create(data as TerritoryRequest)
        .subscribe(response => console.log(response)); // TODO: System of Notification
    }
  }
}
