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
> > - Apa batasan performa program paralel?
> >     
> > - Beda _Speed_ vs _Feed_?
> >     
> > - Apa itu _Speedup_ & _Efficiency_?
> >     
> > - Apa isi Hukum Amdahl?
> >     
> > - Apa isi Hukum Gustafson?
> >     
> > - Beda _Strong_ vs _Weak Scaling_?
> >     
> > - Bagaimana cara mengukur waktu eksekusi?
> >     
> >
> > ## Reference Points
> >
> > - Slides IF3230-02-ParallelHardware-Software-2022.pdf
> >     
> 
> > ### Batasan Performa
> >
> > Kinerja program paralel dibatasi oleh dua faktor utama pada _hardware_:
> >
> > 1. **Speed (Kecepatan):** Seberapa cepat operasi komputasi dapat dilakukan. Diukur dalam **FLOPS** (_Floating Point Operations Per Second_). Ini adalah batas atas teoritis dari CPU.
> >     
> > 2. **Feed (Pasokan Data):** Seberapa cepat data dapat dipasok ke unit komputasi. Ini ditentukan oleh _bandwidth_ dari berbagai tingkatan memori (Cache L1/L2/L3, RAM, SSD) dan jaringan.
> >     
> >
> > Seringkali, _bottleneck_ (kemacetan) bukan terjadi pada kecepatan komputasi, melainkan pada pasokan data. Program yang tidak bisa mendapatkan data dengan cukup cepat akan membuat CPU menganggur, sehingga performa menjadi _memory-bound_ bukan _compute-bound_.
> >
> > ### Metrik Kinerja Utama
> >
> > Untuk mengukur seberapa baik sebuah program paralel, kita menggunakan dua metrik utama:
> >
> > - **Speedup (Percepatan):** Mengukur berapa kali lebih cepat versi paralel berjalan dibandingkan versi serial.
> >    $$S = T_{serial} / T_{parallel}$$
> >   - *Speedup* yang ideal (linear) adalah ketika `S = p` (di mana `p` adalah jumlah prosesor).
> >
> > - **Efficiency (Efisiensi):** Mengukur seberapa baik sumber daya (prosesor) dimanfaatkan.
> >    $$E = S / p$$
> >   - Efisiensi ideal adalah 1 (atau 100%), yang berarti semua prosesor termanfaatkan sepenuhnya. Dalam praktiknya, efisiensi seringkali turun seiring penambahan prosesor karena adanya *overhead*.
> > 
> >
> > ### Hukum dan Model Performa
> >
> > - **Hukum Amdahl:**
> > 	- **Konsep:** Percepatan sebuah program akan **dibatasi oleh bagian dari program yang tidak bisa diparalelkan** (bagian serial).
> > 	- **Implikasi:** Sekalipun Anda memiliki prosesor tak terhingga, *speedup* maksimal tidak akan bisa melebihi `1 / fraksi_serial`. Jika 90% program bisa diparalelkan (10% serial), *speedup* maksimalnya hanya 10x.
> > 	- **Konteks:** Berlaku untuk masalah dengan **ukuran tetap**.
> > 
> > - **Hukum Gustafson-Barsis:**
> > 	- **Konsep:** Argumen tandingan untuk Amdahl. Menyatakan bahwa saat kita menambah prosesor, kita cenderung ingin menyelesaikan **masalah yang lebih besar**, bukan masalah yang sama dengan lebih cepat.
> > 	- **Implikasi:** Dengan menskalakan ukuran masalah seiring dengan jumlah prosesor, dampak dari bagian serial menjadi kurang signifikan, sehingga *speedup* yang mendekati linear masih mungkin dicapai.
> > 
> > ### Skalabilitas (_Scalability_)
> >
> > Skalabilitas mengukur kemampuan sebuah program paralel untuk tetap efisien saat jumlah prosesor ditingkatkan.
> >
> > - **Strong Scaling:** Kemampuan untuk menjalankan **masalah berukuran tetap** dengan lebih cepat dengan menambahkan lebih banyak prosesor. Performa di sini sangat dipengaruhi oleh Hukum Amdahl.
> >     
> > - **Weak Scaling:** Kemampuan untuk menyelesaikan **masalah yang ukurannya bertambah secara proporsional** dengan jumlah prosesor dalam waktu yang sama. Performa di sini lebih cocok dianalisis dengan Hukum Gustafson.
> >     
> >
> > ### Teknik Pengukuran Waktu yang Benar
> >
> > Mengukur waktu eksekusi pada program paralel tidak bisa sembarangan. Waktu yang diukur haruslah **wall clock time**, yaitu waktu dari awal hingga akhir eksekusi secara keseluruhan.
> > 
> > **Prosedur yang Benar:**
> >
> > 1. **Sinkronisasi:** Pastikan semua proses/thread berada di titik awal yang sama (menggunakan _barrier_).
> >     
> > 2. **Mulai Timer:** Setiap proses/thread mencatat waktu mulainya masing-masing.
> >     
> > 3. **Eksekusi Kode:** Jalankan bagian kode yang ingin diukur.
> >     
> > 4. **Stop Timer:** Setiap proses/thread mencatat waktu selesainya dan menghitung durasi (`my_elapsed`).
> >     
> > 5. **Cari Maksimum:** Lakukan operasi reduksi global untuk mencari nilai `my_elapsed` yang **paling besar** di antara semua proses/thread. Waktu inilah yang menjadi `T_parallel` sebenarnya, karena program baru dianggap selesai setelah prosesor terakhir menyelesaikan tugasnya.
> >     

> [!cornell] #### Summary
> Analisis performa program paralel berpusat pada keseimbangan antara kecepatan komputasi (_**Speed**_) dan pasokan data (_**Feed**_), yang diukur menggunakan metrik _**Speedup**_ dan _**Efficiency**_. Hukum Amdahl menjelaskan bahwa percepatan untuk masalah berukuran tetap (_**Strong Scaling**_) akan selalu dibatasi oleh fraksi serial dari kode. Sebaliknya, Hukum Gustafson memberikan pandangan yang lebih optimis untuk masalah yang ukurannya dapat diskalakan (_**Weak Scaling**_). Untuk mendapatkan pengukuran yang akurat, waktu eksekusi harus diukur dengan benar menggunakan sinkronisasi dan mencari durasi maksimum di antara semua prosesor.

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis: Overhead Paralel
> 
> Efisiensi program paralel jarang mencapai 100% karena adanya _overhead_, yaitu waktu ekstra yang dihabiskan untuk hal-hal yang tidak ada di versi serial. $T_{parallel} = \frac{T_{serial}}{p} + T_{overhead}$. Sumber _overhead_ meliputi:
> 
>  - **Komunikasi:** Waktu yang dihabiskan untuk mengirim dan menerima data antar prosesor.
>      
>  - **Sinkronisasi:** Waktu yang dihabiskan saat prosesor harus menunggu prosesor lain (misalnya di _barrier_ atau _lock_).
>      
>  - **Komputasi Ekstra:** Algoritma paralel mungkin memerlukan langkah-langkah tambahan yang tidak ada di versi serial.
>      
> 
>  #### Analogi Sederhana: Hukum Amdahl vs. Gustafson
> 
>  Bayangkan Anda harus pergi dari Bandung ke Jakarta.
>  - **Amdahl (Ukuran Masalah Tetap):** Masalahnya adalah menempuh jarak 150 km. Anda bisa naik mobil super cepat (menambah prosesor), tetapi waktu tempuh Anda akan selalu dibatasi oleh bagian serial (kemacetan di Cikampek yang tidak bisa dihindari). Seberapa pun cepat mobil Anda di tol, Anda tetap akan terjebak macet.   
> - **Gustafson (Ukuran Masalah Bertambah):** Anda diberi waktu 8 jam untuk bepergian. Jika Anda menggunakan sepeda (1 prosesor), Anda mungkin hanya sampai Purwakarta. Jika Anda diberi mobil (banyak prosesor), dalam 8 jam yang sama Anda bisa sampai Jakarta, bahkan mungkin menyeberang ke Sumatera. Anda tidak menyelesaikan masalah yang sama lebih cepat, tetapi Anda menyelesaikan masalah yang lebih besar (menempuh jarak lebih jauh) dalam waktu yang sama.
>      
> 
>  #### Eksplorasi Mandiri
> 
>  - **Jalankan Benchmark:** Coba cari dan kompilasi _benchmark_ **STREAM** di komputer Anda. Jalankan dengan jumlah _thread_ yang berbeda-beda (misalnya 1, 2, 4, 8) dan lihat bagaimana _bandwidth_ memori yang terukur berubah. Ini akan memberi Anda gambaran nyata tentang _feed rate_ di sistem Anda.
> 