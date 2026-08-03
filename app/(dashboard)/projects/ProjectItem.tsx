"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

type Project = {
  id: string;
  name: string;
  status: string;
  progress: number;
};

const statusLabel: Record<string, string> = {
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  ON_HOLD: "On Hold",
};

export function ProjectItem({ project }: { project: Project }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(project.name);
  const [status, setStatus] = useState(project.status);
  const [progress, setProgress] = useState(project.progress);
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    setLoading(true);
    await fetch(`/api/projects/${project.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, status, progress }),
    });
    setLoading(false);
    setEditing(false);
    router.refresh();
  }

  async function handleDelete() {
    if (!confirm(`Hapus project "${project.name}"?`)) return;
    await fetch(`/api/projects/${project.id}`, { method: "DELETE" });
    router.refresh();
  }

  if (editing) {
    return (
      <Card className="flex flex-col gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-md border border-border bg-background px-3 py-1.5 text-sm outline-none focus:border-accent"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-md border border-border bg-background px-2 py-1.5 text-sm"
        >
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
          <option value="ON_HOLD">On Hold</option>
        </select>
        <input
          type="number"
          min={0}
          max={100}
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          className="rounded-md border border-border bg-background px-3 py-1.5 text-sm outline-none focus:border-accent"
        />
        <div className="flex gap-2">
          <Button onClick={handleSave} disabled={loading}>
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
    <Card>
      <div className="mb-2 flex items-center justify-between">
        <span className="font-medium">{project.name}</span>
        <span className="rounded-full bg-surface-hover px-2 py-0.5 text-xs text-muted">
          {statusLabel[project.status] ?? project.status}
        </span>
      </div>
      <div className="mb-1 h-1.5 w-full rounded-full bg-surface-hover">
        <div className="h-1.5 rounded-full bg-accent" style={{ width: `${project.progress}%` }} />
      </div>
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted">{project.progress}% selesai</p>
        <div className="flex gap-2">
          <button onClick={() => setEditing(true)} className="text-xs text-accent hover:underline">
            Edit
          </button>
          <button onClick={handleDelete} className="text-xs text-danger hover:underline">
            Hapus
          </button>
        </div>
      </div>
    </Card>
  );
}
