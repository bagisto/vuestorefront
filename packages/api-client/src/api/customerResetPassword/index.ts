
import { gql } from '@apollo/client/core';
import { ForgotPasswordInput } from '../../types';

type Variables = {
    input?: ForgotPasswordInput;
  };

export async function customerResetPassword(context, params) {
  const inputFilters = {
    email: params
  };

  const variables: Variables = {
    input: inputFilters
  };

  try {
    return await context.client
      .mutate({
        mutation: gql`
        mutation forgotPassword ($input: ForgotPasswordInput!) {
            forgotPassword(input: $input) {
                status
                success
            }
        }`,
        variables: variables
      });
  } catch (error) {
    console.log('Error customerResetPassword:');
    console.log(error);
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
}
