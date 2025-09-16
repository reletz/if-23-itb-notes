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
> > - Apa keterbatasan Mutex?
> >     
> > - Apa itu masalah Produsen-Konsumen?
> >     
> > - Apa itu Semaphore?
> >     
> > - Bagaimana cara kerja Semaphore?
> >     
> > - Fungsi-fungsi untuk Semaphore?
> >     
> > - Beda utama Mutex & Semaphore?
> >     
> >
> > ## Reference Points
> >
> > - Slide "paralel programming model: shared memory" (Hal. 42-46)
> >     
> 
> > ### Keterbatasan Mutex: Masalah Urutan
> >
> > Mutex sangat baik untuk menjamin hanya satu thread yang masuk ke _critical section_ pada satu waktu (eksklusi mutual). Namun, Mutex **tidak peduli dengan urutan** thread mana yang akan masuk berikutnya. Sistem operasi yang akan menentukannya. Ada kalanya kita butuh kontrol yang lebih dari itu, di mana sebuah thread harus menunggu sinyal dari thread lain sebelum bisa melanjutkan.
> >
> > ### Masalah Klasik: Produsen-Konsumen (Producer-Consumer)
> >
> > Ini adalah pola umum dalam pemrograman di mana satu atau lebih thread (produsen) menghasilkan data dan meletakkannya di sebuah _buffer_ (antrean/wadah bersama), sementara satu atau lebih thread lain (konsumen) mengambil dan memproses data dari _buffer_ tersebut.
> >
> > **Analogi:** Bayangkan sebuah ban berjalan di pabrik. Produsen menaruh barang di ban berjalan, dan konsumen mengambilnya di ujung lain. Masalahnya:
> >
> > 1. **Produsen tidak boleh menaruh barang jika ban berjalan sudah penuh.** Ia harus menunggu sampai ada ruang kosong.
> >     
> > 2. **Konsumen tidak boleh mengambil barang jika ban berjalan kosong.** Ia harus menunggu sampai ada barang yang ditaruh.
> >     
> >
> > Mutex saja tidak cukup untuk menyelesaikan ini, karena kita perlu "menghitung" jumlah barang dan ruang kosong, serta memberi sinyal antar thread.
> >
> > ### Semaphore: Mutex yang Bisa Berhitung
> >
> > **Semaphore** adalah sebuah _primitive_ sinkronisasi yang lebih umum daripada mutex. Ia pada dasarnya adalah sebuah **penghitung (counter) integer non-negatif** yang operasinya dijamin _atomic_ (tidak bisa diinterupsi). Semaphore digunakan untuk mengontrol akses ke sekumpulan sumber daya.
> >
> > ### Mekanisme Kerja Semaphore
> >
> > Semaphore bekerja melalui dua operasi utama:
> >
> > 1. **`sem_wait()`** (juga dikenal sebagai P, `wait`, atau `down`):
> >     
> >     - Mencoba mengurangi nilai semaphore sebanyak 1.
> >         
> >     - Jika nilai semaphore > 0, operasi berhasil dan thread lanjut berjalan.
> >         
> >     - Jika nilai semaphore == 0, thread akan **diblokir (tidur)** sampai ada thread lain yang menaikkan nilainya.
> >         
> > 2. **`sem_post()`** (juga dikenal sebagai V, `signal`, atau `up`):
> >     
> >     - Menaikkan nilai semaphore sebanyak 1.
> >         
> >     - Jika ada thread lain yang sedang menunggu (diblokir) di `sem_wait()` pada semaphore ini, sistem operasi akan membangunkan salah satunya.
> >         
> >
> > ### Fungsi-Fungsi Semaphore
> >
> > Semaphore bukan bagian dari standar Pthreads inti, jadi perlu menyertakan `<semaphore.h>`.
> >
> > - **`sem_t my_sem;`**: Mendeklarasikan variabel semaphore.
> >     
> > - **`sem_init(&my_sem, 0, initial_value);`**: Menginisialisasi semaphore.
> >     
> >     - `0`: Menandakan semaphore ini hanya dipakai oleh thread dalam proses yang sama.
> >         
> >     - `initial_value`: Nilai awal dari penghitung semaphore.
> >         
> > - **`sem_wait(&my_sem);`**: Menunggu atau mengurangi nilai.
> >     
> > - **`sem_post(&my_sem);`**: Memberi sinyal atau menaikkan nilai.
> >     
> > - **`sem_destroy(&my_sem);`**: Membersihkan semaphore setelah selesai.
> >     

> [!cornell] #### Summary
> Ketika Mutex tidak cukup untuk mengatur masalah sinkronisasi yang bergantung pada urutan, Semaphores hadir sebagai solusi yang lebih kuat. Semaphore adalah penghitung atomik yang menggunakan operasi `sem_wait` (untuk menunggu/mengurangi) dan `sem_post` (untuk memberi sinyal/menambah) untuk mengelola akses ke sumber daya secara terkontrol, sehingga ideal untuk menyelesaikan masalah klasik seperti Produsen-Konsumen di mana satu thread harus menunggu sinyal dari thread lain.

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis: Counting vs. Binary Semaphores
> 
> - **Counting Semaphore:** Bisa diinisialisasi dengan nilai integer non-negatif apa pun. Ini berguna untuk mengelola akses ke sejumlah sumber daya terbatas (misalnya, ada 5 koneksi database yang tersedia). Semaphore diinisialisasi ke 5. Setiap thread yang butuh koneksi akan memanggil `sem_wait()`. Thread ke-6 yang datang akan diblokir.
>     
> - **Binary Semaphore:** Varian khusus di mana nilainya hanya bisa 0 atau 1. Ini pada dasarnya memiliki fungsi yang sangat mirip dengan **Mutex**. `sem_init(&sem, 0, 1);` akan membuatnya berperilaku seperti kunci: `sem_wait` untuk mengunci, `sem_post` untuk membuka. Perbedaannya, pada mutex, thread yang mengunci haruslah thread yang membuka kunci. Pada semaphore, thread mana pun bisa memanggil `sem_post`.
>     
> 
> #### Pseudocode Solusi Produsen-Konsumen
> 
> Untuk menyelesaikan masalah ini, kita bisa menggunakan dua semaphore dan satu mutex.
> 
> - `sem_t empty_slots;` // Dihitung dari N (ukuran buffer), produsen menunggu ini.
>     
> - `sem_t full_slots;` // Dihitung dari 0, konsumen menunggu ini.
>     
> - `pthread_mutex_t buffer_mutex;` // Melindungi buffer saat dimodifikasi.
>     
> 
> **Produsen:**
> 
> ```c
> // Tunggu sampai ada slot kosong
> sem_wait(&empty_slots);
> // Kunci buffer agar aman saat diakses
> pthread_mutex_lock(&buffer_mutex);
>   // Taruh item ke buffer
> pthread_mutex_unlock(&buffer_mutex);
> // Beri sinyal bahwa ada item baru
> sem_post(&full_slots);
> ```
> 
> **Konsumen:**
> 
> ```c
> // Tunggu sampai ada item
> sem_wait(&full_slots);
> // Kunci buffer agar aman saat diakses
> pthread_mutex_lock(&buffer_mutex);
>   // Ambil item dari buffer
> pthread_mutex_unlock(&buffer_mutex);
> // Beri sinyal bahwa ada slot kosong baru
> sem_post(&empty_slots);
> ```
> 
> #### Eksplorasi Mandiri
> 
> Cobalah pikirkan bagaimana Anda bisa menggunakan semaphore untuk membatasi jumlah thread yang bisa menjalankan bagian kode tertentu secara bersamaan. Misalnya, Anda memiliki fungsi yang sangat berat dan hanya ingin maksimal 4 thread yang menjalankannya pada satu waktu. Bagaimana Anda akan menginisialisasi semaphore untuk mencapai ini?