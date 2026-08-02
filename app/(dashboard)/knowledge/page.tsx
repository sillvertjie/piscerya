import { Card } from "@/components/ui/Card";
import { listKnowledgeDocsByWorkspace } from "@/modules/knowledge/knowledge.service";
import { KnowledgeForm } from "./KnowledgeForm";

const DEV_WORKSPACE_ID = "dev-workspace";

const typeLabel: Record<string, string> = {
  DOCUMENT: "Doc",
  GUIDE: "Guide",
  REFERENCE: "Reference",
  NOTE: "Note",
};

export default async function KnowledgePage() {
  const docs = await listKnowledgeDocsByWorkspace(DEV_WORKSPACE_ID).catch(() => []);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Knowledge Base</h1>
      <KnowledgeForm />
      <div className="flex flex-col gap-2">
        {docs.length === 0 && <p className="text-muted">Belum ada dokumen.</p>}
        {docs.map((doc) => (
          <Card key={doc.id} className="flex items-center justify-between">
            <span>{doc.title}</span>
            <span className="rounded-full bg-surface-hover px-2 py-0.5 text-xs text-muted">
              {typeLabel[doc.type] ?? doc.type}
            </span>
          </Card>
        ))}
      </div>
    </div>
  );
}
