import { and, eq } from 'drizzle-orm'
import { db } from '#server/db'
import { users } from '#server/db/schema'
import { signUserToken } from '#server/utils/jwt'

export default defineEventHandler(async (event) => {
   const { email, password } = await readBody(event)

   const user = await db.query.users.findFirst({ where: and(eq(users.email, email), eq(users.deleted, false)) })
   if (!user || !(await Bun.password.verify(password, user.password))) {
      throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
   }

   const token = await signUserToken(user.id)

   return { token }
})