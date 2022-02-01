import { Config } from '../../types/setup';
import { apolloLinkFactory } from './graphQl';
import { linkFactory } from './linkHandlers';

export const createBagistoConnection = (settings: Config) => {

  const apolloLink = apolloLinkFactory(settings, {
    apolloLink: linkFactory({ state: settings.state }),
  });

  return {
    apolloLink,
  };
};
