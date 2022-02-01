
import { gql } from "@apollo/client/core";

export async function getCustomer(context, customerToken) {

  try {
    return await context.client
      .query({
        query: gql`
        query accountInfo {
            accountInfo {
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
        }`
      });
  } catch (error) {
    console.log('Error getCustomer:');
    console.log(error);
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
}
