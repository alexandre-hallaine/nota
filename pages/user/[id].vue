<script setup lang="ts">
const {user} = useUserSession()

const posts = ref(Array.from({length: 50},
    () => ({
      description: "Discover Nuxt Icon v1 - a modern, versatile, and customizable icon solution for your Nuxt projects.",
      date: '2024-11-25',
    })))

const input = ref('')
function submit() {
  return $fetch('/api/notes', {
    method: 'POST',
    body: {
      content: input,
      userId: user.value!.id
    }
  })
}
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
    <UBlogPosts :posts="posts"/>
  </UPageSection>
</template>
