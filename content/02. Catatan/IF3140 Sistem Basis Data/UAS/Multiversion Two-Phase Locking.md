---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3140 Sistem Basis Data]]

> [!cornell] 4.2: Multiversion Two-Phase Locking (MV-2PL)
> 
> > ## Questions/Cues
> > 
> > - Apa itu _Multiversion 2PL_ (MV-2PL)?
> >     
> > - Apa dua jenis transaksi di MV-2PL?
> >     
> > - Apa itu _Update Transaction_?
> >     
> > - Bagaimana aturan _Update Transaction_?
> >     
> > - Apa itu _Read-Only Transaction_?
> >     
> > - Bagaimana aturan _Read-Only Transaction_?
> >     
> > - Apakah MV-2PL menjamin _serializability_?
> >     
> > - Apa keuntungannya?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides "11 - Concurrency Control - 4.pdf" (Hal 6-7)
> >     
> 
> > ### Definisi: Multiversion Two-Phase Locking
> > 
> > Ini adalah protokol yang menggabungkan _Multiversion_ (MV) dengan _Two-Phase Locking_ (2PL).
> > 
> > Ide utamanya adalah memisahkan transaksi menjadi dua jenis:
> > 
> > 1. _**Update Transactions**_ (Transaksi Update): Ini adalah transaksi "normal" yang mungkin perlu `read` dan `write`.
> >     
> > 2. _**Read-Only Transactions**_ (Transaksi Baca-Saja): Ini adalah transaksi "analitis" yang _dijamin_ hanya akan `read` dan tidak akan pernah `write`.
> >     
> > 
> > ### Aturan untuk _Update Transactions_
> > 
> > - **Protokol:** Transaksi update menggunakan **Rigorous Two-Phase Locking (Rigorous 2PL)** standar (Lihat Catatan 1.2).
> >     
> > - **Locking:** Mereka harus mendapatkan `lock-S` sebelum `read` dan `lock-X` sebelum `write`, dan menahan semua _lock_ sampai _commit_ atau _abort_.
> >     
> > - **Versioning:** Saat transaksi update `write(Q)`, ia akan **membuat versi baru** dari Q. Versi ini akan "terkunci" oleh _lock-X_ sampai transaksi _commit_.
> >     
> > 
> > ### Aturan untuk _Read-Only Transactions_
> > 
> > Transaksi _read-only_ **TIDAK MENGGUNAKAN LOCK SAMA SEKALI**. Mereka menggunakan _timestamp_ dan _multiversion_.
> > 
> > 1. **Mulai:** Saat transaksi _read-only_ Ti dimulai, ia diberi **Timestamp** unik `TS(Ti)`.
> >     
> > 2. **Operasi `read(Q)`:**
> >     
> >     - Ti akan membaca **versi `Qk` terbaru yang sudah di-commit** yang memiliki `W-TS(Qk) <= TS(Ti)`.
> >         
> >     - Dengan kata lain, Ti membaca versi data terbaru yang _sudah selesai_ (commit) _sebelum_ Ti dimulai.
> >         
> > 3. **Commit:** Transaksi _read-only_ selalu _commit_ (tidak perlu validasi, karena tidak _write_).
> >     
> > 
> > ### Jaminan dan Keuntungan
> > 
> > - **Serializability:** Protokol ini **menjamin** _**conflict serializability**_.
> >     
> > - **Bebas Tunggu (No Waiting):**
> >     
> >     - _Read-Only_ tidak pernah menunggu _lock_ dari _Update_ (karena _read-only_ membaca versi lama).
> >         
> >     - _Update_ tidak pernah menunggu _lock_ dari _Read-Only_ (karena _read-only_ tidak pernah memegang _lock_).
> >         
> > 
> > Ini adalah skema yang sangat efisien untuk beban kerja campuran (OLTP + OLAP), di mana banyak query analitis (read-only) berjalan bersamaan dengan transaksi update.

> [!cornell] #### Summary
> 
> _**Multiversion 2PL**_ **(MV-2PL) membagi transaksi menjadi dua jenis:** _**Update Transaction**_ **dan** _**Read-Only Transaction**_**. Transaksi** _**Update**_ **menggunakan** _**Rigorous 2PL**_ **standar (minta** _**lock**_ **S/X, tahan sampai** _**commit**_**, dan membuat versi baru saat** _**write**_**). Transaksi** _**Read-Only**_ **tidak menggunakan** _**lock**_**, melainkan diberi** _**timestamp**_ **(`TS`) saat mulai, dan hanya membaca versi data terbaru yang** _**sudah di-commit**_ **sebelum `TS` tersebut. Skema ini menjamin** _**serializability**_ **dan mengizinkan transaksi** _**read-only**_ **berjalan tanpa pernah menunggu** _**lock**_ **dari transaksi** _**update**_**.**