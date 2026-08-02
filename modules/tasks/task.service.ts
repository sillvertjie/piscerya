import { db } from "@/lib/db";
import {
  createTaskSchema,
  updateTaskSchema,
  type CreateTaskInput,
  type UpdateTaskInput,
} from "./task.types";

export async function createTask(input: CreateTaskInput, ownerId: string) {
  const data = createTaskSchema.parse(input);

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

export async function updateTask(id: string, input: UpdateTaskInput, actorId: string) {
  const data = updateTaskSchema.parse(input);

  const task = await db.task.update({ where: { id }, data });

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

export async function deleteTask(id: string) {
  return db.task.delete({ where: { id } });
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
