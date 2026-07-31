import { usersController } from "#server/controllers/users.controller";
export default defineEventHandler(async (event) => usersController(event).deleteUser())