import { createEvent, createStore } from 'effector';

const appStarted = createEvent();

const $isClient = createStore(typeof document !== 'undefined', {
  serialize: 'ignore',
  sid: '$app-is-client',
});

export const appService = {
  appStarted,
  $isClient,
};
