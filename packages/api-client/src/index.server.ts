import { apiClientFactory, ApiClientExtension } from '@vue-storefront/core';
import type { Setttings, Endpoints } from './types';

import * as api from './api';

import { ClientInstance, Config } from './types/setup';
import { createBagistoConnection } from './helpers/bagistoLink';
import { defaultSettings } from './helpers/apiClient/defaultSettings';
import { apolloClientFactory } from './helpers/bagistoLink/graphQl';

const onCreate = (settings: Config): { config: Config; client: ClientInstance } => {

  const config = {
    ...defaultSettings,
    ...settings,
    state: settings.state || defaultSettings.state
  } as unknown as Config;

  const { apolloLink } = createBagistoConnection(config);

  const client = apolloClientFactory({
    link: apolloLink
  });

  return {
    config,
    client
  };
};

const tokenExtension: ApiClientExtension = {
  name: 'tokenExtension',
  hooks: (req, res) => ({
    beforeCreate: ({ configuration }) => {
      return {
        ...configuration,
        state: {
          getCustomerToken: () => req.cookies['vsf-bagCust-token'],
          setCustomerToken: (token) => {
            if (!token) {
              // eslint-disable-next-line no-param-reassign
              delete req.cookies['vsf-bagCust-token'];
              return;
            }
            res.cookie('vsf-bagCust-token', JSON.stringify(token));
          },
          getGuestToken: () => req.cookies['bagisto_session'],
          setGuestToken: (token) => {
            if (!token) {
              // eslint-disable-next-line no-param-reassign
              delete req.cookies['bagisto_session'];
              return;
            }
            res.cookie('bagisto_session', token);
          }
        }
      };
    }
  })
};

const { createApiClient } = apiClientFactory<Setttings, Endpoints>({
  onCreate,
  api,
  extensions: [tokenExtension]
});

export {
  createApiClient
};
