---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3140 Sistem Basis Data]]

> [!cornell] 1.4: Graph-Based Protocol
> 
> > ## Questions/Cues
> >
> > - Apa alternatif selain 2PL?
> >     
> > - Apa itu _Graph-Based Protocol_?
> >     
> > - Bagaimana data diorganisir?
> >     
> > - Apa itu _Tree Protocol_?
> >     
> > - Bagaimana aturan _Tree Protocol_?
> >     
> > - Apakah _Tree Protocol_ menjamin _serializability_?
> >     
> > - Apakah _Tree Protocol_ bebas _deadlock_?
> >     
> > - Kapan _Tree Protocol_ melepaskan _lock_?
> >     
> > - Apa bedanya dengan 2PL?
> >     
> > - Kelebihan & Kekurangan _Tree Protocol_?
> >     
> >
> > ## Reference Points
> >
> > - Slides "11 - Concurrency Control - 2.pdf" (Hal 4-9)
> >     
> 
> > ### Motivasi: Alternatif Selain 2PL
> >
> > _Two-Phase Locking (2PL)_ adalah protokol yang paling umum, tetapi ia memiliki kelemahan utama: **bisa terjadi** _**deadlock**_. Selain itu, 2PL menahan _lock_ untuk waktu yang lama (sampai _shrinking phase_), yang bisa mengurangi konkurensi.
> >
> > _Graph-Based Protocol_ adalah keluarga protokol alternatif yang memanfaatkan struktur data yang diketahui untuk menghindari _deadlock_.
> >
> > ### Ide Dasar: Struktur Data
> >
> > Protokol ini mengasumsikan kita dapat memetakan semua item data ke dalam sebuah struktur graf, misalnya **Pohon (Tree)** atau _Directed Acyclic Graph (DAG)_.
> >
> > - Setiap item data (misal, baris, tabel) adalah sebuah _node_ di pohon.
> >     
> > - Kita mendefinisikan urutan parsial berdasarkan hirarki pohon ini.
> >     
> >
> > ### Definisi: Tree Protocol (Protokol Pohon)
> >
> > Ini adalah varian _Graph-Based Protocol_ yang paling populer dan sederhana.
> > 
> > ![[Pasted image 20251028125634.png]]
> >
> > **Aturan Main Tree Protocol:**
> >
> > 1. **Hanya `lock-X`:** Protokol ini umumnya (dalam versi dasarnya) hanya mempertimbangkan `lock-X` (Exclusive).
> >     
> >
> > 2. **Lock Pertama:** _Lock_ pertama dari sebuah transaksi T dapat dilakukan pada _sembarang_ node (item data) di pohon.
> >     
> >
> > 3. **Lock Berikutnya:** Untuk meminta `lock-X(Y)`, transaksi T harus **sudah memegang `lock-X` pada induk (parent) dari Y**, yaitu `parent(Y)`.
> > 	- **Pengecualian:** Aturan ini tidak berlaku untuk node pertama yang di-*lock* (aturan \#2).
> >  
> >
> > 4. **Aturan Pelepasan (Unlock):** Ini adalah bagian yang paling membedakannya dari 2PL.
> > 	- Sebuah *lock* pada node X dapat dilepaskan (`unlock(X)`) **kapan saja** (tidak harus menunggu *shrinking phase*).
> > 	- **TAPI:** Setelah T melepaskan `unlock(X)`, T **tidak boleh lagi** meminta *lock* pada node X tersebut atau node manapun di *subtree* (cabang) di bawah X.
> >
> >
> > ### Contoh Operasi (Slide 8-9)
> >
> > - T1 ingin akses (tulis) B, E, L:
> >     
> >     - Urutan _lock_ WAJIB: `lock-X(B)`, lalu `lock-X(E)`, lalu `lock-X(L)`.
> >         
> > - T2 ingin akses (tulis) D, H:
> >     
> >     - Urutan _lock_ WAJIB: `lock-X(A)`, lalu `lock-X(D)`, lalu `lock-X(H)`.
> >         
> >
> > **Skenario Konkuren:**
> > 
> > 1. T1: `lock-X(B)`.
> >     
> > 2. T2: `lock-X(A)`. (Boleh, A dan B tidak saling _parent/child_).
> >     
> > 3. T1: `lock-X(E)`.
> >     
> > 4. T2: `lock-X(D)`. (Boleh).
> >     
> > 5. T1: Selesai dengan B, melakukan `unlock(B)`. (BOLEH, meskipun T1 masih memegang _lock_ di E). **Ini BUKAN 2PL!**
> >     
> > 6. T1: `lock-X(L)`.
> >     
> > 7. T2: `lock-X(H)`.
> >     
> >
> > ### Jaminan Tree Protocol
> >
> > 1. **Menjamin** _**Conflict Serializability**_. (Urutan _lock_ pada akar pohon menentukan urutan serialisasi yang setara).
> >     
> > 2. **DIJAMIN BEBAS** _**DEADLOCK**_. Mengapa? Karena semua transaksi "dipaksa" meminta _lock_ dalam urutan yang sama (dari atas ke bawah pohon). Tidak mungkin terjadi siklus tunggu (T1 tunggu T2, T2 tunggu T1).
> >     
> >
> > ### Perbandingan dengan 2PL
> >
> > |**Fitur**|**Two-Phase Locking (2PL)**|**Tree Protocol (TP)**|
> > |---|---|---|
> > |**Serializability?**|**Ya, dijamin.**|**Ya, dijamin.**|
> > |**Bebas Deadlock?**|**Tidak.** (Butuh _deadlock handling_).|**Ya, dijamin.**|
> > |**Kapan Boleh Unlock?**|Hanya di _Shrinking Phase_.|Kapan saja (setelah selesai).|
> > |**Konkurensi?**|Baik, tapi _lock_ ditahan lama.|Potensial lebih baik (karena _unlock_ lebih awal).|
> > |**Cascading Rollback?**|2PL dasar: Ya. (Butuh _Strict 2PL_).|**Ya.** (Karena _unlock_ lebih awal).|
> > |**Fleksibilitas?**|Sangat fleksibel.|Tidak fleksibel (tergantung struktur pohon).|

> [!cornell] #### Summary
> 
> _**Graph-Based Protocol**_ **(seperti** _**Tree Protocol**_**) adalah alternatif untuk 2PL yang memanfaatkan struktur data (pohon) untuk mengatur urutan** _**request lock**_**. Aturan utamanya adalah** _**lock**_ **diminta secara** _**top-down**_ **(dari induk ke anak). Protokol ini memiliki keunggulan besar yaitu dijamin bebas** _**deadlock**_ **dan menjamin** _**serializability**_**. Selain itu,** _**lock**_ **bisa dilepas lebih awal (meningkatkan konkurensi) dibandingkan 2PL. Namun, kelemahannya adalah ia kurang fleksibel (harus tahu struktur pohon) dan masih rentan terhadap** _**cascading rollback**_ **(karena** _**unlock**_ **lebih awal).**

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman: Mengapa Tree Protocol Bebas Deadlock?
> 
> _Deadlock_ terjadi ketika ada siklus tunggu (T1 tunggu T2, T2 tunggu T3, ..., Tn tunggu T1). _Tree Protocol_ mencegah siklus ini dengan memberlakukan urutan parsial (_partial order_) pada semua item data.
> 
> 1. Semua _lock_ diminta dalam urutan _top-to-bottom_ sesuai struktur pohon.
>     
> 2. Asumsikan terjadi _deadlock_ antara T1 dan T2.
>     
> 3. Ini berarti T1 memegang _lock_ pada item X, dan T2 memegang _lock_ pada item Y.
>     
> 4. Lalu T1 meminta _lock_ pada Y (harus tunggu T2), dan T2 meminta _lock_ pada X (harus tunggu T1).
>     
> 5. Mari kita analisis berdasarkan aturan _Tree Protocol_:
>     
>     - **Jika T1 minta Y:** Berdasarkan aturan, Y haruslah anak dari X (`Y = child(X)`).
>         
>     - **Jika T2 minta X:** Berdasarkan aturan, X haruslah anak dari Y (`X = child(Y)`).
>         
> 6. Ini adalah sebuah kontradiksi logis. Tidak mungkin Y adalah anak dari X, _dan_ X adalah anak dari Y dalam sebuah struktur pohon (yang _acyclic_).
>     
> 7. Oleh karena itu, situasi _deadlock_ (siklus tunggu) secara struktural tidak mungkin terjadi jika semua transaksi mematuhi _Tree Protocol_.
>     
> 
> #### Kekurangan: Kapan Tree Protocol Tidak Cocok?
> 
> _Tree Protocol_ gagal total jika sebuah transaksi perlu mengakses data dalam urutan yang "aneh".
> 
> - **Contoh:** Transaksi T butuh akses `lock(L)` lalu `lock(H)`.
>     
> - **Urutan TP:**
>     
>     - Untuk `lock(L)`: T harus `lock(B) -> lock(E) -> lock(L)`.
>         
>     - Untuk `lock(H)`: T harus `lock(A) -> lock(D) -> lock(H)`.
>         
> - Ini memaksa T untuk me-_lock_ node _parent_ (B, E, A, D) yang sebenarnya tidak ia butuhkan, hanya untuk mematuhi protokol. Ini menurunkan konkurensi.
>     
> - Lebih buruk lagi, jika T butuh `lock(L)` lalu `lock(A)`. T harus `lock(B) -> lock(E) -> lock(L)`. Lalu T harus `unlock(L) -> unlock(E) -> unlock(B)`... baru bisa `lock(A)`. Ini sangat tidak efisien. 2PL jauh lebih baik untuk kasus akses _ad-hoc_ seperti ini.
>