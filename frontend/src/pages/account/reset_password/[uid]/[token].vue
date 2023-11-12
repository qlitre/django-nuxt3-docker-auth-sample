<script setup lang="ts">

import { getErrorMessageArray } from '../../../../utils/getErrorMessageArray'

definePageMeta({
  layout: 'account-layout'
});

const errorMessage = ref<string[]>([])
const isSuccess = ref(false);
const isError = ref(false);
const { params } = useRoute()
const uid = params.uid.toString()
const token = params.token.toString()
const newPassword = ref('');
const reNewPassword = ref('');

const submitResetPasswordConfirmForm = async () => {
  if (newPassword.value !== reNewPassword.value) return;
  const formData = {
    uid: uid,
    token: token,
    new_password: newPassword.value,
    re_new_password: reNewPassword.value,
  }
  const res = await useResetPasswordConfirm(formData);
  if (res.error) {
    isSuccess.value = false;
    isError.value = true;
    errorMessage.value = getErrorMessageArray(res.error);
    return
  }
  isSuccess.value = true;
  isError.value = false;
  // 5秒後にログインページに移動
  setTimeout(() => {
    return navigateTo("/account/login", { replace: true });
  }, 5000);
};
</script>

<template>
  <div class="mt-16">
    <h1 class="text-center font-weight-bold mb-5">Reset Password</h1>
    <v-form ref="form" @submit.prevent="submitResetPasswordConfirmForm">
      <v-text-field label="Password" name="password" v-model="newPassword" type="password"
        :rules="[v => !!v || 'Password is required']" placeholder="Enter your password..." required></v-text-field>
      <v-text-field label="Confirm Password" name="confirm_password" v-model="reNewPassword" type="password"
        :rules="[v => !!v || 'Confirm Password is required', v => v === newPassword || 'Passwords must match']"
        placeholder="Re-enter your password..." required></v-text-field>
      <div class="text-center mt-8">
        <v-btn color="primary" @click="submitResetPasswordConfirmForm">パスワード変更</v-btn>
      </div>
    </v-form>
    <v-alert v-if="isError" type="error" dense class="mt-2" variant="tonal">
      <ul>
        <li v-for="message in errorMessage" :key="message">{{ message }}</li>
      </ul>
    </v-alert>
    <v-alert v-if="isSuccess" type="success" dense class="mt-2" variant="tonal">
      パスワードのリセットが完了しました。5秒後にログインページに移動します。
    </v-alert>
  </div>
</template>

<style lang="css" scoped></style>
