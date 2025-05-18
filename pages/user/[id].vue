<script setup lang="ts">
const {user: me} = useUserSession()
const route = useRoute()
const {data: user} = useFetch<User>(`/api/users/${route.params.id}`);

// const input = ref('')
// function submit() {
//   return $fetch('/api/notes', {
//     method: 'POST',
//     body: {
//       content: input.value,
//       userId: user.id
//     }
//   })
// }

const { data: notes } = useQuery({
  key: ['notes'],
  query: () => useRequestFetch()('/api/notes', { query: { userId: route.params.id } }) as Promise<Note[]>
})
</script>

<template>
  <UPageSection>
    <UPageCTA
        v-if="user"
        :description="user.bio ?? ''"
        :links="[{label:'Link', to: user.url, target: '_blank'}]"
        :title="user.name"
        orientation="horizontal"
        reverse>
        <NuxtImg
            :src="user.avatar"
            alt="avatar"
            class="rounded-lg"
            height="364"
            width="320"
        />
    </UPageCTA>
    <!--    <UChatPrompt v-model="input" @submit="submit"/>-->
    <UBlogPosts :posts="notes?.map(note => ({description: note.content, date: note.createdAt}))"/>
  </UPageSection>
</template>
