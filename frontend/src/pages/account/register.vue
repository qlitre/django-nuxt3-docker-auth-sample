<script setup lang="ts">

import { getErrorMessageArray } from '../../utils/getErrorMessageArray'
import { requiredLastName, requiredFirstName, requiredEmail, validEmail, requiredPassword, requiredConfirmPassword, validPasswordMatch } from '~/utils/formRules';

definePageMeta({
  layout: 'account-layout'
});

const lastName = ref('')
const firstName = ref('')
const password = ref('');
const email = ref('');
const confirmPassword = ref('');
const isError = ref(false)
const isSuccess = ref(false)
const errorMessage = ref<string[]>([])
const submitRegistrationForm = async () => {
  const formData = {
    last_name: lastName.value,
    first_name: firstName.value,
    email: email.value,
    password: password.value,
    re_password: confirmPassword.value,
  }
  const res = await useUserCreate(formData)
  if (res.error) {
    isError.value = true
    isSuccess.value = false
    errorMessage.value = getErrorMessageArray(res.error)
    return
  }
  isSuccess.value = true
  isError.value = false
};

</script>

<template>
  <div class="mt-16">
    <h1 class="text-center font-weight-bold mb-5">会員登録</h1>
    <v-form id="registrationForm" @submit.prevent="submitRegistrationForm">
      <v-text-field name="last_name" v-model="lastName" :rules="[requiredLastName]" placeholder="姓" required />
      <v-text-field name="first_name" v-model="firstName" :rules="[requiredFirstName]" placeholder="名" required />
      <v-text-field name="email" v-model="email" :rules="[requiredEmail, validEmail]" placeholder="Email" required />
      <v-text-field name="password" v-model="password" type="password" :rules="[requiredPassword]" placeholder="パスワード"
        required />
      <v-text-field name="confirm_password" v-model="confirmPassword" type="password"
        :rules="[requiredConfirmPassword, validPasswordMatch(confirmPassword, password)]" placeholder="パスワード(確認)"
        required />
      <div class="text-center mt-8">
        <v-btn color="primary" @click="submitRegistrationForm">Register</v-btn>
      </div>
    </v-form>
    <v-divider class="mt-4 mb-4"></v-divider>
    <i class="text-gray-700 text-sm">
      既にアカウントをお持ちですか？
      <NuxtLink to="/account/login">Login</NuxtLink>
    </i>
    <v-alert v-if="isError" type="error" dense class="mt-2" variant="tonal">
      <ul>
        <li v-for="message in errorMessage" :key="message">{{ message }}</li>
      </ul>
    </v-alert>
    <v-alert v-if="isSuccess" type="success" dense class="mt-2" variant="tonal">
      ありがとうございます。Emailを確認してアカウントを有効化してください。
    </v-alert>
  </div>
</template>

