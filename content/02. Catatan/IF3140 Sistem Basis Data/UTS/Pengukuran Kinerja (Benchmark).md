---

type: Note

cssclasses:

- cornell-notes
    

---

_Back to_ [[IF3140 Sistem Basis Data]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> > 
> > - Apa itu performance benchmark dan apa yang diukurnya?
> >     
> > - Apa perbedaan antara OLTP dan OLAP?
> >     
> > - Apa itu TPC dan apa saja contoh benchmark-nya?
> >     
> > - Bagaimana TPC memastikan hasil benchmark dapat dipercaya?
> >     
> 
> > ### Definisi dan Metrik Benchmark
> > 
> > **Performance Benchmark** adalah serangkaian tugas standar yang digunakan untuk mengukur dan mengkuantifikasi kinerja sebuah sistem perangkat lunak secara objektif. Ini sangat penting untuk membandingkan sistem basis data yang berbeda. Metrik yang umum diukur adalah:
> > 
> > - **Throughput:** Jumlah transaksi yang bisa diproses per detik (tps).
> >     
> > - **Response Time:** Waktu tunda dari transaksi dikirim hingga hasilnya diterima.
> >     
> > - **Availability:** Ketersediaan sistem atau waktu rata-rata sebelum terjadi kegagalan.
> >     
> >
> > ### Kelas Aplikasi Database: OLTP vs OLAP
> > 
> > Aplikasi basis data secara umum dapat dibagi menjadi dua kelas utama, yang masing-masing membutuhkan tuning yang berbeda:
> > 
> > - **OLTP (Online Transaction Processing):** Aplikasi dengan banyak transaksi update singkat, seperti sistem perbankan atau e-commerce. Membutuhkan konkurensi tinggi dan proses _commit_ yang cepat.
> >     
> > - **OLAP (Online Analytical Processing):** Aplikasi pendukung keputusan (_decision support_) dengan query-query kompleks yang menganalisis data dalam jumlah besar. Membutuhkan optimasi query yang sangat baik.
> >     
> >
> > ### Standar Benchmark TPC
> > 
> > **TPC (Transaction Processing Council)** adalah organisasi yang membuat standar benchmark yang paling banyak digunakan di industri. Beberapa suite benchmark terkenalnya adalah:
> > 
> > - **TPC-C:** Standar untuk mengukur kinerja **OLTP**, memodelkan sistem inventaris yang kompleks.
> >     
> > - **TPC-H dan TPC-R:** Standar untuk **OLAP**. TPC-H (H untuk _ad-hoc_) melarang optimasi tertentu untuk mensimulasikan query yang tidak terduga, sementara TPC-R (R untuk _reporting_) memperbolehkannya.
> >     
> > - **TPC-W:** Standar untuk aplikasi **Web**, memodelkan interaksi di sebuah toko buku online.
> >     
> >
> > ### Kepercayaan dan Metrik TPC
> > 
> > Hasil benchmark TPC sangat dapat dipercaya karena **audit eksternal bersifat wajib** untuk setiap klaim performa yang dipublikasikan. TPC juga menuntut ukuran database harus bertambah seiring dengan kenaikan tps yang diklaim, sehingga mencerminkan kondisi dunia nyata. Metrik utamanya tidak hanya **tps**, tetapi juga **tps-per-dolar**, yang memperhitungkan total biaya kepemilikan sistem.

> [!cornell] #### Summary
> 
> **Performance Benchmark** adalah metode standar untuk mengukur kinerja sistem, dengan fokus pada metrik seperti **throughput** dan **response time**. Sistem database umumnya dioptimalkan untuk salah satu dari dua kelas aplikasi: **OLTP** (transaksi cepat) atau **OLAP** (analisis kompleks). **TPC** adalah badan standar industri yang menyediakan benchmark terpercaya seperti **TPC-C (untuk OLTP)** dan **TPC-H/R (untuk OLAP)**, di mana hasilnya wajib diaudit dan sering kali diukur dalam **kinerja-per-dolar**.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Harmonic Mean vs. Arithmetic Mean
> 
> Mengapa menggunakan rata-rata harmonik untuk throughput? Bayangkan sebuah mobil menempuh perjalanan 10 km dengan kecepatan 10 km/jam (butuh 1 jam) dan kembali 10 km dengan kecepatan 100 km/jam (butuh 0.1 jam). Rata-rata aritmetik kecepatannya adalah (10+100)/2 = 55 km/jam. Namun, ini salah. Total jaraknya 20 km dan total waktunya 1.1 jam. Kecepatan rata-rata sebenarnya adalah 20/1.1 ≈ 18.2 km/jam. Rata-rata harmonik memberikan jawaban yang benar: 2 / (1/10 + 1/100) ≈ 18.2. Prinsip yang sama berlaku untuk throughput transaksi.
> 
> #### HTAP: The Modern Hybrid
> 
> Secara tradisional, perusahaan menggunakan database OLTP untuk operasional harian dan secara berkala memindahkan datanya (proses ETL) ke database OLAP (_data warehouse_) untuk analisis. Proses ini memakan waktu. Kini, muncul arsitektur baru bernama **HTAP (Hybrid Transactional/Analytical Processing)**. Database HTAP dirancang untuk menangani beban kerja OLTP dan OLAP secara bersamaan pada satu sistem yang sama, memungkinkan analisis _real-time_ tanpa perlu memindahkan data.