---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3140 Sistem Basis Data]]

> [!cornell]  1.1: Pengantar Concurrency Control & Jenis Kunci
> 
> > ## Questions/Cues
> > 
> > - Mengapa perlu CC?
> >     
> > - Apa itu _Lock_?
> >     
> > - Apa itu _Lock-Based Protocol_?
> >     
> > - Apa saja jenis Kunci (Lock)?
> >     
> > - Apa itu _Lock-S_ (Shared)?
> >     
> > - Apa itu _Lock-X_ (Exclusive)?
> >     
> > - Apa itu _Lock Compatibility_?
> >     
> > - Apa itu _Locking Protocol_?
> >     
> > - Apa itu _Lock Upgrade_?
> >     
> >
> > ## Reference Points
> > 
> > - Slides "11 - Concurrency Control - 1.pdf" (Hal 5-10, 17-18)
> >     
> 
> > ### Latar Belakang: Masalah Konkurensi
> > 
> > Dalam sistem basis data, beberapa transaksi (operasi pengguna) bisa berjalan secara bersamaan (konkuren) untuk meningkatkan performa.
> > 
> > **Masalah:** Jika beberapa transaksi mengakses (membaca/menulis) item data yang sama secara bersamaan tanpa aturan, ini dapat menyebabkan **inkonsistensi data** atau **anomali**.
> > 
> > **Contoh Anomali:** _**Lost Update Problem**_
> > 
> > 1. **Awal:** Saldo rekening A = Rp 1.000.000.
> >     
> > 2. **T1 (Transfer):** `read(A)`. T1 melihat A = 1.000.000.
> >     
> > 3. **T2 (Tarik Tunai):** `read(A)`. T2 juga melihat A = 1.000.000.
> >     
> > 4. **T1:** Menghitung `A = A - 100.000` (menjadi 900.000).
> >     
> > 5. **T2:** Menghitung `A = A - 200.000` (menjadi 800.000).
> >     
> > 6. **T1:** `write(A)`. Saldo A di database menjadi Rp 900.000.
> >     
> > 7. **T2:** `write(A)`. Saldo A di database menjadi Rp 800.000.
> >     
> > 
> > **Hasil:** Operasi T1 (transfer 100.000) **HILANG**. Ini tidak bisa diterima.
> > 
> > ### Apa itu Lock (Kunci)?
> > 
> > **Lock** adalah mekanisme kontrol akses yang paling umum digunakan.
> > 
> > Bayangkan _lock_ sebagai sebuah "penanda" atau "bendera" yang terkait dengan setiap item data di database (misalnya, satu baris data atau satu tabel).
> > 
> > Sebelum sebuah transaksi diizinkan untuk mengakses (membaca atau menulis) sebuah item data, ia harus terlebih dahulu **meminta (request)** dan **mendapatkan (grant)** kunci untuk item data tersebut dari sistem (disebut _Lock Manager_).
> > 
> > ### Apa itu Lock-Based Protocol?
> > 
> > Ini adalah pendekatan _Concurrency Control_ (CC) di mana kita menggunakan kunci (_locks_) untuk memastikan eksekusi yang _serializable_ (terisolasi dan konsisten).
> > 
> > Ide dasarnya: Setiap transaksi harus mendapatkan kunci pada data _sebelum_ mengaksesnya. Jika data sudah dikunci oleh transaksi lain dengan cara yang tidak kompatibel, transaksi yang meminta harus **menunggu** (_wait_).
> > 
> > ### Jenis-Jenis Kunci Utama
> > 
> > Ada dua mode kunci dasar yang digunakan:
> > 
> > 1. **Shared (lock-S) / Kunci Bersama:**
> >     
> >     - **Tujuan:** Untuk **Membaca** data.
> >         
> >     - **Aturan:** Jika transaksi T memegang `lock-S` pada data Q, T diizinkan untuk `read(Q)`, tetapi **tidak diizinkan** untuk `write(Q)`.
> >         
> >     - **Sifat:** _Shared_ (Bersama) berarti beberapa transaksi bisa memegang `lock-S` pada item data yang sama secara bersamaan. (Contoh: Banyak orang boleh membaca artikel koran yang sama pada saat yang sama).
> >         
> > 2. **Exclusive (lock-X) / Kunci Eksklusif:**
> >     
> >     - **Tujuan:** Untuk **Menulis** (dan Membaca) data.
> >         
> >     - **Aturan:** Jika transaksi T memegang `lock-X` pada data Q, T diizinkan untuk `read(Q)` **dan** `write(Q)`.
> >         
> >     - **Sifat:** _Exclusive_ (Eksklusif) berarti **hanya satu** transaksi yang boleh memegang `lock-X` pada item data Q pada satu waktu. Tidak ada transaksi lain yang boleh memegang kunci _apapun_ (baik S maupun X) pada Q.
> >         
> > 
> > ### Matriks Kompatibilitas Kunci (Lock Compatibility)
> > 
> > Matriks ini menentukan apakah permintaan kunci baru (`lock request`) dari Transaksi T2 dapat dikabulkan jika Transaksi T1 sudah memegang kunci (`lock held`) pada data yang sama.
> > 
> > |**(T1 holds)**|**S (T2 req)**|**X (T2 req)**|
> > |---|---|---|
> > |**S** (T1 holds)|**Boleh**|**Tunggu**|
> > |**X** (T1 holds)|**Tunggu**|**Tunggu**|
> > 
> > **Penjelasan (Wajib Paham):**
> > 
> > - **S-S (Boleh):** Jika T1 sedang membaca (S), T2 juga boleh ikut membaca (S). Ini tidak menimbulkan konflik.
> >     
> > - **S-X (Tunggu):** Jika T1 sedang membaca (S), T2 tidak boleh menulis (X). T2 harus menunggu T1 selesai membaca dan melepaskan kuncinya.
> >     
> > - **X-S (Tunggu):** Jika T1 sedang menulis (X), T2 tidak boleh membaca (S). T2 harus menunggu T1 selesai menulis agar tidak membaca data yang "setengah jadi" (_dirty read_).
> >     
> > - **X-X (Tunggu):** Jika T1 sedang menulis (X), T2 jelas tidak boleh ikut menulis (X).
> >     
> > 
> > ### Apa itu Locking Protocol?
> > 
> > Sebuah **Protokol** adalah **seperangkat aturan** yang harus dipatuhi oleh semua transaksi.
> > 
> > Aturan ini mendefinisikan _kapan_ sebuah transaksi harus meminta kunci (`lock`) dan _kapan_ ia boleh melepaskan kunci (`unlock`).
> > 
> > **Penting:** Hanya menggunakan `lock-S` dan `lock-X` saja **TIDAK CUKUP** untuk menjamin _serializability_. Kita butuh protokol yang ketat, yang paling terkenal adalah _Two-Phase Locking_ (akan dibahas di catatan 1.2).
> > 
> > ### Konversi Kunci (Lock Conversion)
> > 
> > Seringkali sebuah transaksi perlu mengubah jenis kunci yang dipegangnya.
> > 
> > 1. **Lock Upgrade (S -> X):**
> >     
> >     - **Skenario:** Sebuah transaksi T awalnya hanya `read(Q)`, jadi ia mendapatkan `lock-S`. Namun, di tengah jalan, T sadar ia juga perlu `write(Q)`.
> >         
> >     - **Tindakan:** T akan meminta _upgrade_ kuncinya dari `lock-S` menjadi `lock-X`.
> >         
> >     - **Aturan:** Permintaan _upgrade_ ini hanya bisa dikabulkan jika T adalah **satu-satunya** transaksi yang memegang `lock-S` pada Q. Jika ada transaksi lain (misal T2) yang juga sedang memegang `lock-S`, maka T harus **menunggu** T2 melepaskan kuncinya terlebih dahulu.
> >         
> > 2. **Lock Downgrade (X -> S):**
> >     
> >     - **Skenario:** Transaksi T sudah selesai melakukan `write(Q)` (dengan `lock-X`), tetapi masih perlu `read(Q)` untuk beberapa waktu dan tidak akan menulis lagi.
> >         
> >     - **Tindakan:** T bisa melakukan _downgrade_ kuncinya dari `lock-X` ke `lock-S`.
> >         
> >     - **Keuntungan:** Ini memungkinkan transaksi lain yang menunggu untuk `read(Q)` agar bisa segera mendapatkan `lock-S` mereka, sehingga meningkatkan konkurensi.
> >         

> [!cornell] #### Summary
> 
> **Untuk mencegah anomali data akibat eksekusi konkuren (seperti** _**Lost Update Problem**_**),** _**Lock-Based Protocol**_ **digunakan sebagai mekanisme kontrol. Mekanisme ini bergantung pada** _**Kunci (Locks)**_**, yaitu penanda pada item data. Terdapat dua jenis kunci utama:** _**Shared (lock-S)**_ **untuk operasi baca (bisa digunakan bersamaan) dan** _**Exclusive (lock-X)**_ **untuk operasi tulis (hanya boleh satu transaksi). Interaksi antar kunci ini diatur oleh** _**Matriks Kompatibilitas**_ **(S-S boleh, lainnya harus tunggu). Sebuah** _**Locking Protocol**_ **adalah seperangkat aturan ketat tentang kapan harus meminta, melepaskan, atau meng-konversi (misal** _**upgrade**_ **S ke X) kunci untuk menjamin konsistensi data.**

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman: Implementasi _Lock Manager_ & _Lock Table_
> 
> Di dalam sistem DBMS, ada sebuah komponen (proses) terpisah yang disebut **Lock Manager**. Tugasnya adalah mengelola semua permintaan _lock_ dan _unlock_ dari semua transaksi.
> 
> _Lock Manager_ memelihara sebuah struktur data di memori yang disebut **Lock Table**.
> 
> - **Struktur Lock Table:** Ini pada dasarnya adalah sebuah _Hash Table_ atau _Tree_.
>     
> - **Key:** Kunci dari tabel ini adalah _identifier_ dari item data yang sedang dikunci (misal, ID baris, ID halaman).
>     
> - **Value:** Untuk setiap item data, _Lock Table_ menyimpan informasi berikut:
>     
>     1. **Jenis Kunci yang Diberikan:** Tipe kunci apa yang sedang aktif (S, X, atau mungkin tidak ada).
>         
>     2. **Daftar Transaksi (Granted):** Transaksi mana saja yang _sedang_ memegang kunci tersebut. (Bisa lebih dari satu jika kuncinya Shared).
>         
>     3. **Antrian Tunggu (Waiting Queue):** Daftar transaksi yang _sedang menunggu_ untuk mendapatkan kunci pada data ini, beserta mode kunci yang mereka minta (S atau X). Ini biasanya diimplementasikan sebagai antrian (FIFO - First In First Out) untuk menjamin _fairness_.
>         
> 
> **Proses:**
> 
> 1. Transaksi T1 mengirim pesan `Request(lock-X, Q)` ke Lock Manager.
>     
> 2. Lock Manager mengecek _Lock Table_ untuk data Q.
>     
> 3. **Kasus 1 (Data Q bebas):** Lock Manager memberikan `lock-X` ke T1, mencatatnya di _Lock Table_, dan mengirim pesan `Grant` ke T1. T1 lanjut berjalan.
>     
> 4. **Kasus 2 (Data Q sudah di-lock-S oleh T2):** Lock Manager melihat permintaan `lock-X` dari T1 tidak kompatibel. T1 dimasukkan ke dalam _Waiting Queue_ untuk data Q. T1 akan di-blokir (tidur) sampai T2 melepaskan kuncinya.
>     
> 
> #### Eksplorasi Mandiri: Biaya (Overhead) dari Locking
> 
> Menggunakan _lock_ tidak gratis. Ini menimbulkan _overhead_ (beban kerja tambahan) pada sistem:
> 
> - **Overhead Komunikasi:** Waktu yang dibutuhkan transaksi untuk mengirim pesan _request/release_ ke _Lock Manager_ dan menerima balasan _grant_.
>     
> - **Overhead Manajemen:** Waktu dan memori yang digunakan _Lock Manager_ untuk mengelola _Lock Table_ (mencari, menyisipkan, menghapus entri).
>     
> - **Overhead Blocking:** Ini adalah biaya terbesar. Waktu yang dihabiskan oleh sebuah transaksi untuk **menunggu** kunci dilepaskan oleh transaksi lain. Semakin banyak _blocking_, semakin rendah _throughput_ (jumlah transaksi yang bisa diselesaikan per detik).
>     
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Buku Teks:** Silberschatz, Korth, and Sudarshan, "Database System Concepts" (Edisi 7), Chapter 18. (Ini adalah sumber utama dari slide Anda).
>