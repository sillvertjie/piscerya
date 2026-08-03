"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

type KnowledgeDoc = {
  id: string;
  title: string;
  type: string;
};

const typeLabel: Record<string, string> = {
  DOCUMENT: "Doc",
  GUIDE: "Guide",
  REFERENCE: "Reference",
  NOTE: "Note",
};

export function KnowledgeItem({ doc }: { doc: KnowledgeDoc }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(doc.title);
  const [type, setType] = useState(doc.type);
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    setLoading(true);
    await fetch(`/api/knowledge/${doc.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, type }),
    });
    setLoading(false);
    setEditing(false);
    router.refresh();
  }

  async function handleDelete() {
    if (!confirm(`Hapus dokumen "${doc.title}"?`)) return;
    await fetch(`/api/knowledge/${doc.id}`, { method: "DELETE" });
    router.refresh();
  }

  if (editing) {
    return (
      <Card className="flex flex-col gap-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rounded-md border border-border bg-background px-3 py-1.5 text-sm outline-none focus:border-accent"
        />
        <div className="flex gap-2">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="rounded-md border border-border bg-background px-2 py-1.5 text-sm"
          >
            <option value="DOCUMENT">Document</option>
            <option value="GUIDE">Guide</option>
            <option value="REFERENCE">Reference</option>
            <option value="NOTE">Note</option>
          </select>
          <Button onClick={handleSave} disabled={loading} className="ml-auto">
            {loading ? "Menyimpan..." : "Simpan"}
          </Button>
          <Button variant="ghost" onClick={() => setEditing(false)}>
            Batal
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="flex items-center justify-between">
      <span>{doc.title}</span>
      <div className="flex items-center gap-3">
        <span className="rounded-full bg-surface-hover px-2 py-0.5 text-xs text-muted">
          {typeLabel[doc.type] ?? doc.type}
        </span>
        <button onClick={() => setEditing(true)} className="text-xs text-accent hover:underline">
          Edit
        </button>
        <button onClick={handleDelete} className="text-xs text-danger hover:underline">
          Hapus
        </button>
      </div>
    </Card>
  );
}
