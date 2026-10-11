---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4033 Keamanan Siber]]

> [!cornell] Rangkuman - Studi Kasus Memilih Metode Kriptografi
>
> > ## Questions/Cues
> >
> > - Metode apa yang menjawab Confidentiality, Integrity, Authentication, dan Non-repudiation?
> > - Bagaimana membandingkan metode untuk satu kebutuhan (mis. integrity + authentication)?
> > - Bagaimana menyusun jawaban studi kasus kriptografi?
> > - Skenario apa yang sering muncul dan jawabannya?
> >
> > ## Reference Points
> >
> > - Rangkuman payung 5 (Cryptography)
> > - Rangkuman payung 1 (Security Concepts)
>
> > ### Peta Kebutuhan → Metode
> >
> > | Kebutuhan | Metode yang menjawab | Catatan |
> > |---|---|---|
> > | **Confidentiality** | Enkripsi **simetris** (AES; mode CBC/CTR/GCM) | Kunci dibagikan lewat asimetris/DH (hybrid) |
> > | **Integrity** | **Hash** (jika digest dilindungi), **MAC/HMAC**, **digital signature**, **AES-GCM** | Hash polos tidak cukup: penyerang bisa mengubah pesan dan hash-nya |
> > | **Authentication (asal pesan)** | **MAC/HMAC** (kunci bersama), **digital signature** (kunci publik) | Hash polos **bukan** authentication |
> > | **Authentication (identitas pihak)** | **Sertifikat X.509 + CA/PKI**, mutual TLS | Mengikat kunci publik ke identitas |
> > | **Non-repudiation** | **Digital signature** (+ CA/TTP) | MAC **tidak** bisa |
> > | **Key exchange** | **Diffie-Hellman/ECDH**, **RSA** (enkripsi session key), **KDC (Kerberos)** | DH harus diautentikasi (rentan MitM) |
> > | **Anti-replay** | **Nonce**, timestamp, nomor urut dalam MAC/signature | Enkripsi saja tidak menghentikan replay |
> > | **Confidentiality + Integrity + Authentication sekaligus** | **AES-GCM/CCM (AEAD)**, atau **TLS** | |
> >
> > ### Kasus: "Metode untuk Integrity dan Authentication"
> >
> > **Jawaban lengkap:** ada dua pilihan utama.
> >
> > | Aspek | HMAC (simetris) | Digital signature (asimetris) |
> > |---|---|---|
> > | Cara | tag = H(kunci rahasia ‖ pesan) (HMAC) | tanda tangan = Enc(kunci privat, H(pesan)) |
> > | Integrity | Ya | Ya |
> > | Authentication | Ya, antar dua pihak yang berbagi kunci | Ya, oleh siapa pun yang punya kunci publik |
> > | Non-repudiation | Tidak | Ya |
> > | Kecepatan | Cepat | Lebih lambat |
> > | Kebutuhan | Distribusi kunci rahasia bersama | PKI/sertifikat |
> > | Skala | Sulit untuk banyak pihak | Cocok untuk banyak pihak |
> >
> > **Kesimpulan yang bisa dituliskan:** jika hanya dua pihak yang saling percaya dan butuh cepat (mis. API internal), pakai **HMAC**. Jika penerima banyak, pihak tidak saling percaya, atau perlu bukti hukum (non-repudiation), pakai **digital signature**. Jika sekaligus butuh kerahasiaan, pakai **AES-GCM** atau **TLS**.
> >
> > ### Template Menjawab Studi Kasus
> >
> > 1. **Identifikasi kebutuhan** (C, I, A, NR) dan **ancaman** (sadap, ubah, replay, menyamar).
> > 2. **Pilih mekanisme** per kebutuhan (tabel di atas) dan sebut **algoritma konkret** (AES-GCM, HMAC-SHA256, RSA/ECDSA, SHA-256).
> > 3. **Jelaskan alur** singkat: siapa menghitung apa dengan kunci apa, siapa memverifikasi.
> > 4. **Sebut kelemahan atau syarat**: distribusi kunci, nonce unik, sertifikat valid.
> >
> > ### Skenario Umum dan Jawaban Ringkas
> >
> > | Skenario | Jawaban |
> > |---|---|
> > | **Mengirim email rahasia dan bertanda tangan** | Hash pesan → tanda tangan dengan kunci privat pengirim; enkripsi pesan dengan session key simetris; session key dienkripsi kunci publik penerima (hybrid) |
> > | **Checkout e-commerce** | TLS: sertifikat server (authentication), kunci sesi hasil key exchange (confidentiality), MAC/AEAD (integrity); log transaksi untuk accountability |
> > | **Distribusi update software** | Digital signature atas hash paket dengan kunci vendor; klien verifikasi dengan kunci publik/sertifikat |
> > | **Menyimpan password** | **Hash** berkunci/lambat dengan **salt** (bcrypt/Argon2), bukan enkripsi; hash cepat seperti MD5/SHA-1 tidak layak |
> > | **API antar-layanan internal** | HMAC dengan nonce/timestamp untuk integritas, autentikasi, anti-replay |
> > | **Transfer file besar ke banyak pihak** | Enkripsi simetris (AES-GCM) untuk data + RSA/ECC untuk mengirim kuncinya |
> > | **Membuktikan dokumen tidak diubah sejak tanggal tertentu** | Hash + digital signature + timestamp tepercaya |
> > | **Dua pihak bertukar kunci di jaringan terbuka** | Diffie-Hellman/ECDHE + autentikasi (sertifikat atau tanda tangan) agar tidak MitM |
> > | **Mencegah replay transfer uang** | Tambahkan nonce/timestamp/sequence number ke dalam MAC atau signature |
> >
> > ```mermaid
> > flowchart LR
> >     M["Pesan"] --> H["Hash H(m)"] --> S["Tanda tangan<br/>(kunci privat)"]
> >     M --> K["Enkripsi AES<br/>(session key)"]
> >     SK["Session key"] --> E["Enkripsi RSA/ECC<br/>(kunci publik penerima)"]
> >     S --> P["Paket: ciphertext + signature + session key terenkripsi"]
> >     K --> P
> >     E --> P
> > ```

> [!cornell] #### Summary
>
> Pemetaan inti: **confidentiality → enkripsi simetris (hybrid untuk kunci)**; **integrity → hash terlindungi/MAC/signature**; **authentication pesan → MAC atau digital signature (bukan hash polos)**; **non-repudiation → hanya digital signature**; **anti-replay → nonce/timestamp**. Untuk "integrity + authentication": **HMAC** (cepat, kunci bersama, tanpa NR) vs **digital signature** (skala besar, ada NR, butuh PKI); untuk semuanya sekaligus pakai **AES-GCM atau TLS**.

> [!ad-libitum]- Additional Information
>
> #### Jebakan yang Sering Dipakai Penguji
>
> - Hash saja untuk authentication → salah (tidak ada rahasia).
> - Enkripsi = integrity → salah (ciphertext dapat dimodifikasi; butuh MAC/AEAD).
> - MAC memberi non-repudiation → salah.
> - Diffie-Hellman memberi enkripsi → salah (hanya kesepakatan kunci) dan rentan MitM tanpa autentikasi.
> - Password disimpan terenkripsi → sebaiknya di-hash dengan salt.
>
> #### Detail Lengkap
> - [[Hash Function, Message Digest, MAC, dan HMAC]], [[Kriptografi Kunci Publik dan Tanda Tangan Digital]], [[Kriptografi Asimetris - RSA dan Diffie-Hellman]], [[Mode Operasi Cipher Blok pada AES]]
