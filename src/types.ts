export interface Train {
  id: string;
  schedule: TrainSchedule[];
}

export interface TimeWindow {
  startHr: string;
  endHr: string;
}

export interface TrainSchedule {
  arrHr: string;
  deptHr: string;
  platformId: string;
}

export interface TrainWithHaltSchedule {
  trainId: string;
  platformId: string;
  haltTime?: string;
}
