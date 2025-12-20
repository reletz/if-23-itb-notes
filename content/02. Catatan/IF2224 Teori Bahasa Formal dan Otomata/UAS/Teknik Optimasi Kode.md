---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF2224 Teori Bahasa Formal dan Otomata]]

> [!cornell] Topic: Teknik Optimasi Kode
> 
> > ## Questions/Cues
> >
> > - Tujuan Optimasi
> >     
> > - Folding
> >     
> > - Redundant Elimination
> >     
> > - Loop Unrolling
> >     
> > - Frequency Reduction
> >     
> > - Strength Reduction
> >     
> > - Optimasi Global
> >     
> 
> > ## Reference Points
> >
> > - Slide 16_2025: Hal 29 - 37
> >     
> >
> > ### 1. Klasifikasi Optimasi
> >
> > Optimasi bertujuan menghasilkan kode program yang lebih kecil ukurannya dan lebih cepat eksekusinya.
> >
> > - **Machine Dependent:** Bergantung pada arsitektur mesin tertentu.
> >     
> > - **Machine Independent:** Optimasi pada level logika (Lokal dan Global).
> >     
> >
> > ### 2. Optimasi Lokal
> >
> > Dilakukan pada blok kode sumber tertentu:
> >
> > - **Folding:** Mengganti ekspresi konstanta dengan nilai hasil komputasinya saat waktu kompilasi. Contoh: `A := 2 + 3 + B` menjadi `A := 5 + B`.
> >     
> > - **Redundant-Subexpression Elimination:** Menggunakan kembali hasil komputasi sebelumnya daripada menghitung ulang ekspresi yang sama.
> >     
> > - **Strength Reduction:** Mengganti operasi berat dengan operasi yang lebih ringan. Contoh: `A := A + 1` diganti dengan `INC(A)`.
> >     
> >
> > ### 3. Optimasi dalam Iterasi (Loop)
> >
> > - **Loop Unrolling:** Mengganti loop dengan menuliskan pernyataan di dalamnya beberapa kali secara berurutan. Ini mengurangi beban inisialisasi, pengecekan kondisi, dan penyesuaian variabel loop.
> >     
> > - **Frequency Reduction:** Memindahkan pernyataan yang nilainya tetap (tidak berubah dalam loop) ke luar loop agar dieksekusi lebih jarang.
> >     
> >
> > ### 4. Optimasi Global
> >
> > Menganalisis seluruh alur eksekusi program (biasanya menggunakan graph terarah).
> >
> > **Kegunaan bagi Programmer (Mendeteksi Kode Bermasalah):**
> >
> > - **Unreachable/Dead Code:** Kode yang tidak pernah dieksekusi (misal: instruksi di dalam blok `IF X=0` padahal `X` selalu `5`).
> >     
> > - **Unused Parameter:** Parameter prosedur yang tidak pernah digunakan.
> >     
> > - **Unused Variable:** Variabel yang dideklarasikan tetapi tidak pernah dipakai.
> >     
> > - **Uninitialized Variable:** Variabel yang digunakan dalam operasi sebelum diberi nilai awal.
> >     
> >
> > **Kegunaan bagi Kompiler:**
> >
> > - Meningkatkan efisiensi eksekusi.
> >     
> > - Menghilangkan kode yang tidak terpakai secara otomatis.
> >     

> [!cornell] #### Summary
> 
> **Teknik Optimasi** dibagi menjadi lokal dan global. **Optimasi Lokal** mencakup teknik seperti **Folding**, **Redundant-Subexpression Elimination**, dan **Strength Reduction**. Optimasi dalam perulangan melibatkan **Loop Unrolling** dan **Frequency Reduction**. Sementara itu, **Optimasi Global** berfungsi mendeteksi kode mati (_Dead Code_) serta parameter atau variabel yang tidak digunakan, demi menghasilkan program mesin yang ramping dan cepat.

> [!ad-libitum]- Additional Information
> 
> #### Mengapa Operasi Penjumlahan Lebih Baik?
> 
> Dalam _Strength Reduction_, kita sering mengganti perkalian dengan penjumlahan berulang karena pada arsitektur komputer tradisional, operasi perkalian membutuhkan lebih banyak siklus clock CPU dibandingkan operasi penjumlahan.
> 
> #### Dampak Loop Unrolling
> 
> Meskipun _Loop Unrolling_ mempercepat eksekusi (karena mengurangi jumlah instruksi kontrol loop), teknik ini dapat meningkatkan ukuran file eksekusi (binary size) karena kode yang sama ditulis berulang kali. Ini adalah bentuk _trade-off_ antara kecepatan dan memori.

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> <summary><strong>1. Berikan contoh teknik Folding dalam optimasi!</strong></summary>
> Jika terdapat pernyataan `X := 10 * 2 + Y`, kompiler akan mengubahnya menjadi `X := 20 + Y` pada saat kompilasi.
> 
> </details>
> <details>
> <summary><strong>2. Apa yang dimaksud dengan Dead Code?</strong></summary>
> Bagian dari kode program yang secara logika tidak akan pernah dieksekusi oleh komputer selama program berjalan.
> 
> </details>
> <details>
> <summary><strong>3. Apa tujuan dari Frequency Reduction pada perulangan?</strong></summary>
> Untuk memindahkan instruksi yang hasilnya konstan di dalam loop ke luar loop, sehingga instruksi tersebut hanya dieksekusi satu kali bukan berkali-kali sesuai jumlah iterasi.
> 
> </details>