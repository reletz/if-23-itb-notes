---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4033 Keamanan Siber]]

> [!cornell] Studi Kasus SimpleWebServer - DoS dan Path Traversal
>
> > ## Questions/Cues
> >
> > - Bagaimana cara kerja SimpleWebServer sederhana?
> > - Bagaimana request cacat dapat membuat server crash (DoS)?
> > - Bagaimana serangan `../` membaca file di luar direktori web?
> > - Pelajaran desain apa yang bisa ditarik?
> >
> > ## Reference Points
> >
> > - IF4033 Software Security (Slides 10-27)
> > - IF4033 Security Foundation (Slides 77-96)
>
> > ### Gambaran SimpleWebServer
> >
> > Program Java kecil yang hanya menyajikan dokumen lewat **HTTP**. Request umum: `GET / HTTP/1.0`; server memuat `index.html` dan membalas `HTTP/1.0 200 OK` diikuti isi dokumen. Alurnya:
> >
> > ```mermaid
> > flowchart LR
> >     A["accept() koneksi<br/>port 8080"] --> B["processRequest():<br/>baca & parse request"]
> >     B -->|"GET"| C["serveFile(pathname)"]
> >     B -->|"bukan GET"| D["501 Not Implemented"]
> >     C -->|"file ada"| E["200 OK + isi file"]
> >     C -->|"tidak ada"| F["404 Not Found"]
> > ```
> >
> > ### Serangan 1: Denial of Service
> >
> > **DoS** membuat web server tidak tersedia (misal toko buku online kehilangan pendapatan). Pada kode ini, cukup mengirim **carriage return** (baris kosong) sebagai pesan pertama. `request` kosong sehingga `st.nextToken()` melempar exception yang tidak ditangani, **server crash**, dan semua klien berikutnya ditolak sampai server di-restart.
> >
> > **Perbaikan**: tangani exception pada parsing, lalu putus koneksi klien yang mengirim request cacat:
> >
> > ```java
> > try {
> >   StringTokenizer st = new StringTokenizer(request, " ");
> >   command = st.nextToken();
> >   pathname = st.nextToken();
> > } catch (Exception e) {
> >   osw.write("HTTP/1.0 400 Bad Request\n\n");
> >   osw.close();
> >   return;
> > }
> > ```
> >
> > ### Serangan 2: Confidentiality Breach (Path Traversal)
> >
> > Karena `pathname` langsung dipakai untuk membuka file, penyerang dapat meminta `GET ../../../../etc/shadow HTTP/1.0` dan membaca file di luar *htdocs*. **Perbaikan**: validasi `pathname` (misalnya tolak `..`, atau kanonikalisasi path lalu pastikan masih berada di dalam direktori root).
> >
> > ### Teaching Wisdom
> >
> > - **Exception handling** yang efektif esensial untuk mendesain keamanan sejak awal.
> > - Terapkan **least privilege**.
> > - **Jangan pernah percaya input pengguna.**

> [!cornell] #### Summary
>
> SimpleWebServer menunjukkan kerentanan umum jika keamanan tidak didesain sejak awal. Request kosong menyebabkan exception tak tertangani yang meng-**crash** server (**DoS**) dan diperbaiki dengan penanganan exception serta respons `400 Bad Request`. Pathname yang tidak divalidasi memungkinkan **path traversal** (`../../etc/shadow`) yang membocorkan **confidentiality**; solusinya validasi path. Pelajaran: tangani exception dengan benar, terapkan **least privilege**, dan **jangan percaya input pengguna**.

> [!ad-libitum]- Additional Information
>
> #### Kerentanan Lain pada Kode yang Sama
>
> Selain dua hal di atas, server ini tidak membatasi jumlah koneksi (proses satu klien per giliran sehingga satu koneksi lambat memblokir yang lain, mirip *Slowloris*), dan berjalan dengan hak akses proses penuh sehingga dampak path traversal membesar bila dijalankan sebagai root.
>
> #### Proyek Eksplorasi Mandiri
> 1. Implementasikan ulang server dalam bahasa pilihan, tambahkan validasi path via kanonikalisasi, lalu uji dengan payload traversal (`%2e%2e/`).
>
> #### Bacaan Lanjutan
> - OWASP *Path Traversal* dan *Input Validation Cheat Sheet*.
> - CWE-22 (Path Traversal), CWE-248 (Uncaught Exception).
