---
type: Note
cssclasses:
- cornell-notes
---

_Back to_ [[IF4031 Arsitektur Aplikasi Terdistribusi]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> > 
> > - Apa itu 'C10K Problem'?
> >     
> > - Strategi awal menangani banyak klien?
> >     
> > - Kenapa 1 proses/thread per klien itu buruk?
> >     
> > - Apa itu aplikasi 'I/O Bound'?
> >     
> > - Apa 5 model I/O?
> >     
> > - Apa 2 fase dalam operasi I/O?
> >     
> > - Bagaimana cara kerja Blocking I/O?
> >     
> > - Apa beda Non-blocking dengan Blocking I/O?
> >     
> > - Apa itu I/O Multiplexing?
> >     
> > - Beda Signal-driven dan Asynchronous I/O?
> >     
> 
> > ## Reference Points
> > 
> > - Slides IF4031 Hal 3-17
> >     
> >
> > ### C10K Problem
> > 
> > Ini adalah tantangan klasik dalam desain server: **Bagaimana merancang sebuah server yang mampu menangani 10.000 koneksi klien secara bersamaan (concurrent)?**
> > 
> > Masalah utamanya bukan pada hardware, melainkan pada bagaimana OS dan arsitektur software menangani konkurensi. Beberapa kendala utamanya adalah:
> > 
> > - **Data copies:** Penyalinan data antara kernel dan aplikasi.
> >     
> > - **Context switches:** Biaya peralihan CPU dari satu proses/thread ke proses/thread lain.
> >     
> > - **Memory allocation:** Alokasi memori untuk setiap koneksi.
> >     
> > - **Lock contention:** Perebutan akses ke sumber daya bersama.
> >     
> >
> > ### Strategi Awal: 1 Proses/Thread per Klien
> > 
> > Pendekatan paling intuitif adalah membuat satu unit eksekusi untuk setiap klien yang terhubung:
> > 
> > 1. **Satu Proses per Klien:** Menggunakan `fork()` untuk membuat proses anak baru setiap kali ada koneksi masuk.
> >     
> > 2. **Satu Thread per Klien:** Menggunakan `pthread_create()` untuk membuat thread baru.
> >     
> > 
> > **Masalahnya:** Pendekatan ini **tidak scalable**. Proses dan thread memakan sumber daya yang signifikan (misalnya, alokasi memori untuk stack). Dengan 10.000 koneksi, server bisa kehabisan memori. Selain itu, sebagian besar waktu, proses/thread ini tidak melakukan apa-apa selain menunggu data dari jaringan.
> >
> > ### Karakteristik Aplikasi Jaringan: I/O Bound
> > 
> > Sebagian besar aplikasi server bersifat **I/O Bound**. Artinya, waktu eksekusi lebih banyak dihabiskan untuk **menunggu operasi I/O** (Input/Output) selesai (misalnya, membaca data dari socket, menulis ke disk) daripada melakukan komputasi di CPU. Karena itu, memblokir satu thread hanya untuk menunggu I/O adalah pemborosan sumber daya.
> >
> > ### Lima Model I/O
> > 
> > Operasi input pada jaringan umumnya memiliki dua fase:
> > 
> > 1. **Waiting for data:** Menunggu data siap di buffer kernel.
> >     
> > 2. **Copying data:** Menyalin data dari buffer kernel ke buffer aplikasi.
> >     
> > 
> > Kelima model I/O ini menangani dua fase tersebut dengan cara yang berbeda.
> > 
> > #### 1. Blocking I/O
> > ![[Pasted image 20250910142132.png]]
> > Proses/thread **terblokir** (berhenti total) sejak pemanggilan `recvfrom` hingga data selesai disalin ke buffer aplikasi. Ini adalah model paling sederhana namun paling tidak efisien untuk konkurensi.
> > 
> > #### 2. Non-blocking I/O
> > ![[Pasted image 20250910142219.png]]
> > Proses melakukan **polling** (bertanya berulang kali) pada kernel. Jika data belum siap, kernel langsung kembali dengan error `EWOULDBLOCK`. Ini mencegah proses terblokir pada fase 1, tetapi fase 2 (penyalinan data) masih bersifat _blocking_. Polling terus-menerus ini memboroskan CPU.
> > 
> > #### 3. I/O Multiplexing
> > ![[Pasted image 20250910142245.png]]
> > Proses menggunakan satu panggilan sistem (seperti `select` atau `poll`) untuk memonitor **banyak socket sekaligus**. Proses akan terblokir pada panggilan `select` ini sampai _setidaknya salah satu_ socket siap untuk I/O (fase 1 selesai). Setelah itu, proses memanggil `recvfrom` pada socket yang siap, di mana ia akan terblokir sebentar selama data disalin (fase 2). Ini memungkinkan satu thread menangani banyak koneksi.
> > 
> > #### 4. Signal-driven I/O
> > ![[Pasted image 20250910142403.png]]
> > Proses memberitahu kernel untuk mengirimkan sinyal (SIGIO) ketika data sudah siap. Proses tidak terblokir dan bisa melakukan pekerjaan lain. Ketika sinyal diterima, _signal handler_ akan dieksekusi untuk membaca data (dengan `recvfrom` yang bersifat blocking pada fase 2).
> > 
> > #### 5. Asynchronous I/O (AIO)
> > ![[Pasted image 20250910142418.png]]
> > Ini adalah satu-satunya model yang benar-benar _non-blocking_. Proses memulai operasi I/O dan langsung melanjutkan pekerjaannya. Kernel akan menangani **kedua fase** di latar belakang. Setelah data selesai disalin ke buffer aplikasi, kernel akan memberikan notifikasi (misalnya, melalui sinyal atau callback) kepada proses.
> > 
> > **Perbandingan Kelima Model:**
> > ![[Pasted image 20250910142448.png]]

> [!cornell] #### Summary
> 
> Untuk mengatasi C10K Problem, arsitektur server naif yang menggunakan satu proses atau thread per klien tidaklah efisien karena borosnya sumber daya dan sifat aplikasi jaringan yang I/O bound. Solusinya terletak pada penggunaan model I/O yang lebih canggih. Model seperti I/O Multiplexing memungkinkan satu thread menangani banyak koneksi dengan cara menunggu event dari beberapa socket sekaligus, sementara Asynchronous I/O memberikan efisiensi tertinggi dengan mendelegasikan seluruh operasi I/O kepada kernel dan hanya menerima notifikasi saat operasi tersebut tuntas.

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis: Mahalnya Biaya Context Switch
> 
> _Context Switch_ adalah proses yang dilakukan sistem operasi untuk mengalihkan CPU dari satu thread/proses ke yang lain. OS harus menyimpan seluruh konteks eksekusi (nilai register CPU, program counter, dll.) dari thread saat ini dan memuat konteks dari thread berikutnya. Proses ini, meskipun cepat, menjadi sangat signifikan jika terjadi ribuan kali per detik. Dengan 10.000 thread, server bisa menghabiskan sebagian besar waktunya hanya untuk _context switching_ daripada melakukan pekerjaan yang produktif.
> 
> #### Perbedaan Kunci: Signal-driven vs. Asynchronous I/O
> 
> Perbedaan paling fundamental antara keduanya adalah **kapan notifikasi diberikan**:
> 
> - **Signal-driven I/O:** Kernel memberitahu, "Hei, sekarang kamu _sudah bisa_ memulai operasi baca, datanya sudah siap."
>     
> - **Asynchronous I/O:** Kernel memberitahu, "Hei, operasi baca yang kamu minta _sudah selesai_, datanya sudah ada di buffermu."
>     
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Buku:** "UNIX Network Programming, Volume 1: The Sockets Networking API" oleh W. Richard Stevens. Buku ini adalah referensi definitif untuk pemrograman jaringan di lingkungan UNIX dan merupakan sumber asli dari diagram-diagram kelima model I/O.
>     
> - **Artikel Asli C10K:** Baca tulisan Dan Kegel tentang "The C10K problem" untuk melihat perspektif historis dan berbagai solusi yang diusulkan pada masanya.
>