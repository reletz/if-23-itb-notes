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
> > - Kapan sorting diperlukan?
> >     
> > - Apa saja metode sorting untuk data besar?
> >     
> > - Apa itu External Sort-Merge?
> >     
> > - Tahap 1: Create Sorted Runs?
> >     
> > - Tahap 2: Merge the Runs?
> >     
> > - Bagaimana jika jumlah _run_ lebih besar dari memori (N ≥ M)?
> >     
> > - Analisis Biaya: Block Transfers?
> >     
> > - Analisis Biaya: Seeks?
> >     
> >
> > ## Reference Points
> > 
> > - Slides 19-25
> >     
> 
> > ### Kebutuhan dan Metode Sorting
> > 
> > Sorting (pengurutan) adalah operasi fundamental yang sering dibutuhkan dalam database, misalnya untuk klausa `ORDER BY`, beberapa implementasi `JOIN`, `GROUP BY`, dan eliminasi duplikat.
> > 
> > #### Metode Implementasi
> > 
> > 1. **Menggunakan Indeks:** Jika ada indeks pada atribut yang ingin diurutkan, sistem dapat membaca pointer dari _leaf node_ indeks secara berurutan untuk mengambil data. Namun, metode ini bisa menjadi sangat mahal karena setiap tuple bisa berada di blok disk yang berbeda, menyebabkan satu I/O per tuple.
> >     
> > 2. **In-Memory Sorting:** Jika seluruh relasi muat di dalam memori, algoritma sorting standar seperti Quicksort dapat digunakan dengan sangat efisien.
> >     
> > 3. **External Sort-Merge:** Ini adalah algoritma pilihan ketika data relasi terlalu besar untuk muat di dalam memori.
> >     
> > 
> > ### External Sort-Merge
> > 
> > Algoritma ini bekerja dalam dua fase utama untuk mengurutkan data yang lebih besar dari RAM. Anggap **M** adalah ukuran memori yang tersedia (dalam jumlah blok/halaman).
> > 
> > #### Fase 1: Membuat Run Terurut (Create Sorted Runs)
> > 
> > 4. Baca **M** blok dari relasi ke dalam memori.
> >     
> > 5. Urutkan **M** blok tersebut di dalam memori (misalnya, menggunakan Quicksort).
> >     
> > 6. Tulis kembali hasil yang sudah terurut ke disk sebagai satu file sementara yang disebut **"run"**.
> >     
> > 7. Ulangi langkah 1-3 sampai semua blok dari relasi telah diproses, menghasilkan sejumlah **N** _runs_ yang masing-masing sudah terurut secara internal.
> >     
> > 
> > #### Fase 2: Menggabungkan Run (Merge the Runs)
> > 
> > Setelah semua _run_ terbentuk, fase ini menggabungkannya menjadi satu output akhir yang terurut.
> > 
> > - **N-Way Merge:** Jika jumlah _run_ (N) lebih kecil dari memori (M), penggabungan dapat dilakukan dalam satu kali jalan.
> >     
> >     - Alokasikan 1 blok memori sebagai _buffer input_ untuk setiap _run_ (total N blok).
> >         
> >     - Alokasikan 1 blok memori sebagai _buffer output_.
> >         
> >     - Secara berulang, ambil record terkecil dari semua _buffer input_, pindahkan ke _buffer output_.
> >         
> >     - Jika _buffer output_ penuh, tulis ke disk. Jika _buffer input_ kosong, isi kembali dari _run_ yang bersangkutan di disk.
> >
> > ![[Pasted image 20250919135548.png]]
> > 
> > #### Penanganan Jika N ≥ M
> > 
> > Jika jumlah _run_ lebih banyak dari blok memori yang tersedia, proses merge tidak bisa dilakukan sekali jalan. Diperlukan **beberapa kali pass penggabungan (merge passes)**.
> > 
> > - Pada setiap _pass_, gabungkan sekelompok **(M-1)** _runs_ menjadi satu _run_ baru yang lebih panjang.
> >     
> > - Proses ini akan mengurangi jumlah _run_ dengan faktor (M-1) pada setiap _pass_.
> >     
> > - Ulangi proses ini sampai semua _run_ berhasil digabung menjadi satu.
> >     
> > 
> > ### Analisis Biaya External Sort-Merge
> > 
> > Analisis biaya berfokus pada dua komponen utama: jumlah transfer blok dan jumlah _seeks_.
> > 
> > #### Biaya Transfer Blok
> > 
> > Setiap pass (baik itu pass pembuatan _run_ awal maupun pass penggabungan) akan membaca seluruh `$b_r$` blok dan menuliskan kembali seluruh `$b_r$` blok.
> > 
> > - Total transfer blok untuk keseluruhan proses (dengan asumsi output akhir tidak dihitung biaya tulisnya) dirumuskan sebagai:
> >     
> >     $b_r * (2 * \lceil log_{\lfloor M/b_b\rfloor-1}(b_r / M) \rceil + 1)$
> >     
> >     - `$b_r$`: Jumlah blok relasi.
> >         
> >     - `M`: Ukuran memori dalam blok.
> >         
> >     - `$b_b$`: Jumlah blok buffer yang dialokasikan per _run_ saat merging.
> >         
> >     - `$\lceil log_{...} \rceil$`: Menghitung jumlah _merge pass_ yang dibutuhkan.
> >         
> > 
> > #### Biaya Seeks
> > 
> > _Seek_ terjadi setiap kali sistem perlu membaca atau menulis sekumpulan blok baru yang tidak berdekatan.
> > 
> > - **Saat pembuatan run:** Membutuhkan `$2 * \lceil b_r / M \rceil$` seeks (satu untuk membaca, satu untuk menulis setiap potongan berukuran M).
> >     
> > - **Saat merging:** Jumlah _seeks_ tergantung pada berapa banyak blok yang dibaca/ditulis sekaligus (`$b_b$`).
> >     
> > - Total seeks dirumuskan sebagai:
> >     
> >     $2 \lceil b_r / M \rceil + \lceil b_r / b_b \rceil * (2 \lceil log_{\lfloor M/b_b\rfloor-1}(b_r / M) \rceil - 1)$
> >     

> [!cornell] #### Summary
> 
> **External Sort-Merge adalah algoritma standar untuk mengurutkan relasi yang ukurannya melebihi memori utama, yang bekerja dalam dua fase: membuat sejumlah** _**run**_ **terurut dan kemudian menggabungkan** _**run-run**_ **tersebut.** Jika jumlah _run_ melebihi kapasitas memori, penggabungan dilakukan dalam beberapa _pass_. Biaya totalnya, yang diukur dalam transfer blok dan _seeks_, sangat bergantung pada ukuran memori (M) karena ini menentukan berapa banyak _pass_ penggabungan yang diperlukan untuk menyelesaikan seluruh proses.

> [!ad-libitum]- Additional Information
> 
> #### Peran `$b_b$`: Buffer Blocks per Run
> 
> Variabel `$b_b$` (jumlah blok buffer per _run_ saat _merge_) adalah parameter penting untuk optimasi.
> 
> - Jika `$b_b = 1$`, maka setiap kali buffer input habis, sistem harus melakukan _seek_ baru untuk membaca satu blok berikutnya. Ini menghasilkan banyak sekali _seeks_.
>     
> - Dengan menaikkan nilai `$b_b$` (misalnya menjadi 10), sistem dapat membaca 10 blok sekaligus dalam satu operasi I/O, sehingga jumlah _seek_ total pada fase _merge_ berkurang drastis, meskipun ini mengurangi jumlah _run_ yang bisa digabung dalam satu _pass_ (`$\lfloor M/b_b\rfloor-1$`). Query optimizer akan mencoba mencari nilai `$b_b$` yang optimal.
>     
> 
> #### Contoh Perhitungan Biaya Sederhana
> 
> - Relasi `r` memiliki `$b_r = 1000$` blok.
>     
> - Memori `M = 101` blok.
>     
> - Kita alokasikan `$b_b = 1$` blok per buffer.
>     
> 
> 1. **Pembuatan Run:**
>     
>     - Jumlah run yang dibuat: `$\lceil 1000 / 101 \rceil = 10$` runs.
>         
>     - Biaya: Baca 1000 blok + Tulis 1000 blok = 2000 transfer blok.
>         
> 2. **Penggabungan Run:**
>     
>     - Jumlah run (10) < Ukuran memori (101), jadi cukup 1 _merge pass_.
>         
>     - Kita bisa menggabungkan hingga `M-1 = 100` runs sekaligus.
>         
>     - Biaya: Baca 1000 blok (dari 10 runs) + Tulis 1000 blok (output akhir).
>         
> 3. **Total Biaya (dengan biaya tulis akhir):**
>     
>     - 2000 (fase 1) + 2000 (fase 2) = 4000 transfer blok.
>         
> 
> Jika menggunakan rumus dari slide (tanpa biaya tulis akhir):
> 
> - Jumlah _merge pass_: `$\lceil log_{100}(1000/101) \rceil = \lceil log_{100}(9.9) \rceil = 1$`.
>     
> - Total transfer: `$1000 * (2*1 + 1) = 3000$` blok. (Baca+Tulis di fase 1, dan Baca di fase 2).
>     
> 
> #### Eksplorasi Mandiri
> 
> - Perhatikan bahwa jika memori `M` sangat besar, mendekati `$b_r$`, maka `$\lceil b_r/M \rceil$` akan menjadi 1. Artinya, hanya ada satu _run_ yang dibuat, dan tidak ada fase _merge_ yang diperlukan. Algoritma ini secara alami beradaptasi menjadi _in-memory sort_.
>     
> - Sebaliknya, jika memori `M` sangat kecil (misal `M=2`), maka akan dibuat `$b_r/2$` _runs_ dan jumlah _merge pass_ akan sangat banyak, membuat biayanya melambung tinggi.
>