import type { Scope } from 'effector';
import { fork, serialize } from 'effector';
import type { PageContext } from 'vike/types';
import { createApp, createSSRApp, h, shallowRef } from 'vue';

import { objectAssign } from '@utils/objectAssign';
import { setData } from '@utils/useData';
import { setPageContext } from '@utils/usePageContext';
import { setScope } from '@utils/useScope';

import Layout from './Layout.vue';

const getPage = (pageContext: PageContext) => {
  return () =>
    h(pageContext.config.Layout || Layout, null, () =>
      pageContext.config.Wrapper ? h(pageContext.config.Wrapper, null, () => h(pageContext.Page)) : h(pageContext.Page),
    );
};

export const createVueApp = (pageContext: PageContext, clientOnly = false) => {
  const createAppFunc = clientOnly ? createApp : createSSRApp;
  const pageContextRef = shallowRef(pageContext);
  const dataRef = shallowRef(pageContext.data);
  const pageRef = shallowRef(getPage(pageContext));

  const scope =
    'scope' in pageContext
      ? pageContext.scope
      : fork(pageContext.scopeValues ? { values: pageContext.scopeValues } : undefined);

  const scopeRef = shallowRef(scope as Scope);

  const RootComponent = () => h(pageRef.value);
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
      pageRef.value = getPage(pageContext);
    },
  });

  return app;
};
