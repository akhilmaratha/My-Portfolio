import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export function json(data, init = {}) {
  return NextResponse.json(data, init);
}

export async function requireAdmin(request) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  if (!token || token.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}