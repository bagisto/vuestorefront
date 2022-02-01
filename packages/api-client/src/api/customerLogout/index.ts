
import { gql } from '@apollo/client/core';

export async function customerLogout(context, params) {

  try {
    return await context.client
      .mutate({
        mutation: gql`
        mutation customerLogout {
            customerLogout {
                status
                success
            }
        }`
      });
  } catch (error) {
    console.log('Error customerLogout:');
    console.log(error);
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
}
