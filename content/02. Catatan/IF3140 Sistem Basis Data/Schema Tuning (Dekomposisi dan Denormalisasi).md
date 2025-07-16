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
> > - Apa itu dekomposisi dan apa saja jenisnya?
> >     
> > - Kapan kita menggunakan horizontal & vertical splitting?
> >     
> > - Apa itu denormalisasi dan apa tujuannya?
> >     
> > - Bagaimana cara mengelola data yang terdenormalisasi?
> >     
> 
> > ### Schema Tuning: Dekomposisi (Splitting Tables)
> > 
> > **Dekomposisi** atau **Splitting Tables** adalah teknik memecah satu tabel menjadi beberapa tabel terpisah untuk meningkatkan performa. Ada dua jenis utama:
> > 
> > - **Horizontal Splitting:** Memecah tabel berdasarkan baris (rows). Ini sangat berguna jika ada pemisahan data yang alami, seperti memisahkan data transaksi aktif dengan data arsip historis yang jarang diakses.
> >     
> > - **Vertical Splitting:** Memecah tabel berdasarkan kolom (columns). Ini efektif jika beberapa kolom sangat sering diakses sementara kolom lain (terutama yang berukuran besar) jarang diakses. Dengan memisahkannya, query yang hanya butuh kolom-kolom penting akan membaca lebih sedikit data page.
> >     
> >
> > ### Schema Tuning: Denormalisasi
> > 
> > **Denormalisasi** adalah proses yang secara sengaja "melanggar" atau "memundurkan" hasil normalisasi untuk tujuan performa. Tujuannya adalah untuk **meminimalkan kebutuhan operasi `JOIN`** yang mahal. Teknik ini digunakan ketika query yang paling sering dijalankan selalu membutuhkan data dari beberapa tabel yang digabungkan.
> > 
> > Beberapa cara denormalisasi:
> > 
> > - **Menambah Kolom Redundan:** Menyalin kolom dari satu tabel ke tabel lain untuk menghindari `JOIN`.
> >     
> > - **Menambah Kolom Turunan (Derived):** Menyimpan hasil agregat (seperti `SUM` atau `COUNT`) secara precomputed di dalam tabel.
> >     
> > - **Menggabungkan Tabel (Collapsing):** Menggabungkan dua tabel yang memiliki relasi 1-ke-1 menjadi satu tabel.
> >     
> >
> > ### Mengelola Integritas pada Denormalisasi
> > 
> > Denormalisasi mempercepat pembacaan data tetapi memperlambat dan memperumit modifikasi data. Karena data menjadi redundan, integritasnya harus dijaga. Beberapa cara untuk mengelolanya adalah:
> > 
> > - **Triggers:** Membuat trigger yang secara otomatis memperbarui data redundan setiap kali data asli berubah. Ini solusi terbaik dari sisi integritas, meski bisa membebani performa.
> >     
> > - **Logika Aplikasi:** Menyematkan logika update di dalam setiap transaksi aplikasi. Ini berisiko jika tidak semua developer mengikuti aturan yang sama.
> >     
> > - **Rekonsiliasi Batch:** Menjalankan proses batch secara berkala untuk menyinkronkan kembali data. Cocok jika konsistensi 100% tidak diperlukan setiap saat.
> >     

> [!cornell] #### Summary
> 
> **Schema Tuning** adalah tentang memodifikasi struktur tabel untuk performa. Ini bisa dilakukan melalui **dekomposisi**, yaitu memecah tabel secara **horizontal** (berdasarkan baris) atau **vertikal** (berdasarkan kolom) untuk mengurangi jumlah data yang diakses. Alternatif lainnya adalah **denormalisasi**, sebuah teknik yang sengaja menambah redundansi dengan tujuan utama **menghilangkan operasi `JOIN` yang mahal**. Namun, denormalisasi memerlukan mekanisme tambahan seperti **triggers** atau logika aplikasi untuk menjaga **integritas data**.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Trade-off Dekomposisi
> 
> Meskipun dekomposisi dapat meningkatkan performa untuk query tertentu, ia menambah kompleksitas pada aplikasi. Jika ada query yang ternyata membutuhkan data dari kedua tabel yang sudah dipisah (baik horizontal maupun vertikal), query tersebut sekarang harus menggunakan `UNION` atau `JOIN` untuk menggabungkan kembali data tersebut, yang bisa jadi lebih lambat dari kondisi semula. Oleh karena itu, keputusan untuk melakukan dekomposisi harus benar-benar didasarkan pada analisis workload yang dominan.
> 
> #### Denormalisasi vs. Materialized View
> 
> Menambah kolom turunan (derived column) adalah salah satu bentuk denormalisasi. Alternatif yang lebih modern dan seringkali lebih baik adalah menggunakan **Materialized View**. Keduanya sama-sama menyimpan hasil pre-computed. Bedanya, pada denormalisasi, programmer bertanggung jawab penuh untuk menjaga data turunan tetap sinkron. Pada Materialized View, tanggung jawab tersebut diambil alih oleh sistem DBMS, sehingga lebih aman dari kesalahan logika pemrograman dan lebih mudah dikelola.