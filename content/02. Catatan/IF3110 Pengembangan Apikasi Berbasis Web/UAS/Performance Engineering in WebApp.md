---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3110 Pengembangan Aplikasi Berbasis Web]]

> [!cornell] Topic: Performance Engineering in Web App
> 
> > ## Questions/Cues
> >
> > - Definisi Performance Engineering
> >     
> > - Tiga Kategori Performa
> >     
> > - Objektif Bisnis Utama
> >     
> > - Kasus Kegagalan Nyata
> >     
> > - Speed, Scalability, Stability
> >     
> > - Benchmark vs Baseline
> >     
> > - Konsep Knee dan Cliff
> >     
> > - Beban User Load
> >     
> > - Komponen Response Time
> >     
> > - Optimasi Layer Web
> >     
> > - Strategi Optimasi Database
> >     
> >
> > ## Reference Points
> >
> > - Slide IF3110-12-Performance-Engineering
> >     
> 
> > ### 1. Definisi dan Esensi
> >
> > **Performance Engineering** adalah proses sistematis di mana perangkat lunak diuji dan disetel (_tuned_) dengan maksud untuk merealisasikan performa yang dibutuhkan. Ini bukan aktivitas sekali jalan, melainkan siklus berkelanjutan.
> >
> > ### 2. Objektif Utama (Business & Tech)
> >
> > - **Meningkatkan Pendapatan:** Sistem yang cepat membuat pengguna betah dan melakukan transaksi.
> >     
> > - **Optimasi Infrastruktur:** Memastikan penggunaan server dan sumber daya efisien (tidak boros biaya).
> >     
> > - **Meningkatkan Availability:** Menyelesaikan masalah sebelum sistem benar-benar mati.
> >     
> > - **Efisiensi Biaya:** Mengurangi biaya pemeliharaan jangka panjang.
> >     
> > - **Mencegah Kegagalan Total:** Menghindari kerugian akibat proyek yang harus dihentikan karena masalah performa fundamental.
> >     
> >
> > ### 3. Belajar dari Realita (Kasus Kegagalan)
> >
> > - **DJP Online:** Server kehabisan bandwidth karena lonjakan pelaporan pajak mendekati tenggat waktu (31 Maret).
> >     
> > - **Pokemon Go:** Mengalami crash massal saat rilis karena beban pengguna melampaui prediksi infrastruktur.
> >     
> > - **Statistik Amazon:** Perlambatan hanya 100ms (sepersepuluh detik) berkorelasi dengan penurunan penjualan sebesar 1%. Ini setara dengan kerugian $1.6 Miliar per tahun.
> >     
> >
> > ### 4. Pilar Utama Performa (3S)
> >
> > 1. **Speed (Kecepatan):** Seberapa responsif aplikasi terhadap aksi pengguna.
> >     
> > 2. **Scalability (Skalabilitas):** Kemampuan menangani penambahan beban tanpa degradasi layanan.
> >     
> > 3. **Stability (Stabilitas):** Konsistensi performa dalam jangka waktu lama atau beban berat.
> >     
> >
> > ### 5. Profiling & Pengukuran
> >
> > - **Benchmarking:** Membandingkan hasil dengan standar industri atau pesaing.
> >     
> > - **Baselining:** Menentukan angka performa "normal" saat ini sebagai titik acuan perubahan di masa depan.
> >     
> >
> > **Kurva Performance:**
> >
> > - **Knee (Lutut):** Titik di mana pemakaian sumber daya mulai jenuh dan waktu respons mulai naik tajam.
> >     
> > - **Cliff (Tebing):** Titik kegagalan sistem (throughput turun drastis, response time tak terhingga).
> >     
> >
> > ### 6. Memahami User Load
> >
> > - **Concurrent Users:** Jumlah pengguna yang terkoneksi/aktif dalam suatu periode (misal: 1000 orang dalam 1 jam).
> >     
> > - **Simultaneous Users:** Jumlah pengguna yang menekan tombol secara bersamaan di detik yang sama. Ini adalah penentu utama beban server.
> >     
> >
> > ### 7. Metrik Teknis
> >
> > - **Response Time:** `Latency + Processing Time`. Waktu tunggu total pengguna.
> >     
> > - **Throughput:** Jumlah transaksi per detik (TPS) atau request per detik yang diproses.
> >     
> > - **Utilization:** Persentase beban kerja CPU, memori, atau disk.
> >     
> >
> > ### 8. Area Optimasi Spesifik
> >
> > **Optimasi Web:**
> >
> > - Kurangi jumlah dan ukuran resource (gambar, JS, CSS).
> >     
> > - Terapkan strategi caching yang ketat.
> >     
> > - Perhatikan waktu render browser dan aspek jaringan (DNS lookup, TLS handshake).
> >     
> > **Optimasi Database:**
> > - Pisahkan Analytics (BI) dari Transaction Processing.
> >     
> > - Hati-hati dengan biaya `JOIN` dan normalisasi berlebihan (3NF).
> >     
> > - Hindari `SELECT *`, `SORT BY`, dan `GROUP BY` pada dataset besar jika tidak kritikal.
> >     
> > - **Prinsip:** Gunakan transaksi dan lock database hanya jika benar-benar diperlukan.
> >     
> > - Lakukan pembersihan data (_Purge_ vs _Archive_).
> >     

> [!cornell] #### Summary
> 
> Performance Engineering berfokus pada keseimbangan antara Speed, Scalability, dan Stability. Kegagalan performa memiliki dampak finansial nyata (seperti kasus Amazon dan DJP). Developer harus mampu mengidentifikasi titik Knee dan Cliff serta melakukan optimasi berlapis mulai dari ukuran aset di frontend hingga query database yang efisien untuk menjamin sistem tetap reliabel.

> [!ad-libitum]- Additional Information (Deep Dive)
> 
> #### Analisis Matematis: Hukum Little & Queuing Theory
> 
> Mengapa waktu respons naik tajam saat utilisasi tinggi? Secara matematis, hubungan waktu respons ($R$) terhadap penggunaan sumber daya ($U$) adalah:
> 
> $$R = \frac{S}{1 - U}$$
> 
> Jika $U$ (Utilisasi) adalah 0.9 (90%), maka pembagi menjadi 0.1, yang membuat $R$ menjadi 10 kali lebih besar dari waktu proses murni ($S$). Inilah alasan teknis mengapa kita harus menjaga utilisasi server di bawah titik jenuh.
> 
> #### Checklist Optimasi Database
> 
> 1. Hindari `SELECT` sebelum `UPDATE` jika memungkinkan.
>     
> 2. Gunakan `INDEX` yang tepat untuk kolom yang sering masuk dalam `WHERE` clause.
>     
> 3. Lakukan pengarsipan data lama secara berkala agar tabel utama tidak membengkak secara eksponensial.
>     
> 
> #### Sumber & Referensi Lanjutan:
> 
> - _High Performance Browser Networking_ - Ilya Grigorik.
>     
> - ISO 9241-11:2018 terkait standar efektivitas dan efisiensi sistem.
>     

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Apa perbedaan antara Benchmarking dan Baselining?</strong></summary>
> 
> Benchmarking adalah membandingkan sistem kita dengan standar luar (pesaing/industri), sedangkan Baselining adalah membandingkan sistem kita dengan versi kita sendiri di masa lalu untuk melihat kemajuan/kemunduran.
> 
> </details>
> <details>
> 
> <summary><strong>2. Apa yang dimaksud dengan "Think Time"?</strong></summary>
> 
> Waktu yang dihabiskan oleh pengguna manusia untuk membaca atau berpikir di antara satu request dengan request berikutnya.
> 
> </details>
> <details>
> 
> <summary><strong>3. Sebutkan rumus Response Time!</strong></summary>
> 
> Response Time = Latency (waktu perjalanan di jaringan) + Processing Time (waktu eksekusi di server).
> 
> </details>
> <details>
> 
> <summary><strong>4. Mengapa "Simultaneous Users" lebih berbahaya bagi server daripada "Concurrent Users"?</strong></summary>
> 
> Karena Simultaneous Users memicu lonjakan beban puncak (peak load) secara instan pada sumber daya sistem di detik yang sama, sedangkan Concurrent Users beban kerjanya lebih tersebar.
> 
> </details>
> <details>
> 
> <summary><strong>5. Apa implikasi dari titik "Cliff" dalam grafik performa?</strong></summary>
> 
> Titik Cliff mengindikasikan kegagalan sistem di mana penambahan beban menyebabkan sistem berhenti merespons dengan benar atau throughput turun menjadi hampir nol.
> 
> </details>