---


type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3140 Sistem Basis Data]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> > 
> > - Mengapa estimasi biaya penting?
> >     
> > - Informasi statistik apa yang disimpan?
> >     
> > - Apa itu V(A,r)?
> >     
> > - Kegunaan Histogram?
> >     
> > - Bagaimana mengestimasi hasil operasi SELECT?
> >     
> > - Apa itu Selektivitas?
> >     
> > - Bagaimana mengestimasi hasil operasi JOIN?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides: 7 - Query Optimization.pdf (Hal. 26, 38-48)
> >     
> 
> > ### Pentingnya Estimasi Biaya
> > 
> > Setelah menghasilkan berbagai rencana evaluasi yang ekuivalen secara logis, query optimizer harus memilih salah satu yang "terbaik" atau "termurah". Untuk melakukan ini, optimizer tidak benar-benar menjalankan setiap rencana, melainkan **mengestimasi** biayanya. Estimasi ini didasarkan pada **informasi statistik** mengenai data yang disimpan dalam basis data. Tanpa statistik yang akurat, optimizer tidak dapat membuat keputusan yang cerdas.
> > 
> > ### Informasi Statistik dalam Katalog
> > 
> > DBMS menyimpan metadata dan statistik tentang relasi (tabel) dan atributnya di dalam katalog sistem. Statistik ini sangat penting untuk estimasi biaya.
> > 
> > - nr​: Jumlah tupel (baris) dalam relasi `r`.
> >     
> > - br​: Jumlah blok disk yang digunakan oleh relasi `r`.
> >     
> > - lr​: Ukuran (dalam byte) dari satu tupel relasi `r`.
> >     
> > - fr​: Faktor blocking, yaitu jumlah tupel relasi `r` yang muat dalam satu blok disk. (br​≈⌈nr​/fr​⌉)
> >     
> > - **V(A, r)**: Jumlah **nilai unik (distinct values)** pada atribut `A` dari relasi `r`. Ini adalah statistik yang sangat penting untuk estimasi. Misalnya, jika V(Status, Mahasiswa) = 2, berarti kolom status hanya memiliki dua nilai unik (misalnya, 'Aktif' dan 'Cuti').
> >     
> > 
> > ### Histogram
> > 
> > Histogram adalah representasi statistik yang lebih detail mengenai distribusi nilai dalam sebuah atribut. Daripada hanya mengetahui jumlah nilai unik, histogram membagi rentang nilai menjadi beberapa "bucket" dan mencatat berapa banyak tupel yang jatuh ke dalam setiap bucket. Ini sangat berguna untuk mengestimasi hasil dari kueri rentang (misalnya, `WHERE gaji > 5000000 AND gaji < 7000000`).
> > 
> > ### Estimasi Ukuran Hasil Seleksi (σ)
> > 
> > Optimizer mengestimasi berapa banyak baris yang akan dikembalikan oleh klausa `WHERE`.
> > 
> > - **Kondisi Kesetaraan ($A = v$):** Jika `A` adalah _primary key_, hasilnya adalah 1. Jika tidak, estimasi umumnya adalah nr​/V(A,r). Logikanya, jika ada V(A,r) nilai unik, maka setiap nilai unik diasumsikan muncul nr​/V(A,r) kali.
> >     
> > - **Kondisi Rentang ($A \leq v$):** Jika statistik min dan max untuk atribut `A` diketahui, estimasinya adalah $nr​ \times max(A,r) - min(A,r)v - min(A,r)$​. Jika ada histogram, estimasinya bisa jauh lebih akurat.
> >     
> > - **Kondisi Kompleks (AND, OR, NOT):**
> >     
> >     - **AND (**∧**):** Menggunakan konsep **selektivitas** (probabilitas sebuah tupel memenuhi kondisi). Estimasi untuk σθ1​∧θ2​​(r) adalah nr​×(selektivitas1​×selektivitas2​). Asumsinya adalah kondisi-kondisi tersebut independen.
> >         
> >     - **OR (**∨**):** $nr​×(1−(1−selektivitas_1​)×(1−selektivitas_2​))$
> >         
> >     - **NOT (**¬**):** $nr​−estimasi(σθ​(r))$
> >         
> > 
> > ### Estimasi Ukuran Hasil Join (⋈)
> > 
> > Mengestimasi ukuran hasil join adalah salah satu tugas paling krusial dan sulit.
> > 
> > - **Kasus Terbaik (Foreign Key):** Jika atribut join di tabel S adalah _foreign key_ yang merujuk ke _primary key_ di tabel R, maka ukuran hasil join R $\bowtie$ S akan **persis sama** dengan ukuran tabel S (ns​). Setiap baris di S pasti cocok dengan satu baris di R.
> >     
> > - Kasus Umum: Jika tidak ada hubungan kunci, estimasinya lebih rumit. Salah satu pendekatan umum adalah dengan mempertimbangkan distribusi nilai. Estimasi ukuran r $\bowtie$ s pada atribut A adalah:
> >     
> >     $\text{min} \left( \frac{n_r \times n_s}{V(A, r)}, \frac{n_r \times n_s}{V(A, s)} \right)$
> >     
> >     Optimizer akan memilih estimasi yang lebih rendah (lebih pesimistis) dari dua kemungkinan tersebut.
> >     

> [!cornell] #### Summary
> Untuk memilih rencana kueri yang paling efisien, optimizer tidak menjalankan setiap rencana, melainkan mengestimasi biayanya menggunakan informasi statistik yang disimpan di katalog sistem. Statistik kunci seperti jumlah tupel (**nr​**), jumlah blok (**br​**), dan terutama jumlah nilai unik ($V(A,r)$) digunakan untuk memprediksi ukuran hasil operasi. Dengan menggunakan statistik ini—dan histogram untuk detail lebih lanjut—optimizer dapat mengestimasi hasil dari operasi seleksi (berdasarkan selektivitas) dan join (sering kali dengan memanfaatkan relasi primary-foreign key) untuk menghitung biaya keseluruhan dari sebuah rencana evaluasi.