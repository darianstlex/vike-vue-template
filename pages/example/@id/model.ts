import { createStore, sample } from 'effector';

import { pageInitiated } from './+pageInitiated';

const $id = createStore('', { sid: '$example-id' });

sample({
  clock: pageInitiated.map(({ data }) => data),
  fn: ({ sampleData: { id } }) => id,
  target: $id,
});

export const model = {
  $id,
};
