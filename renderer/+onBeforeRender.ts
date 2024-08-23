import { allSettled, fork, serialize } from 'effector';
import type { OnBeforeRenderAsync } from 'vike/types';

export const onBeforeRender: OnBeforeRenderAsync = async (pageContext): ReturnType<OnBeforeRenderAsync> => {
  const { onAfterInit, onBeforeInit, pageInitiated } = pageContext.config;

  pageContext.scope = fork();

  if (onBeforeInit) {
    await onBeforeInit(pageContext);
  }

  if (pageInitiated) {
    await allSettled(pageInitiated, { scope: pageContext.scope, params: pageContext });
  }

  if (onAfterInit) {
    await onAfterInit(pageContext);
  }

  return {
    pageContext: {
      scope: pageContext.scope,
      scopeValues: serialize(pageContext.scope),
    },
  };
};
