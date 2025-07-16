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
> > - Apa langkah-langkah dalam memformulasikan query?
> >     
> > - Mengapa `SELECT *` harus dihindari?
> >     
> > - Apa yang perlu dipertimbangkan saat melakukan join?
> >     
> > - Mengapa `ORDER BY` perlu perhatian khusus?
> >     
> 
> > ### Langkah 1: Identifikasi Kolom dan Komputasi
> > 
> > Tentukan kolom apa saja yang benar-benar Anda butuhkan. **Hindari menggunakan `SELECT *`** jika Anda hanya memerlukan beberapa kolom, karena ini akan mentransfer data dalam jumlah yang lebih besar dari yang diperlukan. Tentukan juga apakah Anda memerlukan komputasi, fungsi, atau fungsi agregat, serta tentukan granularitas data yang dibutuhkan untuk output.
> >
> > ### Langkah 2: Identifikasi Tabel Sumber dan Join
> > 
> > Usahakan untuk menggunakan **jumlah tabel sesedikit mungkin** dalam query Anda untuk meminimalkan jumlah operasi join yang mahal. Setelah tabel sumber teridentifikasi, tentukan dengan jelas bagaimana tabel-tabel tersebut harus digabungkan, apakah menggunakan _natural join_, _outer join_, atau jenis join lainnya.
> >
> > ### Langkah 3: Tentukan Kriteria Seleksi
> > 
> > Rancang kondisi yang akan ditempatkan pada klausa `WHERE` atau `HAVING`. Kriteria ini bisa berupa perbandingan sederhana (`HARGA > 100`), perbandingan dengan banyak nilai (`KOTA IN ('Jakarta', 'Bandung')`), atau perbandingan bersarang yang melibatkan subquery.
> >
> > ### Langkah 4: Tentukan Urutan Output
> > 
> > Tentukan apakah output perlu diurutkan menggunakan klausa `ORDER BY`. Perlu diingat bahwa **`ORDER BY` adalah salah satu operasi yang paling boros sumber daya**, karena sering kali DBMS harus melakukan operasi _sorting_ yang mahal pada keseluruhan hasil sebelum menampilkannya.

> [!cornell] #### Summary
> 
> **Formulasi Query yang Efisien** melibatkan proses sistematis: **identifikasi kolom** yang dibutuhkan (hindari `SELECT *`), **minimalkan jumlah tabel** untuk mengurangi join, tentukan **kriteria seleksi** yang tepat, dan pertimbangkan dengan hati-hati penggunaan **`ORDER BY`** karena merupakan operasi yang sangat boros sumber daya. Mengikuti langkah-langkah ini membantu menciptakan query yang lebih cepat dan ringan.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### "Covering Index"
> 
> Salah satu alasan menghindari `SELECT *` adalah untuk memungkinkan penggunaan _Covering Index_. Sebuah _covering index_ adalah indeks non-clustering yang berisi semua kolom yang dibutuhkan oleh sebuah query (baik di klausa `SELECT`, `WHERE`, maupun `JOIN`). Jika sebuah indeks bisa "menutupi" semua kebutuhan query, DBMS dapat menjawab query tersebut hanya dengan membaca dari struktur indeks yang jauh lebih kecil, tanpa perlu menyentuh tabel data aslinya sama sekali. Ini adalah salah satu teknik optimasi yang paling kuat.
> 
> #### Subquery vs. JOIN
> 
> Meskipun subquery terkadang lebih mudah dibaca, `JOIN` hampir selalu lebih cepat. Optimizer modern sering kali bisa mengubah subquery menjadi `JOIN` secara internal (proses dekorrelasi), tetapi tidak selalu. Sebagai praktik terbaik, jika Anda bisa menulis sebuah query menggunakan `JOIN` daripada subquery, pilihlah `JOIN`. Contohnya, daripada menggunakan `WHERE id_pelanggan IN (SELECT id FROM pelanggan_prioritas)`, lebih baik gunakan `... FROM penjualan JOIN pelanggan_prioritas ON penjualan.id_pelanggan = pelanggan_prioritas.id`.