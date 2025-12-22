---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3110 Pengembangan Aplikasi Berbasis Web]]

> [!cornell] Topic: Security Controls, Privacy & OWASP Top 10
> 
> > ## Questions/Cues
> >
> > - 5 Jenis Security Control
> >     
> > - AuthN vs AuthZ
> >     
> > - Multi-Factor Auth (MFA)
> >     
> > - Enkripsi (Symmetric vs Asymmetric)
> >     
> > - Network vs App Security
> >     
> > - Prinsip Data Protection
> >     
> > - OWASP Top 10 (2021)
> >     
> >
> > ## Reference Points
> >
> > - Slides: IF3110-13-Web-App-Security-n-Privacy (Pages 18-36)
> >     
> > - OWASP Top 10 Versions
> >     
> 
> > ### Strategi Pengendalian Keamanan (Security Control)
> >
> > Tidak ada satu solusi tunggal untuk keamanan. Strategi pertahanan dibagi menjadi 5 lapisan fungsi:
> >
> > 1. **Prevent (Mencegah):** Memblokir serangan atau menutup celah kerentanan sepenuhnya. (Contoh: Validasi input untuk mencegah SQL Injection).
> >     
> > 2. **Deter (Mencegah/Menakuti):** Membuat serangan menjadi sangat sulit atau mahal sehingga penyerang menyerah. (Contoh: Password yang sangat kompleks).
> >     
> > 3. **Deflect (Mengalihkan):** Membuat target lain lebih menarik atau target kita kurang menarik. (Contoh: Honeypot - sistem palsu untuk menjebak penyerang).
> >     
> > 4. **Detect (Mendeteksi):** Mengetahui saat serangan sedang terjadi atau telah terjadi. (Contoh: Intrusion Detection System/IDS, Log monitoring).
> >     
> > 5. **Recover (Memulihkan):** Mengembalikan sistem ke kondisi normal setelah serangan berhasil. (Contoh: Backup data rutin).
> >     
> >
> > ### Praktik Keamanan Esensial
> >
> > Beberapa kontrol spesifik yang wajib diterapkan:
> >
> > - **Traffic Encryption:** Selalu gunakan **HTTPS** (bukan HTTP) untuk mengenkripsi data antara klien dan server. Ini mencegah penyadapan (sniffing) session cookie atau data sensitif di jaringan.
> >     
> > - **Multi-Factor Authentication (MFA):** Mewajibkan lebih dari satu bukti identitas. Misal: Password (sesuatu yang Anda tahu) + Kode SMS/OTP (sesuatu yang Anda miliki).
> >     
> > - **Short Timeouts:** Sesi login harus kadaluwarsa (expire) dengan cepat jika tidak ada aktivitas. Ini meminimalkan risiko jika pengguna lupa logout di komputer umum.
> >     
> >
> > ### Autentikasi vs Otorisasi (AuthN vs AuthZ)
> >
> > Dua konsep yang sering tertukar namun berbeda fundamental:
> >
> > #### 1. Authentication (AuthN) - "Siapa Anda?"
> >
> > Proses memverifikasi identitas pengguna.
> >
> > - **Metode:**
> >     
> > 	- _Knowledge:_ Password, PIN.
> > 			
> > 	- _Possession:_ Token, HP, Kartu akses.
> > 			
> > 	- _Attribute:_ Biometrik (Sidik jari, Wajah).
> > 			
> >
> > #### 2. Authorization (AuthZ) - "Apa yang boleh Anda lakukan?"
> >
> > Proses menentukan hak akses setelah identitas terverifikasi.
> >
> > - **Contoh:** Di Google Drive, Anda mungkin ter-autentikasi (login), tapi Anda hanya punya _otorisasi_ untuk "View" dokumen tertentu, bukan "Edit".
> >     
> > - **Access Control List (ACL):** Tabel di database yang menghubungkan User dengan Resource dan izinnya (Read/Write/Delete). Untuk efisiensi, izin sering diberikan ke **Grup/Role** (Role-Based Access Control), bukan per individu.
> >     
> >
> > ### Enkripsi Data
> >
> > Proses mengubah dokumen (Plaintext) menjadi format tak terbaca (Ciphertext) menggunakan algoritma dan **Kunci (Key)**.
> >
> > - **Tujuannya:** Kerahasiaan. Hanya pemegang kunci yang bisa mengembalikan (Decrypt) pesan tersebut.
> >     
> >
> > ### App Security vs Network Security
> >
> > Mengapa Firewall saja tidak cukup?
> >
> > - **Network Security:** Fokus pada infrastruktur (Firewall, SSL, Hardening OS). Ini ibarat pagar benteng.
> >     
> > - **App Security:** Fokus pada kode aplikasi itu sendiri. Serangan modern (seperti SQL Injection atau XSS) berjalan di Layer Aplikasi (Layer 7) melalui port 80/443 yang justru _diizinkan_ oleh Firewall.
> >     
> > - **Fakta:** Sebagian besar investasi keamanan lari ke Network, padahal celah keamanan terbesar seringkali ada di kode aplikasi ("lubang di perimeter keamanan").
> >     
> >
> > ### Privasi & Prinsip Perlindungan Data
> >
> > Privasi adalah konsep sosial tentang kontrol individu atas informasi pribadi mereka. Prinsip utama bagi pengembang:
> >
> > 1. **Awareness & Control:** Pengguna harus sadar data apa yang diambil dan punya kontrol atasnya.
> >     
> > 2. **Purpose:** Data hanya boleh digunakan untuk tujuan yang diberitahukan di awal (tidak boleh dijual diam-diam).
> >     
> > 3. **Consent:** Wajib minta izin sebelum membagi data ke pihak ketiga.
> >     
> > 4. **Data Lifetime:** Jangan simpan data selamanya. Hapus jika akun dihapus atau tujuan sudah tercapai.
> >     
> > 5. **Secure Storage:** Data harus disimpan aman (dienkripsi).
> >     
> >
> > ### OWASP Top 10 (Detail Risiko 2021)
> >
> > Daftar 10 risiko keamanan aplikasi web paling kritis menurut standar industri (2021):
> >
> > 1. **A01: Broken Access Control (Rusaknya Kontrol Akses)**
> > 	* *Masalah:* Pengguna dapat bertindak di luar izin mereka.
> > 	* *Contoh:* User biasa bisa mengakses API admin, atau melihat data user lain hanya dengan mengganti ID di URL (`id=1` jadi `id=2`).
> >
> > 2. **A02: Cryptographic Failures (Kegagalan Kriptografi)**
> >     
> > 	* *Masalah:* Data sensitif (password, NIK, kartu kredit) tidak dienkripsi atau menggunakan algoritma usang (seperti MD5).
> > 	* *Dulu dikenal sebagai:* Sensitive Data Exposure.
> >  
> > 3. **A03: Injection (Injeksi)**
> >     
> > 	* *Masalah:* Data tidak tepercaya dikirim ke penafsir perintah (command interpreter) sebagai bagian dari perintah atau kueri.
> > 	* *Termasuk:* SQL Injection, NoSQL Injection, dan sekarang Cross-Site Scripting (XSS) juga dikategorikan di sini.
> > 
> > 4. **A04: Insecure Design (Desain Tidak Aman)**
> >     
> > 	* *Masalah:* Risiko yang muncul karena kesalahan arsitektur, bukan implementasi kode.
> > 	* *Solusi:* Keamanan harus dipikirkan sejak fase desain ("Shift Left"), bukan hanya ditambal saat coding.
> > 
> > 5. **A05: Security Misconfiguration (Salah Konfigurasi Keamanan)**
> >     
> > 	* *Masalah:* Pengaturan keamanan yang tidak diterapkan atau salah setting.
> > 	* *Contoh:* Menggunakan password default, menampilkan pesan error lengkap (stack trace) ke user, atau fitur cloud storage yang terekspos publik.
> > 	
> > 6. **A06: Vulnerable and Outdated Components (Komponen Rentan & Usang)**
> >     
> > 	* *Masalah:* Menggunakan library, framework, atau modul pihak ketiga yang memiliki celah keamanan yang sudah diketahui (CVE).
> > 	* *Penting:* Kita bertanggung jawab atas keamanan kode orang lain yang kita pakai.
> > 	
> >
> > 7. **A07: Identification and Authentication Failures (Kegagalan Identifikasi & Autentikasi)**
> >     
> > 	* *Masalah:* Lemahnya konfirmasi identitas pengguna.
> > 	* *Contoh:* Mengizinkan password lemah ("123456"), tidak ada proteksi Brute Force, atau manajemen sesi yang buruk (session ID tidak validasi).
> > 	
> >
> > 8. **A08: Software and Data Integrity Failures (Kegagalan Integritas Perangkat Lunak & Data)**
> >     
> > 	* *Masalah:* Kode atau infrastruktur tidak terlindungi dari perubahan yang tidak sah.
> > 	* *Contoh:* Update software yang diunduh dari sumber tidak terenkripsi, atau pipeline CI/CD yang tidak aman.
> > 	
> >
> > 9. **A09: Security Logging and Monitoring Failures (Kegagalan Pencatatan & Pemantauan Keamanan)**
> >     
> > 	* *Masalah:* Tidak mencatat (log) kejadian penting atau gagal mendeteksi serangan yang sedang berlangsung.
> > 	* *Dampak:* Penyerang bisa berdiam di sistem selama berbulan-bulan tanpa ketahuan.
> > 	
> >
> > 10. **A10: Server-Side Request Forgery (SSRF)**
> >     
> > 	* *Masalah:* Aplikasi web mengambil data dari URL jarak jauh yang diberikan pengguna tanpa validasi.
> > 	* *Dampak:* Penyerang bisa memaksa server untuk mengakses sistem internal yang seharusnya tidak bisa diakses dari luar.
> > 	

> [!cornell] #### Summary
> 
> Keamanan holistik memerlukan pendekatan berlapis (Defense in Depth) yang mencakup pencegahan, deteksi, hingga pemulihan. Pengembang wajib membedakan Autentikasi (verifikasi identitas) dengan Otorisasi (hak akses) dan menerapkan kontrol seperti HTTPS serta MFA. Pemahaman mendalam tentang OWASP Top 10 (terutama Broken Access Control sebagai risiko tertinggi) sangat krusial untuk memitigasi celah keamanan modern yang sering menembus firewall jaringan.

> [!ad-libitum]- Additional Information: Technical Deep Dive
> 
> #### Symmetric vs Asymmetric Encryption
> 
> Slide hanya menyebutkan istilahnya, berikut detail teknisnya:
> 
> 1. **Symmetric Encryption (Kunci Simetris):**
>     
>     - Menggunakan **SATU kunci yang sama** untuk mengenkripsi (lock) dan mendekripsi (unlock).
>         
>     - _Kecepatan:_ Sangat cepat, cocok untuk data besar (bulk data).
>         
>     - _Masalah:_ Distribusi kunci. Bagaimana cara saya kirim kuncinya ke Anda dengan aman tanpa disadap di jalan?
>         
>     - _Contoh Algoritma:_ AES (Advanced Encryption Standard).
>         
> 2. **Asymmetric Encryption (Public-Key Cryptography):**
>     
>     - Menggunakan **DUA kunci**: Public Key (untuk mengenkripsi) dan Private Key (untuk mendekripsi).
>         
>     - _Konsep:_ Siapapun boleh punya Public Key saya untuk mengirim pesan rahasia ke saya, tapi hanya saya yang punya Private Key untuk membukanya.
>         
>     - _Kecepatan:_ Lambat, komputasi berat.
>         
>     - _Contoh Algoritma:_ RSA, ECC.
>         
> 
> _Penerapan di HTTPS (TLS):_ Menggunakan _keduanya_. Asymmetric digunakan di awal (Handshake) untuk menyepakati kunci sesi secara aman, lalu Symmetric digunakan untuk transfer data selanjutnya agar cepat.
> 
> #### OWASP: Broken Access Control (The New #1)
> 
> Contoh kasus teknis:
> 
> - Insecure Direct Object References (IDOR):
>     
>     URL: example.com/invoice?id=1001 (Milik Anda).
>     
>     Penyerang mengubah jadi: example.com/invoice?id=1002.
>     
>     Jika server langsung menampilkan invoice 1002 tanpa mengecek apakah "User yang sedang login PEMILIK invoice 1002?", maka itu adalah Broken Access Control.
>     

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Sebutkan 5 fungsi kontrol keamanan (Security Control)!</strong></summary>
> 
> Prevent (Mencegah), Deter (Menakuti), Deflect (Mengalihkan), Detect (Mendeteksi), Recover (Memulihkan).
> 
> </details>
> <details>
> 
> <summary><strong>2. Apa perbedaan mendasar antara Authentication dan Authorization?</strong></summary>
> 
> Authentication memverifikasi identitas (siapa Anda), sedangkan Authorization menentukan hak akses (apa yang boleh Anda lakukan terhadap sumber daya tertentu).
> 
> </details>
> <details>
> 
> <summary><strong>3. Mengapa Firewall jaringan tidak cukup untuk melindungi aplikasi web?</strong></summary>
> 
> Karena firewall jaringan biasanya mengizinkan lalu lintas HTTP/HTTPS (port 80/443), sementara serangan aplikasi web (seperti SQLi atau XSS) "menumpang" di dalam lalu lintas yang diizinkan tersebut.
> 
> </details>
> <details>
> 
> <summary><strong>4. Apa itu prinsip "Data Lifetime" dalam privasi?</strong></summary>
> 
> Data tidak boleh disimpan lebih lama dari yang dibutuhkan. Jika tujuan pengumpulan data sudah tercapai atau akun dihapus, data pribadi terkait juga harus dihapus.
> 
> </details>
> <details>
> 
> <summary><strong>5. Apa kerentanan peringkat #1 di OWASP Top 10 tahun 2021 dan apa artinya?</strong></summary>
> 
> Broken Access Control. Artinya, aplikasi gagal membatasi akses pengguna hanya ke data/fitur yang diizinkan untuk mereka (misal: user biasa bisa akses panel admin).
> 
> </details>