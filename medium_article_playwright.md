# Playwright untuk Pemula: Panduan Lengkap E2E Testing dari Nol hingga Melihat Hasil Test (2025)

> **Meta Description:** Pelajari Playwright dari nol — instalasi, konfigurasi, penulisan test case, dan melihat laporan visual. Tutorial berbahasa Indonesia khusus pemula dengan penjelasan setiap baris kode secara detail.

---

**Tags:** `Playwright` `End-to-End Testing` `Software Testing` `TypeScript` `Tutorial Indonesia` `QA Engineering` `Automation Testing` `JavaScript Testing`

---

## Pendahuluan

Apakah kamu pernah menghabiskan berjam-jam melakukan *manual testing* — mengklik tombol, mengisi form, memeriksa hasilnya — hanya untuk menemukan bahwa perubahan kode baru merusak fitur lama? Itulah masalah yang diselesaikan oleh *end-to-end (E2E) testing*.

**Playwright** adalah framework automation testing modern dari Microsoft. Dibandingkan tool lama seperti Selenium, Playwright jauh lebih cepat, lebih stabil, dan mendukung semua browser utama (Chromium, Firefox, WebKit) dari satu codebase.

Dalam tutorial ini (khusus pemula!), kita akan:
1. Membuat project Playwright dari nol
2. Memahami **setiap baris kode** yang kita tulis
3. Menulis 10 test case nyata untuk aplikasi TodoMVC
4. Menjalankan test dan melihat laporan visual hasilnya

---

## Daftar Isi

1. [Apa itu Playwright?](#apa-itu-playwright)
2. [Persiapan & Instalasi](#persiapan--instalasi)
3. [Struktur Project](#struktur-project)
4. [Konfigurasi Playwright — Baris per Baris](#konfigurasi-playwright--baris-per-baris)
5. [Bedah Kode: Fungsi-Fungsi Playwright](#bedah-kode-fungsi-fungsi-playwright)
6. [Menulis 10 Test Case — dengan Penjelasan](#menulis-10-test-case--dengan-penjelasan)
7. [Menjalankan Test](#menjalankan-test)
8. [Melihat Laporan Hasil Test](#melihat-laporan-hasil-test)
9. [Tips & Best Practices](#tips--best-practices)
10. [Kesimpulan](#kesimpulan)

---

## Apa itu Playwright?

Playwright adalah library open-source yang mengotomatiskan interaksi browser. Bayangkan kamu punya "robot" yang bisa membuka browser, mengklik tombol, mengisi form, dan memeriksa hasilnya — itulah Playwright.

### Kenapa Playwright, bukan yang lain?

| Fitur | Playwright | Selenium | Cypress |
|---|---|---|---|
| Multi-browser (Chrome, FF, Safari) | ✅ | ✅ | ⚠️ terbatas |
| Auto-wait built-in | ✅ | ❌ | ✅ |
| TypeScript native | ✅ | ⚠️ | ✅ |
| Parallel test execution | ✅ | ⚠️ | ⚠️ |
| HTML Reporter visual | ✅ | ❌ | ✅ |
| Kecepatan eksekusi | 🚀 Sangat Cepat | 🐢 Lambat | 🏃 Sedang |
| Test cross-domain | ✅ | ✅ | ❌ |

---

## Persiapan & Instalasi

### Prasyarat

- **Node.js** versi 18+ → [nodejs.org](https://nodejs.org)
- **VS Code** + extension [Playwright Test for VSCode](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)

```bash
# Cek versi Node.js kamu
node --version
# Contoh output: v20.11.0
```

### Langkah 1: Buat Folder Project

```bash
mkdir playwright-demo
cd playwright-demo
```

> **Penjelasan:** `mkdir` = "make directory" (buat folder baru). `cd` = "change directory" (masuk ke folder tersebut).

### Langkah 2: Inisialisasi Node.js Project

```bash
npm init -y
```

> **Penjelasan:** Perintah ini membuat file [package.json](file:///d:/projects/playwright-demo/package.json) yang berfungsi sebagai "KTP" project kamu — menyimpan nama project, versi, dan daftar semua library yang digunakan. Flag `-y` berarti "yes to all defaults" sehingga kamu tidak perlu menjawab pertanyaan satu per satu.

### Langkah 3: Install Playwright

```bash
npm install --save-dev @playwright/test @types/node
```

> **Penjelasan:**
> - `npm install` = perintah untuk mengunduh dan menginstall library
> - `--save-dev` = library ini hanya dibutuhkan saat development/testing, tidak untuk production
> - `@playwright/test` = package utama Playwright
> - `@types/node` = definisi tipe TypeScript untuk Node.js (membantu autocomplete di VS Code)

```bash
npx playwright install chromium
```

> **Penjelasan:** Mengunduh browser Chromium yang akan digunakan Playwright untuk menjalankan test. Browser ini dikelola Playwright sendiri, terpisah dari Chrome yang kamu install di komputer.

---

## Struktur Project

```
playwright-demo/
├── node_modules/           ← Library yang terinstall (jangan disentuh!)
├── tests/
│   └── todo.spec.ts        ← File test kita
├── test-results/           ← Screenshot & video (otomatis dibuat)
├── playwright-report/      ← Laporan HTML visual (otomatis dibuat)
├── package.json            ← Informasi project & daftar dependensi
└── playwright.config.ts    ← Konfigurasi Playwright
```

```bash
# Buat folder tests
mkdir tests
```

---

## Konfigurasi Playwright — Baris per Baris

Buat file [playwright.config.ts](file:///d:/projects/playwright-demo/playwright.config.ts) di root project dan isi dengan kode berikut. Setiap baris dijelaskan detail:

```typescript
import { defineConfig, devices } from '@playwright/test';
```
> **Penjelasan:** Mengimpor fungsi `defineConfig` dan objek `devices` dari library Playwright.
> - `defineConfig` → fungsi pembungkus konfigurasi yang memberikan autocomplete di VS Code
> - `devices` → kumpulan preset konfigurasi browser (ukuran layar, user-agent, dll)

```typescript
export default defineConfig({
```
> **Penjelasan:** `export default` berarti kita "mengekspor" konfigurasi ini agar bisa dibaca oleh Playwright saat menjalankan test.

```typescript
  testDir: './tests',
```
> **Penjelasan:** Memberitahu Playwright di mana mencari file-file test. `./tests` artinya folder `tests` di direktori yang sama dengan file config ini. Semua file berekstensi [.spec.ts](file:///d:/projects/playwright-demo/tests/todo.spec.ts) di dalamnya akan otomatis dijalankan.

```typescript
  fullyParallel: true,
```
> **Penjelasan:** Jalankan semua test secara **bersamaan (paralel)**, bukan satu per satu. Ini membuat keseluruhan test selesai jauh lebih cepat. Analoginya: daripada memasak 10 hidangan secara bergantian, kita masak semuanya di kompor berbeda sekaligus.

```typescript
  retries: 0,
```
> **Penjelasan:** Berapa kali Playwright mencoba ulang test yang gagal secara otomatis. Nilai `0` berarti tidak ada retry — jika test gagal, langsung dicatat sebagai gagal. Untuk CI/CD di production, biasanya diset ke `2`.

```typescript
  use: {
    baseURL: 'https://todomvc.com/examples/react/dist/',
```
> **Penjelasan:** URL dasar aplikasi yang akan ditest. Jika kamu menulis `page.goto('/')` di dalam test, Playwright akan otomatis menggabungkannya menjadi URL lengkap. Ini berguna agar kamu tidak perlu mengetik URL panjang di setiap test.

```typescript
    headless: true,
```
> **Penjelasan:**
> - `true` → browser berjalan **tanpa tampilan visual** (lebih cepat, cocok untuk CI/CD)
> - `false` → browser **terbuka dan terlihat** (cocok untuk debugging, kamu bisa melihat apa yang dilakukan Playwright)
>
> Saat pertama belajar, coba set ke `false` agar kamu bisa menyaksikan Playwright bekerja!

```typescript
    screenshot: 'only-on-failure',
```
> **Penjelasan:** Kapan Playwright mengambil screenshot otomatis:
> - `'only-on-failure'` → screenshot hanya saat test gagal (berguna untuk debugging)
> - `'on'` → screenshot di setiap test
> - `'off'` → tidak pernah screenshot

```typescript
    video: 'retain-on-failure',
```
> **Penjelasan:** Kapan Playwright merekam video eksekusi test:
> - `'retain-on-failure'` → simpan video hanya jika test gagal
> - `'on'` → selalu rekam
> - `'off'` → tidak pernah rekam

```typescript
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
```
> **Penjelasan:** Daftar browser yang akan digunakan untuk menjalankan test. Kita hanya menggunakan Chromium (basis Chrome). `...devices['Desktop Chrome']` menggunakan spread operator `...` untuk menyalin semua setting dari preset "Desktop Chrome" bawaan Playwright (ukuran layar 1280x720, user-agent Chrome, dll).

---

## Bedah Kode: Fungsi-Fungsi Playwright

Sebelum menulis test, mari kita pahami semua fungsi Playwright yang akan kita gunakan. Ini adalah bagian terpenting untuk pemula!

---

### 📦 `import { test, expect } from '@playwright/test'`

```typescript
import { test, expect } from '@playwright/test';
```

**Fungsi:** Mengimpor dua "alat utama" dari Playwright:
- `test` → untuk mendefinisikan satu test case
- `expect` → untuk memverifikasi apakah kondisi sesuai harapan (assertion)

Analoginya seperti membawa peralatan masak sebelum mulai memasak.

---

### 🗂️ `test.describe()`

```typescript
test.describe('TodoMVC App', () => {
  // semua test ada di sini
});
```

**Fungsi:** Mengelompokkan beberapa test yang saling berkaitan ke dalam satu "wadah" bernama.

**Parameter:**
- Parameter pertama (`'TodoMVC App'`) → nama grup test (bebas ditulis apa saja)
- Parameter kedua (`() => { ... }`) → *arrow function* yang berisi semua test di dalam grup ini

**Kenapa penting?** Agar laporan test lebih terorganisir. Daripada melihat 10 test acak, kamu melihat grup berlabel "TodoMVC App" yang berisi 10 test terstruktur.

---

### 🔄 `test.beforeEach()`

```typescript
test.beforeEach(async ({ page }) => {
  await page.goto('https://todomvc.com/examples/react/dist/');
  await page.getByTestId('text-input').waitFor({ state: 'visible', timeout: 15000 });
});
```

**Fungsi:** Hook yang dijalankan **otomatis sebelum setiap test** di dalam `describe` yang sama.

**Kenapa digunakan?** Agar kita tidak perlu menulis kode yang sama berulang-ulang di setiap test. Dalam contoh ini, setiap test butuh membuka halaman TodoMVC terlebih dahulu, jadi kita taruh di `beforeEach`.

**Parameter `{ page }`:** Ini adalah *destructuring* dari objek fixtures Playwright. `page` adalah objek yang merepresentasikan satu tab browser — semua interaksi browser dilakukan melalui objek ini.

**Kata kunci `async` dan `await`:**
- `async` → menandai fungsi ini berjalan secara asynchronous (tidak menunggu selesai sebelum lanjut)
- `await` → "hei, tunggu sampai baris ini selesai sebelum lanjut ke baris berikutnya"

Ini penting karena membuka browser dan mengklik elemen butuh waktu. Tanpa `await`, Playwright akan langsung lanjut ke baris berikutnya sebelum browser selesai memuat halaman.

---

### 🌐 `page.goto(url)`

```typescript
await page.goto('https://todomvc.com/examples/react/dist/');
```

**Fungsi:** Memerintahkan browser untuk membuka URL yang diberikan. Mirip dengan mengetik URL di address bar browser.

**Parameter:**
- `url` (string) → alamat website yang ingin dibuka

**Playwright otomatis menunggu** halaman selesai dimuat sebelum melanjutkan ke baris berikutnya (network idle).

---

### 🔍 `page.getByTestId(testId)`

```typescript
page.getByTestId('text-input')
page.getByTestId('todo-list')
page.getByTestId('todo-item')
```

**Fungsi:** Mencari elemen HTML berdasarkan atribut `data-testid`. Ini adalah cara **paling direkomendasikan** untuk menemukan elemen dalam Playwright.

**Mengapa `data-testid`?**

Pada HTML, elemen bisa dicari berdasarkan ID, class, teks, atau atribut khusus. Tapi class CSS bisa berubah saat desainer merombak tampilan, dan teks bisa berubah karena lokalisasi. Atribut `data-testid` dibuat **khusus untuk testing** dan tidak akan berubah meski tampilan diupdate.

Contoh HTML yang di-target:
```html
<!-- Elemen dengan data-testid="text-input" -->
<input data-testid="text-input" placeholder="What needs to be done?" />
```

---

### ✍️ `.fill(text)`

```typescript
await page.getByTestId('text-input').fill('Belajar Playwright');
```

**Fungsi:** Mengisi input field dengan teks yang diberikan. Ini menggantikan isi input sebelumnya (beda dengan `.type()` yang mengetik karakter satu per satu).

**Parameter:**
- `text` (string) → teks yang akan dimasukkan ke dalam input

**Analoginya** seperti meng-highlight semua teks di kolom input lalu mengetik teks baru.

---

### ⌨️ `page.keyboard.press(key)`

```typescript
await page.keyboard.press('Enter');
```

**Fungsi:** Mensimulasikan penekanan tombol keyboard.

**Parameter:**
- `key` (string) → nama tombol yang ditekan. Contoh: `'Enter'`, `'Tab'`, `'Escape'`, `'ArrowDown'`, `'Control+A'`

Di aplikasi TodoMVC, menekan `Enter` setelah mengisi input akan menambahkan todo baru ke daftar — sama seperti yang dilakukan pengguna nyata.

---

### ⏳ `.waitFor({ state, timeout })`

```typescript
await page.getByTestId('text-input').waitFor({ state: 'visible', timeout: 15000 });
```

**Fungsi:** Menunggu hingga elemen mencapai kondisi tertentu sebelum melanjutkan eksekusi.

**Parameter (objek):**
- `state` → kondisi yang ditunggu:
  - `'visible'` → elemen terlihat di layar
  - `'hidden'` → elemen disembunyikan
  - `'attached'` → elemen ada di DOM (meski tidak terlihat)
  - `'detached'` → elemen dihapus dari DOM
- `timeout` → waktu maksimum dalam **milidetik** (15000ms = 15 detik). Jika kondisi tidak terpenuhi dalam waktu ini, test gagal dengan error timeout.

**Kenapa dibutuhkan?** Karena aplikasi web sering memuat data secara async. Kita perlu memastikan elemen sudah siap sebelum berinteraksi dengannya.

---

### ✅ `expect()` — Fungsi Assertion

`expect()` adalah fungsi untuk **memverifikasi** suatu kondisi. Jika kondisi tidak terpenuhi, test langsung dinyatakan **GAGAL**.

#### `expect(page).toHaveTitle(pattern)`

```typescript
await expect(page).toHaveTitle(/TodoMVC/i);
```

**Fungsi:** Memeriksa apakah judul halaman (tag `<title>`) sesuai dengan pola yang diberikan.

**Parameter:**
- `/TodoMVC/i` → *Regular Expression* (regex). Garis miring `/` adalah pembuka dan penutup regex, huruf `i` berarti *case-insensitive* (tidak peduli huruf besar/kecil). Jadi ini akan cocok dengan "TodoMVC", "todomvc", "TODOMVC", dll.

#### `expect(locator).toBeVisible()`

```typescript
await expect(page.getByTestId('text-input')).toBeVisible();
```

**Fungsi:** Memastikan elemen **terlihat** di layar (tidak hidden, tidak display:none, tidak opacity:0).

**Tidak ada parameter tambahan.**

#### `expect(locator).toContainText(text)`

```typescript
await expect(page.getByTestId('todo-list')).toContainText('Belajar Playwright');
```

**Fungsi:** Memastikan elemen mengandung teks tertentu di dalamnya (termasuk teks di dalam elemen-elemen child).

**Parameter:**
- `text` (string) → teks yang harus ada di dalam elemen

#### `expect(locator).not.toContainText(text)`

```typescript
await expect(page.getByTestId('todo-list')).not.toContainText('Todo yang dihapus');
```

**Fungsi:** Kebalikan dari `toContainText` — memastikan teks **TIDAK ADA** di dalam elemen. Kata kunci `.not` bisa dikombinasikan dengan assertion lainnya juga.

#### `expect(locator).toHaveClass(pattern)`

```typescript
await expect(page.getByTestId('todo-item').first()).toHaveClass(/completed/);
```

**Fungsi:** Memastikan elemen memiliki CSS class tertentu. Di TodoMVC, item yang sudah selesai ditandai dengan class `completed`.

---

### 🖱️ `.hover()`

```typescript
await page.getByTestId('todo-item').first().hover();
```

**Fungsi:** Mensimulasikan gerakan kursor mouse ke atas elemen (mouse hover). Berguna untuk memunculkan elemen yang hanya terlihat saat di-hover, seperti tombol hapus di TodoMVC.

---

### 🖱️ `.click()`

```typescript
await page.getByTestId('todo-item-button').click({ force: true });
```

**Fungsi:** Mengklik elemen.

**Parameter (opsional):**
- `{ force: true }` → paksa klik meskipun elemen tertutupi elemen lain. Kadang dibutuhkan untuk tombol yang hanya muncul saat di-hover.

---

### ☑️ `.check()`

```typescript
await page.getByTestId('todo-item-toggle').first().check();
```

**Fungsi:** Mencentang (check) sebuah elemen checkbox atau radio button. Jika sudah tercentang, tidak melakukan apa-apa.

**Berbeda dengan `.click()`:** `.check()` lebih semantik dan tidak akan "uncheck" jika sudah tercentang.

---

### 🔢 `.first()`, `.last()`, `.nth(index)`

```typescript
page.getByTestId('todo-item').first()   // Elemen pertama
page.getByTestId('todo-item').last()    // Elemen terakhir
page.getByTestId('todo-item').nth(0)   // Elemen ke-1 (index mulai dari 0)
page.getByTestId('todo-item').nth(1)   // Elemen ke-2
```

**Fungsi:** Memilih satu elemen tertentu dari sekumpulan elemen yang ditemukan oleh locator.

**Catatan penting:** Index di `.nth()` dimulai dari `0` (bukan `1`). Jadi `.nth(0)` adalah elemen pertama, `.nth(1)` adalah elemen kedua, dst.

---

### 🔤 `.getByRole(role, options)`

```typescript
await page.getByTestId('footer-navigation')
  .getByRole('link', { name: 'Active' }).click();
```

**Fungsi:** Mencari elemen berdasarkan **peran aksesibilitas** (ARIA role). Ini adalah cara yang sangat baik karena sekaligus memastikan aksesibilitas aplikasi kamu.

**Parameter:**
- `role` (string) → jenis elemen: `'link'`, `'button'`, `'textbox'`, `'checkbox'`, `'heading'`, dll.
- `{ name: 'Active' }` → filter tambahan berdasarkan teks atau label elemen

**Contoh di atas:** Mencari elemen `<a>` (link) dengan teks "Active" di dalam elemen footer-navigation.

---

### 📋 `test('nama test', async ({ page }) => { ... })`

```typescript
test('should add a new todo item', async ({ page }) => {
  // isi test
});
```

**Fungsi:** Mendefinisikan satu test case.

**Parameter:**
- Parameter pertama → nama/deskripsi test (gunakan nama yang jelas dan deskriptif!)
- Parameter kedua → async function yang berisi langkah-langkah test. `{ page }` adalah objek browser tab yang di-*inject* oleh Playwright secara otomatis.

**Konvensi penamaan:** Awali nama test dengan `should` untuk kejelasan. Contoh: `'should add a new todo item'` — ini jelas menggambarkan apa yang seharusnya terjadi.

---

## Menulis 10 Test Case — dengan Penjelasan

Buat file [tests/todo.spec.ts](file:///d:/projects/playwright-demo/tests/todo.spec.ts):

```typescript
import { test, expect } from '@playwright/test';

test.describe('TodoMVC App', () => {

  // ============================================================
  // SETUP: Dijalankan sebelum setiap test
  // ============================================================
  test.beforeEach(async ({ page }) => {
    // Buka halaman TodoMVC
    await page.goto('https://todomvc.com/examples/react/dist/');
    // Tunggu hingga input field muncul (max 15 detik)
    await page.getByTestId('text-input').waitFor({ state: 'visible', timeout: 15000 });
  });


  // ============================================================
  // TEST 1: Pastikan halaman berhasil dimuat
  // ============================================================
  test('should load the app correctly', async ({ page }) => {
    // Cek judul halaman mengandung kata "TodoMVC" (tidak peduli huruf besar/kecil)
    await expect(page).toHaveTitle(/TodoMVC/i);
    // Cek bahwa input field terlihat di layar
    await expect(page.getByTestId('text-input')).toBeVisible();
  });


  // ============================================================
  // TEST 2: Tambah satu todo baru
  // ============================================================
  test('should add a new todo item', async ({ page }) => {
    // Ketik teks ke dalam input field
    await page.getByTestId('text-input').fill('Belajar Playwright');
    // Tekan Enter untuk submit
    await page.keyboard.press('Enter');

    // Verifikasi: todo list sekarang mengandung teks yang kita tambahkan
    await expect(page.getByTestId('todo-list')).toContainText('Belajar Playwright');
  });


  // ============================================================
  // TEST 3: Tambah beberapa todo sekaligus
  // ============================================================
  test('should add multiple todo items', async ({ page }) => {
    // Simpan referensi ke input agar tidak perlu query berulang
    const input = page.getByTestId('text-input');

    // Tambahkan todo pertama
    await input.fill('Belajar Playwright');
    await page.keyboard.press('Enter');

    // Tambahkan todo kedua
    await input.fill('Belajar Cypress');
    await page.keyboard.press('Enter');

    // Tambahkan todo ketiga
    await input.fill('Publish artikel Medium');
    await page.keyboard.press('Enter');

    // Verifikasi semua todo ada di list
    const todoList = page.getByTestId('todo-list');
    await expect(todoList).toContainText('Belajar Playwright');
    await expect(todoList).toContainText('Belajar Cypress');
    await expect(todoList).toContainText('Publish artikel Medium');
  });


  // ============================================================
  // TEST 4: Tandai todo sebagai selesai (completed)
  // ============================================================
  test('should mark a todo as completed', async ({ page }) => {
    // Tambah todo terlebih dahulu
    await page.getByTestId('text-input').fill('Belajar Playwright');
    await page.keyboard.press('Enter');

    // Centang checkbox toggle pada todo pertama di list
    await page.getByTestId('todo-item-toggle').first().check();

    // Verifikasi: todo item pertama sekarang punya CSS class "completed"
    await expect(page.getByTestId('todo-item').first()).toHaveClass(/completed/);
  });


  // ============================================================
  // TEST 5: Hapus todo item
  // ============================================================
  test('should delete a todo item', async ({ page }) => {
    // Tambah todo yang akan dihapus
    await page.getByTestId('text-input').fill('Todo yang akan dihapus');
    await page.keyboard.press('Enter');

    // Ambil referensi ke todo item pertama
    const todoItem = page.getByTestId('todo-item').first();

    // Hover dulu untuk memunculkan tombol hapus (tombol 'x')
    await todoItem.hover();

    // Klik tombol hapus (force:true karena tombol hanya muncul saat hover)
    await todoItem.getByTestId('todo-item-button').click({ force: true });

    // Verifikasi: teks todo sudah tidak ada di list
    await expect(page.getByTestId('todo-list')).not.toContainText('Todo yang akan dihapus');
  });


  // ============================================================
  // TEST 6: Footer muncul setelah ada todo
  // ============================================================
  test('should show footer when there is at least one todo', async ({ page }) => {
    // Tambah satu todo
    await page.getByTestId('text-input').fill('Test footer');
    await page.keyboard.press('Enter');

    // Verifikasi: footer terlihat
    await expect(page.getByTestId('footer')).toBeVisible();
    // Verifikasi: footer menampilkan counter "item left"
    await expect(page.getByTestId('footer')).toContainText('item left');
  });


  // ============================================================
  // TEST 7: Filter "Active" — hanya tampilkan todo yang belum selesai
  // ============================================================
  test('should filter active todos', async ({ page }) => {
    const input = page.getByTestId('text-input');

    // Tambah dua todo
    await input.fill('Todo aktif');
    await page.keyboard.press('Enter');

    await input.fill('Todo selesai');
    await page.keyboard.press('Enter');

    // Tandai todo TERAKHIR sebagai selesai
    await page.getByTestId('todo-item-toggle').last().check();

    // Klik tab filter "Active" di footer navigation
    await page.getByTestId('footer-navigation')
      .getByRole('link', { name: 'Active' }).click();

    // Verifikasi hasil filter
    const todoList = page.getByTestId('todo-list');
    await expect(todoList).toContainText('Todo aktif');         // harus muncul
    await expect(todoList).not.toContainText('Todo selesai');   // tidak boleh muncul
  });


  // ============================================================
  // TEST 8: Filter "Completed" — hanya tampilkan todo yang sudah selesai
  // ============================================================
  test('should filter completed todos', async ({ page }) => {
    const input = page.getByTestId('text-input');

    await input.fill('Todo aktif');
    await page.keyboard.press('Enter');

    await input.fill('Todo selesai');
    await page.keyboard.press('Enter');

    // Tandai todo terakhir sebagai selesai
    await page.getByTestId('todo-item-toggle').last().check();

    // Klik tab filter "Completed"
    await page.getByTestId('footer-navigation')
      .getByRole('link', { name: 'Completed' }).click();

    // Verifikasi hasil filter
    const todoList = page.getByTestId('todo-list');
    await expect(todoList).toContainText('Todo selesai');      // harus muncul
    await expect(todoList).not.toContainText('Todo aktif');    // tidak boleh muncul
  });


  // ============================================================
  // TEST 9: "Clear Completed" — hapus semua todo yang sudah selesai
  // ============================================================
  test('should clear completed todos', async ({ page }) => {
    const input = page.getByTestId('text-input');

    await input.fill('Todo aktif');
    await page.keyboard.press('Enter');

    await input.fill('Todo selesai');
    await page.keyboard.press('Enter');

    // Tandai todo terakhir sebagai selesai
    await page.getByTestId('todo-item-toggle').last().check();

    // Klik tombol "Clear completed"
    await page.getByRole('button', { name: 'Clear completed' }).click();

    // Verifikasi: hanya todo aktif yang tersisa
    const todoList = page.getByTestId('todo-list');
    await expect(todoList).toContainText('Todo aktif');
    await expect(todoList).not.toContainText('Todo selesai');
  });


  // ============================================================
  // TEST 10: Toggle semua todo sekaligus dengan "toggle-all"
  // ============================================================
  test('should toggle all todos at once', async ({ page }) => {
    const input = page.getByTestId('text-input');

    // Tambah dua todo
    await input.fill('Todo satu');
    await page.keyboard.press('Enter');

    await input.fill('Todo dua');
    await page.keyboard.press('Enter');

    // Centang checkbox "toggle-all" untuk menandai SEMUA todo selesai
    await page.getByTestId('toggle-all').check();

    // Verifikasi: semua todo item sekarang punya class "completed"
    const todoItems = page.getByTestId('todo-item');
    await expect(todoItems.nth(0)).toHaveClass(/completed/);  // todo pertama
    await expect(todoItems.nth(1)).toHaveClass(/completed/);  // todo kedua
  });

});
```

---

## Menjalankan Test

### Cara 1: Jalankan Semua Test (Headless — Tanpa Browser Terlihat)

```bash
npx playwright test
```

Output yang akan kamu lihat:

```
Running 10 tests using 5 workers

  ✓  [chromium] › todo.spec.ts:11:3 › TodoMVC App › should load the app correctly (2.1s)
  ✓  [chromium] › todo.spec.ts:17:3 › TodoMVC App › should add a new todo item (1.8s)
  ✓  [chromium] › todo.spec.ts:25:3 › TodoMVC App › should add multiple todo items (2.3s)
  ✓  [chromium] › todo.spec.ts:44:3 › TodoMVC App › should mark a todo as completed (1.9s)
  ✓  [chromium] › todo.spec.ts:54:3 › TodoMVC App › should delete a todo item (2.0s)
  ✓  [chromium] › todo.spec.ts:66:3 › TodoMVC App › should show footer at least one todo (1.7s)
  ✓  [chromium] › todo.spec.ts:75:3 › TodoMVC App › should filter active todos (2.4s)
  ✓  [chromium] › todo.spec.ts:94:3 › TodoMVC App › should filter completed todos (2.5s)
  ✓  [chromium] › todo.spec.ts:113:3 › TodoMVC App › should clear completed todos (2.2s)
  ✓  [chromium] › todo.spec.ts:132:3 › TodoMVC App › should toggle all todos at once (2.1s)

  10 passed (8.3s)
```

### Cara 2: Browser Terlihat (Direkomendasikan untuk Belajar!)

```bash
npx playwright test --headed
```

Kamu akan melihat browser dibuka, diklik, dan diisi secara otomatis. Sangat membantu untuk memahami apa yang sedang terjadi!

### Cara 3: Mode UI Interaktif

```bash
npx playwright test --ui
```

Membuka antarmuka grafis Playwright di mana kamu bisa:
- Menjalankan test satu per satu
- Melihat setiap langkah test secara visual
- Men-debug test yang gagal dengan *time travel*

### Cara 4: Jalankan Test Tertentu

```bash
# Filter berdasarkan nama test
npx playwright test --grep "filter"

# File tertentu saja
npx playwright test tests/todo.spec.ts
```

---

## Melihat Laporan Hasil Test

### Menghasilkan dan Membuka HTML Report

```bash
# Jalankan test dengan reporter HTML
npx playwright test --reporter=html

# Buka laporan di browser
npx playwright show-report
```

Laporan ini menampilkan:
- ✅ Daftar test yang lulus dan gagal
- ⏱️ Waktu eksekusi setiap test
- 📸 Screenshot saat test gagal
- 🎬 Video rekaman eksekusi
- 🔍 Trace viewer (jejak langkah demi langkah)

### Tambahkan Reporter ke Config (Permanen)

Update [playwright.config.ts](file:///d:/projects/playwright-demo/playwright.config.ts):

```typescript
reporter: [
  ['html', { open: 'on-failure' }],  // Buka HTML report otomatis jika ada test gagal
  ['list'],                           // Tampilkan progress di terminal
],
```

### Script di package.json

```json
{
  "scripts": {
    "test": "playwright test",
    "test:headed": "playwright test --headed",
    "test:ui": "playwright test --ui",
    "test:report": "playwright show-report"
  }
}
```

```bash
npm test              # Jalankan semua test
npm run test:headed   # Browser terlihat
npm run test:ui       # UI interaktif
npm run test:report   # Tampilkan laporan terakhir
```

---

## Tips & Best Practices

### ❌ Jangan Gunakan: `waitForTimeout()` (Hard-coded Delay)

```typescript
// ❌ BURUK: Menunggu 2 detik tanpa alasan jelas
await page.waitForTimeout(2000);
await page.click('#button');
```

Playwright punya **auto-wait** built-in — ia otomatis menunggu elemen siap sebelum berinteraksi. Kamu tidak perlu menambahkan delay manual yang membuat test lambat dan tidak reliabel.

```typescript
// ✅ BAIK: Playwright auto-wait
await page.getByTestId('submit-button').click();
```

### ✅ Gunakan `data-testid` untuk Selector yang Stabil

```typescript
// ❌ Rapuh — class CSS bisa berubah saat redesign
await page.click('.MuiButton-root');

// ✅ Stabil — khusus untuk testing
await page.getByTestId('submit-button').click();
```

Minta developer frontend untuk menambahkan `data-testid` pada elemen yang akan ditest.

### 🔧 Gunakan Playwright Codegen untuk Belajar Selector

```bash
npx playwright codegen https://todomvc.com/examples/react/dist/
```

Playwright akan merekam semua aksimu dan menghasilkan kode test secara otomatis. Cara terbaik untuk belajar!

### 🐛 Gunakan `page.pause()` Saat Debugging

```typescript
test('debugging test', async ({ page }) => {
  await page.goto('/');
  await page.pause(); // Eksekusi berhenti di sini, inspector terbuka
  // Kamu bisa inspect elemen, lihat state, dll
});
```

---

## Kesimpulan

Selamat! Kamu baru saja berhasil:

✅ Membuat project Playwright dari nol  
✅ Memahami setiap fungsi dan baris kode yang digunakan  
✅ Menulis 10 test case komprehensif untuk aplikasi Todo  
✅ Menjalankan test dan melihat laporan visualnya  

### Cheat Sheet Fungsi Playwright

| Fungsi | Kegunaan |
|---|---|
| `page.goto(url)` | Buka URL di browser |
| `page.getByTestId(id)` | Cari elemen by `data-testid` |
| `.fill(text)` | Isi input field |
| `.click()` | Klik elemen |
| `.check()` | Centang checkbox |
| `.hover()` | Hover mouse ke elemen |
| `page.keyboard.press(key)` | Tekan tombol keyboard |
| `.waitFor({ state })` | Tunggu hingga kondisi terpenuhi |
| `expect().toBeVisible()` | Assert elemen terlihat |
| `expect().toContainText()` | Assert elemen mengandung teks |
| `expect().toHaveTitle()` | Assert judul halaman |
| `expect().toHaveClass()` | Assert elemen punya CSS class |
| `expect().not.*` | Negasi dari assertion apapun |
| `.first()` / `.last()` | Ambil elemen pertama/terakhir |
| `.nth(index)` | Ambil elemen ke-N (0-indexed) |
| `test.describe()` | Kelompokkan test |
| `test.beforeEach()` | Jalankan sebelum setiap test |

### Langkah Selanjutnya

- **Page Object Model (POM)** — Arsitektur test yang lebih terstruktur
- **API Testing** dengan Playwright (test backend!)
- **Visual Regression Testing** — Deteksi perubahan tampilan UI
- **CI/CD Integration** — Otomatiskan di GitHub Actions

---

## Referensi

- [Dokumentasi Resmi Playwright](https://playwright.dev/docs/intro)
- [Best Practices Playwright](https://playwright.dev/docs/best-practices)
- [Playwright GitHub Repository](https://github.com/microsoft/playwright)
- [TodoMVC — Aplikasi Target Test](https://todomvc.com)

---

*Apakah tutorial ini membantu? Tinggalkan komentar atau klik Clap 👏! Follow untuk mendapatkan tutorial testing dan web development lainnya.*

---

## Panduan Publikasi ke Medium

### Judul Direkomendasikan:
```
Playwright untuk Pemula: Panduan Lengkap E2E Testing dari Nol hingga Melihat Hasil Test (2025)
```

### Subtitle:
```
Belajar automation testing dengan TypeScript — dari instalasi hingga HTML reporter visual, lengkap dengan penjelasan setiap fungsi kode untuk pemula
```

### Tags Medium:
- `Testing`
- `Playwright`
- `TypeScript`
- `Software Engineering`
- `Tutorial`
