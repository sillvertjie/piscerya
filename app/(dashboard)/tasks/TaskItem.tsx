"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

type Task = {
  id: string;
  title: string;
  status: string;
  priority: string;
};

export function TaskItem({ task }: { task: Task }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [status, setStatus] = useState(task.status);
  const [priority, setPriority] = useState(task.priority);
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    setLoading(true);
    await fetch(`/api/tasks/${task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, status, priority }),
    });
    setLoading(false);
    setEditing(false);
    router.refresh();
  }

  async function handleDelete() {
    if (!confirm(`Hapus task "${task.title}"?`)) return;
    await fetch(`/api/tasks/${task.id}`, { method: "DELETE" });
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
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-md border border-border bg-background px-2 py-1.5 text-sm"
          >
            <option value="TODO">Todo</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="REVIEW">Review</option>
            <option value="DONE">Done</option>
          </select>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="rounded-md border border-border bg-background px-2 py-1.5 text-sm"
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
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
      <span>{task.title}</span>
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted">{task.status}</span>
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
