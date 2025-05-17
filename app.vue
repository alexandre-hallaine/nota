<script setup>
const { loggedIn, clear, openInPopup } = useUserSession()
</script>

<template>
  <UApp>
    <UHeader>
      <button v-if="loggedIn" @click="clear">Logout</button>
      <button v-else @click="openInPopup('/auth/github')">Login with GitHub</button>
    </UHeader>

    <NuxtPage />
  </UApp>
</template>
