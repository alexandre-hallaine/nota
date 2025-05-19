<script lang="ts" setup>
import * as z from 'zod'

const schema = z.object({
  name: z.string().min(2),
  bio: z.string().min(2)
})

type Schema = z.output<typeof schema>

const {user} = useUserSession()
const toast = useToast()
const queryCache = useQueryCache()
const state = reactive<Schema>({name: user.value.name, bio: user.value.bio})

const {mutate: saveUser, isLoading: loading} = useMutation({
  mutation: () => {
    return $fetch(`/api/users`, {
      method: 'PATCH',
      body: state
    })
  },

  async onSuccess() {
    await queryCache.invalidateQueries({key: ['user']})
    toast.add({title: `User updated.`})
  },
})
</script>

<template>
  <UPageSection>
    <div class="flex justify-center items-center">
      <UForm
          :schema="schema"
          :state="state"
          class="space-y-4"
          @submit="saveUser"
      >
        <UFormField label="Name" name="name">
          <UInput v-model="state.name" placeholder="John Lennon"/>
        </UFormField>

        <UFormField label="Bio" name="bio">
          <UTextarea v-model="state.bio" placeholder="Type something..."/>
        </UFormField>

        <UButton :loading label="Submit" type="submit"/>
      </UForm>
    </div>
  </UPageSection>
</template>

