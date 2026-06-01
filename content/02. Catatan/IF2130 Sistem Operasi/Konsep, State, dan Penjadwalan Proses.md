---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF2130 Sistem Operasi]]

> [!cornell] Konsep, State, dan Penjadwalan Proses
> 
> > ## Questions/Cues
> > 
> > - Apa itu Proses?
> >     
> > - Apa saja bagian dari proses di memori?
> >     
> > - Apa itu _Process State_?
> >     
> > - Apa itu _Process Control Block_ (PCB)?
> >     
> > - Apa itu _Scheduler_?
> >     
> > - Beda _long-term_, _short-term_, & _medium-term scheduler_?
> >     
> > - Beda proses _I/O-bound_ vs _CPU-bound_?
> >     
> > - Apa itu _Context Switch_?
> >     
> > 
> > ## Reference Points
> > 
> > - PDF: 2. IF2130-02-2025-Processpdf.pdf
> >     
> > - Slides: 3-18
>   
> > 
> > ### Konsep Proses
> > 
> > Sebuah **Proses** adalah **program yang sedang dieksekusi**. Ini bukan hanya kode program itu sendiri (yang pasif), melainkan sebuah entitas aktif yang memiliki _state_ dan sumber daya.
> > 
> > Sebuah proses terdiri dari beberapa bagian dalam memori:
> > 
> > - **Text Section**: Kode program yang dapat dieksekusi.
> >     
> > - **Data Section**: Variabel global.
> >     
> > - **Heap**: Memori yang dialokasikan secara dinamis selama runtime.
> >     
> > - **Stack**: Data sementara untuk pemanggilan fungsi (parameter, variabel lokal, _return addresses_).
> >     
> > - **Program Counter (PC)**: Menunjukkan alamat instruksi berikutnya yang akan dieksekusi.
> >     
> > - **Register CPU**: Nilai-nilai register saat ini.
> >     
> > 
> > ### Process State (Status Proses)
> > 
> > Seiring berjalannya waktu, sebuah proses akan berpindah-pindah status. Diagram 5 status dasarnya adalah:
> > 
> > 1. **New**: Proses sedang dibuat.
> >     
> > 2. **Ready**: Proses siap untuk dieksekusi dan sedang menunggu jatah waktu dari CPU.
> >     
> > 3. **Running**: Instruksi-instruksi proses sedang dieksekusi oleh CPU.
> >     
> > 4. **Waiting (or Blocked)**: Proses sedang menunggu suatu event terjadi (misalnya, operasi I/O selesai atau menerima sinyal).
> >     
> > 5. **Terminated**: Proses telah selesai dieksekusi.
> >     
> > 
> > ### Process Control Block (PCB)
> > 
> > **PCB** adalah struktur data di dalam kernel yang menyimpan semua informasi yang berkaitan dengan sebuah proses. Setiap proses memiliki satu PCB. PCB bisa dianggap sebagai "kartu identitas" proses.
> > 
> > Informasi yang disimpan di PCB meliputi:
> > 
> > - **Process State**: Status saat ini (Ready, Running, etc.).
> >     
> > - **Process ID (PID)**: Nomor identifikasi unik.
> >     
> > - **Program Counter & CPU Registers**: Disimpan saat proses diinterupsi agar bisa dilanjutkan kembali.
> >     
> > - **Informasi Penjadwalan CPU**: Prioritas, pointer ke antrian penjadwalan.
> >     
> > - **Informasi Manajemen Memori**: Peta memori atau pointer ke tabel halaman.
> >     
> > - **Informasi Akuntansi**: Waktu CPU yang telah digunakan, batasan waktu.
> >     
> > - **Informasi Status I/O**: Daftar perangkat I/O yang dialokasikan, daftar file yang dibuka.
> >     
> > 
> > ### Penjadwalan (Scheduling)
> > 
> > OS menggunakan beberapa jenis _scheduler_ untuk mengelola alur proses:
> > 
> > - **Long-Term Scheduler (Job Scheduler)**: Memilih proses-proses dari _job pool_ di disk untuk dimuat ke dalam memori (_ready queue_). Scheduler ini mengontrol **tingkat multiprogramming** (jumlah proses di memori). Jarang dieksekusi.
> >     
> > - **Short-Term Scheduler (CPU Scheduler)**: Memilih proses berikutnya yang akan dieksekusi dari _ready queue_ dan mengalokasikan CPU untuknya. Sangat sering dieksekusi (setiap beberapa milidetik).
> >     
> > - **Medium-Term Scheduler (Swapper)**: Kadang-kadang digunakan untuk memindahkan proses dari memori ke disk (_swapping out_) untuk mengurangi tingkat multiprogramming dan membebaskan memori. Proses yang di-_swap out_ dapat dimasukkan kembali ke memori nanti.
> >     
> > 
> > ### Jenis Proses: I/O-Bound vs. CPU-Bound
> > 
> > - **I/O-Bound Process**: Proses yang lebih banyak menghabiskan waktu menunggu I/O daripada melakukan komputasi. Cirinya: banyak _CPU burst_ yang singkat.
> >     
> > - **CPU-Bound Process**: Proses yang lebih banyak menghabiskan waktu melakukan komputasi. Cirinya: sedikit _CPU burst_ yang sangat panjang.
> >     
> > 
> > _Long-term scheduler_ yang baik akan mencoba menjaga campuran seimbang antara kedua jenis proses ini di memori untuk memaksimalkan utilitas CPU dan I/O.
> > 
> > ### Context Switch
> > 
> > **Context Switch** adalah mekanisme untuk mengalihkan CPU dari satu proses ke proses lain. Prosesnya meliputi:
> > 
> > 1. **Menyimpan konteks** (nilai register, PC, dll.) dari proses yang sedang berhenti ke dalam PCB-nya.
> >     
> > 2. **Memuat konteks** dari proses baru yang akan berjalan dari PCB-nya ke register CPU.
> >     
> > 
> > _Context switch_ adalah **overhead** karena selama proses peralihan ini, sistem tidak melakukan pekerjaan produktif apa pun.

> [!cornell] #### Summary
> 
> Sebuah Proses adalah program yang sedang dieksekusi, yang statusnya (New, Ready, Running, Waiting, Terminated) dan seluruh informasinya disimpan dalam sebuah Process Control Block (PCB). Sistem Operasi menggunakan scheduler—Long-term untuk mengontrol tingkat multiprogramming dan Short-term untuk memilih proses berikutnya yang akan berjalan—untuk mengelola alur proses. Peralihan CPU antar proses, yang disebut Context Switch, adalah operasi inti yang memungkinkan multitasking tetapi juga merupakan overhead bagi sistem.