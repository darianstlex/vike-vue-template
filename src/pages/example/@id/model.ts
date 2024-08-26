import { createStore } from 'effector';

export const $id = createStore('', { sid: '$example-id' });

export const model = {
  $id,
};
