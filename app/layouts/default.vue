<template>
  <div class="w-screen h-screen flex flex-col items-center bg-[url('/main-icon-grey-padding.svg')] bg-center bg-repeat-space bg-[length:70px_70px]">
    <Toolbar class="mt-6 mb-6 w-170 rounded-2xl">
      <template #start>
        <NuxtLink to="/app">
          <img src="/main-icon.svg" alt="logo" class="w-8 h-8 mr-3" />
        </NuxtLink>
        <span class="font-semibold">Habit Web</span>
      </template>
      <template #end>
        <NuxtLink to="/app/user">
          <Button v-if="userStore().loaded" variant="outlined"><User/> {{ userStore().name }}</Button>
        </NuxtLink>
      </template>
    </Toolbar>
    <slot />
  </div>
</template>

<script setup>
import User from '@primeicons/vue/user'
onMounted(() => userStore().getUserData())
</script>