import { deleteUser } from "#server/controllers/users.controller";
export default defineEventHandler(async (event) => deleteUser(event))