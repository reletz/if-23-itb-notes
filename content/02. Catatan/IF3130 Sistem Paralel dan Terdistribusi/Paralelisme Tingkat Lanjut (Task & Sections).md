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
> > - Bagaimana memparalelkan tugas yang berbeda?
> >     
> > - Apa itu `#pragma omp sections`?
> >     
> > - Kapan paralelisasi loop tidak cukup?
> >     
> > - Apa itu `#pragma omp task`?
> >     
> > - Bagaimana `task` menangani rekursif?
> >     
> > - Apa fungsi `#pragma omp taskwait`
> >     
> >     
> > 
> > ## Reference Points
> > 
> > - Slide "5-SharedMemoryOpenMP-2022-tambahan.pdf" (Hal. 13-20)
> >     
> 
> > ### Melampaui Loop: Paralelisme Fungsional
> >
> > Terkadang, kita tidak ingin banyak _thread_ mengerjakan loop yang sama, melainkan ingin _thread_ yang berbeda mengerjakan **tugas (fungsi) yang berbeda secara bersamaan**. Ini disebut paralelisme fungsional atau dekomposisi fungsional.
> >
> > **Contoh**: Dalam sebuah sistem pemrosesan data, _Thread 1_ membaca data dari file, _Thread 2_ memproses data tersebut, dan _Thread 3_ menulis hasilnya ke file lain.
> >
> > ### `#pragma omp sections`: Membagi Pekerjaan Berdasarkan Fungsi
> >
> > Direktif ini digunakan untuk membagi pekerjaan di dalam sebuah blok `parallel` menjadi beberapa blok `section` yang independen. Setiap `section` akan dieksekusi oleh satu _thread_ yang tersedia dari _team_.
> >
> > **Struktur**:
> >
> > ```c
> > #pragma omp parallel sections
> > {
> >     #pragma omp section
> >     {
> >         // Blok kode A (dikerjakan oleh 1 thread)
> >         fungsi_baca_data();
> >     }
> >     #pragma omp section
> >     {
> >         // Blok kode B (dikerjakan oleh thread lain)
> >         fungsi_proses_data();
> >     }
> > } // Barrier implisit di sini
> > ```
> >
> > Ini menjamin bahwa Blok A dan Blok B berjalan secara paralel. Jumlah `section` tidak harus sama dengan jumlah _thread_. Jika `section` lebih banyak dari _thread_, satu _thread_ bisa mengerjakan beberapa `section` secara sekuensial.
> >
> > ### Paralelisme Dinamis dan Tidak Terstruktur
> >
> > Bagaimana jika pekerjaan baru muncul secara dinamis saat program berjalan? Contoh klasik adalah pada algoritma rekursif (seperti Fibonacci atau tree traversal) atau saat memproses struktur data seperti linked list. Kita tidak tahu berapa banyak "tugas" yang ada sebelum runtime. Di sinilah parallel for tidak lagi efektif.
> >
> > ### `#pragma omp task`: "Daftar Tugas" untuk Para Thread
> >
> > Direktif `task` memungkinkan kita untuk mendefinisikan sebuah blok kode sebagai sebuah "tugas" independen.
> >
> > - **Cara Kerja**: Saat sebuah _thread_ menemukan `#pragma omp task`, ia tidak langsung mengerjakannya. Sebaliknya, ia "mengemas" tugas tersebut (kode dan data yang dibutuhkan) dan menaruhnya ke dalam sebuah antrian konseptual. _Thread_ manapun yang sedang menganggur di dalam _team_ bisa mengambil dan mengerjakan tugas dari antrian tersebut.
> >     
> > - **Sifat**: Sangat fleksibel dan ideal untuk masalah dengan struktur tidak teratur (_irregular_).
> >     
> >
> > ### Sinkronisasi Task: `#pragma omp taskwait`
> >
> > Terkadang sebuah tugas utama bergantung pada hasil dari sub-tugas yang telah ia buat. `taskwait` berfungsi sebagai titik sinkronisasi.
> >
> > - **Fungsi**: Sebuah _thread_ yang menemui `taskwait` akan berhenti dan mengerjakan tugas lain dari antrian sampai **semua** _**child task**_ **yang ia buat secara langsung** telah selesai dieksekusi.
> >     
> >
> > ### Sinkronisasi Task: `#pragma omp taskwait`
> >
> > Terkadang sebuah tugas utama bergantung pada hasil dari sub-tugas yang telah ia buat. `taskwait` berfungsi sebagai titik sinkronisasi.
> >
> > - **Fungsi**: Sebuah _thread_ yang menemui `taskwait` akan berhenti sejenak dan bisa mengerjakan tugas lain dari antrian sampai **semua** _**child task**_ **yang ia ciptakan secara langsung** telah selesai dieksekusi. Ini penting untuk memastikan dependensi data terpenuhi.
> >     

> [!cornell] #### Summary
> OpenMP menyediakan dua model utama untuk paralelisme di luar loop: `#pragma omp sections` untuk membagi pekerjaan berdasarkan fungsi-fungsi statis yang berbeda di antara _**thread**_ (paralelisme fungsional), dan `#pragma omp task` untuk paralelisme yang dinamis dan tidak teratur. `task` memungkinkan pembuatan "daftar tugas" yang dapat dieksekusi oleh _**thread**_ mana pun yang tersedia, dengan `taskwait` berfungsi sebagai mekanisme sinkronisasi untuk memastikan sub-tugas selesai sebelum melanjutkan.

> [!ad-libitum]- Additional Information
> 
> #### Kapan Menggunakan `single` dengan `task`?
> 
> Saat memulai sebuah proses yang akan menghasilkan banyak `task` (seperti pemanggilan fungsi rekursif awal atau iterasi _linked list_), kita sering hanya ingin **satu thread** yang menjadi "pemicu" agar tidak ada pekerjaan duplikat. Di sinilah `#pragma omp single` sangat berguna.
> 
> ```c
> #pragma omp parallel
> {
>     // Pastikan hanya SATU thread yang memulai rantai pembuatan task
>     #pragma omp single
>     {
>         // Thread ini akan menyusuri list dan membuat task
>         // sementara thread lain menunggu untuk mengambil task
>         node *p = head;
>         while (p) {
>             #pragma omp task
>             process(p);
>             p = p->next;
>         }
>     }
> } // Barrier implisit memastikan semua task selesai
> ```
> 
> #### Studi Kasus: Tree Traversal
> 
> `task` sangat cocok untuk menelusuri struktur data pohon. Kita bisa membuat tugas baru untuk setiap cabang kiri dan kanan.
> 
> ```c
> void traverse(struct node *p) {
>     if (p->left) {
>         #pragma omp task
>         traverse(p->left);
>     }
>     if (p->right) {
>         #pragma omp task
>         traverse(p->right);
>     }
>     // Jika kita butuh hasil dari anak-anaknya dulu (post-order),
>     // kita letakkan taskwait sebelum process(p)
>     #pragma omp taskwait 
>     process(p);
> }
> ```
> 
> #### Eksplorasi Mandiri
> 
> - Algoritma sorting seperti **Quicksort** atau **Mergesort** secara alami bersifat rekursif. Coba pikirkan bagaimana Anda bisa memparalelkan salah satu dari algoritma tersebut menggunakan `#pragma omp task`. Di bagian mana Anda akan membuat `task` baru, dan di mana Anda mungkin memerlukan `taskwait`?
>