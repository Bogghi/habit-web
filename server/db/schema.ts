import { int, sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable("users", {
    id: int().primaryKey({ autoIncrement: true}),
    name: text().notNull(),
    email: text().notNull(),
    password: text().notNull(),
    deleted: integer({ mode: "boolean"}).default(false)
})

export const habits = sqliteTable('habits', {
    id: int().primaryKey({ autoIncrement: true}),
    name: text().notNull(),
    frequency: text({ enum: ['daily', 'weekly', 'monthly'] }).notNull(),
    reached: integer({ mode: "boolean" }).default(false),
})