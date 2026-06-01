---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF2130 Sistem Operasi]]

> [!cornell] Masalah Sinkronisasi dan Solusi Dasar
> 
> > ## Questions/Cues
> > 
> > - Mengapa perlu sinkronisasi?
> >     
> > - Apa itu _Race Condition_?
> >     
> > - Apa itu _Critical Section_?
> >     
> > - Apa 3 syarat solusi _Critical Section Problem_?
> >     
> > - Apa itu _Mutex Lock_?
> >     
> > - Apa itu _busy waiting_/_spinlock_?
> >     
> > - Apa itu _Semaphore_?
> >     
> > - Beda _counting_ vs _binary semaphore_?
> >     
> > - Apa itu _Deadlock_ dan _Starvation_?
> >     
> > 
> > ## Reference Points
> > 
> > - PDF: 5. IF2130-06-2025-Synchronization.pdf
> >     
> > - Slides: 4-42
> >     
>  
> > ### Latar Belakang: Inkonsistensi Data
> > 
> > Proses atau thread yang kooperatif seringkali berbagi data (variabel, buffer, dll). Jika beberapa proses/thread mencoba mengakses dan memanipulasi data bersama secara bersamaan, hasilnya bisa menjadi kacau dan tidak dapat diprediksi.
> > 
> > ### Race Condition
> > 
> > **Race Condition** adalah situasi di mana beberapa proses/thread mengakses dan memanipulasi data bersama secara konkuren, dan hasil akhir dari data tersebut bergantung pada urutan eksekusi yang "kebetulan" terjadi.
> > 
> > **Contoh Klasik**: Operasi `counter++` dan `counter--`. Di level mesin, operasi ini terdiri dari tiga instruksi (load, increment/decrement, store). Jika eksekusi dari dua thread yang melakukan operasi ini saling tumpang tindih (_interleaved_), hasil akhirnya bisa salah.
> > 
> > ### The Critical-Section Problem
> > 
> > - **Critical Section**: Bagian dari kode program di mana sebuah proses mengakses sumber daya bersama (shared resource).
> >     
> > - **Tujuan**: Mendesain sebuah protokol yang memastikan bahwa ketika satu proses sedang mengeksekusi di dalam _critical section_-nya, tidak ada proses lain yang boleh masuk ke _critical section_ mereka (yang mengakses sumber daya yang sama).
> >     
> > 
> > ### Syarat Solusi Critical-Section
> > 
> > 1. **Mutual Exclusion (Eksklusi Mutual)**: Jika satu proses ada di dalam _critical section_, maka tidak boleh ada proses lain yang berada di dalam _critical section_ mereka.
> >     
> > 2. **Progress (Kemajuan)**: Jika tidak ada proses di _critical section_ dan ada beberapa proses yang ingin masuk, maka pemilihan proses berikutnya tidak boleh ditunda tanpa batas.
> >     
> > 3. **Bounded Waiting (Tunggu Terbatas)**: Harus ada batas berapa kali proses lain diizinkan masuk ke _critical section_ setelah sebuah proses mengajukan permintaan, untuk mencegah _starvation_.
> >     
> > 
> > ### Solusi 1: Mutex Locks
> > 
> > **Mutex (Mutual Exclusion) Lock** adalah alat sinkronisasi paling sederhana. Ia bekerja seperti kunci pintu.
> > 
> > - Sebuah proses harus **mengambil kunci (`acquire()`)** sebelum masuk ke _critical section_.
> >     
> > - Setelah selesai, ia harus **melepaskan kunci (`release()`)**.
> >     
> > 
> > Jika proses mencoba `acquire()` saat kunci sedang dipegang, ia harus menunggu. Implementasi sederhana dari `acquire()` seringkali menggunakan **busy waiting** (terus-menerus memeriksa apakah kunci sudah tersedia). Kunci yang menggunakan _busy waiting_ disebut **spinlock**.
> > 
> > ### Solusi 2: Semaphores
> > 
> > **Semaphore** adalah variabel integer yang lebih general daripada mutex dan hanya bisa diakses melalui dua operasi atomik:
> > 
> > 1. **`wait(S)`** atau `P(S)`: Mengurangi nilai semaphore `S`. Jika `S` menjadi negatif, proses yang memanggil akan diblokir (tidur) dan dimasukkan ke dalam antrian tunggu.
> >     
> > 2. **`signal(S)`** atau `V(S)`: Menambah nilai semaphore `S`. Jika ada proses yang sedang menunggu di antrian, satu proses akan "dibangunkan" dan dipindahkan ke _ready queue_.
> >     
> > 
> > **Jenis Semaphore**:
> > 
> > - **Counting Semaphore**: Nilainya bisa berapa saja. Digunakan untuk mengontrol akses ke sumber daya yang jumlahnya terbatas (misal, `N` slot buffer).
> >     
> > - **Binary Semaphore**: Nilainya hanya bisa 0 atau 1. Berfungsi seperti mutex lock.
> >     
> > 
> > ### Deadlock dan Starvation
> > 
> > - **Deadlock**: Situasi di mana dua atau lebih proses saling menunggu sumber daya yang dipegang oleh proses lain dalam set tersebut, sehingga tidak ada yang bisa maju.
> >     
> > - **Starvation**: Sebuah proses tidak pernah mendapat giliran karena terus-menerus "kalah saing" oleh proses-proses lain.
> >     

> [!cornell] #### Summary
> 
> Sinkronisasi diperlukan untuk mencegah inkonsistensi data akibat race condition saat beberapa proses/thread mengakses sumber daya bersama di dalam critical section. Solusi yang baik harus memenuhi syarat mutual exclusion, progress, dan bounded waiting. Alat sinkronisasi dasar termasuk Mutex Lock yang bekerja seperti kunci pintu (seringkali dengan busy waiting), dan Semaphore, sebuah variabel integer yang dikelola oleh operasi atomik wait() (untuk mengambil sumber daya/menunggu) dan signal() (untuk melepaskan sumber daya/membangunkan) untuk mengoordinasikan eksekusi tanpa menyebabkan deadlock atau starvation.