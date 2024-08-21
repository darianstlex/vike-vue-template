// https://vike.dev/onRenderClient
import { allSettled } from 'effector';
import type { OnRenderClientAsync } from 'vike/types';

import { appService } from '@services/app';
import { useScope } from '@utils/useScope';

import { createVueApp } from './createVueApp';
import { getPageTitle } from './getPageTitle';

let app: ReturnType<typeof createVueApp>;
export const onRenderClient: OnRenderClientAsync = async (pageContext): ReturnType<OnRenderClientAsync> => {
  const { pageStarted } = pageContext.config;

  if (!app) {
    app = createVueApp(pageContext, document.getElementById('#app')?.innerHTML === '');
    app.mount('#app');
    const scope = app.runWithContext(() => useScope());
    await allSettled(appService.appStarted, { scope: scope.value });
  } else {
    app.changePage(pageContext);
  }
  const scope = app.runWithContext(() => useScope());
  if (pageStarted) {
    await allSettled(pageStarted, {
      scope: scope.value,
      params: {
        params: pageContext.routeParams,
        data: pageContext.data,
      },
    });
  }
  document.title = getPageTitle(pageContext);
};
