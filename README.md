# Piscerya

Rebuild dari `Raksa` lama dengan prinsip: **jangan tambah kompleksitas sebelum
benar-benar dibutuhkan.** Lihat `ARCHITECTURE.md` di project lama (atau chat
sebelumnya) untuk alasan lengkap kenapa struktur ini dipilih.

## Struktur

```
app/
  (dashboard)/     → halaman UI (Home, Tasks, dst)
  api/              → route handler tipis, panggil modules/*.service.ts
modules/
  tasks/            → contoh pola: types.ts + service.ts + test.ts (3 file, tidak lebih)
components/ui/      → primitive UI (Button, Card)
lib/db.ts           → Prisma client singleton
prisma/schema.prisma → skema database (final v1, single-user)
```

## Cara jalan

```bash
npm install
cp .env.example .env   # isi DATABASE_URL
npx prisma migrate dev --name init
npm run dev
```

## Menambah modul baru

Ikuti pola `modules/tasks/`:

1. `modules/<nama>/<nama>.types.ts` — zod schema + type
2. `modules/<nama>/<nama>.service.ts` — business logic, panggil `db` langsung
3. `modules/<nama>/<nama>.service.test.ts` atau `*.types.test.ts`
4. `app/api/<nama>/route.ts` — tipis, cuma parsing request + panggil service

Jangan buat `repository/`, `command/`, `handler/`, `contract/` terpisah kecuali
benar-benar ada kebutuhan nyata (lihat `ARCHITECTURE.md`).

## Status

Ini kerangka awal (scaffold), bukan aplikasi lengkap. Modul yang sudah jadi
contoh penuh: **Tasks** (types, service, test, API route, halaman UI). Modul
lain (Projects, Knowledge, Notes, Search, AI Assistant) belum dibuat — tinggal
replikasi pola yang sama.
