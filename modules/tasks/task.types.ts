import { z } from "zod";

export const taskStatusValues = ["TODO", "IN_PROGRESS", "REVIEW", "DONE"] as const;
export const taskPriorityValues = ["LOW", "MEDIUM", "HIGH"] as const;

export const createTaskSchema = z.object({
  title: z.string().min(1, "Judul tidak boleh kosong"),
  description: z.string().optional(),
  workspaceId: z.string(),
  projectId: z.string().optional(),
  priority: z.enum(taskPriorityValues).default("MEDIUM"),
  dueDate: z.coerce.date().optional(),
});

export const updateTaskSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  status: z.enum(taskStatusValues).optional(),
  priority: z.enum(taskPriorityValues).optional(),
  dueDate: z.coerce.date().optional(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
