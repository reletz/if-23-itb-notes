---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5161 Keamanan Data dan Perangkat Lunak]]

> [!cornell] Broken Authentication, IDOR, dan URL Access Control
>
> > ## Questions/Cues
> >
> > - Mengapa session ID sama berharganya dengan kredensial?
> > - Bagaimana URL rewriting membocorkan session ID lewat header `Referer`?
> > - Apa itu Insecure Direct Object Reference dan mengapa "menyembunyikan" tidak cukup?
> > - Apa kesalahan "presentation layer access control"?
> > - Tiga hal apa yang harus dilakukan setiap URL?
> >
> > ## Reference Points
> >
> > - IF5161 — W02 Web Application Vulnerability, bagian "Broken Authentication and Session Management", "Insecure Direct Object References", "Failure to Restrict URL Access"
>
> > ### Broken Authentication dan Session Management
> >
> > HTTP bersifat **stateless**, sehingga kredensial harus menyertai setiap request, atau digantikan **session ID** untuk melacak state. Session ID "sama baiknya dengan kredensial bagi penyerang", dan biasanya terekspos di jaringan, browser, dan log. Waspadai juga **side-door**: ubah password, ingat password, lupa password, pertanyaan rahasia, logout, ubah email.
> >
> > **Skenario**: situs memakai *URL rewriting* (`www.boi.com?JSESSIONID=9FA1...`). Pengguna mengklik tautan ke `www.hacker.com` dari forum; hacker memeriksa **referer log** dan menemukan JSESSIONID korban, lalu mengambil alih akun.
> >
> > ```mermaid
> > flowchart LR
> >     U["User login"] --> URL["Session ID di URL<br/>?JSESSIONID=..."]
> >     URL --> L["User klik link ke hacker.com"]
> >     L --> R["Referer log hacker<br/>memuat JSESSIONID"]
> >     R --> T["Account takeover"]
> > ```
> >
> > **Menghindari**: autentikasi yang **sederhana, terpusat, dan standar**; pakai session ID bawaan container; lindungi kredensial dan session ID dengan **SSL** setiap saat; pastikan **logout benar-benar menghancurkan sesi**; periksa semua fungsi terkait autentikasi. Varian: `session_start` terlambat, DoS atau brute force password, session ID mudah ditebak.
> >
> > ### Insecure Direct Object References (IDOR)
> >
> > Kesalahan umum: hanya **menampilkan** objek yang berwenang atau **menyembunyikan referensi** di hidden field, tanpa menegakkannya di server. Ini disebut **presentation layer access control** dan **tidak berfungsi**: penyerang tinggal mengubah nilai parameter.
> >
> > Contoh: `?acct=6065` diubah menjadi `?acct=6066` dan penyerang melihat akun korban.
> >
> > **Menghindari**:
> >
> > - **Hilangkan referensi langsung**: ganti dengan pemetaan sementara (1, 2, 3 atau token acak) memakai *Access Reference Map* (ESAPI).
> > - **Validasi referensi**: format parameter benar, pengguna **berhak** atas objek (query constraint sangat efektif), dan mode akses (read/write/delete) diizinkan.
> >
> > Varian: *weak magic URL* (id yang hanya di-Base64) dan cookie yang atributnya mudah ditebak.
> >
> > ### Failure to Restrict URL Access
> >
> > Kesalahan serupa: hanya **menampilkan link/menu** yang berhak. Penyerang cukup memalsukan akses langsung, mis. dari `/user/getAccounts` ke `/admin/getAccounts` atau `/manager/getAccounts`.
> >
> > Untuk **setiap URL**, situs harus: (1) membatasi akses ke pengguna terautentikasi (jika tidak publik), (2) menegakkan izin berbasis pengguna/peran (jika privat), (3) **menolak sepenuhnya** permintaan ke tipe halaman yang tidak boleh (file config, log, source). Gunakan model positif sederhana di setiap lapisan, filter eksternal (mis. `web.xml`) atau pengecekan internal (`isAuthorizedForURL()` ESAPI), dan uji dengan memalsukan request tak berwenang.

> [!cornell] #### Summary
>
> Kelemahan autentikasi dan sesi menjadikan **session ID** setara kredensial, sehingga harus dilindungi dari kebocoran (URL, log, `Referer`). **IDOR** dan **failure to restrict URL access** sama-sama lahir dari **presentation layer access control**: menyembunyikan bukan menegakkan. Solusinya selalu **otorisasi di server pada setiap request**, dengan referensi tak langsung dan model akses positif.

> [!ad-libitum]- Additional Information
>
> #### Kelanjutan di Edisi Modern
> Ketiganya kemudian digabung menjadi **Broken Access Control (A01:2021)** dan **Identification and Authentication Failures (A07:2021)**; lihat [[OWASP Top 10 2021]]. Pembahasan lebih dalam model otorisasi ada di [[Model Otorisasi RBAC ABAC dan ReBAC]] dan penguatan sesi di [[Session Management dan Token-Based Authentication]].
>
> #### Proyek Eksplorasi Mandiri
> 1. Pada Juice Shop, ubah `basket id` untuk melihat keranjang pengguna lain (IDOR), lalu tulis perbaikan pengecekan kepemilikan.
> 2. Inventarisasi semua rute aplikasi kecil Anda dan buat tabel peran vs rute yang diizinkan.
>
> #### Bacaan Lanjutan
> - OWASP Authentication Cheat Sheet
> - OWASP Session Management Cheat Sheet
> - OWASP Authorization Cheat Sheet
