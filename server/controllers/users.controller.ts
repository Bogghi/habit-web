import { eq } from 'drizzle-orm'
import { db } from '#server/db'
import { users } from '#server/db/schema'
import { H3Event } from "h3";

export const usersController = (event: H3Event) => {
    const userId = event.context.userId!

    const getUser = async () => {
        const user = await db.query.users.findFirst({ where: eq(users.id, userId) })
        if(!user) {
            throw createError({statusCode: 401, statusMessage: 'User not found'})
        }

        return { id: user.id, name: user.name, email: user.email }
    }
    const deleteUser = async () => {
        const [deleted] = await db.update(users).set({ deleted: true }).where(eq(users.id, userId)).returning()
        if (!deleted) {
            throw createError({ statusCode: 401, statusMessage: 'User not found'})
        }
        return { result: true }
    }

    return { getUser, deleteUser }
}