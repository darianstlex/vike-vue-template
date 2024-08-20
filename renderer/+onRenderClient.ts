// https://vike.dev/onRenderClient
import type { OnRenderClientAsync } from 'vike/types'

import { createVueApp } from './createVueApp'
import { getPageTitle } from './getPageTitle'
import {useScope} from "@utils/useScope";
import {allSettled} from "effector";
import {appService} from "@services/app";

let app: ReturnType<typeof createVueApp>
export const onRenderClient: OnRenderClientAsync = async (pageContext): ReturnType<OnRenderClientAsync> => {
  // This onRenderClient() hook only supports SSR, see https://vike.dev/render-modes for how to modify onRenderClient()
  // to support SPA
  if (!pageContext.Page) throw new Error('My onRenderClient() hook expects pageContext.Page to be defined');

  if (!app) {
    app = createVueApp(pageContext);
    app.mount('#app');
    const scope = app.runWithContext(() => useScope());
    await allSettled(appService.appStarted, { scope: scope.value });
  } else {
    app.changePage(pageContext);
  }
  document.title = getPageTitle(pageContext);
}
