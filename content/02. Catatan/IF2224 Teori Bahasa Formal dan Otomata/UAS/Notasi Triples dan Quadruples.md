---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF2224 Teori Bahasa Formal dan Otomata]]

> [!cornell] Topic: Notasi Triples dan Quadruples
> 
> > ## Questions/Cues
> >
> > - Format Triples
> >     
> > - Presedensi Operator
> >     
> > - Indirect Triples
> >     
> > - Format Quadruples
> >     
> > - Keuntungan Quadruples
> >     
> > - Peran Code Generator
> >     
> > ## Reference Points
> >
> > - Slide 16_2025: Hal 6 - 12
> >     
> 
> > ### 1. Notasi Triples
> >
> > Notasi Triples menggunakan format tiga elemen: `<operator> <operand> <operand>`.
> >
> > **Aturan Operasional:**
> >
> > - Operand dapat berupa konstanta, variabel, atau nomor urut instruksi sebelumnya (ditulis dalam kurung, misal `(1)`).
> >     
> > - Presedensi operator (perkalian/pembagian sebelum penjumlahan/pengurangan) harus diperhatikan saat menyusun urutan instruksi.
> >     
> >
> > **Contoh:** $A := D * C + B / E$  
> >
> > 1. `*, D, C`
> >     
> > 2. `/, B, E`
> >     
> > 3. `+, (1), (2)`
> >     
> > 4. `:=, A, (3)`
> >     
> >
> > ### 2. Indirect Triples
> >
> > Digunakan untuk mengatasi kesulitan optimasi pada notasi Triples standar. Sistem ini memiliki dua daftar:
> >
> > 1. **Daftar Instruksi:** Berisi notasi triples asli.
> >     
> > 2. **Daftar Eksekusi:** Mengatur urutan eksekusi instruksi tersebut.
> >     
> >
> > ### 3. Notasi Quadruples
> >
> > Notasi Quadruples menggunakan format empat elemen: `<operator> <operand> <operand> <result>`.
> >
> > **Karakteristik:**
> >
> > - `result` adalah variabel sementara (_temporary variable_) seperti `T1`, `T2`, dst.
> >     
> > - Variabel sementara ini nantinya ditempatkan pada memori atau register mesin.
> >     
> >
> > **Contoh:** $A := D * C + B / E$  
> >
> > 1. `*, D, C, T1`
> >     
> > 2. `/, B, E, T2`
> >     
> > 3. `+, T1, T2, A`
> >     
> >
> > ### 4. Pembangkit Kode (Code Generator)
> >
> > Bertugas mentransformasikan kode antara ke dalam bahasa assembly atau bahasa mesin.
> >
> > Contoh Translasi (Single Accumulator):
> > 
> > Operasi +, A, B, T1 ditranslasikan menjadi:
> >
> > 1. `LDA A` (Isi A ke accumulator).
> >     
> > 2. `ADD B` (Tambahkan accumulator dengan B).
> >     
> > 3. `STO T1` (Simpan isi accumulator ke T1).
> >     
> >
> > ### 5. Alur Instruksi Lengkap
> >
> > 1. **Program Sumber:** Analisis Leksikal menghasilkan token.
> >     
> > 2. **Sintaks & Semantik:** Menghasilkan pohon sintaks atau kode antara.
> >     
> > 3. **Pembangkit Kode:** Mengubah kode antara menjadi assembly.
> >     
> > 4. **Optimasi Kode:** Memperbaiki assembly agar lebih efisien (misal menghapus penyimpanan yang tidak perlu).
> >     

> [!cornell] #### Summary
> 
> **Triples** dan **Quadruples** adalah metode N-Tuple untuk merepresentasikan kode antara. **Triples** mereferensikan hasil operasi melalui nomor instruksi, sementara **Quadruples** menggunakan variabel sementara (**Result**). **Indirect Triples** memisahkan definisi instruksi dari urutan eksekusinya. **Code Generator** kemudian mengubah representasi ini menjadi instruksi assembly konkret yang siap dioptimasikan lebih lanjut.

> [!ad-libitum]- Additional Information
> 
> #### Manajemen Variabel Sementara
> 
> Masalah utama dalam notasi Quadruples adalah bagaimana mengelola jumlah variabel sementara agar seminimal mungkin. Penggunaan variabel sementara yang berlebihan dapat meningkatkan penggunaan memori atau register secara tidak efisien pada tahap akhir pembangkitan kode.
> 
> #### Hirarki Operator (Presedensi)
> 
> Kompiler harus mengenali bahwa operator dengan prioritas tinggi harus dieksekusi terlebih dahulu. Dalam implementasi Triples, ini berarti operasi perkalian harus muncul pada baris instruksi dengan nomor urut yang lebih kecil sebelum operasi penjumlahan yang bergantung padanya.

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> <summary><strong>1. Apa perbedaan utama antara notasi Triples dan Quadruples?</strong></summary>
> Triples mereferensikan hasil operasi berdasarkan nomor urut baris instruksi, sedangkan Quadruples menggunakan variabel sementara (T1, T2, dst.) untuk menyimpan hasil.
> 
> </details>
> <details>
> <summary><strong>2. Mengapa Indirect Triples dikembangkan?</strong></summary>
> Dikembangkan untuk memudahkan proses optimasi kode, karena memungkinkan perubahan urutan eksekusi tanpa harus mengubah daftar instruksi utama.
> 
> </details>