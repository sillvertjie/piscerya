import { NextResponse } from "next/server";
import {
  deleteProject,
  getProjectById,
  updateProject,
} from "@/modules/projects/project.service";

const DEV_USER_ID = "dev-user";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
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
  const { id } = await params;
  const body = await request.json();

  try {
    const project = await updateProject(id, body, DEV_USER_ID);
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
  const { id } = await params;
  await deleteProject(id);
  return NextResponse.json({ success: true });
}
