---
type: Note

cssclasses:
- cornell-notes
---
_Back to_ [[IF3130 Sistem Paralel dan Terdistribusi]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> >
> > - Apa itu Model Shared Memory?
> >     
> > - Perbedaan Proses dan Thread?
> >     
> > - Apa itu Pthreads?
> >     
> > - Bagaimana cara membuat thread?
> >     
> > - Bagaimana menunggu thread selesai?
> >     
> > - Bagaimana struktur dasar program Pthreads?
> >     
> > - Cara kompilasi program Pthreads?
> >     
> >
> > ## Reference Points
> >
> > - Slide "paralel programming model: shared memory" (Hal. 1-24)
>  
> >
> > ### Model Pemrograman Shared Memory
> > 
> > ![[Pasted image 20250916083421.png]]
> > Model _shared memory_ adalah arsitektur komputasi paralel di mana beberapa Unit Pemroses Sentral (CPU) memiliki akses ke satu ruang memori utama yang sama.
> >
> > - **Komponen**: Terdiri dari beberapa CPU, sebuah _interconnect_ (jalur komunikasi), dan satu blok memori.
> >     
> > - **Cara Kerja**: Semua CPU dapat membaca dan menulis ke lokasi memori yang sama. Komunikasi antar CPU terjadi secara implisit dengan memodifikasi data di memori bersama ini. Ini berbeda dengan model _distributed memory_ di mana setiap prosesor memiliki memorinya sendiri.
> >     
> >
> > ### Proses vs. Thread
> >
> > - **Proses**: Sebuah instans dari program yang sedang berjalan. Setiap proses memiliki ruang memori, data, dan state-nya sendiri yang terisolasi dari proses lain.
> >     
> > - **Thread**: Sering disebut sebagai "proses ringan" (_light-weight process_). Dalam model _shared memory_, satu proses dapat memiliki beberapa thread yang berjalan secara bersamaan. Semua thread dalam satu proses berbagi ruang memori yang sama (termasuk variabel global), namun masing-masing memiliki _stack_ eksekusi dan _instruction pointer_-nya sendiri.
> >     
> >
> > ### Pthreads (POSIX Threads)
> >
> > Pthreads adalah sebuah standar API (_Application Programming Interface_) yang mendefinisikan cara membuat dan mengelola thread dalam bahasa C.
> >
> > - **Standar**: Merupakan standar POSIX untuk sistem operasi mirip Unix (seperti Linux, macOS, Solaris).
> >     
> > - **Bentuk**: Berupa sebuah _library_ (`libpthread`) yang harus di-_link_ saat kompilasi.
> >     
> > - **Tujuan**: Menyediakan serangkaian fungsi, tipe data, dan konstanta untuk memfasilitasi pemrograman _multi-threaded_.
> >     
> >
> > ### Struktur Dasar Program Pthreads
> >
> > Program Pthreads umumnya memiliki alur sebagai berikut:
> >
> > 1. **Inisialisasi**: _Main thread_ (program utama) dieksekusi terlebih dahulu.
> >     
> > 2. **Pembuatan Thread**: _Main thread_ membuat beberapa thread baru menggunakan fungsi `pthread_create`. Setiap thread akan menjalankan fungsi yang telah ditentukan.
> >     
> > 3. **Eksekusi Paralel**: Semua thread (termasuk _main thread_) berjalan secara bersamaan dan dapat mengakses variabel global yang sama.
> >     
> > 4. **Sinkronisasi/Join**: _Main thread_ menunggu semua thread yang dibuatnya selesai menjalankan tugasnya dengan menggunakan fungsi `pthread_join`. Ini penting untuk memastikan semua pekerjaan selesai sebelum program berakhir.
> >     
> > 5. **Pembersihan & Selesai**: Setelah semua thread selesai, _main thread_ dapat melanjutkan eksekusinya, melakukan pembersihan (seperti membebaskan memori), dan kemudian keluar.
> >     
> >
> > ### Fungsi Inti Pthreads: `pthread_create` dan `pthread_join`
> >
> > - **`int pthread_create(...)`**: Fungsi untuk membuat (memulai) sebuah thread baru.
> >     
> >     - **Argumen 1 (`pthread_t* thread_p`)**: Pointer ke sebuah variabel `pthread_t` yang akan menyimpan ID unik dari thread yang baru dibuat.
> >         
> >     - **Argumen 2 (`attr_p`)**: Atribut untuk thread (biasanya `NULL` untuk pengaturan default).
> >         
> >     - **Argumen 3 (`start_routine`)**: Pointer ke fungsi yang akan dieksekusi oleh thread baru. Fungsi ini harus memiliki prototipe `void* nama_fungsi(void*)`.
> >         
> >     - **Argumen 4 (`arg_p`)**: Pointer ke argumen yang akan dilewatkan ke `start_routine`. Jika perlu mengirim lebih dari satu nilai, bisa menggunakan pointer ke sebuah `struct`.
> >         
> > - **`int pthread_join(...)`**: Fungsi untuk memblokir eksekusi _thread_ pemanggil (misalnya, _main thread_) sampai _thread_ target selesai.
> >     
> >     - **Argumen 1 (`pthread_t thread`)**: Handle atau ID dari thread yang akan ditunggu.
> >         
> >     - **Argumen 2 (`retval`)**: Pointer untuk menyimpan nilai yang dikembalikan oleh fungsi thread.
> >         
> >
> > ### Kompilasi Program Pthreads
> >
> > Untuk mengompilasi program C yang menggunakan Pthreads, kita perlu me-_link_ _library_ Pthreads. Ini dilakukan dengan menambahkan flag `-lpthread` pada akhir perintah `gcc`.
> >
> > ```bash
> > gcc -g -Wall -o nama_program nama_file.c -lpthread
> > ```
> > 
> > ### Eksekusi Program Pthreads
> > Untuk eksekusi program C yang menggunakan Pthreads, sertakan argumen ke-1 (setelah nama file) yang berisi jumlah _thread_ yang akan digunakan.
> > 
> > ```bash
> > ./pth_hello 1
> > ./pth_hello 4
> > ```
> > 

> [!cornell] #### Summary
> Model pemrograman shared memory memungkinkan beberapa _**thread**_, yang merupakan unit eksekusi ringan dalam satu proses, untuk beroperasi secara bersamaan dengan mengakses ruang memori yang sama. Pthreads (POSIX Threads) adalah standar API C untuk membuat dan mengelola _**thread**_ ini, menggunakan fungsi inti seperti `pthread_create` untuk memulai eksekusi _**thread**_ dan `pthread_join` untuk menunggu penyelesaiannya, yang menjadi fondasi untuk paralelisasi tugas.