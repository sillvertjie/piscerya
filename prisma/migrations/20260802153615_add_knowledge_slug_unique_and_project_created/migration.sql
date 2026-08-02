/*
  Warnings:

  - A unique constraint covering the columns `[workspaceId,slug]` on the table `KnowledgeDocument` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "KnowledgeDocument_workspaceId_slug_key" ON "KnowledgeDocument"("workspaceId", "slug");
