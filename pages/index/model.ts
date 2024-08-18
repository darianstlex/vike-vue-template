import { createEvent, createStore, sample } from 'effector';

import { pageStarted } from './+pageStarted';

export const setValue = createEvent<number>();

export const $counterServer = createStore(0, { sid: '$counter' }).on(
  setValue,
  (val) => val + 1,
);

export const $counterClient = createStore(0, { sid: '$counter-front' }).on(
  setValue,
  (_, val) => val,
);

sample({
  clock: pageStarted,
  fn: () => Math.round(Math.random() * 1000),
  target: $counterServer,
});

export const model = {
  $counterServer,
  $counterClient,
  setValue,
};