<script setup>
const {loggedIn, clear, user} = useUserSession()

const items = [
  {
    label: 'Feed',
    to: '/feed',
  },
  {
    label: 'Me',
    to: `/user/${user.value.id}`,
  }
]

watch(loggedIn, () => {
  if (!loggedIn.value)
    navigateTo('/')
})
</script>

<template>
  <UPage>
    <UHeader title="Nota">
      <UNavigationMenu :items/>

      <template #right>
        <UDropdownMenu
            :items="[ { label: 'Logout', onSelect: clear } ]">
          <UButton :avatar=" { src: user.avatar_url }" :label="user.name" variant="outline"/>
        </UDropdownMenu>
      </template>

      <template #body>
        <UNavigationMenu :items orientation="vertical"/>
      </template>
    </UHeader>

    <slot/>
  </UPage>
</template>
