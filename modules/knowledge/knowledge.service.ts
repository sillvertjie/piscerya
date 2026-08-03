import { db } from "@/lib/db";
import { slugify } from "@/lib/utils";
import {
  createKnowledgeDocSchema,
  updateKnowledgeDocSchema,
  type CreateKnowledgeDocInput,
  type UpdateKnowledgeDocInput,
} from "./knowledge.types";

async function uniqueSlug(workspaceId: string, title: string) {
  const base = slugify(title) || "untitled";
  let slug = base;
  let counter = 1;

  while (
    await db.knowledgeDocument.findFirst({ where: { workspaceId, slug } })
  ) {
    counter += 1;
    slug = `${base}-${counter}`;
  }

  return slug;
}

export async function createKnowledgeDoc(
  input: CreateKnowledgeDocInput,
  authorId: string,
) {
  const data = createKnowledgeDocSchema.parse(input);
  const slug = await uniqueSlug(data.workspaceId, data.title);

  const doc = await db.knowledgeDocument.create({
    data: {
      title: data.title,
      content: data.content,
      type: data.type,
      workspaceId: data.workspaceId,
      parentId: data.parentId,
      slug,
      authorId,
    },
  });

  await db.activityLog.create({
    data: {
      type: "KNOWLEDGE_ADDED",
      message: `menambahkan dokumen "${doc.title}"`,
      targetType: "KNOWLEDGE_DOCUMENT",
      targetId: doc.id,
      workspaceId: doc.workspaceId,
      actorId: authorId,
    },
  });

  return doc;
}

export async function updateKnowledgeDoc(
  id: string,
  workspaceId: string,
  input: UpdateKnowledgeDocInput,
) {
  const data = updateKnowledgeDocSchema.parse(input);
  const { count } = await db.knowledgeDocument.updateMany({
    where: { id, workspaceId },
    data,
  });
  if (count === 0) {
    throw new Error("Dokumen tidak ditemukan");
  }
  return db.knowledgeDocument.findUniqueOrThrow({ where: { id } });
}

export async function deleteKnowledgeDoc(id: string, workspaceId: string) {
  const { count } = await db.knowledgeDocument.deleteMany({
    where: { id, workspaceId },
  });
  if (count === 0) {
    throw new Error("Dokumen tidak ditemukan");
  }
}

export async function listKnowledgeDocsByWorkspace(workspaceId: string) {
  return db.knowledgeDocument.findMany({
    where: { workspaceId },
    orderBy: { updatedAt: "desc" },
  });
}

export async function getKnowledgeDocById(id: string, workspaceId: string) {
  return db.knowledgeDocument.findFirst({
    where: { id, workspaceId },
    include: { children: true, author: { select: { name: true } } },
  });
}
