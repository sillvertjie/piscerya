import { NextResponse } from "next/server";
import {
  createKnowledgeDoc,
  listKnowledgeDocsByWorkspace,
} from "@/modules/knowledge/knowledge.service";

// TODO: ganti dengan session user asli setelah auth dipasang
const DEV_USER_ID = "dev-user";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const workspaceId = searchParams.get("workspaceId");

  if (!workspaceId) {
    return NextResponse.json(
      { error: "workspaceId wajib diisi" },
      { status: 400 },
    );
  }

  const docs = await listKnowledgeDocsByWorkspace(workspaceId);
  return NextResponse.json(docs);
}

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const doc = await createKnowledgeDoc(body, DEV_USER_ID);
    return NextResponse.json(doc, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
}
