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
> > - Apa kelemahan utama Busy-Waiting?
> >     
> > - Apa itu Mutex?
> >     
> > - Bagaimana alur penggunaan Mutex?
> >     
> > - Fungsi Pthreads untuk Mutex?
> >     
> > - Apa saja praktik terbaik & jebakan umum Mutex?
> >     
> > - Kapan performa Mutex lebih unggul?
> >     
> >
> > ## Reference Points
> > 
> > - Slide "paralel programming model: shared memory" (Hal. 34-41)
> >     
> 
> > ### Mengatasi Inefisiensi Busy-Waiting
> > 
> > Seperti yang dibahas sebelumnya, _busy-waiting_ sangat boros sumber daya. Sebuah thread yang aktif menunggu akan terus memakan siklus CPU, yang bisa sangat merugikan performa, terutama saat jumlah thread melebihi jumlah core prosesor. Kondisi ini seperti menyuruh seseorang terus-menerus mencoba membuka pintu yang terkunci, padahal ia bisa menunggu dengan tenang dan dipanggil saat pintu sudah terbuka.
> >
> > ### Mutex: Kunci Digital untuk Critical Section
> > 
> > **Mutex** (singkatan dari **Mutual Exclusion**) adalah mekanisme sinkronisasi yang berfungsi seperti sebuah kunci untuk melindungi _critical section_. Tujuannya sederhana: memastikan hanya satu thread yang bisa mengakses sumber daya bersama pada satu waktu.
> > 
> > Analogi yang Diperluas:
> > 
> > Bayangkan sebuah ruang rapat (critical section) dengan satu kunci (mutex).
> > 
> > - **Meminta Akses (`lock`):** Siapa pun yang ingin masuk harus mengambil kunci. Jika kunci ada, ia bisa masuk dan mengunci pintu dari dalam. Jika kunci sedang dipakai orang lain, ia harus menunggu di luar.
> >     
> > - **Perbedaan Kunci:** Tidak seperti _busy-waiting_ (mencoba gagang pintu terus-menerus), sistem mutex (antrean di luar ruang rapat) jauh lebih sopan. Sistem operasi akan mencatat siapa saja yang menunggu dan menempatkan mereka dalam "mode tidur" (status _blocked_), sehingga mereka tidak menghabiskan energi.
> >     
> > - **Melepas Akses (`unlock`):** Ketika orang di dalam selesai, ia keluar, meletakkan kunci kembali, dan memberi tahu sistem bahwa kunci sekarang tersedia. Sistem kemudian akan "membangunkan" satu orang dari antrean untuk mengambil kunci dan masuk.
> >     
> >
> > ### Fungsi-Fungsi Inti Mutex dalam Pthreads
> > 
> > Pthreads menyediakan tipe data `pthread_mutex_t` dan fungsi-fungsi untuk mengelolanya:
> > 
> > - **Inisialisasi & Hapus:**
> >     
> >     - `pthread_mutex_init(pthread_mutex_t *mutex, ...)`: Menyiapkan variabel mutex sebelum digunakan.
> >         
> >     - `pthread_mutex_destroy(pthread_mutex_t *mutex)`: Membersihkan mutex setelah selesai digunakan.
> >         
> > - **Operasi Kunci:**
> >     
> >     - `pthread_mutex_lock(pthread_mutex_t *mutex)`: Meminta dan menunggu kunci. Thread akan diblokir jika kunci sedang digunakan.
> >         
> >     - `pthread_mutex_unlock(pthread_mutex_t *mutex)`: Melepaskan kunci agar bisa digunakan thread lain.
> >         
> >
> > ### Perbandingan Performa: Kapan Mutex Unggul?
> > 
> > Data dari slide (hal. 40) menunjukkan perbedaan dramatis:
> > 
> > - **Sedikit Thread (1-8):** Waktu eksekusi _busy-wait_ dan _mutex_ hampir sama.
> >     
> > - **Banyak Thread (16, 32, 64):** Waktu eksekusi _busy-wait_ **meledak**, sementara _mutex_ **tetap stabil dan cepat**.
> >     
> > 
> > **Penyebabnya:** Ketika jumlah thread melebihi jumlah core, thread yang melakukan _busy-wait_ akan "mencuri" waktu CPU dari thread lain yang sebenarnya memegang kunci. Akibatnya, thread pemegang kunci butuh waktu lebih lama untuk selesai dan melepaskan kunci, yang memperparah antrean. Dengan mutex, thread yang menunggu akan tidur, memberikan seluruh waktu CPU kepada thread yang sedang bekerja di _critical section_ agar cepat selesai.
> >
> > ### Praktik Terbaik dan Jebakan Umum
> > 
> > - **Jaga Critical Section Tetap Singkat:** Jangan menaruh operasi yang lambat (seperti I/O file) di dalam _critical section_. Kunci harus dipegang sesingkat mungkin.
> >     
> > - **Selalu `unlock` Apa yang di-`lock`:** Lupa memanggil `pthread_mutex_unlock` akan menyebabkan semua thread lain yang membutuhkan kunci tersebut berhenti selamanya.
> >     
> > - **Hindari Deadlock:** Jangan mencoba mengunci mutex yang sama dua kali dalam satu thread tanpa membukanya. Jika perlu dua kunci, selalu kunci dalam urutan yang konsisten di semua thread (misal, selalu kunci A dulu baru kunci B).
> >     

> [!cornell] #### Summary
> Mutex adalah mekanisme sinkronisasi fundamental yang menyediakan akses eksklusif ke _**critical section**_ dengan cara yang jauh lebih efisien daripada _**busy-waiting**_. Dengan memblokir thread yang menunggu alih-alih membiarkannya berputar aktif, mutex menjaga stabilitas performa bahkan ketika jumlah thread melebihi core CPU, meskipun penggunaannya memerlukan kehati-hatian untuk menghindari jebakan seperti deadlock dan durasi penguncian yang berlebihan.

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis: Spinning vs. Blocking
> 
> - **Spinning (Busy-Waiting):** Teknik ini bisa lebih cepat jika durasi kunci dipegang sangat-sangat singkat, bahkan lebih singkat dari waktu yang dibutuhkan OS untuk menidurkan dan membangunkan thread (_context switch_).
>     
> - **Blocking (Mutex):** Pendekatan standar yang jauh lebih aman dan skalabel untuk hampir semua kasus umum. Overhead _context switch_ dapat diabaikan dibandingkan pemborosan CPU dari _spinning_.
>     
> - **Adaptive Mutex:** Beberapa implementasi modern mencoba yang terbaik dari keduanya. Mereka akan melakukan _spinning_ untuk beberapa saat, dan jika kunci belum juga tersedia, barulah mereka beralih ke _blocking_.
>     
> 
> #### Potensi Masalah Lanjutan: Deadlock & Priority Inversion
> 
> - **Deadlock:** Situasi fatal di mana dua atau lebih thread saling menunggu selamanya.
>     
>     - **Analogi:** Dua orang bertemu di koridor sempit. Orang A ingin ke kanan, Orang B ingin ke kiri. Keduanya tidak mau mengalah dan berhenti, saling memblokir jalan.
>         
>     - **Pencegahan:** Aturan utama adalah **lock ordering**. Tetapkan urutan global untuk semua kunci (misal: kunci A harus selalu didapat sebelum kunci B), dan semua thread harus mematuhi urutan itu.
>         
> - **Priority Inversion:** Masalah yang lebih halus. Terjadi ketika thread berprioritas rendah memegang kunci yang dibutuhkan oleh thread berprioritas tinggi. Jika ada thread berprioritas sedang yang aktif, ia bisa "menyalip" dan berjalan, sementara thread prioritas tinggi tetap menunggu thread prioritas rendah yang tidak mendapat jatah CPU. Solusinya biasanya melibatkan "priority inheritance", di mana thread prioritas rendah untuk sementara "dipromosikan" ke prioritas tinggi saat memegang kunci.
>     
> 
> #### Eksplorasi Mandiri
> 
> - Coba pikirkan, apa yang akan terjadi jika Anda meletakkan seluruh `for-loop` perhitungan `my_sum` (dari kasus Pi) di dalam `pthread_mutex_lock` dan `pthread_mutex_unlock`? Program masih akan memberikan hasil yang benar, tetapi apa dampaknya terhadap performa? Kenapa?