<template>
  <div class='shipping-addr' :address="address">
    <section>
      <p style="display:inline-flex">
        <SfButton
          class="sf-circle-icon--small sf-circle-icon sf-button"
          v-if="address.defaultAddress">
          <span class="sf-circle-icon__icon sf-icon">
            <SfIcon icon="check" size="1.25rem" />
          </span>
        </SfButton>
        <strong>{{ `${address.firstName} ${address.lastName}` }}</strong>
      </p>
      <p v-if="address.companyName"><strong>{{ 'Company Name' }}: </strong><i>{{ address.companyName }}</i></p>
      <p v-if="address.address1"><strong>{{ 'Address' }}: </strong><i>{{ `${address.address1}, ${address.address2}, ${address.city}, ${address.state}, ${address.country}` }}</i></p>
      <p v-if="address.postcode"><strong>{{ 'Postcode' }}: </strong><i>{{ address.postcode }}</i></p>
      <p v-if="address.phone"><strong>{{ 'Phone' }}: </strong><i>{{ address.phone }}</i></p>
      <p v-if="address.vatId"><strong>{{ 'Vat Id' }}: </strong><i>{{ address.vatId }}</i></p>
    </section>
  </div>
</template>

<script>

import { SfIcon, SfButton } from '@storefront-ui/vue';

export default {
  name: 'UserAddress',
  props: {
    address: {
      default: () => {},
      type: Object
    }
  },
  components: {
    SfIcon,
    SfButton
  }
};
</script>
