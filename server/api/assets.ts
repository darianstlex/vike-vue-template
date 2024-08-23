import type express from 'express';

import { root } from '../root.js';

const isProduction = process.env.NODE_ENV === 'production';

export const connectAssets = async (app: express.Application) => {
  // Vite integration
  if (isProduction) {
    // In production, we need to serve our static assets ourselves.
    // (In dev, Vite's middleware serves our static assets.)
    const serve = (await import('sirv')).default;
    app.use(
      serve(`${root}/dist/client`, {
        etag: true,
        immutable: true,
        maxAge: 31536000,
      }),
    );
  } else {
    // We instantiate Vite's development server and integrate its middleware to our server.
    // ⚠️ We instantiate it only in development. (It isn't needed in production, and it
    // would unnecessarily bloat our production server.)
    const vite = await import('vite');
    const viteDevMiddleware = (
      await vite.createServer({
        root,
        server: { middlewareMode: true },
      })
    ).middlewares;
    app.use(viteDevMiddleware);
  }
};
