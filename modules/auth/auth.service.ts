import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { registerSchema, type RegisterInput } from "./auth.types";

export async function registerUser(input: RegisterInput) {
  const data = registerSchema.parse(input);

  const existing = await db.user.findUnique({ where: { email: data.email } });
  if (existing) {
    throw new Error("Email sudah terdaftar");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await db.user.create({
    data: { name: data.name, email: data.email, password: hashedPassword },
  });

  const workspace = await db.workspace.create({
    data: { name: `${data.name}'s Workspace`, ownerId: user.id },
  });

  return { user, workspace };
}
