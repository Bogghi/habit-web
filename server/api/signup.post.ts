import { eq } from 'drizzle-orm'
import { db } from '#server/db/index'
import { users } from '#server/db/schema'

export default defineEventHandler(async (event) => {
   const { name, email, password } = await readBody(event)

   if (!name || !email || !password) {
      throw createError({ statusCode: 400, statusMessage: 'Name, email and password are required' })
   }

   const existing = await db.query.users.findFirst({ where: eq(users.email, email) })
   if (existing) {
      throw createError({ statusCode: 409, statusMessage: 'Email already registered' })
   }

   const hashed = await Bun.password.hash(password)
   const [user] = await db.insert(users).values({ name, email, password: hashed }).returning()
   if (!user) {
      throw createError({ statusCode: 500, statusMessage: 'Failed to create user' })
   }

   return { registered: true }
})
