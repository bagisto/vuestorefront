
import { gql } from "@apollo/client/core";

export async function getShippingMethods(context, params) {

  try {
    return await context.client
      .query({
        query: gql`
        query shippingMethods {
            shippingMethods {
                success
                cartTotal
                cartCount
                shippingMethods {
                    title
                    methods {
                        code
                        label
                        price
                        formattedPrice
                        basePrice
                        formattedBasePrice
                    }
                }
                paymentMethods {
                    method
                    method_title
                    description
                    sort
                }
                jumpToSection
            }
        }`
      });
  } catch (error) {
    console.log('Error getShippingMethods:');
    console.log(error);
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
}
