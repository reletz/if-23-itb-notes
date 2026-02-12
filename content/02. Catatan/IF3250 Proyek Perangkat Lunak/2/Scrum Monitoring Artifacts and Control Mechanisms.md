---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Manajemen Proyek Agile]]

> [!cornell] Scrum Monitoring Artifacts and Control Mechanisms
>
> > ## Questions/Cues
> >
> > - Bagaimana Daily Scrum berfungsi sebagai kontrol harian?
> > - Apa peran Sprint Board dalam pelacakan tugas?
> > - Mengapa Burndown Chart penting dalam monitoring sprint?
> > - Bagaimana Sprint Review Meeting memvalidasi hasil?
> > - Apa fungsi ScrumMaster dalam monitoring risiko?
> >
> > ## Reference Points
> >
> > - AGILE PROJECT MANAGEMENT REVIEW (Halaman 10-14)
>
> > ### Daily Scrum sebagai Mekanisme Kontrol Harian
> >
> > Daily Scrum adalah pertemuan singkat harian yang berfungsi sebagai mekanisme kontrol utama dalam Scrum. Pertemuan ini biasanya berdurasi 15 menit dan diadakan setiap pagi untuk menyelaraskan kerja tim. Setiap anggota tim menjawab tiga pertanyaan kunci: Apa yang telah saya kerjakan kemarin? Apa yang akan saya kerjakan hari ini? Apakah ada hambatan yang saya hadapi?
> >
> > Contoh implementasinya dalam proyek pengembangan aplikasi: Developer A melaporkan telah menyelesaikan modul autentikasi kemarin, hari ini akan mengerjakan integrasi dengan database, dan menghadapi kendala koneksi server. ScrumMaster kemudian mencatat hambatan ini untuk ditindaklanjuti setelah meeting. Fungsi kontrol tercapai melalui transparansi kerja harian dan identifikasi cepat masalah yang menghambat kemajuan.
> >
> > Pertemuan ini berbeda dari rapat status tradisional karena fokusnya pada koordinasi langsung antar anggota tim, bukan pelaporan ke manajer. Visualisasi kerja melalui Sprint Board selama meeting membantu tim melihat kemajuan aktual dan menyesuaikan prioritas harian.
> >
> > ### Sprint Board sebagai Artifak Visualisasi Tugas
> >
> > Sprint Board adalah papan fisik atau digital yang memvisualisasikan semua tugas dalam sebuah sprint. Alat ini menggunakan sistem kolom seperti "Belum Dimulai", "Dalam Pengerjaan", "Siap di-Test", "Telah Diuji", dan "Ditutup". Setiap tugas direpresentasikan sebagai kartu yang berisi: nomor kontrol, nama tugas, estimasi waktu, prioritas, dan penanggung jawab.
> >
> > Contoh penggunaan: Dalam pengembangan fitur pembayaran online, kartu tugas untuk "Implementasi API Gateway" dipindahkan dari kolom "Dalam Pengerjaan" ke "Siap di-Test" setelah developer menyelesaikan coding. QA Engineer kemudian mengambil kartu tersebut untuk melakukan testing. Transparansi ini memungkinkan seluruh tim melihat progres nyata tanpa perlu rapat tambahan.
> >
> > ScrumMaster bertanggung jawab memastikan board selalu terupdate. Product Owner hanya mengubah status ke "Ditutup" setelah memverifikasi bahwa fungsionalitas sesuai ekspektasi. Sistem warna pada kartu (misal: merah untuk tugas tertunda) membantu identifikasi cepat masalah.
> >
> > ### Burndown Chart untuk Pelacakan Kemajuan Sprint
> >
> > Burndown Chart adalah grafik garis yang menunjukkan sisa pekerjaan dalam sebuah sprint. Sumbu vertikal merepresentasikan jam atau poin pekerjaan yang tersisa, sementara sumbu horizontal menunjukkan hari dalam sprint. Garis ideal (linear) dibandingkan dengan garis aktual untuk menunjukkan apakah tim berada di jalur yang tepat.
> >
> > Contoh interpretasi: Jika pada hari ke-5 dari sprint 2-minggu, garis aktual berada di atas garis ideal, ini menunjukkan pekerjaan tertinggal jadwal. Tim kemudian bisa memutuskan menambah sumber daya atau mengurangi scope. Sebaliknya, jika di bawah garis ideal, tim mungkin menambahkan tugas dari product backlog.
> >
> > Pembaruan chart dilakukan setiap hari setelah Daily Scrum berdasarkan estimasi sisa waktu tugas. Alat ini sangat efektif untuk memprediksi penyelesaian sprint dan mengambil keputusan proaktif. Burndown chart juga membantu mengidentifikasi pola berulang seperti underestimasi tugas tertentu.
> >
> > ### Sprint Review Meeting sebagai Validasi Hasil
> >
> > Sprint Review Meeting diadakan di akhir setiap sprint untuk mendemonstrasikan produk yang telah dikembangkan kepada Product Owner dan stakeholder terkait. Fokusnya pada inspeksi produk aktual (bukan dokumentasi) dan adaptasi product backlog berdasarkan umpan balik.
> >
> > Contoh alur: Tim mengdemonstrasikan fitur pencarian canggih yang telah diselesaikan selama sprint. Product Owner memverifikasi bahwa fungsionalitas memenuhi kriteria penerimaan, kemudian menyetujui penyelesaian tugas terkait. Stakeholder dari departemen pemasaran memberikan masukan tentang kebutuhan tambahan filter pencarian yang kemudian ditambahkan ke product backlog.
> >
> > Pertemuan ini berbeda dari rapat presentasi tradisional karena bersifat interaktif dan berorientasi pada umpan balik langsung. Maksimal durasi adalah 4 jam untuk sprint 4-minggu. Output utamanya adalah revisi product backlog yang diprioritaskan untuk sprint berikutnya.

> [!cornell] #### Summary
>
> **Scrum Monitoring Artifacts and Control Mechanisms** merupakan sistem pengendalian proyek berbasis transparansi dan inspeksi adaptif. **Daily Scrum** berfungsi sebagai mekanisme kontrol harian melalui koordinasi tugas dan identifikasi hambatan. **Sprint Board** memberikan visualisasi real-time status tugas melalui sistem kartu dan kolom progres. **Burndown Chart** menjadi alat prediktif utama melalui grafik sisa pekerjaan yang diperbarui harian. **Sprint Review Meeting** memvalidasi hasil kerja melalui demonstrasi produk aktual dan adaptasi backlog. **ScrumMaster** bertindak sebagai fasilitator yang memastikan artefak-artefak ini digunakan efektif sambil menghilangkan hambatan tim.

> [!ad-libitum]- Additional Information
>
> #### Perbandingan Burndown vs Burnup Chart
>
> Sementara burndown chart fokus pada pekerjaan yang tersisa, burnup chart menampilkan pekerjaan yang telah diselesaikan terhadap total scope. Burnup chart lebih efektif untuk proyek dengan scope yang sering berubah karena garis "total pekerjaan" dapat disesuaikan. Pada sprint dengan banyak perubahan scope, burnup chart memberikan gambaran lebih akurat tentang progres aktual versus target.
>
> Contoh implementasi: Tim menggunakan burnup chart ketika product owner sering menambah/mengurangi tugas selama sprint. Garis "completed work" yang konsisten di bawah garis "total work" yang naik menunjukkan penambahan scope yang mempengaruhi kecepatan tim.
>
> #### Teknik Estimasi Remaining Work
>
> Estimasi sisa pekerjaan dalam burndown chart dapat menggunakan tiga pendekatan: 1) Task-level estimation - memperkirakan sisa waktu per tugas, 2) Percent-complete - persentase penyelesaian per tugas, 3) Binary tracking - tugas hanya dianggap 0% atau 100% selesai. Task-level paling akurat tetapi membutuhkan lebih banyak usaha, binary tracking paling sederhana tetapi kurang presisi.
>
> Praktik terbaik adalah menggunakan kombinasi: binary tracking untuk tugas kecil (<1 hari), percent-complete untuk tugas menengah, dan task-level untuk tugas besar. Velocitas tim sebelumnya harus menjadi acuan untuk kalibrasi estimasi.
>
> #### Tools untuk Manajemen Artifak Scrum
>
> 1. **Jira Software**: Platform terintegrasi untuk sprint board dengan fitur drag-and-drop, burndown chart otomatis, dan integrasi dengan CI/CD pipeline.
> 2. **Trello**: Alternatif sederhana dengan Power-Up untuk grafik burndown dasar dan custom fields.
> 3. **Targetprocess**: Visualisasi advanced dengan multiple view (kanban, sprint) dan analytics predictif.
> 4. **Physical Board**: Papan putih dengan sticky notes untuk tim kolokasi, meningkatkan engagement fisik tetapi kurang praktis untuk dokumentasi.
>
> #### Studi Kasus: Masalah Umum dalam Monitoring Scrum
>
> 1. **Burndown Chart Flatline**: Garis datar selama beberapa hari menunjukkan estimasi tidak diperbarui atau tugas tersangkut. Solusi: Audit harian estimasi sisa kerja.
> 2. **Sprint Board Stagnan**: Kartu tidak berpindah kolom menunjukkan hambatan tidak teridentifikasi. Solusi: Warna berbeda untuk tugas tertahan >2 hari.
> 3. **Daily Scrum Tidak Efektif**: Membahas solusi teknis daripada status. Solusi: Time-box 15 menit ketat dan parking lot untuk diskusi lanjutan.
>
> #### Self-Exploration Projects
>
> 1. Buat simulasi sprint 1-minggu dengan 5 tugas (3-8 jam/tugas). Implementasikan physical sprint board dan burndown chart manual. Bandingkan akurasi prediksi antara estimasi awal dan aktual.
> 2. Eksperimen dengan tiga teknik estimasi (task-level, percent-complete, binary) pada tugas yang sama. Analisis deviasi antara estimasi dan waktu aktual untuk setiap metode.
> 3. Desain dashboard monitoring Scrum digital sederhana menggunakan Google Sheets dengan fitur: sprint board virtual, burndown chart otomatis, dan logging hambatan.
>
> #### Further Reading
>
> - "Agile Estimating and Planning" oleh Mike Cohn - Bab 9: Tracking and Communicating Progress
> - Scrum Guide 2020: https://scrumguides.org/scrum-guide.html#artifacts-transparency
> - Studi Kasus NASA: "Adapting Scrum to Mission Critical Software Development" (IEEE 2018)
> - Video Tutorial: "Advanced Burndown Chart Analysis" oleh Agile for All