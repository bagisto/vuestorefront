<template>
  <div class="customer_address-form">
    <b>Please implement vendor-specific ShippingAddressForm component in the 'components/MyAccount' directory</b>
    <br/>

    <ValidationObserver v-slot="{ handleSubmit }" tag="div">
      <form class="form" @submit.prevent="handleSubmit(AddressFormAction)">
        <div class="row">
          <ValidationProvider v-slot="{ errors }" tag="div" class="col-6">
            <SfInput
              v-model="form.companyName"
              data-cy="my-address-input_companyName"
              name="companyName"
              label="Company Name"
              :valid="!errors[0]"
              class="form__element"
              :error-message="errors[0]"
            />
          </ValidationProvider>

          <ValidationProvider v-slot="{ errors }" tag="div" rules="required|min:3" class="col-6">
            <SfInput
              v-model="form.firstName"
              data-cy="my-address-input_firstName"
              name="firstName"
              label="First Name"
              :valid="!errors[0]"
              class="form__element"
              required
              :error-message="errors[0]"
            />
          </ValidationProvider>

          <ValidationProvider v-slot="{ errors }" tag="div" rules="required|min:3" class="col-6">
            <SfInput
              v-model="form.lastName"
              data-cy="my-address-input_lastName"
              name="lastName"
              label="Last Name"
              :valid="!errors[0]"
              class="form__element"
              required
              :error-message="errors[0]"
            />
          </ValidationProvider>

          <ValidationProvider v-slot="{ errors }" tag="div" class="col-6">
            <SfInput
              v-model="form.vatId"
              data-cy="my-address-input_vatId"
              name="vatId"
              label="Vat Id"
              :valid="!errors[0]"
              class="form__element"
              :error-message="errors[0]"
            />
          </ValidationProvider>

          <ValidationProvider v-slot="{ errors }" tag="div" rules="required" class="col-6">
            <SfInput
              v-model="form.address1"
              data-cy="my-address-input_address1"
              name="address1"
              label="Address1"
              :valid="!errors[0]"
              class="form__element"
              required
              :error-message="errors[0]"
            />
          </ValidationProvider>

          <ValidationProvider v-slot="{ errors }" tag="div" class="col-6">
            <SfInput
              v-model="form.address2"
              data-cy="my-address-input_address2"
              name="address2"
              label="Address2"
              :valid="!errors[0]"
              class="form__element"
              :error-message="errors[0]"
            />
          </ValidationProvider>

          <ValidationProvider v-slot="{ errors }" tag="div" :rules="`required|oneOf:${countryList.map(c => c.code).join(',')}`" class="col-6">
            <SfSelect
              v-model="form.country"
              data-cy="my-address-select_country"
              name="country"
              label="Country"
              :valid="!errors[0]"
              class="form__select sf-select--underlined form__element"
              :error-message="errors[0]"
              required
              @input="getStateOfCountry(form.country)"
            >
              <SfSelectOption
                v-for="country in countryList"
                :key="country.code"
                :value="country.code"
              >
                {{ country.name }}
              </SfSelectOption>
            </SfSelect>
          </ValidationProvider>

          <ValidationProvider v-if="states.length > 0" v-slot="{ errors }"  rules="required" class="col-6">
            <SfSelect
              v-model="form.state"
              data-cy="billing-details-select_state"
              class="form__select sf-select--underlined form__element"
              name="state"
              label="State/Province"
              :valid="!errors[0]"
              :error-message="errors[0]"
              required
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
          </ValidationProvider>

          <ValidationProvider v-slot="{ errors }" tag="div" rules="required|min:3" class="col-6">
            <SfInput
              v-model="form.city"
              data-cy="my-address-input_city"
              name="city"
              label="City"
              :valid="!errors[0]"
              class="form__element"
              required
              :error-message="errors[0]"
            />
          </ValidationProvider>

          <ValidationProvider v-slot="{ errors }" tag="div" rules="required|min:4" class="col-6">
            <SfInput
              v-model="form.postcode"
              data-cy="my-address-input_postcode"
              name="postcode"
              label="Postal/Zip Code"
              :valid="!errors[0]"
              class="form__element"
              required
              :error-message="errors[0]"
            />
          </ValidationProvider>

          <ValidationProvider v-slot="{ errors }" tag="div" class="col-6" rules="required|numeric">
            <SfInput
              v-model="form.phone"
              data-cy="my-address-input_phone"
              name="phone"
              label="Phone"
              required
              :valid="!errors[0]"
              class="form__element"
              :error-message="errors[0]"
            />
          </ValidationProvider>

          <ValidationProvider v-slot="{ errors }" tag="div" class="col-6">
            <SfCheckbox
              v-model="form.defaultAddress"
              data-cy="my-address-input_defaultAddress"
              name="defaultAddress"
              label="Default Address"
              :valid="!errors[0]"
              class="form__element"
              :error-message="errors[0]"
            />
          </ValidationProvider>
        </div>

        <SfButton
          type="submit"
          data-cy="my-address-btn_save"
          class="form__button">
            {{ isNew ? 'Save Address' : 'Update Address' }}
        </SfButton>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ref, computed } from '@nuxtjs/composition-api';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, oneOf, min, numeric } from 'vee-validate/dist/rules';
import { SfInput, SfSelect, SfButton, SfCheckbox } from '@storefront-ui/vue';
import { useUser, userGetters, userShippingGetters } from '@vue-storefront/bagisto';
import { onSSR } from '@vue-storefront/core';
import countryState from '~/static/country-state';

extend('required', {
  ...required,
  message: 'This field is required'
});

extend('min', {
  ...min,
  message: 'The field should have at least {length} characters'
});

extend('oneOf', {
  ...oneOf,
  message: 'Invalid country'
});

extend('numeric', {
  ...numeric,
  message: 'The field will accept numeric value only.'
});

export default {
  name: 'AddressForm',

  components: {
    SfInput,
    SfSelect,
    SfButton,
    SfCheckbox,
    ValidationProvider,
    ValidationObserver
  },

  props: {
    address: {
      type: Object,
      required: false
    },
    isNew: {
      type: Boolean,
      required: true
    }
  },

  setup(props, { emit }) {
    const countryList = ref([]);
    (countryState.countries).map(item => {
      countryList.value.push({
        name: item.country,
        code: item.code
      });
    });

    const { user, load: loadUser } = useUser();

    const companyName = computed(() => userShippingGetters.getCompanyName(props.address));
    let firstName = computed(() => userGetters.getFirstName(user.value));
    let lastName = computed(() => userGetters.getLastName(user.value));
    if (props?.address) {
      firstName = computed(() => userShippingGetters.getFirstName(props.address));
      lastName = computed(() => userShippingGetters.getLastName(props.address));
    }
    const vatId = computed(() => userShippingGetters.getTaxNumber(props.address));
    const address1 = computed(() => userShippingGetters.getStreetName(props.address));
    const address2 = computed(() => userShippingGetters.getStreetNumber(props.address));
    const country = computed(() => userShippingGetters.getCountry(props.address));
    const state = computed(() => userShippingGetters.getProvince(props.address));
    const city = computed(() => userShippingGetters.getCity(props.address));
    const postcode = computed(() => userShippingGetters.getPostCode(props.address));
    const phone = computed(() => userShippingGetters.getPhone(props.address));
    const defaultAddress = computed(() => userShippingGetters.isDefault(props.address));

    const resetAddressForm = () => ({
      id: props?.address?.id || null,
      companyName: companyName.value,
      firstName: firstName.value,
      lastName: lastName.value,
      vatId: vatId.value,
      address1: address1.value,
      address2: address2.value,
      country: country.value,
      state: state.value,
      city: city.value,
      postcode: postcode.value,
      phone: phone.value,
      defaultAddress: defaultAddress.value
    });
    const form = ref(resetAddressForm());

    const handleForm = async () => {
      emit('submit', {
        form,
        onComplete: () => {},
        onError: () => {}
      });
    };
    const AddressFormAction = async () => handleForm();

    onSSR(async () => {
      await loadUser();
    });

    return {
      form,
      countryList: countryList.value,
      AddressFormAction
    };
  },
  data() {
    return {
      states: []
    };
  },
  mounted() {
    this.getStateOfCountry(this.activeAddress?.country);
  },
  methods: {
    getStateOfCountry(country) {
      const selectedCountry = (countryState.countries).find(item => item.code === country);
      this.states = selectedCountry ? selectedCountry.states : [];
    }
  }
};
</script>
