<script setup lang="ts">

import { getErrorMessageArray } from '../../utils/getErrorMessageArray'
import { requiredPassword, requiredConfirmPassword } from '~/utils/formRules';

const errorMessage = ref<string[]>([])

const isError = ref(false);
const isSuccess = ref(false);
const oldPassword = ref('');
const newPassword = ref('');

const submitChangePasswordForm = async () => {
  const formData = {
    current_password: oldPassword.value,
    new_password: newPassword.value,
  }
  const res = await useSetPassword(formData);
  if (res.error) {
    isError.value = true;
    isSuccess.value = false;
    errorMessage.value = getErrorMessageArray(res.error);
    return
  }
  isSuccess.value = true;
  isError.value = false;
};
</script>

<template>
  <v-container class="mt-32">
    <v-row class="justify-center">
      <v-col cols="12" md="6" lg="4">
        <h1 class="text-center font-weight-bold mb-5">パスワード変更</h1>
        <v-form @submit.prevent="submitChangePasswordForm" id="changepasswordform">
          <v-text-field v-model="oldPassword" type="password" :rules="[requiredPassword]" placeholder="現在のパスワード"
            required />
          <v-text-field v-model="newPassword" type="password" :rules="[requiredConfirmPassword]" placeholder="新しいパスワード"
            required />
          <v-btn type="submit" color="primary" block class="mt-8" :disabled="!oldPassword || !newPassword">
            送信
          </v-btn>
          <v-alert v-if="isError" type="error" dense class="mt-2" variant="tonal">
            <ul>
              <li v-for="message in errorMessage" :key="message">{{ message }}</li>
            </ul>
          </v-alert>
          <v-alert v-if="isSuccess" type="success" class="mt-2" dense variant="tonal">
            パスワードの変更が完了しました。
          </v-alert>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>