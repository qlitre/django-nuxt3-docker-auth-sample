<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import type { Ref } from 'vue';

const userStore = useUserStore();
const lastName = ref(userStore.user.last_name);
const firstName = ref(userStore.user.first_name);
const serverError: Ref<string | null> = ref(null);
const isSuccess = ref(false);
const submitProfileForm = async () => {
  const formData = {
    first_name: firstName.value,
    last_name: lastName.value,
  }
  const { data, pending, error, refresh } = await useAuthApi('user/', 'PATCH', formData)
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
  <v-container class="mt-32">
    <v-row class="justify-center">
      <v-col cols="12" md="6" lg="4">
        <h1 class="text-center font-weight-bold mb-5">プロフィール</h1>
        <v-form @submit.prevent="submitProfileForm">
          <v-text-field label="姓" v-model="lastName" :rules="[v => !!v || '姓は必須です']" placeholder="ユーザー名"
            required></v-text-field>
          <v-text-field label="名" v-model="firstName" :rules="[v => !!v || '名は必須です']" placeholder="ユーザー名"
            required></v-text-field>

          <v-btn type="submit" color="primary" block class="mt-8">
            更新
          </v-btn>
          <v-alert v-if="serverError" type="error" class="mt-2" dense variant="tonal">
            {{ serverError }}
          </v-alert>
          <v-alert v-if="isSuccess" type="success" class="mt-2" dense variant="tonal">
            プロフィールアップデートが完了しました。
          </v-alert>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

