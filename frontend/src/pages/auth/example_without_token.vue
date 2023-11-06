<script setup lang="ts">
import { CORE_BASE_URL } from '../../settings/siteSettings'

const headers = {
    'Content-Type': 'application/json',
};

const errorText = ref('')
const data = ref({})

const response = await fetch(CORE_BASE_URL + 'example/', { headers: headers });
if (!response.ok) {
    errorText.value = await response.text()
} else {
    data.value = await response.json()
}
</script>

<template>
    <v-container class="mt-4">
        <h1>without auth token request</h1>
        {{ data }}
        {{ errorText }}
    </v-container>
</template>
