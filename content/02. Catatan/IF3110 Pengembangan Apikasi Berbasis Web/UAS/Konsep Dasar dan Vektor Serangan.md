---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3110 Pengembangan Aplikasi Berbasis Web]]

> [!cornell] Topic: Web App Security - Fundamentals & Attack Vectors
> 
> > ## Questions/Cues
> >
> > - CIA Triad
> >     
> > - Vulnerability vs Threat
> >     
> > - SQL Injection (SQLi)
> >     
> > - Cross-Site Scripting (XSS)
> >     
> > - Session Hijacking
> >     
> > - DoS vs DDoS
> >     
> > - Brute Force Attack
> >     
> >
> > ## Reference Points
> >
> > - Slides: IF3110-13-Web-App-Security-n-Privacy (Pages 1-17)
> >     
> > - OWASP.org
> >     
> 
> > ### Konsep Dasar Keamanan Informasi (CIA Triad)
> >
> > Keamanan informasi bertujuan melindungi layanan digital yang memediasi aktivitas dunia nyata. Tiga pilar utamanya (CIA) adalah:
> >
> > 1. **Confidentiality (Kerahasiaan):** Memastikan hanya pihak yang berhak yang dapat mengakses data atau layanan. Contoh: Hanya Anda yang bisa melihat saldo rekening bank Anda.
> >     
> > 2. **Integrity (Integritas):** Menjamin layanan dan data berperilaku benar dan tidak dimodifikasi oleh pihak tak berwenang. Contoh: Saldo tidak berubah sendiri tanpa transaksi yang sah.
> >     
> > 3. **Availability (Ketersediaan):** Memastikan pengguna yang sah selalu memiliki akses ke layanan saat dibutuhkan. Contoh: Website bank bisa diakses 24/7.
> >     
> >
> > _Tambahan:_ Keamanan juga mencakup **Privacy** (perlindungan data pribadi) dan **Accountability** (kemampuan melacak siapa melakukan apa).
> >
> > ### Terminologi Keamanan: Vulnerability, Threat, Attack, Control
> >
> > Hubungan sebab-akibat dalam keamanan siber dapat dijelaskan sebagai berikut:
> >
> > - **Vulnerability (Kerentanan):** Sebuah _kelemahan_ dalam sistem keamanan. (Ibarat jendela rumah yang lupa dikunci).
> >     
> > - **Threat (Ancaman):** Kondisi atau situasi yang _berpotensi_ menyebabkan kerugian. (Ibarat adanya pencuri di lingkungan sekitar).
> >     
> > - **Attack (Serangan):** Tindakan nyata mengeksploitasi _vulnerability_ oleh manusia (penyerang). (Pencuri masuk melalui jendela yang tak terkunci).
> >     
> > - **Control (Pengendalian):** Langkah perlindungan untuk mencegah atau memitigasi serangan. (Memasang teralis besi pada jendela).
> >     
> >
> > ### Cross-Origin Resource Sharing (CORS)
> >
> > Mekanisme browser yang mengizinkan server untuk menunjukkan _origin_ (sumber) lain mana yang boleh memuat sumber daya miliknya.
> >
> > - Secara default, browser membatasi skrip (seperti JavaScript) untuk mengakses sumber daya dari domain yang berbeda demi keamanan (_Same-origin policy_).
> >     
> > - CORS menggunakan **HTTP header** untuk memberi "izin" pengecualian ini secara aman.
> >     
> >
> > ### Injection Attacks (Serangan Injeksi)
> >
> > Jenis serangan di mana pengguna jahat memasukkan kode berbahaya atau perintah database melalui input field yang valid. Sistem yang tidak memvalidasi input akan mengeksekusi perintah tersebut.
> >
> > #### 1. SQL Poisoning / Injection (SQLi)
> >
> > Serangan spesifik pada database SQL.
> >
> > - **Mekanisme:** Penyerang memasukkan potongan perintah SQL ke dalam form input (misal: kolom login).
> >     
> > - **Dampak:** Aplikasi menggabungkan input tersebut ke dalam query database asli. Ini bisa mem-bypass autentikasi (misal: login tanpa password) atau membocorkan seluruh isi database.
> >     
> > - **Ilustrasi:** Input `admin' OR '1'='1` dapat memanipulasi logika query menjadi "BENAR" secara universal, memberikan akses admin.
> >     
> >
> > #### 2. Cross-Site Scripting (XSS)
> >
> > Serangan injeksi yang menargetkan pengguna lain dari aplikasi web.
> >
> > - **Mekanisme:** Penyerang menyisipkan skrip berbahaya (biasanya JavaScript) ke halaman web yang dilihat pengguna lain.
> >     
> > - **Cara Kerja:** Script ini dieksekusi oleh browser korban seolah-olah berasal dari website terpercaya.
> >     
> > - **Dampak:** Pencurian **session cookies** (memungkinkan pembajakan akun), redirect ke situs palsu, atau manipulasi tampilan web.
> >     
> > - **Pencegahan Utama:** Validasi input (memastikan input sesuai format) dan sanitasi output (mengubah karakter berbahaya menjadi teks biasa agar tidak dieksekusi browser).
> >     
> >
> > ### Session Hijacking (Pembajakan Sesi)
> >
> > Mengambil alih sesi aktif pengguna yang sah untuk menyamar menjadi mereka.
> >
> > - **Konsep Sesi:** Setelah login, server memberi "Session Cookie" agar pengguna tidak perlu login ulang tiap klik halaman.
> >     
> > - **Serangan:** Jika penyerang mendapatkan cookie ini (misal lewat XSS atau menyadap jaringan/traffic monitoring), mereka bisa mengakses akun korban tanpa perlu tahu username/password.
> >     
> >
> > ### Denial of Service (DoS) & Brute Force
> >
> > - **DoS (Denial of Service):** Serangan untuk membuat sistem _unavailable_ (lumpuh/down).
> > 	
> > 	- **DDoS (Distributed DoS):** Menggunakan ribuan komputer (botnet) untuk membanjiri server dengan traffic palsu secara bersamaan.
> > 			
> > 	- **User Lockout:** Sengaja salah login berkali-kali pada akun korban agar sistem mengunci akun tersebut (fitur keamanan yang dijadikan senjata).
> > 			
> > - **Brute Force Attack:** Mencoba menebak password dengan mencoba semua kombinasi yang mungkin.
> > 	
> > 	- Penyerang memanfaatkan password lemah atau daftar password umum.
> > 			
> > 	- **Mitigasi:** Mewajibkan password panjang/kompleks dan membatasi jumlah percobaan login.
> > 			

> [!cornell] #### Summary
> 
> Keamanan aplikasi web berfokus pada perlindungan properti CIA (Confidentiality, Integrity, Availability) dari berbagai ancaman yang mengeksploitasi kerentanan (vulnerability). Serangan utama meliputi Injection (SQLi & XSS) yang memanipulasi input data, Session Hijacking yang mencuri identitas sesi, serta serangan ketersediaan seperti DoS. Pemahaman mendalam tentang mekanisme serangan ini adalah langkah pertama sebelum menerapkan kontrol pertahanan yang efektif.

> [!ad-libitum]- Additional Information: Technical Deep Dive
> 
> #### Anatomi SQL Injection (Logical Bypass)
> 
> Contoh klasik serangan SQLi pada form login:
> 
> - **Query Asli di Server:**
>     
>     ```sql
>     SELECT * FROM users WHERE username = '$user_input' AND password = '$password_input';
>     ```
>     
> - **Input Penyerang:** `admin' OR '1'='1`
>     
> - **Query yang Terbentuk:**
>     
>     ```sql
>     SELECT * FROM users WHERE username = 'admin' OR '1'='1' AND password = '...';
>     ```
>     
>
> - **Analisis Logika:** Karena `'1'='1'` selalu bernilai **TRUE**, database mengabaikan pengecekan password dan mengembalikan baris pertama (biasanya akun admin).
>     
> 
> #### Jenis-Jenis XSS (Cross-Site Scripting)
> 
> 1. **Stored XSS (Persistent):** Script berbahaya disimpan di database server (misal: di kolom komentar). Setiap kali orang membuka halaman komentar itu, script tereksekusi. Paling berbahaya.
>     
> 2. **Reflected XSS (Non-Persistent):** Script dipantulkan segera oleh server web dari input pengguna (misal: lewat parameter URL pencarian). Korban harus mengklik link spesifik yang dibuat penyerang.
>     
> 3. **DOM-based XSS:** Kerentanan terjadi di sisi klien (browser) saat JavaScript memproses data dari sumber yang tidak aman tanpa sanitasi.
>     
> 
> #### Mekanisme Session Cookie
> 
> Cookie sesi biasanya berupa string acak panjang (misal: `JSESSIONID=A94B...`). Jika bendera `HttpOnly` tidak diaktifkan pada cookie, JavaScript (termasuk script XSS) dapat membacanya lewat `document.cookie`. Ini adalah celah utama session hijacking.

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Apa perbedaan antara Vulnerability dan Threat?</strong></summary>
> 
> Vulnerability adalah kelemahan internal sistem (seperti pintu tak terkunci), sedangkan Threat adalah potensi bahaya eksternal yang mungkin mengeksploitasi kelemahan tersebut (seperti pencuri).
> 
> </details>
>
> <details>
> 
> <summary><strong>2. Jelaskan konsep CIA Triad dalam keamanan informasi!</strong></summary>
> 
> Confidentiality (Kerahasiaan/hanya akses sah), Integrity (Integritas/data akurat & tak berubah), dan Availability (Ketersediaan/layanan bisa diakses saat butuh).
> 
> </details>
>
> <details>
> 
> <summary><strong>3. Bagaimana mekanisme dasar serangan SQL Injection?</strong></summary>
> 
> Penyerang memasukkan perintah SQL ke dalam input field yang tidak divalidasi, sehingga database mengeksekusi input tersebut sebagai bagian dari perintah logis (bukan sekadar data).
> 
> </details>
>
> <details>
> 
> <summary><strong>4. Apa dampak utama dari serangan XSS (Cross-Site Scripting)?</strong></summary>
> 
> Script berbahaya berjalan di browser korban, memungkinkan pencurian Session Cookie, pembajakan akun, atau redirect ke situs berbahaya.
> 
> </details>
>
> <details>
> 
> <summary><strong>5. Apa itu Session Hijacking dan bagaimana hubungannya dengan Cookie?</strong></summary>
> 
> Pengambilalihan akun pengguna dengan mencuri Session Cookie yang valid. Karena server mengenali pengguna dari cookie ini, penyerang bisa menyamar tanpa password.
> 
> </details>
>
> <details>
> 
> <summary><strong>6. Apa perbedaan DoS dan DDoS?</strong></summary>
> 
> DoS (Denial of Service) dilakukan dari satu sumber untuk melumpuhkan server, sedangkan DDoS (Distributed DoS) menggunakan banyak komputer (botnet) secara bersamaan untuk dampak yang lebih besar.
> 
> </details>