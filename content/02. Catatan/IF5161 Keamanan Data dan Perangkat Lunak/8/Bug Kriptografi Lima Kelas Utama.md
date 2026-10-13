---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5161 Keamanan Data dan Perangkat Lunak]]

> [!cornell] Bug Kriptografi Lima Kelas Utama
>
> > ## Questions/Cues
> >
> > - Mengapa bug kriptografi tidak terlihat oleh tes fungsional?
> > - Apa lima bug kripto yang paling sering muncul beserta CWE-nya?
> > - Mengapa ECB membocorkan struktur data dan apa bahaya IV/nonce statis?
> > - Mengapa kunci hardcoded, RNG lemah, dan hash cepat berbahaya?
> > - Apa temuan umum lain dan mengapa bug ini terus muncul?
> >
> > ## Reference Points
> >
> > - IF5161 — W07 Crypto and Data Security, "Crypto-Related Vulnerabilities" (Bridge from Last Class s.d. "Anti-Patterns in Crypto Code Review")
>
> > ### Mengapa Kode Kripto Gagal secara Berbeda
> >
> > Bug kripto **jarang crash**: keluarannya tampak acak dan tes lolos karena *encrypt lalu decrypt* menghasilkan plaintext kembali. Kegagalan hanya terlihat dari sudut **model penyerang**, bukan tes fungsional. Kebanyakan kegagalan di dunia nyata adalah **salah pakai algoritma yang benar**, bukan algoritma yang rusak.
> >
> > ### Lima Bug Utama
> >
> > | Bug | Kelas kelemahan | Yang didapat penyerang |
> > |---|---|---|
> > | **ECB mode** | CWE-327 | Pola plaintext bocor |
> > | **IV/nonce statis atau dipakai ulang** | CWE-329, CWE-323 | Prediksi, pemulihan plaintext, pemalsuan |
> > | **Kunci hardcoded** | CWE-321, CWE-798 | Siapa pun yang punya kode dapat mendekripsi semuanya |
> > | **RNG lemah** | CWE-330, CWE-338 | Token, kunci, session ID dapat diprediksi |
> > | **Hash password cepat/tanpa salt** | CWE-916, CWE-759 | Cracking offline miliaran tebakan per detik |
> >
> > **Bug 1 — ECB**: setiap blok dienkripsi independen dengan kunci sama, sehingga **blok plaintext identik menghasilkan blok ciphertext identik**; struktur data bertahan ("ECB penguin"), dan penyerang dapat memotong, menyusun ulang, dan me-replay blok.
> >
> > **Bug 2 — IV/nonce**: mode butuh IV/nonce **segar dan unik per pesan**. CBC dengan IV yang dapat ditebak membuka chosen-plaintext attack (ide di balik BEAST pada TLS 1.0). Pada **CTR dan GCM**, nonce berulang berakibat **katastrofik**: keystream dipakai ulang sehingga XOR plaintext bocor, dan pada GCM dapat membocorkan kunci autentikasi. Bentuk umumnya: `IV = b"\x00" * 16`.
> >
> > **Bug 3 — Kunci hardcoded**: terbaca oleh siapa pun dengan akses repo/build/binary, tak dapat dirotasi tanpa redeploy (sehingga tak pernah dirotasi), tersalin ke fork, backup, log CI, dan image container. Secret scanning murah dan efektif (**gitleaks, trufflehog**).
> >
> > **Bug 4 — RNG lemah**: `random`, `rand()`, `Math.random()` dibuat untuk kecepatan dan statistik, bukan kerahasiaan. Mersenne Twister Python dapat dipulihkan statenya dari **624 keluaran 32-bit berurutan**. Korban umum: token sesi, link reset password, API key, IV, salt.
> >
> > **Bug 5 — Hash cepat**: MD5, SHA-1, SHA-256 polos cepat *by design*, salah untuk password. GPU menguji miliaran tebakan MD5 per detik; tanpa salt per pengguna, password sama menghasilkan hash sama dan **rainbow table** berlaku.
> >
> > ### Temuan Lain yang Sering Muncul
> >
> > - Validasi sertifikat dimatikan: `verify=False`, TrustManager trust-all (**CWE-295**).
> > - Algoritma buatan sendiri (XOR "enkripsi", obfuscation).
> > - **Enkripsi tak terautentikasi**: CBC tanpa MAC yang memungkinkan padding-oracle attack.
> > - Perbandingan MAC/token **tidak constant-time** (timing side channel, **CWE-208**).
> > - Ukuran kunci lemah atau primitif usang: DES, RC4, RSA-1024 (**CWE-326**).
> >
> > ### Mengapa Bug Ini Bertahan
> >
> > Snippet copy-paste dari forum dengan saran usang; library yang default atau cara termudahnya tidak aman; tidak ada review kripto dalam proses; tekanan kompatibilitas ("sistem lama butuh ECB"); contoh aman dan tidak aman terlihat sama bagi non-ahli.
> >
> > ```mermaid
> > flowchart LR
> >     U["Developer menyalin snippet<br/>atau memakai default"] --> B["Algoritma benar,<br/>penggunaan salah"]
> >     B --> T["Tes fungsional lolos<br/>(encrypt-decrypt OK)"]
> >     T --> P["Lolos ke produksi"]
> >     P --> A["Penyerang memakai<br/>model ancaman berbeda"]
> >     A --> L["Plaintext / kunci / password bocor"]
> > ```
> >
> > ### Anti-Pattern Review Kripto
> >
> > Berhenti ketika melihat kata "AES"; memeriksa algoritma tetapi bukan **mode, IV, sumber kunci, dan randomness**; menganggap keluaran terenkripsi aman tanpa bertanya siapa pemegang kunci; menerima diamnya scanner sebagai jaminan; memperbaiki panggilan tanpa **merotasi kunci yang sudah bocor**.

> [!cornell] #### Summary
>
> Lima kelas bug kripto: **ECB, IV/nonce statis, kunci hardcoded, RNG lemah, dan hash password cepat**. Algoritmanya biasanya benar; **penggunaannya yang salah**. Bug ini tak terlihat tes fungsional, bertahan karena snippet usang, default tidak aman, dan tidak adanya review. Perbaikannya dibahas di [[Perbaikan Bug Kriptografi dan Praktik Terbaik]].

> [!ad-libitum]- Additional Information
>
> #### Model Ancaman Kripto
> Selalu tanyakan: *siapa penyerangnya, apa yang ia pegang (ciphertext, kode, akses oracle), dan apa yang harus tetap rahasia?* Dengan model yang jelas, ECB (pola), nonce reuse (keystream), dan padding oracle (error) langsung terlihat sebagai pelanggaran konkret, bukan sekadar "praktik buruk".
>
> #### Proyek Eksplorasi Mandiri
> 1. Enkripsi gambar bitmap dengan AES-ECB dan AES-CBC lalu bandingkan visualnya.
> 2. Buktikan pemulihan state Mersenne Twister dari 624 keluaran (mis. dengan `randcrack`).
>
> #### Bacaan Lanjutan
> - Ferguson, Schneier & Kohno, *Cryptography Engineering*
> - MITRE CWE-327, CWE-329, CWE-798, CWE-338, CWE-916
