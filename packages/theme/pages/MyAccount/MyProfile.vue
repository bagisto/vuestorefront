<template>
  <div class="notice">
    <SfLoader
      :class="{ 'loading--user': userLoading }"
      :loading="userLoading"
    >
    <div v-if="!formEditStatus">
      <SfHeading
        title="Account Details"
        class="account_details heading sf-heading--left"
        :level="3"
      />
      <SfDivider />
      <div class="notice">
        <SfProperty
          v-if="form.fullName"
          class="sf-property--value-in-middle sf-property my-profile-fullname"
          name="Name"
          :value="form.fullName"
          style="margin-top:10px;"/>
        <SfProperty
          v-if="form.email"
          class="sf-property--value-in-middle sf-property my-profile-email"
          name="Email"
          :value="form.email"
          style="margin-top:10px;"/>
        <SfProperty
          v-if="form.gender"
          class="sf-property--value-in-middle sf-property my-profile-gender"
          name="Gender"
          :value="form.gender"
          style="margin-top:10px;"/>
        <SfProperty
          v-if="form.dateOfBirth"
          class="sf-property--value-in-middle sf-property my-profile-gender"
          name="Date Of Birth"
          :value="form.dateOfBirth"
          style="margin-top:10px;"/>
        <SfProperty
          v-if="form.phone"
          class="sf-property--value-in-middle sf-property my-profile-mobile"
          name="Mobile"
          :value="form.phone"
          style="margin-top:10px;"/>
      </div>

      <SfButton
        class="form__button"
        @click="formEditStatus = true;"
        style="margin-top:15px;"
      >
        Edit Your Profile
      </SfButton>
    </div>
    <div v-if="formEditStatus">
      <SfTabs id="profile-tabs" :open-tab="1">
        <!-- Personal data update -->
        <SfTab title="Personal data">
          <p class="message">
            {{ $t('Feel free to edit') }}
          </p>
          <ValidationObserver v-slot="{ handleSubmit }" tag="div">
            <form class="form" @submit.prevent="handleSubmit(updatePersonalData)">
              <div class="row">
                <ValidationProvider v-slot="{ errors }" tag="div" rules="required|min:3" class="col-6">
                  <SfInput
                    v-model="form.firstName"
                    data-cy="my-profile-input_firstName"
                    name="firstName"
                    label="First Name"
                    :valid="!errors[0]"
                    class="form__element"
                    :error-message="errors[0]"
                  />
                </ValidationProvider>

                <ValidationProvider v-slot="{ errors }" tag="div" rules="required|min:3" class="col-6">
                  <SfInput
                    v-model="form.lastName"
                    data-cy="my-profile-input_lastName"
                    name="lasstName"
                    label="Last Name"
                    :valid="!errors[0]"
                    class="form__element"
                    :error-message="errors[0]"
                  />
                </ValidationProvider>

                <ValidationProvider v-slot="{ errors }" tag="div" rules="required|email" class="col-6">
                  <SfInput
                    v-model="form.email"
                    data-cy="my-profile-input_email"
                    name="email"
                    label="Email"
                    :valid="!errors[0]"
                    class="form__element"
                    :error-message="errors[0]"
                  />
                </ValidationProvider>

                <ValidationProvider v-slot="{ errors }" tag="div" rules="required" class="col-6">
                  <SfSelect
                    v-model="form.gender"
                    data-cy="my-profile-input_gender"
                    name="gender"
                    label="Gender"
                    :valid="!errors[0]"
                    class="form__select sf-select--underlined form__element"
                    :error-message="errors[0]"
                  >
                    <SfSelectOption v-for="(option, key) in genderOptions" :key="key" :value="option.value">
                      {{ option.value }}
                    </SfSelectOption>
                  </SfSelect>
                </ValidationProvider>

                <ValidationProvider v-slot="{ errors }" tag="div" class="col-6">
                  <SfInput
                    v-model="form.dateOfBirth"
                    data-cy="my-profile-input_dob"
                    name="date_of_birth"
                    label="Date Of Birth"
                    :valid="!errors[0]"
                    class="form__element"
                    :error-message="errors[0]"
                    placeholder="YYYY-MM-dd"
                  />
                </ValidationProvider>

                <ValidationProvider v-slot="{ errors }" tag="div" rules="numeric" class="col-6">
                  <SfInput
                    v-model="form.phone"
                    data-cy="my-profile-input_phone"
                    name="phone"
                    label="Phone"
                    :valid="!errors[0]"
                    class="form__element"
                    :error-message="errors[0]"
                  />
                </ValidationProvider>
              </div>

              <SfButton
                type="submit"
                data-cy="my-profile-btn_update"
                class="form__button">
                  Update Profile
              </SfButton>
            </form>
          </ValidationObserver>
          <p class="notice">
            {{ $t('Use your personal data') }}
            <a href="">{{ $t('Privacy Policy') }}</a>
          </p>
        </SfTab>

        <!-- Password reset -->
        <SfTab title="Password change">
          <p class="message">
            {{ $t('Change password your account') }}:<br />
            {{ $t('Your current email address is') }}
            <span class="message__label">example@email.com</span>
          </p>

          <ValidationObserver v-slot="{ handleSubmit }" tag="div">
            <form class="form" @submit.prevent="handleSubmit(updatePassword)">
              <div class="row">
                <ValidationProvider v-slot="{ errors }" tag="div" rules="required|min:6" class="col-6">
                  <SfInput
                    v-model="form.oldpassword"
                    data-cy="my-profile-input_oldpassword"
                    name="oldpassword"
                    type="password"
                    label="Old Password"
                    :valid="!errors[0]"
                    class="form__element"
                    :hasShowPassword=true
                    :error-message="errors[0]"
                  />
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }" tag="div" rules="required|min:6" vid="password">
                  <SfInput
                  v-model="form.password"
                  data-cy="my-profile-input_password"
                  type="password"
                  name="password"
                  label="New Password"
                  class="form__element"
                  :hasShowPassword=true
                  :valid="!errors[0]"
                  :error-message="errors[0]"
                  />
              </ValidationProvider>
              <ValidationProvider v-slot="{ errors }" tag="div" rules="required|confirmed:password">
                  <SfInput
                  v-model="form.confirmPassword"
                  data-cy="my-profile-input_confirmPassword"
                  type="password"
                  name="confirmPassword"
                  label="Confirm Password"
                  class="form__element"
                  :hasShowPassword=true
                  :valid="!errors[0]"
                  :error-message="errors[0]"
                  />
              </ValidationProvider>
              </div>

              <SfButton
                type="submit"
                data-cy="my-profile-btn_password"
                class="form__button">
                  Change Password
              </SfButton>
            </form>
          </ValidationObserver>
        </SfTab>
      </SfTabs>
    </div>
    </SfLoader>
  </div>
</template>

<script>
import { ref, computed } from '@nuxtjs/composition-api';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { email, required, numeric, min, confirmed } from 'vee-validate/dist/rules';
import { SfHeading, SfDivider, SfLoader, SfTabs, SfInput, SfSelect, SfButton, SfProperty } from '@storefront-ui/vue';
import { useUser, userGetters } from '@vue-storefront/bagisto';
import { onSSR } from '@vue-storefront/core';
import { useUiNotification} from '~/composables';

extend('email', {
  ...email,
  message: 'Invalid email'
});

extend('required', {
  ...required,
  message: 'This field is required'
});

extend('min', {
  ...min,
  message: 'The field should have at least {length} characters'
});

extend('numeric', {
  ...numeric,
  message: 'The field will accept numeric value only.'
});

extend('password', {
  validate: value => String(value).length >= 6 && String(value).match(/[A-Za-z]/gi) && String(value).match(/[0-9]/gi),
  message: 'Password must have at least 8 characters including one letter and a number'
});

extend('confirmed', {
  ...confirmed,
  message: 'Passwords don\'t match'
});

export default {
  name: 'PersonalDetails',

  components: {
    SfHeading,
    SfDivider,
    SfTabs,
    SfLoader,
    SfInput,
    SfSelect,
    SfButton,
    SfProperty,
    ValidationProvider,
    ValidationObserver
  },
  setup() {
    const formEditStatus = ref(false);
    const { user, load: loadUser, loading: userLoading, updateUser, changePassword } = useUser();
    const { send: sendNotification} = useUiNotification();

    const firstName = computed(() => userGetters.getFirstName(user.value));
    const lastName = computed(() => userGetters.getLastName(user.value));
    const fullName = computed(() => userGetters.getFullName(user.value));
    const email = computed(() => userGetters.getEmailAddress(user.value));
    const gender = computed(() => userGetters.getGender(user.value));
    const dateOfBirth = computed(() => userGetters.getDateOfBirth(user.value));
    const phone = computed(() => userGetters.getPhone(user.value));

    const resetProfileForm = () => ({
      firstName: firstName.value,
      lastName: lastName.value,
      fullName: fullName.value,
      email: email.value,
      gender: gender.value,
      dateOfBirth: dateOfBirth.value,
      phone: phone.value,
      oldpassword: '',
      password: '',
      confirmPassword: ''
    });
    const form = ref(resetProfileForm());

    const formHandler = (fn, reset) => async () => {
      try {
        if (reset) {
          await fn({ current: form.value.oldpassword, new: form.value.password }).then(() => {
            loadUser();
            sendNotification({
              key: 'password_changed',
              message: 'Password changed successfully.',
              type: 'success',
              title: 'Success!',
              icon: 'check'
            });
          });
          form.value.oldpassword = '';
          form.value.password = '';
          form.value.confirmPassword = '';
        } else {
          await fn({ user: form.value }).then(() => {
            sendNotification({
              key: 'profile_success',
              message: 'Customer profile updated successfully.',
              type: 'success',
              title: 'Success!',
              icon: 'check'
            });
          });
        }
        formEditStatus.value = false;
      } catch (e) {
        sendNotification({
          key: 'profile_failed',
          message: e.message,
          type: 'danger',
          title: 'Failed!'
        });
        return false;
      }
    };

    const updatePersonalData = async () => formHandler(updateUser, false)();
    const updatePassword = async () => formHandler(changePassword, true)();

    onSSR(async () => {
      await loadUser().then(()=> {
        form.value.fullName = `${user.value.firstName} ${user.value.lastName}`;
        form.value.firstName = user.value.firstName;
        form.value.lastName = user.value.lastName;
        form.value.email = user.value.email;
        form.value.gender = user.value.gender;
        form.value.dateOfBirth = user.value.dateOfBirth;
        form.value.phone = user.value.phone;
      });
    });

    return {
      user: user.value,
      userLoading,
      userGetters,
      formEditStatus,
      form: form.value,
      sendNotification,
      updatePersonalData,
      updatePassword
    };
  },

  data() {
    return {
      genderOptions: [
        {
          text: 'Other',
          value: 'Other'
        },
        {
          text: 'Male',
          value: 'Male'
        },
        {
          text: 'Female',
          value: 'Female'
        }
      ]
    };
  }
};
</script>

<style lang='scss' scoped>
.message,
.notice {
  font-family: var(--font-family--primary);
  line-height: 1.6;
}
.message {
  margin: 0 0 var(--spacer-xl) 0;
  font-size: var(--font-size--base);
  &__label {
    font-weight: 400;
  }
}
.notice {
  margin: var(--spacer-lg) 0 0 0;
  font-size: var(--font-size--sm);
}
.sf-select {
  padding-bottom: 0;
}
.sf-select__dropdown:focus-visible {
  height: 45px;
  padding-top: 10px;
  .sf-select {
    .sf-select__label {
      color: green;
      font-size: 10px;
    }
  }
}
.sf-select__dropdown {
  padding: 0 10px;height: 50px;border-bottom: 1px solid #333;margin-top: 10px;
}

</style>
