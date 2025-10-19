---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF2130 Sistem Operasi]]

> [!cornell] Manajemen Proses dan Konkurensi Awal
> 
> > ## Questions/Cues
> > 
> > - Apa itu multiprogramming?
> >     
> > - Mengapa multiprogramming penting?
> >     
> > - Apa itu timesharing/multitasking?
> >     
> > - Apa itu _context switch_?
> >     
> > - Apa itu interupsi (interrupt)?
> >     
> > - Beda interupsi hardware vs software?
> >     
> > - Bagaimana mekanisme interupsi?
> >     
> > - Beda I/O sinkron vs asinkron?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides 27-35, IF2130-01-2025-OSIntro.pdf
> 
> > 
> > ### Multiprogramming
> > 
> > Multiprogramming adalah teknik di mana **beberapa program (jobs) disimpan di memori secara bersamaan**. Tujuannya adalah untuk memaksimalkan utilitas CPU.
> > 
> > - **Cara Kerja**: Komputer modern jauh lebih cepat dalam melakukan komputasi (oleh CPU) daripada melakukan operasi I/O (membaca dari disk atau jaringan). Dalam sistem non-multiprogramming, jika sebuah program menunggu I/O selesai, CPU akan menganggur (idle). Multiprogramming mengatasi ini dengan cara: ketika satu program harus menunggu I/O, sistem operasi akan **mengalihkan CPU untuk mengerjakan program lain** yang sudah siap di memori.
> >     
> > - **Analogi**: Bayangkan seorang koki (CPU) yang harus memasak beberapa hidangan (program). Jika satu hidangan perlu dipanggang di oven selama 15 menit (operasi I/O), koki tidak akan diam menunggu. Sebaliknya, ia akan mulai memotong sayuran untuk hidangan berikutnya. Ini memastikan koki selalu produktif.
> >     
> > 
> > ### Timesharing (Multitasking)
> > 
> > Timesharing adalah evolusi dari multiprogramming yang dirancang untuk sistem interaktif. Tujuannya bukan hanya efisiensi, tetapi juga **keadilan (fairness) dan responsivitas**.
> > 
> > - **Cara Kerja**: OS akan membagi waktu CPU menjadi potongan-potongan kecil yang disebut _time slice_ atau _quantum_. CPU akan beralih di antara semua proses yang ada di memori dengan sangat cepat, memberikan setiap proses jatah waktu eksekusi.
> >     
> > - **Ilusi Konkurensi**: Karena peralihan ini terjadi puluhan atau ratusan kali per detik, pengguna mendapatkan ilusi bahwa semua program mereka berjalan secara bersamaan (concurrently).
> >     
> > - **Context Switch**: Proses menyimpan _state_ (konteks) dari sebuah proses yang sedang dihentikan dan memuat _state_ dari proses yang akan dijalankan berikutnya disebut **context switch**. Konteks ini meliputi informasi vital seperti nilai register CPU, program counter, dan status memori. Context switch adalah _overhead_ karena tidak ada pekerjaan berguna yang dilakukan selama proses peralihan itu sendiri.
> >     
> > 
> > ### Interupsi (Interrupt)
> > 
> > Interupsi adalah **sinyal yang dikirim ke CPU** untuk memberitahukan adanya suatu kejadian (event) yang memerlukan perhatian segera. Ini adalah mekanisme fundamental yang memungkinkan OS mengambil alih kendali dari program yang sedang berjalan dan merespons berbagai kejadian.
> > 
> > - **Hardware Interrupt**: Dihasilkan oleh perangkat keras. Contoh: mouse digerakkan, tombol keyboard ditekan, atau sebuah perangkat I/O telah selesai mentransfer data.
> >     
> > - **Software Interrupt (Trap/Exception)**: Dihasilkan oleh perangkat lunak. Ini terjadi ketika sebuah program menjalankan instruksi khusus yang disebut **system call** untuk meminta layanan dari OS (misalnya, membaca file), atau ketika terjadi error (misalnya, pembagian dengan nol atau akses memori ilegal).
> >     
> > 
> > ### Mekanisme Interupsi Bekerja
> > 
> > 1. Sebuah event (hardware atau software) memicu interupsi.
> >     
> > 2. CPU segera menghentikan eksekusi program saat ini.
> >     
> > 3. CPU menyimpan konteks (state) dari program yang dihentikan tersebut.
> >     
> > 4. CPU melompat ke kode khusus di dalam OS yang disebut **Interrupt Handler** atau _Interrupt Service Routine_.
> >     
> > 5. OS menjalankan _handler_ untuk menangani event tersebut.
> >     
> > 6. Setelah selesai, OS akan memulihkan konteks program yang tadi dihentikan dan melanjutkannya, atau melakukan _context switch_ ke program lain.
> >     
> > 
> > ### I/O Sinkron vs. Asinkron
> > 
> > Ini adalah dua mode bagaimana sebuah proses berinteraksi dengan operasi I/O.
> > 
> > - **I/O Sinkron (Synchronous)**: Setelah sebuah proses meminta operasi I/O, proses tersebut akan **berhenti dan menunggu (diblokir)** hingga operasi I/O tersebut selesai sepenuhnya. Kontrol baru dikembalikan ke proses setelah data siap. Ini lebih sederhana untuk diprogram.
> >     
> > - **I/O Asinkron (Asynchronous)**: Setelah meminta I/O, kontrol **langsung dikembalikan** ke proses tanpa harus menunggu. Proses dapat melanjutkan pekerjaannya yang lain. Ketika operasi I/O selesai, OS akan memberitahu proses tersebut (misalnya, melalui interupsi). Ini memungkinkan komputasi dan I/O berjalan tumpang tindih, sehingga meningkatkan efisiensi dan throughput sistem.
> >     

> [!cornell] #### Summary
> 
> Sistem operasi modern mencapai konkurensi melalui multiprogramming, yang menjaga agar CPU tetap sibuk dengan menjalankan beberapa program di memori. Untuk interaktivitas, timesharing digunakan untuk beralih antar proses dengan cepat (melalui context switch), menciptakan ilusi eksekusi simultan. Mekanisme fundamental yang memungkinkan peralihan kontrol ini adalah interupsi—sinyal dari hardware atau software—yang memaksa CPU untuk menjalankan kode OS. Perilaku proses saat meminta layanan I/O bisa bersifat sinkron (menunggu hingga selesai) atau asinkron (melanjutkan eksekusi sambil menunggu), yang berdampak besar pada efisiensi sistem.

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis 1: The Context Switch Overhead
> 
> _Context switch_ bukanlah operasi "gratis". Setiap kali terjadi, OS harus melakukan pekerjaan administratif yang cukup signifikan:
> 
> 1. **Menyimpan Konteks**: Semua nilai di dalam register CPU (program counter, stack pointer, register general-purpose) dari proses A harus disimpan ke memori, biasanya dalam sebuah struktur data yang disebut _Process Control Block_ (PCB).
>     
> 2. **Memuat Konteks Baru**: OS kemudian harus memuat nilai-nilai register dari PCB milik proses B ke dalam register CPU.
>     
> 3. **Lain-lain**: OS mungkin juga perlu memperbarui data internalnya, seperti penjadwal (scheduler), dan terkadang mengganti informasi pemetaan memori di _Memory Management Unit_ (MMU).
>     
> 
> Semua waktu yang dihabiskan untuk ini adalah _overhead_, karena tidak ada instruksi dari program pengguna yang dieksekusi. Jika _context switch_ terjadi terlalu sering (misalnya, _time slice_ terlalu kecil), persentase waktu CPU yang terbuang untuk _overhead_ ini bisa menjadi signifikan, menurunkan kinerja sistem secara keseluruhan.
> 
> #### Pendalaman Teknis 2: Interrupt Vector Table (IVT)
> 
> Bagaimana CPU tahu kode _handler_ mana yang harus dijalankan untuk interupsi yang berbeda? CPU tidak hanya melompat ke satu alamat tetap. Di awal memori, OS menyiapkan sebuah struktur data yang disebut **Interrupt Vector Table**. Tabel ini pada dasarnya adalah sebuah array dari pointer. Setiap jenis interupsi (keyboard, timer, disk controller, dll.) diberi nomor unik. Nomor ini digunakan sebagai indeks ke dalam IVT untuk menemukan alamat memori di mana _handler_ yang sesuai berada. Mekanisme ini memungkinkan penanganan yang cepat dan terorganisir untuk berbagai jenis _event_.
> 
> #### Eksplorasi Mandiri
> 
> - **Amati Context Switch di Sistem Anda**: Anda bisa melihat seberapa sering OS Anda melakukan _context switch_.
>     
>     - Di **Linux/macOS**, buka terminal dan jalankan perintah `vmstat 1`. Perhatikan kolom `cs` (context switches per second).
>         
>     - Di Windows, buka Performance Monitor (PerfMon) dan tambahkan counter "System" -> "Context Switches/sec".
>         
>         Jalankan beberapa aplikasi dan gerakkan mouse Anda, Anda akan melihat angka ini meningkat drastis, menunjukkan betapa aktifnya OS bekerja di latar belakang.
>         
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Buku Teks**:
>     
>     - _Operating System Concepts_ (Silberschatz et al.): Bab 1 (Introduction) dan Bab 3 (Processes) membahas konsep-konsep ini secara mendalam.
>         
>     - _Operating Systems: Three Easy Pieces_ (Arpaci-Dusseau): Bab 4-6 (Processes, Process API, Direct Execution) memberikan penjelasan yang sangat intuitif.
>