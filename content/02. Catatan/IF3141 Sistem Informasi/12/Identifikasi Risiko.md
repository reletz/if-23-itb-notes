---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3141 Sistem Informasi]]

> [!cornell] Identifikasi Risiko
>
> > ## Questions/Cues
> >
> > - Apa tiga aktivitas inti dalam manajemen risiko?
> > - Bagaimana contoh penerapannya pada tahap implementasi?
> > - Apa lima kategori utama untuk mengidentifikasi risiko?
> > - Sub-kategori apa saja di bawah Nature, Structure, Infrastruktur, Suprastruktur, dan Culture?
> > - Mengapa identifikasi risiko perlu terstruktur per kategori?
> >
> > ## Reference Points
> >
> > - IF3141 Sistem Informasi (Slides 7-13)
>
> > ### Manajemen Risiko: Tiga Aktivitas Inti
> >
> > **Manajemen risiko** adalah proses **identifikasi**, **analisis**, dan **upaya mitigasi** (penanganan) atas risiko yang tidak dapat diterima. Ketiga aktivitas ini menjawab tiga pertanyaan berurutan:
> >
> > 1. **Identifikasi** — Risiko apa saja yang mungkin terjadi?
> > 2. **Analisis** — Berapa sering kemungkinan terjadinya dan berapa besar dampaknya jika terjadi?
> > 3. **Penanganan Risiko/Mitigasi** — Bagaimana risiko ditangani: **dihindari** (*avoid*), **diminimalkan** (*mitigate*), atau **ditransfer** (*transfer*)?
> >
> > Catatan penting: mitigasi hanya diberlakukan pada risiko yang tingkatnya **tidak dapat diterima**; risiko kecil yang masih dalam batas toleransi cukup diterima dan dipantau.
> >
> > ### Contoh pada Tahap Implementasi (Deployment)
> >
> > Untuk mengilustrasikan ketiga aktivitas pada satu konteks nyata, ambil tahap **implementasi/deployment**:
> >
> > - **Identifikasi**: salah satu risikonya adalah **Kegagalan Sistem Baru** saat baru diluncurkan ke produksi.
> > - **Analisis**: risiko ini dinilai **sering terjadi** dan **berdampak besar** karena dapat membuat **bisnis berhenti** beroperasi.
> > - **Mitigasi**: **sistem lama tetap dijalankan** selama beberapa waktu sebagai *backup*, sehingga bila sistem baru gagal, operasi dapat dikembalikan ke sistem lama (mirip strategi deployment paralel).
> >
> > ### Kerangka Identifikasi Risiko per Kategori
> >
> > Agar identifikasi tidak terlewat, risiko dipetakan ke dalam **lima kategori besar** beserta sub-kategori dan deskripsinya. Kerangka ini banyak dipakai dalam konteks sistem informasi pemerintahan/smart city karena mencakup faktor alam hingga sosial:
> >
> > **1. Nature (Alam)**
> > - **Lingkungan** — lingkungan hidup hayati: daya dukung & daya tampung lingkungan; kualitas air–tanah–udara; flora-fauna; keanekaragaman hayati; bencana alam; dll.
> >
> > **2. Structure (Struktur)**
> > - **SDM (Pengguna)** — kualitas sumber daya manusia: tingkat pendidikan; tingkat kesehatan; pendapatan per kapita; produktivitas/PDRB; dll.
> > - **SDM (Pengembang)** — kualitas dan kapasitas SDM TI organisasi: tingkat pendidikan; kompetensi & keahlian; dll.
> > - **Keuangan** — kondisi keuangan perusahaan/organisasi.
> >
> > **3. Infrastruktur**
> > - **Infrastruktur Fisik** — sarana pendorong kegiatan sosial, budaya, dan ekonomi: jalan; jembatan; pasar; gedung pemerintahan; waduk; sekolah; rumah sakit; JPO; pedestrian; alun-alun; taman; rumah ibadah; RTH; panti jompo/piatu; dll.
> > - **Infrastruktur Digital** — infrastruktur berbasis TIK: *fiber optic* (FO); tower/BTS; Wi-Fi; dll.
> > - **Teknologi** — segala sesuatu yang mempercepat/mempermudah layanan dan prosedur operasi: perangkat lunak, aplikasi, sistem informasi; serta peralatan teknologi seperti komputer, ponsel, sensor, CCTV, drone, satelit, pesawat terbang, robot, mesin, dll.
> >
> > **4. Suprastruktur**
> > - **Hukum** — hukum positif: Undang-Undang; Peraturan Daerah; Peraturan Kepala Daerah; dll.
> > - **Politik** — kebijakan publik dan aspek politik lainnya: kebijakan; pemilihan kepala daerah; dll.
> > - **Kelembagaan** — organisasi pemerintah daerah dan organisasi di masyarakat: OPD, LSM, dll.
> >
> > **5. Culture (Budaya)**
> > - **Sosial** — tatanan sosial di masyarakat: budaya, adat-istiadat, hukum adat, dll.
> > - **Ekonomi** — aspek perekonomian masyarakat: perdagangan; transaksi elektronik; investasi; dll.
> >
> > ```mermaid
> > mindmap
> >     root(("Kategori<br/>Identifikasi Risiko"))
> >         Nature["Nature (Alam)"]
> >             N1["Lingkungan"]
> >         Structure["Structure (Struktur)"]
> >             S1["SDM (Pengguna)"]
> >             S2["SDM (Pengembang)"]
> >             S3["Keuangan"]
> >         Infrastruktur["Infrastruktur"]
> >             I1["Infrastruktur Fisik"]
> >             I2["Infrastruktur Digital"]
> >             I3["Teknologi"]
> >         Suprastruktur["Suprastruktur"]
> >             Sup1["Hukum"]
> >             Sup2["Politik"]
> >             Sup3["Kelembagaan"]
> >         Culture["Culture (Budaya)"]
> >             C1["Sosial"]
> >             C2["Ekonomi"]
> > ```

> [!cornell] #### Summary
>
> **Manajemen risiko** terdiri dari tiga aktivitas berurutan: **identifikasi** (risiko apa yang mungkin terjadi), **analisis** (seberapa sering dan seberapa besar dampaknya), serta **mitigasi/penanganan** (dihindari, diminimalkan, atau ditransfer) yang hanya diterapkan pada risiko yang tidak dapat diterima. Contohnya pada tahap **implementasi**, risiko *Kegagalan Sistem Baru* yang sering dan berdampak besar dimitigasi dengan menjaga sistem lama tetap berjalan sebagai backup. Untuk **identifikasi yang sistematis**, risiko dipetakan ke lima kategori — **Nature, Structure, Infrastruktur, Suprastruktur, dan Culture** — beserta sub-kategorinya (lingkungan, SDM pengguna/pengembang, keuangan, infrastruktur fisik/digital, teknologi, hukum, politik, kelembagaan, sosial, ekonomi) sehingga tidak ada sumber risiko yang terlewat.

> [!ad-libitum]- Additional Information
>
> #### Teknik Identifikasi Risiko
>
> Selain kerangka kategori, identifikasi dapat memakai: **brainstorming** tim, **wawancara** pakar, **checklist** risiko historis, **analisis asumsi**, **diagram sebab-akibat (Ishikawa/fishbone)**, dan **analisis SWOT**. Hasil dikompilasi dalam **risk register** (daftar risiko) sebagai dokumen hidup yang diperbarui sepanjang proyek.
>
> #### Risk Register
>
> Kolom minimal sebuah risk register: ID risiko, kategori, sub-kategori, deskripsi risiko, pemicu (*trigger*), kemungkinan, dampak, tingkat risiko, pemilik risiko (*risk owner*), dan rencana mitigasi.
>
> #### Studi Kasus
>
> **Kasus 1:** Pada proyek smart city Kab. Situbondo (program Simpelputer), identifikasi memetakan risiko *Banjir* dan *Longsor* di kategori Nature–Lingkungan, *Supir Sakit* di Structure–SDM, dan *Mobil Rusak* di Infrastruktur–Teknologi.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Susun risk register awal untuk proyek tugas besar kalian dengan minimal dua risiko di setiap kategori (Nature, Structure, Infrastruktur, Suprastruktur, Culture).
> 2. Lakukan sesi brainstorming identifikasi risiko dan kelompokkan hasilnya memakai diagram fishbone.
>
> #### Bacaan Lanjutan
>
> - ISO 31000:2018 — *Risk Management — Guidelines*.
> - NIST SP 800-30 — *Guide for Conducting Risk Assessments*.
> - Buku Pedoman Smart City (Kementerian Komunikasi dan Informatika RI).
