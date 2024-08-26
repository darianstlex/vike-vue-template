import { sample } from 'effector';

import { createPageInit } from '@utils/events';

import type { data } from './+data';
import { $id } from './model';

export const pageInitiated = createPageInit<Awaited<ReturnType<typeof data>>>();

sample({
  clock: pageInitiated.map(({ data }) => data),
  fn: ({ sampleData: { id } }) => id,
  target: $id,
});
