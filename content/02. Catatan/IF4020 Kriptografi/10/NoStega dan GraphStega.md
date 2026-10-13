---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4020 Kriptografi]]

> [!cornell] NoStega dan GraphStega
>
> > ## Questions/Cues
> >
> > - Apa masalah steganografi berbasis cover yang diatasi NoStega?
> > - Bagaimana NoStega "menyembunyikan" pesan tanpa memodifikasi cover?
> > - Bagaimana GraphStega mengubah pesan menjadi grafik?
> > - Bagaimana penerima membaca kembali pesan dari angka-angka grafik?
> >
> > ## Reference Points
> >
> > - IF4020 Kriptografi — Steganalisis (Slides 22-29)
>
> > ### Latar Belakang: Noiseless Steganography
> >
> > Steganografi konvensional **memodifikasi cover** sehingga kualitasnya **terdegradasi** (noise), dan degradasi inilah yang dimanfaatkan [[Steganalisis]] untuk menemukan pesan. **NoStega** (*Noiseless Steganography*) ditemukan **Desoky (2012)**: **tidak membutuhkan cover** yang dimodifikasi. Pesan disamarkan dalam bentuk **cover yang tampak natural**, mis. **grafik, email, game, catatan**, dan sebagainya, sehingga tidak menimbulkan kecurigaan.
> >
> > Slide hanya menyebut dua teknik NoStega lain berdasarkan namanya, yaitu **Chess-stega** dan **Head-stega** (beserta ilustrasi), tanpa menjelaskan mekanismenya.
> >
> > ### GraphStega (Graph Steganography)
> >
> > Salah satu teknik NoStega: pesan diubah menjadi **plot grafik**.
> >
> > **Proses penyembunyian** untuk pesan `Use my secret key`:
> >
> > 1. Ubah pesan ke biner (8 bit/karakter ASCII, total 136 bit).
> > 2. Kelompokkan menjadi **kelompok 7 bit**: `0101010 1011100 1101100 1010010 0000011 0110101 1110010 0100000 0111001 1011001 0101100 0110111 0010011 0010101 1101000 0100000 0110101 1011001 0101111 001`.
> > 3. Konversi tiap kelompok ke desimal: **42 92 108 82 3 53 114 32 57 89 44 55 19 21 104 32 53 89 47 1**.
> > 4. Plot nilai-nilai itu sebagai **grafik** yang tampak wajar; contohnya diklaim sebagai *jumlah penderita demam berdarah selama 20 bulan di Kota Bogor (Januari 2017 - Agustus 2018)*. Bentuk grafik dapat berupa batang, garis, atau lainnya.
> >
> > **Proses pembacaan** oleh penerima:
> >
> > 1. Baca nilai-nilai dari grafik.
> > 2. Ubah ke biner dan ambil **7 bit LSB** dari tiap nilai.
> > 3. Gabungkan seluruh bit, kelompokkan kembali per **8 bit**.
> > 4. Ubah ke karakter ASCII: **`Use my secret key`**.
> >
> > ```mermaid
> > flowchart LR
> >     M["Pesan:<br/>Use my secret key"] --> B["biner 8 bit<br/>(136 bit)"]
> >     B --> G["kelompok 7 bit<br/>(20 kelompok)"]
> >     G --> D["desimal:<br/>42 92 108 ..."]
> >     D --> P["plot grafik<br/>(tampak data biasa)"]
> >     P -->|"penerima baca nilai"| R["ambil 7 bit LSB,<br/>gabung, 8 bit/karakter"]
> >     R --> M2["Use my secret key"]
> > ```
> >
> > Kekuatan GraphStega: tidak ada **gambar atau berkas yang dimodifikasi**, sehingga **tidak ada artefak statistik** pada media. Kelemahan: **kapasitas kecil** dan pengirim harus menyebutkan konteks data yang masuk akal.

> [!cornell] #### Summary
>
> **NoStega** (Desoky, 2012) menghindari degradasi cover dengan **menyamarkan pesan menjadi cover yang tampak natural** (grafik, email, game, catatan), sehingga tidak ada modifikasi yang dapat diserang steganalisis. **GraphStega** mengubah pesan menjadi **biner, kelompok 7 bit, nilai desimal**, lalu diplot sebagai grafik (mis. data kasus demam berdarah). Penerima membaca nilai grafik, mengambil **7 bit LSB** tiap nilai, menyambungkannya, dan memecahnya per 8 bit menjadi karakter ASCII.

> [!ad-libitum]- Additional Information
>
> #### Mengapa 7 Bit?
>
> ASCII standar memakai 7 bit sehingga tiap nilai grafik $< 128$ dan bisa diatur supaya tampak wajar sebagai data kuantitas. Karena panjang bit pesan tidak selalu kelipatan 7, kelompok terakhir dipotong (pada contoh `001` = 1). Penerima perlu tahu **panjang pesan** atau aturan padding (**stego-key** ada pada konvensi ini).
>
> #### Generative / Coverless Steganography
>
> NoStega termasuk **coverless steganography**: tidak ada cover yang diubah, melainkan cover **dibangkitkan atau dipilih** dari pesan. Varian lain: memilih foto dari kumpulan yang hash-nya cocok dengan bit pesan, atau **text generation** dengan model bahasa yang token-tokennya dipilih berdasarkan bit pesan.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Implementasikan GraphStega: fungsi `encode(pesan)` menghasilkan daftar angka dan plot `matplotlib`; `decode(angka)` mengembalikan pesan. Uji dengan pesan 100 karakter.
> 2. Rancang sendiri skema NoStega lain (mis. pesan dalam urutan langkah permainan catur atau isi tabel catatan) dan analisis kapasitasnya.
>
> #### Bacaan Lanjutan
>
> - Desoky, A. (2012), *Noiseless Steganography: The Key to Covert Communications*, CRC Press.
> - Zhou, Z. et al. (2015), *Coverless Image Steganography Without Embedding*.
> - Fridrich, J., *Steganography in Digital Media*.
