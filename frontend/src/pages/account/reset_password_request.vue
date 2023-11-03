<script setup lang="ts">
import { Ref } from 'vue'

definePageMeta({
  layout: 'account-layout'
});

const isSuccess: Ref<boolean> = ref(false);
const serverError: Ref<boolean | null> = ref(false);
const email: Ref<string> = ref('');
const submitResetPasswordForm = async () => {
  const formData = {
    email: email.value,
  }
  const { data, pending, error, refresh } = await useAuthApi('reset_password/', 'POST', formData)
  if (error.value) {
    isSuccess.value = false;
    serverError.value = error.value.data;
  }
  if (data.value) {
    isSuccess.value = true;
    serverError.value = null;
  }
};
</script>

<template>
  <div class="mt-16">
    <h1 class="text-center font-weight-bold mb-5">Reset Password</h1>
    <v-form @submit.prevent="submitResetPasswordForm">
      <v-text-field v-model="email" label="Email" name="email" type="email" required
        :rules="[val => !!val || 'Required', val => /.+@.+/.test(val) || 'Invalid email']"
        placeholder="Enter your email..."></v-text-field>
      <v-btn type="submit" color="primary" block class="mt-8">
        Send Email
      </v-btn>
      <v-alert v-if="serverError" type="error" class="mt-2" dense variant="tonal">
        Unable to Send Email
      </v-alert>
      <v-alert v-if="isSuccess" type="success" class="mt-2" dense variant="tonal">
        Password reset email sent! Kindly check your email.
      </v-alert>
    </v-form>
  </div>
</template>
