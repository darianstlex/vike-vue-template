import { createEvent } from 'effector';

export function createPageStart<T = void>() {
  return createEvent<{
    params: Record<string, string>;
    data: T;
  }>();
}
