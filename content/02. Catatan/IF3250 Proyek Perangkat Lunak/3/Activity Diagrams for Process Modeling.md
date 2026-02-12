---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Proyek Perangkat Lunak]]

> [!cornell] Activity Diagrams for Process Modeling
>
> > ## Questions/Cues
> >
> > - Apa fungsi utama activity diagram?
> > - Perbedaan mendasar dengan flowchart tradisional
> > - Peran partisi (swimlane) dalam pemodelan
> > - Simbol-simbol standar yang wajib diketahui
> > - Keunggulan model paralel dalam proses bisnis
> >
> > ## Reference Points
> >
> > - SCENARIO BASED MODELING (Halaman 24-26)
> > - SCENARIO BASED MODELING (Halaman 10, 23)
>
> > ### Definisi dan Fungsi Utama
> >
> > Diagram aktivitas merupakan alat visual untuk memodelkan urutan proses prosedural, alur bisnis (business process), dan urutan kerja (workflow) dalam sistem perangkat lunak. Berbeda dengan use-case yang fokus pada interaksi aktor-sistem, diagram aktivitas berfokus pada alur kontrol dan logika operasional internal. Contoh penerapannya mencakup pemodelan proses pendaftaran mahasiswa atau alur persetujuan transaksi finansial.
> >
> > Diagram ini menjawab pertanyaan penting: "Bagaimana berbagai langkah dalam proses terhubung?" dan "Apa keputusan yang mempengaruhi alur kerja?". Sebagai analogi, jika use-case diagram adalah daftar menu restoran, activity diagram adalah resep lengkap bagaimana setiap hidangan disiapkan step-by-step.
> >
> > ### Komponen Dasar dan Notasi
> >
> > Activity diagram menggunakan simbol-simbol standar UML (Unified Modeling Language):
> >
> > - **Lingkaran Padat**: Initial node (titik awal proses)
> > - **Lingkaran Berbingkai**: Final node (titik akhir proses)
> > - **Persegi Panjang Bundar**: Action/aktivitas (misal: "Verifikasi Data")
> > - **Belah Ketupat**: Decision node (percabangan logika, misal: "Data Valid?")
> > - **Palang Hitam**: Fork/join node (memisahkan/menggabungkan alur paralel)
> > - **Panah Garis Lurus**: Control flow (arah eksekusi)
> >
> > Contoh penerapan: Proses login dimulai dari initial node, melalui action "Input Credentials", decision node memeriksa validitas, jika valid menuju "Redirect ke Dashboard", jika tidak kembali ke action input.
> >
> > ### Konsep Partisi (Swimlane)
> >
> > Swimlane membagi diagram secara vertikal/horizontal berdasarkan aktor atau subsistem yang bertanggung jawab. Setiap "jalur renang" menunjukkan batas tanggung jawab entitas berbeda. Misal dalam sistem perbankan:
> >
> > - Swimlane "Nasabah": Action "Isi Formulir Transfer"
> > - Swimlane "System": Action "Validasi Saldo"
> > - Swimlane "Admin": Action "Approve Transaksi Besar"
> >
> > Teknik ini membantu mengidentifikasi proses bottleneck dan tanggung jawab lintas departemen. Tanpa swimlane, diagram tetap valid namun kehilangan informasi penting tentang distribusi tugas.
> >
> > ### Pemodelan Alur Paralel
> >
> > Fitur unggulan activity diagram adalah kemampuan memodelkan proses paralel menggunakan fork/join node:
> >
> > - **Fork Node**: Membagi satu alur menjadi beberapa cabang simultan (misal: setelah order dikonfirmasi, sistem secara paralel "Proses Pembayaran" dan "Siapkan Pengiriman")
> > - **Join Node**: Menyatukan kembali cabang-cabang paralel sebelum melanjutkan ke step berikutnya
> >
> > Contoh nyata: Sistem e-commerce dapat memproses verifikasi stok dan kalkulasi ongkir secara bersamaan sebelum menampilkan opsi pembayaran. Ini berbeda dengan flowchart tradisional yang hanya mendukung alur linear.
> >
> > ### Perbedaan dengan Flowchart
> >
> > Meski mirip secara visual, activity diagram memiliki tiga keunggulan utama:
> >
> > 1. **Konkurensi**: Mendukung pemodelan alur paralel
> > 2. **Swimlane**: Memetakan tanggung jawab lintas entitas
> > 3. **Object Flow**: Menunjukkan perpindahan data antar aktivitas
> >
> > Flowchart konvensional cocok untuk algoritma sederhana, sementara activity diagram ideal untuk proses bisnis kompleks yang melibatkan banyak pihak. Contoh: Flowchart cukup untuk algoritma sorting, tetapi activity diagram lebih tepat untuk memodelkan alur persetujuan multi-level.

> [!cornell] #### Summary
>
> **Diagram aktivitas** merupakan alat fundamental dalam UML untuk memvisualisasikan alur kerja sistem dengan kemampuan unik memodelkan **proses paralel** melalui fork/join node. Diagram ini menggunakan **partisi (swimlane)** untuk mengelompokkan aktivitas berdasarkan aktor atau subsistem, memberikan kejelasan dalam proses kolaboratif. Keunggulan utama dibanding flowchart tradisional terletak pada dukungan konkurensi dan kemampuan melacak **transfer data antar aktivitas**. Penerapan efektif mencakup pemodelan proses bisnis kompleks, sistem workflow, dan analisis optimasi alur operasional.

> [!ad-libitum]- Additional Information
>
> #### Simulasi Proses Paralel
>
> Implementasi konkurensi menggunakan fork/join node memerlukan teknik sinkronisasi seperti:
>
> - **Token-based synchronization**: Setiap cabang menghasilkan token yang harus terkumpul di join node
> - **Thread-safe implementation**: Pada level kode, menggunakan mekanisme mutex atau semaphore
>
> Contoh kasus: Sistem reservasi tiket dimana validasi kursi dan pembayaran diproses paralel tetapi transaksi hanya commit jika kedua proses sukses.
>
> #### Teknik Advanced Decision Modeling
>
> Untuk keputusan kompleks dengan multi-kondisi, gunakan kombinasi:
>
> - **Decision Inputs**: Menyediakan data untuk evaluasi kondisi
> - **Guards**: Ekspresi boolean (misal: [saldo > nominal_transfer])
> - **Merge Node**: Menyatukan kembali cabang decision yang berbeda
>
> Contoh implementasi: Alur persetujuan kredit dengan 3 cabang (auto-approve, review manual, reject) berdasarkan score kredit, riwayat transaksi, dan kebijakan bank.
>
> #### Edge Cases dalam Pemodelan
>
> - **Deadlock Scenario**: Ketika dua aktivitas saling menunggu sumber daya (contoh: A perlu output B, B perlu output A)
> - **Race Condition**: Hasil akhir bergantung urutan eksekusi cabang paralel
> - **Interruptible Region**: Area proses yang bisa dibatalkan oleh event eksternal (misal: timeout)
>
> #### Tools dan Implementasi
>
> - **Enterprise Tools**: IBM Rational, Enterprise Architect
> - **Open Source**: PlantUML, draw.io
> - **Code Generation**: Beberapa IDE (seperti IntelliJ) bisa generate kerangka kode dari activity diagram
> - **Library Python**: pyuml2 untuk transformasi diagram ke kode Python
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Modelkan proses pendaftaran seminar online dengan fitur:
> - Paralelisme: Verifikasi email & pembayaran simultan
> - Swimlane: Admin, Sistem, Peserta
> - Interruptible region: Batas waktu pembayaran
> 2. Implementasikan activity diagram sistem parkir cerdas menggunakan Python dengan thread untuk sensor masuk/keluar dan pembayaran otomatis.
>
> #### Bacaan Lanjutan
>
> - "UML Distilled" Martin Fowler (Bab 11: Activity Diagrams)
> - "Real-Time UML Workshop for Embedded Systems" Bruce Douglass
> - Dokumentasi resmi UML 2.5: Bagian 15.3 (Activity Diagrams)
> - Studi kasus IEEE: "Optimizing Emergency Response Using Parallel Activity Modeling"
> - Tutorial Visual Paradigm: "Advanced Activity Diagram Techniques"