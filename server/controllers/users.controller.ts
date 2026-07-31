import { eq } from 'drizzle-orm'
import { db } from '#server/db'
import { users } from '#server/db/schema'
import { H3Event } from "h3";

export async function getUser(event: H3Event) {
    const userId = event.context.userId!

    const user = await db.query.users.findFirst({ where: eq(users.id, userId) })
    if(!user) {
        throw createError({statusCode: 401, statusMessage: 'User not found'})
    }

    return { id: user.id, name: user.name, email: user.email }
}
export async function deleteUser(event: H3Event) {
    const userId = event.context.userId!

    const [deleted] = await db.update(users).set({ deleted: true }).where(eq(users.id, userId)).returning()
    if (!deleted) {
        throw createError({ statusCode: 401, statusMessage: 'User not found'})
    }
    return { result: true }
}
