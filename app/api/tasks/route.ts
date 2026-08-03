import { NextResponse } from "next/server";
import { createTask, listTasksByWorkspace } from "@/modules/tasks/task.service";
import { getSessionForApi } from "@/lib/session";

export async function GET() {
  const session = await getSessionForApi();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const tasks = await listTasksByWorkspace(session.workspaceId);
  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  const session = await getSessionForApi();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();

  try {
    const task = await createTask({ ...body, workspaceId: session.workspaceId }, session.userId);
    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
