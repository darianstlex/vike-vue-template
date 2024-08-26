import type { Scope } from 'effector';
import { fork, serialize } from 'effector';
import type { PageContext } from 'vike/types';
import { createApp, createSSRApp, h, type SetupContext, shallowRef } from 'vue';

import { objectAssign } from '@utils/objectAssign';
import { setData } from '@utils/useData';
import { setPageContext } from '@utils/usePageContext';
import { setScope } from '@utils/useScope';

const Empty = {
  setup: (_: any, ctx: SetupContext) => () => ctx?.slots?.default?.(),
};

export const createVueApp = (pageContext: PageContext, clientOnly = false) => {
  const createAppFunc = clientOnly ? createApp : createSSRApp;
  const pageContextRef = shallowRef(pageContext);
  const dataRef = shallowRef(pageContext.data);
  const pageRef = shallowRef(pageContext.Page);
  const layoutRef = shallowRef(pageContext.config.Layout || Empty);
  const wrapperRef = shallowRef(pageContext.config.Wrapper || Empty);

  const scope =
    'scope' in pageContext
      ? pageContext.scope
      : fork(pageContext.scopeValues ? { values: pageContext.scopeValues } : undefined);

  const scopeRef = shallowRef(scope as Scope);

  const RootComponent = () => h(layoutRef.value, () => h(wrapperRef.value, () => h(pageRef.value)));
  const app = createAppFunc(RootComponent);
  setPageContext(app, pageContextRef);
  setData(app, dataRef);
  setScope(app, scopeRef);

  // app.changePage() is called upon navigation, see +onRenderClient.ts
  objectAssign(app, {
    changePage: (pageContext: PageContext) => {
      scopeRef.value = fork({
        values: {
          ...serialize(scopeRef.value),
          ...(pageContext.scopeValues || {}),
        },
      });
      pageContextRef.value = pageContext;
      dataRef.value = pageContext.data;
      layoutRef.value = pageContext.config.Layout || Empty;
      wrapperRef.value = pageContext.config.Wrapper || Empty;
      pageRef.value = pageContext.Page;
    },
  });

  return app;
};
