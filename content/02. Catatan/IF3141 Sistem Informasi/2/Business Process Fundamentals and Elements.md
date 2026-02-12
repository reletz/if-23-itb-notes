---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Sistem Informasi Teknik Informatika]]

> [!cornell] Business Process Fundamentals and Elements
>
> > ## Questions/Cues
> >
> > - Apa definisi proses bisnis menurut berbagai perspektif?
> > - Elemen-elemen kunci apa yang membentuk proses bisnis?
> > - Mengapa pemodelan proses bisnis penting bagi organisasi?
> > - Apa perbedaan utama antara BPMN dan standar pemodelan lain?
> > - Bagaimana aktivitas dan gateway berinteraksi dalam BPMN?
> >
> > ## Reference Points
> >
> > - Business_Process_Modeling.pptx (Slides 1-64)
>
> > ### Definisi Proses Bisnis
> >
> > Proses bisnis didefinisikan sebagai serangkaian tindakan terstruktur yang saling terkait untuk menghasilkan nilai bagi pelanggan atau organisasi. Menurut Oxford Dictionary, proses adalah "serangkaian tahapan dalam manufaktur atau operasi lainnya", sementara Dictionary.com menyebutnya sebagai "serangkaian tindakan yang menghasilkan hasil". Dalam konteks bisnis, proses melibatkan transformasi input menjadi output melalui penambahan nilai, dengan melibatkan berbagai sumber daya dan partisipan.
> >
> > Contoh konkret adalah proses penggajian karyawan yang mencakup: pelacakan jam kerja, penghitungan gaji, pengiriman data ke bank, dan distribusi slip gaji. Proses ini harus memiliki karakteristik berulang (repeatable), terdefinisi dengan baik, dan memiliki urutan tugas yang jelas untuk memastikan konsistensi hasil.
> >
> > ### Elemen Kunci Proses Bisnis
> >
> > Terdapat enam elemen fundamental dalam proses bisnis:
> >
> > 1. **Pelanggan (Customer)**: Penerima manfaat langsung dari produk/layanan
> > 2. **Produk/Layanan**: Output yang dihasilkan proses
> > 3. **Partisipan**: Pelaku aktivitas dalam proses
> > 4. **Informasi**: Data pendukung pelaksanaan pekerjaan
> > 5. **Teknologi**: Perangkat TI dan alat pendukung
> > 6. **Infrastruktur**: Sumber daya manusia dan teknis
> >
> > Contoh dalam proses invoice proyek: partisipan (manajer proyek), teknologi (sistem akuntansi), informasi (detail tagihan), dan infrastruktur (tim keuangan).
> >
> > ### Manfaat Pemodelan Proses Bisnis
> >
> > Organisasi memperoleh empat keuntungan utama melalui pemodelan proses:
> >
> > 1. **Monitoring sistematis**: Pelacakan aktivitas secara real-time
> > 2. **Identifikasi kesalahan**: Deteksi cepat ketidaksesuaian proses
> > 3. **Pengukuran kinerja**: Metrik evaluasi efisiensi proses
> > 4. **Adaptabilitas**: Kemampuan menyesuaikan perubahan bisnis
> >
> > Proses yang efektif harus memenuhi tiga tujuan: efektivitas (pencapaian tujuan), efisiensi (minimalisasi sumber daya), dan adaptabilitas (respons terhadap perubahan pasar).
> >
> > ### Perbandingan Standar Pemodelan
> >
> > Berbagai standar pemodelan memiliki karakteristik unik:
> >
> > - **IDEF0**: Cocok untuk sistem kompleks dengan pendekatan hierarkis (ICOM: Input-Control-Output-Mechanism)
> > - **ASME**: Optimal untuk manufaktur dengan fokus reduksi waste
> > - **Flowchart**: Sederhana untuk proses tingkat tinggi tetapi terbatas dalam otomasi
> > - **BPMN**: Standar ISO dengan kemampuan eksekusi proses dan penanganan exception
> >
> > BPMN unggul dalam representasi workflow, logika keputusan (gateway), dan kompatibilitas dengan sistem otomasi, meskipun memerlukan pelatihan untuk pengguna non-teknis.

> [!cornell] #### Summary
>
> **Proses bisnis** merupakan rangkaian aktivitas terstruktur yang menciptakan nilai melalui transformasi input menjadi output, dengan elemen kunci meliputi pelanggan, produk, partisipan, informasi, teknologi, dan infrastruktur. Pemodelan proses memberikan manfaat **monitoring, analisis kesalahan, pengukuran kinerja, dan adaptabilitas** organisasi. Di antara berbagai standar pemodelan, **BPMN** menonjol sebagai standar ISO yang mendukung eksekusi proses otomatis melalui representasi workflow komprehensif termasuk gateway keputusan dan penanganan exception, meskipun memerlukan pemahaman teknis yang memadai.

> [!ad-libitum]- Additional Information
>
> #### Analisis Komparatif Mendalam Standar Pemodelan
>
> IDEF0 menggunakan pendekatan ICOM (Input-Control-Output-Mechanism) yang ideal untuk analisis fungsional sistem besar, namun kurang dalam representasi alur waktu. BPMN 2.0 mendukung 3 jenis diagram utama: Process (alur aktivitas), Collaboration (interaksi antar entitas), dan Choreography (koordinasi pesan). Keunggulan teknis BPMN terletak pada kemampuan menspesifikasikan detail eksekusi seperti:
>
> - **Token Flow**: Mekanisme simulasi jalannya proses
> - **Event Sub-Process**: Penanganan interrupt secara terisolasi
> - **Compensation Handler**: Pemulihan transaksi gagal
>
> #### Teknik Pemodelan Lanjut dalam BPMN
>
> Untuk proses kompleks, teknik advanced meliputi:
>
> 1. **Error Boundary Events**: Menangani exception pada sub-process
> 2. **Multi-instance Activities**: Aktivitas paralel dengan instansi berulang
> 3. **Ad-Hoc Sub-Process**: Tugas tidak terurut dengan penanda "~"
> 4. **Transaction Sub-Process**: Proses dengan kompensasi rollback
>
> Contoh implementasi: proses pembayaran online dengan timeout 24 jam dan mekanisme refund otomatis jika gagal.
>
> #### Studi Kasus: Optimasi Proses Order-to-Cash
>
> Analisis proses order-to-cash menunjukkan:
>
> - **Bottleneck**: Verifikasi stok manual meningkatkan lead time 40%
> - **Solusi Teknis**: Implementasi gateway paralel dengan integrasi API inventory
> - **Hasil**: Pengurangan cycle time dari 48 jam menjadi 12 jam
>
> #### Proyek Eksperimen Mandiri
>
> 1. Bangun model BPMN untuk proses perkuliahan online mencakup: registrasi, pembayaran, akses materi, dan penilaian
> 2. Implementasikan model menggunakan Camunda BPMN Engine dengan simulasi kasus:
> - Mahasiswa mengajukan permohonan cuti akademik
> - Sistem menolak permohonan jika IPK < 2.5
> - Generate otomatis surat persetujuan
>
> #### Alat dan Referensi Lanjutan
>
> - **Tools**: Camunda Modeler, Signavio Process Manager, IBM Blueworks Live
> - **Buku Wajib**: "BPMN Method and Style" oleh Bruce Silver
> - **Tutorial**: BPMN Quick Guide di bpmn.org
> - **Paper**: "Formal Verification of BPMN Processes Using Petri Nets" (IEEE Transactions on Systems, 2022)