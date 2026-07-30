import { eq } from 'drizzle-orm'
import { db } from '#server/db'
import { users } from '#server/db/schema'

export default defineEventHandler(async (event) => {
    const userId = event.context.userId!

    const user = await db.query.users.findFirst({ where: eq(users.id, userId) })
    if(!user) {
        throw createError({statusCode: 401, statusMessage: 'User not found'})
    }
    await db.update(users).set({ deleted: true }).where(eq(users.id, userId)).returning()

    return { result: true }
})