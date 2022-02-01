import {
  Context,
  useUserFactory,
  UseUserFactoryParams
} from '@vue-storefront/core';
import type { User } from '@vue-storefront/bagisto-api';
import type {
  UseUserUpdateParams as UpdateParams,
  UseUserRegisterParams as RegisterParams
} from '../types';
import { useCart } from '../useCart';

const params: UseUserFactoryParams<any, any, any> = {
  provide() {
    return {
      cart: useCart()
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context) => {
    console.log('Mocked: useUser.load');
    const customerToken = context.$bagisto.config.app.$cookies.get('vsf-bagCust-token');

    if (customerToken) {
      const loginResult = await context.$bagisto.api.getCustomer(customerToken);

      const customerDetail = loginResult?.data?.accountInfo?.customer;

      return customerDetail ? customerDetail : null;
    }

    context.cart.load();

    return null;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logOut: async (context: Context) => {
    console.log('Mocked: useUser.logOut');
    const token = context.$bagisto.config.app.$cookies.get('vsf-bagCust-token');

    const logoutResult = await context.$bagisto.api.customerLogout();

    if (logoutResult?.data?.customerLogout?.status && token) {
      context.$bagisto.config.app.$cookies.remove('vsf-bagCust-token');
      context?.cart.setCart(null);
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateUser: async (context: Context, { currentUser, updatedUserData }) => {
    console.log('Mocked: useUser.updateUser');
    const updateResult = await context.$bagisto.api.customerUpdate(updatedUserData);

    const userData = updateResult?.data?.updateAccount?.customer;

    if (userData) {

      await params.load(context);
    }

    return userData ? userData : null;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  register: async (context: Context, params) => {
    console.log('Mocked: useUser.register');
    const registerResult = await context.$bagisto.api.createCustomer(params);

    return {
      key: 'customer_register',
      success: registerResult?.data?.customerRegister,
      error: registerResult.data ? null : registerResult
    };
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logIn: async (context: Context, params) => {
    console.log('Mocked: useUser.logIn');
    const loginResult = await context.$bagisto.api.customerLogin(params);

    const loginResultResponse = {
      key: 'customer_login',
      customerToken: loginResult?.data?.customerLogin?.accessToken || null,
      success: loginResult?.data?.customerLogin,
      error: loginResult.data ? null : loginResult
    };

    if (loginResultResponse.customerToken !== null) {
      context.$bagisto.config.app.$cookies.set('vsf-bagCust-token', loginResultResponse.customerToken);
      context?.cart.load();
    }

    return loginResultResponse;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  changePassword: async (context: Context, { currentUser, currentPassword, newPassword }) => {
    console.log('Mocked: useUser.changePassword');
    const params = {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      gender: currentUser?.gender || 'Male',
      oldpassword: currentPassword,
      password: newPassword,
      confirmPassword: newPassword
    };

    const updatePasswordResult = await context.$bagisto.api.customerUpdate(params);

    return updatePasswordResult?.data?.updateAccount?.customer || null;
  }
};

export const useUser = useUserFactory<User, UpdateParams, RegisterParams>(params);
