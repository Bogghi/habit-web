import { int, sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable("users", {
    id: int().primaryKey({ autoIncrement: true}),
    name: text().notNull(),
    email: text().notNull(),
    password: text().notNull(),
    delete: integer({ mode: "boolean"}).default(false)
})