import { setContext } from 'apollo-link-context';
import { ConfigState } from '../../types/setup';

export const handleRetry = () => (count, error) => {
  if (count > 3) {
    return false;
  }

  if (error?.result?.message === 'invalid_token') {
    return true;
  }

  return false;
};

export const linkFactory = ({ state }: {
  state: ConfigState;
}) => setContext((apolloReq, { headers }) => {
  const token: string = state.getCustomerToken();
  const guestCookie: string = state.getGuestToken();

  return {
    headers: {
      ...headers,
      ...(token ? { authorization: token } : {}),
      ...(guestCookie ? { Cookie: guestCookie } : {})
    }
  };
});
