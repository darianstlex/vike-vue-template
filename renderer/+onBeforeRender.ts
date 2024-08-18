import type { OnBeforeRenderAsync } from 'vike/types';
import { allSettled, fork, serialize } from 'effector';

import { appStarted } from './events';

export const onBeforeRender: OnBeforeRenderAsync = async (pageContext): ReturnType<OnBeforeRenderAsync> => {
  const { pageStarted } = pageContext.config;

  const scope = fork();

  await allSettled(appStarted, { scope });

  if (pageStarted) {
    await allSettled(pageStarted, {
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
