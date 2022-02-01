
import { gql } from '@apollo/client/core';
import { FilterCategoryListInput } from '../../types';

type Variables = {
    input?: FilterCategoryListInput;
  };

export async function getCategories(context, params) {
    const inputFilters = {
        status: params?.status || true,
        id: params?.id || null,
        slug: params?.slug || '',
        name: params?.name || '',
        position: params?.position || null
    };

    const variables: Variables = {
        input: inputFilters
    };

    try {
        return await context.client
        .query({
            query: gql`
            query categories ($input: FilterCategoryListInput) {
                categories(input: $input) {
                    paginatorInfo {
                        count
                        currentPage
                        lastPage
                        total
                    }
                    data {
                        id
                        name
                        description
                        slug
                        urlPath
                        imageUrl
                        metaTitle
                        metaDescription
                        metaKeywords
                        position
                        status
                        displayMode
                        parentId
                        breadcrumbs {
                            name
                            slug
                            urlPath
                        }
                        categoryProductMaxPrice
                        filterableAttributes {
                            id
                            adminName
                            code
                            type
                            position
                            options {
                                id
                                adminName
                                swatchValue
                                sortOrder
                                attributeId
                            }
                        }
                        translations {
                            id
                            name
                            description
                            localeId
                            locale
                        }
                        children {
                            id
                            name
                            description
                            slug
                            urlPath
                            imageUrl
                            position
                            status
                            productCount
                            children {
                                id
                                name
                                description
                                slug
                                urlPath
                                imageUrl
                                position
                                status
                                productCount
                            }
                        }
                        createdAt
                        updatedAt
                    }
                }
            }`,
            variables: variables
        });

    } catch (error) {
        console.log('Error getCategories:');
        console.log(error);
        throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
    }
}
