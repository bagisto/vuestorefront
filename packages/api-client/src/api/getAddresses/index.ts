
import { gql } from "@apollo/client/core";

export async function getAddresses(context, params) {

  try {
    return await context.client
      .query({
        query: gql`
        query addresses {
            addresses {
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
        }`
      });
  } catch (error) {
    console.log('Error getAddresses:');
    console.log(error);
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
}
