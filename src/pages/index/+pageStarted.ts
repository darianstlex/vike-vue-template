import { sample } from 'effector';

import { createPageStart } from '@utils/events';

import { $counterClient } from './model';

export const pageStarted = createPageStart();

sample({
  clock: pageStarted,
  source: $counterClient,
  filter: (val) => !val,
  fn: () => Math.round(Math.random() * 1000),
  target: $counterClient,
});
