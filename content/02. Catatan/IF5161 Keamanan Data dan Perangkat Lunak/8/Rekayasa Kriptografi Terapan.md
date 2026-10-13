---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5161 Keamanan Data dan Perangkat Lunak]]

> [!cornell] Rekayasa Kriptografi Terapan
>
> > ## Questions/Cues
> >
> > - Primitif kripto apa yang tersedia dan tujuan masing-masing?
> > - Mengapa AEAD wajib untuk desain baru?
> > - Bagaimana mengelola nonce, IV, dan randomness?
> > - Seperti apa siklus hidup manajemen kunci?
> > - Bagaimana TLS 1.3 dan PKI menerapkan kripto dalam praktik?
> > - Library apa yang sebaiknya dipakai?
> >
> > ## Reference Points
> >
> > - IF5161 — W07 Crypto and Data Security, "Applied Cryptographic Engineering" (Foundation: The Cryptographic Toolbox s.d. "Current Practice: Prefer Vetted, High-Level Libraries")
>
> > ### Toolbox Kriptografi
> >
> > | Primitif | Tujuan | Kunci | Contoh |
> > |---|---|---|---|
> > | **Symmetric cipher** | Confidentiality | Shared secret | AES, ChaCha20 |
> > | **AEAD** | Confidentiality + integrity | Shared secret | AES-GCM, ChaCha20-Poly1305 |
> > | **Hash** | Sidik jari | Tanpa kunci | SHA-256, SHA-3 |
> > | **MAC** | Integrity + authenticity | Shared secret | HMAC-SHA-256 |
> > | **KDF / password hash** | Turunkan kunci, perlambat tebakan | Salt (+ secret) | HKDF, Argon2id, scrypt |
> > | **KEM** | Key establishment | Public/private | X25519, ML-KEM |
> > | **Asymmetric encryption** | Confidentiality | Public/private | RSA-OAEP |
> > | **Signature** | Authenticity, non-repudiation | Public/private | Ed25519, ECDSA, ML-DSA |
> >
> > ### AEAD: Mengapa Enkripsi Terautentikasi
> >
> > Enkripsi biasa (CBC, CTR) menyembunyikan data tetapi **tidak mendeteksi perubahan**. **AEAD** menghasilkan ciphertext + **authentication tag**; dekripsi gagal bila ada yang berubah. **AAD** (associated data, mis. header/ID) diautentikasi tetapi tidak dienkripsi. **Aturan: jangan pakai mode tanpa autentikasi pada desain baru.**
> >
> > ```mermaid
> > flowchart LR
> >     P["Plaintext"] --> E["AEAD Encrypt<br/>(key, nonce, AAD)"]
> >     E --> C["Ciphertext + Tag"]
> >     C --> D["AEAD Decrypt<br/>(key, nonce, AAD)"]
> >     D -->|"tag valid"| P2["Plaintext"]
> >     D -->|"berubah"| X["Error: ditolak"]
> > ```
> >
> > ### Nonce, IV, dan Randomness
> >
> > **Nonce** = angka dipakai sekali per kunci; **IV** = nilai awal, sering harus tak terduga. **AES-GCM** memakai nonce 96-bit; nonce acak aman hanya sampai batas jumlah pesan per kunci sehingga perlu **rotasi kunci atau counter**. Pilih library yang membangkitkan nonce atau konstruksi *misuse-resistant*. Keacakan wajib dari **CSPRNG OS**: `os.urandom`, `secrets`, `/dev/urandom`.
> >
> > ### Manajemen Kunci
> >
> > Sebagian besar insiden nyata adalah **kegagalan manajemen kunci**, bukan kegagalan cipher. Siklus hidup: *generate → distribusi/penyimpanan → penggunaan → rotasi → revokasi → penghancuran*, dengan kontrol akses, pemisahan tugas, dan audit.
> >
> > ### TLS 1.3 dan PKI
> >
> > TLS 1.3 sebagai kripto terapan: **ephemeral key exchange memberi forward secrecy**, **sertifikat memberi autentikasi**, dan **AEAD melindungi record**. Validasi sertifikat memeriksa rantai kepercayaan, hostname, dan masa berlaku; `verify=False` melompati ketiganya.
> >
> > ### Library yang Divetting
> >
> > | Library | Bahasa | Alasan |
> > |---|---|---|
> > | **libsodium / PyNaCl** | C, Python, banyak | Default aman, sulit disalahgunakan, nonce ditangani |
> > | **Google Tink** | Java, Go, Python | API tahan misuse, key management built-in |
> > | **cryptography** | Python | Lapisan recipes (Fernet, AESGCM) + low-level |
> > | **OpenSSL** | C | Lengkap tetapi tajam; dipakai di balik layar |
> >
> > Aturan: **jangan implementasikan primitif; jangan merangkai primitif bila ada recipe**.

> [!cornell] #### Summary
>
> Pilih primitif sesuai tujuan: **AEAD** untuk confidentiality+integrity, **MAC/hash** untuk integritas, **KDF (Argon2id)** untuk password, **KEM/signature** untuk kunci publik. Nonce harus unik, keacakan dari **CSPRNG OS**, dan **manajemen kunci** lebih menentukan daripada cipher. TLS 1.3 dan PKI menerapkan semuanya; gunakan **library tingkat tinggi** (libsodium, Tink, cryptography) dan jangan merangkai sendiri.

> [!ad-libitum]- Additional Information
>
> #### Envelope Encryption
> Pola umum pada KMS cloud: **DEK** (data encryption key) mengenkripsi data, lalu DEK dienkripsi oleh **KEK** di KMS/HSM. Rotasi KEK hanya mengenkripsi ulang DEK kecil, bukan seluruh data. Ini menjawab pertanyaan "bagaimana merotasi tanpa meng-enkripsi ulang semuanya" pada [[Klasifikasi Data, DLP, dan Regulasi]].
>
> #### Proyek Eksplorasi Mandiri
> 1. Implementasikan envelope encryption dengan AES-GCM dan KMS lokal (mis. HashiCorp Vault Transit).
> 2. Pindai server Anda dengan `testssl.sh` dan jelaskan satu temuan lemah.
>
> #### Bacaan Lanjutan
> - Ferguson, Schneier & Kohno, *Cryptography Engineering*
> - Dokumentasi libsodium dan Google Tink
> - RFC 8446 (TLS 1.3)
