import { getUser } from "#server/controllers/users.controller";
export default defineEventHandler((event) => getUser(event))