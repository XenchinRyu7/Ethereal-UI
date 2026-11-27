# Contributing to Ethereal UI

First of all, thank you for considering contributing to **Ethereal UI**! 🎉  
Ethereal UI is an open-source, accessible React UI library built on Radix UI primitives, Tailwind CSS v4, dynamic multi-theme engine, and high-density agentic/dashboard blocks.

Contributions from developers around the world make this library better for everyone.

---

## 📜 Golden Rules for Contributing (Aturan Utama)

Sebelum mulai menulis kode atau mengirimkan Pull Request, pastikan kamu memahami aturan fundamental berikut:

### 1. Wajib Buat Branch Sendiri (Do NOT Push directly to `main`)
- **DILARANG KERAS** melakukan commit langsung ke branch `main`.
- Selalu buat branch baru dari branch `main` terbaru:
  - `feat/<fitur-atau-komponen>` &mdash; untuk penambahan komponen atau fitur baru (contoh: `feat/radial-slider`)
  - `fix/<nama-bug>` &mdash; untuk perbaikan bug / styling (contoh: `fix/input-contrast-border`)
  - `docs/<topik>` &mdash; untuk pembaruan dokumentasi atau contoh (contoh: `docs/contributing-guide`)
  - `refactor/<modul>` &mdash; untuk refactoring kode tanpa mengubah API publik

### 2. Gunakan `pnpm` Package Manager
- Monorepo ini menggunakan **`pnpm`** (v9+) dan **Turborepo**.
- Jangan gunakan `npm install` atau `yarn install` karena akan merusak file `pnpm-lock.yaml`.

### 3. Wajib Lolos Lint & Build 100%
Sebelum membuat Pull Request, pastikan perintah berikut lolos tanpa error:
```bash
pnpm turbo run lint && pnpm turbo run build
```
- TypeScript harus lolos validasi strict mode (`tsc --noEmit`).
- Pastikan tidak ada missing import atau type error.

### 4. Format Commit Message (Conventional Commits)
Gunakan standar Conventional Commits:
- `feat(ui): add new RangeSlider primitive component`
- `fix(blocks): resolve login form password visibility toggle`
- `docs: add contributing guidelines and community hub`
- `refactor(charts): optimize candlestick SVG wick rendering`

### 5. Standar Kode & Anti-Slop
- Tulis kode yang rapi, ringkas, dan bertujuan jelas.
- Hindari boilerplate AI generik yang tidak berguna atau komentar berlebihan.
- Pastikan komponen kompatibel dengan **Light Mode** dan **Dark Mode** secara sempurna dengan kontras yang jelas.
- Dukung aksesibilitas (WAI-ARIA, keyboard navigation, focus indicators).

---

## 🚀 Step-by-Step Contribution Workflow

Berikut adalah langkah lengkap dari awal sampai PR kamu dimerge:

### Langkah 1: Fork Repository
1. Kunjungi repository resmi: [https://github.com/XenchinRyu7/Ethereal-UI](https://github.com/XenchinRyu7/Ethereal-UI)
2. Klik tombol **Fork** di pojok kanan atas untuk menduplikasi ke akun GitHub kamu.

### Langkah 2: Clone ke Mesin Lokal
```bash
# Clone fork milikmu
git clone https://github.com/<username-kamu>/Ethereal-UI.git
cd Ethereal-UI

# Tambahkan upstream repository resmi
git remote add upstream https://github.com/XenchinRyu7/Ethereal-UI.git
```

### Langkah 3: Install Dependencies
```bash
pnpm install
```

### Langkah 4: Buat Branch Baru
Selalu sinkronkan dengan `main` terbaru sebelum membuat branch:
```bash
git checkout main
git pull upstream main
git checkout -b feat/nama-komponen-kamu
```

### Langkah 5: Jalankan Dev Server
Jalankan dev server dokumentasi untuk melihat preview komponen secara live:
```bash
pnpm dev
```
Buka browser di `http://localhost:4321`.

---

## 🧩 Panduan Menambahkan Komponen Baru

Struktur monorepo Ethereal UI terdiri dari:
- `packages/ui` &mdash; Library komponen React utama (`@etherealui/react`).
- `packages/cli` &mdash; CLI tool (`npx @etherealui/cli add <component>`).
- `apps/docs` &mdash; Situs dokumentasi interaktif Astro + Tailwind v4.

### 1. Buat File Komponen
- Jika komponen merupakan **Base Primitive**: letakkan di `packages/ui/src/primitives/<component-name>.tsx`.
- Jika komponen merupakan **Composite Block**: letakkan di `packages/ui/src/blocks/<component-name>.tsx`.
- Jika komponen merupakan **Chart**: tambahkan di `packages/ui/src/primitives/chart.tsx`.

Gunakan pattern standar:
```tsx
import * as React from "react"
import { cn } from "../utils/cn"

export interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "primary"
}

export const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border border-input bg-background p-4 text-foreground transition-colors",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
MyComponent.displayName = "MyComponent"
```

### 2. Export di Index
Daftarkan komponen baru kamu di:
`packages/ui/src/index.ts`
```ts
export { MyComponent, type MyComponentProps } from "./primitives/my-component"
```

### 3. Daftarkan ke Registry Catalog
Agar komponen muncul di dokumentasi web dan bisa diinstall via CLI, daftarkan metadata komponen di:
`apps/docs/src/data/registry-catalog.ts`

---

## 🧪 Validasi Sebelum Pull Request

Sebelum melakukan push, jalankan test suite dan build:
```bash
# 1. Lint across monorepo
pnpm turbo run lint

# 2. Build library, CLI, and docs
pnpm turbo run build
```
Pastikan seluruh 3 packages (`@etherealui/react`, `@etherealui/cli`, `docs`) berstatus **successful**.

---

## 📤 Mengirimkan Pull Request (PR)

1. Commit perubahan kamu dengan format Conventional Commit:
   ```bash
   git add .
   git commit -m "feat(ui): add MyComponent with accessible keyboard controls"
   ```
2. Push branch ke fork kamu:
   ```bash
   git push origin feat/nama-komponen-kamu
   ```
3. Buka GitHub fork kamu, lalu klik **Compare & pull request**.
4. Isi template PR dengan jelas:
   - **Deskripsi Perubahan**: jelaskan apa yang dibuat atau diperbaiki.
   - **Screenshot / Video**: sertakan screenshot Light & Dark mode jika ada perubahan visual UI.
   - **Related Issues**: cantumkan nomor issue jika berkaitan (contoh: `Fixes #42`).
5. Tunggu proses review dari maintainer (**@XenchinRyu7**). Tim akan mereview dan memberikan feedback jika ada yang perlu disesuaikan.

---

## 💬 Komunitas & Bantuan

- **Repository**: [https://github.com/XenchinRyu7/Ethereal-UI](https://github.com/XenchinRyu7/Ethereal-UI)
- **Issues & Bug Report**: [https://github.com/XenchinRyu7/Ethereal-UI/issues](https://github.com/XenchinRyu7/Ethereal-UI/issues)
- **Discussions & Ideas**: [https://github.com/XenchinRyu7/Ethereal-UI/discussions](https://github.com/XenchinRyu7/Ethereal-UI/discussions)
- **Creator Profile**: [@XenchinRyu7](https://github.com/XenchinRyu7)

Terima kasih atas kontribusi dan dukunganmu untuk ekosistem open-source Ethereal UI! 🚀
