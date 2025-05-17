<script setup>
const { loggedIn, clear, openInPopup } = useUserSession()
</script>

<template>
  <UPageSection>
    <UCard>
      <template #header>
        <div class="flex justify-center">
          <UButtonGroup v-if="loggedIn">
            <UButton label="Open the app" to="/app"/>
            <UButton label="Logout" @click="clear"/>
          </UButtonGroup>
          <UButton v-else icon="i-lucide-github" label="Login with GitHub" @click="openInPopup('/api/auth/github')"/>
        </div>
      </template>
      <slot/>
    </UCard>
  </UPageSection>
</template>
