import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app";
import { decodeJwt } from "jose";

export default defineNuxtRouteMiddleware((to) => {
    if (to.path.startsWith('/app')) {
        const token = localStorage.getItem('token');
        if (!token) return navigateTo('/login');

        try {
            const { exp } = decodeJwt(token);
            if (!exp || exp * 1000 < Date.now()) return navigateTo('/login');
        } catch {
            return navigateTo('/login');
        }
    }
})