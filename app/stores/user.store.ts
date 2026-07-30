import { defineStore } from 'pinia'
import { useApi } from "~/composables/useApi"

export const userStore = defineStore(
    'userStore',
    {
        state: () => ({
            loaded: false,
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
            async getUserData(refresh: {value: boolean} = {value: false}) {
                if(this.loaded && !refresh) return
                this.loaded = false
                const { id, email, name } = await useApi<UserResponse>('/api/user', {method: 'GET'})
                this.id = id
                this.name = name
                this.email = email
                this.loaded = true
            },
            async deleteUser() {
                if(!this.loaded) return false
                const { result } = await useApi<UserDeleteResponse>('/api/user', {method: 'DELETE'})
                this.resetStore()
                return result
            },
            resetStore() {
                this.loaded = false
                this.id = null
                this.name = null
                this.email = null
            }
        }
    }
)