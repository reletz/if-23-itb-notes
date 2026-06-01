---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[WI2022 Manajemen Proyek]]

> [!cornell] Pengembangan dan Pengendalian Jadwal (Schedule Development & Control)
> 
> > ## Questions/Cues
> > 
> > - Apa itu Schedule Development?
> >     
> > - Apa output utamanya?
> >     
> > - Apa itu Gantt Chart?
> >     
> > - Apa itu Schedule Baseline?
> >     
> > - Apa itu Schedule Control?
> >     
> > - Apa saja alat untuk pengendalian?
> >     
> > - Apa kunci dari Schedule Control?
> >     
> >
> > ## Reference Points
> > 
> > - ManPro-06-Project-Time-Management.pdf (Slides 17-23)
> >     
> 
> > ### Proses 5: Schedule Development (Pengembangan Jadwal)
> > 
> > Ini adalah proses menganalisis urutan aktivitas, durasi, kebutuhan sumber daya, dan batasan jadwal untuk membuat model jadwal proyek. Tujuannya adalah membuat **roadmap** yang realistis.
> > 
> > - **Input:** Semua output dari proses-proses sebelumnya (Activity List, Network Diagram, Resource Requirements, Duration Estimates).
> >     
> > - **Output Utama:**
> >     
> >     - **Project Schedule:** Jadwal proyek yang final, biasanya disajikan dalam bentuk **Gantt Chart**. Ini mencakup tanggal mulai dan selesai yang terencana untuk setiap aktivitas.
> >         
> >     - **Schedule Baseline:** Versi jadwal yang telah disetujui. Ini menjadi acuan untuk mengukur kemajuan dan kinerja waktu proyek. Setiap perubahan pada baseline harus melalui proses kontrol perubahan formal.
> >         
> >     - **Schedule Data Model:** Kumpulan data dan informasi yang digunakan untuk membuat jadwal, yang nantinya akan menjadi dasar untuk laporan dan analisis.
> >         
> > 
> > ### Gantt Chart
> > 
> > **Gantt Chart** adalah diagram batang horizontal yang menjadi alat standar untuk merepresentasikan jadwal proyek.
> > 
> > - **Fitur Utama:**
> >     
> >     - **Sumbu Vertikal:** Daftar aktivitas proyek.
> >         
> >     - **Sumbu Horizontal:** Linimasa waktu (hari, minggu, bulan).
> >         
> >     - **Batang (Bars):** Merepresentasikan durasi setiap aktivitas, dari tanggal mulai hingga selesai.
> >         
> >     - **Simbol Tambahan:** Seringkali menyertakan milestone (biasanya bentuk berlian), dependensi (panah antar batang), dan persentase penyelesaian.
> >         
> > 
> > ### Proses 6: Schedule Control (Pengendalian Jadwal)
> > 
> > Ini adalah proses memantau status proyek untuk memperbarui kemajuan dan mengelola perubahan pada _schedule baseline_. Tujuannya adalah untuk memastikan proyek tetap berada di jalurnya.
> > 
> > - **Aktivitas Inti:**
> >     
> >     - Membandingkan kemajuan aktual dengan rencana (baseline).
> >         
> >     - Mengidentifikasi adanya penyimpangan (variance).
> >         
> >     - Menentukan apakah tindakan korektif atau preventif diperlukan.
> >         
> >     - Mengelola semua permintaan perubahan yang memengaruhi jadwal.
> >         
> > 
> > ### Tools dan Teknik untuk Schedule Control
> > 
> > - **Progress Reports:** Laporan rutin yang menunjukkan status kinerja jadwal.
> >     
> > - **Schedule Change Control System:** Sistem formal untuk mengajukan, meninjau, dan menyetujui perubahan pada jadwal.
> >     
> > - **Perangkat Lunak Manajemen Proyek:** Alat seperti Microsoft Project memudahkan pelacakan kemajuan dan pembaruan jadwal.
> >     
> > - **Variance Analysis:** Menganalisis perbedaan antara rencana dan aktual, terutama pada durasi dan float/slack.
> >     
> > - **Grafik Perbandingan:** Menggunakan Gantt chart untuk menampilkan baseline vs. jadwal aktual secara berdampingan.
> >     
> > 
> > ### Kunci Keberhasilan Schedule Control
> > 
> > - **Jadwal yang Realistis:** Pengendalian hanya efektif jika jadwal awalnya dibuat dengan baik dan realistis.
> >     
> > - **Manajemen Manusia:** Manajer proyek harus memiliki keahlian dalam **empowerment** (pemberdayaan tim), **incentives** (insentif), **discipline** (disiplin), dan **negotiation** (negosiasi) untuk menjaga tim tetap termotivasi dan sesuai jadwal.
> >     

> [!cornell] #### Summary
> 
> Proses Pengembangan Jadwal (Schedule Development) mengintegrasikan semua data aktivitas, durasi, dan sumber daya untuk menciptakan jadwal proyek visual, biasanya dalam bentuk Gantt Chart, yang kemudian disetujui sebagai Schedule Baseline. Setelah proyek berjalan, proses Pengendalian Jadwal (Schedule Control) secara aktif memantau kemajuan aktual terhadap baseline, mengelola penyimpangan, dan memproses perubahan secara formal untuk memastikan proyek selesai tepat waktu.

> [!ad-libitum]- Additional Information
> 
> #### Teknik Kompresi Jadwal (Schedule Compression)
> 
> Ketika proyek tertinggal dari jadwal, manajer proyek dapat menggunakan dua teknik utama untuk mempercepatnya:
> 
> 1. **Crashing:** Menambahkan lebih banyak sumber daya ke aktivitas di jalur kritis untuk menyelesaikannya lebih cepat. Teknik ini hampir selalu **menambah biaya** proyek (misalnya, biaya lembur, biaya menyewa lebih banyak orang). Crashing hanya efektif untuk aktivitas yang bisa dipercepat dengan penambahan sumber daya.
>     
> 2. **Fast Tracking:** Menjalankan aktivitas yang seharusnya berurutan (Finish-to-Start) menjadi paralel atau tumpang tindih. Misalnya, memulai pengembangan (B) sebelum desain (A) 100% selesai. Teknik ini **menambah risiko** karena pekerjaan mungkin harus diulang jika desain awal berubah.
>     
> 
> Kedua teknik ini harus diterapkan dengan hati-hati dan hanya pada aktivitas di jalur kritis, karena mempercepat aktivitas non-kritis tidak akan mempercepat penyelesaian proyek secara keseluruhan.
> 
> #### Resource Leveling (Perataan Sumber Daya)
> 
> Terkadang, jadwal awal mungkin memerlukan satu orang untuk bekerja 16 jam sehari atau membutuhkan 5 insinyur padahal hanya 3 yang tersedia. **Resource Leveling** adalah teknik untuk menyesuaikan jadwal untuk mengatasi konflik alokasi sumber daya ini.
> 
> - **Cara Kerja:** Menunda aktivitas (menggunakan float/slack yang tersedia) hingga sumber daya yang dibutuhkan tersedia.
>     
> - **Konsekuensi:** Resource leveling seringkali **memperpanjang durasi total proyek** karena mungkin perlu menunda aktivitas di jalur kritis jika terjadi konflik sumber daya yang parah.
>