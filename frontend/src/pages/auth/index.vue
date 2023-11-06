<script setup lang="ts">

import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const lastName = userStore.user.last_name
const firstName = userStore.user.first_name
</script>

<template>
    <v-container class="mt-4">
        <h1>ログインできました</h1>
        <p>{{ lastName }} {{ firstName }}</p>
        <p>
            <a href="/auth/example_with_token">認証トークンあり</a>
        </p>
        <p>
            <a href="/auth/example_without_token">認証トークンなし</a>
        </p>
    </v-container>
</template>
