<script setup lang="ts">
const {user} = useUserSession()

const input = ref('')
function submit() {
  return $fetch('/api/notes', {
    method: 'POST',
    body: {
      content: input.value,
      userId: user.value!.id
    }
  })
}

const { data: notes } = useQuery({
  key: ['notes'],
  query: () => useRequestFetch()('/api/notes', { query: { userId: user.value!.id }}) as Promise<Note[]>
})
</script>

<template>
  <UPageSection>
    <UPageCTA
        v-if="user"
        :description="user.bio ?? ''"
        :links="[{label:'Github', to: user.html_url}]"
        :title="user.name"
        orientation="horizontal">
      <div class="flex justify-center">
        <NuxtImg
            :src="user.avatar_url"
            alt="avatar"
            class="rounded-lg"
            height="364"
            width="320"
        />
      </div>
    </UPageCTA>
    <UChatPrompt v-model="input" @submit="submit"/>
    <UBlogPosts :posts="notes?.map(note => ({description: note.content, date: note.createdAt}))"/>
  </UPageSection>
</template>
