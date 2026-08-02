import { z } from "zod";

export const knowledgeTypeValues = [
  "DOCUMENT",
  "GUIDE",
  "REFERENCE",
  "NOTE",
] as const;

export const createKnowledgeDocSchema = z.object({
  title: z.string().min(1, "Judul tidak boleh kosong"),
  content: z.string().default(""),
  type: z.enum(knowledgeTypeValues).default("DOCUMENT"),
  workspaceId: z.string(),
  parentId: z.string().optional(),
});

export const updateKnowledgeDocSchema = z.object({
  title: z.string().min(1).optional(),
  content: z.string().optional(),
  type: z.enum(knowledgeTypeValues).optional(),
  parentId: z.string().optional(),
});

export type CreateKnowledgeDocInput = z.infer<typeof createKnowledgeDocSchema>;
export type UpdateKnowledgeDocInput = z.infer<typeof updateKnowledgeDocSchema>;
