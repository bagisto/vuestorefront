<template>
  <transition name="fade">
    <SfTabs
      v-if="edittingAddress"
      key="edit-address"
      :open-tab="1"
      class="tab-orphan"
    >
      <SfTab
        :title="isNewAddress ? 'Add the address' : 'Update the address'">
        <p class="message">
          {{ $t('Contact details updated') }}
        </p>

        <AddressForm
          :address="activeAddress"
          :isNew="isNewAddress"
          @submit="saveAddress" />
      </SfTab>
    </SfTabs>

    <SfTabs
      v-else
      :open-tab="1"
      key="address-list"
      class="tab-orphan">
      <SfTab title="Shipping details">
        <p class="message">
          {{ $t('Manage shipping addresses') }}
        </p>

        <SfLoader
          :class="{ 'loading--address': addressLoading }"
          :loading="addressLoading"
        >
          <transition-group tag="div" name="fade" class="shipping-list">
            <div
              v-for="address in addresses"
              :key="userShippingGetters.getId(address)"
              class="shipping">
              <div class="shipping__content">
                <div class="shipping__address">
                  <UserAddress :address="address" />
                </div>
              </div>
              <div class="shipping__actions">
                <SfIcon
                  icon="cross"
                  color="gray"
                  size="14px"
                  role="button"
                  class="smartphone-only"
                  @click="removeAddress(address)"
                />
                <SfButton
                  @click="changeAddress(address)">
                  {{ $t('Change') }}
                </SfButton>

                <SfButton
                  class="color-light shipping__button-delete desktop-only"
                  @click="removeAddress(address)">
                  {{ $t('Delete') }}
                </SfButton>
              </div>
            </div>
          </transition-group>
        </SfLoader>
        <SfButton
          class="action-button"
          @click="changeAddress()">
          {{ $t('Add new address') }}
        </SfButton>
      </SfTab>
    </SfTabs>
  </transition>
</template>
<script>
import {
  SfTabs,
  SfButton,
  SfIcon,
  SfLoader
} from '@storefront-ui/vue';
import UserAddress from '~/components/UserAddress';
import AddressForm from '~/components/MyAccount/AddressForm';
import { useUserShipping, userShippingGetters } from '@vue-storefront/bagisto';
import { ref, computed } from '@nuxtjs/composition-api';
import { onSSR } from '@vue-storefront/core';
import { useUiNotification} from '~/composables';

export default {
  name: 'AddressDetails',
  components: {
    SfTabs,
    SfButton,
    SfIcon,
    SfLoader,
    UserAddress,
    AddressForm
  },
  setup() {
    const { shipping, load: loadUserShipping, loading: addressLoading, addAddress, deleteAddress, updateAddress } = useUserShipping();
    const edittingAddress = ref(false);
    const activeAddress = ref(undefined);
    const isNewAddress = computed(() => !activeAddress.value);
    const { send: sendNotification} = useUiNotification();

    const addresses = computed(() => userShippingGetters.getAddresses(shipping.value, {addressType: ['customer']}));

    const changeAddress = (address = undefined) => {
      activeAddress.value = address;
      edittingAddress.value = true;
    };

    const removeAddress = async (address) => {
      await deleteAddress({ address }).then(() => {
        loadUserShipping();
        sendNotification({
          key: 'address_deleted',
          message: 'Address deleted successfully',
          type: 'success',
          title: 'Success!',
          icon: 'check'
        });
      });
      edittingAddress.value = false;
      activeAddress.value = undefined;
    };

    const saveAddress = async ({ form, onComplete, onError }) => {
      try {
        const actionMethod = isNewAddress.value ? addAddress : updateAddress;
        let notificationMsg = 'Address updated successfully.';
        if (isNewAddress.value) {
          notificationMsg = 'Address saved successfully.';
        }

        const data = await actionMethod({ address: form }).then(() => {
          loadUserShipping();
          sendNotification({
            key: 'address_saved',
            message: notificationMsg,
            type: 'success',
            title: 'Success!',
            icon: 'check'
          });
        });
        edittingAddress.value = false;
        activeAddress.value = undefined;
        await onComplete(data);
      } catch (error) {
        onError(error);
      }
    };

    onSSR(async () => {
      await loadUserShipping();
    });

    return {
      addressLoading,
      changeAddress,
      updateAddress,
      removeAddress,
      saveAddress,
      userShippingGetters,
      addresses,
      edittingAddress,
      activeAddress,
      isNewAddress
    };
  }
};
</script>

<style lang='scss' scoped>

.message {
  font-family: var(--font-family--primary);
  line-height: 1.6;
  font-size: var(--font-size--base);
  margin: 0 0 var(--spacer-base);
}
.shipping-list {
  margin-bottom: var(--spacer-base);
}
.shipping {
  display: flex;
  padding: var(--spacer-xl) 0;
  border-top: 1px solid var(--c-light);

  &:last-child {
    border-bottom: 1px solid var(--c-light);
  }
  &__content {
    flex: 1;
    color: var(--c-text);
    font-size: var(--font-size--base);
    font-weight: 300;
    line-height: 1.6;
  }
  &__actions {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    @include for-desktop {
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
    }
  }
  &__button-delete {
    color: var(--c-link);
    @include for-desktop {
      margin-left: var(--spacer-base);
    }
  }
  &__address {
    margin: 0;
    p {
      margin: 0;
    }
  }
  &__client-name {
    font-size: var(--font-size--base);
    font-weight: 500;
  }
}
.action-button {
  width: 100%;
  @include for-desktop {
    width: auto;
  }
}
.tab-orphan {
  @include for-mobile {
    ::v-deep .sf-tabs {
      &__title {
        display: none;
      }

      &__content {
        border: 0;
        padding: 0;
      }
    }
  }
}
</style>
