import { createEvent, createStore, sample } from 'effector';

export const setValue = createEvent<number>();

export const $counterServer = createStore(0, { sid: '$counter' }).on(setValue, (val) => val + 1);

export const $counterClient = createStore(0, { sid: '$counter-front' }).on(setValue, (_, val) => val);

export const model = {
  $counterServer,
  $counterClient,
  setValue,
};
