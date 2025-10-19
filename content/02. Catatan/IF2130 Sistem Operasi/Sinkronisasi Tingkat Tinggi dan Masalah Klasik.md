---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF2130 Sistem Operasi]]

> [!cornell] Mekanisme Sinkronisasi Tingkat Tinggi dan Masalah Klasik
> 
> > ## Questions/Cues
> > 
> > - Apa itu masalah _Bounded-Buffer_?
> >     
> > - Apa itu masalah _Readers-Writers_?
> >     
> > - Apa itu masalah _Dining-Philosophers_?
> >     
> > - Apa kelemahan Semaphore?
> >     
> > - Apa itu _Monitor_?
> >     
> > - Apa itu _Condition Variable_?
> >     
> > 
> > ## Reference Points
> > 
> > - PDF: 5. IF2130-06-2025-Synchronization.pdf
> >     
> > - Slides: 43-68
>      
> > 
> > ### Masalah Sinkronisasi Klasik
> > 
> > Tiga masalah ini sering digunakan sebagai tolok ukur untuk menguji alat sinkronisasi baru.
> > 
> > **1. The Bounded-Buffer (Producer-Consumer) Problem**
> > 
> > - **Skenario**: Ada _producer_ yang menghasilkan item dan menaruhnya di buffer, dan _consumer_ yang mengambil item dari buffer. Buffer memiliki ukuran terbatas (`n`).
> >     
> > - **Tantangan Sinkronisasi**:
> >     
> >     - Producer tidak boleh menambah item jika buffer penuh.
> >         
> >     - Consumer tidak boleh mengambil item jika buffer kosong.
> >         
> >     - Akses ke buffer harus _mutually exclusive_.
> >         
> > - **Solusi dengan Semaphore**:
> >     
> >     - `mutex` (binary, inisialisasi 1): Untuk mutual exclusion saat mengakses buffer.
> >         
> >     - `full` (counting, inisialisasi 0): Menghitung jumlah slot yang terisi. Consumer akan `wait()` pada semaphore ini.
> >         
> >     - `empty` (counting, inisialisasi `n`): Menghitung jumlah slot yang kosong. Producer akan `wait()` pada semaphore ini.
> >         
> > 
> > **2. The Readers-Writers Problem**
> > 
> > - **Skenario**: Sebuah objek data (misal, file) diakses oleh banyak proses. Beberapa adalah _Readers_ (hanya membaca), beberapa adalah _Writers_ (bisa membaca dan menulis).
> >     
> > - **Tantangan Sinkronisasi**:
> >     
> >     - Beberapa _Reader_ boleh mengakses data secara bersamaan.
> >         
> >     - Hanya satu _Writer_ yang boleh mengakses data pada satu waktu (dan tidak boleh ada _Reader_ saat itu).
> >         
> > - **Solusi**: Menggunakan dua semaphore (`rw_mutex` untuk writer, `mutex` untuk melindungi counter) dan sebuah `read_count` untuk melacak jumlah _reader_ yang sedang aktif. Writer hanya bisa masuk jika tidak ada _reader_ maupun _writer_ lain.
> >     
> > 
> > **3. The Dining-Philosophers Problem**
> > 
> > - **Skenario**: Lima filsuf duduk di meja bundar dengan lima sumpit di antara mereka. Setiap filsuf butuh **dua** sumpit (kiri dan kanan) untuk makan. Mereka menghabiskan waktu dengan berpikir atau makan.
> >     
> > - **Tantangan Sinkronisasi**: Merancang protokol agar para filsuf bisa mengambil dan meletakkan sumpit tanpa menyebabkan **deadlock** (misalnya, semua mengambil sumpit kiri dan menunggu sumpit kanan selamanya) atau **starvation**.
> >     
> > 
> > ### Kelemahan Semaphore
> > 
> > Meskipun kuat, penggunaan semaphore sangat rentan terhadap kesalahan pemrograman sederhana, seperti:
> > 
> > - Tertukar antara `wait()` dan `signal()`.
> >     
> > - Lupa memanggil `wait()` atau `signal()`.
> >     
> > 
> > Kesalahan-kesalahan ini sangat sulit di-debug dan dapat menyebabkan pelanggaran _mutual exclusion_ atau _deadlock_.
> > 
> > ### Monitor: Abstraksi Tingkat Tinggi
> > 
> > **Monitor** adalah sebuah konstruksi bahasa pemrograman tingkat tinggi yang menyediakan _mutual exclusion_ secara otomatis dan aman.
> > 
> > - **Konsep**: Sebuah Monitor adalah sebuah _class_ atau modul yang membungkus variabel-variabel bersama dan prosedur-prosedur yang mengoperasikannya.
> >     
> > - **Jaminan**: Compiler secara otomatis memastikan bahwa **hanya satu thread yang bisa aktif di dalam monitor pada satu waktu**. Programmer tidak perlu lagi mengelola `mutex` secara manual.
> >     
> > 
> > ### Condition Variables
> > 
> > Monitor saja tidak cukup. Kita perlu cara agar sebuah thread di dalam monitor bisa menunggu kondisi tertentu terpenuhi tanpa melakukan _busy waiting_.
> > 
> > - **Condition Variable** adalah objek di dalam monitor yang memiliki dua operasi utama:
> >     
> >     1. **`x.wait()`**: Thread yang memanggil ini akan **melepaskan** _**lock**_ **monitor** secara otomatis dan tidur (menunggu) di antrian kondisi `x`.
> >         
> >     2. **`x.signal()`**: Membangunkan satu thread (jika ada) yang sedang menunggu di antrian kondisi `x`. Thread yang dibangunkan akan kembali mencoba mengambil _lock_ monitor sebelum melanjutkan.
> >         

> [!cornell] #### Summary
> 
> Masalah-masalah sinkronisasi klasik seperti Bounded-Buffer, Readers-Writers, dan Dining-Philosophers menyoroti kompleksitas dalam mengelola akses bersama dan menghindari deadlock. Meskipun Semaphore dapat menyelesaikannya, penggunaannya rentan terhadap error. Sebagai solusi, Monitor menyediakan abstraksi tingkat tinggi yang secara otomatis menjamin mutual exclusion. Di dalam monitor, Condition Variables dengan operasi wait() dan signal() memberikan mekanisme yang aman dan terstruktur bagi thread untuk menangguhkan eksekusinya hingga kondisi tertentu terpenuhi, sehingga menyederhanakan pemrograman konkuren secara signifikan.

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis 1: Solusi Dining Philosophers dengan Monitor
> 
> Monitor menyediakan solusi yang elegan untuk masalah Dining Philosophers yang bebas dari deadlock.
> 
> - **State**: Sebuah array `state` melacak kondisi setiap filsuf (THINKING, HUNGRY, EATING).
>     
> - **Condition Variable**: Sebuah array `self` dari _condition variable_, di mana setiap filsuf menunggu jika sumpitnya belum tersedia.
>     
> - **Logika `pickup(i)`**: Filsuf `i` menandai dirinya HUNGRY. Kemudian ia memanggil `test(i)` untuk memeriksa apakah tetangga kiri dan kanannya sedang tidak makan. Jika ya, ia bisa makan. Jika tidak, ia akan `self[i].wait()`.
>     
> - **Logika `putdown(i)`**: Filsuf `i` selesai makan dan kembali THINKING. Ia kemudian memanggil `test()` untuk tetangga kiri dan kanannya, memberi mereka kesempatan untuk makan jika mereka sedang HUNGRY dan sumpitnya kini tersedia.
>     
> 
> Solusi ini mencegah deadlock karena seorang filsuf hanya akan mengambil kedua sumpit (masuk ke state EATING) jika keduanya benar-benar tersedia.
> 
> #### Pendalaman Teknis 2: Signal and Wait vs. Signal and Continue
> 
> Ketika sebuah thread `P` memanggil `x.signal()` dan membangunkan thread `Q` yang sedang `x.wait()`, ada dua kemungkinan yang terjadi:
> 
> 1. **Signal and Wait**: `P` yang melakukan _signal_ akan langsung tidur, dan `Q` yang dibangunkan akan langsung berjalan. Setelah `Q` keluar dari monitor, `P` baru akan dibangunkan kembali.
>     
> 2. **Signal and Continue**: `P` yang melakukan _signal_ akan terus berjalan hingga ia keluar dari monitor. `Q` yang dibangunkan hanya dipindahkan ke antrian masuk monitor dan harus kembali bersaing untuk mendapatkan _lock_ setelah `P` keluar. Ini adalah implementasi yang paling umum (misalnya di Java).
>     
> 
> #### Eksplorasi Mandiri
> 
> - **Lihat implementasi Java**: Bahasa pemrograman Java memiliki dukungan bawaan untuk monitor melalui kata kunci `synchronized`. Setiap objek Java memiliki _intrinsic lock_. Metode `wait()`, `notify()`, dan `notifyAll()` pada objek berfungsi sebagai _condition variable_. Pelajari bagaimana ketiga metode ini digunakan untuk mengimplementasikan solusi Producer-Consumer di Java.
>