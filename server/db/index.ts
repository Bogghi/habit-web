import { drizzle } from 'drizzle-orm/bun-sqlite'
import { Database } from 'bun:sqlite'
import { useRuntimeConfig } from "#imports"
import * as schema from './schema'

const sqlite = new Database(useRuntimeConfig().DB_PATH)
export const db = drizzle(sqlite, { schema })