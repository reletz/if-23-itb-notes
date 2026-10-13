---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5161 Keamanan Data dan Perangkat Lunak]]

> [!cornell] Deteksi Crypto Misuse dan Padding Oracle
>
> > ## Questions/Cues
> >
> > - Alat apa yang dapat mendeteksi penyalahgunaan kripto (Semgrep, Bandit, gitleaks)?
> > - Bug apa yang lolos dari semua scanner pada contoh file sampel?
> > - Apa batasan deteksi otomatis (design-level, cross-file, false positive)?
> > - Bagaimana padding-oracle attack mendekripsi tanpa kunci?
> >
> > ## Reference Points
> >
> > - IF5161 — W07 Crypto and Data Security, "Detecting Crypto Misuse: Tooling Landscape" s.d. "Open Challenges: Detecting Crypto Misuse" dan "Illustration: Padding-Oracle Attacks"
>
> > ### Membaca File Sampel
> >
> > File `crypto_misuse_sample.py` memuat bug-bug berikut yang sengaja ditanam:
> >
> > | Baris | Bug |
> > |---|---|
> > | `KEY = b"SuperSecretKey!!"` | Kunci hardcoded |
> > | `IV = b"\x00" * 16` | IV statis |
> > | `Cipher(algorithms.AES(KEY), modes.ECB())` | Mode ECB |
> > | `str(random.randint(0, 10**9))` untuk reset token | RNG lemah |
> > | `hashlib.md5(pw.encode()).hexdigest()` | Hash password cepat |
> >
> > Plus **satu temuan halus** yang terlewat aturan pola: kunci diturunkan dari string konstan.
> >
> > ### Menjalankan Scanner
> >
> > ```bash
> > semgrep --config p/cryptography crypto_misuse_sample.py
> > bandit -r crypto_misuse_sample.py
> > gitleaks detect --no-git -s .
> > ```
> >
> > Latihan: bandingkan temuan masing-masing alat; **bug mana yang tak dilaporkan satu pun alat?** Biasanya yang bersifat aliran data (kunci turunan dari konstanta) atau desain.
> >
> > ```mermaid
> > flowchart TB
> >     SRC["Source code &amp; repo"] --> SG["Semgrep p/cryptography<br/>(pola API)"]
> >     SRC --> BD["Bandit<br/>(Python AST)"]
> >     SRC --> GL["gitleaks / trufflehog<br/>(secret scanning)"]
> >     SG --> F["Temuan"]
> >     BD --> F
> >     GL --> F
> >     F --> R["Reviewer manusia<br/>(design flaw, data-flow)"]
> > ```
> >
> > ### Tantangan Terbuka Deteksi
> >
> > - **Cacat tingkat desain** (protokol salah, tanpa autentikasi) tak terlihat aturan pola.
> > - **Aliran data lintas file/library** untuk kunci dan IV.
> > - **False positive** yang membuat alat diabaikan developer.
> > - **Detektor berbasis LLM**: recall menjanjikan, presisi tak andal, sulit dipercaya pada hasil negatif.
> >
> > Kesimpulan: **alat menemukan pola, reviewer menemukan cacat desain**.
> >
> > ### Padding-Oracle Attack
> >
> > Syarat: **CBC dengan padding** ditambah server yang **membocorkan apakah padding valid** (lewat pesan error atau timing). Penyerang dapat mendekripsi ciphertext **byte demi byte tanpa kunci**. Kasus nyata: **POODLE (2014, SSL 3.0)** dan **Lucky13 (2013, timing pada TLS CBC)**. Akar masalah: **decrypt-then-check**, yaitu enkripsi tanpa autentikasi; solusinya AEAD ([[Perbaikan Bug Kriptografi dan Praktik Terbaik]]).
> >
> > ```mermaid
> > sequenceDiagram
> >     participant A as Attacker
> >     participant S as Server (oracle)
> >     A->>S: Ciphertext termodifikasi
> >     S-->>A: "padding invalid" / "valid, MAC gagal"
> >     A->>A: Simpulkan 1 byte plaintext
> >     Note over A,S: Ulangi per byte hingga seluruh blok pulih
> > ```

> [!cornell] #### Summary
>
> **Semgrep (p/cryptography), Bandit, dan gitleaks** mendeteksi pola misuse (ECB, IV statis, kunci hardcoded, RNG lemah, MD5), tetapi **cacat desain dan aliran data lintas file** lolos, dan false positive membuat alat diabaikan. **Padding-oracle** menunjukkan bahaya enkripsi tanpa autentikasi: server yang membocorkan validitas padding membuat ciphertext dapat didekripsi tanpa kunci.

> [!ad-libitum]- Additional Information
>
> #### Riset Misuse Detection
> **CryptoGuard** dan **CogniCrypt** (bahasa aturan CrySL) memodelkan penggunaan API kripto yang benar sebagai spesifikasi, mendeteksi urutan pemanggilan yang salah, bukan sekadar pola string. Benchmark seperti **CryptoAPI-Bench** dipakai untuk membandingkan presisi alat.
>
> #### Proyek Eksplorasi Mandiri
> 1. Buat file sampel Anda sendiri dengan 8 bug kripto (termasuk satu yang halus) dan lihat berapa yang ditangkap Semgrep/Bandit/gitleaks.
> 2. Implementasikan padding oracle sederhana di lab lokal dan bangun serangan byte-per-byte.
>
> #### Bacaan Lanjutan
> - Vaudenay, *Security Flaws Induced by CBC Padding*
> - Krüger et al., *CogniCrypt / CrySL*
