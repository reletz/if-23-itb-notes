---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF2130 Sistem Operasi]]

> [!cornell] Algoritma Penjadwalan Klasik
> 
> > ## Questions/Cues
> > 
> > - Bagaimana cara kerja FCFS?
> >     
> > - Apa itu _convoy effect_?
> >     
> > - Bagaimana cara kerja SJF?
> >     
> > - Beda SJF _preemptive_ vs _non-preemptive_?
> >     
> > - Bagaimana memprediksi _CPU burst_ berikutnya?
> >     
> > - Bagaimana cara kerja _Round Robin_ (RR)?
> >     
> > - Apa peran _time quantum_?
> >     
> > - Bagaimana cara kerja _Priority Scheduling_?
> >     
> > - Apa masalah _starvation_ dan solusinya?
> >     
> > 
> > ## Reference Points
> > 
> > - PDF: 4. IF2130-05-2025-Scheduling.pdf
> >     
> > - Slides: 12-27
> >     
>  
> > ### First-Come, First-Served (FCFS)
> > 
> > - **Cara Kerja**: Proses yang datang pertama akan dilayani pertama (seperti antrian di bank). Sangat sederhana untuk diimplementasikan dengan antrian FIFO.
> >     
> > - **Sifat**: Non-preemptive.
> >     
> > - **Kelemahan**: _Average waiting time_ seringkali sangat buruk. Sangat sensitif terhadap urutan kedatangan proses.
> >     
> > - **Convoy Effect**: Masalah di mana beberapa proses pendek harus menunggu di belakang satu proses yang sangat panjang, menyebabkan utilisasi perangkat I/O menjadi rendah.
> >     
> > 
> > ### Shortest-Job-First (SJF)
> > 
> > - **Cara Kerja**: CPU dialokasikan ke proses yang memiliki durasi _CPU burst_ berikutnya yang paling pendek.
> >     
> > - **Optimalitas**: Terbukti optimal dalam memberikan _average waiting time_ minimum.
> >     
> > - **Variasi**:
> >     
> >     1. **Non-Preemptive SJF**: Jika sebuah proses mulai berjalan, ia akan berjalan sampai _CPU burst_-nya selesai.
> >         
> >     2. **Preemptive SJF (Shortest-Remaining-Time-First, SRTF)**: Jika proses baru datang dengan _burst_ yang lebih pendek dari sisa waktu proses yang sedang berjalan, OS akan melakukan _preempt_ dan menjalankan proses baru tersebut.
> >         
> > - **Kelemahan Utama**: Tidak mungkin mengetahui panjang _CPU burst_ berikutnya secara pasti. Solusinya adalah dengan **memprediksi** berdasarkan histori _burst_ sebelumnya menggunakan _exponential averaging_.
> >     
> > 
> > ### Priority Scheduling
> > 
> > - **Cara Kerja**: Setiap proses diberi sebuah nilai prioritas (integer). CPU dialokasikan ke proses dengan prioritas tertinggi.
> >     
> > - **Sifat**: Bisa preemptive atau non-preemptive.
> >     
> > - **Hubungan dengan SJF**: SJF bisa dianggap sebagai _priority scheduling_ di mana prioritas adalah invers dari prediksi panjang _CPU burst_ berikutnya.
> >     
> > - **Masalah Utama**: **Starvation** atau _indefinite blocking_, di mana proses berprioritas rendah mungkin tidak akan pernah mendapat giliran CPU.
> >     
> > - **Solusi Starvation**: **Aging**, yaitu secara bertahap menaikkan prioritas proses yang telah menunggu terlalu lama.
> >     
> > 
> > ### Round Robin (RR)
> > 
> > - **Cara Kerja**: Mirip FCFS, tetapi bersifat _preemptive_. Setiap proses diberi jatah waktu CPU yang kecil, disebut **time quantum** atau _time slice_ (biasanya 10-100 ms).
> >     
> > - Proses berjalan selama _time quantum_-nya. Jika belum selesai, ia akan di-_preempt_ dan dipindahkan ke belakang _ready queue_.
> >     
> > - **Performa**:
> >     
> >     - Jika _quantum_ sangat besar, RR menjadi FCFS.
> >         
> >     - Jika _quantum_ sangat kecil, _overhead_ dari _context switching_ menjadi sangat tinggi.
> >         
> > - RR memberikan _response time_ yang jauh lebih baik daripada FCFS, tetapi _average turnaround time_-nya cenderung lebih buruk daripada SJF.
> >     

> [!cornell] #### Summary
> 
> Algoritma penjadwalan klasik menawarkan trade-off antara kesederhanaan, keadilan, dan performa. FCFS adalah yang paling sederhana namun rentan terhadap convoy effect. SJF terbukti optimal untuk average waiting time namun sulit diimplementasikan karena harus memprediksi masa depan. Priority Scheduling memungkinkan penentuan kepentingan proses namun berisiko menyebabkan starvation, yang bisa diatasi dengan aging. Round Robin menggunakan time quantum untuk memberikan response time yang baik dan mencegah starvation, menjadikannya pilihan umum untuk sistem interaktif.