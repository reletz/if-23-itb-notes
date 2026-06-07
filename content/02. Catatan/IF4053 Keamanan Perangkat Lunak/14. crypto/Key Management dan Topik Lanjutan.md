---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4053 Keamanan Perangkat Lunak]]

> [!cornell] Key Management dan Topik Lanjutan
>
> > ## Questions/Cues
> >
> > - Mengapa KDF yang benar (Argon2id / PBKDF2 iterasi tinggi) menggantikan SHA256?
> > - Apa beda authenticated encryption (AES-GCM) dibanding mode ECB?
> > - Mengapa kunci harus diturunkan, bukan diambil langsung dari password?
> > - Bagaimana prinsip zero-knowledge mengamankan key lifecycle & storage?
> > - Apa topik lanjutan yang hanya disebut objektif tetapi tidak dijabarkan slide?
> >
> > ## Reference Points
> >
> > - IF4053 Keamanan Perangkat Lunak (W14 Programming with Cryptography & Key Management — bagian "Objective: apply key derivation, lifecycle, and storage best practices")
> > - IF4053 Keamanan Perangkat Lunak (W14 Programming with Cryptography & Key Management — bagian "The Core Failure")
> > - IF4053 Keamanan Perangkat Lunak (W14 Programming with Cryptography & Key Management — bagian "Running Example: Problems we will fix")
>
> > ### KDF yang Benar: Argon2id dan PBKDF2 Iterasi Tinggi
> >
> > Perbaikan pertama atas kegagalan LastPass adalah memakai **Key Derivation Function (KDF) yang benar**. Materi menegaskan **SHA256 bukan KDF**: fungsi hash umum dirancang untuk **cepat**, justru sifat yang merugikan untuk menahan brute-force. KDF yang tepat melakukan **key stretching**—sengaja membuat penurunan kunci mahal. Dua pilihan yang ditekankan: **PBKDF2 dengan iterasi tinggi** (OWASP merekomendasikan **600.000+**, kontras dengan 5.000 yang dipakai LastPass), dan—lebih baik lagi—**KDF yang memory-hard seperti Argon2id**. Argon2id menuntut sejumlah besar **memori** per evaluasi, sehingga penyerang yang ingin memparalelkan tebakan di GPU/ASIC harus membayar biaya memori yang besar, bukan sekadar biaya komputasi. Ini langsung mengikuti objektif "apply key derivation best practices": pilih KDF yang lambat dan, idealnya, memory-hard, dengan parameter yang dikalibrasi terhadap threat model (kemampuan offline cracking penyerang).
> >
> > ### Authenticated Encryption: AES-GCM vs ECB
> >
> > Perbaikan kedua adalah mengganti enkripsi telanjang dengan **authenticated encryption**. Pada desain naif, **AES-ECB** dipakai dan menimbulkan dua masalah: **membocorkan pola** (blok plaintext identik → blok ciphertext identik) dan **tidak ada autentikasi terhadap ciphertext** (manipulasi tidak terdeteksi). Solusinya adalah mode yang menyediakan **confidentiality dan integrity sekaligus**, yaitu **AES-GCM**. Dengan GCM, ciphertext disertai **authentication tag**; setiap perubahan pada ciphertext akan menggagalkan verifikasi tag saat dekripsi, sehingga serangan tampering tertangkap. Selain itu GCM memakai nonce/IV sehingga tidak membocorkan pola seperti ECB. Inilah jawaban langsung atas dua dari lima "problems we will fix": *ECB mode leaks patterns* dan *no authentication of ciphertext*.
> >
> > ### Key Derivation vs Kunci Langsung dari Password
> >
> > Salah satu problem yang akan diperbaiki adalah **"key derived directly from password"**. Mengambil kunci enkripsi langsung dari password bermasalah karena password berentropi rendah dan dapat ditebak. Praktik yang benar adalah **menurunkan** kunci melalui KDF yang tepat (dengan **salt** dan **stretching**), bukan memetakan password ke kunci lewat hash cepat. Pemisahan ini penting: KDF mengubah secret berentropi rendah menjadi kunci yang mahal ditebak, dan salt memastikan dua pengguna dengan password sama tidak menghasilkan kunci yang sama (mencegah serangan tabel pra-komputasi). Dengan demikian "key derivation" diperlakukan sebagai tahap eksplisit dalam **lifecycle** kunci, bukan efek samping dari hashing.
> >
> > ### Key Lifecycle & Storage: Jangan Simpan Kunci di Server (Zero-Knowledge)
> >
> > Problem terakhir pada desain naif—**"server could be compromised"**—mengarah pada praktik **lifecycle dan storage** kunci. Prinsipnya: **jangan menyimpan kunci di server**. Karena master key diturunkan di sisi klien dari master password, server idealnya **hanya menyimpan ciphertext** dan tidak pernah melihat kunci maupun plaintext. Inilah inti arsitektur **zero-knowledge**: bahkan jika server dikompromikan (seperti pada LastPass), penyerang hanya memperoleh blob terenkripsi—bukan kunci untuk membukanya. Ini menyatukan objektif "apply key derivation, lifecycle, and storage best practices": kunci diturunkan di klien, dipakai sesingkat mungkin, tidak dipersistenkan di tempat yang sama dengan data, dan server diperlakukan sebagai pihak yang tidak tepercaya untuk menyimpan secret. Catatan penting dari kasus LastPass: cakupan enkripsi harus lengkap—**metadata seperti URL juga harus dienkripsi**, bukan dibiarkan plaintext.
> >
> > ```mermaid
> > flowchart TD
> >     P["master_password (entropi rendah)"] --> K["KDF: Argon2id / PBKDF2 600k+<br/>(+salt, key stretching)"]
> >     K --> M["master key (diturunkan di klien)"]
> >     M --> G["AES-GCM(vault + metadata)<br/>confidentiality + integrity"]
> >     G --> SV["Server: hanya simpan ciphertext<br/>(zero-knowledge, kunci tak pernah dikirim)"]
> > ```

> [!cornell] #### Summary
>
> Catatan ini membingkai perbaikan kegagalan LastPass sebagai prinsip **key management**, mengikuti objektif "apply key derivation, lifecycle, and storage best practices". Empat perbaikan inti: (1) **KDF yang benar**—karena SHA256 bukan KDF, gunakan **PBKDF2 iterasi tinggi (600.000+)** atau lebih baik **Argon2id yang memory-hard** untuk key stretching; (2) **authenticated encryption**—ganti **ECB** (bocorkan pola, tanpa integritas) dengan **AES-GCM** yang memberi confidentiality + integrity via authentication tag; (3) **key derivation, bukan kunci langsung dari password**—turunkan kunci lewat KDF + salt alih-alih memetakan password ke kunci; (4) **lifecycle & storage zero-knowledge**—turunkan kunci di klien, jangan simpan kunci di server, dan enkripsi juga metadata, sehingga server yang dikompromikan hanya memegang ciphertext. Topik tingkat lanjut (Signal Protocol/forward secrecy, ZKP, side-channel, crypto agility/post-quantum) hanya disebut sebagai objektif dan dibahas sebagai pengayaan di bawah.

> [!ad-libitum]- Additional Information
>
> #### Signal Protocol & Forward Secrecy (DI LUAR sumber)
> Objektif menyebut kemampuan "reason about Signal Protocol and forward secrecy", tetapi slide tidak menjabarkannya. **Forward secrecy** berarti kompromi kunci jangka panjang **tidak** membongkar pesan-pesan lampau, karena tiap sesi/pesan memakai kunci efemeral yang dibuang setelah dipakai. **Signal Protocol** mencapainya lewat **Double Ratchet** (kombinasi Diffie-Hellman ratchet dan symmetric-key ratchet) plus **X3DH** untuk pembentukan sesi awal—setiap pesan menurunkan kunci baru sehingga pembocoran satu kunci tidak meluas ke pesan lain.
>
> #### Zero-Knowledge Proofs (DI LUAR sumber)
> Objektif menyebut "understand Zero-Knowledge Proofs and their practical applications". **ZKP** memungkinkan satu pihak membuktikan ia mengetahui suatu rahasia (mis. password/secret) **tanpa mengungkapkannya**. Berbeda dari arsitektur "zero-knowledge" penyimpanan vault (di mana server cuma simpan ciphertext), ZKP adalah protokol bukti matematis; aplikasi praktisnya meliputi autentikasi tanpa mengirim password, sistem privasi (mis. zk-SNARK pada blockchain), dan verifikasi kepemilikan kredensial.
>
> #### Side-Channel Attacks & Mitigasi (DI LUAR sumber)
> Objektif menyebut "recognize and mitigate side-channel attacks". Side-channel mengeksploitasi **kebocoran fisik/temporal** implementasi—bukan kelemahan algoritma—seperti **timing attack** (waktu eksekusi bergantung data rahasia), konsumsi daya, atau cache. Mitigasi inti: operasi **constant-time** (mis. perbandingan tag/hmac yang tidak short-circuit), menghindari cabang/akses memori yang bergantung secret, dan memakai library kripto yang sudah dikeraskan terhadap timing.
>
> #### Cryptographic Agility & Migrasi Post-Quantum (DI LUAR sumber)
> Objektif menyebut "design cryptographically agile systems ready for post-quantum migration". **Crypto agility** adalah kemampuan mengganti algoritma/parameter (mis. menaikkan iterasi KDF, berpindah dari satu cipher ke lainnya) **tanpa mengubah arsitektur**, mis. dengan menandai versi algoritma pada data tersimpan. Ini krusial untuk **migrasi post-quantum**: komputer kuantum mengancam kripto kunci publik klasik (RSA/ECC), sehingga sistem perlu siap beralih ke algoritma yang distandarkan NIST (mis. **ML-KEM/Kyber**, **ML-DSA/Dilithium**).
>
> #### Proyek Eksplorasi Mandiri
> 1. Refaktor desain naif password manager menjadi: Argon2id → master key → AES-GCM → server simpan ciphertext saja; pastikan metadata (URL) ikut dienkripsi.
> 2. Implementasikan demo timing attack pada perbandingan tag non-constant-time, lalu perbaiki dengan `hmac.compare_digest` (constant-time) dan ukur perbedaannya.
> 3. Rancang skema versioning algoritma (crypto agility) pada format vault agar parameter KDF/cipher bisa di-upgrade tanpa migrasi besar.
>
> #### Bacaan Lanjutan
> - Signal Protocol Specifications (X3DH dan Double Ratchet) — dokumen resmi Signal.
> - NIST Post-Quantum Cryptography — standar FIPS 203/204/205 (ML-KEM, ML-DSA, SLH-DSA).
> - OWASP Cryptographic Storage Cheat Sheet & Key Management Cheat Sheet.
