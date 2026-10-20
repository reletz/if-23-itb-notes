---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4020 Kriptografi]]

> [!cornell] Aplikasi Fungsi Hash
>
> > ## Questions/Cues
> >
> > - Bagaimana fungsi hash dipakai untuk menjaga integritas pesan dan file?
> > - Mengapa perubahan 1 bit membuat digest berubah drastis?
> > - Mengapa hash dipakai untuk menghemat waktu pengiriman dan memverifikasi salinan dokumen?
> > - Bagaimana hash dipakai untuk menyimpan password, dan apa gunanya salt?
> > - Apa nama lain fungsi hash dalam konteks integritas?
> >
> > ## Reference Points
> >
> > - IF4020 Kriptografi — Fungsi Hash (Slides 10-23)
>
> > ### 1. Menjaga Integritas Pesan
> >
> > Fungsi hash **sangat peka** terhadap perubahan sekecil apa pun: berubah 1 bit pada pesan membuat nilai hash berubah **signifikan**. Caranya:
> >
> > 1. Simpan nilai hash pesan asli.
> > 2. Hitung hash pesan yang diterima.
> > 3. Bila sama, pesan masih asli; bila beda, pesan sudah dimodifikasi.
> >
> > **Mengapa perubahan merambat**: pada konstruksi hash iteratif, masukan tiap tahap adalah blok pesan $M_i$ **dan luaran tahap sebelumnya**:
> >
> > $$h_i = H(M_i,\ h_{i-1})$$
> >
> > Bila satu bit di $M_i$ berubah, $h_i$ ikut berubah, dan perubahan ini mempengaruhi seluruh $h_{i+1}, h_{i+2}, \dots$ ([[SHA-1 dan Konstruksi Merkle-Damgard]]).
> >
> > **Contoh slide**: artikel berita suhu Bandung dengan kalimat "suhu tertinggi ... adalah **33** derajat Celcius". Digest (128 bit, hex): `2F82D0C845121B953D57E4C3C5E91E63`. Bila **33 diubah menjadi 32**, digestnya menjadi `2D1436293FAEAF405C27A151C0491267`. Karena nilai lama $\ne$ nilai baru, disimpulkan **pesan sudah diubah**.
> >
> > Contoh lain (SHA-256): `Yogyakarta kota kenangan` $\to$ `c2494851...145707f`; mengubah `kota` menjadi `koti` $\to$ `f1212f92...6420df` (berbeda sekitar separuh dari 256 bit digest).
> >
> > Karena fungsinya mendeteksi perubahan, hash juga disebut **cryptographic checksum**, **message integrity check (MIC)**, atau **manipulation detection code (MDC)**.
> >
> > **Aplikasi nyata**: program yang diunduh dari internet sering disertai nilai hash (mis. SHA-256 `40c68620...6a5d7f` untuk sebuah berkas `.tar.zst` yang diunduh lewat BitTorrent); pengguna menghitung hash berkas hasil unduhan lalu **membandingkannya** dengan nilai yang dirilis.
> >
> > ```mermaid
> > flowchart LR
> >     F["File asli"] --> H1["H"] --> D1["digest rilis"]
> >     U["File unduhan"] --> H2["H"] --> D2["digest hitung"]
> >     D1 --> C{"sama?"}
> >     D2 --> C
> >     C -->|ya| OK["file utuh"]
> >     C -->|tidak| X["file rusak/dimodifikasi"]
> > ```
> >
> > ### 2. Menghemat Waktu Pengiriman
> >
> > Untuk memeriksa apakah **salinan dokumen** yang berada di tempat jauh isinya sama dengan dokumen asli, lebih efisien mengirim **message digest**-nya (ukuran kecil) daripada seluruh dokumen lewat email atau WhatsApp (bandwidth besar). Jika digest salinan = digest asli, salinan identik dengan asli.
> >
> > ### 3. Menormalkan Panjang Data
> >
> > Panjang password berbeda-beda per pengguna, padahal basis data butuh lebar field yang **seragam**. Solusinya: simpan **nilai hash password**, bukan password aktual; panjang digest selalu tetap, dan server cukup membandingkan hash password yang diketik dengan hash yang tersimpan.
> >
> > Sebelum di-hash, password biasanya ditambah **garam (salt)**, beberapa karakter acak unik per pengguna: $h = H(\text{password} \,\|\, \text{salt})$. Salt disimpan bersama hash. Dua pengguna dengan password sama tetap berhash berbeda, sehingga serangan tabel hash yang dihitung sebelumnya (rainbow table) tidak berguna.

> [!cornell] #### Summary
>
> Aplikasi utama fungsi hash: (1) **menjaga integritas** pesan/berkas, karena perubahan 1 bit mengubah digest secara drastis dan merambat lewat konstruksi $h_i = H(M_i, h_{i-1})$ (contoh: ubah 33 menjadi 32, atau `kota` menjadi `koti`); fungsi ini juga dinamai **cryptographic checksum, MIC, atau MDC**; (2) **menghemat waktu/bandwidth** dengan membandingkan digest, bukan seluruh dokumen; (3) **menormalkan panjang data**, misalnya menyimpan **hash password** (dengan **salt**) agar lebar field basis data seragam dan password tidak tersimpan apa adanya.

> [!ad-libitum]- Additional Information
>
> #### Hash Saja Tidak Menjamin Keaslian dari Penyerang Aktif
>
> Jika digest dikirim lewat saluran yang sama dengan pesan, penyerang dapat **mengganti pesan sekaligus digestnya**. Hash tanpa kunci hanya menjamin integritas terhadap **kerusakan tidak sengaja**. Untuk melawan penyerang aktif dibutuhkan **kunci** ([[Konsep MAC]]) atau **tanda tangan digital** ([[Konsep Tanda-tangan Digital]]).
>
> #### Aplikasi Lain
>
> **Deduplikasi file** (git, Dropbox memakai hash sebagai identitas isi), **pohon Merkle** (blockchain, Certificate Transparency), **proof of work** (Bitcoin mencari input yang SHA-256 gandanya diawali banyak nol), **commitment scheme**, **tabel hash** (struktur data, hash non-kriptografis).
>
> #### Salt vs Pepper
>
> **Salt** unik per pengguna dan tidak rahasia; **pepper** adalah nilai rahasia global (di luar basis data) yang menambah lapisan pertahanan bila basis data bocor. Pada praktik modern keduanya dipakai bersama algoritma lambat (Argon2/bcrypt).
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Buat program yang menyimpan password dengan `hashlib.pbkdf2_hmac` + salt acak, lalu verifikasi login; bandingkan dengan MD5 polos.
> 2. Tulis alat `verify_download.py` yang menghitung SHA-256 sebuah file (baca per 1024 byte seperti di slide) dan membandingkannya dengan hash yang diberikan.
>
> #### Bacaan Lanjutan
>
> - OWASP *Password Storage Cheat Sheet*.
> - NIST SP 800-63B, bagian *Memorized Secret Verifiers*.
> - Biryukov et al. (2016), *Argon2: the memory-hard function for password hashing*.
