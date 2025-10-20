---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3140 Sistem Basis Data]]

> [!cornell] Recoverability & Level Isolasi SQL Praktis
> 
> > ## Questions/Cues
> > 
> > - Apa itu _Recoverable Schedule_?
> >     
> > - Mengapa recoverability penting?
> >     
> > - Apa itu _Cascading Rollback_?
> >     
> > - Bagaimana _Cascadeless Schedule_ mencegahnya?
> >     
> > - Apa tujuan utama _Concurrency Control_?
> >     
> > - Sebutkan 4 level isolasi di SQL.
> >     
> > - Apa itu _Dirty Read_?
> >     
> > - Apa itu _Non-Repeatable Read_?
> >     
> > - Apa itu _Phantom Read_?
> >     
> > - Bagaimana transaksi diakhiri di SQL?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides 30-38
> >     
>
> > ### Recoverable Schedules (Jadwal yang Dapat Dipulihkan)
> > 
> > Sebuah schedule disebut **recoverable** jika memenuhi aturan berikut: untuk setiap pasangan transaksi Ti​ dan Tj​, jika Tj​ membaca data yang sebelumnya ditulis oleh Ti​, maka operasi `commit` dari Ti​ harus muncul **sebelum** operasi `commit` dari Tj​.
> > 
> > **Tujuan:** Untuk memastikan tidak terjadi situasi di mana sebuah transaksi (Tj​) melakukan `commit` berdasarkan data dari transaksi lain (Ti​) yang ternyata kemudian gagal (_abort_). Jika ini terjadi, Tj​ akan menjadi "yatim piatu" karena perubahannya didasarkan pada data yang tidak pernah benar-benar ada, menyebabkan inkonsistensi.
> > 
> > ### Cascadeless Schedules (Jadwal Tanpa Runtutan)
> > 
> > Masalah pada _recoverable schedule_ adalah potensi **cascading rollback** (pembatalan beruntun). Jika Ti​ gagal, maka Tj​ yang membaca datanya juga harus dibatalkan. Jika ada Tk​ yang membaca data dari Tj​, ia juga harus dibatalkan, dan begitu seterusnya seperti efek domino.
> > 
> > Untuk menghindarinya, digunakan **cascadeless schedule**. Aturannya lebih ketat: jika Tj​ membaca data yang ditulis oleh Ti​, maka `commit` dari Ti​ harus muncul **sebelum** operasi `read` dari Tj​.
> > 
> > Dengan kata lain, sebuah transaksi **hanya boleh membaca data yang sudah di-commit**. Ini secara efektif mencegah _cascading rollback_ dan merupakan properti yang sangat diinginkan.
> > 
> > ### Weak Levels of Consistency in SQL (Level Konsistensi Lemah)
> > 
> > Meskipun _serializability_ adalah jaminan konsistensi tertinggi, mencapainya bisa membatasi performa. Oleh karena itu, standar SQL-92 mendefinisikan beberapa level isolasi yang lebih "lemah", memungkinkan adanya _trade-off_ antara akurasi dan performa.
> > 
> > Dari yang terlemah hingga terkuat:
> > 
> > 1. **Read Uncommitted:** Paling lemah. Sebuah transaksi dapat membaca data yang belum di-commit oleh transaksi lain. Level ini rentan terhadap _dirty reads_.
> >     
> > 2. **Read Committed:** Hanya memperbolehkan transaksi membaca data yang sudah di-commit. Ini mencegah _dirty reads_, tetapi masih rentan terhadap _non-repeatable reads_ dan _phantom reads_.
> >     
> > 3. **Repeatable Read:** Menjamin bahwa jika sebuah transaksi membaca satu baris data beberapa kali, hasilnya akan selalu sama. Ini mencegah _non-repeatable reads_, tetapi masih rentan terhadap _phantom reads_.
> >     
> > 4. **Serializable:** Paling ketat. Menjamin hasil yang setara dengan eksekusi serial. Mencegah semua anomali baca (_dirty, non-repeatable, phantom_). Ini adalah level default dalam banyak sistem basis data.
> >     
> > 
> > ### Read Phenomena (Anomali Pembacaan)
> > 
> > Anomali ini terjadi ketika isolasi tidak sempurna:
> > 
> > - **Dirty Read:** Transaksi T1 membaca data yang telah dimodifikasi oleh T2, tetapi T2 belum melakukan `commit`. Jika T2 kemudian melakukan `rollback`, maka data yang dibaca T1 menjadi tidak valid ("kotor").
> >     
> > - **Non-Repeatable Read:** T1 membaca sebuah baris data. Kemudian, T2 memodifikasi atau menghapus baris tersebut dan melakukan `commit`. Ketika T1 membaca kembali baris yang sama, nilainya sudah berbeda atau tidak ada. Pembacaan tidak dapat diulang.
> >     
> > - **Phantom Read:** T1 menjalankan sebuah query yang menghasilkan sekumpulan baris (misalnya, `SELECT ... WHERE age > 20`). Kemudian, T2 menyisipkan baris baru yang memenuhi kriteria query tersebut dan melakukan `commit`. Ketika T1 menjalankan kembali query yang sama, ia melihat baris "hantu" (phantom) yang sebelumnya tidak ada.
> >     
> > 
> > ### Transaction Definition in SQL
> > 
> > - Sebuah transaksi di SQL dimulai secara **implisit** saat statemen DML (seperti `SELECT`, `INSERT`, `UPDATE`) pertama kali dieksekusi.
> >     
> > - Transaksi diakhiri secara eksplisit dengan perintah:
> >     
> >     - `COMMIT`: Menyimpan semua perubahan secara permanen.
> >         
> >     - `ROLLBACK`: Membatalkan semua perubahan sejak transaksi dimulai.
> >         

> [!cornell] #### Summary
> 
> **Untuk menangani kegagalan, sistem basis data menggunakan** _**recoverable schedule**_ **untuk mencegah komitmen pada data yang tidak valid, dan lebih baik lagi,** _**cascadeless schedule**_ **untuk menghindari pembatalan beruntun dengan hanya mengizinkan pembacaan data yang sudah di-commit. Secara praktis, SQL menawarkan level isolasi yang berbeda sebagai** _**trade-off**_ **antara konsistensi dan performa, mulai dari** _**Read Uncommitted**_ **yang rentan terhadap anomali seperti** _**Dirty Read**_**, hingga** _**Serializable**_ **yang memberikan jaminan tertinggi dengan mencegah semua anomali baca, termasuk** _**Non-Repeatable Read**_ **dan** _**Phantom Read**_**.**

> [!ad-libitum]- Additional Information
> 
> #### Analogi: Mengerjakan Dokumen Bersama
> 
> Bayangkan Anda (T1) dan kolega Anda (T2) sedang mengedit dokumen bersama.
> 
> - **Dirty Read:** Anda melihat kolega Anda mengetik kalimat baru (data belum di-commit/disimpan). Anda mengutip kalimat itu dalam email. Tiba-tiba kolega Anda menghapus kalimat itu dan menyimpannya (`rollback`). Email Anda sekarang mengutip sesuatu yang tidak pernah ada.
>     
> - **Non-Repeatable Read:** Anda membaca paragraf 1. Kolega Anda merevisi paragraf itu dan menyimpannya (`commit`). Ketika Anda membacanya lagi, isinya sudah berubah. Bacaan Anda tidak konsisten.
>     
> - **Phantom Read:** Anda menghitung jumlah paragraf di dokumen dan mendapatkan angka 5. Kolega Anda menambahkan paragraf baru di bagian akhir dan menyimpannya (`commit`). Ketika Anda menghitung ulang, jumlahnya menjadi 6. Ada paragraf "hantu" yang muncul.
>     
> - **Serializable:** Ini seperti fitur "kunci" di Google Docs. Saat Anda mengedit, tidak ada orang lain yang bisa mengedit bagian yang sama sampai Anda selesai, memastikan tidak ada konflik sama sekali.
>     
> 
> #### Implementasi di Dunia Nyata
> 
> Sebagian besar basis data modern, seperti PostgreSQL, menggunakan level isolasi **Read Committed** sebagai default. Ini memberikan keseimbangan yang baik antara performa dan konsistensi, cukup untuk sebagian besar aplikasi web umum. Level **Serializable** seringkali diimplementasikan menggunakan teknik yang lebih canggih daripada sekadar _locking_, seperti _Snapshot Isolation_ (MVCC - Multi-Version Concurrency Control), yang memungkinkan pembaca tidak memblok penulis dan sebaliknya, sehingga meningkatkan konkurensi.
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Dokumentasi PostgreSQL:** Baca bagian tentang _Transaction Isolation_ di dokumentasi resmi PostgreSQL. Mereka memberikan penjelasan yang sangat bagus dan praktis tentang bagaimana setiap level isolasi bekerja dan anomali apa yang dicegahnya.
>