import type { Config } from 'vike/types';

// https://vike.dev/config
export default {
  // https://vike.dev/clientRouting
  clientRouting: true,
  passToClient: ['scopeValues'],
  // https://vike.dev/meta
  meta: {
    // Define new setting 'title'
    title: {
      env: { server: true, client: true },
    },
    // Define new setting 'description'
    description: {
      env: { server: true, client: true },
    },
    // runs before page init
    onBeforeInit: {
      env: { server: true, client: false },
    },
    // runs after page init
    onAfterInit: {
      env: { server: true, client: false },
    },
    // Event - fires on server side when the page gets initiated
    pageInitiated: {
      env: { client: false, server: true },
    },
    // Event - fires on client side when the page started
    pageStarted: {
      env: { client: true, server: false },
    },
    // Component - custom page layout
    Layout: {
      env: { client: true, server: true },
    },
    // Component - extra page wrapper
    Wrapper: {
      env: { client: true, server: true },
    },
  },
  hydrationCanBeAborted: true,
} satisfies Config;
