<script setup lang="ts">
const {user: me} = useUserSession()
const route = useRoute()

const input = ref('')
const toast = useToast()
const queryCache = useQueryCache()

const { data: user } = useQuery({
  key: ['users', route.params.id],
  query: () => useRequestFetch()(`/api/users/${route.params.id}`) as Promise<User[]>
})

const { data: notes } = useQuery({
  key: ['notes', user.id],
  query: () => useRequestFetch()('/api/notes', { query: { userId: route.params.id } }) as Promise<Note[]>
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

const { mutate: follow } = useMutation({
  mutation: (id: number) => {
    return $fetch(`/api/users/follow/${id}`, {
      method: 'POST'
    })
  },

  async onSuccess([{followerId: id}]) {
    await queryCache.invalidateQueries({ key: ['users', id] })
  },
})

const { mutate: unfollow } = useMutation({
  mutation: (id: number) => {
    return $fetch(`/api/users/follow/${id}`, {
      method: 'DELETE'
    })
  },

  async onSuccess([{followerId: id}]) {
    await queryCache.invalidateQueries({ key: ['users', id] })
  },
})
</script>

<template>
  <UPageSection v-if="user">
    <UPageCTA
        :description="user.bio ?? ''"
        :title="user.name"
    >
      <template #links>
        <UButton v-if="user.followers.map(f => f.followerId).includes(me.id)" label="UnFollow" @click="() => unfollow(user.id)"/>
        <UButton v-else label="Follow" @click="() => follow(user.id)"/>
      </template>
    </UPageCTA>
    <UChatPrompt v-if="user.id == me.id"  v-model="input" :loading @submit="createNote(input)"/>
    <UBlogPosts v-if="notes" >
      <UBlogPost
        v-for="(note, index) in notes?.map(note1 => ({id: note1.id, description: note1.content, date: note1.createdAt}))"
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
