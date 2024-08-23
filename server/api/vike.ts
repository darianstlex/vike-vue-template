import type express from 'express';
import { renderPage } from 'vike/server';

export const connectVike = (app: express.Application) => {
  app.get('*', async (req, res, next) => {
    const pageContextInit = {
      cookies: req.cookies,
      urlOriginal: req.originalUrl,
      headersOriginal: req.headers,
    };
    const pageContext = await renderPage(pageContextInit);
    if (pageContext.errorWhileRendering) {
      // Install error tracking here, see https://vike.dev/errors
    }
    const { httpResponse } = pageContext;
    if (!httpResponse) {
      return next();
    } else {
      const { statusCode, headers, earlyHints } = httpResponse;
      if (res.writeEarlyHints) res.writeEarlyHints({ link: earlyHints.map((e) => e.earlyHintLink) });
      headers.forEach(([name, value]) => res.setHeader(name, value));
      res.status(statusCode);
      // For HTTP streams use httpResponse.pipe() instead, see https://vike.dev/streaming
      httpResponse.pipe(res);
    }
  });
};
