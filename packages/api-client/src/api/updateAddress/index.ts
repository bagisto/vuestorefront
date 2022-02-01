
import { gql } from '@apollo/client/core';
import { UpdateAddressInput } from '../../types';

type Variables = {
    id: null,
    input: UpdateAddressInput;
  };

export async function updateAddress(context, params) {
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
    id: params?.value?.id,
    input: inputFilters
  };

  if (params?.value?.defaultAddress) {
    variables.input.defaultAddress = params?.value?.defaultAddress;
  }

  try {
    return await context.client
      .mutate({
        mutation: gql`
        mutation updateAddress ($id: ID!, $input: UpdateAddressInput!) {
            updateAddress(id: $id, input: $input) {
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
    console.log('Error updateAddress:');
    console.log(error);
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
}
