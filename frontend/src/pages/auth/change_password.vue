<script setup lang="ts">

import { getErrorMessageArray } from '../../utils/getErrorMessageArray'
import { checkStatusOK } from '../../utils/checkStatusOK'

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
  if (checkStatusOK(res.status)) {
    isSuccess.value = true;
    isError.value = false;
  } else {
    isError.value = true;
    isSuccess.value = false;
    errorMessage.value = getErrorMessageArray(res.body);
  }
};
</script>

<template>
  <v-container class="mt-32">
    <v-row class="justify-center">
      <v-col cols="12" md="6" lg="4">
        <h1 class="text-center font-weight-bold mb-5">パスワード変更</h1>
        <v-form @submit.prevent="submitChangePasswordForm" id="changepasswordform">
          <v-text-field label="現在のパスワード" v-model="oldPassword" type="password"
            :rules="[v => !!v || 'Password is required']" placeholder="現在のパスワード" required></v-text-field>
          <v-text-field label="新しいパスワード" v-model="newPassword" type="password"
            :rules="[v => !!v || 'Confirm Password is required']" placeholder="新しいパスワード" required></v-text-field>
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