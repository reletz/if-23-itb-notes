---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Sistem Informasi]]

> [!cornell] BPMN Application in Process Modeling
>
> > ## Questions/Cues
> >
> > - Mengapa BPMN efektif untuk kolaborasi bisnis-teknis?
> > - Bagaimana perbedaan Task vs. Sub-Process dalam BPMN?
> > - Kapan menggunakan Exclusive Gateway vs. Parallel Gateway?
> > - Mengapa Message Flow menghubungkan Pool berbeda?
> > - Bagaimana merepresentasikan penanganan kesalahan dalam BPMN?
> >
> > ## Reference Points
> >
> > - Lecture_01_BPMN.pptx (Slides 18-64)
>
> > ### Pengertian dan Tujuan BPMN
> >
> > Business Process Modeling Notation (BPMN) merupakan standar internasional (ISO) untuk memvisualisasikan proses bisnis dalam bentuk diagram yang mudah dipahami baik oleh profesional bisnis maupun teknisi. Dikembangkan oleh Business Process Management Initiative (BPMI) dan saat ini dikelola oleh Object Management Group, BPMN 2.0 berfungsi sebagai jembatan antara desain proses bisnis konseptual dengan implementasi teknisnya.
> >
> > Tujuan utama BPMN adalah menyediakan notasi yang intuitif namun lengkap untuk mendokumentasikan alur kerja, memfasilitasi analisis proses (seperti identifikasi bottleneck), dan mendukung otomatisasi proses bisnis melalui tools seperti Camunda atau IBM BPM. Contoh penerapannya mencakup proses pengadaan barang, layanan pelanggan, atau manajemen penggajian.
> >
> > ### Keunggulan dan Kelemahan BPMN
> >
> > Keunggulan utama BPMN terletak pada kemampuannya merepresentasikan alur kerja secara visual lengkap dengan logika keputusan (gateway), penanganan pengecualian (boundary events), dan interaksi antar entitas (message flows). Berbeda dengan flowchart tradisional, BPMN mendukung representasi proses yang dapat dieksekusi secara langsung oleh mesin workflow engine.
> >
> > Kelemahan utamanya adalah kompleksitas notasi untuk proses berskala besar. Diagram dapat menjadi terlalu rumit jika tidak dimodularisasi dengan subproses. Selain itu, BPMN kurang cocok untuk analisis fungsional tingkat tinggi seperti pemetaan value chain atau analisis dependencies antar fungsi organisasi.
> >
> > ### Elemen Inti BPMN
> >
> > **Aktivitas (Activities):** Merepresentasikan pekerjaan dalam proses, terdiri dari:
> >
> > - **Task:** Aktivitas atomik seperti "Verifikasi Pesanan"
> > - **Sub-Process:** Aktivitas kompleks yang dapat dikembangkan/diciutkan, misalnya "Proses Pengiriman" yang berisi subtask
> >
> > **Gateway:** Pengendali alur proses:
> >
> > - **Exclusive Gateway (XOR):** Hanya satu jalur yang dipilih (misal: "Stok tersedia?")
> > - **Parallel Gateway (AND):** Semua jalur dieksekusi bersamaan
> > - **Event-Based Gateway:** Keputusan berdasarkan event eksternal
> >
> > **Event:** Kejadian yang mempengaruhi alur:
> >
> > - **Start Event:** Trigger awal proses (pesanan masuk)
> > - **Intermediate Event:** Kejadian selama proses (penundaan pengiriman)
> > - **End Event:** Hasil akhir proses (pesanan selesai)
> >
> > ### Komponen Kolaborasi
> >
> > **Pool & Lanes:**
> >
> > - **Pool:** Merepresentasikan entitas bisnis terpisah (misal: Perusahaan dan Pemasok)
> > - **Lane:** Sub-divisi dalam pool (departemen/role) seperti "Divisi Keuangan"
> >
> > **Message Flow:** Menunjukkan komunikasi antar pool berbeda (misal: pengiriman PO ke vendor). Tidak boleh menghubungkan elemen dalam pool yang sama.
> >
> > **Sequence Flow:** Alur aktivitas dalam pool/lane yang sama. Contoh: "Verifikasi Stok" → "Proses Pembayaran".

> [!cornell] #### Summary
>
> **BPMN** merupakan standar pemodelan proses bisnis yang memfasilitasi komunikasi antara stakeholder bisnis dan teknis melalui diagram visual intuitif. **Elemen kunci** meliputi Aktivitas (Task/Sub-Process), Gateway keputusan (XOR/AND), dan Event yang mengontrol alur kerja. **Keunggulan utama** BPMN terletak pada kemampuannya mendukung otomatisasi proses dan penanganan pengecualian secara eksplisit, meskipun **kompleksitas notasi** dapat menjadi tantangan untuk proses berskala besar. Penerapan efektif memerlukan pemahaman **pools/lanes** untuk membedakan peran entitas dan penggunaan **message flows** untuk interaksi antar organisasi.

> [!ad-libitum]- Additional Information
>
> #### Penanganan Pengecualian Lanjutan
>
> BPMN menyediakan **boundary events** untuk menangani kesalahan tanpa menghentikan proses utama. Misalnya, saat terjadi kegagalan pembayaran (Error Intermediate Event), sistem dapat mengarahkan ke proses alternatif selama waktu tunggu tertentu (Timer Event). **Compensation events** digunakan untuk "mengembalikan" transaksi yang sudah dilakukan, seperti membatalkan reservasi jika pembayaran gagal.
>
> #### Subproses dan Reusability
>
> **Collapsed Sub-Process** menyembunyikan detail kompleksitas, sementara **Expanded Sub-Process** menampilkan alur internal secara lengkap. **Transaction Sub-Process** memiliki sifat atomik - jika salah satu langkah gagal, seluruh subproses di-rollback. Untuk reuse proses antar diagram, digunakan **Call Activity** yang mereferensikan proses terpisah.
>
> #### Praktik Terbaik Pemodelan
>
> 1. **Hierarki Proses:** Level 0 (Choreography Diagram) untuk interaksi organisasi, Level 1 (Process Diagram) untuk alur internal
> 2. **Pola Penamaan:** Aktivitas menggunakan format "Verb + Objek" (Contoh: "Approve Invoice")
> 3. **Complexity Control:** Maksimal 5-8 elemen per diagram, gunakan link untuk diagram detail
> 4. **Version Control:** Selalu tambahkan versi dan tanggal revisi pada header diagram
>
> #### Studi Kasus Lanjutan: Order-to-Cash
>
> Proses end-to-end dari penerimaan pesanan hingga penagihan:
>
> 1. **Order Placement:** Message Start Event dari pool Pelanggan
> 2. **Inventory Check:** Parallel Gateway untuk cek stok & validasi kredit
> 3. **Exception Handling:** Boundary Event untuk kasus stok kosong
> 4. **Shipment & Billing:** Multiple Instances untuk pengiriman bertahap
> 5. **Payment Reconciliation:** Event-Based Gateway untuk pilihan pembayaran
>
> #### Tools Implementasi
>
> 1. **Camunda Modeler:** Open-source dengan eksekusi workflow
> 2. **Signavio:** Cloud-based BPM suite dengan fitur kolaborasi
> 3. **Bizagi:** Mendukung transformasi diagram BPMN ke kode eksekusi
> 4. **Visio + BPMN Add-in:** Solusi familiar untuk pengguna Microsoft
>
> #### Proyek Eksperimen Mandiri
>
> 1. Modelkan proses pengajuan cuti karyawan dengan:
> - XOR Gateway untuk persetujuan atasan
> - Timer Event untuk batas pengajuan
> - Compensation Event pembatalan cuti
> 2. Implementasikan model menggunakan Camunda dan uji dengan scenario:
> - Cuti mendesak (lompati persetujuan HR)
> - Pembatalan setelah disetujui
>
> #### Referensi Lanjutan
>
> - **Buku:** "BPMN Method and Style" oleh Bruce Silver (Penerbit Cody-Cassidy)
> - **Tutorial:** BPMN Quick Guide oleh OMG (https://www.omg.org/bpmn/)
> - **Kursus:** "Advanced BPMN 2.0" di Udemy oleh Henrik von Scheel
> - **Komunitas:** forum.bpmn.io untuk diskusi kasus nyata