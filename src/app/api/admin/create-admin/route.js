import bcrypt from "bcryptjs";
import { json } from "@/lib/api-utils";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";

export async function POST(request) {
  try {
    const bootstrapSecret = process.env.ADMIN_BOOTSTRAP_SECRET;

    if (!bootstrapSecret) {
      return json({ error: "Bootstrap secret is not configured" }, { status: 500 });
    }

    const headerSecret = request.headers.get("x-admin-bootstrap-secret");
    if (headerSecret !== bootstrapSecret) {
      return json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const email = String(body.email || "").toLowerCase().trim();
    const password = String(body.password || "");

    if (!email || !password) {
      return json({ error: "Email and password are required" }, { status: 400 });
    }

    await connectToDatabase();

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.findOneAndUpdate(
      { email },
      { email, passwordHash, role: "admin" },
      { new: true, upsert: true, setDefaultsOnInsert: true },
    );

    return json(
      {
        success: true,
        user: {
          id: user._id.toString(),
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    return json({ error: error.message }, { status: 500 });
  }
}