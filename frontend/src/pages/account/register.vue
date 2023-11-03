<script setup lang="ts">
import useAuthApi from "~/composables/useAuthApi";

definePageMeta({
  layout: 'account-layout'
});

const lastName = ref('')
const firstName = ref('')
const password = ref('');
const email = ref('');
const confirmPassword = ref('');
const serverError: Ref<string | null> = ref(null);
const isSuccess = ref(false)
const submitRegistrationForm = async () => {
  const formData = {
    last_name: lastName.value,
    first_name: firstName.value,
    email: email.value,
    password: password.value,
    confirm_password: confirmPassword.value,
  }
  const { data, pending, error, refresh } = await useAuthApi('registration/', 'POST', formData)
  if (error.value) {
    isSuccess.value = false;
    serverError.value = error.value.data.detail;
  }
  if (data.value) {
    isSuccess.value = true;
    serverError.value = null;
  }
};
</script>

<template>
  <div class="mt-16">
    <h1 class="text-center font-weight-bold mb-5">会員登録</h1>
    <v-form id="registrationForm" @submit.prevent="submitRegistrationForm">
      <v-text-field name="last_name" v-model="lastName" :rules="[v => !!v || '姓は必須です']" placeholder="姓"
        required></v-text-field>
      <v-text-field name="first_name" v-model="firstName" :rules="[v => !!v || '名は必須です']" placeholder="名"
        required></v-text-field>
      <v-text-field label="Email" name="email" v-model="email"
        :rules="[v => !!v || 'Email is required', v => /.+@.+/.test(v) || 'Email must be valid']"
        placeholder="Enter your email..." required></v-text-field>

      <v-text-field label="Password" name="password" v-model="password" type="password"
        :rules="[v => !!v || 'Password is required']" placeholder="Enter your password..." required></v-text-field>

      <v-text-field label="Confirm Password" name="confirm_password" v-model="confirmPassword" type="password"
        :rules="[v => !!v || 'Confirm Password is required', v => v === password || 'Passwords must match']"
        placeholder="Re-enter your password..." required></v-text-field>
      <div class="text-center mt-8">
        <v-btn color="primary" @click="submitRegistrationForm">Register</v-btn>
      </div>
    </v-form>
    <v-divider class="mt-4 mb-4"></v-divider>
    <i class="text-gray-700 text-sm">
      既にアカウントをお持ちですか？
      <NuxtLink to="/account/login">Login</NuxtLink>
    </i>
    <v-alert v-if="serverError" type="error" dense class="mt-2" variant="tonal">
      {{ serverError }}
    </v-alert>
    <v-alert v-if="isSuccess" type="success" dense class="mt-2" variant="tonal">
      ありがとうございます。Emailを確認してアカウントを有効化してください。
    </v-alert>
  </div>
</template>

