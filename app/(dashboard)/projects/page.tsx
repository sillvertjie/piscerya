import { Card } from "@/components/ui/Card";
import { listProjectsByWorkspace } from "@/modules/projects/project.service";
import { ProjectForm } from "./ProjectForm";

const DEV_WORKSPACE_ID = "dev-workspace";

const statusLabel: Record<string, string> = {
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  ON_HOLD: "On Hold",
};

export default async function ProjectsPage() {
  const projects = await listProjectsByWorkspace(DEV_WORKSPACE_ID).catch(() => []);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Projects</h1>
      <ProjectForm />
      <div className="grid grid-cols-3 gap-4">
        {projects.length === 0 && <p className="text-muted">Belum ada project.</p>}
        {projects.map((project) => (
          <Card key={project.id}>
            <div className="mb-2 flex items-center justify-between">
              <span className="font-medium">{project.name}</span>
              <span className="rounded-full bg-surface-hover px-2 py-0.5 text-xs text-muted">
                {statusLabel[project.status] ?? project.status}
              </span>
            </div>
            <div className="mb-1 h-1.5 w-full rounded-full bg-surface-hover">
              <div className="h-1.5 rounded-full bg-accent" style={{ width: `${project.progress}%` }} />
            </div>
            <p className="text-xs text-muted">{project.progress}% selesai</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
