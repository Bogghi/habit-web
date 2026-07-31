import { db } from '#server/db'
import { habits } from '#server/db/schema'
import { H3Event } from "h3";
import { eq } from "drizzle-orm";

export async function getHabits(event: H3Event) {
   const userId = event.context.userId!
   return await db.query.habits.findFirst({ where: eq(habits.userId, userId) })
}