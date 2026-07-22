import { drizzle } from 'drizzle-orm/bun-sqlite'
import { Database } from 'bun:sqlite'
import { useRuntimeConfig } from "#imports"

const sqlite = new Database(useRuntimeConfig().DB_PATH)
export const db = drizzle(sqlite)