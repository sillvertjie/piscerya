import { db } from "@/lib/db";
import {
  createProjectSchema,
  updateProjectSchema,
  type CreateProjectInput,
  type UpdateProjectInput,
} from "./project.types";

export async function createProject(input: CreateProjectInput, ownerId: string) {
  const data = createProjectSchema.parse(input);

  const project = await db.project.create({
    data: { ...data, ownerId },
  });

  await db.activityLog.create({
    data: {
      type: "PROJECT_CREATED",
      message: `membuat project "${project.name}"`,
      targetType: "PROJECT",
      targetId: project.id,
      workspaceId: project.workspaceId,
      actorId: ownerId,
    },
  });

  return project;
}

export async function updateProject(id: string, input: UpdateProjectInput, actorId: string) {
  const data = updateProjectSchema.parse(input);

  const project = await db.project.update({ where: { id }, data });

  await db.activityLog.create({
    data: {
      type: "PROJECT_UPDATED",
      message: `memperbarui project "${project.name}"`,
      targetType: "PROJECT",
      targetId: project.id,
      workspaceId: project.workspaceId,
      actorId,
    },
  });

  return project;
}

export async function deleteProject(id: string) {
  return db.project.delete({ where: { id } });
}

export async function listProjectsByWorkspace(workspaceId: string) {
  return db.project.findMany({
    where: { workspaceId },
    orderBy: { createdAt: "desc" },
    include: { tasks: { select: { id: true, status: true } } },
  });
}

export async function getProjectById(id: string) {
  return db.project.findUnique({
    where: { id },
    include: { tasks: true },
  });
}
