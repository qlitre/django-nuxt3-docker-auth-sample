<script setup lang="ts">

import { getErrorMessageArray } from '../../utils/getErrorMessageArray'
import { requiredEmail, validEmail, requiredPassword } from '~/utils/formRules';

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
  if (res.error) {
    isError.value = true
    errorMessage.value = getErrorMessageArray(res.error)
    return
  }
  const authToken = res.data?.auth_token
  if (!authToken) return
  const userRes = await useGetUser(authToken)
  isError.value = false
  if (userRes.error) {
    isError.value = true
    errorMessage.value = getErrorMessageArray(userRes.error)
    return
  } else {
    isError.value = false
    const user = userRes.data
    if (!user) return
    authStore.setAuthenticated(true)
    user.auth_token = authToken
    userStore.setUser(user)
    return navigateTo("/auth", { replace: true });
  }
};

</script>

<template>
  <div class="mt-16">
    <h1 class="text-center font-weight-bold mb-5">ログイン</h1>
    <v-form @submit.prevent="submitLoginForm" id="loginForm">
      <v-text-field v-model="email" name="email" type="email" required :rules="[requiredEmail, validEmail]"
        placeholder="Email" class="mb-2" />
      <v-text-field v-model="password" name="password" type="password" required :rules="[requiredPassword]"
        placeholder="パスワード" />
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