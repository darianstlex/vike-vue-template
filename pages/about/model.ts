import { createStore } from 'effector';

const $info = createStore('info from server', { sid: '$info' });

export const model = {
  $info,
};
