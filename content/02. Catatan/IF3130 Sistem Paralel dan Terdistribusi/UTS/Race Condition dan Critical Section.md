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
> > - Apa itu Race Condition?
> >     
> > - Contoh Race Condition?
> >     
> > - Kenapa hasil bisa salah?
> >     
> > - Apa itu Critical Section?
> >     
> > - Apa itu Busy-Waiting?
> >     
> > - Bagaimana cara kerja Busy-Waiting?
> >     
> > - Apa kelemahan Busy-Waiting?
> >     
> >
> > ## Reference Points
> >
> > - Slide "paralel programming model: shared memory" (Hal. 25-33)
> >     
> 
> > ### Masalah: Hasil yang Tidak Terduga
> >
> > Saat beberapa thread mencoba memodifikasi variabel global yang sama secara bersamaan, hasilnya sering kali menjadi salah dan tidak dapat diprediksi.
> >
> > Studi Kasus: Menghitung Nilai π (Pi)
> > 
> > Kita dapat mengestimasi nilai π menggunakan deret Gregory-Leibniz:
> > 
> > $$ \pi = 4 \left( 1 - \frac{1}{3} + \frac{1}{5} - \frac{1}{7} + \dots \right) $$
> > 
> > Dalam versi paralel, setiap thread menghitung sebagian dari deret ini dan menambahkan hasilnya ke satu variabel global sum. Namun, ketika dijalankan dengan banyak thread, hasil estimasi π justru semakin buruk seiring bertambahnya jumlah iterasi, yang seharusnya membuatnya semakin akurat.
> >
> > ### Race Condition
> >
> > **Race Condition** adalah sebuah "cacat" dalam program yang terjadi ketika hasil akhir dari suatu operasi bergantung pada urutan eksekusi thread yang tidak terkontrol. Thread-thread seolah-olah "berlomba" untuk mengakses dan memodifikasi sumber daya bersama (_shared resource_).
> >
> > Contoh Mekanisme Kesalahan:
> > 
> > Misalkan variabel sum saat ini bernilai 5.0.
> >
> > 1. **Thread 0** membaca nilai `sum` (5.0) ke dalam registernya.
> >     
> > 2. **Scheduler** menghentikan Thread 0 sejenak dan menjalankan **Thread 1**.
> >     
> > 3. **Thread 1** membaca nilai `sum` (masih 5.0) ke registernya, menghitung `5.0 + 0.5 = 5.5`, lalu menyimpan `5.5` kembali ke `sum`.
> >     
> > 4. **Scheduler** menghentikan Thread 1 dan kembali menjalankan **Thread 0**.
> >     
> > 5. **Thread 0** melanjutkan perhitungannya dari nilai yang tadi ia baca, yaitu `5.0 + 0.2 = 5.2`, lalu menyimpan `5.2` kembali ke `sum`.
> >     
> >
> > Hasil akhir `sum` adalah 5.2, padahal seharusnya `5.0 + 0.5 + 0.2 = 5.7`. Perhitungan dari Thread 1 hilang begitu saja (_lost update_).
> >
> > ### Critical Section
> >
> > **Critical Section** adalah blok kode di mana sebuah thread mengakses atau memodifikasi sumber daya bersama. Untuk mencegah _race condition_, kita harus memastikan bahwa **hanya satu thread** yang dapat mengesekusi _critical section_ pada satu waktu. Ini disebut _mutual exclusion_ (eksklusi mutual).
> >
> > ```c
> > // Contoh pada kasus Pi
> > sum += factor / (2*i + 1); // Ini adalah Critical Section
> > ```
> >
> > ### Solusi Awal: Busy-Waiting
> >
> > _Busy-waiting_ (atau _spinning_) adalah teknik sederhana untuk melindungi _critical section_. Sebuah thread secara terus-menerus memeriksa sebuah variabel (sering disebut `flag`) dalam sebuah _loop_ kosong sampai kondisi tertentu terpenuhi, yang menandakan gilirannya untuk masuk ke _critical section_.
> >
> > **Cara Kerja:**
> >
> > 1. Sebuah variabel global `flag` diinisialisasi ke 0.
> >     
> > 2. Thread 0 ingin masuk. Ia memeriksa `flag` dan karena nilainya 0 (sama dengan rank-nya), ia bisa masuk ke _critical section_.
> >     
> > 3. Sementara itu, Thread 1 juga ingin masuk. Ia terus-menerus memeriksa `flag` dalam _loop_ `while (flag != 1);`. Selama `flag` bukan 1, ia akan terus "berputar" di sana.
> >     
> > 4. Setelah Thread 0 selesai, ia mengubah `flag` menjadi 1.
> >     
> > 5. Kondisi `flag != 1` pada Thread 1 menjadi salah, sehingga ia bisa keluar dari _loop_ dan masuk ke _critical section_. Proses ini berlanjut untuk thread berikutnya.
> >     
> >
> > Kelemahan Busy-Waiting
> > 
> > Meskipun bisa menyelesaikan masalah race condition, busy-waiting sangat tidak efisien. Thread yang sedang menunggu akan terus memakai siklus CPU sepenuhnya hanya untuk memeriksa sebuah kondisi. Ini membuang-buang sumber daya komputasi yang berharga. Bayangkan seseorang terus-menerus menekan tombol refresh pada sebuah halaman web—ia aktif, tetapi tidak melakukan pekerjaan yang produktif sama sekali.

> [!cornell] #### Summary
> Sebuah _**race condition**_ terjadi ketika banyak thread mengakses sumber daya bersama secara tidak teratur, menyebabkan hasil yang salah dan tidak dapat diprediksi. Bagian kode yang mengakses sumber daya ini disebut _**critical section**_ dan harus dilindungi untuk memastikan hanya satu thread yang bisa masuk pada satu waktu (_**mutual exclusion**_) _**Busy-waiting**_ adalah salah satu metode perlindungan pertama dengan memaksa thread untuk "berputar" dalam _**loop**_ kosong sambil menunggu giliran, namun metode ini sangat boros sumber daya CPU.

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis: Operasi yang Tidak Atomik
> 
> Masalah inti dari _race condition_ adalah karena operasi seperti `sum += my_sum` **tidak atomik**. Di level mesin, operasi ini dipecah menjadi tiga langkah:
> 
> 1. **LOAD**: Membaca nilai `sum` dari memori ke register CPU.
>     
> 2. **ADD**: Menambahkan nilai `my_sum` ke nilai di register.
>     
> 3. **STORE**: Menyimpan kembali hasil dari register ke memori `sum`.
>     
> 
> _Scheduler_ sistem operasi bisa menginterupsi sebuah thread di antara ketiga langkah ini. Inilah yang menyebabkan mekanisme _lost update_ seperti yang dicontohkan di atas. Solusi sinkronisasi (seperti mutex nanti) bertujuan untuk membuat ketiga langkah ini seolah-olah menjadi satu operasi tunggal yang tidak bisa diinterupsi.
> 
> #### Waspada Terhadap Optimasi Kompiler
> 
> Kode _busy-waiting_ seperti `while (flag != my_rank);` bisa menjadi **sangat berbahaya** jika kompilasi dengan optimisasi level tinggi (misalnya, `-O2` atau `-O3` pada `gcc`) diaktifkan. Kompiler modern cukup pintar untuk melihat bahwa di dalam _loop_ tersebut, tidak ada kode yang mengubah nilai `flag`. Dari sudut pandang satu thread, `flag` adalah variabel eksternal yang nilainya tidak berubah.
> 
> Akibatnya, kompiler bisa "mengoptimalkan" kode tersebut menjadi _loop_ tak terbatas (`infinite loop`) atau bahkan menghapusnya, yang menyebabkan program macet atau gagal total. Untuk mencegah ini, variabel `flag` harus dideklarasikan dengan _keyword_ `volatile`, yang memberitahu kompiler bahwa nilai variabel ini bisa berubah kapan saja oleh agen eksternal (dalam hal ini, thread lain).
> 
> #### Eksplorasi Mandiri
> 
> - Coba implementasikan kode perhitungan π dari slide dengan tiga versi:
>     
>     1. Tanpa sinkronisasi sama sekali.
>         
>     2. Menggunakan _busy-waiting_ di dalam _loop_ (slide 31).
>         
>     3. Menggunakan _busy-waiting_ setelah _loop_ (slide 33).
>         
> - Jalankan ketiga versi dengan jumlah thread yang berbeda (misalnya 2, 4, 8) dan jumlah iterasi `n` yang besar. Amati perbedaan pada hasil akhir nilai π dan waktu eksekusinya. Anda akan melihat bagaimana sinkronisasi memperbaiki kebenaran hasil, tetapi juga mempengaruhi performa.
>