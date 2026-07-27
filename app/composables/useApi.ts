export function useApi<T>(url: string, opts: Parameters<typeof $fetch>[1] = {}) {
   const token = import.meta.client ? localStorage.getItem('token') : null
   return $fetch<T>(url, {
      ...opts,
      headers: {
         ...opts.headers,
         ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
   })
}