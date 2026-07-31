import { getHabits } from "#server/controllers/habits.controller"
export default defineEventHandler((event) => getHabits(event))