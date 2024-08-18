import type { Scope } from "effector";
import { fork, serialize } from "effector";
import type { PageContext } from 'vike/types'
import { createSSRApp, h, shallowRef } from 'vue'

import { setPageContext } from './usePageContext'
import { setData } from './useData'
import Layout from './Layout.vue'
import { objectAssign } from './utils'
import { setScope } from "./useScope";

export const createVueApp = (pageContext: PageContext) => {
  const pageContextRef = shallowRef(pageContext)
  const dataRef = shallowRef(pageContext.data)
  const pageRef = shallowRef(pageContext.Page)

  const scope =
    "scope" in pageContext
      ? pageContext.scope
      : fork(pageContext.scopeValues ? { values: pageContext.scopeValues } : undefined);

  const scopeRef = shallowRef(scope as Scope)

  const RootComponent = () => h(Layout, null, () => h(pageRef.value))
  const app = createSSRApp(RootComponent)
  setPageContext(app, pageContextRef)
  setData(app, dataRef)
  setScope(app, scopeRef);

  // app.changePage() is called upon navigation, see +onRenderClient.ts
  objectAssign(app, {
    changePage: (pageContext: PageContext) => {
      scopeRef.value = fork({ values: {
        ...serialize(scopeRef.value),
        ...pageContext.scopeValues || {},
      }});
      pageContextRef.value = pageContext;
      dataRef.value = pageContext.data;
      pageRef.value = pageContext.Page;
    }
  })

  return app
}
