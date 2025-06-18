---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[IF2010 Pemrograman Berorientasi Objek]]
> [!cornell] Topic
> > ## Questions/Cues
> >
> > - Apa itu Multithreading?
> > - Kenapa Perlu Multithreading?
> > - Cara Implementasi: `extends Thread`
> > - Cara Implementasi: `implements Runnable`
> > - Kapan `extends` vs `implements`?
> > - Penggunaan Lambda Expression
> > - Alternatif: `Timer` & `TimerTask`
> > - Penundaan & Siklus Hidup
> > - Masalah: Race Condition
> > - Solusi 1: `synchronized`
> > - Masalah: Busy Waiting
> > - Solusi 2: `wait()` & `notify()`
> 
> > ### Apa itu Multithreading?
> > Sebuah model eksekusi yang memungkinkan beberapa _thread_ (urutan terkecil dari instruksi) berjalan secara independen dalam satu proses yang sama. Mereka berbagi sumber daya proses, seperti memori.
> > 
> > **Kenapa Perlu Multithreading?**
> > - **Aplikasi GUI:** Agar antarmuka tidak "hang" atau macet saat melakukan pemrosesan yang lama (misal: download file, generate laporan).
> > - **Aplikasi Server:** Menangani banyak koneksi atau event secara bersamaan (misal: Web Server, Chat Server).
> > - **Efisiensi:** Menjalankan tugas yang saling `bottleneck` secara bersamaan.
> > 	
> > **Cara Implementasi: `extends Thread`**
> > - Buat kelas yang mewarisi (extends) dari kelas `Thread`.
> > - Timpa (override) method `run()` untuk mendefinisikan pekerjaan yang akan dilakukan oleh thread.
> > - Buat instance dari kelas tersebut dan panggil method `.start()` untuk menjalankannya.
> > 
> >     ```java
> >     class MyThread extends Thread {
> >         @Override public void run() { /* ...pekerjaan... */ }
> >     }
> >     // ...
> >     new MyThread().start();
> >     ```
> >     
> > **Cara Implementasi: `implements Runnable`**
> > - Buat kelas yang mengimplementasikan interface `Runnable`.
> > - Implementasikan method `run()` dari interface tersebut.
> > - Buat instance dari kelas `Runnable` Anda, lalu buat instance dari kelas `Thread` dengan melewatkan objek `Runnable` Anda ke konstruktornya. Panggil `.start()` pada objek `Thread`.
> >     
> >     ```java
> >     class MyRunnable implements Runnable {
> >         @Override public void run() { /* ...pekerjaan... */ }
> >     }
> >     // ...
> >     Runnable r = new MyRunnable();
> >     new Thread(r).start();
> >     ```
> >     
> > **Kapan `extends Thread` vs `implements Runnable`?**  
> > - Gunakan `implements Runnable` jika kelas Anda sudah `extends` kelas lain, karena Java tidak mendukung multiple inheritance.
> > - `Runnable` lebih disukai karena memisahkan tugas (`Runnable`) dari mekanisme eksekusi (`Thread`). Satu objek `Runnable` yang sama bisa dijalankan oleh beberapa `Thread`.
> > - Gunakan `extends Thread` jika Anda perlu mengubah perilaku dasar dari `Thread` itu sendiri.
> > 
> > **Penggunaan Lambda Expression (Java 8+)**
> >  Karena `Runnable` adalah _functional interface_ (hanya punya satu abstract method), ia bisa diimplementasikan dengan ringkas menggunakan lambda expression.
> >     
> > ```java
> > Runnable r = () -> { /* ...pekerjaan... */ };
> > new Thread(r).start();
> > ```
> >     
> > **Alternatif: `Timer` & `TimerTask`**
> > - Sebuah utilitas di `java.util` untuk menjadwalkan aksi agar dijalankan secara periodik di thread terpisah, tanpa perlu membuat thread manual.
> > - Aksi didefinisikan dalam kelas turunan `TimerTask` (dalam method `run()`), dan dijadwalkan oleh objek `Timer`.
> > 
> > **Penundaan & Siklus Hidup**
> > - Thread hidup selama method `run()`-nya masih berjalan.
> > - `Thread.sleep(milidetik)` akan menunda eksekusi thread saat ini selama waktu yang ditentukan.
> > - Thread bisa berhenti sementara (suspend) karena `sleep()`, menunggu I/O, atau memanggil `wait()`.
> >  
> > **Masalah: Race Condition**
> >     
> > - Terjadi ketika dua atau lebih thread mengakses dan memanipulasi data bersama (shared data) secara bersamaan, dan hasil akhirnya bergantung pada urutan eksekusi yang tidak bisa diprediksi.e
> > - **Contoh:** Operasi `playerCount++` bukanlah operasi tunggal (atomic). Ia terdiri dari tiga langkah: (1) baca nilai lama, (2) tambah 1, (3) simpan nilai baru. Jika dua thread melakukan ini bersamaan, mereka bisa membaca nilai lama yang sama, sehingga salah satu hasil `increment` akan hilang.
> > - **Solusi 1: `synchronized`**
> >     
> >     - Sebuah keyword di Java yang memastikan hanya satu thread yang bisa mengeksekusi sebuah blok kode atau method pada satu instance objek pada satu waktu.
> >     - Ketika sebuah thread masuk ke blok/method `synchronized`, ia akan "mengunci" objek tersebut, dan thread lain harus menunggu sampai kunci dilepaskan.
> >     - Dapat diterapkan pada method (`public synchronized void myMethod()`) atau sebagai blok (`synchronized(this) { ... }`).
> > 
> > **Masalah: Busy Waiting**
> > - Kondisi di mana sebuah thread terus-menerus memeriksa sebuah kondisi dalam sebuah loop (misal: `while(!available);`) tanpa melakukan pekerjaan lain. Ini sangat tidak efisien karena membuang-buang siklus CPU.
> > - **Solusi 2: `wait()` & `notify()`**
> >     
> >     - Mekanisme komunikasi antar-thread untuk menghindari _busy waiting_. Harus digunakan di dalam blok/method `synchronized`.
> >     - **`wait()`**: Menyebabkan thread saat ini melepaskan kunci dan masuk ke kondisi "menunggu". Ia akan "tertidur" sampai thread lain memanggil `notify()` atau `notifyAll()` pada objek yang sama.
> >     - **`notify()` / `notifyAll()`**: Membangunkan satu (`notify`) atau semua (`notifyAll`) thread yang sedang menunggu pada objek tersebut, agar mereka bisa mencoba mendapatkan kunci kembali dan melanjutkan eksekusi.
> >     - **Pola Produser-Konsumer**: Kasus klasik penggunaan `wait()`/`notify()`. Produser akan `wait()` jika wadah penuh dan `notify()` setelah menaruh barang. Konsumer akan `wait()` jika wadah kosong dan `notify()` setelah mengambil barang.
> > 

> [!cornell] #### Summary
> Multithreading memungkinkan eksekusi beberapa tugas secara bersamaan untuk meningkatkan responsivitas dan efisiensi, yang diimplementasikan dengan `extends Thread` atau `implements Runnable`. Namun, ini memperkenalkan masalah seperti _race condition_ pada data bersama. Java menyediakan solusi melalui keyword `synchronized` untuk menjamin akses eksklusif (locking), serta mekanisme `wait()` dan `notify()` untuk koordinasi antar-thread yang efisien, menghindari _busy waiting_ dalam pola seperti Produser-Konsumer.**

> [!ad-libitum]- Additional Information (Optional)
> #### Include material that's interesting but not essential:
> - Historical context
> - Related concepts
> - Further reading
> - Practical applications