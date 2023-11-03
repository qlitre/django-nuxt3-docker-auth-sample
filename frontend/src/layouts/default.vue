<script setup lang="ts">

const drawer = ref(false);

</script>

<template>
  <div>
    <v-app class="bg-blue-grey-lighten-5">
      <!-- sidebar-->
      <v-navigation-drawer v-model="drawer" color="white">
        <template v-slot:append>
          <div class="mb-2">
            <UserMenu />
          </div>
        </template>
      </v-navigation-drawer>
      <!-- header -->
      <v-app-bar>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-app-bar-title>Django Nuxt3 Auth</v-app-bar-title>
        <v-spacer></v-spacer>
        <v-btn href="/auth">Home</v-btn>
      </v-app-bar>
      <v-main>
        <slot></slot>
      </v-main>
    </v-app>
  </div>
</template>