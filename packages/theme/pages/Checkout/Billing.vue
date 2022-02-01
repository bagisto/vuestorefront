<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <SfHeading
      v-e2e="'billing-heading'"
      :level="3"
      title="Billing Address"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <form @submit.prevent="handleSubmit(handleFormSubmit)">
      <div
        v-if="userId && addresses.length > 0 && !isNewAddress"
        class="form" >
        <div v-for="address in addresses" :key="address.id">
          <SfAddressPicker
            v-model="selectedBillingAddress"
            @change="handleBillingSelect(address)"
            style="margin: 0 5px 5px 0;">
            <SfAddress :name="address.id">
              <span style="display:inline-flex;width:100%"><strong>{{`${address.firstName} ${address.lastName}`}}</strong> - {{address.companyName}}</span>
              <span style="display:inline-flex;width:100%"><strong>{{ 'Address:' }}</strong> {{address.address1}}<div v-if="address.address2">, {{address.address2}}</div></span>
              <span style="display:inline-flex;width:100%">{{address.city}}<div v-if="address.state">, {{address.state}}</div>, {{address.country}}, {{address.postcode}}</span>
              <span><strong>{{ 'Phone:' }}</strong> {{address.phone}}</span>
            </SfAddress>
          </SfAddressPicker>
        </div>
        <SfAddressPicker
          @change="handleAddNewBilling"
          style="margin: 0 5px 5px 0;">
          <SfAddress name="newBillingAddress" style="min-height: 140px;">
            <span style="width:100%; text-align:center;padding: 20px 0;">
              <SfIcon
                icon="plus"
                color="blue-primary"
                size="xs"
                style="width: auto;" />
                <div><strong>{{'Add New Address'}}</strong></div>
            </span>
          </SfAddress>
        </SfAddressPicker>
      </div>
      <div class="form" v-else>
        <ValidationProvider
          name="firstName"
          rules="required|min:3"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            v-e2e="'shipping-firstName'"
            v-model="form.firstName"
            label="First name"
            name="firstName"
            class="form__element form__element--half"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>

        <ValidationProvider
          name="lastName"
          rules="required|min:3"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            v-e2e="'shipping-lastName'"
            v-model="form.lastName"
            label="Last name"
            name="lastName"
            class="form__element form__element--half form__element--half-even"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>

        <ValidationProvider
          name="companyName"
          rules="required|email"
          v-slot="{ errors }"
          slim>
          <SfInput
            v-e2e="'shipping-email'"
            v-model="form.email"
            label="Email"
            name="email"
            required
            class="form__element form__element--half"
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>

        <ValidationProvider
          name="companyName"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            v-e2e="'shipping-comapnyName'"
            v-model="form.companyName"
            label="Company name"
            name="companyName"
            class="form__element form__element--half form__element--half-even"
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>

        <ValidationProvider
          name="address1"
          rules="required"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            v-e2e="'shipping-address1'"
            v-model="form.address1"
            label="Street name"
            name="address1"
            class="form__element form__element--half"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>

        <ValidationProvider
          name="address2"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            v-e2e="'shipping-address2'"
            v-model="form.address2"
            label="House/Apartment number"
            name="address2"
            class="form__element form__element--half form__element--half-even"
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>

        <ValidationProvider
          name="country"
          rules="required|min:2"
          v-slot="{ errors }"
          slim
        >
          <SfSelect
            v-e2e="'shipping-country'"
            v-model="form.country"
            label="Country"
            name="country"
            class="form__element form__element--half form__select sf-select--underlined"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
            @input="getStateOfCountry(form.country)"
          >
            <SfSelectOption
              v-for="countryOption in countries"
              :key="countryOption.code"
              :value="countryOption.code"
            >
              {{ countryOption.name }}
            </SfSelectOption>
          </SfSelect>
        </ValidationProvider>

        <ValidationProvider
          name="state"
          rules="required|min:2"
          v-slot="{ errors }"
          slim
        >
          <SfSelect
            v-if="states.length > 0"
            v-model="form.state"
            v-e2e="'shipping-state'"
            class="form__element form__element--half form__element--half-even form__select sf-select--underlined"
            label="State/Province"
            name="state"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
            :selected="form.state"
          >
            <SfSelectOption
              v-for="(name, index) in states"
              :key="index"
              :value="name"
            >
              {{ name }}
            </SfSelectOption>
          </SfSelect>
          <SfInput
            v-else
            v-e2e="'shipping-state'"
            v-model="form.state"
            label="State/Province"
            name="state"
            class="form__element form__element--half form__element--half-even"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>

        <ValidationProvider
          name="city"
          rules="required"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            v-e2e="'shipping-city'"
            v-model="form.city"
            label="City"
            name="city"
            class="form__element form__element--half"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>

        <ValidationProvider
          name="postcode"
          rules="required|min:2"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            v-e2e="'shipping-postcode'"
            v-model="form.postcode"
            label="Zip-code"
            name="postcode"
            class="form__element form__element--half form__element--half-even"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>

        <ValidationProvider
          name="phone"
          rules="required|digits:9"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            v-e2e="'shipping-phone'"
            v-model="form.phone"
            label="Phone number"
            name="phone"
            class="form__element form__element--half"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>

        <SfCheckbox
          v-if="userId"
          v-e2e="'shipping-save-address'"
          v-model="form.saveAsAddress"
          name="saveAsAddress"
          label="Save this address"
          class="form__element checkbox"
        />
      </div>
      <div class="form">
        <div class="form__action">
          <SfButton
            class="sf-button color-secondary form__back-button"
            type="button"
            @click="router.push(localePath({ name: 'shipping' }))"
          >
            {{ $t('Go back') }}
          </SfButton>
          <SfButton
            v-if="!isFormSubmitted"
            v-e2e="'continue-to-payment'"
            class="form__action-button"
            type="submit"
          >
            {{ $t('Continue to payment') }}
          </SfButton>
        </div>
      </div>
      <VsfPaymentProvider
        v-if="isFormSubmitted"
        @submit="savePaymentMethod"
      />
    </form>
  </ValidationObserver>
</template>

<script>
import {
  SfHeading,
  SfIcon,
  SfInput,
  SfButton,
  SfSelect,
  SfRadio,
  SfCheckbox,
  SfAddressPicker,
  SfLoader
} from '@storefront-ui/vue';
import { ref, computed, useRouter } from '@nuxtjs/composition-api';
import { onSSR } from '@vue-storefront/core';
import { useBilling, useUser, userGetters, useUserShipping, userShippingGetters, useShippingProvider, useCart } from '@vue-storefront/bagisto';
import { required, min, digits, email } from 'vee-validate/dist/rules';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import countryState from '~/static/country-state';
import { useUiNotification} from '~/composables';

extend('required', {
  ...required,
  message: 'This field is required'
});
extend('min', {
  ...min,
  message: 'The field should have at least {length} characters'
});
extend('digits', {
  ...digits,
  message: 'Please provide a valid phone number'
});
extend('email', {
  ...email,
  message: 'Invalid email'
});

export default {
  name: 'Billing',
  components: {
    SfHeading,
    SfLoader,
    SfIcon,
    SfInput,
    SfButton,
    SfSelect,
    SfRadio,
    SfCheckbox,
    SfAddressPicker,
    ValidationProvider,
    ValidationObserver,
    VsfPaymentProvider: () => import('~/components/Checkout/VsfPaymentProvider')
  },
  setup() {
    const router = useRouter();
    const { load: loadBilling, save } = useBilling();
    const countryList = ref([]);
    (countryState.countries).map(item => {
      countryList.value.push({
        name: item.country,
        code: item.code
      });
    });
    const isFormSubmitted = ref(false);
    const isNewAddress = ref(false);
    const selectedBillingAddress = ref(null);
    const { user, load: loadUser } = useUser();
    const { save: savePayment } = useShippingProvider();
    const { cart } = useCart();
    const { shipping, load: loadCartShipping, loading: addressLoading } = useUserShipping();
    const { send: sendNotification} = useUiNotification();

    const userId = computed(() => userGetters.getUserId(user.value));
    const addresses = computed(() => userShippingGetters.getAddresses(shipping.value, {addressType: ['customer']}));
    const defaultAddress = computed(() => userShippingGetters.getDefault(shipping.value));

    const form = ref({
      companyName: '',
      firstName: '',
      lastName: '',
      email: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      country: '',
      postcode: '',
      phone: '',
      saveAsAddress: false
    });

    if (defaultAddress.value?.id) {
      selectedBillingAddress.value = defaultAddress.value?.id;
    }

    const handleFormSubmit = async () => {
      await save({ params: {billingAddressId: selectedBillingAddress.value }, billingDetails: form.value}).then(() => {
        if (cart.value?.billingAddress) {
          sendNotification({
            key: 'billing_address_saved',
            message: 'Billing Address saved successfully.',
            type: 'success',
            title: 'Success!',
            icon: 'check'
          });
        } else {
          sendNotification({
            key: 'billing_address_error',
            message: 'Some error occured in saving billing address.',
            type: 'danger',
            title: 'Error!',
            icon: 'cross'
          });
          router.push('/');
        }
        isFormSubmitted.value = true;
      });
    };

    const handleBillingSelect = async (address) => {
      selectedBillingAddress.value = address.id;
      isFormSubmitted.value = false;
    };
    const handleAddNewBilling = async () => {
      selectedBillingAddress.value = 0;
      isNewAddress.value = true;
      isFormSubmitted.value = false;
    };
    const backToAddressPanel = async () => {
      isFormSubmitted.value = false;
      selectedBillingAddress.value = defaultAddress.value?.id;
      isNewAddress.value = false;
      form.value = {};
    };

    const savePaymentMethod = async ({ selectedMethod, onComplete, onError }) => {
      try {
        const data = await savePayment({ shippingMethod: selectedMethod.value, customQuery: {actionType: 'payment'} }).then(() => {
          if (cart.value?.payment?.method === selectedMethod.value) {
            sendNotification({
              key: 'payment_method_saved',
              message: 'Success: Payment method selected successfully.',
              type: 'success',
              title: 'Success!',
              icon: 'check'
            });
            router.push('/checkout/summary');
          } else {
            sendNotification({
              key: 'payment_method_error',
              message: 'Warning: Error in saving Payment method.',
              type: 'error',
              title: 'Error!',
              icon: 'close'
            });
            isFormSubmitted.value = false;
          }
        });
        await onComplete(data);
      } catch (error) {
        onError(error);
      }
    };

    onSSR(async () => {
      await loadUser();
      await loadCartShipping();
      await loadBilling();
    });

    return {
      router,
      userId,
      isNewAddress,
      selectedBillingAddress,
      addresses,
      defaultAddress,
      addressLoading,
      handleBillingSelect,
      handleAddNewBilling,
      backToAddressPanel,
      isFormSubmitted,
      form,
      countries: countryList.value,
      handleFormSubmit,
      savePaymentMethod
    };
  },
  data() {
    return {
      states: []
    };
  },
  mounted() {
    this.getStateOfCountry(this.form?.country);
  },
  methods: {
    getStateOfCountry(country) {
      const defaultCountry = country ? country : '';
      const selectedCountry = (countryState.countries).find(item => item.code === defaultCountry);
      this.states = selectedCountry ? selectedCountry.states : [];
      this.form.state = '';
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  margin: var(--spacer-xl) 0 var(--spacer-base) 0;
}
.form {
  &__select {
    display: flex;
    align-items: center;
    --select-option-font-size: var(--font-size--lg);
    ::v-deep .sf-select__dropdown {
      font-size: var(--font-size--lg);
      margin: 0;
      color: var(--c-text);
      font-family: var(--font-family--secondary);
      font-weight: var(--font-weight--normal);
    }
  }
  @include for-desktop {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  &__element {
    margin: 0 0 var(--spacer-xl) 0;
    @include for-desktop {
      flex: 0 0 100%;
    }
    &--half {
      @include for-desktop {
        flex: 1 1 50%;
      }
      &-even {
        @include for-desktop {
          padding: 0 0 0 var(--spacer-xl);
        }
      }
    }
  }
  &__group {
    display: flex;
    align-items: center;
  }
  &__action {
    @include for-desktop {
      flex: 0 0 100%;
      display: flex;
    }
  }
  &__action-button, &__back-button {
    --button-width: 100%;
    @include for-desktop {
      --button-width: auto;
    }
  }
  &__action-button {
    &--secondary {
      @include for-desktop {
        order: -1;
        --button-margin: 0;
        text-align: left;
      }
    }
     &--add-address {
      width: 100%;
      margin: 0;
      @include for-desktop {
        margin: 0 0 var(--spacer-lg) 0;
        width: auto;
      }
    }
  }
  &__back-button {
    margin: var(--spacer-xl) 0 var(--spacer-sm);
    &:hover {
      color:  white;
    }
    @include for-desktop {
      margin: 0 var(--spacer-xl) 0 0;
    }
  }
  &__back-button {
    margin: 0 0 var(--spacer-sm) 0;
    @include for-desktop {
      margin: 0 var(--spacer-xl) 0 0;
    }
  }
}
.payment-methods {
  @include for-desktop {
    display: flex;
    padding: var(--spacer-lg) 0;
    border: 1px solid var(--c-light);
    border-width: 1px 0;
  }
}
.payment-method {
  --radio-container-align-items: center;
  --ratio-content-margin: 0 0 0 var(--spacer-base);
  --radio-label-font-size: var(--font-base);
  --radio-background: transparent;
  white-space: nowrap;
  border: 1px solid var(--c-light);
  border-width: 1px 0 0 0;
  &:last-child {
    border-width: 1px 0;
  }
  --radio-background: transparent;
  @include for-desktop {
    border: 0;
    --radio-border-radius: 4px;
  }
}
</style>
