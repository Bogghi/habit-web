import { usersController } from "#server/controllers/users.controller";
export default defineEventHandler((event) => usersController(event).getUser())