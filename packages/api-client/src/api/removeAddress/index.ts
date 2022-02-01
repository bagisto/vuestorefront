
import { gql } from '@apollo/client/core';

export async function removeAddress(context, params) {

  try {
    return await context.client
      .mutate({
        mutation: gql`
        mutation deleteAddress ($id: ID!) {
            deleteAddress(id: $id) {
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
        variables: {
          id: params?.id
        }
      });
  } catch (error) {
    console.log('Error removeAddress:');
    console.log(error);
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
}
