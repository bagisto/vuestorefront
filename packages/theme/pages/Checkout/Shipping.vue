<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <SfHeading
      v-e2e="'shipping-heading'"
      :level="3"
      title="Shipping Address"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <form @submit.prevent="handleSubmit(handleFormSubmit)">
      <div
        v-if="userId && addresses.length > 0 && !isNewAddress"
        class="form" >
        <div v-for="address in addresses" :key="address.id">
          <SfAddressPicker
            v-model="selectedShippingAddress"
            @change="handleShippingSelect(address)"
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
          @change="handleAddNewShipping"
          style="margin: 0 5px 5px 0;">
          <SfAddress name="newShippingAddress" style="min-height: 140px;">
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
            v-if="isNewAddress"
            class="sf-button color-secondary form__back-button"
            type="button"
            @click="backToAddressPanel"
          >
            {{ $t('Go back') }}
          </SfButton>
          <SfButton
            v-if="!isFormSubmitted"
            :disabled="addressLoading"
            class="form__action-button"
            type="submit"
          >
            {{ $t('Select shipping method') }}
          </SfButton>
        </div>
      </div>
      <VsfShippingProvider
        v-if="isFormSubmitted"
        @submit="saveShippingMethod"
      />
    </form>
  </ValidationObserver>
</template>

<script>
import {
  SfHeading,
  SfAddressPicker,
  SfLoader,
  SfIcon,
  SfInput,
  SfButton,
  SfSelect,
  SfCheckbox
} from '@storefront-ui/vue';
import { ref, useRouter, computed } from '@nuxtjs/composition-api';
import { onSSR } from '@vue-storefront/core';
import { useShipping, useUser, useCart, userGetters, useUserShipping, userShippingGetters, useShippingProvider } from '@vue-storefront/bagisto';
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
  name: 'Shipping',
  components: {
    SfHeading,
    SfAddressPicker,
    SfLoader,
    SfIcon,
    SfInput,
    SfButton,
    SfSelect,
    SfCheckbox,
    ValidationProvider,
    ValidationObserver,
    VsfShippingProvider: () => import('~/components/Checkout/VsfShippingProvider')
  },
  setup() {
    const router = useRouter();
    const countryList = ref([]);
    (countryState.countries).map(item => {
      countryList.value.push({
        name: item.country,
        code: item.code
      });
    });
    const isFormSubmitted = ref(false);
    const isNewAddress = ref(false);
    const selectedShippingAddress = ref(null);
    const { load: loadShipping, save } = useShipping();
    const { user, load: loadUser } = useUser();
    const { cart } = useCart();
    const { state, save: saveShipping } = useShippingProvider();
    const { shipping, load: loadUserShipping, loading: addressLoading } = useUserShipping();
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
      selectedShippingAddress.value = defaultAddress.value?.id;
    }

    const handleFormSubmit = async () => {
      await save({ shippingDetails: form.value, customQuery: {shippingAddressId: selectedShippingAddress.value }}).then(() => {
        if (cart.value?.shippingAddress) {
          loadUserShipping();
          sendNotification({
            key: 'shipping_address_saved',
            message: 'Shipping Address saved successfully.',
            type: 'success',
            title: 'Success!',
            icon: 'check'
          });
        } else {
          sendNotification({
            key: 'shipping_address_error',
            message: 'Some error occured in saving shipping address.',
            type: 'danger',
            title: 'Error!',
            icon: 'cross'
          });
          router.push('/');
        }
        isFormSubmitted.value = true;
      });
    };

    const handleShippingSelect = async (address) => {
      selectedShippingAddress.value = address.id;
      isFormSubmitted.value = false;
    };
    const handleAddNewShipping = async () => {
      selectedShippingAddress.value = 0;
      isNewAddress.value = true;
      isFormSubmitted.value = false;
    };
    const backToAddressPanel = async () => {
      isFormSubmitted.value = false;
      selectedShippingAddress.value = defaultAddress.value?.id;
      isNewAddress.value = false;
      form.value = {};
    };

    const saveShippingMethod = async ({ selectedMethod, onComplete, onError }) => {
      try {
        const data = await saveShipping({ shippingMethod: selectedMethod.value, customQuery: {actionType: 'shipping'} }).then(() => {
          if (state.value.length > 0) {
            sendNotification({
              key: 'shipping_method_saved',
              message: 'Success: Shipping method selected successfully.',
              type: 'success',
              title: 'Success!',
              icon: 'check'
            });
            router.push('/checkout/billing');
          } else {
            sendNotification({
              key: 'shipping_method_error',
              message: 'Warning: Error in saving Shipping method.',
              type: 'error',
              title: 'Error!',
              icon: 'close'
            });
          }
        });
        await onComplete(data);
      } catch (error) {
        onError(error);
      }
    };

    onSSR(async () => {
      await loadUser();
      await loadUserShipping();
      await loadShipping();
    });

    return {
      router,
      userId,
      isNewAddress,
      selectedShippingAddress,
      addresses,
      defaultAddress,
      addressLoading,
      handleShippingSelect,
      handleAddNewShipping,
      backToAddressPanel,
      isFormSubmitted,
      form,
      countries: countryList.value,
      handleFormSubmit,
      saveShippingMethod
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
.form {
  --button-width: 100%;
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
    --button-width: auto;
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
  &__action {
    @include for-desktop {
      flex: 0 0 100%;
      display: flex;
    }
  }
  &__action-button {
    &--secondary {
      @include for-desktop {
        order: -1;
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
      color:  var(--c-white);
    }
    @include for-desktop {
      margin: 0 var(--spacer-xl) 0 0;
    }
  }
}

.shipping {
  &__label {
    display: flex;
    justify-content: space-between;
  }
  &__description {
    --radio-description-margin: 0;
    --radio-description-font-size: var(--font-xs);
  }
}

.title {
  margin: var(--spacer-xl) 0 var(--spacer-base) 0;
}
.sf-radio__container {
  min-height: 154px;
}
</style>
