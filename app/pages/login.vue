<template>
  <div class="w-screen h-screen flex justify-center items-center">
    <Card class="max-w-sm w-full">
      <template #title>Login</template>
      <template #subtitle>Sig in with your credentials</template>
      <template #content>
        <form class="space-y-6 mt-3">
          <div class="flex flex-col gap-2">
            <Label for="email">Email</Label>
            <InputText id="email" type="email" />
          </div>
          <div class="flex flex-col gap-2">
            <div class="flex items-center justify-between">
              <Label for="password">Password</Label>
              <Button variant="link">Forgot password?</Button>
            </div>
            <InputText id="password" type="password" />
          </div>
        </form>
      </template>
      <template #footer>
        <div class="flex flex-col gap-4 mt-10">
          <Button class="w-full">Login</Button>
        </div>
      </template>
    </Card>
  </div>
</template>