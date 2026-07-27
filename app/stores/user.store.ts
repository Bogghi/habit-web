import { defineStore } from 'pinia'

export const userStore = defineStore(
    'userStore',
    {
        state: () => ({
            id: null as number | null,
            name: null as string | null,
            email: null as string | null,
        }),
        actions: {
            async login(emailVal: { value: string; }, password: { value: string; }) {
                const { token, id, name, email } = await $fetch('/api/login', {
                    method: 'POST',
                    body: {email: emailVal.value, password: password.value}
                });
                localStorage.setItem('token', token);
                this.id = id
                this.email = email
                this.name = name
            }
        }
    }
)