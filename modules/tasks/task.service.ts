import { db } from "@/lib/db";
import {
  createTaskSchema,
  updateTaskSchema,
  type CreateTaskInput,
  type UpdateTaskInput,
} from "./task.types";

export async function createTask(input: CreateTaskInput, ownerId: string) {
  const data = createTaskSchema.parse(input);

  if (data.projectId) {
    const project = await db.project.findFirst({
      where: { id: data.projectId, workspaceId: data.workspaceId },
      select: { id: true },
    });
    if (!project) {
      throw new Error("Project tidak ditemukan di workspace ini");
    }
  }

  const task = await db.task.create({
    data: { ...data, ownerId },
  });

  await db.activityLog.create({
    data: {
      type: "TASK_CREATED",
      message: `membuat task "${task.title}"`,
      targetType: "TASK",
      targetId: task.id,
      workspaceId: task.workspaceId,
      actorId: ownerId,
    },
  });

  return task;
}

export async function updateTask(
  id: string,
  workspaceId: string,
  input: UpdateTaskInput,
  actorId: string,
) {
  const data = updateTaskSchema.parse(input);

  const { count } = await db.task.updateMany({
    where: { id, workspaceId },
    data,
  });
  if (count === 0) {
    throw new Error("Task tidak ditemukan");
  }
  const task = await db.task.findUniqueOrThrow({ where: { id } });

  if (data.status === "DONE") {
    await db.activityLog.create({
      data: {
        type: "TASK_COMPLETED",
        message: `menyelesaikan task "${task.title}"`,
        targetType: "TASK",
        targetId: task.id,
        workspaceId: task.workspaceId,
        actorId,
      },
    });
  }

  return task;
}

export async function deleteTask(id: string, workspaceId: string) {
  const { count } = await db.task.deleteMany({ where: { id, workspaceId } });
  if (count === 0) {
    throw new Error("Task tidak ditemukan");
  }
}

export async function listTasksByWorkspace(workspaceId: string) {
  return db.task.findMany({
    where: { workspaceId },
    orderBy: { dueDate: "asc" },
  });
}

export async function getUpcomingTasks(workspaceId: string, limit = 5) {
  return db.task.findMany({
    where: { workspaceId, status: { not: "DONE" }, dueDate: { not: null } },
    orderBy: { dueDate: "asc" },
    take: limit,
  });
}
