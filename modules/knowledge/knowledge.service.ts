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
  input: UpdateKnowledgeDocInput,
) {
  const data = updateKnowledgeDocSchema.parse(input);
  return db.knowledgeDocument.update({ where: { id }, data });
}

export async function deleteKnowledgeDoc(id: string) {
  return db.knowledgeDocument.delete({ where: { id } });
}

export async function listKnowledgeDocsByWorkspace(workspaceId: string) {
  return db.knowledgeDocument.findMany({
    where: { workspaceId },
    orderBy: { updatedAt: "desc" },
  });
}

export async function getKnowledgeDocById(id: string) {
  return db.knowledgeDocument.findUnique({
    where: { id },
    include: { children: true, author: { select: { name: true } } },
  });
}
