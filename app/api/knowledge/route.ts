import { NextResponse } from "next/server";
import { createKnowledgeDoc, listKnowledgeDocsByWorkspace } from "@/modules/knowledge/knowledge.service";
import { getSessionForApi } from "@/lib/session";

export async function GET() {
  const session = await getSessionForApi();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const docs = await listKnowledgeDocsByWorkspace(session.workspaceId);
  return NextResponse.json(docs);
}

export async function POST(request: Request) {
  const session = await getSessionForApi();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();

  try {
    const doc = await createKnowledgeDoc({ ...body, workspaceId: session.workspaceId }, session.userId);
    return NextResponse.json(doc, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
