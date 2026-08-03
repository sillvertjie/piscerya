import { NextResponse } from "next/server";
import {
  deleteProject,
  getProjectById,
  updateProject,
} from "@/modules/projects/project.service";
import { getSessionForApi } from "@/lib/session";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSessionForApi();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    return NextResponse.json(
      { error: "Project tidak ditemukan" },
      { status: 404 },
    );
  }

  return NextResponse.json(project);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSessionForApi();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await request.json();

  try {
    const project = await updateProject(id, body, session.userId);
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSessionForApi();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await deleteProject(id);
  return NextResponse.json({ success: true });
}
