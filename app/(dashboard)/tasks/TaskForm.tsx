"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

const DEV_WORKSPACE_ID = "dev-workspace";

export function TaskForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, priority, workspaceId: DEV_WORKSPACE_ID }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Gagal membuat task");
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
        placeholder="Judul task baru..."
        required
        className="flex-1 rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="rounded-md border border-border bg-surface px-3 py-2 text-sm"
      >
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
      </select>
      <Button type="submit" disabled={loading}>
        {loading ? "Menyimpan..." : "Tambah Task"}
      </Button>
      {error && <p className="text-sm text-danger">{error}</p>}
    </form>
  );
}
