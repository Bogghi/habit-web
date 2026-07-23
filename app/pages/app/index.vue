<template>
  <div class="w-screen h-screen relative overflow-hidden flex flex-col items-center">
    <div class="absolute inset-0 grid gap-12.5 auto-rows-17.5" style="grid-template-columns: repeat(auto-fill, 70px);">
      <img v-for="n in 900" :key="n" src="/main-icon-grey.svg" alt="" class="w-17.5 h-17.5" />
    </div>
    <Toolbar class="relative mt-6 w-170 rounded-2xl">
      <template #start>
        <img src="/main-icon.svg" alt="logo" class="w-8 h-8 mr-3" />
        <span class="font-semibold">Habit Web</span>
      </template>
    </Toolbar>
  </div>
</template>
