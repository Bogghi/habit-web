import { defineStore } from 'pinia'

export const userStore = defineStore(
    'userStore',
    {
        state: () => ({
        }),
        actions: {
            async login(email: { value: string; }, password: { value: string; }) {
                const { token } = await $fetch('/api/login', {
                    method: 'POST',
                    body: {email: email.value, password: password.value}
                });
                localStorage.setItem('token', token);
            }
        }
    }
)