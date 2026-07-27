import { verifyUserToken } from '#server/utils/jwt'

const PUBLIC_ROUTES = ['/api/login', '/api/signup']

export default defineEventHandler(async (event) => {
   if (!event.path.startsWith('/api') || PUBLIC_ROUTES.includes(event.path)) return

   const auth = getHeader(event, 'authorization')
   const token = auth?.startsWith('Bearer ') ? auth.slice(7) : null
   if (!token) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

   try {
      const { sub } = await verifyUserToken(token)
      event.context.userId = Number(sub)
   } catch {
      throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
   }
})