import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { UiEventEmitter } from '@nikosoftware/core-ui/event-emitter';
import { TerritoryService } from '../../services/territory.service';
import { TerritoryReturnValue } from '../territory-form/territory-form.component';

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

@Component({
  selector: 'app-show-territories',
  templateUrl: './show-territories.component.html',
  styleUrls: ['./show-territories.component.css'],
})
export class ShowTerritoriesComponent implements OnInit {
  @ViewChild('dialog', { static: true }) dialog!: ElementRef<HTMLDialogElement>;
  territoryToDetail = signal<Territory | undefined>(undefined);

  readonly #territoryService = inject(TerritoryService);
  readonly #eventEmitter = inject(UiEventEmitter);

  territories$ = this.#territoryService.getAll();

  #showModal = () => {
    const dialog = this.dialog.nativeElement;
    dialog.showModal();
  };

  ngOnInit(): void {
    this.#initEventListener();
  }

  #initEventListener() {
    this.#eventEmitter.on('territory.new', this.#showModal);
  }

  trackByFn(_: number, territory: Territory) {
    return territory.id;
  }

  onSelected(number: number) {
    this.#territoryService.getOne(number).subscribe(t => {
      this.territoryToDetail.set(t ?? undefined);
    });
  }

  returnValueForm(value: TerritoryReturnValue) {
    this.#territoryService
      .create(value)
      .subscribe(response => console.log(response)); // TODO: System of Notification
  }
}
