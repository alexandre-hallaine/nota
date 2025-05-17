<script setup lang="ts">
const { user } = useUserSession()

const posts = ref(Array.from({length: 50},
  () => ({
    description: "Discover Nuxt Icon v1 - a modern, versatile, and customizable icon solution for your Nuxt projects.",
    date: '2024-11-25',
  })))
</script>

<template>
  <UPageSection>
    <UPageCTA :title="user.name" :description="user.bio" orientation="horizontal">
      <img :src="user.avatar_url"/>
    </UPageCTA>
    <UBlogPosts :posts="posts"/>
  </UPageSection>
</template>
