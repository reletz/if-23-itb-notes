---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Sistem Informasi Teknik Informatika]]

> [!cornell] BPMN Notation Elements and Syntax
>
> > ## Questions/Cues
> >
> > - Apa perbedaan utama BPMN dengan notasi lain?
> > - Bagaimana struktur dasar diagram proses BPMN?
> > - Jenis-jenis gateway dan penggunaannya?
> > - Peran pools dan lanes dalam kolaborasi?
> > - Kapan menggunakan intermediate event?
> > - Kriteria penamaan elemen yang efektif?
> >
> > ## Reference Points
> >
> > - Slide_Materi_BPMN.pptx (Slides 18-64)
> > - Business_Process_Modeling.pdf (Pages 45-78)
>
> > ### Pengenalan BPMN
> >
> > Business Process Modeling Notation (BPMN) adalah standar internasional untuk memodelkan proses bisnis yang dikembangkan oleh Object Management Group. Berbeda dengan flowchart tradisional, BPMN menyediakan simbol khusus untuk merepresentasikan interaksi kompleks antar peserta, keputusan bisnis, dan penanganan pengecualian.
> >
> > Keunggulan utama BPMN terletak pada kemampuannya menjembatani komunikasi antara staf teknis dan bisnis. Misalnya, simbol gateway "XOR" dapat secara visual menunjukkan titik keputusan "stock available?" dalam proses order yang mudah dipahami semua pihak. BPMN versi 2.0 (current version) mendukung eksekusi proses otomatis melalui mesin workflow seperti Camunda atau IBM BPM.
> >
> > ### Jenis Diagram BPMN
> >
> > Terdapat tiga tipe diagram utama dalam BPMN:
> >
> > 1. **Process Diagram**: Menunjukkan alur aktivitas internal dalam satu organisasi (contoh: proses approval pengajuan cuti)
> > 2. **Collaboration Diagram**: Memvisualisasikan interaksi antar organisasi/bagian menggunakan pools dan message flows (contoh: proses order antara perusahaan dan supplier)
> > 3. **Choreography Diagram**: Fokus pada pertukaran pesan antar peserta tanpa menunjukkan aktivitas internal (contoh: protokol komunikasi antar sistem)
> >
> > ### Elemen Inti BPMN (Core Elements)
> >
> > ### Activities
> >
> > Mewakili pekerjaan yang dilakukan dalam proses:
> >
> > - **Task**: Aktivitas atomik tidak terurai (contoh: "Verifikasi KTP")
> > - **Sub-Process**: Aktivitas komposit dapat dikembangkan (contoh: "Proses Background Check" yang berisi beberapa task)
> > - **Transaction**: Subproses dengan kompensasi jika gagal (contoh: "Booking Hotel" yang bisa dibatalkan)
> >
> > ### Gateways
> >
> > Mengontrol percabangan dan penggabungan alur:
> >
> > - **Exclusive (XOR)**: Hanya satu jalur dipilih berdasarkan kondisi (contoh: "Stok tersedia? Ya/Tidak")
> > - **Parallel (AND)**: Semua jalur dijalankan bersamaan (contoh: "Kirim barang dan invoice secara paralel")
> > - **Inclusive (OR)**: Jalur diaktifkan berdasarkan kondisi yang memenuhi syarat
> > - **Event-Based**: Percabangan berdasarkan kejadian eksternal (contoh: "Menunggu konfirmasi pembayaran")
> >
> > ### Events
> >
> > Kejadian yang mempengaruhi alur proses:
> >
> > - **Start Event**: Pemicu awal proses (contoh: "Order diterima")
> > - **End Event**: Pengakhiran proses (contoh: "Order selesai")
> > - **Intermediate Event**: Kejadian selama proses berjalan (contoh: "Pengingat setelah 3 hari")
> >
> > ### Data Objects
> >
> > Representasi informasi yang digunakan/dihasilkan:
> >
> > - **Data Input**: Informasi masuk ke proses (contoh: Formulir pendaftaran)
> > - **Data Output**: Informasi keluar dari proses (contoh: Laporan keuangan)
> > - **Data Store**: Penyimpanan persistensi (contoh: Database pelanggan)
> >
> > ### Simbologi Lanjutan
> >
> > ### Pools dan Lanes
> >
> > - **Pool**: Mewakili organisasi/partisipan utama (contoh: "Perusahaan Retail")
> > - **Lane**: Subdivisi dalam pool berdasarkan peran/departemen (contoh: "Customer Service", "Logistik")
> >
> > ### Message Flows
> >
> > Alur pesan antar pools berbeda. Contoh: Pengiriman purchase order dari perusahaan ke supplier. Tidak boleh menghubungkan objek dalam pool yang sama.
> >
> > ### Exception Flows
> >
> > Penanganan kesalahan menggunakan boundary events. Contoh: Jika pembayaran gagal setelah 3 hari, proses dialihkan ke tim kolektor.
> >
> > ### Panduan Penamaan
> >
> > - **Task**: Gunakan format [Kata Kerja] + [Objek] (Contoh: "Verifikasi KTP", bukan "Handle KTP")
> > - **Event**: [Objek] + [Status] (Contoh: "Pembayaran Diterima")
> > - **Gateway**: Beri label kondisi (Contoh: "Stok > 100?", "Approved?")
> > - Hindari istilah generik seperti "Proses" atau "Kelola"

> [!cornell] #### Summary
>
> **BPMN** merupakan standar pemodelan proses bisnis dengan **simbol khusus** untuk aktivitas, keputusan, dan interaksi antar partisipan. Diagram utamanya terdiri dari **process, collaboration, dan choreography**. **Gateways** (XOR, AND, OR) mengontrol alur berdasarkan kondisi, sementara **pools/lanes** mengorganisir tanggung jawab. **Penamaan efektif** menggunakan konvensi [verba+objek] meningkatkan kejelasan model. **Message flows** khusus untuk interaksi antar organisasi berbeda, membedakannya dari notasi tradisional.

> [!ad-libitum]- Additional Information
>
> #### Implementasi Subproses Kompleks
>
> Subproses dapat berupa:
>
> - **Embedded**: Hanya berlaku dalam proses induk (contoh: verifikasi alamat dalam proses pengiriman)
> - **Reusable**: Dapat dipanggil lintas proses (contoh: otentikasi pelanggan)
> - **Ad-Hoc**: Aktivitas tidak berurutan dengan aturan khusus
>
> Teknik **exception handling** menggunakan boundary events:
>
> - **Error Event**: Menangani kegagalan sistem
> - **Escalation Event**: Eskalasi ke level manajemen
> - **Compensation Event**: Membatalkan operasi sebelumnya
>
> #### Pemodelan Lanjutan dengan Event
>
> - **Timer Event**: Penundaan/jadwal (contoh: "Tunggu 3 hari kerja")
> - **Message Event**: Trigger berbasis pesan eksternal
> - **Signal Event**: Komunikasi broadcast antar proses
> - **Conditional Event**: Berdasarkan perubahan data (contoh: "Saldo < Rp500.000")
>
> #### Optimasi Diagram BPMN
>
> 1. **Modularisasi**: Pecah proses besar menjadi subproses
> 2. **Color Coding**: Warna berbeda untuk tipe aktivitas
> 3. **Annotations**: Penjelasan tambahan dengan text annotations
> 4. **Data Flow**: Tampilkan aliran data dengan association
> 5. **Simulasi**: Gunakan tools seperti Bizagi untuk analisis kinerja
>
> #### Common Validation Errors
>
> - **Percabangan tidak seimbang**: Jumlah gateway split ≠ join
> - **Deadlock**: Aktivitas menunggu event yang tidak pernah terjadi
> - **Race condition**: Paralel gateway tanpa sinkronisasi
> - **Data loss**: Output tidak terhubung ke aktivitas penerima
>
> #### Tools Rekomendasi
>
> 1. Camunda Modeler (open-source)
> 2. Bizagi Modeler (freemium)
> 3. Signavio Process Manager (enterprise)
> 4. Visio + BPMN Template (office integration)
> 5. Lucidchart (cloud-based)
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Bangun model BPMN untuk proses pendaftaran seminar online dengan fitur:
> - Pembayaran via 3 metode (transfer, kartu, e-wallet)
> - Batas waktu pembayaran 2x24 jam
> - Generate e-ticket otomatis
> 2. Simulasikan model menggunakan Camunda dengan skenario:
> - Pembayaran tepat waktu vs terlambat
> - Pembatalan setelah pembayaran
>
> #### Bacaan Lanjut
>
> - "BPMN Method and Style" oleh Bruce Silver
> - ISO/IEC 19510:2013 Specification
> - Dokumentasi Resmi BPMN 2.0 oleh OMG
> - Tutorial BPMN di platform Udemy dan Coursera
> - Studi Kasus: Implementasi BPMN di Industri Perbankan