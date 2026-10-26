---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4020 Kriptografi]]

> [!cornell] Konsep MAC
>
> > ## Questions/Cues
> >
> > - Apa itu MAC dan apa bedanya dengan fungsi hash biasa?
> > - Mengapa hash biasa tidak cukup untuk melawan penyerang aktif?
> > - Layanan apa yang diberikan MAC, dan layanan apa yang tidak?
> > - Kapan MAC dipakai, dan mengapa MAC bukan tanda tangan digital?
> > - Apa persyaratan algoritma MAC?
> >
> > ## Reference Points
> >
> > - IF4020 Kriptografi — MAC (Slides 2-10)
>
> > ### Definisi
> >
> > **MAC (Message Authentication Code)** adalah kode kecil berukuran **tetap** yang dihasilkan dari **pesan dan kunci** untuk **mengotentikasi pengirim** dan **otentikasi (keaslian) pesan**:
> >
> > $$\text{MAC} = C_K(M)$$
> >
> > $C$ = algoritma MAC, $K$ = **kunci rahasia**, $M$ = pesan. Nama lain: **Message Integrity Code (MIC)**.
> >
> > ### MAC vs Fungsi Hash Biasa
> >
> > | | Message digest (hash) | MAC |
> > |---|---|---|
> > | Rumus | $h = H(M)$ | $\text{MAC} = C_K(M)$ |
> > | Kunci | **tidak butuh** | **butuh** kunci $K$ |
> > | Siapa yang bisa menghitung | siapa pun | hanya yang tahu $K$ |
> >
> > ### Cara Kerja
> >
> > MAC **dilekatkan (embed)** pada pesan sebagai "signature". Penerima menghitung MAC dari pesan yang diterima dengan kunci $K$ yang sama. **Bila MAC yang dikirim sama dengan MAC hitungan penerima**, pesan disimpulkan **asli** dan pengirim **benar**, karena $K$ hanya diketahui pengirim dan penerima.
> >
> > ```mermaid
> > sequenceDiagram
> >     participant S as Pengirim (kunci K)
> >     participant R as Penerima (kunci K)
> >     S->>S: MAC = C_K(M)
> >     S->>R: M + MAC
> >     R->>R: MAC' = C_K(M diterima)
> >     R->>R: MAC' = MAC ? asli : palsu
> > ```
> >
> > Ilustrasi pada slide 1 dan 4 (Gambar 9.3 dan 3.1): **pengirim** menghitung MAC dari pesan dengan kunci $K$ lalu melekatkannya di akhir pesan (*plaintext with MAC*); **penerima** menjalankan algoritma MAC yang sama dengan kunci yang sama atas pesan yang diterima, lalu **membandingkan** hasilnya dengan MAC yang melekat.
> >
> > ### Kegunaan MAC
> >
> > **1. Menjaga integritas pesan** (seperti message digest, *cryptographic checksum*). Namun bila hanya memakai hash biasa (mis. SHA), lawan dapat **mengubah dokumen, menghitung digest baru, dan menggantikan nilai hash lama** (contoh: peretas mengganti berkas unduhan sekaligus nilai MD5-nya; pengunduh tidak menyadarinya; slide 6 menunjukkan halaman unduhan Tucows untuk *Norton AntiVirus 2010* yang mencantumkan `MD5 HASH CE0F5F1BF0F165465BE97BAEB4BD940C`, yang dapat diganti peretas bersama berkasnya). Dengan **MAC**, lawan tidak bisa melakukannya karena **tidak tahu kunci $K$**.
> >
> > **2. Mengotentikasi pengirim.** Hanya pengirim dan penerima yang tahu $K$. Bila kunci pengirim tidak sama dengan kunci penerima, MAC hitungan penerima pasti tidak cocok dengan MAC pada pesan.
> >
> > ### Kapan Memakai MAC?
> >
> > - Bila yang dibutuhkan hanya **otentikasi pesan dan pengirim**, bukan kerahasiaan.
> > - Bila digabung dengan enkripsi, **kunci enkripsi dan kunci MAC dipisah**.
> > - MAC dapat dihitung **sesudah** atau **sebelum** pesan dienkripsi; umumnya lebih baik dihitung **sebelum** dienkripsi (menurut slide).
> > - **MAC bukan tanda tangan digital**: ia **tidak menyediakan nir-penyangkalan (non-repudiation)**, sebab penerima juga memegang $K$ sehingga bisa membuat MAC yang sama ([[Konsep Tanda-tangan Digital]]).
> >
> > ### Persyaratan Algoritma MAC
> >
> > MAC adalah fungsi **banyak-ke-satu** (banyak pesan dapat memiliki MAC sama), tetapi menemukannya harus sangat sulit:
> >
> > 1. Diberi pesan dan MAC, **sangat sukar menemukan pesan lain** dengan MAC sama.
> > 2. MAC berbagai pesan **terdistribusi uniform**.
> > 3. MAC **bergantung merata pada semua bit** pesan.

> [!cornell] #### Summary
>
> **MAC** adalah kode berukuran tetap hasil $C_K(M)$, fungsi dari **pesan dan kunci rahasia**, yang dilekatkan pada pesan untuk **memeriksa keaslian pesan** dan **mengotentikasi pengirim**. Berbeda dari hash biasa ($h = H(M)$, tanpa kunci), MAC **butuh kunci**, sehingga lawan tidak dapat mengganti pesan sekaligus MAC-nya. MAC dipakai bila yang dibutuhkan hanya otentikasi (bukan kerahasiaan); jika digabung enkripsi, kunci dipisah. MAC **bukan tanda tangan digital** karena **tidak memberi non-repudiation** (kunci dipegang kedua pihak). Persyaratannya: sulit menemukan pesan lain ber-MAC sama, distribusi uniform, dan bergantung pada semua bit pesan.

> [!ad-libitum]- Additional Information
>
> #### Empat Layanan Keamanan dan Alatnya
>
> | Layanan | Alat |
> |---|---|
> | Kerahasiaan | enkripsi |
> | Integritas | hash, **MAC** |
> | Otentikasi pesan/pengirim | **MAC**, tanda tangan digital |
> | Non-repudiation | **tanda tangan digital** (bukan MAC) |
>
> #### Urutan MAC dan Enkripsi
>
> Tiga pola gabungan: **MAC-then-Encrypt** (SSL/TLS lama), **Encrypt-then-MAC** (IPsec), dan **Encrypt-and-MAC** (SSH). Rekomendasi modern: **Encrypt-then-MAC** (MAC dihitung atas cipherteks) karena mencegah serangan *padding oracle*; mode **AEAD** (AES-GCM, ChaCha20-Poly1305) menggabungkan keduanya. Slide menyatakan lebih baik MAC dihitung sebelum enkripsi; ini berbeda dengan konsensus modern, jadi ikuti slide untuk ujian tetapi ketahui alasannya.
>
> #### Replay Attack
>
> MAC saja tidak mencegah **replay** (penyerang mengirim ulang pesan sah + MAC). Solusinya menambahkan **nonce, nomor urut, atau timestamp** ke dalam pesan sebelum dihitung MAC-nya.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Pakai `hmac.new(key, msg, hashlib.sha256)` untuk memberi MAC pada pesan, lalu ubah 1 karakter pesan dan tunjukkan verifikasi gagal; coba juga mengganti pesan **dan** menghitung ulang hash tanpa kunci.
> 2. Gunakan `hmac.compare_digest` (bukan `==`) dan jelaskan serangan *timing* yang dicegahnya.
>
> #### Bacaan Lanjutan
>
> - Bellare, Canetti, Krawczyk (1996), *Keying Hash Functions for Message Authentication* (HMAC).
> - NIST SP 800-38B (CMAC) dan FIPS 198-1 (HMAC).
> - Krawczyk (2001), *The Order of Encryption and Authentication*.
