<script setup lang="ts">
const {data: notes} = useFetch<{notes: Note, users: User}>('/api/notes');
</script>

<template>
  <UPageSection>
    <UBlogPosts
      :posts="notes.map(({notes, users}) => ({
        description: notes.content,
        date: notes.createdAt,
        authors: [{
          name: users.name,
          avatar: { src: users.avatar },
          to: `/user/${users.id}`
        }]
      }))"/>
  </UPageSection>
</template>
