import { listTasksByWorkspace } from "@/modules/tasks/task.service";
import { TaskForm } from "./TaskForm";
import { TaskItem } from "./TaskItem";

const DEV_WORKSPACE_ID = "dev-workspace";

export default async function TasksPage() {
  const tasks = await listTasksByWorkspace(DEV_WORKSPACE_ID).catch(() => []);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Tasks</h1>
      <TaskForm />
      <div className="flex flex-col gap-2">
        {tasks.length === 0 && <p className="text-muted">Belum ada task.</p>}
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
