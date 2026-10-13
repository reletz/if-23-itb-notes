---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4020 Kriptografi]]

> [!cornell] Implementasi LSB pada Citra dan Audio
>
> > ## Questions/Cues
> >
> > - Bagaimana program MATLAB menyimpan panjang pesan di dalam citra?
> > - Bagaimana program Python menandai akhir pesan tanpa panjang eksplisit?
> > - Operasi bit apa yang dipakai untuk mengganti dan membaca LSB?
> > - Bagaimana struktur file WAV memungkinkan LSB pada audio?
> > - Mengapa stego-image harus disimpan dalam format lossless?
> >
> > ## Reference Points
> >
> > - IF4020 Kriptografi — Steganografi Bagian 1 (Slides 60-95)
>
> > ### Alat Steganografi
> >
> > Slide menunjukkan beberapa alat daring dan aplikasi untuk mencoba LSB: edchart image steganography, planetcalc, **StegOnline**, incoherency image-steganography, dan **Steghide** (freeware). Slide juga mengingatkan **Stegosploit** (2015): kode jahat disembunyikan dalam gambar sehingga "*just look at the image and you are hacked*" ([[Steganalisis]]).
> >
> > ### Program MATLAB (Citra RGB)
> >
> > Rancangan dengan **header panjang pesan 30 bit**:
> >
> > **Penyisipan (`LSB_sisip.m`)**
> >
> > 1. Baca citra cover $\to$ `total_byte = tinggi * lebar * 3`.
> > 2. Baca pesan $\to$ $L$ = panjang karakter; `nL = dec2bin(L, 30)`.
> > 3. Ubah tiap karakter menjadi 8 bit; gabung: **[30 bit $L$] + [bit pesan]** $\to$ $m$ bit.
> > 4. Jika $m >$ `total_byte`: citra tak mencukupi.
> > 5. Untuk tiap pixel (baris, kolom) dan tiap kanal $i = 1..3$: `bitset(coverImage(row,col,i), 1, biner(idx))` (bit ke-1 = LSB).
> > 6. Simpan sebagai **BMP**.
> >
> > **Ekstraksi (`LSB_ekstrak.m`)**
> >
> > 1. Ambil LSB dari 30 byte pertama (10 pixel $\times$ 3 kanal) $\to$ rekonstruksi $L$ dengan $L = \sum nL_i \cdot 2^{30-i}$.
> > 2. Baca $m = 8L + 30$ bit LSB berurutan.
> > 3. Buang 30 bit pertama, kelompokkan 8 bit, ubah menjadi karakter (`bin2dec`, `char`).
> >
> > Contoh: pesan *"Mari kita jaga negara kesatuan Republik Indonesia tercinta. Oke?"* disisipkan ke `peppers.bmp` $\to$ `output.bmp`, lalu diekstraksi kembali utuh.
> >
> > ### Program Python (Citra, `numpy` + `PIL`)
> >
> > Perbedaan rancangan: **tidak ada header panjang**, melainkan **delimiter `#####`** di akhir pesan.
> >
> > ```python
> > pesan = pesan + "#####"
> > pesan_biner = ''.join([format(ord(i), "08b") for i in pesan])
> > # sisip: kosongkan LSB lalu isi dengan bit pesan
> > larik_pixel[p][q] = (larik_pixel[p][q] & 254) | int(pesan_biner[index])
> > # ekstrak: ambil LSB
> > bit_pesan += str(larik_pixel[p][q] & 1)
> > ```
> >
> > - `& 254` (`11111110`) **mengosongkan LSB**; `| bit` menuliskan bit pesan.
> > - `& 1` mengambil LSB.
> > - Ekstraksi membaca per 8 bit menjadi karakter sampai `#####` ditemukan; bila tidak ada, program melapor *"Tidak ada pesan tersembunyi"*.
> > - Output harus **PNG** (lossless), bukan JPG.
> >
> > Catatan: pengecekan kapasitas pada slide membandingkan panjang bit pesan dengan **jumlah pixel** (`total_pixel`), padahal kapasitas sebenarnya `total_pixel * 3` byte; jadi pengecekannya konservatif.
> >
> > ### Steganografi pada Audio WAV
> >
> > File **WAV** (PCM tak terkompresi) terdiri atas header (format, channel, sample rate, bits per sample) dan data sampel mentah. Contoh umum: PCM, 2 channel (stereo), 44100 Hz, 16 bit. Program memakai modul `wave`:
> >
> > - baca seluruh frame sebagai `bytearray`;
> > - sisipkan bit pesan (+ delimiter `#####`) pada **LSB tiap byte frame** `frames[i] = (frames[i] & 254) | bit`;
> > - tulis file WAV baru dengan **parameter header yang sama** (`setparams(audio.getparams())`);
> > - ekstraksi: ambil LSB semua byte, kelompokkan 8 bit, hentikan di `#####`.
> >
> > Perubahan $\pm 1$ pada amplitudo sampel 16 bit tidak terdengar, sejalan dengan prinsip LSB pada citra.
> >
> > ```mermaid
> > flowchart TD
> >     S["Mulai embedding"] --> A["pesan + delimiter '#####'"]
> >     A --> B["ubah ke string biner (8 bit/karakter)"]
> >     B --> C{"bit pesan ≤<br/>kapasitas cover?"}
> >     C -->|tidak| X["ERROR: cover tidak cukup"]
> >     C -->|ya| D["untuk tiap byte cover:<br/>(byte AND 254) OR bit"]
> >     D --> E["simpan stego (PNG/WAV)"]
> > ```
> >
> > ### Latihan dari Slide
> >
> > 1. Kembangkan program sehingga dapat menyembunyikan **file sembarang** ke dalam gambar.
> > 2. Hal yang sama untuk **audio**.
> > 3. Buat program **hybrid**: enkripsi dengan cipher (mis. Vigenère, lihat [[Vigenère Cipher dan Kriptanalisis Kasiski]]), lalu sembunyikan cipherteks pada gambar atau audio.

> [!cornell] #### Summary
>
> Implementasi LSB mengubah teks menjadi bit, lalu mengganti LSB tiap byte cover: `(byte & 254) | bit` untuk menyisipkan dan `byte & 1` untuk mengekstraksi. Program **MATLAB** menyimpan **panjang pesan 30 bit** sebagai header di awal citra, sedangkan program **Python** memakai **delimiter `#####`** sebagai penanda akhir. Citra stego harus disimpan **lossless** (BMP/PNG). Pada **audio WAV** (PCM) prinsipnya sama: LSB byte-byte frame diganti, header WAV dipertahankan. Cover harus cukup besar untuk bit pesan beserta header/delimiter, dan latihan lanjut adalah menyembunyikan file sembarang atau menggabungkan dengan enkripsi.

> [!ad-libitum]- Additional Information
>
> #### Kelemahan Desain Slide
>
> - **Delimiter** `#####` membuat pesan yang mengandung `#####` terpotong, dan delimiter yang konstan merupakan **signature** yang mudah dicari penyerang. **Header panjang** tak punya masalah ini tetapi header 30 bit yang selalu di pixel awal mudah dikenali.
> - Pada program audio, bila pesan lebih panjang dari frame, kode tetap menyimpan file tanpa menghentikan proses; sebaiknya `return` setelah error.
> - Sisipan **sequential** meninggalkan blok perubahan di awal berkas; gunakan PRNG berkunci ([[Metode LSB dan Variannya]]).
>
> #### Menyembunyikan File Sembarang
>
> Pendekatan umum: tulis header berisi **ukuran file** (4-8 byte) dan **nama/ekstensi**, lalu byte-byte file, semuanya diubah menjadi bit dengan `format(b, '08b')`. Enkripsi dengan AES-CTR sebelum disisipkan membuat bit pesan tampak acak sehingga distribusi LSB lebih seragam.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Implementasikan latihan 1-3 dari slide dalam satu program: AES-CTR $\to$ header (ukuran, ekstensi) $\to$ LSB acak berkunci pada PNG.
> 2. Tuliskan alat deteksi sederhana yang menghitung rasio 0/1 pada LSB dan bandingkan cover vs stego.
>
> #### Bacaan Lanjutan
>
> - Dokumentasi Python `wave` dan `Pillow`.
> - Steghide: `steghide.sourceforge.net`.
> - Wayner, P., *Disappearing Cryptography*, Morgan Kaufmann.
