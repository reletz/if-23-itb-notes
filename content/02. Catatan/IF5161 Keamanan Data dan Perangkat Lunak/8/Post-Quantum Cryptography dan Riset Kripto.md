---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5161 Keamanan Data dan Perangkat Lunak]]

> [!cornell] Post-Quantum Cryptography dan Riset Kripto
>
> > ## Questions/Cues
> >
> > - Mengapa komputer kuantum mengancam RSA, DH, dan ECC?
> > - Apa itu "harvest now, decrypt later"?
> > - Standar NIST PQC apa yang sudah terbit?
> > - Apa itu verified crypto dan misuse-resistant AEAD?
> > - Alat dan tantangan terbuka apa yang tersisa?
> >
> > ## Reference Points
> >
> > - IF5161 — W07 Crypto and Data Security, "Advances: Post-Quantum Cryptography" s.d. "Open Challenges: Applied Cryptography" dan "Tools for related to Crypto Engineering"
>
> > ### Ancaman Kuantum
> >
> > Komputer kuantum besar yang menjalankan **algoritma Shor** akan memecahkan **RSA, DH, dan skema kurva eliptik**. Ancaman yang sudah nyata hari ini: **"harvest now, decrypt later"**, yaitu lalu lintas terekam sekarang dapat didekripsi di masa depan. Kriptografi simetris dan hash terdampak lebih ringan (cukup menaikkan ukuran kunci/keluaran).
> >
> > **Standar NIST (2024)**:
> >
> > | Standar | Fungsi |
> > |---|---|
> > | **ML-KEM (FIPS 203)** | Key encapsulation |
> > | **ML-DSA (FIPS 204)** | Tanda tangan digital |
> > | **SLH-DSA (FIPS 205)** | Tanda tangan berbasis hash |
> >
> > Penerapan saat ini: **hybrid key exchange** (klasik + post-quantum) pada TLS, sehingga aman jika salah satu runtuh.
> >
> > ```mermaid
> > flowchart LR
> >     INV["1. Inventaris kripto<br/>(di mana RSA/ECC dipakai)"] --> AG["2. Crypto agility<br/>(algoritma dapat diganti)"]
> >     AG --> HY["3. Hybrid<br/>(X25519 + ML-KEM)"]
> >     HY --> PQ["4. Migrasi penuh<br/>ke PQC"]
> > ```
> >
> > ### Verified Crypto dan Riset Misuse
> >
> > - **Implementasi terverifikasi formal**: **HACL\***, **EverCrypt**, **fiat-crypto** (dipakai di Firefox, Linux, dll.).
> > - **Riset misuse detection**: **CryptoGuard**, **CogniCrypt**, dan benchmark suite.
> > - **Review kripto berbantuan LLM**: menjanjikan, tetapi harus dicek terhadap ground truth.
> > - **AEAD misuse-resistant** (mis. **AES-GCM-SIV**) toleran terhadap nonce reuse yang tak disengaja.
> >
> > ### Alat Rekayasa Kripto
> >
> > | Alat | Kegunaan | Lisensi |
> > |---|---|---|
> > | **OpenSSL CLI** | Inspeksi sertifikat, uji handshake | Open source |
> > | **testssl.sh** | Pindai server untuk protokol/cipher lemah | Open source |
> > | **libsodium / PyNaCl** | Memperbaiki implementasi | Open source |
> > | **cryptography** | AEAD, KDF, X.509 di Python | Open source |
> > | **Semgrep p/cryptography, Bandit** | Verifikasi perbaikan | Open source |
> >
> > Contoh inspeksi: `openssl s_client -connect example.org:443 -servername example.org </dev/null | openssl x509 -noout -subject -issuer -dates`, lalu `./testssl.sh --protocols --ciphers example.org`; jelaskan apa yang bisa dilakukan penyerang pada satu temuan lemah.
> >
> > ### Tantangan Terbuka
> >
> > Migrasi sistem legacy ke PQC tanpa merusak interoperabilitas; key management yang ramah developer; analisis statis tak menangkap cacat protokol; **side channel** (timing, cache, daya) pada implementasi yang benar; dan **inventaris kripto** (mengetahui di mana kripto dipakai).

> [!cornell] #### Summary
>
> Algoritma Shor mengancam **RSA/DH/ECC**, dan **harvest-now-decrypt-later** membuat migrasi mendesak. NIST menerbitkan **ML-KEM, ML-DSA, SLH-DSA (2024)** dengan penerapan awal berupa **hybrid key exchange**. Riset berfokus pada **implementasi terverifikasi**, deteksi misuse, dan AEAD tahan nonce reuse, sedangkan tantangan tersisa adalah migrasi legacy, side channel, dan inventaris kripto.

> [!ad-libitum]- Additional Information
>
> #### Mulai dari Inventaris
> Langkah pertama organisasi: **Cryptographic Bill of Materials (CBOM)**, yaitu daftar algoritma, panjang kunci, dan lokasi pemakaian (TLS, VPN, code signing, database). Tanpa inventaris, tidak mungkin memprioritaskan data berumur panjang yang harus dilindungi pertama.
>
> #### Proyek Eksplorasi Mandiri
> 1. Buat inventaris kripto sederhana untuk satu aplikasi: algoritma, kunci, umur data, dan prioritas migrasi.
> 2. Uji TLS hybrid (X25519MLKEM768) dengan OpenSSL 3.5+ atau Chrome dan amati negosiasinya.
>
> #### Bacaan Lanjutan
> - NIST FIPS 203, 204, 205
> - Bernstein & Lange, *Post-quantum cryptography* (Nature, 2017)
