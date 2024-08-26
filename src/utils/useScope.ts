// https://vike.dev/usePageContext
import type { Scope } from 'effector';
import type { App, InjectionKey, Ref } from 'vue';
import { inject } from 'vue';

const key: InjectionKey<Ref<Scope>> = Symbol();

export const useScope = (): Ref<Scope> => {
  const scope = inject(key);
  if (!scope) throw new Error('setScope() not called in parent');
  return scope;
};

export const setScope = (app: App, scope: Ref<Scope>): void => {
  app.provide(key, scope);
};
