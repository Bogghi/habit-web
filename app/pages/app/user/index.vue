<template>
  <div>
    <Card class="overflow-hidden" :pt="{ body: { class: 'pt-16!' } }">
      <template #header>
        <div class="relative">
          <img
              class="w-full max-h-42 object-cover"
              alt="user header"
              src="/user-cover-image.jpg"
          />
          <Avatar shape="circle" class="w-18! h-18! absolute! -bottom-9! left-4!">
            <User class="w-13! h-13!" color="var(--p-primary-color)"/>
          </Avatar>
        </div>
      </template>
      <template #title>
        <span class="font-bold text-xl">{{ userStore().name }}</span>
      </template>
      <template #content>
        <div class="flex">
          <span class="font-bold mr-3">Emai: </span>
          <span>{{ userStore().email }}</span>
        </div>
      </template>
      <template #footer>
        <Button severity="danger" class="mt-5 w-full" @click="() => visible = true">
          <Trash/>
          Cancella dati utente
        </Button>
      </template>
    </Card>
    <Dialog v-model:visible="visible" modal header="Cancella utente" :pt="{ root: { class: 'w-96' } }">
      <div class="flex flex-col gap-5">
        <Message severity="error">
          <template #icon><ExclamationTriangle/></template>
          <span>Per cancellare l'utente digita la tua email </span><span class="font-bold">{{ userStore().email }}</span>
        </Message>
        <label for="email">Email</label>
        <InputText id="email" v-model="emailForDelete"/>
        <Button severity="danger" class="w-full" :disabled="!activeDelete" :loading="deleting" @click="deleteUser">
          <Trash/>
          Cancella utente
        </Button>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { User, Trash, ExclamationTriangle } from '@primeicons/vue'
definePageMeta({
  layout: 'default'
})

const visible = ref(false)
const emailForDelete = ref()

const activeDelete = computed(() => emailForDelete.value === userStore().email)

const deleting = ref(false)
const deleteUser = async () => {
  deleting.value = true
  try {
    await userStore().deleteUser()
    localStorage.removeItem('token')
    await navigateTo('/')
  } finally {
    deleting.value = false
  }
}
</script>