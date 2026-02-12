---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Proyek Perangkat Lunak]]

> [!cornell] Scrum Framework Implementation
>
> > ## Questions/Cues
> >
> > - Apa perbedaan utama Scrum dengan metodologi tradisional?
> > - Bagaimana peran Product Owner memengaruhi prioritas proyek?
> > - Mengapa Daily Scrum dibatasi 15 menit?
> > - Apa fungsi Sprint Retrospective bagi tim?
> > - Bagaimana Product Backlog dikelola selama sprint?
> >
> > ## Reference Points
> >
> > - SOFTWARE PROCESS REVIEW IF3250 (Slides 24-53)
>
> > ### Karakteristik Utama Scrum
> >
> > Scrum adalah kerangka kerja agile yang menekankan **pengembangan iteratif** melalui siklus kerja bulanan disebut **sprint**. Berbeda dengan metode tradisional, Scrum tidak menetapkan praktik rekayasa khusus tetapi menggunakan aturan generatif untuk menciptakan lingkungan adaptif.
> >
> > Ciri khas Scrum meliputi:
> >
> > 1. **Tim yang mengorganisir sendiri** - Anggota tim menentukan cara terbaik menyelesaikan pekerjaan tanpa arahan manajerial
> > 2. **Product Backlog** - Daftar dinamis berisi semua kebutuhan produk yang diprioritaskan berdasarkan nilai bisnis
> > 3. **Sprint tetap durasi** - Biasanya 2-4 minggu untuk menciptakan ritme kerja konsisten
> >
> > Contoh implementasi: Sebuah tim pengembang e-commerce menggunakan sprint 3 minggu. Setiap sprint menghasilkan fitur baru seperti sistem pembayaran atau modul diskon yang langsung dapat diuji pengguna.
> >
> > ### Peran Penting dalam Scrum
> >
> > Terdapat tiga peran inti dalam Scrum:
> >
> > **1. Product Owner**
> >
> > - Bertanggung jawab atas **nilai produk** dan **ROI (Return on Investment)**
> > - Menentukan prioritas fitur dalam Product Backlog
> > - Menerima/menolak hasil kerja setiap sprint
> > - Contoh: PO aplikasi kesehatan mungkin memprioritaskan fitur konsultasi dokter dibandingkan desain UI
> >
> > **2. Scrum Master**
> >
> > - Berperan sebagai **fasilitator** bukan manajer
> > - Menghilangkan hambatan teknis/logistik
> > - Memastikan penerapan nilai-nilai Scrum
> > - Contoh: Mengkoordinasikan akses ke server testing yang dibutuhkan tim
> >
> > **3. Tim Scrum**
> >
> > - **Multifungsi** (developer, QA, UI/UX) dengan 5-10 anggota
> > - Bertanggung jawab kolektif atas hasil sprint
> > - Menentukan estimasi tugas secara mandiri
> >
> > ### Siklus Sprint dan Ritual
> >
> > **Sprint Planning**:
> >
> > - Dibagi menjadi dua bagian:
> > 1. Penentuan tujuan sprint dan seleksi item Product Backlog
> > 2. Pembuatan Sprint Backlog (daftar tugas teknis)
> > - Contoh: Memilih fitur "notifikasi WhatsApp" dari backlog kemudian memecahnya menjadi tugas desain, API, dan testing
> >
> > **Daily Scrum**:
> >
> > - Pertemuan **15 menit** setiap pagi dengan tiga pertanyaan:
> > 1. Pekerjaan kemarin?
> > 2. Rencana hari ini?
> > 3. Kendala yang dihadapi?
> > - Bukan sesi solusi masalah tetapi **komitmen tim**
> >
> > **Sprint Review**:
> >
> > - Demo hasil kerja ke stakeholder
> > - Durasi maksimal 2 jam dengan persiapan minimal
> > - Fokus pada **umpan balik pengguna**
> >
> > **Sprint Retrospective**:
> >
> > - Evaluasi internal tim melalui pertanyaan:
> > - Apa yang harus **dimulai**?
> > - Apa yang harus **dihentikan**?
> > - Apa yang harus **dilanjutkan**?
> > - Contoh: Memutuskan menggunakan alat pair programming untuk mengurangi bug
> >
> > ### Artefak Scrum
> >
> > **Product Backlog**:
> >
> > - Daftar dinamis kebutuhan produk yang selalu di-prioritaskan ulang
> > - Berisi user story ("Sebagai user, saya ingin reset password via email")
> > - Dikelola eksklusif oleh Product Owner
> >
> > **Sprint Backlog**:
> >
> > - Subset Product Backlog untuk satu sprint
> > - Berisi **tugas teknis** dengan estimasi jam
> > - Maksimal 300 tugas dengan durasi <16 jam/tugas
> > - Contoh: "Membuat endpoint API reset password - 8 jam"
> >
> > **Burndown Chart**:
> >
> > - Visualisasi progres sprint berbasis sisa jam kerja
> > - Update harian memantau produktivitas
> > - Contoh: Garis turun menunjukkan penyelesaian tugas tepat waktu

> [!cornell] #### Summary
>
> **Scrum** merupakan kerangka kerja agile yang menggunakan **sprint berdurasi tetap** (2-4 minggu) untuk menghasilkan produk incremental. Tiga pilar utamanya adalah **transparansi**, **inspeksi**, dan **adaptasi**. Peran **Product Owner** menentukan prioritas bisnis, **Scrum Master** memfasilitasi proses, sedangkan **tim multifungsi** bertanggung jawab atas implementasi. Ritual utama seperti **Daily Scrum** dan **Sprint Retrospective** memastikan komunikasi berkelanjutan dan peningkatan proses iteratif. Artefak kunci seperti **Product Backlog** dan **Burndown Chart** memberikan visibilitas penuh terhadap kemajuan proyek.

> [!ad-libitum]- Additional Information
>
> #### Metrik Kinerja Scrum
>
> **Velocity** mengukur rata-rata beban kerja yang diselesaikan per sprint, dihitung berdasarkan **story point**. Contoh: Jika tim menyelesaikan 40 point dalam sprint pertama dan 45 di kedua, velocity rata-rata adalah 42.5. Metrik ini membantu memprediksi kapasitas sprint berikutnya namun tidak untuk perbandingan antar tim.
>
> **Lead Time** dan **Cycle Time** mengukur efisiensi alur kerja. Lead Time dari ide hingga rilis, Cycle Time dari mulai dikerjakan hingga selesai. Tools seperti Jira atau Azure DevOps menyediakan dashboard untuk metrik ini.
>
> #### Studi Kasus Penerapan
>
> PT. Telkom menerapkan Scrum untuk pengembangan aplikasi MyIndiHome. Transformasi dari waterfall ke Scrum mengurangi waktu rilis fitur dari 6 bulan menjadi 2 minggu. Kendala utama adalah perubahan mindset manajemen menuju kepemimpinan partisipatif. Hasilnya: peningkatan 40% kepuasan pengguna dan pengurangan bug 25%.
>
> #### Adaptasi untuk Tim Besar
>
> Teknik **Scrum of Scrums** untuk tim >10 orang:
>
> 1. Setiap tim memiliki Scrum Master
> 2. Perwakilan bertemu setiap hari setelah Daily Scrum
> 3. Fokus pada integrasi antartim dan dependensi
> 4. Menggunakan **meta-scrum board** untuk pelacakan
>
> #### Tools Rekomendasi
>
> 1. **Jira Software** - Manajemen backlog & sprint
> 2. **Trello** - Kanban board sederhana
> 3. **Planning Poker Online** - Estimasi story point
> 4. **Retrium** - Fasilitasi retrospective virtual
>
> #### Proyek Eksperimen Mandiri
>
> 1. Implementasi Scrum untuk proyek pribadi (3 sprint):
> - Buat Product Backlog untuk aplikasi to-do list
> - Lakukan sprint planning dengan waktu terbatas
> - Ukur velocity dan adaptasi prioritas
> 2. Analisis Burndown Chart:
> - Identifikasi pola keterlambatan tugas
> - Eksperimen teknik estimasi berbeda (Fibonacci vs T-shirt size)
>
> #### Bacaan Lanjutan
>
> - "Scrum: The Art of Doing Twice the Work in Half the Time" oleh Jeff Sutherland
> - "Agile Project Management with Scrum" oleh Ken Schwaber
> - Scrum Guide 2020: https://www.scrumguides.org
> - Studi Kasus Scrum di BUMN: https://ejournal.undip.ac.id