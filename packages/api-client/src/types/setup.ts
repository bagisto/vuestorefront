import ApolloClient, { ApolloClientOptions } from 'apollo-client';
import { FetchOptions } from 'apollo-link-http';

export interface Storage {
  set: (
    name: string,
    value: any
  ) => void;
  get: (name: string) => any;
  remove: (name: string) => any;
  removeAll: () => void;
}

export type ConfigState = {
  getCustomerToken(): string;
  setCustomerToken(token?: string | null): void;
  getGuestToken(): string;
  setGuestToken(token?: string | null): void;
};

export interface ClientConfig {
  api: {
    domain: string;
  };
  cookies: {
    currencyCookieName: string;
    localeCookieName: string;
    customerCookieName: string;
    bagistoSession: string;
  },
  currency: string;
  state: ConfigState;
}

export interface Config<T = any> extends ClientConfig {
  client?: ApolloClient<T>;
  storage: Storage;
  customOptions?: ApolloClientOptions<any>;
  customApolloHttpLinkOptions?: FetchOptions;
}

export interface ClientInstance extends ApolloClient<any> {
}
