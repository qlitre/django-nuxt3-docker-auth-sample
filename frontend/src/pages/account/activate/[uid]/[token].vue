<script setup lang="ts">

definePageMeta({
  layout: 'account-layout'
});

const isSuccess: Ref<boolean> = ref(false);
const serverError: Ref<string | null> = ref(null);
const onAccountActivation = async () => {
  const { params } = useRoute()
  const { data, pending, error, refresh } = await useAuthApi('activate/', 'POST', params)
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
  <div class="text-center mt-16">
    <h1 class="text-center font-weight-bold mb-5">アカウント有効化</h1>
    <p class="mb-4">下のボタンを押して有効化してください</p>
    <v-btn @click="onAccountActivation" type="submit">
      有効化
    </v-btn>
  </div>

  <v-alert v-if="serverError" type="error" dense class="mt-2" variant="tonal">
    {{ serverError }}
  </v-alert>
  <v-alert v-if="isSuccess" type="success" dense class="mt-2" variant="tonal">
    アカウント登録が完了しました。5秒後にログインページに移動します。
  </v-alert>
</template>