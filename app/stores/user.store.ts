import { defineStore } from 'pinia'
import { useApi } from "~/composables/useApi"

export const userStore = defineStore('userStore', () => {
    const loaded = ref(false)
    const id = ref<number | null>(null)
    const name = ref<string | null>(null)
    const email = ref<string | null>(null)

    async function login(emailVal: { value: string; }, password: { value: string; }) {
        const { token } = await useApi<LoginResponse>('/api/login', {
            method: 'POST',
            body: {email: emailVal.value, password: password.value}
        });
        localStorage.setItem('token', token);
    }

    async function getUserData(refresh: {value: boolean} = {value: false}) {
        if((loaded.value && !refresh) || localStorage.getItem('token') === null) return
        loaded.value = false
        const data = await useApi<UserResponse>('/api/user', {method: 'GET'})
        id.value = data.id
        name.value = data.name
        email.value = data.email
        loaded.value = true
    }

    async function deleteUser() {
        if(!loaded.value) return false
        const { result } = await useApi<UserDeleteResponse>('/api/user', {method: 'DELETE'})
        resetStore()
        return result
    }

    function resetStore() {
        loaded.value = false
        id.value = null
        name.value = null
        email.value = null
    }

    return { loaded, id, name, email, login, getUserData, deleteUser, resetStore }
})