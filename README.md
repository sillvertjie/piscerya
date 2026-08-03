# Piscerya

AI Workspace Platform — rebuild dari `Raksa` lama dengan prinsip: **jangan
tambah kompleksitas sebelum benar-benar dibutuhkan.**

## Tech Stack

- **Next.js 16** (App Router, Turbopack)
- **TypeScript**
- **Tailwind CSS v4**
- **Prisma** + **PostgreSQL** (Neon)
- **Zod** — validasi
- **Vitest** — testing

## Struktur

app/
(dashboard)/ → halaman UI (Home, Tasks, Projects, Knowledge)
api/ → route handler tipis, panggil modules/\*.service.ts
modules/
tasks/ → types.ts + service.ts + test.ts
projects/ → pola sama
knowledge/ → pola sama
components/ui/ → primitive UI (Button, Card)
lib/db.ts → Prisma client singleton
lib/utils.ts → helper bersama (mis. slugify)
prisma/schema.prisma → skema database (single-user, v1)
prisma/seed.ts → seed dev user & workspace awal

## Setup

```bash
npm install
cp .env.example .env
```

Isi `.env` dengan connection string dari Neon (atau Postgres lain). Neon
butuh **2 connection string berbeda**:

- `DATABASE_URL` — pooled connection (hostname ada `-pooler`), dipakai
  aplikasi saat runtime.
- `DIRECT_URL` — unpooled/direct connection (hostname **tanpa** `-pooler`),
  dipakai khusus untuk migrasi (`prisma migrate`) dan seed.

Tambahkan `&connect_timeout=30` di akhir kedua URL — Neon free tier
auto-suspend compute saat idle, jadi butuh waktu lebih untuk "bangun" saat
koneksi pertama.

```bash
npx prisma migrate dev
npx prisma db seed
npm run dev
```

Buka `http://localhost:3000`.

## Scripts

```bash
npm run dev         # jalankan dev server
npm run typecheck   # tsc --noEmit
npm run lint        # eslint
npm run test        # vitest
npm run check       # lint + typecheck + test sekaligus
```

## Prinsip arsitektur

- **Route handler tipis** (`app/api/**/route.ts`) — cuma parsing request lalu
  panggil fungsi di `modules/*/**.service.ts`. Tidak ada logic di sini.
- **Service function panggil Prisma langsung** — tidak ada layer
  repository/command/handler/contract terpisah, kecuali benar-benar ada
  kebutuhan nyata (misal butuh >1 sumber data, atau butuh audit trail
  sungguhan). Tambahkan layer itu saat dibutuhkan, bukan di depan.
- **1 domain fitur = maksimal 3 file**: `<nama>.types.ts` (zod schema),
  `<nama>.service.ts` (logic + Prisma), `<nama>.types.test.ts` (test).

## Menambah modul baru

Ikuti pola `modules/tasks/` (atau `projects/`, `knowledge/`):

1. `modules/<nama>/<nama>.types.ts` — zod schema + type
2. `modules/<nama>/<nama>.service.ts` — business logic, panggil `db` langsung
3. `modules/<nama>/<nama>.types.test.ts` — test validasi
4. `app/api/<nama>/route.ts` + `app/api/<nama>/[id]/route.ts` — tipis, cuma
   parsing request + panggil service
5. `app/(dashboard)/<nama>/page.tsx` + `<Nama>Form.tsx` — halaman list + form create

## Status

**Sudah ada dan berfungsi penuh** (list + create dari UI, tersambung ke
database sungguhan):

- Tasks
- Projects
- Knowledge Base

**Belum ada:**

- Autentikasi asli — `DEV_USER_ID`/`DEV_WORKSPACE_ID` masih hardcoded di
  service & form (lihat komentar `TODO` di masing-masing file). Semua data
  saat ini milik 1 user/workspace dev yang dibuat lewat `prisma/seed.ts`.
- Edit & delete dari UI (API-nya sudah ada — `PATCH`/`DELETE` — tinggal
  form/tombolnya di halaman)
- Collections, AI Assistant, Notes, Global Search
- Halaman Home masih placeholder (belum ada widget statistik/AI Insight
  sesuai mockup)

## Dokumentasi lain

Belum ada dokumen selain README ini. Kalau nanti dibutuhkan (misal keputusan
desain besar yang sulit dibalik), akan dibuat baru sesuai implementasi yang
sudah diterapkan atau rencana konkret berikutnya — bukan ditulis di depan
sebagai spekulasi.
