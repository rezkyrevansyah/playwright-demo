# 🎭 Playwright Demo — TodoMVC E2E Testing

> 📖 **Ingin memahami project ini dari nol?**
> Baca artikel tutorial lengkapnya di sini:
> **[Playwright untuk Pemula: Panduan Lengkap E2E Testing](https://github.com/rezkyrevansyah/playwright-demo/blob/main/medium_article_playwright.md)**

Proyek ini berisi contoh **End-to-End (E2E) testing** menggunakan [Playwright](https://playwright.dev/) dengan TypeScript. Target aplikasi yang ditest adalah [TodoMVC React](https://todomvc.com/examples/react/dist/).

---

## 📋 Prasyarat

Pastikan kamu sudah menginstall:

- **Node.js** versi 18 atau lebih baru — [Download di sini](https://nodejs.org)

Cek versi Node.js kamu:

```bash
node --version
```

---

## 🚀 Cara Menjalankan Project Ini

### Langkah 1 — Clone atau Download Project

```bash
git clone <url-repository-ini>
cd playwright-demo
```

Atau jika sudah punya foldernya, masuk ke direktori project:

```bash
cd playwright-demo
```

### Langkah 2 — Install Dependensi

```bash
npm install
```

Perintah ini akan menginstall semua library yang dibutuhkan (termasuk `@playwright/test`).

### Langkah 3 — Install Browser Playwright

```bash
npx playwright install chromium
```

Playwright menggunakan browser tersendiri yang terpisah dari Chrome di komputer kamu. Perintah ini mengunduh Chromium yang dibutuhkan.

### Langkah 4 — Jalankan Semua Test

```bash
npx playwright test
```

Kamu akan melihat output seperti ini:

```
Running 10 tests using 5 workers

  ✓  should load the app correctly (2.1s)
  ✓  should add a new todo item (1.8s)
  ✓  should add multiple todo items (2.3s)
  ✓  should mark a todo as completed (1.9s)
  ✓  should delete a todo item (2.0s)
  ✓  should show footer when there is at least one todo (1.7s)
  ✓  should filter active todos (2.4s)
  ✓  should filter completed todos (2.5s)
  ✓  should clear completed todos (2.2s)
  ✓  should toggle all todos at once (2.1s)

  10 passed (8.3s)
```

---

## 🧪 Perintah Test Lainnya

| Perintah                                 | Deskripsi                                                   |
| ---------------------------------------- | ----------------------------------------------------------- |
| `npx playwright test`                    | Jalankan semua test (headless / tanpa browser terlihat)     |
| `npx playwright test --headed`           | Jalankan dengan browser **terlihat** (bagus untuk belajar!) |
| `npx playwright test --ui`               | Buka **UI interaktif** Playwright                           |
| `npx playwright test --reporter=html`    | Jalankan test & buat laporan HTML                           |
| `npx playwright show-report`             | Buka laporan HTML dari run terakhir                         |
| `npx playwright test --grep "filter"`    | Jalankan test yang namanya mengandung "filter"              |
| `npx playwright test tests/todo.spec.ts` | Jalankan file test tertentu saja                            |

---

## 👀 Melihat Test Berjalan (Mode Visual)

Ingin melihat browser bekerja secara nyata? Jalankan dengan flag `--headed`:

```bash
npx playwright test --headed
```

Atau buka UI interaktif yang memungkinkan kamu menjalankan test satu per satu:

```bash
npx playwright test --ui
```

---

## 📊 Melihat Laporan Hasil Test

Setelah menjalankan test dengan reporter HTML, buka laporannya:

```bash
npx playwright test --reporter=html
npx playwright show-report
```

Laporan ini menampilkan:

- ✅ / ❌ Status setiap test
- ⏱️ Waktu eksekusi
- 📸 Screenshot saat test gagal
- 🎬 Video rekaman eksekusi (jika ada yang gagal)

---

## 🗂️ Struktur Project

```
playwright-demo/
├── tests/
│   └── todo.spec.ts       # 10 test case E2E
├── test-results/           # Screenshot & video (otomatis dibuat saat ada test gagal)
├── playwright-report/      # Laporan HTML (otomatis dibuat)
├── playwright.config.ts    # Konfigurasi Playwright
└── package.json
```

---

## ⚙️ Konfigurasi

Konfigurasi ada di [`playwright.config.ts`](./playwright.config.ts):

- **Browser:** Chromium (Desktop Chrome)
- **Mode:** Headless (browser tidak terlihat) — ubah ke `headless: false` untuk melihat browser
- **Screenshot:** Diambil otomatis hanya saat test gagal
- **Video:** Direkam otomatis hanya saat test gagal

---

## 📝 Daftar Test Case

| #   | Nama Test                                            | Skenario yang Diuji                                |
| --- | ---------------------------------------------------- | -------------------------------------------------- |
| 1   | `should load the app correctly`                      | Halaman berhasil dimuat & input muncul             |
| 2   | `should add a new todo item`                         | Tambah satu todo baru                              |
| 3   | `should add multiple todo items`                     | Tambah beberapa todo sekaligus                     |
| 4   | `should mark a todo as completed`                    | Centang todo sebagai selesai                       |
| 5   | `should delete a todo item`                          | Hapus satu todo                                    |
| 6   | `should show footer when there is at least one todo` | Footer muncul dengan counter                       |
| 7   | `should filter active todos`                         | Filter "Active" hanya tampilkan todo belum selesai |
| 8   | `should filter completed todos`                      | Filter "Completed" hanya tampilkan todo selesai    |
| 9   | `should clear completed todos`                       | Tombol "Clear completed" menghapus todo selesai    |
| 10  | `should toggle all todos at once`                    | Toggle semua todo sekaligus                        |

---

## 🔧 Troubleshooting

**Test gagal karena timeout?**
Coba tingkatkan nilai timeout di `playwright.config.ts`:

```typescript
use: {
  actionTimeout: 30000,  // 30 detik per aksi
}
```

**Browser tidak terinstall?**

```bash
npx playwright install
```

**Error `Cannot find module '@playwright/test'`?**

```bash
npm install
```

---

## 📚 Referensi

- [Dokumentasi Playwright](https://playwright.dev/docs/intro)
- [TodoMVC (Aplikasi Target)](https://todomvc.com)
- [📖 Tutorial Lengkap — Baca Artikel Lengkapnya di sini](https://github.com/rezkyrevansyah/playwright-demo/blob/main/medium_article_playwright.md)

---

> Dibuat sebagai demo untuk artikel tutorial Playwright di Medium 🚀
