<template>
  <div>
    <SfHeading
      v-e2e="'shipping-method-heading'"
      :level="3"
      title="Shipping Method"
      class="sf-heading--left sf-heading--no-underline title"
    />

    <ValidationObserver v-slot="{ handleSubmit }" tag="div">
      <form class="form" @submit.prevent="handleSubmit(ShippingMethodAction)">
        <SfRadio
          v-e2e="'shipping-method'"
          v-for="method in shippingMethods"
          :key="method.method"
          :label="$n(method.price, 'currency')"
          :value="method.method"
          :description="`${method.methodTitle} - ${method.methodDescription}`"
          :selected ="selectedMethod"
          name="shippingMethod"
          class="form__radio shipping"
          @change="selectMethod(method.method)"
        >
          <div class="shipping__label">
            {{ $n(method.price, 'currency') }}
          </div>

          <div class="shipping__description">
            <strong>{{ method.methodTitle }}</strong> - {{ method.methodDescription }}
          </div>
        </SfRadio>

        <SfButton
          v-e2e="'continue-to-billing'"
          :disabled="!selectedMethod"
          type="submit"
        >
          {{ $t('Continue to billing') }}
        </SfButton>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { SfHeading, SfButton, SfRadio } from '@storefront-ui/vue';
import { ValidationObserver } from 'vee-validate';
import { ref } from '@nuxtjs/composition-api';
import { useCart } from '@vue-storefront/bagisto';

export default {
  name: 'VsfShippingProvider',

  components: {
    SfHeading,
    SfButton,
    SfRadio,
    ValidationObserver
  },

  setup(props, { emit }) {
    const selectedMethod = ref(null);
    const { cart } = useCart();

    const selectMethod = method => selectedMethod.value = method;
    const shippingMethods = cart.value?.shippingAddress?.shippingRates;

    if (cart.value?.selectedShippingRate?.method) {
      selectMethod(cart.value?.selectedShippingRate?.method);
    }
    const handleForm = async () => {
      emit('submit', {
        selectedMethod,
        onComplete: () => {},
        onError: () => {}
      });
    };
    const ShippingMethodAction = async () => handleForm();

    return {
      shippingMethods: shippingMethods,
      selectedMethod,
      selectMethod,
      ShippingMethodAction
    };
  }
};
</script>

<style lang="scss" scoped>
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
</style>
