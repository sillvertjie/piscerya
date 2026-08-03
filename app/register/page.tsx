"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Gagal mendaftar");
      return;
    }

    router.push("/login");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-lg border border-border bg-surface p-6"
      >
        <h1 className="mb-6 text-xl font-semibold">Buat akun Piscerya</h1>

        <div className="mb-3 flex flex-col gap-1">
          <label className="text-sm text-muted">Nama</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
          />
        </div>

        <div className="mb-3 flex flex-col gap-1">
          <label className="text-sm text-muted">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
          />
        </div>

        <div className="mb-4 flex flex-col gap-1">
          <label className="text-sm text-muted">Password (min. 8 karakter)</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
          />
        </div>

        {error && <p className="mb-3 text-sm text-danger">{error}</p>}

        <Button type="submit" disabled={loading} className="w-full justify-center">
          {loading ? "Mendaftar..." : "Daftar"}
        </Button>

        <p className="mt-4 text-center text-sm text-muted">
          Sudah punya akun?{" "}
          <a href="/login" className="text-accent hover:underline">
            Masuk
          </a>
        </p>
      </form>
    </div>
  );
}
