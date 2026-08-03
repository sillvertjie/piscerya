import { listKnowledgeDocsByWorkspace } from "@/modules/knowledge/knowledge.service";
import { KnowledgeForm } from "./KnowledgeForm";
import { KnowledgeItem } from "./KnowledgeItem";

const DEV_WORKSPACE_ID = "dev-workspace";

export default async function KnowledgePage() {
  const docs = await listKnowledgeDocsByWorkspace(DEV_WORKSPACE_ID).catch(() => []);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Knowledge Base</h1>
      <KnowledgeForm />
      <div className="flex flex-col gap-2">
        {docs.length === 0 && <p className="text-muted">Belum ada dokumen.</p>}
        {docs.map((doc) => (
          <KnowledgeItem key={doc.id} doc={doc} />
        ))}
      </div>
    </div>
  );
}
