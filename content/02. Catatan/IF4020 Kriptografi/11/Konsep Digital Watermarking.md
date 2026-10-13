---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4020 Kriptografi]]

> [!cornell] Konsep Digital Watermarking
>
> > ## Questions/Cues
> >
> > - Masalah apa pada citra digital yang membutuhkan watermarking?
> > - Apa itu image watermarking dan mengapa label copyright konvensional tidak cukup?
> > - Bagaimana sejarah dan klasifikasi watermarking?
> > - Apa beda steganografi dan watermarking?
> > - Apa beda visible dan invisible watermarking, serta fragile dan robust?
> >
> > ## Reference Points
> >
> > - IF4020 Kriptografi — Digital Watermarking (Slides 2-26)
>
> > ### Masalah: Citra Digital Tak Terlindungi
> >
> > Jutaan citra beredar di internet (email, web, bluetooth). Siapa pun dapat mengunduh, menyalin, menyunting, dan menyebarkannya sehingga memungkinkan **pelanggaran HAKI**: mengklaim citra orang lain (**kepemilikan**), menyebarkan tanpa izin (**copyright**), dan mengubah konten sehingga keasliannya hilang. Slide memberi tiga kasus:
> >
> > 1. **Kepemilikan**: Alice dan Bob sama-sama mengklaim gambar yang sama; hakim harus memutuskan pemilik sebenarnya.
> > 2. **Penggandaan**: Bob menggandakan dan menyebarkan foto UFO milik Alice tanpa izin.
> > 3. **Keaslian**: Bob mengubah foto Alice dengan Photoshop; mana yang asli?
> >
> > Penyebabnya adalah sifat citra digital yang sekaligus kelebihan dan kelemahan: **tepat sama bila digandakan, mudah didistribusikan, mudah diedit**. Solusinya: **image watermarking**.
> >
> > ### Definisi
> >
> > **Image watermarking** adalah teknik menyisipkan informasi yang mengacu pada **pemilik** gambar (**watermark**) untuk melindungi **kepemilikan, copyright**, atau menjaga **keaslian** konten. Watermark dapat berupa teks, logo, audio, data biner ($+1/-1$), atau barisan bilangan riil. Persyaratan: penyisipan **tidak merusak kualitas** citra; watermark **melekat** di dalam citra dan dapat **dideteksi/diekstraksi** kembali sebagai bukti kepemilikan atau modifikasi.
> >
> > **Cara konvensional** menempelkan label copyright di atas gambar tidak efektif: label bisa **dipotong (crop) atau dibuang** dengan program pengolah citra. Dengan watermarking: (1) kualitas tidak rusak, (2) setiap salinan **membawa watermark**, (3) watermark **tidak bisa dihapus atau dibuang** begitu saja, dan (4) dapat diekstraksi sebagai bukti.
> >
> > ### Sejarah
> >
> > Pada **abad 13**, pabrik kertas di **Fabriano, Italia**, membuat kertas ber-watermark dengan menekan cetakan pada kertas setengah jadi; setelah kering terbentuk **tanda-air** yang menjadi identifikasi keaslian karya seni (seniman/sastrawan). Bangsa **Cina** melakukan hal serupa.
> >
> > ### Klasifikasi
> >
> > | Jenis | Keterangan |
> > |---|---|
> > | **Paper watermarking** | impresi gambar/logo/teks pada kertas; *cannot be photocopied or scanned effectively*; tujuan otentikasi; dipakai pada uang, paspor, banknote |
> > | **Digital watermarking** | menyisipkan sinyal digital ke dokumen digital: citra, audio, video, teks |
> >
> > Berdasarkan media: **image**, **video**, **audio**, **text**, dan **software watermarking**.
> >
> > ### Steganografi vs Watermarking
> >
> > | | Steganografi | Watermarking |
> > |---|---|---|
> > | Tujuan | mengirim **pesan rahasia** tanpa kecurigaan | **perlindungan copyright**, bukti kepemilikan, keaslian |
> > | Persyaratan | aman, **sulit dideteksi**, **kapasitas besar** | **sulit dihapus** (remove) |
> > | Komunikasi | **point-to-point** | **one-to-many** |
> > | Media | tak bermakna (hanya penampung) | **media itulah yang dilindungi**; kapasitas watermark tidak penting |
> >
> > ### Klasifikasi Image Watermarking
> >
> > ```mermaid
> > flowchart TD
> >     W["Image Watermarking"] --> V["Visible<br/>(terlihat, logo)"]
> >     W --> I["Invisible<br/>(tak terlihat)"]
> >     I --> F["Fragile<br/>tujuan: integritas/keaslian<br/>rusak bila dimanipulasi"]
> >     I --> R["Robust<br/>tujuan: copyright/kepemilikan<br/>tahan manipulasi"]
> > ```

> [!cornell] #### Summary
>
> Citra digital mudah digandakan, disebar, dan diedit sehingga rentan pelanggaran **kepemilikan, copyright, dan keaslian**. **Image watermarking** menyisipkan **watermark** (teks, logo, audio, biner, bilangan riil) ke dalam citra tanpa merusak kualitas, sehingga **melekat pada setiap salinan**, sulit dihapus, dan dapat diekstraksi sebagai bukti, tidak seperti label copyright yang bisa dipotong. Akar sejarahnya adalah **tanda-air kertas abad 13 (Fabriano)**. Dibedakan **paper** dan **digital** watermarking; **steganografi** menekankan kapasitas dan ketidakterdeteksian (point-to-point), **watermarking** menekankan **ketahanan terhadap penghapusan** (one-to-many). Citra ber-watermark dibagi **visible/invisible**, dan invisible dibagi **fragile** (integritas) dan **robust** (copyright).

> [!ad-libitum]- Additional Information
>
> #### Properti yang Saling Bertentangan
>
> Watermarking digital selalu menyeimbangkan **imperceptibility** (kualitas), **robustness**, dan **capacity**; menaikkan satu menurunkan yang lain. Watermark yang lebih kuat ($\alpha$ besar) lebih tahan serangan tetapi lebih terlihat. Skema juga dibedakan **blind** (deteksi tanpa citra asli), **semi-blind**, dan **non-blind**.
>
> #### Hukum dan Praktik
>
> Watermark dipakai sebagai alat bukti HAKI, tetapi **ketahanannya diuji dengan serangan** (kompresi, crop, rotasi, noise, **collusion**). Serangan **ambiguity/IBM attack** (Craver 1998) memungkinkan pihak lawan membuat watermark palsu yang juga "terdeteksi" di citra asli, sehingga skema perlu dirancang **non-invertible** (mis. watermark diturunkan dari hash citra).
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Tempel watermark visible (logo semi transparan) dengan PIL, lalu coba hilangkan dengan crop dan inpainting; bandingkan dengan watermark invisible di [[Fragile dan Robust Watermarking]].
> 2. Cari contoh watermark kertas pada uang rupiah dan daftar fitur keamanannya.
>
> #### Bacaan Lanjutan
>
> - Cox, Miller, Bloom, Fridrich, Kalker, *Digital Watermarking and Steganography*, 2nd ed.
> - Katzenbeisser & Petitcolas (2000), *Information Hiding Techniques for Steganography and Digital Watermarking*.
> - Craver et al. (1998), *Resolving Rightful Ownerships with Invisible Watermarking Techniques*.
