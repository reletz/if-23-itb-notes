---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4020 Kriptografi]]

> [!cornell] SHA-1 dan Konstruksi Merkle-Damgard
>
> > ## Questions/Cues
> >
> > - Apa itu SHA dan siapa yang menetapkannya sebagai standar?
> > - Apa saja empat langkah pembuatan message digest SHA-1?
> > - Bagaimana padding dan penambahan panjang pesan dilakukan?
> > - Apa isi buffer awal dan bagaimana operasi pada tiap putaran dari 80 putaran?
> > - Bagaimana SHA-1 dipecahkan (kolisi SHAttered 2017)?
> >
> > ## Reference Points
> >
> > - IF4020 Kriptografi — Beberapa Fungsi Hash (Slides 2-19)
>
> > ### Secure Hash Algorithm (SHA)
> >
> > **SHA** adalah fungsi hash satu-arah yang dipakai satu paket dengan **DSS (Digital Signature Standard)**; **NIST** menetapkannya sebagai standar. SHA dikembangkan dari **MD4** karya **Ronald L. Rivest (MIT)**. SHA menerima masukan maksimum **$2^{64}$ bit** (2.147.483.648 gigabyte) dan menghasilkan digest **160 bit** (lebih panjang dari MD5, 128 bit).
> >
> > Keluarga SHA memiliki enam varian: **SHA-0, SHA-1, SHA-224, SHA-256, SHA-384, SHA-512** (SHA-0 sering diacu sebagai "SHA" saja). Detailnya ada di RFC 3174. Kerangka umum fungsi hash iteratif seperti ini disebut **konstruksi Merkle-Damgård**:
> >
> > ![[Pasted image 20261020163128.png]]
> >
> > ### Parameter Keluarga SHA
> >
> > Tabel pada slide 5-6 membandingkan parameter tiap varian (semua ukuran dalam bit):
> >
> > | | SHA-1 | SHA-224 | SHA-256 | SHA-384 | SHA-512 |
> > |---|---|---|---|---|---|
> > | Ukuran digest | 160 | 224 | 256 | 384 | 512 |
> > | *Internal state* | 160 | 256 | 256 | 512 | 512 |
> > | Ukuran blok | 512 | 512 | 512 | 1024 | 1024 |
> > | Ukuran pesan maksimum | $2^{64} - 1$ | $2^{64} - 1$ | $2^{64} - 1$ | $2^{128} - 1$ | $2^{128} - 1$ |
> > | Ukuran word | 32 | 32 | 32 | 64 | 64 |
> > | Jumlah putaran | 80 | 64 | 64 | 80 | 80 |
> > | Operasi | $+$, and, or, xor, rot | $+$, and, or, xor, shr, rot | idem | idem | idem |
> > | Kolisi ditemukan? | **Ya** | Tidak | Tidak | Tidak | Tidak |
> >
> > SHA-0 juga tercantum dengan kolisi **Ya**. SHA-224/256 dan SHA-384/512 dikelompokkan sebagai **SHA-2**.
> >
> > ### Empat Langkah SHA-1
> >
> > Arsitektur SHA-1 mirip MD5, hanya berbeda pada jumlah **variabel buffer (5)** dan komputasi di tiap blok 512 bit.
> >
> > **1. Padding.** 
> > ![[Pasted image 20261020163155.png]]
> > Pesan ditambah bit pengganjal sehingga panjangnya $\equiv 448 \pmod{512}$. Panjang pengganjal 1 sampai 512 bit: **satu bit `1` diikuti bit `0`**. Contoh: $K = 32000$ bit; $32000 + 192 = 32192$, dan $32192 \bmod 512 = 448$ ✓ (192 bit pengganjal).
> >
> > **2. Tambah panjang pesan.** 
> > ![[Pasted image 20261020163212.png]]
> > Tambahkan **64 bit** yang menyatakan panjang pesan semula. Contoh: $32000 = 111110100000000_2$ ditulis sebagai 64 bit (nol di kiri). Kini panjang total kelipatan 512 bit.
> >
> > **3. Inisialisasi buffer MD.** Lima variabel 32 bit ($5 \times 32 = 160$ bit):
> >
> > | A | B | C | D | E |
> > |---|---|---|---|---|
> > | `67452301` | `EFCDAB89` | `98BADCFE` | `10325476` | `C3D2E1F0` |
> >
> > **4. Pemrosesan blok 512 bit.** Tiap blok melalui **80 putaran**, memakai konstanta penambah $K_t$:
> >
> > ![[Pasted image 20261020163245.png]]
> >
> > | Putaran $t$ | $K_t$ | $f_t(b, c, d)$ |
> > |---|---|---|
> > | 0-19 | `5A827999` | $(b \wedge c) \vee (\lnot b \wedge d)$ |
> > | 20-39 | `6ED9EBA1` | $b \oplus c \oplus d$ |
> > | 40-59 | `8F1BBCDC` | $(b \wedge c) \vee (b \wedge d) \vee (c \wedge d)$ |
> > | 60-79 | `CA62C1D6` | $b \oplus c \oplus d$ |
> >
> > **Operasi dasar tiap putaran** (CLS$_n$ = circular left shift $n$ bit, $+$ = penjumlahan mod $2^{32}$):
> >
> > ```
> > e <- d
> > d <- c
> > c <- CLS30(b)
> > b <- a
> > a <- CLS5(a) + f_t(b, c, d) + e + W_t + K_t
> > ```
> >
> > $W_0 \dots W_{15}$ berasal dari 16 word (32 bit) pada blok yang diproses; $W_t$ berikutnya diperoleh dari $W_{t-3} \oplus W_{t-8} \oplus W_{t-14} \oplus W_{t-16}$ (pada standar SHA-1, hasilnya diputar kiri 1 bit, CLS$_1$). Setelah 80 putaran, hasil dijumlahkan ke buffer sebelumnya sebagai input blok berikutnya; digest akhir = gabungan A, B, C, D, E (160 bit).
> >
> > **Contoh digest SHA-1**: `sha1("halo")` = `33b1eac210971fb02a3b90afce9dbff758be794d`; `sha1("The quick brown fox jumps over the lazy dog")` = `2fd4e1c67a2d28fced849ee1bb76e7391b93eb12`.
> >
> > **Tambahan dari slide**:
> >
> > - Gambar slide 12: setelah 80 putaran, keluaran $(A, B, C, D, E)$ **dijumlahkan** (per word, modulo $2^{32}$) dengan nilai $MD_q$ (buffer sebelum blok itu) menghasilkan $MD_{q+1}$; inilah masukan blok berikutnya. Setelah blok terakhir, $MD$ menjadi digest 160 bit.
> > - Demo daring (slide 14-15): alat `emn178.github.io/online-tools/sha1.html` menghitung SHA-1 untuk masukan UTF-8 `Libur lebaran sudah usai, yuk kuliah lagi gaesss...` menjadi `f0ff7687efc93dc9e49ee36ccbec8e8b3e7893a3` (kuverifikasi dengan `hashlib`). Situs `sha1-online.com` juga menyediakan fungsi hash lain, mis. **GOST** (fungsi hash standar Rusia) untuk `Balik kampung hari raya ini kah?`.
> > - Catatan: nilai `sha1("halo, apa kabar teman?")` pada slide, `03d17abd2962dbed1037d1230f012037cd25fe91`, cocok bila kalimatnya ditulis **tanpa spasi di akhir**; satu spasi tambahan menghasilkan digest yang sama sekali berbeda (contoh efek longsor).
> >
> >
> > ### Kriptanalisis SHA-1
> > 
> > ![[Pasted image 20261020163359.png]]
> >
> > Pada **23 Februari 2017** kolisi pertama SHA-1 diumumkan (Google dan CWI, serangan **SHAttered**): dua berkas PDF berbeda (`shattered-1.pdf` dan `shattered-2.pdf`) memiliki **SHA-1 yang sama**. Rizki Wicaksono (alumni Informatika ITB angkatan 1999) juga mendemonstrasikan pembuatan dua berkas berbeda berdigest SHA-1 sama. Dengan itu SHA-1 dianggap **tidak aman** untuk tanda tangan digital dan sertifikat.
> >
> > **Rincian dari slide 17-19**:
> >
> > - Pengumuman dan analisis: blog keamanan Google (*Announcing the first SHA1 collision*, 23 Februari 2017) dan *shattered.io*. Tim: **Marc Stevens dan Pierre Karpman (CWI)** bersama **Elie Bursztein, Ange Albertini, dan Yarik Markov (Google)**.
> > - Bukti: kedua berkas `shattered-1.pdf` dan `shattered-2.pdf` (isi berbeda) dimasukkan ke alat *SHA1 File Checksum*, dan keduanya menghasilkan SHA-1 yang sama, `38762cf7f55934b34d179ae6a4c80cadccbb7f0a`.
> > - Rizki Wicaksono menulis panduannya pada **21 Maret 2017** di *ilmuhacking.com* dengan judul **"Membuat file dengan SHA1 collision"**: sejumlah ilmuwan dengan dukungan komputasi Google menciptakan dua file PDF dengan SHA1 identik walaupun isinya berbeda.
> >

> [!cornell] #### Summary
>
> **SHA** adalah fungsi hash satu-arah standar NIST (paket DSS), dikembangkan dari **MD4**, menerima masukan hingga $2^{64}$ bit dan menghasilkan **digest 160 bit**. **SHA-1** bekerja dengan konstruksi **Merkle-Damgård** dalam empat langkah: (1) **padding** (bit `1` lalu `0`) hingga panjang $\equiv 448 \pmod{512}$, (2) tambah **64 bit panjang pesan**, (3) inisialisasi **5 buffer 32-bit** ($A$ = `67452301`, ..., $E$ = `C3D2E1F0`), (4) proses blok 512 bit dalam **80 putaran** dengan $K_t$ dan fungsi logika $f_t$ yang berganti tiap 20 putaran: $a \leftarrow \text{CLS}_5(a) + f_t(b,c,d) + e + W_t + K_t$. Pada **2017**, kolisi pertama SHA-1 (SHAttered) diumumkan sehingga SHA-1 tidak lagi aman.

> [!ad-libitum]- Additional Information
>
> #### Mengapa 448 dan 64?
>
> $448 + 64 = 512$: setelah padding, ruang yang tersisa tepat untuk 64 bit panjang. Padding **selalu ditambahkan**, bahkan bila pesan sudah $\equiv 448$ (maka ditambah satu blok pengganjal penuh, 512 bit). Menyertakan **panjang pesan** (*Merkle-Damgård strengthening*) mencegah serangan yang memanfaatkan pesan berpadding sama.
>
> #### Skala Serangan SHAttered
>
> Serangan 2017 membutuhkan sekitar $2^{63}$ komputasi SHA-1 (menurut Google, setara sekitar 6.500 tahun-CPU ditambah 110 tahun-GPU), $\approx 100.000$ kali lebih cepat daripada brute force kolisi umum ($2^{80}$). Pada 2020, serangan **chosen-prefix** (*SHA-1 is a Shambles*) membuat pemalsuan sertifikat/PGP praktis. Git memakai SHA-1 dan mulai bermigrasi ke SHA-256.
>
> #### Contoh Perhitungan Padding Lain
>
> Pesan `abc` (24 bit): pengganjal = $448 - 24 = 424$ bit (bit `1` + 423 nol), lalu 64 bit panjang (`0x18` = 24). Total 512 bit, satu blok.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Implementasikan **padding SHA-1** dalam Python (fungsi yang mengembalikan blok-blok 512 bit) dan uji pada $K = 32000$ bit (harus 192 bit pengganjal).
> 2. Implementasikan SHA-1 lengkap (80 putaran) dan verifikasi `sha1("halo")` terhadap `hashlib.sha1`.
>
> #### Bacaan Lanjutan
>
> - RFC 3174, *US Secure Hash Algorithm 1 (SHA1)*.
> - Stevens et al. (2017), *The First Collision for Full SHA-1* (shattered.io).
> - Leurent & Peyrin (2020), *SHA-1 is a Shambles*.
