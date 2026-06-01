---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[WI2022 Manajemen Proyek]]

> [!cornell]  Estimasi Proyek dan Jalur Kritis (Estimation & Critical Path)
> 
> > ## Questions/Cues
> >
> > - Apa itu Estimasi Sumber Daya?
> >     
> > - Apa itu Estimasi Durasi?
> >     
> > - Apa beda Effort & Durasi?
> >     
> > - Apa itu Three-Point Estimate?
> >     
> > - Apa itu PERT?
> >     
> > - Apa itu Critical Path Method?
> >     
> > - Apa itu Jalur Kritis?
> >     
> >
> > ## Reference Points
> >
> > - ManPro-06-Project-Time-Management.pdf (Slides 12-16, 24-36)
> >     
> 
> > ### Proses 3: Activity Resource Estimating (Estimasi Sumber Daya)
> >
> > Ini adalah proses memperkirakan jenis dan jumlah sumber daya (manusia, peralatan, material) yang dibutuhkan untuk setiap aktivitas.
> >
> > - **Tujuan:** Memastikan sumber daya yang tepat tersedia saat dibutuhkan.
> >     
> > - **Pertimbangan Penting:** Tingkat kesulitan aktivitas, keunikan lingkup, pengalaman tim, ketersediaan sumber daya, dan kebijakan organisasi (misal: perlu outsourcing atau tidak).
> >     
> > - **Output Utama:**
> >     
> >     - **Activity Resource Requirements:** Identifikasi detail sumber daya untuk setiap aktivitas.
> >         
> >     - **Resource Breakdown Structure (RBS):** Diagram hierarkis yang mengelompokkan sumber daya berdasarkan kategori dan tipe.
> >         
> >
> > ### Proses 4: Activity Duration Estimating (Estimasi Durasi)
> >
> > Ini adalah proses memperkirakan jumlah periode kerja (misalnya, jam, hari, minggu) yang dibutuhkan untuk menyelesaikan setiap aktivitas dengan sumber daya yang telah diestimasi.
> >
> > - **Perbedaan Effort vs. Durasi:**
> >     
> >     - **Effort (Upaya):** Jumlah total jam kerja yang benar-benar dihabiskan untuk suatu tugas. Contoh: 16 jam kerja.
> >         
> >     - **Duration (Durasi):** Rentang waktu kalender dari awal hingga akhir tugas. Contoh: 2 hari kerja (jika 8 jam/hari) atau 4 hari (jika developer hanya bekerja paruh waktu 4 jam/hari pada tugas ini).
> >         
> >
> > ### Teknik Estimasi Durasi
> >
> > - **Three-Point Estimate:** Teknik ini meminta tiga estimasi untuk setiap aktivitas untuk memperhitungkan ketidakpastian:
> >     
> > 	1.  **Optimistic (O):** Waktu tercepat, jika semua berjalan lancar.
> > 	2.  **Most Likely (M):** Waktu paling realistis, dengan asumsi kondisi normal.
> > 	3.  **Pessimistic (P):** Waktu terlama, jika terjadi masalah.
> > 
> >
> > - **PERT (Program Evaluation and Review Technique)**: Menggunakan three-point estimate untuk menghitung durasi yang diharapkan (Expected Duration) dengan memberikan bobot lebih pada estimasi Most Likely.
> >     
> >     > Rumus PERT: Expected Duration = (O + 4M + P) / 6
> >     
> >
> > ### Critical Path Method (CPM)
> >
> > **CPM** adalah teknik analisis diagram jaringan yang digunakan untuk menentukan durasi total proyek dan fleksibilitas penjadwalan.
> >
> > - **Jalur (Path):** Serangkaian aktivitas yang terhubung dari awal hingga akhir proyek.
> >     
> > - **Jalur Kritis (Critical Path):** **Jalur terpanjang** dalam diagram jaringan. Jalur ini menentukan durasi proyek tercepat yang mungkin.
> >     
> > - **Float / Slack:** Jumlah waktu suatu aktivitas dapat ditunda tanpa menunda tanggal penyelesaian proyek secara keseluruhan.
> >     
> > - **Penting:** **Aktivitas di jalur kritis memiliki float/slack nol.** Setiap keterlambatan pada aktivitas di jalur kritis akan langsung menunda keseluruhan proyek.
> >     

> [!cornell] #### Summary
> 
> Setelah aktivitas diurutkan, proses estimasi dimulai dengan menentukan sumber daya yang dibutuhkan (Resource Estimating) dan kemudian memperkirakan waktu kerja (Duration Estimating) menggunakan teknik seperti PERT untuk mengelola ketidakpastian. Semua informasi ini kemudian dianalisis menggunakan Critical Path Method (CPM) untuk mengidentifikasi jalur aktivitas terpanjang yang tidak memiliki fleksibilitas waktu (jalur kritis), yang pada akhirnya menentukan durasi total minimum dari proyek.

> [!ad-libitum]- Additional Information
> 
> #### Analisis Jaringan CPM: Forward & Backward Pass
> 
> Untuk menemukan jalur kritis, CPM menggunakan dua perhitungan:
> 
> 1. **Forward Pass (Perhitungan Maju):**
>     
>     - Dimulai dari aktivitas pertama dan bergerak maju ke akhir.
>         
>     - Menghitung **Earliest Start (ES)** dan **Earliest Finish (EF)** untuk setiap aktivitas.
>         
>     - `EF = ES + Durasi`
>         
>     - ES untuk aktivitas berikutnya adalah EF maksimum dari semua aktivitas pendahulunya.
>         
>     - Hasil akhirnya adalah durasi total proyek.
>         
> 2. **Backward Pass (Perhitungan Mundur):**
>     
>     - Dimulai dari aktivitas terakhir dan bergerak mundur ke awal.
>         
>     - Menghitung **Latest Start (LS)** dan **Latest Finish (LF)** untuk setiap aktivitas.
>         
>     - `LS = LF - Durasi`
>         
>     - LF untuk aktivitas sebelumnya adalah LS minimum dari semua aktivitas penerusnya.
>         
> 
> #### Menghitung Float/Slack
> 
> Setelah kedua pass selesai, float dihitung untuk setiap aktivitas:
> 
> Float = LS - ES atau Float = LF - EF
> 
> - Jika `Float = 0`, aktivitas tersebut **kritis**.
>     
> - Jika `Float > 0`, aktivitas tersebut **non-kritis** dan memiliki fleksibilitas.
>     
> 
> Pemahaman ini krusial bagi manajer proyek untuk memfokuskan perhatian pada aktivitas-aktivitas yang paling rentan menyebabkan keterlambatan.