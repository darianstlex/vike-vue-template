import type { Scope } from 'effector';
import { fork, serialize } from 'effector';
import type { PageContext } from 'vike/types';
import { createApp, createSSRApp, h, shallowRef } from 'vue';

import { objectAssign } from '@utils/objectAssign';
import { setData } from '@utils/useData';
import { setPageContext } from '@utils/usePageContext';
import { setScope } from '@utils/useScope';

import Layout from './Layout.vue';
import Wrapper from './Wrapper.vue';

export const createVueApp = (pageContext: PageContext, clientOnly = false) => {
  const createAppFunc = clientOnly ? createApp : createSSRApp;
  const pageContextRef = shallowRef(pageContext);
  const dataRef = shallowRef(pageContext.data);
  const pageRef = shallowRef(pageContext.Page);
  const layoutRef = shallowRef(pageContext.config.Layout || Layout);
  const wrapperRef = shallowRef(pageContext.config.Wrapper || Wrapper);

  const scope =
    'scope' in pageContext
      ? pageContext.scope
      : fork(pageContext.scopeValues ? { values: pageContext.scopeValues } : undefined);

  const scopeRef = shallowRef(scope as Scope);

  const RootComponent = () => h(layoutRef.value, null, () => h(wrapperRef.value, null, () => h(pageRef.value)));
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
      layoutRef.value = pageContext.config.Layout || Layout;
      wrapperRef.value = pageContext.config.Wrapper || Wrapper;
      pageRef.value = pageContext.Page;
    },
  });

  return app;
};
