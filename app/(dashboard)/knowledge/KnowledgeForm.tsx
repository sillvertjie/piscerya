"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

const DEV_WORKSPACE_ID = "dev-workspace";

export function KnowledgeForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [type, setType] = useState("DOCUMENT");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/knowledge", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, type, workspaceId: DEV_WORKSPACE_ID }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Gagal membuat dokumen");
      return;
    }

    setTitle("");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Judul dokumen baru..."
        required
        className="flex-1 rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent"
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="rounded-md border border-border bg-surface px-3 py-2 text-sm"
      >
        <option value="DOCUMENT">Document</option>
        <option value="GUIDE">Guide</option>
        <option value="REFERENCE">Reference</option>
        <option value="NOTE">Note</option>
      </select>
      <Button type="submit" disabled={loading}>
        {loading ? "Menyimpan..." : "Tambah Dokumen"}
      </Button>
      {error && <p className="text-sm text-danger">{error}</p>}
    </form>
  );
}
