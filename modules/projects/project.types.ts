import { z } from "zod";

export const projectStatusValues = ["IN_PROGRESS", "COMPLETED", "ON_HOLD"] as const;

export const createProjectSchema = z.object({
  name: z.string().min(1, "Nama project tidak boleh kosong"),
  description: z.string().optional(),
  workspaceId: z.string(),
  dueDate: z.coerce.date().optional(),
});

export const updateProjectSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  status: z.enum(projectStatusValues).optional(),
  progress: z.number().int().min(0).max(100).optional(),
  dueDate: z.coerce.date().optional(),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
