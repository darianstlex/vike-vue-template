// https://vike.dev/onRenderClient
import type { OnRenderClientAsync } from 'vike/types'

import { createVueApp } from './createVueApp'
import { getPageTitle } from './getPageTitle'

let app: ReturnType<typeof createVueApp>
export const onRenderClient: OnRenderClientAsync = async (pageContext): ReturnType<OnRenderClientAsync> => {
  // This onRenderClient() hook only supports SSR, see https://vike.dev/render-modes for how to modify onRenderClient()
  // to support SPA
  if (!pageContext.Page) throw new Error('My onRenderClient() hook expects pageContext.Page to be defined')

  if (!app) {
    app = createVueApp(pageContext)
    app.mount('#app')
  } else {
    app.changePage(pageContext)
  }
  document.title = getPageTitle(pageContext)
}
