---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF2130 Sistem Operasi]]

> [!cornell] Penjadwalan Tingkat Lanjut dan Multi-Processor
> 
> > ## Questions/Cues
> > 
> > - Apa itu _Multilevel Queue_?
> >     
> > - Apa itu _Multilevel Feedback Queue_?
> >     
> > - Apa tantangan penjadwalan _multi-processor_?
> >     
> > - Apa itu _Symmetric Multiprocessing_ (SMP)?
> >     
> > - Apa itu _Processor Affinity_?
> >     
> > - Apa itu _Load Balancing_?
> >     
> > - Bagaimana penjadwalan pada sistem _multicore_?
> >     
> > - Apa itu penjadwalan _Real-Time_?
> >     
> > 
> > ## Reference Points
> > 
> > - PDF: 4. IF2130-05-2025-Scheduling.pdf
> >     
> > - Slides: 28-50
> >     
> 
> > ### Multilevel Queue Scheduling
> > 
> > - **Konsep**: Mempartisi _ready queue_ menjadi beberapa antrian terpisah. Proses secara permanen dimasukkan ke dalam satu antrian, biasanya berdasarkan tipenya (misalnya, _interactive_ vs. _batch_).
> >     
> > - **Penjadwalan Antar Antrian**:
> >     
> >     - **Fixed-Priority**: Antrian prioritas tinggi (misal, _interactive_) harus kosong sebelum antrian prioritas rendah dilayani. Berisiko _starvation_.
> >         
> >     - **Time Slice**: Setiap antrian mendapat jatah waktu CPU tertentu (misal, 80% untuk _foreground_ dengan RR, 20% untuk _background_ dengan FCFS).
> >         
> > 
> > ### Multilevel Feedback Queue (MLFQ)
> > 
> > - **Konsep**: Mirip dengan _multilevel queue_, tetapi **proses bisa berpindah antar antrian**. Ini adalah algoritma yang paling umum digunakan.
> >     
> > - **Cara Kerja Umum**:
> >     
> >     1. Sebuah proses masuk ke antrian prioritas tertinggi.
> >         
> >     2. Jika proses tidak selesai dalam _time quantum_ antrian tersebut, ia akan diturunkan ke antrian prioritas lebih rendah (yang biasanya memiliki _quantum_ lebih panjang).
> >         
> >     3. Jika proses yang menunggu terlalu lama di antrian rendah, ia bisa dinaikkan kembali (_aging_) untuk mencegah _starvation_.
> >         
> > - **Tujuan**: Memisahkan proses berdasarkan karakteristik _CPU burst_-nya. Proses _CPU-bound_ akan cepat turun ke antrian prioritas rendah, sementara proses _I/O-bound_ dan interaktif akan tetap di antrian prioritas tinggi.
> >     
> > 
> > ### Penjadwalan Multi-Processor
> > 
> > - **Tantangan**: Penjadwalan menjadi lebih kompleks karena harus memutuskan tidak hanya "proses mana" yang berjalan, tetapi juga "di CPU mana" ia berjalan.
> >     
> > - **Symmetric Multiprocessing (SMP)**: Pendekatan paling umum, di mana setiap prosesor menjadwalkan dirinya sendiri secara independen. Bisa menggunakan satu _ready queue_ bersama atau setiap prosesor memiliki _ready queue_ pribadinya.
> >     
> > 
> > ### Isu dalam Penjadwalan Multi-Processor
> > 
> > 1. **Processor Affinity**: Sebuah proses yang berjalan di satu prosesor akan mengisi cache prosesor tersebut. Jika proses dipindahkan ke prosesor lain, isi cache menjadi tidak valid dan harus diisi ulang (ini lambat).
> >     
> >     - **Soft Affinity**: OS akan berusaha menjaga proses tetap di prosesor yang sama, tapi tidak dijamin.
> >         
> >     - **Hard Affinity**: Proses dapat menentukan set prosesor di mana ia boleh berjalan.
> >         
> > 2. **Load Balancing**: Upaya untuk menjaga beban kerja terdistribusi secara merata di semua prosesor.
> >     
> >     - **Push Migration**: Sebuah proses periodik memeriksa beban dan memindahkan (_push_) proses dari CPU yang sibuk ke CPU yang idle.
> >         
> >     - Pull Migration: CPU yang idle akan menarik (pull) proses dari CPU lain yang sibuk.
> >         
> >         Catatan: Load balancing seringkali berlawanan dengan processor affinity.
> >         
> > 
> > ### Penjadwalan Real-Time
> > 
> > - **Konsep**: Untuk sistem di mana penyelesaian tugas dalam batas waktu tertentu adalah krusial.
> >     
> > - **Soft Real-Time**: Menjamin bahwa proses kritis akan diberi prioritas lebih tinggi, tapi tidak ada jaminan kapan akan selesai.
> >     
> > - **Hard Real-Time**: Tugas harus selesai sebelum _deadline_-nya. Jika tidak, terjadi kegagalan sistem.
> >     
> > - **Algoritma Umum**:
> >     
> >     - **Rate Monotonic**: Prioritas statis berdasarkan frekuensi (periode lebih pendek = prioritas lebih tinggi).
> >         
> >     - **Earliest Deadline First (EDF)**: Prioritas dinamis berdasarkan _deadline_ terdekat.
> >         

> [!cornell] #### Summary
> 
> Algoritma penjadwalan tingkat lanjut seperti Multilevel Feedback Queue (MLFQ) memungkinkan OS untuk secara dinamis mengklasifikasikan proses dan memberikan perlakuan yang sesuai, mencegah starvation melalui aging. Pada sistem multi-processor, tantangan utama adalah menyeimbangkan antara Load Balancing (distribusi kerja yang merata) dan Processor Affinity (memaksimalkan penggunaan cache). Sementara itu, sistem real-time memerlukan algoritma khusus seperti Rate Monotonic atau EDF untuk memastikan tugas-tugas kritis dapat memenuhi deadline mereka.