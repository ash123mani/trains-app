import {
  Train,
  TimeWindow,
  TrainSchedule,
  TrainWithHaltSchedule,
} from "./types";

function getSecondsFromHour(timeInHr: string) {
  var timeUnits = timeInHr.split(":");
  return (
    Number(timeUnits[0]) * 3600 +
    Number(timeUnits[1] || 0) * 60 +
    Number(timeUnits[2] || 0) * 1
  );
}

const isHaltScheduledBetweenTimeWindow = (
  schedule: TrainSchedule,
  timeWindow: TimeWindow,
): boolean => {
  const windowStartHrInSeconds = getSecondsFromHour(timeWindow.startHr);
  const windowEndHrInSeconds = getSecondsFromHour(timeWindow.endHr);

  const trainArrHrInSeconds = getSecondsFromHour(schedule.arrHr);
  const trainDeptHrInSeconds = getSecondsFromHour(schedule.deptHr);

  if (trainDeptHrInSeconds < trainArrHrInSeconds) {
    if (
      trainArrHrInSeconds >= windowStartHrInSeconds &&
      trainDeptHrInSeconds <= windowStartHrInSeconds
    ) {
      return true;
    }
  }

  if (
    (trainArrHrInSeconds >= windowStartHrInSeconds &&
      trainArrHrInSeconds <= windowEndHrInSeconds) ||
    (trainDeptHrInSeconds <= windowEndHrInSeconds &&
      trainDeptHrInSeconds >= windowStartHrInSeconds)
  ) {
    return true;
  }

  return false;
};

let platformsOnStation = 2;

export const getTrainsOnPlatformInTimeWindow = (
  timeWindow: TimeWindow,
  trains: Train[],
): TrainWithHaltSchedule[] => {
  const trainsOnPlatformInTimeWindow: TrainWithHaltSchedule[] = [];

  if (!trains.length) {
    return trainsOnPlatformInTimeWindow;
  }

  trains.forEach((train) => {
    const haltScheduleForTrain = train.schedule;

    if (trainsOnPlatformInTimeWindow.length < platformsOnStation) {
      haltScheduleForTrain.forEach((schedule) => {
        const trainArrHrInSeconds = getSecondsFromHour(schedule.arrHr);
        const trainDeptHrInSeconds = getSecondsFromHour(schedule.deptHr);

        if (
          trainArrHrInSeconds !== trainDeptHrInSeconds &&
          isHaltScheduledBetweenTimeWindow(schedule, timeWindow)
        ) {
          trainsOnPlatformInTimeWindow.push({
            trainId: train.id,
            platformId: schedule.platformId,
            haltTime: `${schedule.arrHr}Hr-${schedule.deptHr}Hr`,
          });
        }
      });
    } else {
      return trainsOnPlatformInTimeWindow;
    }
  });

  return trainsOnPlatformInTimeWindow;
};
