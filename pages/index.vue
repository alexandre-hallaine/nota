<script setup>
definePageMeta({
  layout: false
})
</script>

<template>
  <UPageSection>
    <UPageCTA title="Nota" description="A clean space for writing and reading short notes, in a strictly chronological feed. No algorithms, no unnecessary interaction — just text, in order.">
      <template #links>
        <UButton icon="i-lucide-github" label="Login with GitHub" to="/api/auth/github" external/>
      </template>
    </UPageCTA>
  </UPageSection>
</template>
