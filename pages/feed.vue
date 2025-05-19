<script setup lang="ts">
const {data: notes} = useFetch<{notes: Note, users: User}[]>('/api/notes');
</script>

<template>
  <UPageSection>
    <UBlogPosts
      v-if="notes"
      :posts="notes.map(({notes: note, users: user}) => ({
        description: note.content,
        date: note.createdAt,
        authors: [{
          name: user.name,
          avatar: { src: user.avatar },
          to: `/user/${user.id}`
        }]
      }))"/>
  </UPageSection>
</template>
