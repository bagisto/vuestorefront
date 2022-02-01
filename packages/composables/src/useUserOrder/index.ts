import {
  Context,
  useUserOrderFactory,
  UseUserOrderFactoryParams
} from '@vue-storefront/core';
import type {
  CustomerOrder,
  useUserOrderSearchParams as SearchParams
} from '../types';
import { useUser } from '../useUser';

const params: UseUserOrderFactoryParams<CustomerOrder, SearchParams> = {
  provide() {
    return useUser();
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchOrders: async (context: Context, params) => {
    console.log('Mocked: searchOrders');
    params.input = {};
    if (context.user.value?.id) {
      params.input.customerId = parseInt(context.user.value?.id);
    }
    const orderListResults = await context.$bagisto.api.getOrderList(params);

    return {
      results: orderListResults?.data?.ordersList?.data || null,
      pagination: orderListResults?.data?.ordersList?.paginatorInfo || null,
      total: orderListResults?.data?.ordersList?.paginatorInfo?.total || 0
    };
  }
};

export const useUserOrder = useUserOrderFactory<CustomerOrder, SearchParams>(params);
