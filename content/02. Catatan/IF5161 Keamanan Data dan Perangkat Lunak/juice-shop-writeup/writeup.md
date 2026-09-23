# Writeup OWASP Juice Shop — Challenge Solved (5/110)

**Target:** OWASP Juice Shop (Docker, `bkimminich/juice-shop`) — `http://localhost:2026`

| # | Challenge | Kategori | Difficulty |
|---|-----------|----------|:---:|
| 1 | Score Board | Miscellaneous | ⭐ |
| 2 | Privacy Policy | Miscellaneous | ⭐ |
| 3 | Confidential Document | Sensitive Data Exposure | ⭐ |
| 4 | Exposed Metrics | Observability Failures | ⭐ |
| 5 | Error Handling | Security Misconfiguration | ⭐ |

---

## 1. Score Board

**Deskripsi:** Find the carefully hidden 'Score Board' page.

**Langkah:**
1. Halaman Score Board tidak ada link-nya di navigasi.
2. Tebak path, ditemukan: `http://localhost:2026/#/score-board`
3. Halaman terbuka dan challenge langsung solved.

**Root cause:** Halaman disembunyikan hanya lewat *security through obscurity*. Route-nya tetap terdaftar di aplikasi Angular sisi client, jadi siapa pun bisa mengaksesnya dengan menebak path.

---

## 2. Privacy Policy

**Deskripsi:** Read our privacy policy.

**Langkah:**
1. Buka halaman Privacy Policy (`/#/privacy-security/privacy-policy`) dari menu aplikasi.
2. Baca isinya. Challenge solved begitu halaman dibuka.

**Catatan:** Challenge ini tidak butuh eksploitasi, cukup menjelajahi aplikasi dan membaca halamannya.

---

## 3. Confidential Document

**Deskripsi:** Access a confidential document.

**Langkah:**
1. Buka halaman `/#/about`.
2. Klik link pada kalimat *"Check out our boring terms of use if you are interested in such lame stuff."*
3. Link mengarah ke `/ftp/legal.md`. Dari path ini terlihat ada direktori `/ftp` di server.
4. Akses langsung `http://localhost:2026/ftp`. Server menampilkan **directory listing** berisi banyak dokumen (`acquisitions.md`, `legal.md`, `coupons_2013.md.bak`, `incident-support.kdbx`, `package.json.bak`, dll.).
5. Buka file dokumen rahasia dari listing tersebut, yaitu `http://localhost:2026/ftp/acquisitions.md`. Challenge solved.

**Root cause:** Direktori `/ftp` diekspos publik dengan directory listing aktif, sehingga file internal atau rahasia bisa diunduh tanpa autentikasi.

**Mitigasi:** Matikan directory listing, jangan simpan file sensitif di folder yang di-serve publik, dan tambahkan kontrol akses.

---

## 4. Exposed Metrics

**Deskripsi:** Find the endpoint that serves usage data to be scraped by a popular monitoring system.

**Langkah:**
1. Deskripsi challenge menyebut sistem monitoring populer, yaitu **Prometheus**.
2. Endpoint default Prometheus adalah `/metrics`. Akses `http://localhost:2026/metrics`.
3. Server membalas HTTP 200 dengan data metrik dalam format Prometheus (contoh: `file_uploads_count`, `file_upload_errors`). Challenge solved.

```bash
curl http://localhost:2026/metrics
```

**Root cause:** Endpoint monitoring internal bisa diakses publik tanpa autentikasi, sehingga membocorkan informasi operasional aplikasi.

**Mitigasi:** Batasi `/metrics` hanya untuk jaringan internal atau scraper Prometheus (IP allowlist, basic auth, atau reverse proxy).

---

## 5. Error Handling

**Deskripsi:** Provoke an error that is neither very gracefully nor consistently handled.

**Langkah:**
1. Akses `http://localhost:2026/profile` langsung, tanpa lewat alur login normal.
2. Server membalas **HTTP 500** dengan pesan error mentah:

```
500 Error: Blocked illegal activity by ::ffff:172.19.0.1
   at /juice-shop/build/routes/userProfile.js:72:18
```

3. Challenge solved.

**Root cause:** Error tidak ditangani dengan baik. Server mengirim *stack trace* ke client, dan dari situ terlihat:
- path internal server (`/juice-shop/build/routes/userProfile.js`),
- nomor baris kode (`72:18`),
- IP client dalam format internal Docker (`::ffff:172.19.0.1`).

Info ini berguna bagi penyerang untuk *reconnaissance*. Penanganan error seperti ini tidak graceful dan tidak konsisten, sesuai deskripsi challenge.

**Mitigasi:** Pakai error handler global yang mengembalikan pesan generik ke client, catat detail hanya di log server, dan jalankan dengan `NODE_ENV=production`.

---

## Ringkasan

Kelima challenge ini bertema **information disclosure / security misconfiguration**: halaman tersembunyi yang bisa ditebak, direktori `/ftp` yang terbuka, endpoint metrics tanpa proteksi, dan stack trace yang bocor ke client.
