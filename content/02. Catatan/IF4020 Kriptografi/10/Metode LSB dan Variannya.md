---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4020 Kriptografi]]

> [!cornell] Metode LSB dan Variannya
>
> > ## Questions/Cues
> >
> > - Mengapa mengubah bit LSB tidak terlihat oleh mata manusia?
> > - Bagaimana proses penyisipan dan ekstraksi pesan dengan LSB?
> > - Berapa ukuran pesan maksimum yang dapat disembunyikan pada citra tertentu?
> > - Apa saja varian LSB (sequential, acak, m-bit, dengan enkripsi)?
> > - Apa trade-off memakai lebih dari 1 bit LSB per byte?
> >
> > ## Reference Points
> >
> > - IF4020 Kriptografi — Steganografi Bagian 1 (Slides 40-59)
>
> > ### Citra Digital Singkat
> >
> > Citra tersusun dari **pixel**; citra $1200 \times 1500$ berarti $1.800.000$ pixel. Tiap pixel berukuran $n$ bit: **biner** 1 bit/pixel, **grayscale** 8 bit/pixel, **true color** 24 bit/pixel (3 byte: komponen **R, G, B**, masing-masing 0-255).
> >
> > ### Prinsip LSB
> >
> > Bit sebuah byte $b_7 b_6 \dots b_0$ disusun dari **MSB** (most significant bit, paling kiri) hingga **LSB** (least significant bit, paling kanan). Contoh `11010001` = 209. Mengubah LSB hanya mengubah nilai byte **sebesar $\pm 1$**: `11010001` (209) $\to$ `11010000` (208). Pergeseran warna 1 dari 256 tingkat **tidak dapat dibedakan mata manusia**; bahkan membalik seluruh bit LSB sebuah citra (0$\leftrightarrow$1) tampak tanpa beda.
> >
> > ### Contoh Penyisipan
> >
> > Satu pixel 24-bit $[130, 123, 117]$ = `10000010` `01111011` `01110101`, pesan 3 bit `101`:
> >
> > | Byte asli | Bit pesan | Byte stego | Nilai |
> > |---|---|---|---|
> > | `10000010` (130) | 1 | `1000001`**`1`** | 131 |
> > | `01111011` (123) | 0 | `0111101`**`0`** | 122 |
> > | `01110101` (117) | 1 | `0111010`**`1`** | 117 (tetap) |
> >
> > Pixel berubah dari $[130, 123, 117]$ menjadi $[131, 122, 117]$: tetap "ungu", hanya sedikit bergeser. Contoh pesan 10 bit `1110010111` pada 10 byte berurutan mengubah LSB tiap byte menjadi bit-bit pesan; hanya byte yang LSB-nya berbeda yang benar-benar berubah.
> >
> > **Ekstraksi**: baca byte-byte stego, ambil LSB tiap byte, rangkai kembali menjadi bit pesan (`1110010111`).
> >
> > ```mermaid
> > flowchart LR
> >     subgraph EMB["Penyisipan"]
> >         direction LR
> >         A["byte cover<br/>b7..b1 b0"] --> B["ganti b0<br/>dengan bit pesan"] --> C["byte stego"]
> >     end
> >     subgraph EXT["Ekstraksi"]
> >         direction LR
> >         D["byte stego"] --> E["ambil b0<br/>(AND 1)"] --> F["rangkai<br/>bit pesan"]
> >     end
> >     EMB --> EXT
> > ```
> >
> > ### Kapasitas
> >
> > Kapasitas bergantung ukuran cover; tiap byte menampung **1 bit**:
> >
> > | Cover | Byte | Pesan maksimum |
> > |---|---|---|
> > | Grayscale $256 \times 256$ (1 byte/pixel) | 65.536 | 65.536 bit = 8192 byte = **8 KB** |
> > | 24-bit $256 \times 256$ (3 byte/pixel) | 196.608 | 196.608 bit = 24.576 byte = **24 KB** |
> >
> > ### Varian Metode LSB
> >
> > 1. **Sequential**: bit pesan disisipkan pada pixel **berurutan** mulai pixel pertama; ekstraksi membaca berurutan sampai bit terakhir. Sederhana tetapi pola perubahan terkonsentrasi di awal citra sehingga mudah dicurigai.
> > 2. **Acak**: posisi pixel dipilih oleh **PRNG** (pseudo-random number generator); **seed menjadi stego-key**. Ekstraksi memakai seed yang sama sehingga memperoleh urutan posisi yang sama. Lebih aman karena bit tersebar.
> > 3. **$m$-bit LSB**: memakai $m > 1$ bit terakhir tiap byte (mis. 2-bit LSB = $b_1 b_0$). **Trade-off**: makin banyak bit LSB, makin **besar kapasitas** tetapi makin **turun kualitas** stego-image. Dapat sequential atau acak.
> > 4. **Dengan enkripsi**: pesan dienkripsi dahulu (mis. XOR dengan bit kunci acak sepanjang pesan; lihat [[Kriptografi Modern dan Operasi XOR]]). Jika posisi pixel juga acak, ada **dua stego-key**: satu untuk membangkitkan bit kunci, satu untuk posisi pixel.

> [!cornell] #### Summary
>
> **Metode LSB** mengganti bit **paling tidak signifikan** tiap byte cover dengan bit pesan; perubahan hanya $\pm 1$ sehingga tak terlihat mata (mis. pixel $[130, 123, 117] \to [131, 122, 117]$). Ekstraksi cukup mengambil LSB tiap byte dan merangkainya. **Kapasitas** 1 bit per byte: citra grayscale $256 \times 256$ menampung 8 KB, citra 24-bit $256 \times 256$ menampung 24 KB. Varian: **sequential**, **acak** (PRNG dengan seed sebagai stego-key), **$m$-bit LSB** (kapasitas naik, kualitas turun), dan **dengan enkripsi** (pesan di-XOR dengan kunci acak, sehingga bisa ada dua stego-key).

> [!ad-libitum]- Additional Information
>
> #### Mengapa Format Cover Menentukan
>
> LSB harus memakai format **lossless** (BMP, PNG). Format **lossy** seperti JPEG menghitung ulang nilai pixel lewat DCT dan kuantisasi sehingga LSB **hilang** saat disimpan; itu sebabnya program contoh meminta output BMP atau PNG. Untuk JPEG dipakai metode transform domain (mis. **F5**, **OutGuess**, JSteg) yang mengubah koefisien DCT.
>
> #### Peningkatan: LSB Matching dan Hamming Embedding
>
> **LSB replacement** (yang dibahas di kuliah) membuat pasangan nilai $(2k, 2k+1)$ **menyatu** pada histogram, jejak yang dipakai steganalisis chi-square ([[Steganalisis]]). **LSB matching ($\pm 1$)** menambah atau mengurangi 1 secara acak ketika LSB tak cocok sehingga jejak ini hilang. **Matrix embedding** (kode Hamming, dipakai F5) menyisipkan $k$ bit dengan mengubah paling banyak 1 dari $2^k - 1$ posisi sehingga perubahan lebih sedikit.
>
> #### Mengukur Fidelity
>
> Kualitas stego biasa diukur dengan **MSE** dan **PSNR**: $\text{PSNR} = 10 \log_{10}(255^2 / \text{MSE})$ dB; nilai di atas $\approx 40$ dB umumnya tidak terlihat.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Ubah LSB sequential menjadi LSB acak dengan `random.seed(stego_key)` dan `random.sample`; verifikasi ekstraksi gagal bila seed salah.
> 2. Ukur PSNR untuk $m = 1, 2, 3, 4$ bit LSB pada citra yang sama dan buat grafik kapasitas vs kualitas.
>
> #### Bacaan Lanjutan
>
> - Westfeld, A. (2001), *F5: A Steganographic Algorithm*.
> - Mielikainen, J. (2006), *LSB Matching Revisited*.
> - Provos & Honeyman (2003), *Hide and Seek: An Introduction to Steganography*.
