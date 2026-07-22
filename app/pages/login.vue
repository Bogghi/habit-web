<template>
  <div class="w-screen h-screen flex justify-center items-center">
    <Card class="max-w-sm w-full">
      <template #title>Login</template>
      <template #subtitle>Sig in with your credentials</template>
      <template #content>
        <Message v-if="justRegistered" severity="success" class="mb-4">Account created, please log in.</Message>
        <form class="space-y-6 mt-3">
          <div class="flex flex-col gap-2">
            <Label for="email">Email</Label>
            <InputText id="email" type="email" v-model="email" />
          </div>
          <div class="flex flex-col gap-2">
            <div class="flex items-center justify-between">
              <Label for="password">Password</Label>
              <Button variant="link">Forgot password?</Button>
            </div>
            <InputText id="password" type="password" v-model="password" />
          </div>
        </form>
      </template>
      <template #footer>
        <div class="flex flex-col gap-4 mt-10">
          <Button class="w-full" @click="login()">Login</Button>
<!--          <Button severity="secondary" variant="outlined" class="w-full">Login with Google</Button>-->
          <div class="mt-2 text-center text-surface-500 text-sm">
            Don't have an account?
            <NuxtLink to="/signup">
              <Button variant="link" class="p-0">Sign up</Button>
            </NuxtLink>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup>
const route = useRoute();
const justRegistered = route.query.registered === '1';

const email = ref('');
const password = ref('');

const login = async () => {
  const { token } = await $fetch('/api/login', {
    method: 'POST',
    body: {email: email.value, password: password.value}
  });
  localStorage.setItem('token', token);
  await navigateTo('/app');
};
</script>