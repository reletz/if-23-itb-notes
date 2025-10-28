---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3140 Sistem Basis Data]]

> [!cornell] Prinsip Log-Based Recovery: Log, Undo, Redo, & Checkpoint
> 
> > ## Questions/Cues
> >
> > - Apa itu **Log-Based Recovery**?
> >     
> > - Apa saja **3 jenis Log Record** utama?
> >     
> > - Apa arti `<Ti, X, V1, V2>`?
> >     
> > - Apa itu **Immediate Database Modification**?
> >     
> > - Kapan sebuah transaksi dianggap **committed**?
> >     
> > - Kapan kita perlu **UNDO** transaksi?
> >     
> > - Kapan kita perlu **REDO** transaksi?
> >     
> > - Bagaimana proses **`undo(Ti)`**?
> >     
> > - Bagaimana proses **`redo(Ti)`**?
> >     
> > - Apa itu **Checkpoint**?
> >     
> > - Apa 3 langkah melakukan Checkpoint sederhana?
> >     
> > - Bagaimana Checkpoint **mempercepat** recovery?
> >     
> >
> > ## Reference Points
> >
> > - Slides "12 - Recovery System - 1.pdf" (Slide 11-21)
> >     
> 
> > ### Apa itu Log-Based Recovery?
> >
> > **Log-Based Recovery** adalah mekanisme recovery yang paling umum digunakan. Idenya adalah mencatat semua operasi modifikasi database dalam sebuah file khusus yang disebut **Log**.
> >
> > - **Log** adalah urutan (sekuensial) dari **log records**.
> >     
> > - Log disimpan di **Stable Storage** (diasumsikan tidak akan pernah hilang) sehingga bisa digunakan untuk memulihkan data setelah terjadi kegagalan.
> >     
> > - Dengan adanya log, sistem dapat melacak apa yang sudah, sedang, dan belum dilakukan oleh setiap transaksi.
> >     
> >
> > ### Tiga Jenis Log Record Utama
> >
> > Setiap log record mencatat sebuah kejadian penting. Tiga yang paling fundamental adalah:
> >
> > 1. **`<Ti start>`**: Dicatat saat transaksi `Ti` memulai eksekusinya.
> >     
> > 2. **`<Ti, X, V1, V2>`**: Dicatat _sebelum_ transaksi `Ti` melakukan perubahan pada item data `X`.
> >     
> >     - `X`: Item data yang diubah.
> >         
> >     - `V1`: Nilai lama (_old value_) dari `X`.
> >         
> >     - `V2`: Nilai baru (_new value_) dari `X`.
> >         
> >     - _Ini adalah record terpenting untuk undo dan redo._
> >         
> > 3. **`<Ti commit>`**: Dicatat setelah transaksi `Ti` berhasil menyelesaikan semua operasinya (tetapi datanya mungkin belum ditulis ke disk).
> >     
> >
> > Contoh: Transaksi T10 transfer $50 dari A (1000) ke B (2000)
> > 
> > ```
> > <T10 start>
> > <T10, A, 1000, 950>
> > <T10, B, 2000, 2050>
> > <T10 commit>
> > ```
> > 
> > ### Immediate Database Modification
> >
> > Ini adalah salah satu strategi modifikasi database yang paling umum, yang secara langsung memengaruhi cara kerja recovery.
> >
> > - **Aturan Utama**: Log record (`<Ti, X, V1, V2>`) **HARUS** ditulis ke stable storage _sebelum_ blok data `X` yang telah dimodifikasi (di buffer) diizinkan untuk ditulis ke disk. (Ini adalah inti dari _Write-Ahead Logging_).
> >     
> > - **Kapan Transaksi Commit?**: Sebuah transaksi `Ti` dianggap **telah committed** pada saat log record `<Ti commit>`-nya berhasil ditulis ke **stable storage**.
> >     
> > - **Fleksibilitas Penulisan**: Blok data yang dimodifikasi di buffer (misal blok A dan B) bisa ditulis ke disk kapan saja, baik _sebelum_ maupun _sesudah_ transaksi commit. Fleksibilitas inilah yang menciptakan kebutuhan akan _undo_ dan _redo_.
> >     
> >
> > ### Logika Recovery: Undo vs. Redo
> >
> > Setelah terjadi _system crash_, sistem recovery akan memeriksa log untuk menentukan nasib setiap transaksi yang tercatat.
> >
> > 1. **Transaksi `Ti` perlu di-UNDO (dibatalkan)**
> > 		
> > 	- **Kondisi**: Log berisi `<Ti start>` TAPI **TIDAK BERISI** `<Ti commit>` (atau `<Ti abort>`).
> > 	- **Alasan**: Transaksi ini sedang aktif saat crash terjadi. Perubahannya mungkin sudah ada yang ditulis ke disk (melanggar *Atomicity*). Kita harus membatalkan semua perubahannya untuk memastikan konsistensi.
> >
> >
> > 2. **Transaksi `Ti` perlu di-REDO (diulangi)**
> >     
> > 	- **Kondisi**: Log berisi `<Ti start>` DAN **BERISI** `<Ti commit>` (atau `<Ti abort>`).
> > 	- **Alasan**: Transaksi ini sudah berhasil commit. Perubahannya **WAJIB** ada di database (prinsip *Durability*). Ada kemungkinan *crash* terjadi *setelah* commit tapi *sebelum* semua perubahannya di buffer sempat ditulis ke disk. Kita harus mengulangi perubahannya untuk menjamin durabilitas.
> >
> >
> > ### Proses `Undo(Ti)` dan `Redo(Ti)`
> >
> > - **`undo(Ti)` (Membatalkan)**
> >     
> > 	- Memindai log secara **mundur** (dari akhir ke awal).
> > 	- Untuk setiap record `<Ti, X, V1, V2>`, sistem mengembalikan nilai `X` di disk menjadi `V1` (nilai lama).
> > 	- Saat melakukan undo, sistem juga menulis log record khusus: **Compensation Log Record (CLR)**, misal `<Ti, X, V1>`.
> > 	- Setelah menemukan `<Ti start>`, sistem menulis `<Ti abort>` untuk menandakan transaksi ini resmi dibatalkan.
> >
> >
> > - **`redo(Ti)` (Mengulangi)**
> >     
> > 	- Memindai log secara **maju** (dari awal ke akhir).
> > 	- Untuk setiap record `<Ti, X, V1, V2>`, sistem menuliskan nilai `V2` (nilai baru) ke data item `X` di disk.
> > 	- *Penting*: Operasi redo **tidak** menghasilkan log record baru.
> > 
> >
> > ### Apa itu Checkpoint?
> >
> > Jika tidak ada checkpoint, sistem harus membaca **keseluruhan log** dari awal setiap kali terjadi _crash_, yang bisa sangat lama.
> >
> > **Checkpoint** adalah sebuah prosedur periodik yang "menandai" log untuk menyederhanakan dan mempercepat proses recovery.
> >
> > **Tiga Langkah Checkpoint Sederhana:**
> > 
> > (Selama checkpoint, semua update transaksi dihentikan sementara)
> >
> > 1. Menulis semua log record yang masih ada di _memory buffer_ ke **stable storage** (log di disk).
> >     
> > 2. Menulis semua _blok data_ yang telah dimodifikasi di _memory buffer_ ke **disk**.
> >     
> > 3. Menulis satu log record khusus `<checkpoint L>` ke **stable storage**, di mana `L` adalah daftar semua transaksi yang **sedang aktif** (belum commit) pada saat itu.
> >     
> >
> > ### Recovery Menggunakan Checkpoint
> >
> > Dengan adanya checkpoint, sistem tidak perlu lagi membaca seluruh log.
> >
> > 1. Sistem memindai log secara **mundur** dari akhir untuk menemukan record `<checkpoint L>` **terakhir**.
> >     
> > 2. Sistem kini hanya perlu peduli pada:
> >     
> >     - Transaksi yang ada di dalam daftar `L`.
> >         
> >     - Transaksi apa pun yang **dimulai setelah** checkpoint tersebut.
> >         
> > 3. Transaksi yang sudah _commit_ **sebelum** checkpoint dapat **diabaikan** dengan aman, karena langkah 2 checkpoint sudah menjamin semua perubahan mereka ada di disk.
> >     
> >
> > **Contoh (Slide 21):**
> >
> > - `T1` (commit sebelum checkpoint): **Abaikan**.
> >     
> > - `T2` (aktif saat checkpoint, lalu commit): **REDO**.
> >     
> > - `T3` (mulai setelah checkpoint, lalu commit): **REDO**.
> >     
> > - `T4` (mulai setelah checkpoint, tidak commit): **UNDO**.
> >     

> [!cornell] #### Summary
> 
> **Log-Based Recovery menjamin Atomicity dan Durability dengan cara mencatat semua perubahan di** _**log**_ **pada** _**stable storage**_**. Log record utama adalah `<start>`, `<commit>`, dan `<Ti, X, V1, V2>` (nilai lama V1, nilai baru V2). Setelah crash, transaksi yang sudah** _**commit**_ **akan di-REDO (menulis V2) untuk memastikan Durability, sementara transaksi yang** _**belum commit**_ **akan di-UNDO (menulis V1) untuk memastikan Atomicity. Prosedur Checkpoint dilakukan secara periodik untuk menulis data kotor ke disk dan menandai log, sehingga proses recovery tidak perlu memindai seluruh log, melainkan hanya dari titik checkpoint terakhir.**

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis: Fuzzy Checkpoints vs. Simple Checkpoints
> 
> Checkpoint yang dijelaskan di slide (slide 19) disebut **Simple Checkpoint**, di mana semua aktivitas transaksi dihentikan sementara (_"stop-the-world"_). Ini tidak efisien untuk sistem besar.
> 
> Kebanyakan sistem modern (seperti ARIES) menggunakan **Fuzzy Checkpoints**:
> 
> 1. Sistem menulis log record `<checkpoint L>` (L = daftar transaksi aktif) ke stable storage.
>     
> 2. Sistem _kemudian_ mulai menulis data kotor (modified blocks) dari buffer ke disk di latar belakang, _tanpa_ menghentikan transaksi baru.
>     
> 3. Ini berarti pada saat recovery, sistem harus tahu blok data mana yang _sudah_ berhasil ditulis ke disk sejak checkpoint dimulai. Ini membuat algoritma recovery (khususnya fase Analisis) sedikit lebih kompleks, tetapi kinerjanya jauh lebih baik.
>     
> 
> #### Pendalaman Teknis: Compensation Log Records (CLRs)
> 
> Saat melakukan `undo(Ti)`, slide 17 menyebutkan penulisan log record khusus (CLR). Mengapa ini penting?
> 
> Bayangkan skenario ini:
> 
> 4. Sistem melakukan `undo` untuk transaksi `Ti`.
>     
> 5. Sistem berhasil mengembalikan nilai `X` ke `V1` dan menulis CLR-nya.
>     
> 6. Tiba-tiba, sistem **crash lagi** di tengah-tengah proses undo (misal sebelum `Ti` selesai di-undo semua).
>     
> 
> Saat sistem _restart_ untuk kedua kalinya, ia akan melihat log lagi. Jika tidak ada CLR, ia akan melihat record `<Ti, X, V1, V2>` asli dan mencoba meng-undo-nya _lagi_, padahal sudah di-undo.
> 
> Dengan adanya **CLR**, saat restart kedua, sistem melihat CLR tersebut. Aturannya adalah: **CLR tidak pernah di-undo**. Sistem tahu bahwa aksi undo untuk record tersebut _sudah_ dilakukan, dan ia akan melanjutkan proses undo dari titik sebelum CLR, membuat operasi undo menjadi _idempotent_ (aman diulang) dan _restartable_.
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Buku**: Silberschatz, Korth, Sudarshan, "Database System Concepts", 7th Ed, Chapter 19.4 - 19.5.
>     
> - **Konsep**: ARIES (Algorithm for Recovery and Isolation Exploiting Semantics).
>     
> - **Istilah Kunci**: `STEAL`/`NO-STEAL` dan `FORCE`/`NO-FORCE`.
>     
>     - **`STEAL`**: Buffer boleh menulis data _uncommitted_ ke disk. (Membutuhkan **UNDO**).
>         
>     - **`NO-FORCE`**: Buffer tidak wajib menulis data saat transaksi _commit_. (Membutuhkan **REDO**).
>         
>     - _Immediate Database Modification_ (yang kita bahas) adalah kebijakan **`STEAL`** / **`NO-FORCE`**, yang paling fleksibel namun memerlukan _undo_ dan _redo_.
>