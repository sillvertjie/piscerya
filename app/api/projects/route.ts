import { NextResponse } from "next/server";
import { createProject, listProjectsByWorkspace } from "@/modules/projects/project.service";
import { getSessionForApi } from "@/lib/session";

export async function GET() {
  const session = await getSessionForApi();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const projects = await listProjectsByWorkspace(session.workspaceId);
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const session = await getSessionForApi();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();

  try {
    const project = await createProject({ ...body, workspaceId: session.workspaceId }, session.userId);
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
