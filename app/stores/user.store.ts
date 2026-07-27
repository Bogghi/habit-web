import { defineStore } from 'pinia'
import { useApi } from "~/composables/useApi"

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
                const { token } = await useApi<LoginResponse>('/api/login', {
                    method: 'POST',
                    body: {email: emailVal.value, password: password.value}
                });
                localStorage.setItem('token', token);
            },
            async getUserData() {
                const { id, email, name } = await useApi<UserResponse>('/api/user', {method: 'GET'})
                this.id = id
                this.name = name
                this.email = email
            }
        }
    }
)