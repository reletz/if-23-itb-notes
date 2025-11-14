---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3140 Sistem Basis Data]]

> [!cornell] Algoritma Log-Based Recovery & Optimasi Buffering
> 
> > ## Questions/Cues
> > 
> > - Apa itu **Transaction Rollback** (saat normal)?
> >     
> > - Apa itu **Compensation Log Record (CLR)**?
> >     
> > - Apa **2 fase** algoritma recovery dari failure?
> >     
> > - Bagaimana cara kerja **Redo Phase**?
> >     
> > - Apa itu **`undo-list`**?
> >     
> > - Bagaimana cara kerja **Undo Phase**?
> >     
> > - Apa itu **Log Record Buffering**?
> >     
> > - Apa itu **Log Force**?
> >     
> > - Apa aturan **Write-Ahead Logging (WAL)**?
> >     
> > - Apa itu **Database Buffering**?
> >     
> > - Apa kebijakan **`steal`** vs **`no-force`**?
> >     
> > - Apa itu **`latch`**?
> >     
> >
> > ## Reference Points
> > 
> > - Slides "12 - Recovery System - 1.pdf" (Slide 22-27)
> >     
> > - Slides "12 - Recovery System - 2.pdf" (Slide 28-31)
> >     
> 
> > ### Algoritma Recovery (Detail)
> > 
> > Algoritma recovery dasar (seperti yang digunakan di ARIES) terdiri dari 3 fase, namun slide ini menyederhanakannya menjadi 2 fase utama setelah crash: **Redo Phase** dan **Undo Phase**. Algoritma ini juga bergantung pada prosedur `rollback` standar.
> > 
> > **Transaction Rollback (Saat Operasi Normal):**
> > 
> > Ini adalah proses abort yang diminta oleh transaksi itu sendiri (bukan karena crash).
> > 
> > 1. Memindai log secara **mundur** dari akhir.
> >     
> > 2. Untuk setiap log record `<Ti, X, V1, V2>` milik transaksi `Ti`:
> >     
> >     - Menulis nilai lama (`V1`) kembali ke item data `X`.
> >         
> >     - Menulis **Compensation Log Record (CLR)**, misal `<Ti, X, V1>`, ke log. (CLR _tidak_ akan di-undo).
> >         
> > 3. Setelah menemukan `<Ti start>`, tulis `<Ti abort>` ke log.
> >     
> > 
> > ### Recovery from Failure: Dua Fase
> > 
> > Setelah _system crash_, sistem melakukan recovery saat _restart_.
> > 
> > **1. Redo Phase (Fase Mengulangi)**
> > 
> > - **Tujuan**: Mengembalikan state database ke kondisi _tepat seperti saat crash_ (termasuk data "kotor" dari transaksi yang belum commit) dan mengidentifikasi transaksi mana yang gagal.
> >     
> > - **Proses**:
> >     
> >     1. Cari record `<checkpoint L>` **terakhir**. Inisialisasi `undo-list` dengan daftar `L` dari checkpoint.
> >         
> >     2. Pindai log secara **MAJU** (dari checkpoint ke akhir).
> >         
> >     3. Jika menemukan record `<Ti, X, V1, V2>`, **selalu** lakukan `REDO`: tulis nilai baru (`V2`) ke data item `X`.
> >         
> >     4. Jika menemukan `<Ti start>`, tambahkan `Ti` ke `undo-list`.
> >         
> >     5. Jika menemukan `<Ti commit>` atau `<Ti abort>`, hapus `Ti` dari `undo-list`.
> >         
> > - **Hasil**: Database di disk kini konsisten dengan state di log. `undo-list` berisi semua transaksi yang _dimulai_ tapi _tidak pernah commit/abort_.
> >     
> > 
> > **2. Undo Phase (Fase Membatalkan)**
> > 
> > - **Tujuan**: Membersihkan data "kotor" yang ditulis oleh transaksi di `undo-list`.
> >     
> > - **Proses**:
> >     
> >     1. Pindai log secara **MUNDUR** (dari akhir ke awal).
> >         
> >     2. Cek setiap log record. Jika record itu milik transaksi `Ti` yang ada di `undo-list`:
> >         
> >         - Lakukan `UNDO` (tulis nilai lama `V1`) dan tulis **CLR** ke log (seperti rollback normal).
> >             
> >     3. Jika menemukan `<Ti start>` untuk transaksi `Ti` yang ada di `undo-list`:
> >         
> >         - Tulis `<Ti abort>` ke log.
> >             
> >         - Hapus `Ti` dari `undo-list`.
> >             
> >     4. Berhenti ketika `undo-list` kosong.
> >         
> > 
> > ### Optimasi: Log Record Buffering
> > 
> > Menulis log ke _stable storage_ (disk) adalah operasi yang lambat. Untuk efisiensi, log record ditampung dulu di _buffer_ (memory/volatile).
> > 
> > - **Output**: Buffer log ditulis ke disk saat buffer penuh, atau saat terjadi **Log Force**.
> >     
> > - **Log Force**: Operasi yang _memaksa_ buffer log untuk segera ditulis ke stable storage. Ini **wajib** dilakukan saat transaksi `commit` untuk menjamin Durability (karena transaksi baru dianggap _commit_ saat record `<Ti commit>`-nya ada di stable storage).
> >     
> > 
> > ### Aturan Kunci: Write-Ahead Logging (WAL)
> > 
> > Ini adalah aturan paling fundamental dalam recovery:
> > 
> > > **Informasi `UNDO` (yaitu log record `<Ti, X, V1, V2>`) harus ditulis ke** _**stable storage**_ **SEBELUM blok data `X` yang dimodifikasi oleh `Ti` (di buffer) diizinkan untuk ditulis ke disk.**
> > 
> > **Alasan**: Jika sistem mengizinkan data `X` yang baru (kotor) ditulis ke disk, lalu _crash_ sebelum log-nya ditulis, sistem tidak akan punya informasi (nilai `V1`) untuk melakukan `UNDO`. Aturan WAL memastikan sistem _selalu_ bisa membatalkan perubahan jika diperlukan.
> > 
> > ### Optimasi: Database Buffering
> > 
> > Sama seperti log, blok data juga ditampung di _buffer_ (memory). Ini melahirkan dua kebijakan:
> > 
> > 1. **`steal` Policy**: Blok data di buffer yang diubah oleh transaksi _uncommitted_ (belum commit) **diizinkan** ("dicuri" / `steal`) untuk ditulis ke disk.
> >     
> >     - _Implikasi_: Membutuhkan **UNDO** (karena data kotor ada di disk).
> >         
> > 2. **`no-force` Policy**: Blok data _tidak wajib_ "dipaksa" (`force`) ditulis ke disk saat transaksi _commit_.
> >     
> >     - _Implikasi_: Membutuhkan **REDO** (karena saat commit, datanya mungkin masih di buffer dan bisa hilang jika _crash_).
> >         
> > 
> > Algoritma recovery yang kita bahas (slide 23-26) adalah untuk kebijakan **`steal` / `no-force`**, yang paling fleksibel dan umum digunakan.
> > 
> > **Latching**: Saat blok data di buffer akan ditulis ke disk, blok itu harus di-`latch`. `Latch` adalah mekanisme proteksi internal (bukan _lock_ transaksi) yang sangat singkat, memastikan tidak ada _update_ lain yang terjadi pada blok itu _selama_ proses I/O penulisan ke disk.

> [!cornell] #### Summary
> 
> **Algoritma recovery modern (berbasis `steal/no-force`) bekerja dalam dua fase: **Redo Phase** (memindai log** _**maju**_ **untuk mengulang** _**semua**_ **perubahan dan membangun `undo-list`) dan **Undo Phase** (memindai log** _**mundur**_ **untuk membatalkan transaksi di `undo-list` menggunakan** _**Compensation Log Records/CLR**_**). Agar ini aman, sistem** _**wajib**_ **mengikuti aturan **Write-Ahead Logging (WAL)**, yaitu** _**log**_ **(info undo) harus ada di** _**stable storage**_ _**sebelum**_ _**data**_ **yang diubahnya boleh ditulis ke disk.**

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis: Latch vs. Lock
> 
> Sangat penting untuk membedakan antara `latch` dan `lock`.
> 
> - **Lock (Kunci Transaksi)**:
>     
>     - **Tujuan**: Menjamin _isolasi_ antar transaksi (logika database).
>         
>     - **Durasi**: Dipegang selama transaksi berlangsung (bisa lama, dalam milidetik atau bahkan detik).
>         
>     - **Mekanisme**: Dikelola oleh _Transaction Manager_. Jika terjadi _deadlock_, satu transaksi akan di-_abort_.
>         
> - **Latch (Kait Internal)**:
>     
>     - **Tujuan**: Menjamin _konsistensi_ struktur data internal di _memory_ (fisik).
>         
>     - **Durasi**: Dipegang dalam durasi yang sangat singkat (nanodetik atau mikrodetik), hanya selama operasi fisik (misal: mengakses 1 blok buffer).
>         
>     - **Mekanisme**: Dikelola oleh _Buffer Manager_. _Deadlock_ tidak diizinkan terjadi (biasanya dihindari dengan _ordering_ atau _retry_).
>         
> 
> Contoh di slide 31 (mengambil _exclusive latch_ saat _output block_) adalah contoh sempurna penggunaan `latch` untuk proteksi fisik.
> 
> #### Pendalaman Teknis: ARIES
> 
> Algoritma yang dideskripsikan di slide ini adalah versi sederhana dari algoritma **ARIES (Algorithm for Recovery and Isolation Exploiting Semantics)**, yang merupakan standar industri. ARIES menggunakan:
> 
> 1. **WAL**: Seperti yang dijelaskan.
>     
> 2. **`steal` / `no-force`**: Kebijakan buffer yang fleksibel.
>     
> 3. **Repeating History during Redo**: Fase Redo di ARIES mengulang _semua_ aksi, bahkan aksi yang di-undo, untuk mengembalikan state _tepat_ seperti saat crash.
>     
> 4. **Logging Undo Actions (CLRs)**: Seperti yang dijelaskan, agar proses _undo_ bisa di-restart jika _crash_ terjadi di tengah _undo_.
>     
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Buku**: Silberschatz, Korth, Sudarshan, "Database System Concepts", 7th Ed, Chapter 19.6 - 19.7.
>     
> - **Paper**: "ARIES: A Transaction Recovery Method Supporting Fine-Granularity Locking and Partial Rollbacks Using Write-Ahead Logging" (C. Mohan, et al.) - _Paper fundamental di bidang ini._
>