<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { CORE_BASE_URL } from '../../settings/siteSettings'

const errorText = ref('')
const data = ref({})
const userStore = useUserStore()
const authToken = userStore.user.auth_token
const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${authToken}`
};
const response = await fetch(CORE_BASE_URL + 'example/', { headers: headers });
if (!response.ok) {
    errorText.value = await response.text()
} else {
    data.value = await response.json()
}
</script>

<template>
    <v-container class="mt-4">
        <h1>with auth token request</h1>
        {{ data }}
        {{ errorText }}
    </v-container>
</template>