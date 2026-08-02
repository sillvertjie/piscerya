import { Card } from "@/components/ui/Card";
import { listTasksByWorkspace } from "@/modules/tasks/task.service";

// TODO: ganti dengan workspace aktif dari session, setelah auth dipasang
const DEV_WORKSPACE_ID = "dev-workspace";

export default async function TasksPage() {
  const tasks = await listTasksByWorkspace(DEV_WORKSPACE_ID).catch(() => []);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Tasks</h1>
      <div className="flex flex-col gap-2">
        {tasks.length === 0 && (
          <p className="text-muted">
            Belum ada task. (Halaman ini membaca langsung dari database via{" "}
            <code>modules/tasks/task.service.ts</code>.)
          </p>
        )}
        {tasks.map((task) => (
          <Card key={task.id} className="flex items-center justify-between">
            <span>{task.title}</span>
            <span className="text-xs text-muted">{task.status}</span>
          </Card>
        ))}
      </div>
    </div>
  );
}
