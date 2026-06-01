---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3140 Sistem Basis Data]]

> [!cornell] 1.2: Two-Phase Locking (2PL)
> 
> > ## Questions/Cues
> >
> > - Mengapa _locking_ saja tidak cukup?
> >     
> > - Apa itu _Two-Phase Locking_ (2PL)?
> >     
> > - Apa 2 fase dalam 2PL?
> >     
> > - Apa itu _Growing Phase_?
> >     
> > - Apa itu _Shrinking Phase_?
> >     
> > - Apa itu _Lock Point_?
> >     
> > - Apakah 2PL menjamin _serializability_?
> >     
> > - Apakah 2PL bebas _deadlock_?
> >     
> > - Apa itu _Cascading Rollback_?
> >     
> > - Apa itu _Strict 2PL_?
> >     
> > - Apa itu _Rigorous 2PL_?
> >     
> > - Hubungan 2PL, Strict, & Rigorous?
> >     
> >
> > ## Reference Points
> >
> > - Slides "11 - Concurrency Control - 1.pdf" (Hal 11-16, 19)
> >     
> 
> > ### Masalah: Locking Saja Tidak Cukup
> >
> > Menggunakan _lock_ dan _unlock_ secara sembarangan tidak menjamin _serializability_.
> >
> > **Contoh Anomali**
> > 
> > Misal A = 1000, B = 2000. Total = 3000.
> > 
> > 1. **T3 (Transfer 50 dari B ke A)** 
> > 2. **T4 (Cek Total Saldo)** 
> > 3. **T3 (Lanjut)** 
> > 
> > |`T3`|`T4`|
> > |---|---|
> > |`lock-X(B)` ||
> > |`read(B)` (B=2000)||
> > |`B = B - 50` (B=1950)||
> > | `write(B)`||
> > | `unlock(B)`||
> > ||`lock-S(A)`|
> > || `read(A)` (A=1000)|
> > || `lock-S(B)`| 
> > ||`read(B)` (B=1950)|
> > || `unlock(A)` |
> > ||`unlock(B)` |
> > ||`print(A+B)` (Hasil: 2950. **SALAH!**)|
> > |`lock-X(A)` ||
> > |`read(A)` (A=1000) ||
> > |`A = A + 50` (A=1050)||
> > | `write(A)`||
> > | `unlock(A)`||
> >
> >     
> >
> > **Masalah:** T4 melihat kondisi basis data yang _tidak konsisten_ (B sudah dikurangi, A belum ditambah). Ini terjadi karena T3 melepaskan kunci (`unlock(B)`) terlalu cepat.
> >
> > ### Definisi: Two-Phase Locking (2PL)
> >
> > Ini adalah **protokol** yang memastikan _serializability_. Aturannya adalah:
> >
> > > "Setiap transaksi harus melakukan operasi _lock_ dan _unlock_ dalam dua fase yang terpisah."
> >
> > ### Fase 1: Growing Phase (Fase Tumbuh)
> >
> > - Ini adalah fase pertama dari transaksi.
> >     
> > - Selama fase ini, transaksi **hanya boleh meminta (acquire) kunci**.
> >     
> > - Transaksi **tidak boleh melepaskan (release) kunci sama sekali**.
> >     
> > - Transaksi boleh melakukan _lock-S_, _lock-X_, dan _lock upgrade_ (S ke X).
> >     
> >
> > ### Fase 2: Shrinking Phase (Fase Susut)
> >
> > - Ini adalah fase kedua, yang dimulai segera setelah transaksi melepaskan kunci pertamanya.
> >     
> > - Selama fase ini, transaksi **hanya boleh melepaskan (release) kunci**.
> >     
> > - Transaksi **tidak boleh meminta (acquire) kunci baru sama sekali**.
> >     
> > - Transaksi boleh melakukan _unlock_ dan _lock downgrade_ (X ke S).
> >     
> >
> > ### Lock Point
> >
> > **Lock Point** adalah satu titik waktu spesifik di mana transaksi telah mendapatkan kunci terakhirnya (yaitu, akhir dari _growing phase_).
> >
> > - Urutan _serializability_ dari transaksi-transaksi ditentukan oleh urutan _lock point_ mereka.
> >     
> >
> > ### Jaminan dan Masalah 2PL
> >
> > - **Jaminan:** 2PL **menjamin** _**conflict serializability**_. Ini menyelesaikan masalah anomali seperti pada contoh T3 dan T4.
> >     
> > - **Masalah 1: Tidak Bebas Deadlock.** 2PL _tidak_ mencegah _deadlock_. (Contoh: T1 `lock-S(A)`, T2 `lock-S(B)`, lalu T1 minta `lock-X(B)` (tunggu T2), dan T2 minta `lock-X(A)` (tunggu T1) -> Saling tunggu selamanya).
> >     
> > - **Masalah 2: Bisa Terjadi** _**Cascading Rollback**_.
> >     
> >
> > ### Masalah: Cascading Rollback
> >
> > Ini adalah masalah di mana kegagalan satu transaksi (misal _abort_) menyebabkan transaksi-transaksi lain yang "tidak bersalah" juga harus ikut di-_rollback_ (dibatalkan).
> >
> > **Skenario:**
> >
> > 1. T1: `lock-X(A)`, `write(A)` (A jadi "kotor" / _dirty_).
> >     
> > 2. T1: `unlock(A)` (T1 masuk _shrinking phase_).
> >     
> > 3. T2: `lock-X(A)`, `read(A)` (T2 membaca data kotor T1), `write(A)`.
> >     
> > 4. T2: `unlock(A)`.
> >     
> > 5. T1: Tiba-tiba **ABORT** (gagal).
> >     
> >
> > **Konsekuensi:** Karena T1 _abort_, perubahannya pada A harus dibatalkan. TAPI, T2 sudah terlanjur membaca nilai A yang kotor. Maka, T2 juga **WAJIB di-rollback**. Jika T3 sudah baca dari T2, T3 juga harus _rollback_, dan seterusnya. Ini sangat tidak efisien.
> >
> > ### Solusi: Strict Two-Phase Locking (Strict 2PL)
> >
> > Ini adalah variasi 2PL yang lebih ketat untuk mencegah _cascading rollback_.
> >
> > - **Aturan Sama:** Punya _growing_ dan _shrinking phase_.
> >     
> > - **Aturan Tambahan:** Sebuah transaksi **tidak boleh melepaskan** _**lock-X**_ **(Exclusive) apapun** sampai setelah ia _commit_ (berhasil) atau _abort_ (gagal).
> >     
> >
> > **Keuntungan:** Ini **mencegah** _**cascading rollback**_. Kenapa? Karena tidak ada transaksi lain (seperti T2) yang diizinkan membaca atau menulis data yang "kotor" (belum di-_commit_). T2 baru bisa dapat _lock_ di A _setelah_ T1 _commit_ atau _abort_.
> >
> > ### Solusi: Rigorous Two-Phase Locking (Rigorous 2PL)
> >
> > Ini adalah versi yang lebih ketat lagi dan paling umum digunakan di sistem basis data komersial.
> >
> > - **Aturan Tambahan:** Sebuah transaksi **tidak boleh melepaskan** _**SEMUA**_ **kunci (baik** _**lock-X**_ **maupun** _**lock-S**_**)** sampai setelah ia _commit_ atau _abort_.
> >     
> >
> > **Keuntungan:** Sangat mudah diimplementasikan (tidak perlu melacak kapan _shrinking phase_ mulai, cukup lepaskan semua kunci saat _commit/abort_). Juga **mencegah** _**cascading rollback**_.
> >
> > **Hubungan:** _Rigorous 2PL_ adalah subset dari _Strict 2PL_, dan _Strict 2PL_ adalah subset dari _2PL_. Semua jadwal _Rigorous 2PL_ pasti _Strict 2PL_, dan semua jadwal _Strict 2PL_ pasti _2PL_.

> [!cornell] #### Summary
> 
> **Menggunakan** _**lock**_ **saja tidak cukup karena bisa menyebabkan anomali (data tidak konsisten).** _**Two-Phase Locking (2PL)**_ **adalah protokol yang menjamin** _**serializability**_ **dengan membagi eksekusi transaksi menjadi dua fase:** _**Growing Phase**_ **(hanya boleh minta** _**lock**_**) dan** _**Shrinking Phase**_ **(hanya boleh lepas** _**lock**_**). Titik akhir** _**growing phase**_ **disebut** _**Lock Point**_ **dan menentukan urutan serialisasi. Walaupun 2PL menjamin** _**serializability**_**, ia tidak bebas** _**deadlock**_ **dan bisa menyebabkan** _**Cascading Rollback**_**. Untuk mengatasinya, digunakan** _**Strict 2PL**_ **(menahan** _**lock-X**_ **sampai** _**commit**_**) atau** _**Rigorous 2PL**_ **(menahan** _**semua**_ **kunci sampai** _**commit**_**), yang merupakan standar implementasi di banyak DBMS.**

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman: Mengapa 2PL Menjamin Serializability?
> 
> 2PL menjamin _serializability_ karena urutan _lock point_ dari transaksi-transaksi yang _conflicting_ (berkonflik) memaksa sebuah urutan serial yang setara.
> 
> Bayangkan _Precedence Graph_ (Graf Ketergantungan). Sebuah _edge_ (panah) `T1 -> T2` dibuat jika T1 dan T2 punya operasi yang berkonflik, dan operasi T1 terjadi lebih dulu. Jadwal _serializable_ jika dan hanya jika _precedence graph_-nya tidak memiliki siklus (_acyclic_).
> 
> 1. Asumsikan ada konflik antara T1 dan T2 (misal, T1 `write(A)` dan T2 `read(A)`).
>     
> 2. Agar ini terjadi, T1 harus punya `lock-X(A)` dan T2 harus punya `lock-S(A)`.
>     
> 3. Pasti ada urutan. Entah T1 dapat `lock-X` dulu, atau T2 dapat `lock-S` dulu.
>     
> 4. **Kasus 1:** T1 `lock-X(A)`, lalu T1 `unlock(A)`, lalu T2 `lock-S(A)`.
>     
>     - Ini berarti _Lock Point_ T1 (akhir _growing phase_-nya) pasti terjadi _sebelum_ _Lock Point_ T2 (karena T2 masih _growing_ saat T1 sudah _shrinking_). Ini menciptakan _edge_ `T1 -> T2`.
>         
> 5. **Kasus 2:** T2 `lock-S(A)`, lalu T2 `unlock(A)`, lalu T1 `lock-X(A)`.
>     
>     - Ini berarti _Lock Point_ T2 terjadi _sebelum_ _Lock Point_ T1. Ini menciptakan _edge_ `T2 -> T1`.
>         
> 
> Tidak mungkin terjadi siklus (misal `T1 -> T2` dan `T2 -> T1` sekaligus) karena _lock point_ adalah titik waktu yang terurut. 2PL secara esensial memaksa semua konflik untuk "setuju" pada satu urutan linear, yaitu urutan _lock point_.
> 
> #### Eksplorasi Mandiri: 2PL dalam SQL
> 
> Di banyak sistem basis data (seperti SQL Server atau PostgreSQL), level isolasi tertinggi yang bisa Anda minta adalah `SERIALIZABLE`.
> 
> ```
> SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
> BEGIN TRANSACTION;
> -- Operasi SQL Anda...
> COMMIT;
> ```
> 
> Ketika Anda meminta level `SERIALIZABLE`, DBMS seringkali akan mengimplementasikannya menggunakan **Rigorous Two-Phase Locking** secara otomatis di balik layar.