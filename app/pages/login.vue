<template>
  <div class="w-screen h-screen flex justify-center items-center">
    <Card class="max-w-sm w-full">
      <template #title>Login</template>
      <template #subtitle>Accedi con le tue credenziali</template>
      <template #content>
        <Message v-if="justRegistered" severity="success" class="mb-4">Account creato, accedi pure.</Message>
        <form class="space-y-3 mt-3">
          <div class="flex flex-col gap-2">
            <Label for="email">Email</Label>
            <InputText id="email" type="email" v-model="email" @keyup.enter="login()" />
          </div>
          <div class="flex flex-col gap-2 mb-3">
            <div class="flex items-center justify-between">
              <Label for="password">Password</Label>
<!--              will enable it in the future -->
<!--              <Button variant="link">Forgot password?</Button>-->
            </div>
            <InputText id="password" type="password" v-model="password" @keyup.enter="login()" />
          </div>
        </form>
      </template>
      <template #footer>
        <div class="flex flex-col gap-4">
          <Button class="w-full" @click="login()">Login</Button>
          <Message severity="warn" v-if="loginFailed">
            <template #icon>
              <ExclamationTriangle />
            </template>
            Password o email errati
          </Message>
          <div class="mt-2 text-center text-surface-500 text-sm">
            Non hai un account?
            <NuxtLink to="/signup">
              <Button variant="link" class="p-0">Registrati</Button>
            </NuxtLink>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { ExclamationTriangle } from "@primeicons/vue";

definePageMeta({ layout: false });

const route = useRoute();
const justRegistered = route.query.registered === '1';

const email = ref('');
const password = ref('');
const loginFailed = ref(false)

const login = async () => {
  try {
    await userStore().login(email, password);
    await navigateTo('/app');
  }
  catch (e) {
    if(e.status === 401) {
      loginFailed.value = true
    }
  }
};

onMounted(() => {
  if (localStorage.getItem('token')) {
    navigateTo('/app');
  }
});
</script>