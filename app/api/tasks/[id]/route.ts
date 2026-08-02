import { NextResponse } from "next/server";
import { deleteTask, updateTask } from "@/modules/tasks/task.service";

// TODO: ganti dengan session user asli setelah auth dipasang
const DEV_USER_ID = "dev-user";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  try {
    const task = await updateTask(id, body, DEV_USER_ID);
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await deleteTask(id);
  return NextResponse.json({ success: true });
}
