---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5161 Keamanan Data dan Perangkat Lunak]]

> [!cornell] Studi Kasus SimpleWebServer
>
> > ## Questions/Cues
> >
> > - Bagaimana cara kerja HTTP request sederhana dan apa yang dilakukan SimpleWebServer?
> > - Di mana letak celah Denial of Service pada kode tersebut?
> > - Bagaimana serangan path traversal (`../../`) membocorkan file di luar htdocs?
> > - Bagaimana memperbaiki kedua celah?
> > - Prinsip desain apa yang tersirat dari pelajaran ini?
> >
> > ## Reference Points
> >
> > - IF5161 — W01 Introduction to Data & Software Security, "Warming up... with codes" s.d. penutup (SimpleWebServer)
>
> > ### Latar: HTTP dan SimpleWebServer
> >
> > **HTTP** adalah protokol untuk menghubungkan browser dengan web server dan mengirim halaman HTML atau file lain. Request tipikal berupa `GET / HTTP/1.0`. Server memetakan `/` ke `index.html`, lalu membalas `HTTP/1.0 200 OK` diikuti isi dokumen.
> >
> > Program Java **SimpleWebServer** hanya melayani dokumen lewat HTTP: membuat `ServerSocket` pada port 8080, menerima koneksi dalam loop, membaca baris request dengan `BufferedReader`, memecahnya dengan `StringTokenizer` menjadi *command* dan *pathname*, lalu membuka file dengan `FileReader(pathname)` dan mengirim isinya.
> >
> > ```mermaid
> > flowchart LR
> >     C["Client"] -->|"GET /path HTTP/1.0"| S["accept() di port 8080"]
> >     S --> R["readLine() + StringTokenizer"]
> >     R --> P["pathname = nextToken()"]
> >     P --> F["FileReader(pathname)"]
> >     F --> O["kirim isi file ke client"]
> > ```
> >
> > ### Celah 1: Denial of Service
> >
> > Jika client mengirim **carriage return saja** sebagai pesan pertama, `readLine()` mengembalikan string kosong. Pemanggilan `st.nextToken()` untuk mengambil pathname lalu melempar exception yang tidak tertangani, dan **web server crash**. Layanan untuk semua client berikutnya terputus sampai server dijalankan ulang.
> >
> > **Perbaikan**: tangani exception dengan benar, **putus koneksi segera** dari client yang mengirim request tak valid, dan cek `st.hasMoreTokens()` sebelum mengambil token. Satu client buruk tidak boleh menjatuhkan server.
> >
> > ### Celah 2: Pembocoran Confidentiality (Path Traversal)
> >
> > Karena `pathname` dipakai mentah-mentah, penyerang bisa meminta `GET ../../../../etc/shadow HTTP/1.0` dan membaca **file di luar direktori htdocs**.
> >
> > **Perbaikan**: **validasi pathname** (kanonikalisasi path, tolak `..`, pastikan hasil akhir tetap di bawah root dokumen), dan jalankan server dengan **least privilege** sehingga bahkan bila celah lolos, proses tidak berhak membaca `/etc/shadow`.
> >
> > ### Pelajaran Desain
> >
> > - **Exception handling yang efektif** adalah bagian dari desain keamanan.
> > - Terapkan **least privilege**.
> > - **Jangan pernah percaya input pengguna** (never trust users' inputs).
> >
> > Prinsip-prinsip ini diformalkan di [[Prinsip Desain Saltzer dan Schroeder]] dan diperdalam untuk web di folder `3`.

> [!cornell] #### Summary
>
> Program web server sederhana ini memperlihatkan dua kelas celah klasik: **Denial of Service** akibat input tak valid yang memicu exception tak tertangani, dan **pembocoran file lewat path traversal** karena pathname dipakai tanpa validasi. Perbaikannya berupa **penanganan exception, validasi input, dan least privilege**. Pesan utamanya: keamanan harus dirancang sejak awal dan **input pengguna tidak boleh dipercaya**.

> [!ad-libitum]- Additional Information
>
> #### Path Traversal di Dunia Nyata
> Path traversal tercatat sebagai **CWE-22**. Varian modern memakai encoding (`%2e%2e%2f`), double encoding, atau separator Windows (`..\`). Pertahanan yang kuat: resolve path ke bentuk kanonik, bandingkan prefix dengan root yang diizinkan, dan lebih baik memakai *allowlist* identifier ketimbang path dari pengguna.
>
> #### Proyek Eksplorasi Mandiri
> 1. Implementasikan ulang SimpleWebServer dalam bahasa pilihan Anda, lalu sengaja tulis dua celah di atas dan buktikan eksploitasinya.
> 2. Perbaiki, lalu tulis security unit test (abuse case) yang gagal pada versi rentan dan lulus pada versi aman.
>
> #### Bacaan Lanjutan
> - CWE-22 Improper Limitation of a Pathname to a Restricted Directory
> - OWASP Path Traversal
