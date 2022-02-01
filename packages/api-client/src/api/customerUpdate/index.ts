
import { gql } from '@apollo/client/core';
import { UpdateAccountInput } from '../../types';

type Variables = {
    input?: UpdateAccountInput;
  };

export async function customerUpdate(context, params) {
  const inputFilters = {
    firstName: params?.firstName,
    lastName: params?.lastName,
    email: params?.email,
    gender: params?.gender,
    phone: params?.phone,
    dateOfBirth: params?.dateOfBirth
  };

  const variables: Variables = {
    input: inputFilters
  };

  if (params.oldpassword) {
    variables.input.oldpassword = params.oldpassword;
    variables.input.password = params.password;
    variables.input.passwordConfirmation = params.confirmPassword;
  }

  try {
    return await context.client
      .mutate({
        mutation: gql`
        mutation updateAccount ($input: UpdateAccountInput!) {
            updateAccount(input: $input) {
                status
                message
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
    console.log('Error customerUpdate:');
    console.log(error);
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
}
