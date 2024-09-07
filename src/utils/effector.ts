import type { Effect, Event, EventCallable, Scope, Store, Unit } from 'effector';
import { createWatch, is, scopeBind } from 'effector';
import type { DeepReadonly, Ref, ShallowRef } from 'vue';
import { onUnmounted, shallowRef, watch } from 'vue';

import { useScope } from './useScope';

type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;

const stateReader = <T>(store: Store<T>, scope?: Scope) => {
  return scope ? scope.getState(store) : store.getState();
};

/**
 * Watch scope changes and bind it to the unit
 */
const scopeBindWatch = (unit: EventCallable<any> | Effect<any, any>, scopeRef: Ref<Scope>) => {
  const unitRef = shallowRef<EventCallable<any> | Effect<any, any>>();
  unitRef.value = scopeBind(unit, { scope: scopeRef?.value, safe: true });

  const unwatchScope = scopeRef?.value
    ? watch(scopeRef, (scope) => {
        unitRef.value = scopeBind(unit, { scope, safe: true });
      })
    : undefined;

  onUnmounted(() => {
    unwatchScope?.();
  });

  return (data: any) => {
    return unitRef.value?.(data);
  };
};

const unitWatch = (unit: Store<any>, valRef: ShallowRef<any>, scope: Scope) => {
  return createWatch({
    unit,
    fn: (value) => {
      valRef.value = shallowRef(value).value;
    },
    scope,
  });
};

/**
 * Watch scope changes and recreate store watcher
 */
const createDoubleWatch = (unit: Store<any>, valRef: ShallowRef<any>, scopeRef: Ref<Scope>) => {
  const subRef = shallowRef();
  valRef.value = stateReader(unit, scopeRef?.value);
  subRef.value = unitWatch(unit, valRef, scopeRef?.value);

  const unwatchScope = scopeRef?.value
    ? watch(scopeRef, (scope) => {
        valRef.value = stateReader(unit, scope);
        subRef.value?.();
        subRef.value = unitWatch(unit, valRef, scope);
      })
    : undefined;

  onUnmounted(() => {
    unwatchScope?.();
    subRef.value?.();
  });
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
  const scopeRef = useScope();
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
    const ref = shallowRef();
    createDoubleWatch(normShape[key] as Store<any>, ref, scopeRef);
    states[key] = { ref };
  }

  if (isSingleUnit && is.store(config)) {
    return states.unit.ref;
  }

  if (isSingleUnit && is.event(config)) {
    // @ts-expect-error TS can't infer that normShape.unit is an Effect/Event
    return scopeBindWatch(normShape.unit, scopeRef);
  }

  const result: Record<string, any> = {};

  for (const key of eventKeys) {
    // @ts-expect-error TS can't infer that normShape[key] is an Effect/Event
    result[key] = scopeBindWatch(normShape[key], scopeRef);
  }
  for (const [key, value] of Object.entries(states)) {
    result[key] = value.ref;
  }

  if (isList) {
    return Object.values(result);
  }

  return result;
}
