
import { gql } from '@apollo/client/core';
import { CreateAddressInput } from '../../types';

type Variables = {
    input: CreateAddressInput;
  };

export async function createAddress(context, params) {
  const inputFilters = {
    companyName: params?.value?.companyName,
    firstName: params?.value?.firstName,
    lastName: params?.value?.lastName,
    address1: params?.value?.address1,
    address2: params?.value?.address2,
    country: params?.value?.country,
    state: params?.value?.state,
    city: params?.value?.city,
    postcode: params?.value?.postcode,
    phone: params?.value?.phone,
    vatId: params?.value?.vatId
  };

  const variables: Variables = {
    input: inputFilters
  };

  if (params?.value?.defaultAddress) {
    variables.input.defaultAddress = params?.value?.defaultAddress;
  }

  try {
    return await context.client
      .mutate({
        mutation: gql`
        mutation createAddress ($input: CreateAddressInput!) {
            createAddress(input: $input) {
                status
                message
                addresses {
                  id
                  customerId
                  companyName
                  firstName
                  lastName
                  address1
                  address2
                  country
                  state
                  city
                  postcode
                  phone
                  vatId
                  addressType
                  defaultAddress
                  createdAt
                  updatedAt
                }
            }
        }`,
        variables: variables
      });
  } catch (error) {
    console.log('Error createAddress:');
    console.log(error);
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
}
