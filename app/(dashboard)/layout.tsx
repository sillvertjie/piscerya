import Link from "next/link";
import { getSessionOrRedirect } from "@/lib/session";
import { LogoutButton } from "@/components/ui/LogoutButton";
import { auth } from "@/lib/auth";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/tasks", label: "Tasks" },
  { href: "/knowledge", label: "Knowledge" },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await getSessionOrRedirect();
  const session = await auth();

  return (
    <div className="flex min-h-screen">
      <aside className="flex w-56 shrink-0 flex-col border-r border-border bg-surface p-4">
        <div className="mb-6 px-2 text-lg font-semibold">Piscerya</div>
        <nav className="flex flex-1 flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm text-muted hover:bg-surface-hover hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-border pt-3">
          <p className="mb-1 truncate px-3 text-xs text-muted">{session?.user?.email}</p>
          <LogoutButton />
        </div>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
