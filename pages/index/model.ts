import { createEvent, createStore, sample } from 'effector';

import { pageInitiated } from './+pageInitiated';
import { pageStarted } from './+pageStarted';

export const setValue = createEvent<number>();

export const $counterServer = createStore(0, { sid: '$counter' }).on(setValue, (val) => val + 1);

export const $counterClient = createStore(0, { sid: '$counter-front' }).on(setValue, (_, val) => val);

sample({
  clock: pageInitiated,
  fn: () => Math.round(Math.random() * 1000),
  target: $counterServer,
});

sample({
  clock: pageStarted,
  source: $counterClient,
  filter: (val) => !val,
  fn: () => Math.round(Math.random() * 1000),
  target: $counterClient,
});

export const model = {
  $counterServer,
  $counterClient,
  setValue,
};
