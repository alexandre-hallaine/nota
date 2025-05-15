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
</script>

<template>
  <UApp>
    <UPage>
      <template #left>
        <UPageAside>
          <UPageCard
            title="Tailwind CSS"
            description="Nuxt UI v3 integrates with latest Tailwind CSS v4, bringing significant improvements."
            icon="i-simple-icons-tailwindcss"
            orientation="horizontal"
          >
          </UPageCard>
        </UPageAside>
      </template>

      <UPageSection>
        <UBlogPosts :posts="posts" />
      </UPageSection>
    </UPage>
  </UApp>
</template>
