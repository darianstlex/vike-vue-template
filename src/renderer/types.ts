import type { EventCallable, Scope } from 'effector';

export type { Component };

import type { PageContextServer } from 'vike/types';
import type { ComponentPublicInstance } from 'vue';

type Component = ComponentPublicInstance; // https://stackoverflow.com/questions/63985658/how-to-type-vue-instance-out-of-definecomponent-in-vue-3/63986086#63986086
type Page = Component;

// https://vike.dev/pageContext#typescript
declare global {
  namespace Vike {
    interface PageContext {
      Page: Page;
      data?: {
        /** Value for <title> defined dynamically by /pages/some-page/+data.js */
        title?: string;
        /** Value for <meta name="description"> defined dynamically */
        description?: string;
      };
      config: {
        /** Value for <title> defined statically by /pages/some-page/+title.js (or by `export default { title }` in /pages/some-page/+config.js) */
        title?: string;
        /** Value for <meta name="description"> defined statically */
        description?: string;
        /** Hook that runs after page init */
        onAfterInit?: (pageContext: PageContextServer) => Promise<void>;
        /** Hook that runs before page init */
        onBeforeInit?: (pageContext: PageContextServer) => Promise<void>;
        /** Page init event - server side */
        pageInitiated?: EventCallable<PageContextServer>;
        /** Page start event - client side */
        pageStarted?: EventCallable<{ params: Record<string, string>; data: unknown }>;
        /** Page Layout component */
        Layout?: Component;
        /** Page Wrapper component */
        Wrapper?: Component;
      };
      /** https://vike.dev/render */
      abortReason?: string;

      // https://effector.dev/en/api/effector/scope/
      scope?: Scope;
      scopeValues?: Record<string, unknown>;
    }
  }
}
