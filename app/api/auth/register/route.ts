import { NextResponse } from "next/server";
import { registerUser } from "@/modules/auth/auth.service";

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const { user } = await registerUser(body);
    return NextResponse.json({ id: user.id, email: user.email }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
