import crypto from "crypto";

const SESSION_COOKIE = "portfolio_admin";

export function createAdminToken(email) {
  const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "dev-secret";
  const raw = `${email}:${Date.now()}`;
  const signature = crypto.createHmac("sha256", secret).update(raw).digest("hex");
  return `${Buffer.from(raw).toString("base64url")}.${signature}`;
}

export function verifyAdminToken(token) {
  if (!token) {
    return null;
  }

  const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "dev-secret";
  const [payload, signature] = token.split(".");
  if (!payload || !signature) {
    return null;
  }

  const raw = Buffer.from(payload, "base64url").toString("utf8");
  const expected = crypto.createHmac("sha256", secret).update(raw).digest("hex");

  if (expected !== signature) {
    return null;
  }

  const [email, issuedAt] = raw.split(":");
  if (!email || !issuedAt) {
    return null;
  }

  return { email, issuedAt: Number(issuedAt) };
}

export { SESSION_COOKIE };
