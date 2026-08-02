import { NextResponse } from "next/server";
import { createProject, listProjectsByWorkspace } from "@/modules/projects/project.service";

const DEV_USER_ID = "dev-user";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const workspaceId = searchParams.get("workspaceId");

  if (!workspaceId) {
    return NextResponse.json({ error: "workspaceId wajib diisi" }, { status: 400 });
  }

  const projects = await listProjectsByWorkspace(workspaceId);
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const project = await createProject(body, DEV_USER_ID);
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
