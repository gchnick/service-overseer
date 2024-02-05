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
