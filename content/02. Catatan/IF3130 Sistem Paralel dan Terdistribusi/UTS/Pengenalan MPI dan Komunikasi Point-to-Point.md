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
> > - Apa itu Sistem Memori Terdistribusi?
> >     
> > - Apa saja komponen dasar program MPI?
> >     
> > - Bagaimana proses diidentifikasi?
> >     
> > - Apa itu model SPMD?
> >     
> > - Apa itu Communicator?
> >     
> > - Bagaimana cara mengirim data?
> >     
> > - Bagaimana cara menerima data?
> >     
> > - Apa itu Pencocokan Pesan (Message Matching)?
> >     
> > - Apa itu Komunikasi Blocking?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides 1-25
> >     
> 
> > ### Sistem Memori Terdistribusi vs. Terpusat
> > 
> > Dalam komputasi paralel, ada dua model memori utama:
> > 
> > 1. **Shared Memory (Memori Terpusat):** Beberapa CPU terhubung ke satu blok memori yang sama melalui sebuah interkoneksi. Semua CPU bisa mengakses data di memori tersebut secara langsung. Analoginya seperti beberapa penulis yang mengerjakan satu dokumen di papan tulis yang sama.
> >     
> > 2. **Distributed Memory (Memori Terdistribusi):** Setiap CPU memiliki blok memorinya sendiri yang bersifat privat dan tidak dapat diakses langsung oleh CPU lain. Komunikasi dan pertukaran data antar CPU harus dilakukan secara eksplisit melalui jaringan interkoneksi. Analoginya seperti beberapa penulis yang masing-masing memiliki buku catatan pribadi dan harus saling mengirim pesan untuk berbagi informasi. MPI (Message Passing Interface) adalah standar untuk model ini.
> >     
> > 
> > ### Komponen Dasar Program MPI
> > 
> > Program MPI adalah program C/C++ standar yang menyertakan beberapa elemen kunci untuk fungsionalitas paralel:
> > 
> > - **Header File:** Wajib menyertakan `#include <mpi.h>`.
> >     
> > - **Inisialisasi Lingkungan:** `MPI_Init(NULL, NULL)` harus dipanggil di awal sebelum fungsi MPI lainnya. Fungsi ini menyiapkan semua yang dibutuhkan oleh MPI.
> >     
> > - **Finalisasi Lingkungan:** `MPI_Finalize()` harus dipanggil di akhir program untuk membersihkan semua sumber daya yang dialokasikan oleh MPI. Tidak boleh ada pemanggilan fungsi MPI setelah ini.
> > 	![[Pasted image 20250909005510.png]]
> > 
> > - **Konvensi Penamaan:** Semua fungsi dan tipe data yang didefinisikan oleh MPI diawali dengan `MPI_` untuk menghindari konflik nama.
> > 
> > ![[Pasted image 20250909005334.png]]
> > ![[Pasted image 20250909005348.png]]
> > 
> > ### Identifikasi Proses: Rank & Size
> > 
> > Dalam MPI, sekelompok proses yang berjalan bersama diidentifikasi dengan rank integer non-negatif, mulai dari 0 hingga p-1, di mana p adalah jumlah total proses.
> > 
> > - `MPI_Comm_size(MPI_COMM_WORLD, &comm_sz);`: Fungsi ini digunakan untuk mengetahui berapa total proses (`comm_sz`) yang sedang berjalan dalam sebuah komunikator.
> >     
> > - `MPI_Comm_rank(MPI_COMM_WORLD, &my_rank);`: Fungsi ini digunakan oleh setiap proses untuk mengetahui ID unik atau "rank" (`my_rank`) miliknya sendiri.
> > 
> > ![[Pasted image 20250909005541.png]]
> >     
> > 
> > ### Model Pemrograman SPMD (Single Program, Multiple Data)
> > 
> > SPMD adalah pendekatan di mana kita menulis satu kode program saja, yang kemudian dieksekusi oleh semua proses. Namun, setiap proses dapat melakukan tugas yang berbeda berdasarkan `rank`-nya. Ini biasanya diimplementasikan dengan struktur kontrol `if-else`.
> > 
> > **Contoh Praktis:** Dalam program "Hello World" MPI, proses dengan `rank == 0` bertugas menerima pesan dari proses lain dan mencetaknya, sementara proses dengan `rank != 0` bertugas mengirim pesan. Ini membuat satu program dapat melakukan dua peran yang berbeda.
> > 
> > ### Communicator
> > 
> > Communicator adalah sebuah grup yang berisi kumpulan proses yang dapat saling mengirim pesan. Saat program MPI dimulai, `MPI_Init` secara otomatis membuat sebuah komunikator global bernama `MPI_COMM_WORLD` yang mencakup semua proses yang diluncurkan.
> > 
> > ### Pengiriman Data: `MPI_Send`
> > 
> > Fungsi ini digunakan untuk mengirim pesan dari satu proses ke proses lain.
> > ```c
> > int MPI_Send(
> > 	void* msg_buf_p, 
> > 	int msg_size, 
> > 	MPI_Datatype msg_type, 
> > 	int dest, 
> > 	int tag, 
> > 	MPI_Comm communicator);
> > ```
> > - `msg_buf_p`: Pointer ke data yang akan dikirim.
> >     
> > - `msg_size`: Jumlah elemen data yang dikirim.
> >     
> > - `msg_type`: Tipe data dari setiap elemen (misal: `MPI_CHAR`, `MPI_INT`, `MPI_DOUBLE`).
> >     
> > - `dest`: Rank dari proses tujuan.
> >     
> > - `tag`: Sebuah integer "label" untuk pesan, digunakan untuk membedakan jenis pesan.
> >     
> > - `communicator`: Komunikator tempat proses pengirim dan penerima berada (misal: `MPI_COMM_WORLD`).
> >     
> > 
> > ### Penerimaan Data: `MPI_Recv`
> > 
> > Fungsi ini digunakan untuk menerima pesan dari proses lain.
> >
> > ```c
> > int MPI_Recv(
> > 	void* msg_buf_p, 
> > 	int buf_size, 
> > 	MPI_Datatype buf_type, 
> > 	int source, 
> > 	int tag, 
> > 	MPI_Comm communicator, 
> > 	MPI_Status* status_p);
> > ```
> > 
> > - `msg_buf_p`: Pointer ke buffer untuk menyimpan data yang diterima.
> >     
> > - `buf_size`: Ukuran maksimum buffer (jumlah elemen yang bisa ditampung).
> >     
> > - `buf_type`: Tipe data dari elemen yang diharapkan.
> >     
> > - `source`: Rank dari proses pengirim. Bisa diisi `MPI_ANY_SOURCE` jika ingin menerima dari siapa saja.
> >     
> > - `tag`: Tag yang diharapkan dari pesan. Bisa diisi `MPI_ANY_TAG`.
> >     
> > - `communicator`: Komunikator yang digunakan.
> >     
> > - `status_p`: Pointer ke struktur `MPI_Status` yang akan diisi dengan informasi tentang pesan yang diterima (misal: pengirim aktualnya siapa jika `source` adalah `MPI_ANY_SOURCE`). Bisa diabaikan dengan `MPI_STATUS_IGNORE`.
> >     
> > ### Tipe data MPI
> > ![[Pasted image 20250909010013.png]]
> > 
> > ### Pencocokan Pesan (Message Matching)
> > 
> > Agar komunikasi berhasil, sebuah panggilan `MPI_Send` pada proses `q` harus cocok dengan panggilan `MPI_Recv` pada proses `r`. Syaratnya adalah:
> > 
> > 1. Keduanya berada di `communicator` yang sama.
> >     
> > 2. `tag` pesan pada `MPI_Send` sama dengan `tag` pada `MPI_Recv`.
> >     
> > 3. `dest` pada `MPI_Send` (yaitu `r`) cocok dengan rank proses penerima.
> >     
> > 4. `source` pada `MPI_Recv` (yaitu `q`) cocok dengan rank proses pengirim.
> >     
> > ![[Pasted image 20250909010147.png]]
> > 
> > ### Komunikasi Blocking
> > 
> > Perilaku `Send` dan `Recv` dapat menyebabkan sebuah proses berhenti (block) atau menunggu.
> > 
> > - **`MPI_Recv` selalu blocking:** Proses yang memanggil `MPI_Recv` akan berhenti dan menunggu sampai pesan yang cocok tiba.
> >     
> > - **`MPI_Send` bisa blocking atau non-blocking:** Perilakunya tergantung implementasi MPI.
> >     
> >     - **Buffering:** Jika pesan kecil, `MPI_Send` mungkin hanya menyalin pesan ke buffer internal MPI dan langsung melanjutkan eksekusi (non-blocking).
> >         
> >     - **Blocking:** Jika pesan besar atau buffer penuh, `MPI_Send` akan menunggu sampai proses penerima siap menerima pesan tersebut.
> >         
> > ![[Pasted image 20250909010228.png]]
> > Jika semua proses melakukan `MPI_Send` blocking secara bersamaan sebelum ada yang melakukan `MPI_Recv`, dapat terjadi **deadlock**, di mana semua proses saling menunggu tanpa ada yang bisa maju.

> [!cornell] #### Summary
> 
> Pemrograman dengan MPI pada sistem memori terdistribusi mengharuskan setiap proses, yang diidentifikasi oleh 'rank' unik dalam sebuah 'communicator' (seperti `MPI_COMM_WORLD`), untuk secara eksplisit mengirim dan menerima pesan menggunakan fungsi point-to-point seperti `MPI_Send` dan `MPI_Recv`. Model yang umum digunakan adalah SPMD, di mana satu program dieksekusi oleh semua proses, namun perilaku setiap proses dikendalikan oleh 'rank'-nya, dan keberhasilan komunikasi bergantung pada 'pencocokan pesan' yang tepat antara pengirim dan penerima untuk menghindari kondisi 'blocking' dan deadlock.

> [!ad-libitum]- Additional Information
> 
> #### Membedah `MPI_Status`
> 
> Daripada menggunakan `MPI_STATUS_IGNORE`, kita dapat mendeklarasikan variabel `MPI_Status status;` dan melewatkan alamatnya `&status` ke `MPI_Recv`. Setelah `MPI_Recv` selesai, struct `status` akan berisi informasi meta tentang pesan yang baru saja diterima:
> 
> - `status.MPI_SOURCE`: Memberikan `rank` dari proses pengirim yang sebenarnya. Ini sangat berguna ketika Anda menggunakan `MPI_ANY_SOURCE` saat menerima.
>     
> - `status.MPI_TAG`: Memberikan `tag` dari pesan yang sebenarnya. Berguna saat menggunakan `MPI_ANY_TAG`.
>     
> - **Mengetahui Ukuran Pesan:** `MPI_Recv` tidak secara langsung memberitahu berapa banyak data yang diterima. Untuk mengetahuinya, gunakan fungsi `MPI_Get_count(&status, MPI_DOUBLE, &count);` setelah `MPI_Recv`. Ini akan mengisi variabel `count` dengan jumlah elemen (bertipe `MPI_DOUBLE` dalam contoh ini) yang diterima.
>     
> 
> #### Protokol Komunikasi Internal MPI: Eager vs. Rendezvous
> 
> Perilaku `MPI_Send` yang bisa _blocking_ atau tidak seringkali ditentukan oleh protokol internal yang dipilih oleh implementasi MPI berdasarkan ukuran pesan:
> 
> 1. **Eager Protocol:** Untuk pesan kecil, pengirim langsung mengirim data ke penerima tanpa konfirmasi. Pengirim berasumsi penerima memiliki buffer untuk menampungnya. Ini cepat tapi berisiko jika buffer penerima penuh. Ini adalah mode _non-blocking_ (fire and forget).
>     
> 2. **Rendezvous Protocol:** Untuk pesan besar, pengirim tidak langsung mengirim seluruh data. Ia mengirim pesan permintaan kecil terlebih dahulu ("ingin mengirim data sekian besar"). Pengirim akan _block_ (menunggu) sampai penerima merespons bahwa ia siap menerima. Setelah itu, transfer data besar baru dimulai. Ini lebih aman untuk data besar dan mencegah _buffer overflow_ di sisi penerima.
>     
> 
> Memahami kedua protokol ini membantu menjelaskan mengapa program yang "aman" (tidak bergantung pada buffering) sangat penting.
> 
> #### Perkenalan Komunikasi Non-Blocking
> 
> Selain `MPI_Send` dan `MPI_Recv` yang bersifat blocking, MPI menyediakan versi non-blocking yang sangat kuat untuk tumpang tindih antara komputasi dan komunikasi, sehingga meningkatkan efisiensi.
> 
> - `MPI_Isend`: _Initiate Send_. Memulai pengiriman tapi tidak menunggu selesai. Fungsi ini langsung kembali dan program bisa melanjutkan pekerjaan lain.
>     
> - `MPI_Irecv`: _Initiate Receive_. Memulai penerimaan (memberi tahu MPI di mana harus meletakkan data jika sudah datang) tapi tidak menunggu data tiba.
>     
> - `MPI_Wait` / `MPI_Test`: Digunakan nanti untuk memeriksa apakah operasi `Isend` atau `Irecv` sudah benar-benar selesai. Program harus memanggil ini sebelum menggunakan data yang dikirim atau diterima.
>     
> 
> #### Eksplorasi Mandiri
> 
> - **Buat Program Deadlock:** Coba buat program dengan 2 proses. Proses 0 mengirim pesan besar ke proses 1, dan pada saat yang sama, proses 1 mengirim pesan besar ke proses 0. Jalankan programnya. Kemungkinan besar program akan _hang_ (mengalami deadlock) karena kedua `MPI_Send` bersifat blocking dan menunggu `MPI_Recv` yang tidak pernah tercapai.
>     
> - **Program Ping-Pong:** Buat program di mana proses 0 mengirim angka ke proses 1. Proses 1 menerima, menambah 1, lalu mengirimkannya kembali ke proses 0. Ulangi ini beberapa kali. Ini adalah cara yang bagus untuk mengukur latensi jaringan dasar.
>     
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Standar MPI:** Situs resmi MPI Forum (https://www.mpi-forum.org/) adalah sumber utama untuk dokumentasi standar.
>     
> - **Implementasi Populer:** Open MPI (https://www.open-mpi.org/) dan MPICH (https://www.mpich.org/) adalah dua implementasi MPI open-source yang paling banyak digunakan. Situs mereka memiliki tutorial dan dokumentasi yang sangat baik.
>     
> - **Tutorial:** Cari "MPI Tutorial" dari pusat superkomputer seperti Lawrence Livermore National Laboratory (LLNL) atau Argonne National Laboratory (ANL) untuk materi pembelajaran yang mendalam.
>