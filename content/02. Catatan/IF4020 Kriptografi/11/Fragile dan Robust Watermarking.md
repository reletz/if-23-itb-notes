---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4020 Kriptografi]]

> [!cornell] Fragile dan Robust Watermarking
>
> > ## Questions/Cues
> >
> > - Apa tujuan fragile watermarking dan bagaimana algoritmanya dengan LSB?
> > - Mengapa fragile watermark rusak oleh manipulasi dan apa gunanya?
> > - Apa persyaratan robust watermarking dan mengapa dilakukan di domain transform?
> > - Bagaimana DCT dan rumus $\hat{x}_i = x_i + \alpha w_i$ dipakai?
> > - Bagaimana watermark dideteksi (korelasi, algoritma Wang)?
> >
> > ## Reference Points
> >
> > - IF4020 Kriptografi — Digital Watermarking (Slides 27-47)
>
> > ### Fragile Watermarking
> >
> > Watermark **sengaja rapuh**: menjadi **rusak atau pecah** bila citra ber-watermark dimanipulasi (pengolahan citra umum). Tujuan: **pembuktian keaslian** dan **tamper proofing** (deteksi perubahan). Bila watermark yang diekstraksi rusak di suatu area, area itulah yang diubah.
> >
> > **Algoritma (berbasis LSB, domain spasial)**, prasyaratnya paham citra digital dan metode LSB ([[Metode LSB dan Variannya]]):
> >
> > 1. Jadikan watermark **seukuran citra** (mis. dengan menyalin/menyusun ulang).
> > 2. **Sisipkan** watermark pada **semua pixel** dengan LSB (bit watermark ke LSB tiap pixel).
> > 3. **Ekstraksi**: ambil LSB tiap pixel lalu susun kembali menjadi gambar watermark.
> >
> > **Uji manipulasi** pada citra ber-watermark: **deletion attack** (menghapus bagian), **insertion attack** (menambah bagian), serta **brightness and contrast attack**. Pada tiap serangan, watermark hasil ekstraksi **rusak** di area/keseluruhan yang diubah, menandakan citra tak asli. Contoh lain skema fragile: **Wong (1997)**.
> >
> > ### Robust Watermarking
> >
> > Watermark tetap **kokoh** terhadap manipulasi umum: **kompresi, cropping, editing, resizing**, dll. Tujuan: **perlindungan hak kepemilikan dan copyright**. Persyaratan umum:
> >
> > 1. **Imperceptible**: tak terlihat.
> > 2. **Robustness**: tahan manipulasi.
> > 3. **Secure**: tak mudah dihapus/dipalsukan pihak lain.
> >
> > ### Mengapa Domain Transform?
> >
> > Berbeda dengan fragile (domain spasial: pixel), robust watermarking menyisipkan watermark di **domain transform** (mis. frekuensi) agar tahan manipulasi. Citra ditransformasi dari ranah spasial ke ranah frekuensi, mis. dengan **DCT (Discrete Cosine Transform)**.
> >
> > **DCT 2D** citra $I(x, y)$ berukuran $M \times N$ menghasilkan koefisien $C(u, v)$:
> >
> > $$C(u,v) = \alpha(u)\alpha(v) \sum_{x=0}^{M-1}\sum_{y=0}^{N-1} I(x,y)\cos\frac{(2x+1)u\pi}{2M}\cos\frac{(2y+1)v\pi}{2N}$$
> >
> > dengan $\alpha(0) = \sqrt{1/M}$ dan $\alpha(u) = \sqrt{2/M}$ untuk $u > 0$ (bentuk standar; $\alpha(v)$ serupa dengan $N$). **IDCT** mengembalikan citra ke ranah spasial. Koefisien dikelompokkan menjadi **frekuensi rendah, menengah, dan tinggi**: frekuensi rendah membawa energi utama citra, sedangkan frekuensi tinggi rentan hilang saat kompresi.
> >
> > ### Penyisipan pada Koefisien
> >
> > Bit watermark $w_i$ disisipkan pada koefisien transform $x_i$ (dengan LSB, spread spectrum, dsb.). Bila watermark berupa bilangan riil:
> >
> > $$\hat{x}_i = x_i + \alpha\, w_i$$
> >
> > $\alpha$ adalah **kekuatan robustness**. Setelah itu citra di-IDCT kembali menjadi **citra ber-watermark**.
> >
> > ```mermaid
> > flowchart TD
> >     I["Citra"] --> D["DCT"]
> >     D --> C["Koefisien DCT"]
> >     W["Watermark"] --> E["Embed<br/>x̂ = x + αw"]
> >     K["Kunci"] --> E
> >     C --> E
> >     E --> CW["Koefisien ber-watermark"]
> >     CW --> ID["IDCT"]
> >     ID --> O["Citra ber-watermark"]
> > ```
> >
> > ### Deteksi: Algoritma Wang
> >
> > Slide menampilkan **algoritma Wang** (penyisipan pada koefisien DCT, dengan kunci menentukan posisi) dan deteksi lewat **korelasi**: hitung korelasi $c = \frac{1}{M}\sum_{i=1}^{M} x(i)\, w(i)$ antara koefisien citra yang diuji dan watermark yang diketahui, lalu **bandingkan dengan ambang $T_c$**: bila $c \ge T_c$ watermark dinyatakan ada (1), selain itu tidak (0). Rumus pada slide terbaca sebagian, sehingga bentuk di atas adalah interpretasi dari rumus korelasi dan keputusan ambang yang tertera.
> >
> > **Uji ketahanan**: citra ber-watermark diberi **kompresi JPEG, resize, cropping, noise**, lalu watermark diekstraksi; pada skema robust, watermark **masih dapat dikenali** setelah manipulasi tersebut.

> [!cornell] #### Summary
>
> **Fragile watermarking** (domain spasial, mis. LSB pada semua pixel) sengaja **rusak bila citra dimodifikasi**, dipakai untuk **membuktikan keaslian dan tamper proofing**; ia tidak tahan serangan deletion, insertion, atau perubahan brightness/contrast. **Robust watermarking** bertujuan melindungi **copyright** dan harus **imperceptible, robust, secure**; watermark disisipkan di **domain transform** (mis. **DCT**) pada koefisien dengan $\hat{x}_i = x_i + \alpha w_i$ ($\alpha$ = kekuatan), lalu IDCT menghasilkan citra ber-watermark. Deteksi memakai **korelasi** dengan ambang $T_c$ (algoritma Wang), dan ketahanan diuji terhadap kompresi JPEG, resize, crop, dan noise.

> [!ad-libitum]- Additional Information
>
> #### Pilihan Pita Frekuensi
>
> Watermark di frekuensi **rendah** kuat terhadap kompresi tetapi merusak kualitas (mata peka), di frekuensi **tinggi** tak terlihat tetapi hilang oleh kompresi. Maka umumnya dipilih **frekuensi menengah**: kompromi imperceptibility dan robustness (mis. algoritma **Cox et al., 1997** spread spectrum pada 1000 koefisien DCT terbesar, $x_i' = x_i(1 + \alpha w_i)$ dengan $w_i \sim \mathcal{N}(0,1)$).
>
> #### Transform Lain
>
> **DWT** (wavelet), **DFT** (tahan rotasi/skala lewat Fourier-Mellin), **SVD**, dan hibrid DWT-DCT-SVD. DCT blok $8 \times 8$ dipilih karena selaras dengan **JPEG**: watermark yang ditanam di koefisien DCT mudah bertahan terhadap kompresi JPEG.
>
> #### Semi-Fragile
>
> Di antara fragile dan robust ada **semi-fragile**: toleran terhadap kompresi ringan tetapi rusak oleh manipulasi konten (penggantian wajah, penghapusan objek), cocok untuk autentikasi di forensik.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Implementasikan fragile watermark LSB (logo biner $\to$ semua pixel) dan lakukan serangan crop/brightness; visualisasikan area rusak dari hasil ekstraksi.
> 2. Implementasikan robust watermark DCT ala Cox pada `scipy.fft.dctn`; ukur korelasi sebelum dan sesudah kompresi JPEG kualitas 90/70/50.
>
> #### Bacaan Lanjutan
>
> - Cox, Kilian, Leighton, Shamoon (1997), *Secure Spread Spectrum Watermarking for Multimedia*, IEEE TIP.
> - Wong, P. W. (1998), *A Public Key Watermark for Image Verification and Authentication*.
> - Sumber primer "algoritma Wang" tidak dicantumkan pada slide; cari dahulu sebelum mengutipnya.
