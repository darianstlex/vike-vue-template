// https://vike.dev/usePageContext
import type { PageContext } from 'vike/types';
import type { App, InjectionKey, Ref } from 'vue';
import { inject } from 'vue';

const key: InjectionKey<Ref<PageContext>> = Symbol();

/** https://vike.dev/usePageContext */
export const usePageContext = (): Ref<PageContext> => {
  const pageContext = inject(key);
  if (!pageContext) throw new Error('setPageContext() not called in parent');
  return pageContext;
};

export const setPageContext = (app: App, pageContext: Ref<PageContext>): void => {
  app.provide(key, pageContext);
};
