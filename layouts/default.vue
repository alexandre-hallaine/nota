<script setup lang="ts">
const {loggedIn, clear, user} = useUserSession()

watch(loggedIn, () => {
  if (!loggedIn.value)
    navigateTo('/')
})

const items = [
  {label: 'Feed', to: '/feed'},
  {label: 'Me', to: `/user/${user.value.id}`}
]

const {data: me} = useQuery({
  key: ['user'],
  query: () => useRequestFetch()(`/api/users/${user.value.id}`) as Promise<User>
})
</script>

<template>
  <UPage>
    <UHeader title="Nota">
      <UNavigationMenu :items/>

      <template #right>
        <UDropdownMenu
            :items="[ { label: 'Settings', to: '/user/settings' },{ label: 'Logout', onSelect: clear } ]">
          <UButton :label="me.name" variant="outline"/>
        </UDropdownMenu>
      </template>

      <template #body>
        <UNavigationMenu :items orientation="vertical"/>
      </template>
    </UHeader>

    <slot/>
  </UPage>
</template>
