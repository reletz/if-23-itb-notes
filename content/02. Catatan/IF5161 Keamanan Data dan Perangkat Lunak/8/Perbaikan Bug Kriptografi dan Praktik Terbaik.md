---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5161 Keamanan Data dan Perangkat Lunak]]

> [!cornell] Perbaikan Bug Kriptografi dan Praktik Terbaik
>
> > ## Questions/Cues
> >
> > - Bagaimana memperbaiki tiap bug kripto dari [[Bug Kriptografi Lima Kelas Utama]]?
> > - Mengapa AESGCM/PyNaCl lebih aman daripada ECB/CBC manual?
> > - Bagaimana memuat kunci tanpa hardcode?
> > - Bagaimana menyimpan password dengan benar?
> > - Apa praktik terbaik dan anti-pattern engineering kripto?
> >
> > ## Reference Points
> >
> > - IF5161 — W07 Crypto and Data Security, "Fix 1" s.d. "Fix 6", "Current Best Practices", "Anti-Patterns (Engineering Edition)"
>
> > ### Enam Perbaikan
> >
> > | Bug | Perbaikan | Catatan |
> > |---|---|---|
> > | ECB / enkripsi tanpa autentikasi | **AEAD (AES-GCM)** | Nonce 12 byte acak per pesan; `decrypt` melempar error jika dimodifikasi |
> > | IV statis | **Nonce dikelola library** (PyNaCl `SecretBox`) | Tidak ada parameter nonce yang bisa salah; terautentikasi by default |
> > | Kunci hardcoded | **Sumber kunci eksternal** | Env var dari platform; lebih baik **KMS/HSM/secrets manager** dengan audit log; **rotasi kunci yang bocor**; gitleaks di CI |
> > | RNG lemah | **CSPRNG** (`secrets.token_urlsafe(32)`) | Juga untuk IV, salt, API key, session ID; token sekali pakai, kedaluwarsa, disimpan ter-hash |
> > | Hash cepat | **Argon2id** (memory-hard, bersalt) | scrypt/bcrypt alternatif; setel biaya agar satu hash puluhan–ratusan ms |
> > | Sertifikat/perbandingan | Validasi default + `hmac.compare_digest` | Perbaiki masalah sertifikat, jangan mematikan pengecekan |
> >
> > Contoh Fix 1:
> >
> > ```python
> > from cryptography.hazmat.primitives.ciphers.aead import AESGCM
> > import os
> > key = AESGCM.generate_key(bit_length=256)    # simpan di KMS, bukan kode
> > aead = AESGCM(key)
> > def encrypt_record(data: bytes, aad: bytes) -> bytes:
> >     nonce = os.urandom(12)                   # unik per pesan
> >     return nonce + aead.encrypt(nonce, data, aad)
> > def decrypt_record(blob: bytes, aad: bytes) -> bytes:
> >     nonce, ct = blob[:12], blob[12:]
> >     return aead.decrypt(nonce, ct, aad)      # error jika dimodifikasi
> > ```
> >
> > Contoh Fix 5: `pwhash.argon2id.str(pw.encode())` untuk menyimpan, `pwhash.argon2id.verify(stored, pw.encode())` untuk memverifikasi (bungkus `try/except` dan kembalikan `False` bila gagal).
> >
> > ```mermaid
> > flowchart LR
> >     B1["ECB / CBC mentah"] --> F1["AEAD (AES-GCM)"]
> >     B2["IV statis"] --> F2["Nonce dari library"]
> >     B3["Kunci hardcoded"] --> F3["KMS / secrets manager"]
> >     B4["random()"] --> F4["secrets / CSPRNG"]
> >     B5["MD5 / SHA-256 polos"] --> F5["Argon2id"]
> >     B6["verify=False / =="] --> F6["Validasi + compare_digest"]
> > ```
> >
> > ### Praktik Terbaik
> >
> > - AEAD dengan nonce unik per pesan dan **kebijakan rotasi kunci**.
> > - Library tingkat tinggi (libsodium, Tink), tetap ditambal.
> > - Kunci di **KMS/HSM/secrets manager**, pemisahan tugas, audit penggunaan.
> > - Password dengan **Argon2id/scrypt/bcrypt**, tidak pernah enkripsi reversibel.
> > - Validasi sertifikat, **TLS 1.3**, pindai dengan `testssl.sh` di CI.
> > - **Crypto agility**: algoritma dan kunci harus dapat diganti.
> >
> > ### Anti-Pattern Engineering
> >
> > Algoritma atau "obfuscation" buatan sendiri; merangkai protokol sendiri dari primitif (enkripsi tapi lupa autentikasi); enkripsi tanpa autentikasi; **kunci disimpan di samping data yang dilindunginya**; validasi sertifikat dimatikan "hanya untuk testing"; primitif usang dipertahankan demi kenyamanan (MD5, SHA-1, RC4, 3DES, RSA-1024).

> [!cornell] #### Summary
>
> Perbaiki **penggunaan, bukan algoritma**: **AEAD** menggantikan ECB/CBC mentah, nonce dikelola library, kunci dari **KMS/secrets manager** (dan dirotasi bila bocor), token dari **CSPRNG**, password dengan **Argon2id**, sertifikat divalidasi dan MAC dibandingkan constant-time. Tambahkan **crypto agility** serta scanner di CI untuk mencegah regresi.

> [!ad-libitum]- Additional Information
>
> #### Memverifikasi Perbaikan
> Setelah memperbaiki, jalankan ulang Semgrep `p/cryptography`, Bandit, dan gitleaks (seperti pada [[Deteksi Crypto Misuse dan Padding Oracle]]) serta tambahkan **test negatif**: modifikasi 1 byte ciphertext harus gagal didekripsi; dua enkripsi plaintext sama harus menghasilkan ciphertext berbeda.
>
> #### Proyek Eksplorasi Mandiri
> 1. Refactor file sampel berisi lima bug menjadi versi aman dan tulis test negatif untuk tiap perbaikan.
> 2. Ukur waktu hash Argon2id pada mesin Anda dan setel parameter ke target 100 ms.
>
> #### Bacaan Lanjutan
> - OWASP Cryptographic Storage Cheat Sheet
> - OWASP Password Storage Cheat Sheet
