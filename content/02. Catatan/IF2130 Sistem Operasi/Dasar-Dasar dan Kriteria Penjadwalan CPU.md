---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF2130 Sistem Operasi]]

> [!cornell] Dasar-Dasar dan Kriteria Penjadwalan CPU
> 
> > ## Questions/Cues
> > 
> > - Apa itu _CPU-I/O Burst Cycle_?
> >     
> > - Kapan keputusan penjadwalan dibuat?
> >     
> > - Apa beda _preemptive_ vs _non-preemptive_?
> >     
> > - Apa itu _Dispatcher_?
> >     
> > - Apa saja kriteria penjadwalan?
> >     
> > 
> > ## Reference Points
> > 
> > - PDF: 4. IF2130-05-2025-Scheduling.pdf
> >     
> > - Slides: 4-11
> >     
>  
> > ### Konsep Dasar: CPU-I/O Burst Cycle
> > 
> > Eksekusi sebuah proses adalah siklus yang bergantian antara:
> > 
> > 1. **CPU Burst**: Periode di mana proses melakukan komputasi di CPU.
> >     
> > 2. **I/O Burst**: Periode di mana proses menunggu operasi I/O (misalnya membaca dari disk, menunggu input keyboard) selesai.
> >     
> > 
> > Penjadwalan CPU fokus pada pengelolaan alokasi CPU selama periode _CPU Burst_. Distribusi durasi _CPU Burst_ umumnya menunjukkan banyak _burst_ singkat dan sedikit _burst_ yang sangat panjang.
> > 
> > ### CPU Scheduler
> > 
> > **CPU Scheduler** (atau _short-term scheduler_) adalah bagian dari OS yang bertugas memilih satu proses dari _ready queue_ untuk dieksekusi ketika CPU menjadi idle.
> > 
> > Keputusan penjadwalan terjadi ketika sebuah proses:
> > 
> > 1. Beralih dari _Running_ ke _Waiting_ (misalnya, meminta I/O).
> >     
> > 2. Beralih dari _Running_ ke _Ready_ (misalnya, karena interupsi timer).
> >     
> > 3. Beralih dari _Waiting_ ke _Ready_ (misalnya, I/O selesai).
> >     
> > 4. Berhenti (_Terminates_).
> >     
> > 
> > ### Preemptive vs. Non-Preemptive Scheduling
> > 
> > - **Non-Preemptive**: Jika penjadwalan hanya terjadi pada kasus 1 dan 4. Artinya, sekali sebuah proses mendapatkan CPU, ia akan terus memegangnya sampai ia selesai atau secara sukarela melepaskannya (untuk I/O).
> >     
> > - **Preemptive**: Jika penjadwalan bisa terjadi di keempat kasus. Artinya, OS dapat merebut paksa CPU dari sebuah proses yang sedang berjalan (misalnya karena ada proses berprioritas lebih tinggi yang masuk atau jatah waktunya habis). Hampir semua OS modern menggunakan penjadwalan preemptive.
> >     
> > 
> > ### Dispatcher
> > 
> > **Dispatcher** adalah modul yang memberikan kontrol CPU ke proses yang dipilih oleh scheduler. Tugasnya meliputi:
> > 
> > - **Context Switching**: Menyimpan state proses lama dan memuat state proses baru.
> >     
> > - **Switching to User Mode**: Mengubah mode CPU dari kernel ke user.
> >     
> > - **Jumping**: Melompat ke lokasi yang tepat di program pengguna untuk melanjutkan eksekusinya.
> >     
> > 
> > **Dispatch Latency** adalah waktu yang dibutuhkan oleh dispatcher untuk menghentikan satu proses dan memulai proses lainnya. Waktu ini harus seminimal mungkin.
> > 
> > ### Kriteria Penjadwalan
> > 
> > Untuk mengevaluasi "kebaikan" sebuah algoritma penjadwalan, kita menggunakan beberapa metrik:
> > 
> > **Metrik yang ingin dimaksimalkan:**
> > 
> > - **CPU Utilization**: Menjaga CPU sesibuk mungkin (idealnya mendekati 100%).
> >     
> > - **Throughput**: Jumlah proses yang selesai dieksekusi per satuan waktu.
> >     
> > 
> > **Metrik yang ingin diminimalkan:**
> > 
> > - **Turnaround Time**: Total waktu yang dibutuhkan sebuah proses dari saat ia masuk sistem hingga selesai (Waktu Tunggu + Waktu Eksekusi).
> >     
> > - **Waiting Time**: Total waktu yang dihabiskan sebuah proses di _ready queue_.
> >     
> > - **Response Time**: Waktu dari saat sebuah permintaan diajukan hingga respons pertama dihasilkan (bukan output akhir). Ini adalah kriteria penting untuk sistem interaktif.
> >     

> [!cornell] #### Summary
> 
> Penjadwalan CPU adalah proses memilih satu proses dari ready queue untuk alokasi CPU, yang didasarkan pada sifat eksekusi proses yang bergantian antara CPU burst dan I/O burst. Keputusan penjadwalan bisa bersifat non-preemptive (sukarela) atau preemptive (paksa), dan diimplementasikan oleh Dispatcher. Kualitas sebuah algoritma penjadwalan diukur berdasarkan beberapa kriteria, seperti memaksimalkan utilisasi CPU dan throughput, serta meminimalkan turnaround time, waiting time, dan response time.