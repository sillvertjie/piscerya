import { Card } from "@/components/ui/Card";

export default function HomePage() {
  return (
    <div>
      <h1 className="mb-1 text-2xl font-semibold">Good evening 👋</h1>
      <p className="mb-6 text-muted">
        Ini kerangka awal — halaman ini akan diisi widget statistik & AI
        Insight sesuai desain mockup pada tahap berikutnya.
      </p>
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <p className="text-sm text-muted">Projects</p>
          <p className="text-2xl font-semibold">—</p>
        </Card>
        <Card>
          <p className="text-sm text-muted">Tasks</p>
          <p className="text-2xl font-semibold">—</p>
        </Card>
        <Card>
          <p className="text-sm text-muted">Knowledge</p>
          <p className="text-2xl font-semibold">—</p>
        </Card>
      </div>
    </div>
  );
}
