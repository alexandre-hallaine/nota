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

const { mutate: createNote, isLoading: loading } = useMutation({
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

const { mutate: deleteNote } = useMutation({
  mutation: (id: number) => {
    return $fetch(`/api/notes/${id}`, {
      method: 'DELETE'
    })
  },

  async onSuccess() {
    await queryCache.invalidateQueries({ key: ['notes', user.id] })
    toast.add({ title: `Note deleted.` })
  },
})
</script>

<template>
  <UPageSection v-if="user">
    <UPageCTA
        :description="user.bio ?? ''"
        :title="user.name"
    />
    <UChatPrompt v-if="user.id == me.id"  v-model="input" :loading @submit="createNote(input)"/>
    <UBlogPosts v-if="notes" >
      <UBlogPost
        v-for="(note, index) in notes?.map(({notes: note1}) => ({id: note1.id, description: note1.content, date: note1.createdAt}))"
        :key="index"
        v-bind="note"
      >
        <template #authors>
          <UButton icon="i-lucide-delete" label="Delete Note" @click="deleteNote(note.id)"/>
        </template>
      </UBlogPost>
    </UBlogPosts>
  </UPageSection>
</template>
