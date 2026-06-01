---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF2224 Teori Bahasa Formal dan Otomata]]

> [!cornell] Topic: Penanganan Kesalahan (Error Handling)
> 
> > ## Questions/Cues
> >
> > - Jenis Kesalahan Program
> >     
> > - Kesalahan Semantik
> >     
> > - Langkah Penanganan
> >     
> > - Reaksi Tak Diterima
> >     
> > - Error Recovery
> >     
> > - Error Repair
> >     
> >
> > ## Reference Points
> >
> > - Slide 16_2025: Hal 13 - 28
> >     
> 
> > ### 1. Jenis-Jenis Kesalahan Program
> >
> > Kesalahan dapat terjadi pada berbagai tahapan analisis:
> >
> > - **Kesalahan Leksikal:** Kesalahan mengetik atau mengeja token (misal: `THEN` ditulis `TEN`).
> >     
> > - **Kesalahan Sintaks:** Kesalahan dalam struktur gramatikal (misal: tanda kurung yang tidak seimbang).
> >     
> > - **Kesalahan Semantik:** Kesalahan makna atau logika tipe data.
> >     
> >
> > **Contoh Kesalahan Semantik:**
> >
> > 1. **Tipe data salah:** Variabel integer diisi nilai pecahan.
> >     
> > 2. **Variabel belum didefinisikan:** Menggunakan variabel yang belum dideklarasikan sebelumnya.
> >     
> >
> > ### 2. Prosedur Penanganan Kesalahan
> >
> > 1. **Mendeteksi Kesalahan:** Menemukan keberadaan error dalam kode.
> >     
> > 2. **Melaporkan Kesalahan:** Menyediakan informasi berupa kode kesalahan, pesan kesalahan dalam bahasa alami, serta nama/atribut identifier yang bermasalah.
> >     
> > 3. **Tindak Lanjut Perbaikan:** Melakukan pemulihan atau perbaikan kode.
> >     
> >
> > ### 3. Reaksi Kompiler Terhadap Kesalahan
> >
> > **Reaksi yang Tidak Dapat Diterima:**
> >
> > - **Crash:** Kompiler berhenti tiba-tiba atau hang.
> >     
> > - **Looping:** Kompiler terjebak dalam perulangan tak terbatas.
> >     
> > - **Objek Salah:** Menghasilkan program mesin yang salah tanpa peringatan.
> >     
> >
> > **Reaksi yang Dapat Diterima:**
> >
> > - **Halt:** Melaporkan satu error lalu berhenti (kurang efisien bagi pemrogram).
> >     
> > - **Recovery & Repair:** Melanjutkan proses untuk menemukan error lainnya.
> >     
> >
> > ### 4. Strategi Error Recovery (Pemulihan)
> >
> > Bertujuan mengembalikan parser ke kondisi stabil agar bisa melanjutkan proses pencarian error berikutnya.
> >
> > - **Panic Mode:** Mengabaikan input sampai menemukan delimiter (seperti `;`).
> >     
> > - **Unit Deletion:** Menghapus keseluruhan unit sintaksik (seperti satu blok atau statement) yang salah.
> >     
> > - **Context Sensitive Recovery:** Membuat asumsi tipe data berdasarkan kemunculannya (misal variabel dianggap string karena diisi teks).
> >     
> >
> > ### 5. Strategi Error Repair (Perbaikan)
> >
> > Memodifikasi program sumber agar menjadi valid.
> >
> > - **Syntax Directed Repair:** Menyisipkan atau membuang simbol terminal (misal menyisipkan `DO` yang hilang pada `WHILE`).
> >     
> > - **Spelling Repair:** Memperbaiki kesalahan pengetikan pada kata kunci (misal `WHILLE` menjadi `WHILE`).
> >     

> [!cornell] #### Summary
> 
> **Penanganan Kesalahan** dalam kompiler mencakup deteksi, pelaporan, dan tindak lanjut terhadap kesalahan **Leksikal, Sintaks, dan Semantik**. Kompiler yang baik melakukan **Error Recovery** (menggunakan _Panic Mode_ atau _Unit Deletion_) untuk tetap stabil dan **Error Repair** untuk memperbaiki kesalahan kecil secara otomatis. Reaksi seperti _crash_ atau _looping_ adalah indikasi kegagalan sistem penanganan kesalahan pada kompiler.

> [!ad-libitum]- Additional Information
> 
> #### Pesan Kesalahan Efektif
> 
> Pesan kesalahan yang baik harus membantu pemrogram. Contoh: `error 162 Jumlah: Unknown identifier`. Pesan ini memberikan konteks yang jelas: apa masalahnya (unknown identifier) dan di mana masalahnya (pada identifier 'Jumlah').
> 
> #### Keterbatasan Koreksi Otomatis
> 
> Meskipun kompiler dapat melakukan _repair_ (seperti menyisipkan simbol yang hilang), kemampuan untuk "mengetahui maksud pemrogram" sepenuhnya masih terbatas. Kompiler tidak bisa menjamin bahwa perbaikan otomatis yang dilakukan selalu menghasilkan logika program yang benar sesuai keinginan pengguna.

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> <summary><strong>1. Apa perbedaan antara Error Recovery dan Error Repair?</strong></summary>
> Error Recovery bertujuan mengembalikan parser ke kondisi stabil agar bisa melanjutkan proses pencarian error lain, sedangkan Error Repair mencoba memperbaiki kesalahan tersebut agar program sumber menjadi valid.
> 
> </details>
> <details>
> <summary><strong>2. Berikan contoh kesalahan semantik!</strong></summary>
> Penggunaan variabel yang belum dideklarasikan atau pengisian nilai pecahan ke dalam variabel yang bertipe integer.
> 
> </details>