<script setup lang="ts">
const posts = ref(Array.from({length: 50},
  () => ({
    description: "Discover Nuxt Icon v1 - a modern, versatile, and customizable icon solution for your Nuxt projects.",
    date: '2024-11-25',
    authors: [
      {
        name: 'Anthony Fu',
        avatar: {
          src: 'https://github.com/antfu.png'
        },
        to: 'https://github.com/antfu',
      }
    ]
  })))

definePageMeta({
  middleware: 'auth'
})
</script>

<template>
  <UBlogPosts :posts="posts"/>
</template>
