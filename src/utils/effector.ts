import type { Effect, Event, Scope, Store, Unit } from 'effector';
import { createWatch, is, scopeBind } from 'effector';
import type { DeepReadonly, Ref } from 'vue';
import { onUnmounted, shallowRef } from 'vue';

import { useScope } from './useScope';

type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;

const stateReader = <T>(store: Store<T>, scope?: Scope) => {
  return scope ? scope.getState(store) : store.getState();
};

export function useUnit<State>(store: Store<State>, opts?: { forceScope?: boolean }): DeepReadonly<Ref<State>>;
export function useUnit(event: Event<void>, opts?: { forceScope?: boolean }): () => void;
export function useUnit<T>(event: Event<T>, opts?: { forceScope?: boolean }): (payload: T) => T;
export function useUnit<R>(fx: Effect<void, R, any>, opts?: { forceScope?: boolean }): () => Promise<R>;
export function useUnit<T, R>(fx: Effect<T, R, any>, opts?: { forceScope?: boolean }): (payload: T) => Promise<R>;
export function useUnit<List extends (Event<any> | Effect<any, any> | Store<any>)[]>(
  list: [...List],
  opts?: { forceScope?: boolean },
): {
  [Key in keyof List]: List[Key] extends Event<infer T>
    ? Equal<T, void> extends true
      ? () => void
      : (payload: T) => T
    : List[Key] extends Effect<infer P, infer D, any>
      ? Equal<P, void> extends true
        ? () => Promise<D>
        : (payload: P) => Promise<D>
      : List[Key] extends Store<infer V>
        ? DeepReadonly<Ref<V>>
        : never;
};
export function useUnit<Shape extends Record<string, Event<any> | Effect<any, any, any> | Store<any>>>(
  shape: Shape | { '@@unitShape': () => Shape },
  opts?: { forceScope?: boolean },
): {
  [Key in keyof Shape]: Shape[Key] extends Event<infer T>
    ? Equal<T, void> extends true
      ? () => void
      : (payload: T) => T
    : Shape[Key] extends Effect<infer P, infer D, any>
      ? Equal<P, void> extends true
        ? () => Promise<D>
        : (payload: P) => Promise<D>
      : Shape[Key] extends Store<infer V>
        ? DeepReadonly<Ref<V>>
        : never;
};

export function useUnit<Shape extends { [key: string]: Unit<any> }>(config: Shape | { '@@unitShape': () => Shape }) {
  const scope = useScope();

  const isSingleUnit = is.unit(config);

  let normShape: { [key: string]: Unit<any> } = {};
  if (isSingleUnit) {
    normShape = { unit: config };
  } else if ('@@unitShape' in config) {
    if (typeof config['@@unitShape'] === 'function') {
      normShape = config['@@unitShape']();
    } else {
      throw 'expect @@unitShape to be a function';
    }
  } else {
    normShape = config;
  }

  const isList = Array.isArray(normShape);

  const storeKeys: string[] = [];
  const eventKeys: string[] = [];

  for (const key in normShape) {
    const unit = normShape[key];
    if (!is.unit(unit)) throw 'expect useUnit argument to be a unit';
    if (is.event(unit) || is.effect(unit)) {
      eventKeys.push(key);
    } else {
      storeKeys.push(key);
    }
  }

  const states: Record<string, any> = {};
  for (const key of storeKeys) {
    // @ts-expect-error TS can't infer that normShape[key] is a Store
    const state = stateReader(normShape[key], scope.value);
    const ref = shallowRef(state);
    const stop = createWatch({
      unit: normShape[key],
      fn: (value) => {
        ref.value = shallowRef(value).value;
      },
      scope: scope.value,
    });

    states[key] = {
      stop,
      ref,
    };
  }

  onUnmounted(() => {
    for (const val of Object.values(states)) {
      val.stop();
    }
  });

  if (isSingleUnit && is.store(config)) {
    return states.unit.ref;
  }

  if (isSingleUnit && is.event(config)) {
    // @ts-expect-error TS can't infer that normShape.unit is an Effect/Event
    return scopeBind(normShape.unit, { scope: scope.value, safe: true });
  }

  const result: Record<string, any> = {};

  for (const key of eventKeys) {
    // @ts-expect-error TS can't infer that normShape[key] is an Effect/Event
    result[key] = scopeBind(normShape[key], { scope: scope.value, safe: true });
  }
  for (const [key, value] of Object.entries(states)) {
    result[key] = value.ref;
  }

  if (isList) {
    return Object.values(result);
  }

  return result;
}
