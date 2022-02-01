import {
  Context,
  useUserShippingFactory,
  UseUserShippingFactoryParams
} from '@vue-storefront/core';
import type {
  UserShippingAddress as Address,
  UserShippingAddressItem as AddressItem
} from '@vue-storefront/bagisto-api';
import { useUser } from '../useUser';

const params: UseUserShippingFactoryParams<Address, AddressItem> = {
  provide() {
    return {
      user: useUser(),
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addAddress: async (context: Context, params) => {
    console.log('Mocked: useUserShipping.addAddress');
    const addressResult = await context.$bagisto.api.createAddress(params?.address);

    return addressResult?.data?.addresses || {};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  deleteAddress: async (context: Context, params) => {
    console.log('Mocked: useUserShipping.deleteAddress');
    const addressResult = await context.$bagisto.api.removeAddress(params?.address);

    return addressResult?.data?.addresses || {};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateAddress: async (context: Context, params) => {
    console.log('Mocked: useUserShipping.updateAddress');
    const addressResult = await context.$bagisto.api.updateAddress(params?.address);

    return addressResult?.data?.addresses || {};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, params) => {
    console.log('Mocked: useUserShipping.load');
    if (context.user?.user.value) {
      const addressesResult = await context.$bagisto.api.getAddresses(params);

      return addressesResult?.data?.addresses || {};
    }
    return {};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setDefaultAddress: async (context: Context, params) => {
    console.log('Mocked: useUserShipping.setDefaultAddress');
    return {};
  }
};

export const useUserShipping = useUserShippingFactory<Address, AddressItem>(params);
