
import { gql } from '@apollo/client/core';
import { AddItemToCartInput } from '../../types';

type Variables = {
    input: AddItemToCartInput;
  };

export async function addToCart(context, params) {
  const inputFilters = {
    productId: params?.product?.id,
    quantity: params?.quantity
  };

  const variables: Variables = {
    input: inputFilters
  };

  if (params?.customQuery?.selectedConfigurableOption && params?.customQuery?.superAttribute) {
    variables.input.selectedConfigurableOption = params?.customQuery?.selectedConfigurableOption;
    variables.input.superAttribute = params?.customQuery?.superAttribute;
  }

  try {
    return await context.client
      .mutate({
        mutation: gql`
        mutation addItemToCart ($input: AddItemToCartInput!) {
          addItemToCart(input: $input) {
            status
            message
            cart {
                id
                customerEmail
                customerFirstName
                customerLastName
                shippingMethod
                couponCode
                isGift
                itemsCount
                itemsQty
                exchangeRate
                globalCurrencyCode
                baseCurrencyCode
                channelCurrencyCode
                cartCurrencyCode
                grandTotal
                baseGrandTotal
                subTotal
                baseSubTotal
                taxTotal
                baseTaxTotal
                discountAmount
                baseDiscountAmount
                checkoutMethod
                isGuest
                isActive
                conversionTime
                customerId
                channelId
                appliedCartRuleIds
                createdAt
                updatedAt
                selectedShippingRate {
                    id
                    carrier
                    carrierTitle
                    method
                    methodTitle
                    methodDescription
                    price
                    basePrice
                    discountAmount
                    baseDiscountAmount
                    cartAddressId
                }
                shippingAddress {
                    id
                    firstName
                    lastName
                    addressType
                    customerId
                    cartId
                    orderId
                    firstName
                    lastName
                    gender
                    companyName
                    address1
                    address2
                    postcode
                    city
                    state
                    country
                    email
                    phone
                    defaultAddress
                    vatId
                    additional
                    createdAt
                    updatedAt
                    shippingRates {
                        id
                        carrier
                        carrierTitle
                        method
                        methodTitle
                        methodDescription
                        price
                        basePrice
                        discountAmount
                        baseDiscountAmount
                        cartAddressId
                        createdAt
                        updatedAt
                    }
                }
                billingAddress {
                    id
                    firstName
                    lastName
                    addressType
                    customerId
                    cartId
                    orderId
                    firstName
                    lastName
                    gender
                    companyName
                    address1
                    address2
                    postcode
                    city
                    state
                    country
                    email
                    phone
                    defaultAddress
                    vatId
                    additional
                    createdAt
                    updatedAt
                }
                payment {
                    id
                    method
                    methodTitle
                    cartId
                    createdAt
                    updatedAt
                }
                items {
                    id
                    quantity
                    sku
                    type
                    name
                    couponCode
                    weight
                    totalWeight
                    baseTotalWeight
                    price
                    basePrice
                    total
                    baseTotal
                    taxPercent
                    taxAmount
                    baseTaxAmount
                    discountPercent
                    discountAmount
                    baseDiscountAmount
                    additional
                    parentId
                    productId
                    cartId
                    taxCategoryId
                    customPrice
                    appliedCartRuleIds
                    createdAt
                    updatedAt
                    product {
                        id
                        type
                        attributeFamilyId
                        sku
                        parentId
                        productFlats {
                            id
                            sku
                            name
                            description
                            shortDescription
                            urlKey
                            new
                            featured
                            status
                            visibleIndividually
                            thumbnail
                            price
                            cost
                            specialPrice
                            specialPriceFrom
                            specialPriceTo
                            weight
                            color
                            colorLabel
                            size
                            sizeLabel
                            locale
                            channel
                            productId
                            parentId
                            minPrice
                            maxPrice
                            metaTitle
                            metaKeywords
                            metaDescription
                            width
                            height
                            depth
                            variants {
                                id
                                sku
                                name
                                description
                                shortDescription
                                urlKey
                                new
                                featured
                                status
                                visibleIndividually
                                thumbnail
                                price
                                locale
                                channel
                                productId
                                parentId
                            }
                            parent {
                                id
                                sku
                                name
                                description
                                shortDescription
                                urlKey
                                new
                                featured
                                status
                                visibleIndividually
                                thumbnail
                                price
                                cost
                                specialPrice
                                specialPriceFrom
                                specialPriceTo
                                weight
                            }
                            createdAt
                            updatedAt
                        }
                        variants {
                            id
                            type
                            attributeFamilyId
                            sku
                            parentId
                        }
                        parent {
                            id
                            type
                            attributeFamilyId
                            sku
                            parentId
                        }
                        attributeFamily {
                            id
                            code
                            name
                            status
                            isUserDefined
                        }
                        attributeValues {
                            id
                            productId
                            attributeId
                            locale
                            channel
                            textValue
                            booleanValue
                            integerValue
                            floatValue
                            dateTimeValue
                            dateValue
                            jsonValue
                            attribute {
                                id
                                code
                                adminName
                                type
                            }
                        }
                        superAttributes {
                            id
                            code
                            adminName
                            type
                            position
                        }
                        cacheBaseImage {
                            smallImageUrl
                            mediumImageUrl
                            largeImageUrl
                            originalImageUrl
                        }
                        priceHtml {
                            id
                            type
                            html
                            regular
                            special
                        }
                        orderedInventories {
                            id
                            qty
                            productId
                            channelId
                        }
                        reviews {
                            id
                            title
                            rating
                            comment
                            status
                            productId
                            customerId
                            createdAt
                            updatedAt
                        }
                    }
                }
            }
          }
        }`,
        variables: variables
      });
  } catch (error) {
    console.log('Error addToCart:');
    console.log(error);
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
}
