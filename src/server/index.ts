/* eslint-disable no-console */
import 'isomorphic-fetch';
import 'hds-core/lib/base.css';

import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import express, { Request, Response } from 'express';
import { Resource } from 'i18next';
import i18nextMiddleware, { I18NextRequest } from 'i18next-express-middleware';
import cron from 'node-cron';
import React from 'react';
import { getDataFromTree } from 'react-apollo';
import ReactDOMServer from 'react-dom/server';
import { Helmet } from 'react-helmet';

import i18next from '../common/translation/i18n/init.server';
import { SUPPORT_LANGUAGES } from '../constants';
import { ServerRequestContextType } from '../contexts/ServerRequestContext';
import getDomainFromRequest from '../util/getDomainFromRequest';
import updateSitemaps from '../util/updateSitemap';
import { getAssets } from './assets';
import Html from './Html';
import ServerApp, { StaticContext } from './ServerApp';

const OK = 'OK';
const SERVER_IS_NOT_READY = 'SERVER_IS_NOT_READY';

let serverIsReady = false;

const signalReady = () => {
  serverIsReady = true;
};

const checkIsServerReady = (response: Response) => {
  if (serverIsReady) {
    response.send(OK);
  } else {
    response.status(500).send(SERVER_IS_NOT_READY);
  }
};

const getInitialI18nStore = (req: Request) => {
  const initialI18nStore: Resource = {};

  Object.values(SUPPORT_LANGUAGES).forEach((l: string) => {
    initialI18nStore[
      l
    ] = (req as I18NextRequest).i18n.services.resourceStore.data[l];
  });

  return initialI18nStore;
};

const app = express();

app.use(express.static(__dirname, { index: false }));

app.use(i18nextMiddleware.handle(i18next));

app.get('/healthz', (request, response) => {
  checkIsServerReady(response);
});

app.get('/readiness', (request, response) => {
  checkIsServerReady(response);
});

app.use(async (req: Request, res: Response) => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: process.env.REACT_APP_GRAPHQL_BASE_URL,
    }),
    ssrMode: true,
  });
  const staticContext: StaticContext = {};
  const serverRequestContext: ServerRequestContextType = {
    url: req.url,
    host: getDomainFromRequest(req),
  };
  const el = React.createElement(ServerApp, {
    client,
    staticContext,
    serverRequestContext,
    i18n: (req as I18NextRequest).i18n,
  });

  // Function to generate html and send response to client
  // Use this also if any GraphQl request fails
  const generateHtmlAndSendResponse = () => {
    // Extracts apollo client cache
    const state = client.extract();
    const content = ReactDOMServer.renderToString(el);
    const helmet = Helmet.renderStatic();
    const assets = getAssets();
    const initialI18nStore = getInitialI18nStore(req);
    const initialLanguage = (req as I18NextRequest).i18n.languages[0];
    const htmlEl = React.createElement(Html, {
      assets,
      canonicalUrl: `${getDomainFromRequest(req)}${req.url}`,
      content,
      helmet,
      initialI18nStore,
      initialLanguage,
      state,
    });

    const html = ReactDOMServer.renderToString(htmlEl);

    if (staticContext.url) {
      res.redirect(302, staticContext.url);
    } else {
      res.status(200);
      res.send(`<!doctype html>${html}`);
      res.end();
    }
  };

  try {
    // Executes all graphql queries for the current state of application
    await getDataFromTree(el);
  } catch (e) {
    console.error('Error - GrapQl requests failed', e);
  }

  try {
    generateHtmlAndSendResponse();
  } catch (e) {
    console.error('Error - Html generation failed', e);
    res.send('Something went very very wrong.');
  }
});

// Function to generate sitemap
const generateSitemap = async () => {
  // Generate sitemap only if REACT_APP_GENERATE_SITEMAP flag is set to true
  if (process.env.REACT_APP_GENERATE_SITEMAP !== 'true') {
    return;
  }

  try {
    await updateSitemaps();
  } catch (e) {
    console.error('Failed to updadate sitemap with error: ', e);
  }
};

cron.schedule('* 5 * * *', () => {
  generateSitemap();
});

const port = 3001;

app.listen(port, () => {
  signalReady();
  generateSitemap();
  console.log(`Server listening on ${port} port`);
});
