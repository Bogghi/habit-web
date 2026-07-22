import { eq } from 'drizzle-orm'
import { db } from '#server/db/index'
import { users } from '#server/db/schema'
import { signUserToken } from '#server/utils/jwt'

export default defineEventHandler(async (event) => {
   const { email, password } = await readBody(event)

   const user = await db.query.users.findFirst({ where: eq(users.email, email) })
   if (!user || !(await Bun.password.verify(password, user.password))) {
      throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
   }

   const token = await signUserToken(user.id)

   return { token, id: user.id, name: user.name, email: user.email }
})