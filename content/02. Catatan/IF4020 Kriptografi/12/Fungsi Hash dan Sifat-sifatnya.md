---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4020 Kriptografi]]

> [!cornell] Fungsi Hash dan Sifat-sifatnya
>
> > ## Questions/Cues
> >
> > - Apa itu fungsi hash dan apa yang dimaksud message digest?
> > - Mengapa fungsi hash disebut satu-arah dan mengapa ia bukan fungsi enkripsi?
> > - Apa tiga sifat keamanan fungsi hash (collision, preimage, second preimage)?
> > - Apa itu kolisi dan mengapa ia berbahaya?
> > - Algoritma hash mana yang masih aman dan mana yang sudah rusak?
> >
> > ## Reference Points
> >
> > - IF4020 Kriptografi — Fungsi Hash (Slides 3-9, 24-25)
>
> > ### Definisi
> >
> > **Fungsi hash** $H$ mengkompresi pesan $M$ berukuran **sembarang** menjadi string $h$ berukuran **tetap**:
> >
> > $$h = H(M), \qquad |h| \ll |M|$$
> >
> > $h$ disebut **nilai hash**, **pesan ringkas (message digest)**, atau **digest**. Contoh: $M$ berukuran 1 MB $\to$ $h$ hanya 256 bit. Sebuah password pendek, sebuah paragraf *Lorem ipsum*, maupun sebuah citra `Peppers512.bmp` semuanya menghasilkan digest 256 bit dengan SHA-256, tetapi isinya berbeda sama sekali.
> >
> > ### Fungsi Hash Satu-Arah
> >
> > **Fungsi hash satu-arah (one-way function)** bekerja dalam satu arah: pesan yang sudah diubah menjadi digest **tidak dapat dikembalikan** menjadi pesan semula (irreversible).
> >
> > **Mengapa fungsi hash bukan enkripsi**, meski digest tampak acak:
> >
> > 1. Nilai hash **tidak dapat ditransformasi balik** menjadi pesan semula (enkripsi harus bisa didekripsi).
> > 2. Proses hashing **tidak memerlukan kunci** (enkripsi selalu memakai kunci; lihat [[Definisi dan Layanan Kriptografi]]).
> >
> > ### Tiga Sifat Keamanan
> >
> > | Sifat | Arti | Serangan yang dicegah |
> > |---|---|---|
> > | **Collision resistance** | sangat sukar menemukan dua input $a \ne b$ dengan $H(a) = H(b)$ | membuat dua dokumen berbeda dengan digest sama |
> > | **Preimage resistance** | untuk output $y$ sembarang, sukar menemukan $a$ dengan $H(a) = y$ | membalik hash (mis. dari digest ke password) |
> > | **Second preimage resistance** | diberi $a$ dan $y = H(a)$, sukar menemukan $b \ne a$ dengan $H(b) = y$ | mengganti dokumen yang sudah ada dengan dokumen lain berdigest sama |
> >
> > Collision resistance adalah sifat paling **kuat** (paling sulit dipenuhi): kalau tumbukan mudah ditemukan, maka second preimage terancam.
> >
> > ```mermaid
> > flowchart LR
> >     M1["Pesan sembarang<br/>(1 MB, 1 KB, 1 byte)"] --> H["H"]
> >     H --> D["Digest tetap<br/>(mis. 256 bit)"]
> >     D -.->|"preimage resistance:<br/>sulit dibalik"| M1
> > ```
> >
> > ### Kolisi
> >
> > **Kolisi (collision)** adalah kejadian dua string sembarang memiliki nilai hash yang sama. Karena ruang input tak terhingga dan ruang digest terbatas ($2^{256}$ untuk SHA-256), kolisi **pasti ada** (prinsip pigeonhole); yang penting adalah apakah menemukannya **layak secara komputasi**. Bila kolisi dapat direkayasa, fungsi hash **tidak aman secara kriptografis**, sebab penyerang dapat membuat dua pesan berbeda dengan digest sama.
> >
> > ### Contoh Digest dan Daftar Fungsi Hash Satu-Arah
> >
> > Slide memperlihatkan tiga masukan yang sangat berbeda (kata sandi `MyPassword`, paragraf *Lorem ipsum*, dan citra `Peppers512.bmp`) yang semuanya menghasilkan digest **256 bit** (64 digit hex). Pada *hash generator* daring, masukan `Banyak musibah di negeriku` (26 byte) menghasilkan MD5 (128 bit), SHA-1 (160 bit), SHA-256 (256 bit), SHA-384, dan SHA-512 sekaligus; SHA-1-nya adalah `3f7d679ffac3676c4291677bdf18322b704623fa`.
> >
> > Daftar fungsi hash satu-arah yang disebut di slide beserta panjang digest:
> >
> > | Algoritma | Digest (bit) |
> > |---|---|
> > | MD2 / MD4 / MD5 | 128 |
> > | RIPEMD | 128 |
> > | RIPEMD-128/256 | 128 / 256 |
> > | RIPEMD-160/320 | 160 / 320 |
> > | SHA-1 | 160 |
> > | SHA-256 / SHA-224 (**SHA-2**) | 256 / 224 |
> > | SHA-512 / SHA-384 (**SHA-2**) | 512 / 384 |
> > | SHA-3 (Keccak) | sembarang |
> > | WHIRLPOOL | 512 |
> > | Snefru | 128 atau 256 |
> > | BLAKE 256/512 | 256 / 512 (slide menulis "156/512", kemungkinan salah ketik) |
> > | Grøstl | maksimum 512 |
> >
> > ### Status Beberapa Fungsi Hash
> >
> > | Algoritma | Digest (bit) | Blok pesan (bit) | Kolisi |
> > |---|---|---|---|
> > | MD2 | 128 | 128 | Ya |
> > | MD4 | 128 | 512 | Hampir |
> > | MD5 | 128 | 512 | **Ya** |
> > | RIPEMD | 128 | 512 | Ya |
> > | RIPEMD-128/256 | 128/256 | 512 | Tidak |
> > | RIPEMD-160/320 | 160/320 | 512 | Tidak |
> > | SHA-0 | 160 | 512 | Ya |
> > | SHA-1 | 160 | 512 | Ada cacat |
> > | SHA-256/224 | 256/224 | 512 | Tidak |
> > | SHA-512/384 | 512/384 | 1024 | Tidak |
> > | WHIRLPOOL | 512 | 512 | Tidak |
> >
> > Kolom "Kolisi" menyatakan apakah kolisi sudah berhasil ditemukan. Detail SHA di [[SHA-1 dan Konstruksi Merkle-Damgard]], [[SHA-2 - SHA-256 dan SHA-512]], dan [[SHA-3 Keccak dan Konstruksi Spons]].

> [!cornell] #### Summary
>
> **Fungsi hash** $h = H(M)$ mengkompresi pesan **sembarang** menjadi **digest berukuran tetap** ($|h| \ll |M|$), dan bersifat **satu-arah**: tidak dapat dibalik dan tidak memakai kunci, sehingga **bukan enkripsi**. Tiga sifat keamanannya: **collision resistance** (sukar menemukan $a \ne b$ dengan $H(a) = H(b)$), **preimage resistance** (sukar menemukan input untuk suatu digest), dan **second preimage resistance** (sukar menemukan input kedua yang berdigest sama dengan input tertentu). **Kolisi** adalah dua input berbeda berdigest sama; bila dapat direkayasa, hash tidak aman. **MD2, MD5, SHA-0** sudah ditemukan kolisinya, **SHA-1** cacat, sedangkan **SHA-256/512** dan **WHIRLPOOL** belum.

> [!ad-libitum]- Additional Information
>
> #### Seberapa Sukar Itu? Paradoks Ulang Tahun
>
> Untuk digest $n$ bit: preimage dan second preimage butuh sekitar $2^n$ percobaan, tetapi **kolisi** hanya sekitar $2^{n/2}$ (paradoks ulang tahun). Karena itu MD5 (128 bit) hanya memberi keamanan kolisi $\approx 2^{64}$, dan SHA-256 memberi $\approx 2^{128}$. Inilah alasan digest harus **dua kali lebih panjang** daripada tingkat keamanan yang diinginkan.
>
> #### Hash vs Enkripsi vs Encoding
>
> | | Hash | Enkripsi | Encoding (mis. Base64) |
> |---|---|---|---|
> | Kunci | tidak | ya | tidak |
> | Dapat dibalik | tidak | ya (dengan kunci) | ya |
> | Panjang output | tetap | $\approx$ panjang input | $\approx$ panjang input |
>
> #### Hash untuk Password
>
> Hash cepat seperti MD5/SHA-1 **tidak cocok** untuk password karena penyerang dapat mencoba miliaran tebakan per detik (rainbow table, brute force). Pakai fungsi hash **lambat berkunci/bergaram**: **bcrypt, scrypt, Argon2, PBKDF2** ([[Aplikasi Fungsi Hash]] untuk salt).
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Tulis program Python yang menghitung MD5, SHA-1, SHA-256, dan SHA-512 atas string yang sama, lalu ukur waktunya untuk file 100 MB.
> 2. Cari kolisi pada hash yang **dipotong** menjadi 24 bit (mis. 6 digit hex pertama SHA-256) dengan brute force; amati bahwa kolisi muncul sekitar $2^{12}$ percobaan.
>
> #### Bacaan Lanjutan
>
> - Menezes, van Oorschot, Vanstone, *Handbook of Applied Cryptography*, Bab 9 (Hash Functions).
> - Rogaway & Shrimpton (2004), *Cryptographic Hash-Function Basics*.
> - Wang et al. (2004), *Collisions for Hash Functions MD4, MD5, HAVAL-128 and RIPEMD*.
