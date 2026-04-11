import { cookies } from "next/headers";
import { SESSION_COOKIE, verifyAdminToken } from "./auth";

export function getAdminSession() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  return verifyAdminToken(token);
}
