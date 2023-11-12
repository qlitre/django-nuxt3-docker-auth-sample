<script setup lang="ts">

import { getErrorMessageArray } from '../../utils/getErrorMessageArray'

definePageMeta({
  layout: 'account-layout'
});

const isSuccess = ref(false);
const isError = ref(false);
const email = ref('');
const errorMessage = ref<string[]>([])

const submitResetPasswordForm = async () => {
  const formData = {
    email: email.value,
  }
  const res = await useSendPasswordResetEmail(formData);
  if (res.error) {
    isSuccess.value = false;
    isError.value = true;
    errorMessage.value = getErrorMessageArray(res.error);
    return
  }
  isSuccess.value = true;
  isError.value = false;
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
      <v-alert v-if="isError" type="error" dense class="mt-2" variant="tonal">
        <ul>
          <li v-for="message in errorMessage" :key="message">{{ message }}</li>
        </ul>
      </v-alert>
      <v-alert v-if="isSuccess" type="success" class="mt-2" dense variant="tonal">
        パスワードリセット用のメールを送付しました。ご確認ください。
      </v-alert>
    </v-form>
  </div>
</template>
