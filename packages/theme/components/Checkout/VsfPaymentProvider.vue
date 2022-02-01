<template>
  <div>
    <SfHeading
      v-e2e="'payment-method-heading'"
      :level="3"
      title="Payment Method"
      class="sf-heading--left sf-heading--no-underline title"
    />

    <ValidationObserver v-slot="{ handleSubmit }" tag="div">
      <form class="form" @submit.prevent="handleSubmit(PaymentMethodAction)">
        <div>
          <SfRadio
            v-e2e="'payment-method'"
            v-for="payment in paymentMethods"
            :key="payment.value"
            :label="payment.label"
            :value="payment.value"
            :description="payment.description"
            :selected ="selectedMethod"
            name="paymentMethod"
            class="form__radio payment"
            @change="selectMethod(payment.value)"
          >
            <div class="payment__label">
              {{ payment.label }}
            </div>
          </SfRadio>
        </div>

        <SfButton
          v-e2e="'continue-to-payment'"
          :disabled="!selectedMethod"
          type="submit"
        >
          {{ $t('Continue to payment') }}
        </SfButton>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>

import { SfHeading, SfButton, SfRadio } from '@storefront-ui/vue';
import {
  ref,
  onMounted,
  computed
} from '@nuxtjs/composition-api';
import { useShippingProvider } from '@vue-storefront/bagisto';
import { ValidationObserver } from 'vee-validate';

export default {
  name: 'VsfPaymentProvider',

  components: {
    SfHeading,
    SfButton,
    SfRadio,
    ValidationObserver
  },

  setup(props, { emit }) {
    const selectedMethod = ref(null);
    const { load, state } = useShippingProvider();

    onMounted(async () => {
      await load({customQuery: {type: 'payment'}});
    });

    const selectMethod = method => selectedMethod.value = method;
    const paymentMethods = computed(() => (Array.isArray(state.value) ? state.value.map((p) => ({
      label: p.method_title,
      description: p.description,
      value: p.method
    })) : []));

    const handleForm = async () => {
      emit('submit', {
        selectedMethod,
        onComplete: () => {},
        onError: () => {}
      });
    };
    const PaymentMethodAction = async () => handleForm();

    return {
      paymentMethods: paymentMethods,
      selectedMethod,
      selectMethod,
      PaymentMethodAction
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
