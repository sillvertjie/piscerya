import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

type SessionData = { userId: string; workspaceId: string };

/** Dipakai di server component (page). Redirect ke /login kalau belum login. */
export async function getSessionOrRedirect(): Promise<SessionData> {
  const session = await auth();

  if (!session?.user?.id || !session.user.workspaceId) {
    redirect("/login");
  }

  return { userId: session.user.id, workspaceId: session.user.workspaceId };
}

/** Dipakai di API route. Return null kalau belum login (route yang urus response 401). */
export async function getSessionForApi(): Promise<SessionData | null> {
  const session = await auth();

  if (!session?.user?.id || !session.user.workspaceId) {
    return null;
  }

  return { userId: session.user.id, workspaceId: session.user.workspaceId };
}
