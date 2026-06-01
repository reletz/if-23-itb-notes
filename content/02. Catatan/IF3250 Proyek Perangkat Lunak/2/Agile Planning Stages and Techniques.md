---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Manajemen Proyek Perangkat Lunak]]

> [!cornell] Agile Planning Stages and Techniques
>
> > ## Questions/Cues
> >
> > - Mengapa Agile Planning dilakukan secara bertahap?
> > - Bagaimana Product Vision membimbing pengembangan?
> > - Perbedaan Product Roadmap vs Release Planning?
> > - Cara menentukan kapasitas sprint (velocity)?
> > - Metode estimasi effort dalam Agile?
> > - Peran Product Backlog dalam perencanaan?
> >
> > ## Reference Points
> >
> > - AGILE PROJECT MANAGEMENT REVIEW (Halaman 2-15)
>
> > ### Product Vision
> >
> > Product Vision merupakan pernyataan strategis yang mendefinisikan tujuan akhir dan nilai bisnis yang ingin dicapai dari produk. Ini berfungsi sebagai kompas arah bagi seluruh tim pengembang dan pemangku kepentingan. Contoh: "Membangun platform e-learning yang mempersonalisasi pengalaman belajar berbasis kecerdasan buatan untuk meningkatkan retensi siswa sebesar 40%".
> >
> > Karakteristik utama Product Vision yang efektif meliputi: (1) Spesifik dan terukur, (2) Berorientasi nilai bisnis, (3) Memiliki target waktu yang jelas. Vision statement biasanya dibuat menggunakan teknik elevator pitch atau template Vision Box. Dalam praktiknya, Product Vision harus dapat diuji dengan pengguna melalui minimum viable product (MVP).
> >
> > ### Product Roadmap
> >
> > Product Roadmap adalah representasi visual dari rencana pengembangan produk jangka panjang yang memetakan fitur-fitur utama ke dalam timeline. Berbeda dengan rencana tradisional, roadmap Agile bersifat adaptif dan diperbarui secara berkala. Contoh struktur roadmap:
> >
> > - Quarter 1: Fitur autentikasi dan profil pengguna
> > - Quarter 2: Modul pembelajaran dasar
> > - Quarter 3: Integrasi sistem rekomendasi AI
> >
> > Roadmap menggunakan tema besar (epics) daripada detail teknis. Teknik pembuatan yang umum adalah user story mapping, dimana fitur diurutkan berdasarkan prioritas bisnis dan ketergantungan teknis. Roadmap juga mencakup kriteria penerimaan (acceptance criteria) untuk setiap fitur utama.
> >
> > ### Release Planning
> >
> > Release Planning menentukan target rilis fungsionalitas dalam kerangka waktu tertentu, biasanya 2-3 bulan. Tahapan ini menjembatani antara strategic planning (roadmap) dan tactical planning (sprint). Teknik yang digunakan termasuk:
> >
> > 1. MoSCoW Prioritization (Must-have, Should-have, Could-have, Won't-have)
> > 2. Kano Model (Basic, Performance, Excitement features)
> > 3. Value vs Effort Matrix
> >
> > Contoh praktis: Rilis pertama difokuskan pada fitur must-have untuk MVP, rilis kedua menambahkan optimasi performa, rilis ketiga menyertakan fitur diferensiasi. Release plan mencakup definisi "Done" yang jelas dan kriteria kelayakan rilis (release readiness criteria).
> >
> > ### Sprint Planning
> >
> > Sprint Planning adalah pertemuan kolaboratif untuk menentukan pekerjaan dalam iterasi 1-4 minggu. Prosesnya meliputi:
> >
> > 1. Product Owner menjelaskan item Product Backlog prioritas tertinggi
> > 2. Tim pengembang mengestimasi effort dan memecah fitur menjadi tugas teknis
> > 3. Menetapkan Sprint Goal yang spesifik dan terukur
> >
> > Kapasitas sprint (velocity) dihitung berdasarkan historis menyelesaikan story points atau jam kerja. Contoh: Jika tim konsisten menyelesaikan 30 points per sprint, maka kapasitas sprint berikutnya di-set mendekati angka tersebut. Sprint backlog yang dihasilkan harus memenuhi INVEST criteria (Independent, Negotiable, Valuable, Estimable, Small, Testable).
> >
> > ### Estimasi Effort
> >
> > Agile menggunakan teknik estimasi relatif daripada absolut. Metode umum:
> >
> > - **Story Points**: Mengukur kompleksitas relatif menggunakan skala Fibonacci (1,2,3,5,8)
> > - **Planning Poker**: Teknik kolaboratif dengan kartu estimasi
> > - **Bucket System**: Pengelompokan item berdasarkan tingkat kesulitan
> >
> > Contoh analogi: Membandingkan kompleksitas fitur "login sosial media" sebagai 3 poin (sedang) vs "verifikasi dua faktor" sebagai 8 poin (kompleks). Estimasi idealnya memperhitungkan tiga aspek: risiko, kompleksitas, dan volume pekerjaan.
> >
> > ### Product Backlog Management
> >
> > Product Backlog adalah daftar dinamis yang berisi semua kebutuhan produk, diurutkan berdasarkan prioritas bisnis. Item backlog harus memenuhi DEEP criteria (Detailed Appropriately, Emergent, Estimated, Prioritized). Grooming process meliputi:
> >
> > - Memecah epics menjadi user stories
> > - Memperbarui estimasi berdasarkan informasi baru
> > - Menghapus item yang tidak relevan
> >
> > Teknik prioritisasi yang efektif termasuk Cost of Delay (kerugian akibat penundaan) dan Weighted Shortest Job First (mengoptimalkan nilai per unit waktu). Product Owner bertanggung jawab menjaga kualitas backlog dengan regular refinement sessions.

> [!cornell] #### Summary
>
> **Perencanaan Agile** merupakan proses bertahap yang dimulai dari **Product Vision** sebagai fondasi strategis, diikuti **Product Roadmap** untuk arahan jangka panjang, **Release Planning** untuk paket fungsionalitas, hingga **Sprint Planning** untuk eksekusi iteratif. Kunci keberhasilannya terletak pada **prioritisasi berbasis nilai** menggunakan teknik seperti MoSCoW dan **estimasi relatif** melalui story points. **Product Backlog** yang terkelola baik menjadi sumber kebenaran tunggal yang memastikan alignment antara visi bisnis dan eksekusi teknis.

> [!ad-libitum]- Additional Information
>
> #### Teknik Estimasi Lanjut
>
> Metode Monte Carlo menggunakan simulasi probabilistik untuk memprediksi waktu penyelesaian fitur berdasarkan data historis velocity. Dengan menjalankan 10.000 simulasi, tim dapat menentukan probabilitasi 85% menyelesaikan fitur dalam waktu tertentu. Rumus dasar:
>
> `Waktu Estimasi = (Estimasi Optimis + 4×Estimasi Realistis + Estimasi Pesimis)/6`
>
> #### Studi Kasus Peneraman Enterprise
>
> Perusahaan FinTech XYZ menerapkan hybrid planning dengan kombinasi SAFe (Scaled Agile Framework) untuk level enterprise dan Scrum untuk tim individual. Mereka menggunakan orthogonal requirement taxonomy dengan pembagian:
>
> - Business Epics (nilai bisnis > $1M)
> - Architectural Epics (dampak teknis signifikan)
> - Enablers (infrastruktur pendukung)
>
> #### Alat Bantu Otomatisasi
>
> 1. Jira Advanced Roadmaps: Visualisasi dependensi fitur multi-tim
> 2. ActionableAgile: Analisis prediktif flow metrics
> 3. ProductBoard: Koleksi feedback pengguna langsung ke backlog
>
> #### Riset Akademis Terkini
>
> - "Adaptive Release Planning Using Stochastic Optimization" (Journal of Systems Engineering, 2023)
> - "Empirical Study of Story Points vs Hour Estimates in 100+ Projects" (IEEE Transactions on Software Engineering)
> - "Cognitive Biases in Agile Estimation" (ACM Computing Surveys, 2024)
>
> #### Projek Eksperimen Mandiri
>
> 1. Bangun Product Backlog simulasi untuk aplikasi pemesanan makanan dengan:
> - Minimum 20 user stories
> - Prioritisasi menggunakan Kano Model
> - Estimasi story points dengan Planning Poker
> 2. Analisis dataset publik dari Agile Alliance untuk menemukan korelasi antara ukuran tim, velocity, dan akurasi estimasi
>
> #### Bacaan Lanjutan
>
> - "Agile Estimating and Planning" oleh Mike Cohn
> - "User Story Mapping" oleh Jeff Patton
> - "Scaled Agile Framework 6.0" oleh Scaled Agile, Inc.
> - Agile Alliance Guide to Agile Planning (https://www.agilealliance.org)