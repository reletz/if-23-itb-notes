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
> > - Apa itu aturan ekuivalensi (equivalence rule)?
> >     
> > - Apa saja heuristik transformasi yang utama?
> >     
> > - Informasi statistik apa yang digunakan untuk estimasi?
> >     
> > - Bagaimana optimizer memperkirakan ukuran hasil?
> >     
> 
> > ### Transformasi Ekspresi dengan Aturan Ekuivalensi
> > 
> > **Aturan Ekuivalensi** menyatakan bahwa dua ekspresi aljabar relasional adalah ekuivalen jika keduanya menghasilkan set tuple yang sama. Optimizer menggunakan aturan-aturan ini untuk mengubah sebuah query menjadi berbagai bentuk ekuivalen guna menemukan rencana eksekusi yang paling murah. Terdapat banyak aturan, namun beberapa heuristik transformasi yang paling penting adalah:
> > 
> > - **Push Selection Down:** Melakukan operasi `SELECT` (σ) sedini mungkin. Ini akan mengurangi jumlah baris (kardinalitas) dari relasi sebelum di-join, sehingga operasi join menjadi lebih ringan.
> >     
> > - **Push Projection Down:** Melakukan operasi `PROJECT` (Π) sedini mungkin. Ini akan mengurangi jumlah kolom dari relasi perantara, menghemat ruang di memori dan I/O.
> >     
> > - **Join Reordering:** Mengubah urutan join. Karena join bersifat asosiatif, `(r1 ⋈ r2) ⋈ r3` ekuivalen dengan `r1 ⋈ (r2 ⋈ r3)`. Optimizer akan memilih urutan yang menghasilkan relasi perantara terkecil terlebih dahulu.
> >     
> >
> > ### Estimasi Biaya Berbasis Statistik
> > 
> > Untuk dapat memilih rencana termurah, optimizer harus bisa memperkirakan biaya setiap rencana. Ini dilakukan dengan menggunakan informasi statistik yang disimpan di dalam **katalog sistem (data dictionary)**.
> > 
> > ### Informasi Statistik yang Digunakan
> > 
> > - `nr`: Jumlah tuple (baris) dalam relasi r.
> >     
> > - `br`: Jumlah blok yang digunakan oleh relasi r.
> >     
> > - `V(A, r)`: Jumlah nilai unik (_distinct_) untuk atribut A dalam relasi r.
> >     
> > - **Histograms:** Representasi statistik yang lebih detail mengenai distribusi nilai dalam sebuah atribut.
> >     
> >
> > ### Estimasi Ukuran Hasil Operasi
> > 
> > Menggunakan statistik di atas, optimizer memperkirakan ukuran hasil (kardinalitas) dari sebuah operasi. Contoh:
> > 
> > - **Seleksi `σA=v(r)`:** Diperkirakan akan menghasilkan `nr / V(A,r)` tuple.
> >     
> > - **Join `r ⋈ s` pada atribut A:** Diperkirakan akan menghasilkan sekitar `(nr * ns) / max(V(A,r), V(A,s))` tuple.
> >     
> > 
> > Estimasi ini sangat penting untuk menghitung biaya keseluruhan dari sebuah rencana eksekusi.

> [!cornell] #### Summary
> 
> Dasar dari **Query Optimization** adalah kemampuan untuk mengubah sebuah query menjadi berbagai **ekspresi ekuivalen** menggunakan aturan transformasi, dengan heuristik utama berupa **"pushing" selection dan projection** serta **join reordering**. Untuk memilih ekspresi terbaik, optimizer melakukan **estimasi biaya** dengan mengandalkan **informasi statistik** dari katalog sistem (seperti jumlah tuple, blok, dan nilai unik) untuk memperkirakan ukuran hasil dari setiap operasi perantara.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Mengapa "Pushing Selection" Sangat Penting?
> 
> Bayangkan Anda harus menggabungkan dua buku telepon besar (dua tabel besar) untuk mencari semua orang bernama "Budi" yang tinggal di "Jakarta".
> 
> - **Tanpa Push Selection:** Anda menggabungkan _seluruh_ isi kedua buku telepon terlebih dahulu (menghasilkan data yang sangat masif), baru kemudian mencari "Budi" dari "Jakarta".
>     
> - **Dengan Push Selection:** Anda mencari "Budi" di buku pertama, dan mencari "Jakarta" di buku kedua _terlebih dahulu_. Anda hanya mendapatkan beberapa halaman dari masing-masing buku. Baru kemudian Anda menggabungkan hasil kecil tersebut. Proses kedua jelas jauh lebih cepat dan ringan.
>     
> 
> #### Pentingnya Statistik yang Up-to-Date
> 
> Kualitas dari rencana eksekusi yang dipilih optimizer sangat bergantung pada keakuratan statistiknya. Jika statistik sudah usang (misalnya, tabel yang tadinya kecil sekarang menjadi sangat besar), optimizer bisa membuat keputusan yang salah. Inilah sebabnya mengapa DBA (Database Administrator) perlu secara rutin menjalankan perintah seperti `ANALYZE` atau `UPDATE STATISTICS` untuk memastikan katalog sistem berisi informasi yang relevan.