import { createStore, sample } from 'effector';

import { pageStarted } from './+pageStarted';

const $id = createStore("", { sid: '$example-id' });

sample({
  clock: pageStarted.map(({ data }) => data),
  fn: ({ sampleData: { id } }) => id,
  target: $id,
});

export const service = {
  $id,
}