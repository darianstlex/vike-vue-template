import { sample } from 'effector';

import { createPageStart } from '@utils/events';

import { $counterServer } from './model';

export const pageInitiated = createPageStart();

sample({
  clock: pageInitiated,
  fn: () => Math.round(Math.random() * 1000),
  target: $counterServer,
});
