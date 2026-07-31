import { signup } from '#server/controllers/auth.controller'
export default defineEventHandler(async (event) => signup(event))
