<script setup lang="ts">

import { getErrorMessageArray } from '../../utils/getErrorMessageArray'
import { checkStatusOK } from '../../utils/checkStatusOK'

definePageMeta({
  layout: 'account-layout'
});

import { useAuthStore } from "@/stores/auth";
import { useUserStore } from "@/stores/user";
const authStore = useAuthStore();
const userStore = useUserStore();
const isError = ref(false)
const password = ref('');
const email = ref('');
const errorMessage = ref<string[]>([])

const submitLoginForm = async () => {

  const formData = {
    email: email.value,
    password: password.value,
  }
  const res = await useLogin(formData);
  if (checkStatusOK(res.status)) {
    const authToken = res.body.auth_token
    const userRes = await useGetUser(authToken)
    isError.value = false
    if (checkStatusOK(userRes.status)) {
      isError.value = false
      const user = userRes.body
      authStore.setAuthenticated(true)
      user.auth_token = authToken
      userStore.setUser(user)
      return navigateTo("/auth", { replace: true });
    } else {
      isError.value = true
      errorMessage.value = getErrorMessageArray(userRes.body)
    }
  } else {
    isError.value = true
    errorMessage.value = getErrorMessageArray(res.body)
  }
};

const requiredEmail = (v: string) => {
  return !!v || 'Eメールは必須です'
}

const validEmail = (v: string) => {
  return /.+@.+/.test(v) || '有効なEメールアドレスを入力してください';
}

</script>

<template>
  <div class="mt-16">
    <h1 class="text-center font-weight-bold mb-5">ログイン</h1>
    <v-form @submit.prevent="submitLoginForm" id="loginForm">
      <v-text-field v-model="email" label="Email" name="email" type="email" r equired :rules="[requiredEmail, validEmail]"
        placeholder="Email" class="mb-2"></v-text-field>

      <v-text-field v-model="password" label="Password" name="password" type="password" required
        :rules="[v => !!v || 'パスワードは必須です']" placeholder="Password"></v-text-field>

      <div class="text-center mt-8">
        <v-btn block type="submit" color="primary">Login</v-btn>
      </div>
    </v-form>
    <div class="text-center mt-4">
      <a color="blue" href="/account/reset_password_request">
        パスワードをお忘れですか？
      </a>
    </div>
    <v-divider class="my-4"></v-divider>

    <div class="text-center">
      <v-btn color="blue" to="/account/register">会員登録</v-btn>
    </div>
    <v-alert v-if="isError" type="error" dense class="mt-2" variant="tonal">
      <ul>
        <li v-for="message in errorMessage" :key="message">{{ message }}</li>
      </ul>
    </v-alert>
  </div>
</template>