import { createEvent } from 'effector';
import type { PageContextServer } from 'vike/types';

export const createPageInit = <T = void>() => {
  return createEvent<PageContextServer & { data: T & PageContextServer['data'] }>();
};

export const createPageStart = <T = void>() => {
  return createEvent<{ data: T; params: Record<string, string> }>();
};
