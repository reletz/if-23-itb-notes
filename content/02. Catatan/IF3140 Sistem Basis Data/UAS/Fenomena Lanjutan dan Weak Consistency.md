---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3140 Sistem Basis Data]]

> [!cornell] 5.2: Fenomena Lanjutan & Konsistensi Lemah
> 
> > ## Questions/Cues
> > 
> > - Apa masalah `INSERT` & `DELETE`?
> >     
> > - Apa itu _Phantom Problem_?
> >     
> > - Mengapa _lock_ baris tidak cukup?
> >     
> > - Apa solusi _Phantom_?
> >     
> > - Apa itu _Index-Range Locking_?
> >     
> > - Apa itu _Weak Levels of Consistency_?
> >     
> > - Level `SERIALIZABLE`?
> >     
> > - Level `REPEATABLE READ`?
> >     
> > - Level `READ COMMITTED`?
> >     
> > - Level `READ UNCOMMITTED`?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides "11 - Concurrency Control - 4.pdf" (Hal 16-29)
> >     
> 
> > ### Masalah: Phantom Problem (Fenomena Hantu)
> > 
> > _Locking_ standar pada item data (baris) tidak cukup untuk menangani operasi `INSERT` atau `DELETE`.
> > 
> > Definisi Phantom Problem:
> > 
> > Sebuah transaksi T1 menjalankan query yang sama dua kali, namun mendapatkan hasil yang berbeda karena transaksi T2 melakukan INSERT atau DELETE data baru yang "cocok" dengan kriteria WHERE dari T1.
> > 
> > **Contoh:**
> > 
> > 1. **T1:** `SELECT COUNT(*) FROM Karyawan WHERE dept = 'Riset'`. (Hasil: 10 orang).
> >     
> > 2. **T2:** `INSERT INTO Karyawan (nama, dept) VALUES ('Budi', 'Riset')`.
> >     
> > 3. **T2:** `COMMIT`.
> >     
> > 4. **T1:** (Masih berjalan) `SELECT COUNT(*) FROM Karyawan WHERE dept = 'Riset'`. (Hasil: 11 orang).
> >     
> > 
> > **Masalah:** Hasil T1 tidak konsisten (non-repeatable). Baris "Budi" adalah baris "hantu" (_phantom_) yang tiba-tiba muncul.
> > 
> > ### Solusi: Index-Range Locking
> > 
> > _Lock_ pada baris data saja tidak cukup, karena baris "Budi" belum ada saat T1 query pertama.
> > 
> > **Solusi:** Transaksi T1 harus **mengunci** _**index**_ yang digunakan untuk query.
> > 
> > - Saat T1 menjalankan `... WHERE dept = 'Riset'`, sistem akan mengunci "range" pada _index_ `dept` untuk nilai 'Riset'.
> >     
> > - Saat T2 mencoba `INSERT ... 'Riset'`, ia harus meminta _lock_ pada _index_ 'Riset' tersebut.
> >     
> > - T2 akan **di-block** (menunggu) sampai T1 selesai (_commit_ atau _abort_).
> >     
> > 
> > ### Weak Levels of Consistency (Level Konsistensi Lemah)
> > 
> > Standar SQL mendefinisikan level isolasi sebagai _trade-off_ antara konsistensi (akurasi) dan performa (konkurensi).
> > 
> > |**Level Isolasi**|**Dirty Read (Baca data uncommitted)**|**Non-Repeatable Read (Data yg dibaca berubah)**|**Phantom Read (Ada baris baru)**|
> > |---|---|---|---|
> > |**SERIALIZABLE**|**Tidak Boleh**|**Tidak Boleh**|**Tidak Boleh**|
> > |**REPEATABLE READ**|**Tidak Boleh**|**Tidak Boleh**|**Boleh**|
> > |**READ COMMITTED**|**Tidak Boleh**|**Boleh**|**Boleh**|
> > |**READ UNCOMMITTED**|**Boleh**|**Boleh**|**Boleh**|
> > 
> > **Penjelasan:**
> > 
> > 1. **Serializable:** Paling kuat, paling aman, paling lambat. Dijamin tidak ada anomali.
> >     
> > 2. **Repeatable Read:** Jaminan: Jika T baca data Q, lalu T baca lagi, Q dijamin nilainya sama. (Biasanya diimplementasikan pakai _Snapshot Isolation_ di DB modern).
> >     
> > 3. **Read Committed:** (Default di banyak DB, misal PostgreSQL). Jaminan: T **hanya** membaca data yang _sudah di-commit_. TAPI, jika T baca Q=10, lalu T2 commit Q=20, lalu T baca lagi, T akan melihat Q=20 (_non-repeatable_).
> >     
> > 4. **Read Uncommitted:** Paling lemah, paling cepat, paling berbahaya. T boleh membaca data "kotor" dari T2 yang belum _commit_.
> >     

> [!cornell] #### Summary
> 
> _**Phantom Problem**_ **adalah anomali di mana hasil query berubah karena transaksi lain melakukan `INSERT` atau `DELETE` baris baru (baris "hantu") yang cocok dengan kriteria `WHERE`. Solusinya bukan mengunci data, melainkan mengunci _range_ pada _index_ (_Index-Range Locking_). Untuk performa, SQL menyediakan _Weak Levels of Consistency_ sebagai _trade-off_: `SERIALIZABLE` (paling kuat), `REPEATABLE READ` (mencegah** _**non-repeatable read**_**, sering di-implementasi sebagai** _**Snapshot Isolation**_**), `READ COMMITTED` (hanya mencegah** _**dirty read**_**, level default), dan `READ UNCOMMITTED` (paling lemah, membolehkan** _**dirty read**_**).**