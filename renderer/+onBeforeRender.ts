import type { OnBeforeRenderAsync } from 'vike/types';
import { allSettled, fork, serialize } from 'effector';

export const onBeforeRender: OnBeforeRenderAsync = async (pageContext): ReturnType<OnBeforeRenderAsync> => {
  const { pageInitiated } = pageContext.config;

  const scope = fork();

  if (pageInitiated) {
    await allSettled(pageInitiated, {
      scope,
      params: {
        params: pageContext.routeParams,
        data: pageContext.data,
      },
    });
  }

  return {
    pageContext: {
      scope,
      scopeValues: serialize(scope),
    },
  };
};
