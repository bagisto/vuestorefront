<template>
  <div class="form">
    <div v-if="error.addReview">
      <p>{{ error }}</p>
    </div>
    <ValidationObserver v-slot="{ handleSubmit, reset }" key="add-review" tag="div">
      <form class="form" @submit.prevent="handleSubmit(handleAddReview(reset))" autocomplete="off">
        <div class="row">
          <ValidationProvider>
              <div class="sf-input form__element">
                  <div class="ratings">
                      <span class="sf-search-bar__icon">
                          <div
                              v-for="i in [1, 2, 3, 4, 5]"
                              :key="`star-${i}`"
                              :class="['icon star-icon', i <= form.rating ? 'star-active-icon' : '']"
                              @click="form.rating = i"
                              >
                          </div>
                          <input
                              type="hidden"
                              name="rating"
                              v-model="form.rating"
                          />
                      </span>
                  </div>
              </div>
          </ValidationProvider>

          <ValidationProvider class="col-6" tag="div" rules="required|min:2" v-slot="{ errors }" v-if="!user">
              <SfInput
                  v-e2e="'review-name'"
                  v-model="form.name"
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                  name="name"
                  label="Your Name"
                  class="form__element"
                  required
              />
          </ValidationProvider>

          <ValidationProvider class="col-6" tag="div" rules="required|min:2" v-slot="{ errors }">
              <SfInput
                  v-e2e="'review-title'"
                  v-model="form.title"
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                  name="title"
                  label="Title"
                  class="form__element"
                  required
              />
          </ValidationProvider>

          <ValidationProvider class="col-6" tag="div" rules="required|min:3" v-slot="{ errors }">
              <SfTextarea
                  v-e2e="'review-comment'"
                  v-model="form.comment"
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                  name="comment"
                  label="Comment"
                  class="form__element"
                  required
                  :cols="50"
                  :rows="10"
              />
          </ValidationProvider>
        </div>
        <SfButton
          type="submit"
          class="sf-button--full-width form__button"
        >
          <div>{{ 'Add Review' }}</div>
        </SfButton>
      </form>
        <div v-if="error.review">
          {{ error.review }}
        </div>
    </ValidationObserver>
  </div>
</template>
<script>
import { ref, useRoute } from '@nuxtjs/composition-api';
import { SfImage, SfInput, SfButton, SfTextarea, SfLoader, SfAlert, SfBar } from '@storefront-ui/vue';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, min } from 'vee-validate/dist/rules';
import { useReview, useUser } from '@vue-storefront/bagisto';
import { onSSR } from '@vue-storefront/core';
import { useUiNotification } from '~/composables';

extend('required', {
  ...required,
  message: 'This field is required'
});

extend('min', {
  ...min,
  message: 'The field should have at least {length} characters',
});

export default {
  name: 'AddProductReview',

  components: {
    SfImage,
    SfInput,
    SfTextarea,
    SfButton,
    SfLoader,
    SfAlert,
    SfBar,
    ValidationProvider,
    ValidationObserver
  },

  setup() {
    const route = useRoute();
    const { params: { id } } = route.value;
    const reviewResponse = ref(false);
    const form = ref({
      productId: parseInt(id),
      rating: 1
    });
    const { send: sendNotification} = useUiNotification();
    const { reviews: createReview, loading: addReviewLoading, addReview, error } = useReview(`createReview-${id}`);
    const { user, load: loadUser, isAuthenticated } = useUser();

    const handleForm = async (reset) => {
      try {
        reviewResponse.value = true;
        await addReview(form.value).then(() => {
          if (typeof createReview.value === 'string') {
            sendNotification({
              key: 'add_review_sucess',
              message: createReview?.value,
              type: 'success',
              title: 'Review Success.',
              icon: 'check'
            });
            form.value.title = null;
            form.value.comment = null;
          }
        });
        reset();
      } catch {
        reviewResponse.value = false;
      }
    };

    const handleAddReview = async () => handleForm();

    onSSR(async () => {
      await loadUser();
    });

    return {
      user,
      form,
      error: error?.value || null,
      createReview: createReview?.value,
      addReviewLoading,
      isAuthenticated,
      reviewResponse,
      handleAddReview
    };
  }
};
</script>

<style lang='scss' scoped>
.form {
  margin-top: var(--spacer-sm);
  &__element {
    margin: 0 0 var(--spacer-xl) 0;
  }
}
.icon {
    display: inline-block;
    background-size: contain;
    width: 36px;
    height: 36px;
}
.star-icon {
    background-image: url("/icons/bag-icon/star-icon.svg");
    width: 36px;
    height: 36px;
}
.star-active-icon {
    background-image: url("/icons/bag-icon/star-active-icon.svg");
    width: 36px;
    height: 36px;
}
</style>
