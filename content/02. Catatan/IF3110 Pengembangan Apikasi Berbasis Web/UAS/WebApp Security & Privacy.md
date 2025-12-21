---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3110 Pengembangan Aplikasi Berbasis Web]]

> [!cornell] Topic: Web Application Security & Privacy
> 
> > ## Questions/Cues
> >
> > - Definisi Keamanan Informasi (CIA)
> >     
> > - Relasi Dunia Nyata vs Siber
> >     
> > - 6 Konsep Dasar Security
> >     
> > - Vulnerability vs Threat vs Attack
> >     
> > - Definisi Control (Mitigasi)
> >     
> > - Apa itu OWASP?
> >     
> > - Perubahan OWASP 2017 ke 2021
> >     
> > - A01: Broken Access Control
> >     
> > - A02: Cryptographic Failures
> >     
> > - A03: Injection (SQLi, XSS)
> >     
> > - A04: Insecure Design (New)
> >     
> > - A05: Security Misconfiguration
> >     
> > - A06: Outdated Components
> >     
> > - A07: Auth Failures
> >     
> > - A08: Integrity Failures (New)
> >     
> > - A09: Logging Failures
> >     
> > - A10: SSRF (New)
> >     
> >
> > ## Reference Points
> >
> > - Slide IF3110-13-Web-App-Security-n-Privacy
> >     
> > - OWASP.org
> >     
> > - Buku: "Foundations of Security" (Daswani et al.)
> >     
> > - Buku: "24 Deadly Sins of Software Security" (Howard et al.)
> >     
> 
> > ### 1. Filosofi Dasar Keamanan (Real World vs Cyber World)
> >
> > - **Dunia Nyata:** Aktivitas fisik manusia.
> >     
> > - **Dunia Siber:** Layanan digital yang mendukung dan memediasi aktivitas dunia nyata.
> >     
> >
> > Tujuan Keamanan Informasi:
> > 
> > Melindungi properti CIA dari layanan tersebut agar tetap bisa dipercaya.
> >
> > 1. **Confidentiality (Kerahasiaan):** Hanya mereka yang berhak yang boleh mengakses layanan/data.
> >     
> > 2. **Integrity (Integritas):** Layanan harus selalu berperilaku benar dan data tidak boleh berubah tanpa izin.
> >     
> > 3. **Availability (Ketersediaan):** Pengguna yang sah (authorized) harus selalu memiliki akses saat membutuhkan.
> >     
> >
> > _Tambahan Penting:_ Sistem juga harus menjamin **Privacy** (Privasi) dan **Accountability** (Akuntabilitas) di tengah adanya ancaman (_Threats_) dan kerentanan (_Vulnerabilities_).
> >
> > ### 2. Enam Pilar Konsep Keamanan
> >
> > Selain CIA, slide merinci konsep-konsep berikut:
> >
> > 1. **Confidentiality:** Menjaga rahasia data.
> >     
> > 2. **Data/Message Integrity:** Memastikan data utuh dan asli.
> >     
> > 3. **Availability:** Kesiapan sistem melayani user.
> >     
> > 4. **Authentication (Autentikasi):** Memverifikasi _siapa_ Anda (misal: Login password, Biometrik).
> >     
> > 5. **Authorization (Otorisasi):** Memverifikasi _apa yang boleh_ Anda lakukan setelah login (misal: Admin boleh hapus data, User biasa tidak).
> >     
> > 6. **Accountability (Akuntabilitas):** Kemampuan menelusuri tindakan siapa yang menyebabkan apa (biasanya lewat logs).
> >     
> > 7. **Non-Repudiation (Nenyangkalan):** Jaminan bahwa seseorang tidak bisa menyangkal telah melakukan suatu aksi (misal: tanda tangan digital).
> >     
> >
> > ### 3. Terminologi Inti: Vulnerability, Threat, Attack, Control
> >
> > Sangat penting membedakan istilah-istilah ini agar tidak tertukar:
> >
> > - **Vulnerability (Kerentanan):** Sebuah **kelemahan** dalam sistem keamanan. (Contoh: Lupa menutup port server, password default 'admin').
> >     
> > - **Threat (Ancaman):** Serangkaian keadaan yang **berpotensi** menyebabkan kerugian atau kerusakan. (Contoh: Hacker yang ingin mencuri data, Bencana alam).
> >     
> > - **Attack (Serangan):** Tindakan manusia yang **mengeksploitasi** _vulnerability_. (Contoh: Melakukan SQL Injection pada form login yang lemah).
> >     
> > - **Control (Kontrol/Mitigasi):** Tindakan pengamanan untuk **mencegah**, mendeteksi, atau memulihkan sistem dari serangan. (Contoh: Memasang Firewall, Enkripsi).
> >     
> >
> > ### 4. Standar Industri: OWASP Top 10
> >
> > **OWASP** (Open Web Application Security Project) adalah organisasi nirlaba yang menerbitkan daftar 10 risiko keamanan web paling kritis secara berkala. Slide membandingkan versi **2017** dengan **2021**.
> >
> > **Perubahan Signifikan (Mapping 2017 -> 2021):**
> >
> > - Beberapa kategori digabung (seperti XSS masuk ke Injection).
> >     
> > - Ada 3 kategori **BARU** di tahun 2021: Insecure Design, Software and Data Integrity Failures, dan SSRF.
> >     
> >
> > ### 5. Detail OWASP Top 10 (Versi 2021)
> >
> > Penjelasan mendetail untuk setiap poin risiko sesuai urutan prioritas terbaru:
> >
> > **A01:2021 - Broken Access Control (Naik dari posisi 5)**
> >
> > - **Definisi:** Kegagalan pembatasan akses user yang sudah login.
> >     
> > - **Contoh:** User biasa bisa mengakses halaman admin hanya dengan mengganti URL `/user` menjadi `/admin`. Atau user A bisa melihat data user B dengan mengganti `id=123` menjadi `id=124` di URL (Insecure Direct Object Reference).
> >     
> >
> > **A02:2021 - Cryptographic Failures (Sebelumnya: Sensitive Data Exposure)**
> >
> > - **Fokus Baru:** Lebih menekankan pada _penyebab_ (kegagalan kriptografi) daripada _gejala_ (data terekspos).
> >     
> > - **Masalah:** Menyimpan password dalam _plain text_, menggunakan algoritma hash usang (MD5, SHA1), atau tidak menggunakan HTTPS.
> >     
> >
> > **A03:2021 - Injection (Meliputi XSS sekarang)**
> >
> > - **Definisi:** Data tidak terpercaya dikirim ke interpreter sebagai bagian dari perintah atau query.
> >     
> > - **SQL Injection:** Hacker memasukkan kode SQL di input form (misal: `' OR '1'='1`) untuk memanipulasi database.
> >     
> > - **XSS (Cross-Site Scripting):** Hacker menyisipkan skrip JavaScript berbahaya ke halaman web yang dilihat user lain. (Sekarang dikategorikan sebagai bagian dari Injection).
> >     
> >
> > **A04:2021 - Insecure Design (BARU)**
> >
> > - **Definisi:** Fokus pada risiko yang terkait dengan cacat desain dan arsitektur.
> >     
> > - **Inti Masalah:** Kita tidak bisa membetulkan desain yang tidak aman hanya dengan _coding_ yang rapi. Keamanan harus dipikirkan sejak fase perancangan (_Security by Design_).
> >     
> >
> > **A05:2021 - Security Misconfiguration**
> >
> > - **Cakupan:** Termasuk kategori lama _XML External Entities (XXE)_.
> >     
> > - **Masalah:** Menggunakan konfigurasi default (username/password bawaan pabrik), pesan error yang terlalu detail (menampilkan stack trace ke user), atau fitur tidak perlu yang diaktifkan.
> >     
> >
> > **A06:2021 - Vulnerable and Outdated Components**
> >
> > - **Masalah:** Menggunakan library, framework, atau modul pihak ketiga yang memiliki celah keamanan yang sudah diketahui umum (CVE).
> >     
> > - **Risiko:** Karena komponen ini berjalan dengan hak akses penuh aplikasi, serangannya bisa fatal.
> >     
> >
> > **A07:2021 - Identification and Authentication Failures (Sebelumnya: Broken Auth)**
> >
> > - **Masalah:** Sistem gagal memverifikasi identitas user atau manajemen sesi buruk.
> >     
> > - **Contoh:** Membiarkan serangan _Credential Stuffing_ (tebak password massal), sesi tidak _timeout_ saat user pergi, atau membiarkan password lemah seperti "123456".
> >     
> >
> > **A08:2021 - Software and Data Integrity Failures (BARU)**
> >
> > - **Cakupan:** Termasuk kategori lama _Insecure Deserialization_.
> >     
> > - **Definisi:** Kode dan infrastruktur yang tidak memvalidasi integritas dari sumber eksternal.
> >     
> > - **Contoh:** Mengupdate aplikasi dari server yang tidak terpercaya tanpa verifikasi tanda tangan digital (checksum), atau objek data yang diserialisasi dimanipulasi oleh hacker sebelum dibaca ulang oleh sistem.
> >     
> >
> > **A09:2021 - Security Logging and Monitoring Failures**
> >
> > - **Masalah:** Tidak mencatat kejadian penting (login gagal, error kritis) atau tidak memonitor log tersebut.
> >     
> > - **Dampak:** Peretas bisa berada di dalam sistem selama berbulan-bulan tanpa ketahuan karena tidak ada jejak audit yang diperiksa.
> >     
> >
> > **A10:2021 - Server-Side Request Forgery (SSRF) (BARU)**
> >
> > - **Definisi:** Hacker memaksa server aplikasi untuk mengirim request HTTP ke tujuan yang tidak diinginkan (biasanya ke jaringan internal yang tidak bisa diakses dari luar).
> >     
> > - **Contoh:** Hacker menyuruh server web untuk membaca metadata cloud provider (AWS/GCP) atau melakukan port scanning ke server internal perusahaan.
> >     

> [!cornell] #### Summary
> 
> Web Application Security bertujuan melindungi properti CIA (Confidentiality, Integrity, Availability) dari Threats yang mengeksploitasi Vulnerabilities. Standar emas untuk memahami risiko ini adalah OWASP Top 10, yang pada versi 2021 menempatkan Broken Access Control sebagai risiko tertinggi. Perubahan besar lainnya termasuk penggabungan XSS ke dalam Injection, serta penambahan fokus baru pada Insecure Design dan Software Integrity, yang menegaskan bahwa keamanan bukan hanya soal coding, tapi juga soal arsitektur dan rantai pasok software.

> [!ad-libitum]- Additional Information (Deep Dive)
> 
> #### 1. Mekanisme SQL Injection (A03)
> 
> Bayangkan kode backend PHP kuno seperti ini:
> 
> ```php
> $query = "SELECT * FROM users WHERE user='" . $username . "' AND pass='" . $password . "'";
> ```
> 
> Jika hacker memasukkan input:
> 
> - Username: `admin' --`
>     
> - Password: (kosong)
>     
> 
> Maka query SQL menjadi:
> 
> ```php
> SELECT * FROM users WHERE user='admin' --' AND pass=''
> ```
> 
> Tanda `--` di SQL berarti komentar. Bagian pengecekan password di belakangnya akan diabaikan oleh database, sehingga hacker bisa login sebagai admin tanpa password.
> 
> #### 2. Mitigasi: Security by Design (A04)
> 
> - **Principle of Least Privilege:** Berikan hak akses seminimal mungkin.
>     
> - **Defense in Depth:** Berlapis-lapis pertahanan (misal: Validasi Input + WAF + Enkripsi DB).
>     
> - **Secure Defaults:** Setingan awal harus paling aman (misal: fitur 'public visibility' mati secara default).
>     
> 
> #### 3. SSRF Explained (A10)
> 
> Server Side Request Forgery sering terjadi pada fitur "Fetch Image from URL".
> 
> Jika user memasukkan URL gambar: http://localhost:8080/admin/deleteUser, dan server tidak memvalidasi tujuan URL, maka server akan "menyerang dirinya sendiri" atau layanan internal lain yang mempercayai request dari localhost.
> 
> #### Sumber & Referensi Lanjutan:
> 
> - Website Resmi: `owasp.org` (Cek "OWASP Top 10 Project").
>     
> - Buku Referensi: _Foundations of Security_ (Daswani) & _24 Deadly Sins_ (Howard).
>     
> - Tools Praktik: OWASP Juice Shop (Aplikasi web yang sengaja dibuat rentan untuk belajar hacking etis).
>     

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Apa perbedaan antara Vulnerability dan Threat?</strong></summary>
> 
> Vulnerability adalah kelemahan internal sistem (lubang keamanan), sedangkan Threat adalah potensi bahaya eksternal atau kondisi yang bisa memicu kerugian. Threat butuh Vulnerability untuk menjadi Attack sukses.
> 
> </details>
> <details>
> 
> <summary><strong>2. Jelaskan konsep "Broken Access Control" (A01)!</strong></summary>
> 
> Kegagalan sistem dalam membatasi apa yang boleh dilakukan oleh user yang sudah login, sehingga user bisa mengakses data atau fitur di luar izinnya (misal: user biasa akses dashboard admin).
> 
> </details>
> <details>
> 
> <summary><strong>3. Mengapa "Insecure Design" (A04) menjadi kategori baru yang penting?</strong></summary>
> 
> Karena banyak masalah keamanan bersumber dari kesalahan arsitektur (logika bisnis) yang tidak bisa diperbaiki hanya dengan menambal kode (patching). Desain harus aman sejak awal (shift-left security).
> 
> </details>
> <details>
> 
> <summary><strong>4. Apa itu SSRF (A10)?</strong></summary>
> 
> Server-Side Request Forgery: Serangan di mana penyerang memanipulasi server aplikasi untuk mengirim request HTTP ke tujuan yang tidak diinginkan, biasanya untuk mengakses sumber daya internal jaringan.
> 
> </details>
> <details>
> 
> <summary><strong>5. Apa kepanjangan dan arti CIA dalam keamanan informasi?</strong></summary>
> 
> Confidentiality (Kerahasiaan), Integrity (Keutuhan Data), dan Availability (Ketersediaan Layanan).
> 
> </details>