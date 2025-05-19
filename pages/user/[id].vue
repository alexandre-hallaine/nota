<script setup lang="ts">
const {user: me} = useUserSession()
const route = useRoute()

const input = ref('')
const toast = useToast()
const queryCache = useQueryCache()

const {data: user} = useFetch<User>(`/api/users/${route.params.id}`);

const { data: notes } = useQuery({
  key: ['notes', user.id],
  query: () => useRequestFetch()('/api/notes', { query: { userId: route.params.id } }) as Promise<{notes: Note}[]>
})

const { mutate: create, isLoading: loading } = useMutation({
  mutation: (content: string) => {
    if (!content.trim()) throw new Error('Content is required')
    return $fetch('/api/notes', {
      method: 'POST',
      body: {
        content: input.value,
        userId: me.value.id
      }
    })
  },

  async onSuccess() {
    await queryCache.invalidateQueries({ key: ['notes', user.id] })
    toast.add({ title: `Note created.` })
  },

  onSettled() {
    input.value = ''
  },
})
</script>

<template>
  <UPageSection v-if="user">
    <UPageCTA
        :description="user.bio ?? ''"
        :links="[{label:'Link', to: user.url, target: '_blank'}]"
        :title="user.name"
        orientation="horizontal"
        reverse>
        <NuxtImg
            :src="user.avatar"
            alt="avatar"
            class="rounded-lg"
            height="300"
            width="300"
        />
    </UPageCTA>
    <UChatPrompt v-if="user.id == me.id"  v-model="input" :loading @submit="create(input)"/>
    <UBlogPosts v-if="notes" :posts="notes?.map(({notes: note}) => ({description: note.content, date: note.createdAt}))"/>
  </UPageSection>
</template>
