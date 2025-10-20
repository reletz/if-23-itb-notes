---
type: Note

cssclasses:
- cornell-notes
---
_Back to_ [[IF3130 Sistem Paralel dan Terdistribusi]]

### Tabel Direktif dan Fungsi Penting OpenMP

|**Direktif / Fungsi**|**Keterangan**|**Kapan Digunakan**|**Klausa / Parameter Penting**|
|---|---|---|---|
|**Paralelisasi Dasar**||||
|`#pragma omp parallel`|Membuat sebuah _region paralel_ (Fork-Join). Blok kode berikutnya akan dieksekusi oleh setiap _thread_ dalam sebuah _team_.|Untuk mengeksekusi blok kode yang sama oleh banyak _thread_, atau sebagai pembungkus untuk direktif pembagian kerja lainnya.|`num_threads(count)`: Menentukan jumlah _thread_ yang akan dibuat.|
|`#pragma omp parallel for`|**Direktif gabungan.** Membuat _team thread_ DAN langsung membagi iterasi `for loop` berikutnya di antara mereka.|Cara paling umum dan praktis untuk memparalelkan `for loop` yang iterasinya independen.|Sama seperti `parallel`, ditambah klausa untuk `for` seperti `reduction` dan `schedule`.|
|**Pembagian Kerja (**_**Work-sharing**_**)**||||
|`#pragma omp for`|Membagi iterasi `for loop` di antara _thread_ dalam sebuah _team_ yang **sudah ada**.|Digunakan di dalam blok `#pragma omp parallel` untuk membagi pekerjaan sebuah loop.|-|
|`#pragma omp sections`|Membagi blok kode menjadi beberapa `#pragma omp section` yang independen. Setiap `section` dikerjakan oleh satu _thread_.|Untuk _task parallelism_, di mana _thread_ yang berbeda mengerjakan fungsi atau tugas yang berbeda secara bersamaan.|-|
|`#pragma omp single`|Menandakan bahwa blok kode berikutnya hanya akan dieksekusi oleh **satu thread** saja (yang pertama tiba).|Untuk tugas inisialisasi atau finalisasi di dalam region paralel yang hanya perlu dilakukan sekali.|-|
|**Manajemen Data (Klausa)**||||
|`private(list)`|Setiap _thread_ mendapatkan salinan (kopi) privat dari variabel dalam `list`. Perubahan tidak terlihat oleh _thread_ lain.|Untuk variabel sementara di dalam loop atau variabel yang nilainya tidak boleh saling mengganggu antar _thread_.|`list`: Daftar variabel yang dipisahkan koma (misal: `private(i, temp)`).|
|`shared(list)`|Semua _thread_ berbagi dan mengakses satu variabel yang sama di memori.|Untuk data input yang hanya dibaca atau data output yang aksesnya sudah dilindungi oleh sinkronisasi.|`list`: Daftar variabel yang akan di-share.|
|`reduction(op:list)`|Cara paling aman dan efisien untuk melakukan operasi agregasi (penjumlahan, perkalian, dll.).|**Wajib** digunakan saat banyak _thread_ perlu mengupdate satu variabel global secara bersamaan (misal, menjumlahkan hasil parsial).|op: Operator reduksi (+, *, min, max).<br><br>list: Variabel yang akan direduksi.|\
|`schedule(type, size)`|Mengatur cara iterasi loop didistribusikan ke _thread_.|Untuk mengatasi **load imbalance**, yaitu ketika beban kerja setiap iterasi tidak sama agar _thread_ tidak menganggur.|`type`: `static` (overhead rendah), `dynamic` (adaptif), `guided` (kompromi). `size`: Ukuran _chunk_ (opsional).|
|`default(none)`|Memaksa programmer untuk secara eksplisit menentukan _scope_ (`private`, `shared`, `reduction`) dari setiap variabel yang digunakan.|**Praktik terbaik.** Sangat disarankan untuk digunakan di setiap region paralel untuk menghindari _bug_ terkait _scope_ variabel.|-|
|**Sinkronisasi**||||
|`#pragma omp critical`|Melindungi _Critical Section_. Hanya **satu thread** yang bisa masuk ke blok kode ini pada satu waktu.|Untuk melindungi operasi pada data bersama yang kompleks dan tidak bisa ditangani oleh `atomic` atau `reduction`.|`(name)`: Memberi nama pada _critical section_ (opsional).|
|`#pragma omp atomic`|Versi `critical` yang sangat ringan dan cepat, namun terbatas hanya untuk **satu statement assignment sederhana**.|Gunakan ini jika memungkinkan untuk operasi seperti `x++`, `x--`, `x += val`. Jauh lebih efisien daripada `critical`.|-|
|`#pragma omp barrier`|Titik sinkronisasi. Tidak ada _thread_ yang bisa lewat sampai semua _thread_ dalam _team_ telah mencapainya.|Untuk memastikan satu fase komputasi selesai sebelum fase berikutnya dimulai di dalam satu region paralel.|-|
|**Paralelisme Lanjutan (Tasking)**||||
|`#pragma omp task`|Mendefinisikan blok kode sebagai sebuah "tugas" independen yang dimasukkan ke dalam antrian.|Untuk masalah dengan paralelisme dinamis atau tidak teratur, seperti pada algoritma rekursif atau saat memproses _linked list_.|-|
|`#pragma omp taskwait`|_Thread_ yang membuat _task_ akan berhenti di sini sampai semua _child task_ yang ia buat **secara langsung** selesai.|Untuk memastikan hasil dari sub-tugas sudah tersedia sebelum tugas utama melanjutkannya.|-|
|**Fungsi Runtime**||||
|`omp_get_thread_num()`|Mendapatkan ID unik (rank) dari _thread_ yang sedang berjalan.|Untuk membedakan pekerjaan atau mencetak informasi _debugging_ dari setiap _thread_.|-|
|`omp_get_num_threads()`|Mendapatkan total jumlah _thread_ yang ada dalam _team_ saat ini.|Untuk mengetahui berapa banyak _thread_ yang sedang aktif.|-|

**Catatan Kompilasi:** Jangan lupa untuk menambahkan flag `-fopenmp` saat mengompilasi. Contoh: `gcc -fopenmp program.c -o program`.
