import { login } from '#server/controllers/auth.controller'
export default defineEventHandler(async (event) => login(event))