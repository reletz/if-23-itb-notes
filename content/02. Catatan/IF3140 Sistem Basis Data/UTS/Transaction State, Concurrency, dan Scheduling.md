---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3140 Sistem Basis Data]]

> [!cornell]  State Transaksi, Eksekusi Konkuren, dan Jadwal (Schedules)
> 
> > ## Questions/Cues
> >
> > - Apa saja state (status) sebuah transaksi?
> >     
> > - Jelaskan alur transisi antar state.
> >     
> > - Apa keuntungan eksekusi konkuren?
> >     
> > - Apa itu "Schedule"?
> >     
> > - Apa saja aturan dalam sebuah schedule?
> >     
> > - Apa beda schedule serial dan konkuren?
> >     
> >
> > ## Reference Points
> >
> > - Slides 10-16
>   
> > ### Transaction State (Status Transaksi)
> >
> > Sebuah transaksi selama siklus hidupnya akan melewati beberapa state atau status. Diagram ini menggambarkan alur yang mungkin terjadi:
> >
> > 1. **Active:** Status awal saat transaksi mulai dieksekusi. Transaksi berada dalam state ini selama instruksi-instruksinya sedang berjalan.
> >     
> > 2. **Partially Committed:** Status setelah instruksi terakhir dalam transaksi selesai dieksekusi. Pada titik ini, transaksi telah menyelesaikan eksekusinya, tetapi perubahannya belum permanen karena masih bisa gagal (misalnya karena validasi akhir atau masalah sistem).
> >     
> > 3. **Committed:** Status setelah transaksi berhasil menyelesaikan semua operasinya dan perubahannya telah dicatat secara permanen di basis data (memenuhi properti _Durability_).
> >     
> > 4. **Failed:** Status jika transaksi mengalami kendala atau error yang membuatnya tidak dapat melanjutkan eksekusi secara normal.
> >     
> > 5. **Aborted:** Status setelah transaksi dibatalkan dan semua perubahannya ditarik kembali (_rolled back_). Basis data dikembalikan ke kondisi sebelum transaksi dimulai (memenuhi properti _Atomicity_).
> >     
> >
> > ### Concurrent Executions (Eksekusi Konkuren)
> >
> > Menjalankan beberapa transaksi secara bersamaan (konkuren) adalah praktik standar dalam sistem basis data modern. Hal ini dilakukan karena memberikan beberapa keuntungan signifikan:
> >
> > - **Peningkatan Throughput:** Dengan menjalankan transaksi secara bersamaan, utilitas prosesor (CPU) dan disk (I/O) menjadi lebih maksimal. Ini memungkinkan lebih banyak transaksi yang dapat diselesaikan dalam satu satuan waktu.
> >     
> > - **Penurunan Waktu Respons Rata-rata:** Transaksi singkat tidak perlu menunggu transaksi panjang yang masuk lebih dulu untuk selesai. Dengan eksekusi konkuren, transaksi bisa "saling-silang", sehingga waktu tunggu terasa lebih singkat bagi pengguna.
> >     
> >
> > Untuk mengelola eksekusi konkuren dan tetap menjaga properti Isolasi, sistem basis data menggunakan mekanisme yang disebut **skema kontrol konkurensi** (_concurrency control schemes_).
> >
> > ### Schedules (Jadwal)
> >
> > **Schedule** adalah urutan instruksi yang menentukan kronologi eksekusi dari beberapa transaksi yang berjalan secara konkuren. Sebuah schedule harus memenuhi dua aturan utama:
> >
> > 1. Mencakup **semua instruksi** dari setiap transaksi yang terlibat.
> >     
> > 2. Menjaga **urutan internal instruksi** dalam setiap transaksi. Misalnya, jika dalam Transaksi T1, instruksi `read(A)` datang sebelum `write(A)`, maka dalam schedule pun urutannya harus tetap sama.
> >     
> >
> > #### Schedule Serial
> >
> > Ini adalah bentuk schedule yang paling sederhana, di mana transaksi-transaksi dieksekusi secara berurutan, satu per satu. Transaksi T2 baru dimulai setelah T1 selesai sepenuhnya.
> >
> > **Contoh (Schedule 1 dari slide):** T1 menyelesaikan semua 6 langkahnya, baru kemudian T2 memulai.
> >
> > ```sql
> > T1: read(A), A:=A-50, write(A), read(B), B:=B+50, write(B), commit
> > T2:                                                            read(A), temp:=A*0.1, ...
> > ```
> >
> > Schedule serial **selalu menjamin konsistensi basis data**, tetapi performanya tidak optimal.
> >
> > #### Schedule Konkuren (Non-Serial)
> >
> > Dalam schedule ini, instruksi dari beberapa transaksi dijalankan secara berselang-seling.
> >
> > **Contoh (Schedule 3 dari slide):**
> >
> > ```sql
> > T1: read(A), A:=A-50, write(A)
> > T2:                         read(A), temp:=A*0.1, A:=A-temp, write(A)
> > T1:                                                                read(B), B:=B+50, ...
> > ```
> >
> > Schedule konkuren dapat meningkatkan performa, tetapi **berisiko menghasilkan hasil yang salah** jika tidak diatur dengan baik, seperti yang terlihat pada **Schedule 4** di slide, di mana nilai akhir `A+B` menjadi tidak konsisten. Tantangan utamanya adalah membuat schedule konkuren yang "aman" atau setara dengan schedule serial.

> [!cornell] #### Summary
> 
> **Sebuah transaksi bergerak melalui beberapa status, mulai dari** _**active**_ **hingga berakhir pada** _**committed**_ **(sukses) atau** _**aborted**_ **(gagal). Untuk meningkatkan efisiensi, sistem basis data menjalankan transaksi secara konkuren, yang diatur oleh sebuah** _**schedule**_ **atau jadwal. Schedule ini adalah urutan instruksi dari semua transaksi, di mana schedule** _**serial**_ **menjalankan transaksi satu per satu dan selalu aman, sementara schedule** _**konkuren**_ **menjalankan instruksi secara berselang-seling untuk performa yang lebih baik, namun memerlukan kontrol yang cermat untuk menjaga konsistensi data.**

> [!ad-libitum]- Additional Information
> 
> #### Analogi: Chef di Dapur
> 
> - **Eksekusi Serial:** Bayangkan seorang chef yang memasak satu pesanan dari awal hingga akhir (memotong sayur, memasak, menyajikan) sebelum memulai pesanan berikutnya. Ini aman, tidak akan ada bahan yang tertukar, tetapi lambat.
>     
> - **Eksekusi Konkuren:** Bayangkan seorang chef yang efisien. Sambil menunggu air mendidih untuk pesanan A, ia mulai memotong sayuran untuk pesanan B. Ini jauh lebih cepat (_throughput_ tinggi). **Schedule** adalah resep kerja sang chef yang mengatur kapan ia harus mengerjakan tugas untuk pesanan A dan kapan untuk pesanan B. Jika _schedule_-nya buruk (misalnya, ia memasukkan bumbu pesanan A ke masakan B), hasilnya akan kacau. Skema kontrol konkurensi adalah aturan ketat yang diikuti chef agar hal itu tidak terjadi.
>     
> 
> #### Tantangan Schedule Konkuren
> 
> Mengapa Schedule 4 pada slide salah? Karena T2 membaca nilai A **sebelum** T1 selesai melakukan transfer sepenuhnya (baru mengurangi A, tapi belum menambah B). Akibatnya, T2 menghitung potongan 10% dari nilai A yang salah, dan T1 kemudian menimpa perubahan A dari T2. Ini adalah contoh dari masalah konkurensi yang disebut **Lost Update** dan **Dirty Read** (membaca data yang belum di-commit, meskipun dalam contoh ini `write(A)` langsung terjadi). Konsep "serializability" yang akan dibahas selanjutnya adalah cara untuk menentukan apakah sebuah schedule konkuren itu "benar" atau "salah".
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Buku:** "Database System Concepts" oleh Silberschatz, Korth, and Sudarshan. Bab 17.2 hingga 17.4 membahas state, konkurensi, dan serializability secara detail.
>