import { sample } from 'effector';

import { createPageStart } from '@utils/events';

import type { data } from './+data';
import { $id } from './model';

export const pageInitiated = createPageStart<Awaited<ReturnType<typeof data>>>();

sample({
  clock: pageInitiated.map(({ data }) => data),
  fn: ({ sampleData: { id } }) => id,
  target: $id,
});
