"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Email atau password salah");
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-lg border border-border bg-surface p-6"
      >
        <h1 className="mb-6 text-xl font-semibold">Masuk ke Piscerya</h1>

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
          <label className="text-sm text-muted">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
          />
        </div>

        {error && <p className="mb-3 text-sm text-danger">{error}</p>}

        <Button type="submit" disabled={loading} className="w-full justify-center">
          {loading ? "Masuk..." : "Masuk"}
        </Button>

        <p className="mt-4 text-center text-sm text-muted">
          Belum punya akun?{" "}
          <a href="/register" className="text-accent hover:underline">
            Daftar
          </a>
        </p>
      </form>
    </div>
  );
}
