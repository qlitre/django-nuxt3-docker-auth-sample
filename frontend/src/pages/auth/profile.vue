<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { getErrorMessageArray } from '../../utils/getErrorMessageArray'

const errorMessage = ref<string[]>([])

const userStore = useUserStore();
const lastName = ref(userStore.user.last_name);
const firstName = ref(userStore.user.first_name);
const isError = ref(false)
const isSuccess = ref(false);
const submitProfileForm = async () => {
  if (!lastName.value || !firstName.value) return
  const formData = {
    first_name: firstName.value,
    last_name: lastName.value,
  }
  const res = await useUpdateUserName(formData);
  if (res.error) {
    isSuccess.value = false;
    isError.value = true;
    errorMessage.value = getErrorMessageArray(res.error);

  } else {
    isSuccess.value = true;
    isError.value = false;
    if (!res.data) return
    userStore.setUser(res.data);
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
          <v-alert v-if="isError" type="error" dense class="mt-2" variant="tonal">
            <ul>
              <li v-for="message in errorMessage" :key="message">{{ message }}</li>
            </ul>
          </v-alert>
          <v-alert v-if="isSuccess" type="success" class="mt-2" dense variant="tonal">
            プロフィールアップデートが完了しました。
          </v-alert>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

