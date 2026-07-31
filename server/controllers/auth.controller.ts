import { and, eq } from 'drizzle-orm'
import { db } from '#server/db'
import { users } from '#server/db/schema'
import { signUserToken } from '#server/utils/jwt'
import { H3Event } from "h3"

export async function login (event: H3Event) {
    const { email, password } = await readBody(event)

    const user = await db.query.users.findFirst({ where: and(eq(users.email, email), eq(users.deleted, false)) })
    if (!user || !(await Bun.password.verify(password, user.password))) {
        throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
    }

    const token = await signUserToken(user.id)

    return { token }
}

export async function signup (event: H3Event) {
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
}