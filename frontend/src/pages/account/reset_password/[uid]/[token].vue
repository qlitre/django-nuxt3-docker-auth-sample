<script setup lang="ts">
import { Ref } from 'vue'

definePageMeta({
  layout: 'account-layout'
});

const isSuccess: Ref<boolean> = ref(false);
const serverError: Ref<string | null> = ref(null);
const newPassword: Ref<string> = ref('');
const confirmPassword: Ref<string> = ref('');

const submitResetPasswordConfirmForm = async () => {
  if (newPassword.value !== confirmPassword.value) return;
  const { params } = useRoute()
  const formData = {
    new_password: newPassword.value,
    confirm_password: confirmPassword.value,
  }
  const payload = {
    ...formData,
    ...params
  }
  const { data, pending, error, refresh } = await useAuthApi('reset_password_confirm/', 'POST', payload)
  if (error.value) {
    isSuccess.value = false;
    serverError.value = error.value.data.detail;
  }
  if (data.value) {
    isSuccess.value = true;
    serverError.value = null;
    setTimeout(() => {
      return navigateTo("/account/login", { replace: true });
    }, 5000);
  }
};
</script>

<template>
  <div class="mt-16">
    <h1 class="text-center font-weight-bold mb-5">Reset Password</h1>
    <v-form ref="form" @submit.prevent="submitResetPasswordConfirmForm">
      <v-text-field label="Password" name="password" v-model="newPassword" type="password"
        :rules="[v => !!v || 'Password is required']" placeholder="Enter your password..." required></v-text-field>
      <v-text-field label="Confirm Password" name="confirm_password" v-model="confirmPassword" type="password"
        :rules="[v => !!v || 'Confirm Password is required', v => v === newPassword || 'Passwords must match']"
        placeholder="Re-enter your password..." required></v-text-field>
      <div class="text-center mt-8">
        <v-btn color="primary" @click="submitResetPasswordConfirmForm">パスワード変更</v-btn>
      </div>
    </v-form>
    <v-alert v-if="serverError" type="error" dense class="mt-2" variant="tonal">
      {{ serverError }}
    </v-alert>
    <v-alert v-if="isSuccess" type="success" dense class="mt-2" variant="tonal">
      パスワードのリセットが完了しました。5秒後にログインページに移動します。
    </v-alert>
  </div>
</template>

<style lang="css" scoped></style>
