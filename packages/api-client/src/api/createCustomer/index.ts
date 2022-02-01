
import { gql } from '@apollo/client/core';
import { CreateRegisterInput } from '../../types';

type Variables = {
    input?: CreateRegisterInput;
  };

export async function createCustomer(context, params) {
  const inputFilters = {
    firstName: params?.first_name,
    lastName: params?.last_name,
    email: params?.email,
    password: params?.password,
    passwordConfirmation: params?.password_confirmation
  };

  const variables: Variables = {
    input: inputFilters
  };

  try {
    return await context.client
      .mutate({
        mutation: gql`
        mutation customerRegister ($input: CreateRegisterInput!) {
            customerRegister(input: $input) {
                status
                success
            }
        }`,
        variables: variables
      });
  } catch (error) {
    console.log('Error customerRegister:');
    console.log(error);
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
}
