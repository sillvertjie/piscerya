"use client";

import { signOut } from "next-auth/react";

export function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="w-full rounded-md px-3 py-2 text-left text-sm text-muted hover:bg-surface-hover hover:text-foreground"
    >
      Keluar
    </button>
  );
}
