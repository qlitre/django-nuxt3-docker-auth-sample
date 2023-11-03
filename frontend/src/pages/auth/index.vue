<script setup lang="ts">

import { useUserStore } from "@/stores/user";

definePageMeta({
    middleware: ["checkauth"],
});

const userStore = useUserStore();
const lastName = userStore.user.last_name
const firstName = userStore.user.first_name

</script>

<template>
    <v-container class="mt-4">
        <h1>ログインできました</h1>
        <p>{{ lastName }} {{ firstName }}</p>
    </v-container>
</template>
