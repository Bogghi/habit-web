<template>
  <div class="w-screen h-screen flex justify-center items-center">
    <Card class="max-w-sm w-full">
      <template #title>Sign up</template>
      <template #subtitle>Create your account</template>
      <template #content>
        <form class="space-y-6 mt-3">
          <div class="flex flex-col gap-2">
            <Label for="name">Name</Label>
            <InputText id="name" type="text" v-model="name" />
          </div>
          <div class="flex flex-col gap-2">
            <Label for="email">Email</Label>
            <InputText id="email" type="email" v-model="email" />
          </div>
          <div class="flex flex-col gap-2">
            <Label for="password">Password</Label>
            <InputText id="password" type="password" v-model="password" />
          </div>
          <Message v-if="error" severity="error">{{ error }}</Message>
        </form>
      </template>
      <template #footer>
        <div class="flex flex-col gap-4 mt-10">
          <Button class="w-full" @click="signup()">Sign up</Button>
          <div class="mt-2 text-center text-surface-500 text-sm">
            Already have an account?
            <NuxtLink to="/login">
              <Button variant="link" class="p-0">Login</Button>
            </NuxtLink>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup>
const name = ref('');
const email = ref('');
const password = ref('');
const error = ref('');

const signup = async () => {
  error.value = '';
  try {
    await $fetch('/api/signup', {
      method: 'POST',
      body: {name: name.value, email: email.value, password: password.value}
    });
    await navigateTo('/login?registered=1');
  } catch (e) {
    error.value = e?.data?.statusMessage || 'Something went wrong';
  }
};
</script>
