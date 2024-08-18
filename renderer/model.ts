import { createEvent } from "effector";

export const appStarted = createEvent();

export function createPageStart<T = void>() {
  return createEvent<{
    params: Record<string, string>;
    data: T;
  }>();
}
