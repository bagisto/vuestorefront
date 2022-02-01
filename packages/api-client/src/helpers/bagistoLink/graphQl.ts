/* eslint-disable @typescript-eslint/restrict-template-expressions */
import ApolloClient from 'apollo-client';
import fetch from 'cross-fetch';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { Config } from '../../types/setup';

export const apolloLinkFactory = (settings: Config, handlers?: {
  apolloLink?: ApolloLink;
}) => {
  const baseLink = handlers?.apolloLink || setContext((apolloReq, { headers }) => ({
    headers: {
      ...headers,
    },
  }));

  const httpLink = createHttpLink({
    uri: `https://${settings.api.domain}/graphql`,
    credentials: 'include',
    fetch,
    ...settings.customApolloHttpLinkOptions
  });

  // our custom "afterware" that checks each response and saves the sessionID
  // if it contains an 'Authorization' header
  const afterwareLink = new ApolloLink((operation, forward) => {
    return forward(operation).map(response => {
      const context = operation.getContext();
      const authHeader = context.response.headers.get('Set-Cookie');
      if (authHeader && authHeader.includes('bagisto_session=')) {
        const getBagistoSession = authHeader.split(';');
        const bagistoSession = getBagistoSession[0].replace(' ', '');
        settings.state.setGuestToken(bagistoSession);
      }

      return response;
    });
  });

  return ApolloLink.from([
    baseLink.concat(afterwareLink).concat(httpLink)
  ]);
};

export const apolloClientFactory = (customOptions: Record<string, any>) => {

  return new ApolloClient({
    cache: new InMemoryCache(),
    queryDeduplication: true,
    ssrMode: true,
    ...customOptions
  });
};
