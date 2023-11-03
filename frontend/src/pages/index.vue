<script setup lang="ts">
definePageMeta({
  layout: false,
});
</script>

<template>
  <v-container>
    <v-spacer />
    <h1 class="text-center mt-12">Django Nuxt3 Auth</h1>
    <v-row class="mt-12" align="center" justify="center">
      <v-col cols="auto">
        <v-btn elevation="4" size="x-large" href="/account/login" color="primary">ログイン</v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn elevation="4" size="x-large" href="/account/register" color="primary">会員登録</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>