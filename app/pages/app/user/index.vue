<template>
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
      <Button severity="danger" class="mt-5 w-full">
        <Trash/>
        Cancella dati utente
      </Button>
    </template>
  </Card>
</template>

<script setup>
import { User, Trash } from '@primeicons/vue'
definePageMeta({
  layout: 'default'
})
</script>