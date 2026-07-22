export function useApi<T>(url: string, opts: Parameters<typeof $fetch>[1] = {}) {
   const token = localStorage.getItem('token')
   return $fetch<T>(url, {
      ...opts,
      headers: {
         ...opts.headers,
         ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
   })
}