---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4033 Keamanan Siber]]

> [!cornell] Rangkuman - Studi Kasus Membaca Kode
>
> > ## Questions/Cues
> >
> > - Bagaimana cara sistematis membaca kode untuk menemukan kerentanan?
> > - Pola kerentanan apa yang sering muncul pada kode soal?
> > - Bagaimana memperbaikinya?
> > - Bagaimana memetakan temuan ke CIA dan prinsip desain?
> >
> > ## Reference Points
> >
> > - Rangkuman payung 2 (Software Security)
> > - Rangkuman payung 8-9 (konfigurasi pod cloud-native)
>
> > ### Cara Membaca Kode (5 Langkah)
> >
> > 1. **Cari input dari luar**: socket, request HTTP, parameter, file, env var.
> > 2. **Ikuti sampai sink berbahaya**: akses file, query DB, perintah shell, `strcpy`, output ke HTML.
> > 3. **Periksa pertahanan di jalur itu**: validasi input, penanganan exception, otorisasi, escape.
> > 4. **Periksa hak dan rahasia**: berjalan sebagai siapa, kredensial hardcoded, kripto lemah.
> > 5. **Klasifikasikan dan beri perbaikan**: CIA mana yang rusak, prinsip desain mana yang dilanggar.
> >
> > ### Kasus 1: SimpleWebServer (dari slide)
> >
> > ```java
> > String request = br.readLine();                 // input dari klien
> > StringTokenizer st = new StringTokenizer(request, " ");
> > command  = st.nextToken();                      // (1) bisa melempar exception
> > pathname = st.nextToken();
> > ...
> > fr = new FileReader(pathname);                  // (2) path dari klien dipakai langsung
> > ```
> >
> > | # | Temuan | Dampak | Perbaikan |
> > |---|---|---|---|
> > | 1 | Request kosong → `nextToken()` melempar exception tak tertangani; server crash | **Availability** (DoS) | `try/catch`, balas `400 Bad Request`, tutup koneksi |
> > | 2 | `../../etc/shadow` dibaca karena path tidak divalidasi | **Confidentiality** (path traversal) | Validasi/kanonikalisasi path, batasi ke root dokumen |
> > | 3 | Server tidak membatasi hak proses | Dampak membesar | **Least privilege**: jalankan sebagai user biasa |
> > | 4 | Tidak percaya input → belum diterapkan | Akar masalah | **Never trust user input** |
> >
> > ### Kasus 2: Pola Lain yang Sering Muncul
> >
> > **SQL Injection**
> >
> > ```java
> > String q = "SELECT * FROM users WHERE name='" + name + "' AND pw='" + pw + "'";
> > ```
> >
> > Input `' OR '1'='1` membuat kondisi selalu benar → bypass login (**Authentication/Confidentiality**). Perbaikan: **prepared statement** (parameter terikat), validasi, akun DB **least privilege**.
> >
> > **Buffer overflow (C)**
> >
> > ```c
> > char buf[16];
> > strcpy(buf, argv[1]);   // tanpa pengecekan panjang
> > ```
> >
> > Input panjang menimpa memori (crash atau **RCE**). Perbaikan: `strncpy`/`snprintf`, cek panjang, bahasa memory-safe.
> >
> > **Kredensial hardcoded**
> >
> > ```java
> > String password = "P@ssw0rd123";
> > ```
> >
> > Terbaca dari repo atau binary. Perbaikan: simpan di secrets manager/env/vault, rotasi.
> >
> > **Kripto lemah**
> >
> > ```java
> > Cipher.getInstance("DES/ECB/NoPadding");  MessageDigest.getInstance("MD5");
> > ```
> >
> > DES (56-bit) mudah di-brute force, ECB membocorkan pola, MD5 collision. Perbaikan: AES-GCM, SHA-256, password hash (bcrypt/Argon2) dengan salt.
> >
> > **Authorization tidak dicek (IDOR)**
> >
> > ```java
> > Order o = db.getOrder(request.getParameter("id")); // tidak cek pemilik
> > ```
> >
> > Pengguna lain dapat membaca pesanan siapa pun (**Authorization/Confidentiality**). Perbaikan: periksa bahwa `o.owner == currentUser`.
> >
> > **Output tanpa escape (XSS)**
> >
> > ```java
> > out.println("Halo " + request.getParameter("name"));
> > ```
> >
> > Skrip penyerang dieksekusi di browser korban. Perbaikan: HTML escape, CSP.
> >
> > **Error handling membuka celah (fail-open)**
> >
> > ```java
> > try { if (!authServer.check(user)) return deny(); }
> > catch (Exception e) { /* lanjut saja */ }   // gagal → lolos
> > ```
> >
> > Melanggar **fail-secure**. Perbaikan: `catch` berakhir di `deny`.
> >
> > **Pod/konfigurasi (cloud-native)**
> >
> > ```yaml
> > hostNetwork: true
> > securityContext: { privileged: true }
> > image: myapp:latest
> > env: [{ name: DB_PASSWORD, value: "P@ssw0rd123" }]
> > ```
> >
> > Masalah: host network, privileged, tag `:latest`, secret hardcoded, tanpa resource limit. Perbaikan: `runAsNonRoot`, drop ALL capabilities, image digest, `secretRef`, limits.
> >
> > ### Tabel Cepat: Temuan → Klasifikasi
> >
> > | Gejala di kode | Istilah | Properti yang rusak | Prinsip dilanggar |
> > |---|---|---|---|
> > | Exception tak tertangani | DoS | Availability | Fail-secure |
> > | Path dari input dipakai langsung | Path traversal | Confidentiality | Never trust input, least privilege |
> > | String concat ke query | SQL injection | C, I, authN | Input validation |
> > | `strcpy` tanpa batas | Buffer overflow | C, I, A | Secure coding |
> > | Password di kode | Hardcoded credential | Confidentiality | Secure by default |
> > | Tidak cek pemilik | IDOR/broken access control | Authorization | Least privilege |
> > | Log tidak ada/bisa diubah | - | Accountability | - |

> [!cornell] #### Summary
>
> Cara membaca kode: **cari input → ikuti ke sink → cek validasi/exception/otorisasi → cek hak dan rahasia → klasifikasikan (CIA) dan perbaiki**. Pada SimpleWebServer: **DoS** (exception tak tertangani; fix: try/catch + 400) dan **path traversal** (path tak divalidasi; fix: validasi path), dengan pelajaran *handle exceptions, least privilege, never trust input*. Pola lain: SQL injection, buffer overflow, hardcoded credential, kripto lemah, IDOR, XSS, fail-open.

> [!ad-libitum]- Additional Information
>
> #### Format Jawaban
>
> Tulis **baris/potongan kode yang bermasalah → jenis kerentanan → dampak ke CIA → cara eksploitasi singkat → perbaikan (sertakan potongan kode)**. Jika kode panjang dan hanya sebagian yang ditanyakan, fokus pada **jalur dari input ke sink**, bukan membaca semua baris.
>
> #### Detail Lengkap
> - [[Studi Kasus SimpleWebServer - DoS dan Path Traversal]], [[Software Security dan Application Layer]], [[Prinsip Desain Keamanan - Defense in Depth hingga Fail-Secure]], [[Anatomi Breach Cloud-Native dan Respons Insiden]]
