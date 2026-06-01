---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Manajemen Proyek Perangkat Lunak]]

> [!cornell] Scrum Execution and Deliverable Management
>
> > ## Questions/Cues
> >
> > - Mengapa eksekusi Scrum fokus pada penyelesaian tugas harian?
> > - Bagaimana tim mengelola perubahan scope selama sprint?
> > - Apa perbedaan utama antara sprint review dan pertemuan lainnya?
> > - Mengapa deliverable harus "berpotensi dirilis" setiap sprint?
> > - Bagaimana ScrumMaster memfasilitasi penyelesaian hambatan?
> >
> > ## Reference Points
> >
> > - AGILE PROJECT MANAGEMENT REVIEW (Halaman 6-14)
>
> > ### Aktivitas Eksekusi Scrum
> >
> > Tahap eksekusi dalam Scrum berfokus pada penyelesaian tugas-tugas harian selama sprint untuk menghasilkan produk yang berpotensi dirilis. Tidak seperti metodologi tradisional yang menunggu hingga akhir proyek, Scrum mengharuskan tim menghasilkan increment yang berfungsi pada setiap akhir sprint. Ini memungkinkan umpan balik cepat dan adaptasi terhadap perubahan kebutuhan.
> >
> > Contoh konkret: Dalam pengembangan aplikasi e-commerce, tim mungkin fokus menyelesaikan fitur keranjang belanja dalam satu sprint. Setiap hari, developer menyelesaikan task spesifik seperti integrasi metode pembayaran atau optimasi UI, sehingga pada akhir sprint fitur tersebut sudah dapat diuji dan berpotensi dirilis meskipun belum semua fitur aplikasi selesai.
> >
> > ### Proses Monitoring dan Controlling
> >
> > Monitoring dalam Scrum dilakukan melalui mekanisme harian dan visual. ScrumMaster bertanggung jawab mengidentifikasi dan menghilangkan hambatan yang menghalangi kemajuan tim. Fokus utamanya adalah memastikan aliran pekerjaan tetap lancar tanpa intervensi mikro-manajemen.
> >
> > Analogi: ScrumMaster seperti pemandu lalu lintas yang mengatur arus kendaraan (task) di persimpangan jalan. Ketika terjadi kemacetan (hambatan), ia segera mengalihkan rute alternatif atau membersihkan rintangan agar arus tetap lancar tanpa perlu menyetir setiap mobil (mengerjakan tugas developer).
> >
> > ### Deliverable Management melalui Sprint Review
> >
> > Sprint review adalah pertemuan demonstrasi dimana tim menunjukkan hasil kerja nyata yang telah diselesaikan selama sprint. Deliverable harus memenuhi kriteria "Selesai" (Definition of Done) yang telah disepakati sebelumnya, artinya kode sudah diintegrasikan, diuji, dan siap untuk rilis jika diperlukan.
> >
> > Contoh praktis: Jika dalam sprint tim mengembangkan fitur pencarian produk, pada sprint review mereka harus menunjukkan fitur tersebut berfungsi penuh dengan kriteria: (1) dapat menerima input kata kunci, (2) menampilkan hasil relevan, (3) memiliki paginasi untuk hasil banyak, dan (4) telah melalui pengujian unit.

> [!cornell] #### Summary
>
> **Eksekusi Scrum** berpusat pada penyelesaian tugas harian untuk menghasilkan **increment produk yang berpotensi dirilis** setiap akhir sprint. Proses **monitoring** difasilitasi oleh ScrumMaster yang fokus pada penghapusan hambatan alih-alih mengontrol tugas mikro. **Deliverable management** dijamin melalui **sprint review** dimana produk nyata didemonstrasikan dan dievaluasi terhadap kriteria "Selesai", memastikan **value delivery** yang konsisten dan adaptif terhadap perubahan kebutuhan.

> [!ad-libitum]- Additional Information
>
> #### Tantangan Implementasi Eksekusi Scrum
>
> Salah satu tantangan utama adalah menjaga disiplin untuk tidak mengubah scope selama sprint (no scope creep) sambil tetap fleksibel terhadap perubahan bisnis. Solusinya adalah dengan menerapkan aturan "pintu terkunci" dimana perubahan hanya dapat dimasukkan jika item yang setara dikeluarkan dari sprint backlog, menjaga komitmen kecepatan (velocity) tim tetap stabil.
>
> #### Teknik Lanjutan Manajemen Deliverable
>
> Untuk proyek kompleks, teknik "scrum of scrums" dapat diterapkan dimana setiap tim Scrum memiliki perwakilan yang bertemu secara berkala untuk menyelaraskan dependensi antar-tim. Pendekatan ini memastikan bahwa deliverable masing-masing tim terintegrasi dengan baik dalam produk akhir.
>
> #### Tools untuk Eksekusi Efektif
>
> 1. Jira Software: Untuk pelacakan task secara real-time dengan board virtual
> 2. CI/CD Pipelines: Otomasi pengujian dan deployment untuk memastikan kode selalu siap rilis
> 3. Slack Integrations: Notifikasi otomatis untuk update status task dan deteksi hambatan
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Implementasikan simulasi sprint 1 minggu untuk proyek open-source kecil, dokumentasikan bagaimana tim menangani perubahan requirement mendadak tanpa mengganggu komitmen deliverable.
> 2. Bandingkan dua pendekatan Definition of Done (ketat vs longgar) pada proyek yang sama dan analisis dampaknya terhadap kualitas deliverable.
>
> #### Bacaan Lanjutan
>
> - "Scrum: The Art of Doing Twice the Work in Half the Time" oleh Jeff Sutherland
> - "Agile Software Development with Scrum" oleh Ken Schwaber dan Mike Beedle
> - Pedoman Resmi Scrum Guide: https://www.scrumguides.org/scrum-guide.html