import { allSettled, fork, serialize } from 'effector';
import type { OnBeforeRenderAsync } from 'vike/types';

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
