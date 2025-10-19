---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF2130 Sistem Operasi]]

> [!cornell] Operasi pada Proses dan Komunikasi Antar Proses (IPC)
> 
> > ## Questions/Cues
> > 
> > - Bagaimana proses diciptakan?
> >     
> > - Apa itu model Parent-Child?
> >     
> > - Apa fungsi `fork()` dan `exec()`?
> >     
> > - Bagaimana proses dihentikan (_terminate_)?
> >     
> > - Apa itu _cascading termination_?
> >     
> > - Apa beda proses independen vs kooperatif?
> >     
> > - Apa itu IPC?
> >     
> > - Beda model _Shared Memory_ vs _Message Passing_?
> >     
> > - Apa itu _Sockets_ dan RPC?
> >     
> > 
> > ## Reference Points
> > 
> > - PDF: 2. IF2130-02-2025-Processpdf.pdf
> >     
> > - Slides: 19-60
>    
> > 
> > ### Penciptaan Proses
> > 
> > Proses dapat membuat proses lain, menciptakan hubungan **parent-child**. Proses yang membuat disebut _parent_, dan proses baru yang dibuat disebut _child_. Ini membentuk sebuah pohon proses.
> > 
> > Di sistem UNIX/Linux, penciptaan proses menggunakan dua _system call_ utama:
> > 
> > 1. **`fork()`**: Membuat proses anak baru yang merupakan duplikat identik dari proses induk. Proses anak ini memiliki ruang alamat yang sama, tetapi PID yang berbeda. Setelah `fork()`, ada dua proses yang menjalankan kode yang sama dari titik di mana `fork()` dipanggil.
> >     
> > 2. **`exec()`**: Digunakan setelah `fork()` oleh proses anak untuk **mengganti** seluruh ruang memorinya dengan program baru. `exec()` memuat program baru dan mulai menjalankannya dari awal.
> >     
> > 
> > Proses induk bisa berjalan secara konkuren dengan anaknya atau menunggu (`wait()`) hingga anaknya selesai.
> > 
> > ### Penghentian Proses
> > 
> > Sebuah proses berhenti (_terminate_) ketika:
> > 
> > - Ia selesai mengeksekusi instruksi terakhirnya dan memanggil _system call_ `exit()` secara sukarela.
> >     
> > - Proses lain (biasanya induknya) menghentikannya secara paksa (_abort_), misalnya karena anak melebihi batas sumber daya.
> >     
> > 
> > **Cascading Termination**: Jika sebuah proses induk berhenti, beberapa sistem operasi akan secara otomatis menghentikan semua proses anaknya.
> > 
> > ### Proses Kooperatif dan IPC
> > 
> > - **Independent Process**: Tidak dapat memengaruhi atau dipengaruhi oleh proses lain.
> >     
> > - **Cooperating Process**: Dapat memengaruhi atau dipengaruhi oleh proses lain. Keuntungannya: berbagi informasi, mempercepat komputasi, modularitas.
> >     
> > 
> > Proses kooperatif memerlukan mekanisme **Inter-Process Communication (IPC)**. Ada dua model utama IPC:
> > 
> > **1. Shared Memory**
> > 
> > - OS membuat sebuah segmen memori yang dapat diakses oleh beberapa proses.
> >     
> > - Komunikasi terjadi dengan membaca dan menulis ke area memori bersama ini.
> >     
> > - **Keuntungan**: Sangat cepat (tidak ada overhead kernel setelah setup).
> >     
> > - **Kelemahan**: Programmer bertanggung jawab penuh untuk memastikan sinkronisasi agar tidak terjadi _race condition_.
> >     
> > 
> > **2. Message Passing**
> > 
> > - Proses berkomunikasi dengan mengirim dan menerima pesan melalui kernel, tanpa berbagi ruang alamat.
> >     
> > - Kernel menyediakan _system call_ `send(destination, message)` dan `receive(source, message)`.
> >     
> > - **Keuntungan**: Lebih mudah digunakan dan tidak perlu khawatir tentang sinkronisasi. Baik untuk data dalam jumlah kecil.
> >     
> > - **Kelemahan**: Lebih lambat karena setiap pesan harus melalui kernel.
> >     
> > 
> > ### Mekanisme Komunikasi Lainnya
> > 
> > - **Pipes**: Saluran komunikasi searah (_unidirectional_) antara proses-proses yang memiliki hubungan (misalnya, parent-child).
> >     
> > - **Sockets**: Titik akhir (_endpoint_) untuk komunikasi jaringan. Sebuah soket diidentifikasi oleh alamat IP dan nomor port. Memungkinkan komunikasi antar proses di mesin yang berbeda.
> >     
> > - **Remote Procedure Calls (RPC)**: Mekanisme tingkat tinggi yang menyembunyikan detail komunikasi jaringan. Sebuah proses dapat memanggil fungsi/prosedur yang sebenarnya dieksekusi di mesin lain seolah-olah itu adalah pemanggilan fungsi lokal.
> >     

> [!cornell] #### Summary
> 
> Proses diciptakan dalam model parent-child, di mana fork() membuat duplikat dan exec() memuat program baru. Proses yang bekerja sama memerlukan Inter-Process Communication (IPC), yang memiliki dua model utama: Shared Memory yang sangat cepat namun memerlukan sinkronisasi manual, dan Message Passing yang lebih lambat namun lebih aman dan mudah digunakan karena dimediasi oleh kernel. Untuk komunikasi jaringan, mekanisme tingkat tinggi seperti Sockets dan Remote Procedure Calls (RPC) digunakan untuk mengabstraksi kompleksitas komunikasi antar mesin.