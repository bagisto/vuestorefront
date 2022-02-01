
import { gql } from '@apollo/client/core';
import { LoginInput } from '../../types';

type Variables = {
    input?: LoginInput;
  };

export async function customerLogin(context, params) {
  const inputFilters = {
    email: params?.email,
    password: params?.password,
    remember: params?.remember || false
  };

  const variables: Variables = {
    input: inputFilters
  };

  try {
    return await context.client
      .mutate({
        mutation: gql`
        mutation customerLogin ($input: LoginInput!) {
            customerLogin(input: $input) {
                status
                success
                accessToken
                tokenType
                expiresIn
                customer {
                    id
                    firstName
                    lastName
                    name
                    gender
                    dateOfBirth
                    email
                    phone
                    password
                    apiToken
                    customerGroupId
                    subscribedToNewsLetter
                    isVerified
                    token
                    notes
                    status
                    createdAt
                    updatedAt
                }
            }
        }`,
        variables: variables
      });
  } catch (error) {
    console.log('Error customerLogin:');
    console.log(error);
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
}
