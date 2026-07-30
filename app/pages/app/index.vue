<template>
  <div class="w-screen h-screen flex flex-col items-center bg-[url('/main-icon-grey-padding.svg')] bg-center bg-repeat-space bg-[length:70px_70px]">
    <Toolbar class="mt-6 w-170 rounded-2xl">
      <template #start>
        <img src="/main-icon.svg" alt="logo" class="w-8 h-8 mr-3" />
        <span class="font-semibold">Habit Web</span>
      </template>
    </Toolbar>
  </div>
</template>

<script setup>
onMounted(() => initUser())
const initUser = async () => userStore().getUserData()
</script>