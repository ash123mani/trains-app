import { getTrainsOnPlatformInTimeWindow } from "../src/index";

import {
  train1,
  train2,
  train3,
  train4,
  timeWindow1,
  timeWindow2,
  timeWindow3,
  timeWindow4,
  timeWindow5,
  timeWindow6,
  timeWindow7,
  timeWindow8,
} from "../src/mocks";

describe("getTrainsOnPlatformInTimeWindow", () => {
  test(`Should return trains between ${timeWindow1.startHr} - ${timeWindow1.endHr}, with total 2 trains and 2 platform`, () => {
    expect(
      getTrainsOnPlatformInTimeWindow(timeWindow1, [train1, train2]),
    ).toStrictEqual([
      {
        trainId: "2",
        platformId: "1",
        haltTime: "15:01Hr-19:56Hr",
      },
    ]);
  });

  test(`Should return trains between ${timeWindow2.startHr} - ${timeWindow2.endHr},  with total 3 trains and 2 platforms`, () => {
    expect(
      getTrainsOnPlatformInTimeWindow(timeWindow2, [train1, train2, train3]),
    ).toEqual([
      {
        trainId: "2",
        platformId: "2",
        haltTime: "11:30:30Hr-11:33:50Hr",
      },
      {
        trainId: "3",
        platformId: "1",
        haltTime: "11:29Hr-11:30Hr",
      },
      {
        trainId: "3",
        platformId: "1",
        haltTime: "11:30:02Hr-11:31:50Hr",
      },
    ]);
  });

  test(`Should return trains between ${timeWindow3.startHr} - ${timeWindow3.endHr},  with total 3 trains and 2 platforms`, () => {
    expect(
      getTrainsOnPlatformInTimeWindow(timeWindow3, [train1, train2, train3]),
    ).toEqual([
      {
        trainId: "3",
        platformId: "1",
        haltTime: "11:29Hr-11:30Hr",
      },
      {
        trainId: "3",
        platformId: "1",
        haltTime: "11:30:02Hr-11:31:50Hr",
      },
    ]);
  });

  test(`Should not return any trains between ${timeWindow4.startHr} - ${timeWindow4.endHr}, with total 3 trains and 2 platforms`, () => {
    expect(
      getTrainsOnPlatformInTimeWindow(timeWindow4, [train1, train2, train3]),
    ).toEqual([]);
  });

  test(`Should return trains between ${timeWindow5.startHr} - ${timeWindow5.endHr}, with total 3 trains and 2 platforms`, () => {
    expect(
      getTrainsOnPlatformInTimeWindow(timeWindow5, [train1, train2, train3]),
    ).toEqual([
      {
        trainId: "1",
        platformId: "2",
        haltTime: "14:12:00Hr-16:00:00Hr",
      },
    ]);
  });

  test(`Should return trains between ${timeWindow6.startHr} - ${timeWindow6.endHr}, with total 3 trains and 2 platforms`, () => {
    expect(
      getTrainsOnPlatformInTimeWindow(timeWindow6, [train1, train2, train3]),
    ).toEqual([
      {
        trainId: "1",
        platformId: "2",
        haltTime: "00:00:00Hr-00:10:10Hr",
      },
    ]);
  });

  test(`Should not return that train which does not stop in platform for timeWindow ${timeWindow7.startHr} - ${timeWindow7.endHr}`, () => {
    expect(
      getTrainsOnPlatformInTimeWindow(timeWindow7, [train1, train4]),
    ).toEqual([
      {
        trainId: "1",
        platformId: "2",
        haltTime: "00:00:00Hr-00:10:10Hr",
      },
      {
        haltTime: "24:59:13Hr-00:00:13Hr",
        platformId: "2",
        trainId: "4",
      },
    ]);
  });

  test(`Should return that train which comes today and leaves tommmorow`, () => {
    expect(
      getTrainsOnPlatformInTimeWindow(timeWindow8, [train1, train4]),
    ).toEqual([
      {
        haltTime: "24:59:13Hr-00:00:13Hr",
        platformId: "2",
        trainId: "4",
      },
    ]);
  });
});
