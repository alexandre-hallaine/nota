<script setup>
const { loggedIn, clear, user } = useUserSession()

const items = [
  {
    label: 'Home',
    to: '/app',
  }
]

watch(loggedIn, () => {
  if (!loggedIn.value) {
    navigateTo('/')
  }
})
</script>

<template>
  <UPage>
    <UHeader title="Nota">
      <UNavigationMenu :items/>

      <template #right>
        <UDropdownMenu
          :items="[
            {
              label: 'Logout',
              onSelect: clear,
            }
          ]">
          <UButton :label="user.name" :avatar=" { src: user.avatar_url }" variant="outline"/>
        </UDropdownMenu>
      </template>

      <template #body>
        <UNavigationMenu :items orientation="vertical"/>
      </template>
    </UHeader>

    <UPageSection>
      <slot/>
    </UPageSection>
  </UPage>
</template>
