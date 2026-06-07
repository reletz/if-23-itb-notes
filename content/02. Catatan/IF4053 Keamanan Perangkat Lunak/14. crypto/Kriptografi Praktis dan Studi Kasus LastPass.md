---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4053 Keamanan Perangkat Lunak]]

> [!cornell] Kriptografi Praktis dan Studi Kasus LastPass
>
> > ## Questions/Cues
> >
> > - Apa yang dijamin dan TIDAK dijamin oleh primitif kriptografi?
> > - Mengapa password manager dipilih sebagai running example sepanjang kuliah?
> > - Data apa yang dicuri pada breach LastPass 2022 dan mengapa berbahaya?
> > - Apa "The Core Failure" LastPass jika mereka sebenarnya sudah memakai enkripsi?
> > - Masalah apa saja pada desain naif awal yang akan diperbaiki?
> >
> > ## Reference Points
> >
> > - IF4053 Keamanan Perangkat Lunak (W14 Programming with Cryptography & Key Management — bagian "Objective")
> > - IF4053 Keamanan Perangkat Lunak (W14 Programming with Cryptography & Key Management — bagian "The Running Example: A Password Manager")
> > - IF4053 Keamanan Perangkat Lunak (W14 Programming with Cryptography & Key Management — bagian "The LastPass Breach (2022)" & "The Core Failure")
>
> > ### Tujuan Pembelajaran: Apa yang Dijamin Kriptografi
> >
> > Materi ini menekankan bahwa kompetensi yang ingin dicapai mahasiswa bukan sekadar "tahu nama algoritma", melainkan mampu **menjelaskan apa yang dijamin dan TIDAK dijamin** oleh suatu **primitif kriptografi**, lalu **memilih algoritma, mode, dan parameter** yang sesuai untuk sebuah **threat model** tertentu. Sebuah primitif kripto bukan kotak ajaib: enkripsi menjamin **confidentiality** tetapi tidak otomatis menjamin **integrity/authenticity** kecuali mode yang dipilih memang menyediakannya; sebuah fungsi hash cepat menjamin keterulangan nilai tetapi **bukan** mekanisme penyimpanan password yang aman. Tujuan lanjutan juga mencakup **mengidentifikasi dan memperbaiki kerentanan kripto umum** (didemonstrasikan lewat kode Python nyata) serta **menerapkan praktik terbaik key derivation, lifecycle, dan storage**. Tujuan tingkat lanjut—Signal Protocol & forward secrecy, Zero-Knowledge Proofs, side-channel attacks, dan cryptographic agility/post-quantum—hanya disebut sebagai sasaran, bukan dijabarkan di slide.
> >
> > ### Running Example: Sebuah Password Manager
> >
> > Sepanjang seluruh kuliah, materi membangun dan **secara progresif mengeraskan (harden)** sebuah **password manager sederhana**. Setiap konsep yang diperkenalkan langsung diterapkan pada sistem ini, sehingga di akhir kuliah mahasiswa memiliki **model mental utuh** tentang aplikasi aman dunia nyata. Mengapa password manager? Karena sistem ini **memaksa hampir semua konsep kripto sekaligus**: **password hashing**, **symmetric encryption**, **key derivation (KDF)**, **key exchange**, **authenticated encryption**, **key storage**, dan **zero-knowledge authentication**. Sebagai rujukan dunia nyata, materi menyebut **LastPass, 1Password, dan Bitwarden** sebagai contoh produk yang harus menyelesaikan persoalan-persoalan ini. Pendekatan pedagogisnya eksplisit: kita akan **membuat setiap kesalahan yang dibuat LastPass, lalu memperbaikinya satu per satu**, agar paham mengapa tiap keputusan desain penting.
> >
> > ### Studi Kasus: The LastPass Breach (2022)
> >
> > Pada **Agustus 2022**, LastPass—salah satu password manager terpopuler—mengalami breach besar. Penyerang **mengompromikan mesin seorang developer**, mencuri **source code**, dan akhirnya **mengekstraksi vault pelanggan yang terenkripsi (encrypted vault blobs)** beserta **metadata** yang signifikan. Data yang dicuri mencakup: **encrypted vault blobs**, **jumlah iterasi PBKDF2 (serendah 5.000)**—stretching yang lemah sehingga cepat di-crack pakai GPU; **URL yang disimpan dalam plaintext**; **alamat email dan IP**; serta **metadata vault** (jumlah entri, struktur vault). Mengapa ini berbahaya? Metadata membuka informasi **layanan apa saja yang dipakai pengguna** (memudahkan **phishing** dan **targeted attack**), sementara kombinasi vault blob terenkripsi + iterasi KDF rendah memungkinkan **offline brute-force attack pada master password**: karena penyerang sudah memegang ciphertext, ia bisa menebak master password tanpa batas di mesinnya sendiri, dan iterasi 5.000 membuat tiap tebakan sangat murah.
> >
> > ### The Core Failure: Salahnya Pilihan Kripto, Bukan Ketiadaannya
> >
> > Poin paling penting dari studi kasus ini: **LastPass DID use encryption**—kegagalannya **bukan** "tidak ada kripto". LastPass menggunakan enkripsi, namun tetap gagal karena **pilihan kripto yang salah (wrong crypto choices)**. Kegagalan konkretnya: **PBKDF2 dengan 5.000 iterasi di tahun 2022** (sementara OWASP merekomendasikan **600.000+**); **tidak ada memory-hard KDF** padahal **Argon2id** sudah tersedia dan mapan; **metadata sensitif (URL) tidak dimasukkan ke dalam field yang dienkripsi**; dan **tidak ada authenticated encryption pada sebagian field vault**. Pelajarannya: memakai "kripto" saja tidak cukup—**parameter, mode, dan cakupan apa yang dienkripsi** menentukan apakah perlindungan itu nyata atau ilusi. Inilah inti pertanyaan reflektif yang diajukan: "LastPass sudah memakai enkripsi—mengapa tetap gagal, dan apa yang akan Anda lakukan berbeda?"
> >
> > ### Desain Naif Awal dan Daftar Masalah
> >
> > Sebagai titik berangkat, materi menyajikan desain naif: master password pengguna di-hash dengan **SHA256** untuk menghasilkan kunci, lalu vault dienkripsi dengan **AES-ECB** dan ciphertext disimpan di server. Desain ini sengaja salah, dan akan diperbaiki bertahap. **Masalah yang akan diperbaiki**: (1) **SHA256 bukan KDF**—fungsi hash cepat tidak melakukan key stretching, sehingga lemah terhadap brute-force; (2) **mode ECB membocorkan pola**—blok plaintext identik menghasilkan blok ciphertext identik, sehingga struktur data bocor; (3) **tidak ada autentikasi terhadap ciphertext**—tanpa authenticated encryption, manipulasi ciphertext tidak terdeteksi; (4) **kunci diturunkan langsung dari password**—tanpa salt/KDF yang benar; dan (5) **server bisa dikompromikan**—desain harus mengasumsikan server tidak tepercaya (mengarah ke prinsip zero-knowledge yang dibahas pada catatan key management).
> >
> > ```mermaid
> > flowchart TD
> >     U["User"] -- master_password --> A["App"]
> >     A --> H["SHA256(password) = key<br/>(masalah: SHA256 bukan KDF,<br/>key langsung dari password)"]
> >     H --> E["AES-ECB(vault_data)<br/>(masalah: ECB bocorkan pola,<br/>tanpa authenticated encryption)"]
> >     E --> S["Server: stores ciphertext<br/>(masalah: server bisa dikompromikan)"]
> > ```

> [!cornell] #### Summary
>
> Materi W14 menjadikan **password manager** sebagai running example untuk membangun model mental aplikasi aman, karena sistem ini memaksa hampir semua konsep kripto: password hashing, symmetric encryption, KDF, key exchange, authenticated encryption, key storage, dan zero-knowledge auth (rujukan: LastPass, 1Password, Bitwarden). Studi kasus **LastPass breach 2022** memperlihatkan bahwa penyerang mencuri **encrypted vault blobs** plus metadata (URL plaintext, email/IP, struktur vault) dengan **iterasi PBKDF2 serendah 5.000**, memungkinkan **offline brute-force master password**. **The Core Failure**: LastPass sudah memakai enkripsi—yang salah adalah **pilihan kriptonya** (PBKDF2 5.000 iter di 2022 vs OWASP 600.000+, tanpa memory-hard KDF/Argon2id, metadata tak terenkripsi, sebagian field tanpa authenticated encryption). Desain naif awal (SHA256→key→AES-ECB→server) memuat lima masalah yang akan diperbaiki: SHA256 bukan KDF, ECB bocorkan pola, tak ada autentikasi ciphertext, key langsung dari password, dan server bisa dikompromikan.

> [!ad-libitum]- Additional Information
>
> #### Lebih dalam — Mengapa Offline Brute-Force Begitu Mematikan (DI LUAR sumber)
> Ketika vault masih di server LastPass, percobaan menebak master password dibatasi oleh kebijakan online (rate limiting, lockout). Begitu **encrypted blob dicuri**, batas itu hilang: penyerang menjalankan tebakan **offline** pada GPU/cluster sendiri, secepat hardware-nya. Di sinilah jumlah iterasi KDF jadi penentu—5.000 iterasi PBKDF2 berarti tiap tebakan hanya butuh ribuan operasi hash, sementara 600.000+ iterasi memperlambat penyerang ratusan kali lipat. KDF yang **memory-hard** (Argon2id) menambah lapisan lain: ia menuntut memori besar per tebakan, sehingga paralelisme GPU/ASIC menjadi jauh lebih mahal.
>
> #### Lebih dalam — Mengapa ECB Bocorkan Pola (DI LUAR sumber)
> Pada mode **ECB (Electronic Codebook)**, setiap blok plaintext dienkripsi independen dengan kunci yang sama, sehingga **blok plaintext identik selalu menghasilkan blok ciphertext identik**. Akibatnya struktur data (mis. field berulang dalam vault) tetap terlihat dari pola ciphertext—ilustrasi klasiknya adalah gambar bitmap yang setelah dienkripsi ECB masih memperlihatkan kontur aslinya. Mode modern (mis. **GCM**) memakai IV/nonce dan counter sehingga ciphertext acak meski plaintext berulang, sekaligus memberi tag autentikasi.
>
> #### Proyek Eksplorasi Mandiri
> 1. Implementasikan ulang desain naif di Python (SHA256 → key → AES-ECB) lalu ukur waktu crack master password lemah, kemudian ganti ke PBKDF2 dengan iterasi 5.000 vs 600.000 dan bandingkan biaya tebakannya.
> 2. Enkripsi gambar bitmap sederhana dengan AES-ECB vs AES-GCM dan amati secara visual mengapa ECB membocorkan pola.
> 3. Susun tabel "kesalahan LastPass → perbaikan" untuk masing-masing dari lima masalah desain naif, lengkap dengan primitif/parameter penggantinya.
>
> #### Bacaan Lanjutan
> - LastPass Security Incident — pengumuman dan update resmi 2022/2023 (rincian data yang dieksfiltrasi).
> - OWASP Password Storage Cheat Sheet — rekomendasi iterasi PBKDF2 dan penggunaan Argon2id.
> - Dokumentasi/spesifikasi Argon2 (RFC 9106) untuk KDF memory-hard.
