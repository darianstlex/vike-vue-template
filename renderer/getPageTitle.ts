import type { PageContext } from 'vike/types'

export const getPageTitle = (pageContext: PageContext): string => {
  // Title defined dynamically by data()
  return pageContext.data?.title ||
    // Title defined statically by /pages/some-page/+title.js (or by `export default { title }` in /pages/some-page/+config.js)
    // The setting 'pageContext.config.title' is a custom setting we defined at ./+config.ts
    pageContext.config.title || 'Vike Demo'
}
