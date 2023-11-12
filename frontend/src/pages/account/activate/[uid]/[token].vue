<script setup lang="ts">

import { getErrorMessageArray } from '../../../../utils/getErrorMessageArray'
import { checkStatusOK } from '../../../../utils/checkStatusOK'

definePageMeta({
  layout: 'account-layout'
});

const errorMessage = ref<string[]>([])

const isSuccess = ref(false);
const isError = ref(false);
const onAccountActivation = async () => {
  const { params } = useRoute()
  const body = {
    uid: params.uid.toString(),
    token: params.token.toString(),
  }
  const res = await useUserActivate(body)
  if (res.error) {
    isError.value = true
    isSuccess.value = false
    errorMessage.value = getErrorMessageArray(res.error)
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
  <div class="text-center mt-16">
    <h1 class="text-center font-weight-bold mb-5">アカウント有効化</h1>
    <p class="mb-4">下のボタンを押して有効化してください</p>
    <v-btn @click="onAccountActivation" type="submit">
      有効化
    </v-btn>
  </div>

  <v-alert v-if="isError" type="error" dense class="mt-2" variant="tonal">
    <!--todo:有効期限が切れた場合の対応-->
    アカウントの有効化に失敗しました。
  </v-alert>
  <v-alert v-if="isSuccess" type="success" dense class="mt-2" variant="tonal">
    アカウント登録が完了しました。5秒後にログインページに移動します。
  </v-alert>
</template>