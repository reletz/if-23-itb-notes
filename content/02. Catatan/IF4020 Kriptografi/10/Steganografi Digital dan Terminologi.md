---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4020 Kriptografi]]

> [!cornell] Steganografi Digital dan Terminologi
>
> > ## Questions/Cues
> >
> > - Apa itu steganografi digital dan apa saja media pembawanya (carrier file)?
> > - Apa arti cover-object, embedded message, stego-object, dan stego-key?
> > - Bagaimana alur proses embedding dan extraction?
> > - Apa saja kriteria steganografi yang baik dan mengapa robustness bukan isu utama?
> > - Bagaimana steganografi dikombinasikan dengan kriptografi?
> > - Apa beda metode ranah spasial dan ranah transform?
> >
> > ## Reference Points
> >
> > - IF4020 Kriptografi — Steganografi Bagian 1 (Slides 25-39)
>
> > ### Steganografi Digital
> >
> > **Steganografi digital** adalah penyembunyian pesan digital di dalam dokumen digital lain. Dokumen pembawa disebut **carrier file**. Jenis media dan formatnya:
> >
> > | Media | Format contoh |
> > |---|---|
> > | Teks | `.txt`, `.doc`, `.html` |
> > | Audio | `.wav`, `.mp3` |
> > | Citra | `.bmp`, `.jpeg`, `.gif`, `.png` |
> > | Video | `.mpeg`, `.avi`, `.mp4` |
> >
> > ### Terminologi
> >
> > | Istilah | Arti |
> > |---|---|
> > | **Embedded message** (hiddentext, secret message) | pesan yang disembunyikan; bisa teks, gambar, audio, video |
> > | **Cover-object** (covertext) | media yang dipakai untuk menyembunyikan pesan |
> > | **Stego-object** (stegotext) | cover-object yang sudah berisi embedded message |
> > | **Stego-key** | kunci untuk menyisipkan dan mengekstraksi pesan |
> >
> > ```mermaid
> > flowchart LR
> >     M["Embedded message<br/>(pesan rahasia)"] --> E["Embedding<br/>(encoder)"]
> >     C["Cover-object"] --> E
> >     K1["stego-key"] --> E
> >     E --> S["Stego-object"]
> >     S -->|"kanal publik<br/>(diamati adversary)"| X["Extraction<br/>(decoder)"]
> >     K2["stego-key"] --> X
> >     X --> M2["Embedded message"]
> > ```
> >
> > Contoh dalam slide: pesan teks disembunyikan di dalam citra GIF, satu citra disembunyikan di dalam citra lain, lalu **diekstraksi kembali** dari stego-image.
> >
> > ### Kriteria Steganografi yang Baik
> >
> > 1. **Imperceptible**: keberadaan pesan tidak terdeteksi secara visual atau audial.
> > 2. **Fidelity**: kualitas cover-object tidak banyak berubah akibat penyisipan.
> > 3. **Recovery**: pesan yang disembunyikan harus dapat **diekstraksi kembali**.
> > 4. **Capacity**: ukuran pesan yang dapat disembunyikan sebesar mungkin.
> >
> > **Catatan:** *robustness* (ketahanan terhadap manipulasi) **bukan isu penting** pada steganografi; berbeda dengan watermarking ([[Konsep Digital Watermarking]]). Stego-object bersifat point-to-point, tidak diharapkan dimanipulasi di tengah jalan.
> >
> > ### Kombinasi Kriptografi dan Steganografi
> >
> > Steganografi **bukan pengganti** kriptografi, tetapi **saling melengkapi**. Pesan **dienkripsi lebih dulu**, lalu cipherteks disembunyikan dalam media lain. Kutipan David Kahn (*The Codebreakers*): menyembunyikan pesan mengurangi peluang terdeteksi, dan bila pesan terenkripsi itu tetap ditemukan, penyerang masih **harus memecahkannya**: **lapisan perlindungan tambahan**.
> >
> > ```mermaid
> > flowchart LR
> >     P["Plainteks"] -->|"enkripsi<br/>(kriptografi)"| C["Cipherteks"]
> >     C -->|"penyisipan<br/>(steganografi)"| S["Stego-object"]
> >     S --> W["Tampak biasa<br/>bagi pengamat"]
> > ```
> >
> > ### Ranah Operasi
> >
> > | Ranah | Cara kerja | Contoh |
> > |---|---|---|
> > | **Spatial (time) domain** | langsung memodifikasi **nilai byte** cover (intensitas/warna pixel atau amplitudo) | metode **LSB** ([[Metode LSB dan Variannya]]) |
> > | **Transform domain** | memodifikasi **hasil transformasi** sinyal (mis. ke ranah frekuensi) | **spread spectrum**, berbasis DCT |

> [!cornell] #### Summary
>
> **Steganografi digital** menyembunyikan **embedded message** ke dalam **cover-object** (teks, audio, citra, video; disebut *carrier file*) menghasilkan **stego-object**, dengan **stego-key** untuk penyisipan dan ekstraksi. Steganografi yang baik **imperceptible**, menjaga **fidelity**, dapat di-**recover**, dan berkapasitas besar (**robustness bukan isu penting**). Steganografi melengkapi kriptografi: pesan **dienkripsi dulu** lalu disembunyikan sehingga ada dua lapis perlindungan. Metode dibagi menjadi **ranah spasial** (mengubah nilai byte langsung, mis. **LSB**) dan **ranah transform** (mengubah koefisien hasil transformasi, mis. **spread spectrum**).

> [!ad-libitum]- Additional Information
>
> #### Trade-off Segitiga Steganografi
>
> Tiga properti utama saling bertentangan: **kapasitas**, **imperceptibility**, dan **robustness**. Menambah kapasitas (lebih banyak bit LSB) menurunkan imperceptibility dan memudahkan [[Steganalisis]]; menaikkan robustness (transform domain) biasanya mengurangi kapasitas. Steganografi umumnya mengutamakan kapasitas dan imperceptibility, watermarking mengutamakan robustness.
>
> #### Model Keamanan Cachin
>
> Secara teoretis, keamanan sistem steganografi diukur dengan **relative entropy** antara distribusi cover dan stego: $D(P_C \| P_S) \le \varepsilon$. Bila $\varepsilon = 0$ sistem **perfectly secure** (adversary tidak bisa membedakan). Ini analog dengan *perfect secrecy* pada [[One-Time Pad dan Perfect Secrecy]].
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Gambarkan alur sistem **hybrid**: enkripsi AES-CTR lalu LSB; implementasikan di Python dan ukur perubahan PSNR citra.
> 2. Bandingkan histogram cover dan stego pada citra grayscale sebelum dan sesudah penyisipan.
>
> #### Bacaan Lanjutan
>
> - Cox et al., *Digital Watermarking and Steganography*, Morgan Kaufmann.
> - Cachin, C. (1998), *An Information-Theoretic Model for Steganography*.
> - Katzenbeisser & Petitcolas, *Information Hiding Techniques for Steganography and Digital Watermarking*.
