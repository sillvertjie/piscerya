import { listProjectsByWorkspace } from "@/modules/projects/project.service";
import { ProjectForm } from "./ProjectForm";
import { ProjectItem } from "./ProjectItem";

const DEV_WORKSPACE_ID = "dev-workspace";

export default async function ProjectsPage() {
  const projects = await listProjectsByWorkspace(DEV_WORKSPACE_ID).catch(() => []);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Projects</h1>
      <ProjectForm />
      <div className="grid grid-cols-3 gap-4">
        {projects.length === 0 && <p className="text-muted">Belum ada project.</p>}
        {projects.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
