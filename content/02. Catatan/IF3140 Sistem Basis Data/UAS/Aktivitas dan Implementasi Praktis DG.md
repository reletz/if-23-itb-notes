---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3140 Sistem Basis Data]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> > 
> > - Apa itu Data Policies?
> >     
> > - Apa itu Data Asset Valuation?
> >     
> > - Mengapa kita perlu menilai data?
> >     
> > - 6 cara mengukur nilai data?
> >     
> > - Apa saja alur aktivitas implementasi DG?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides 22-23
> >     
> 
> > ### Isu Lain: Data Policies (Kebijakan Data)
> > 
> > Ini adalah fondasi implementasi DG.
> > 
> > **Data Policies** adalah arahan (directives) yang mengkodifikasi (menjadikan aturan resmi) prinsip-prinsip dan niat manajemen menjadi **aturan fundamental**.
> > 
> > Aturan ini mengatur seluruh siklus hidup data, mencakup:
> > 
> > - Pembuatan dan Akuisisi (Creation, Acquisition)
> >     
> > - Integritas (Integrity)
> >     
> > - Keamanan (Security)
> >     
> > - Kualitas (Quality)
> >     
> > - Penggunaan (Use) data dan informasi.
> >     
> > 
> > ### Isu Lain: Data Asset Valuation (Penilaian Aset Data)
> > 
> > Ini adalah proses untuk memahami dan **menghitung nilai ekonomi** dari data bagi sebuah organisasi.
> > 
> > Mengapa ini penting?
> > 
> > - Untuk membenarkan (justify) investasi dalam Data Governance dan Data Management.
> >     
> > - Untuk membantu prioritisasi proyek (proyek mana yang menyentuh data paling berharga?).
> >     
> > - Untuk mengelola risiko (data yang paling berharga harus dilindungi paling ketat).
> >     
> > 
> > **Cara Mengukur Nilai Data (Slide 22):**
> > 
> > 1. **Usage vs Cost:** Membandingkan seberapa sering data dipakai vs biaya untuk memperoleh, menyimpan, dan mengelola risikonya.
> >     
> > 2. **Replacement Cost:** Berapa biaya untuk membuat ulang data ini jika hilang?
> >     
> > 3. **Market Value:** Jika data ini dijual ke pihak ketiga (yang legal), berapa harganya?
> >     
> > 4. **Identified Opportunities:** Berapa nilai (dalam Rupiah) dari peluang bisnis baru yang bisa didapat dari data ini (misal: personalisasi marketing, efisiensi operasional).
> >     
> > 5. **Selling Data:** Pendapatan langsung dari penjualan data (jika itu model bisnisnya).
> >     
> > 6. **Risk Cost:** Berapa biaya (denda, kehilangan reputasi) jika data ini bocor atau disalahgunakan?
> >     
> > 
> > ### Alur Aktivitas Data Governance (Slide 23)
> > 
> > Slide ini menunjukkan peta jalan (roadmap) langkah-demi-langkah yang umum untuk mengimplementasikan program Data Governance.
> > 
> > **Tahap 1: Persiapan dan Strategi Awal**
> > 
> > 1. `Define DG for the organization`: Mendefinisikan DG dalam konteks organisasi.
> >     
> > 2. `Perform readiness assessment`: Menilai kesiapan (kultur, teknologi, orang).
> >     
> > 3. `Perform discovery & business alignment`: Menemukan "pain points" dan menyelaraskan DG dengan tujuan bisnis.
> >     
> > 4. `Develop organizational touch points`: Menentukan di mana DG akan berinteraksi dengan unit lain.
> >     
> > 5. `Develop data governance strategy`: Membuat strategi dan roadmap DG.
> >     
> > 
> > Tahap 2: Mendesain Framework dan Kebijakan
> > 
> > 6. Define DG operating framework: Menentukan model (Centralized, Federated, dll) dan struktur organisasi.
> > 
> > 7. Develop goals, principles, and policies: Menuliskan tujuan, prinsip, dan kebijakan data secara formal.
> > 
> > 8. Underwrite data management projects: Memberi jaminan/dukungan DG untuk proyek-proyek manajemen data.
> > 
> > 9. Engage change management: Merencanakan manajemen perubahan (komunikasi, training) untuk adopsi DG.
> > 
> > 10. Engage in issue management: Menyiapkan proses untuk menangani eskalasi dan isu.
> > 
> > Tahap 3: Implementasi Teknis dan Standar
> > 
> > 11. Assess regulatory compliance requirements: Menganalisis kebutuhan kepatuhan regulasi.
> > 
> > 12. Implement data governance: Mulai menjalankan program DG.
> > 
> > 13. Sponsor data standards and procedures: Mensponsori pembuatan standar teknis (misal: standar penamaan, standar kualitas).
> > 
> > 14. Develop a business glossary: Mulai membangun kamus data terpusat.
> > 
> > 15. Coordinate with architecture groups: Berkoordinasi dengan tim arsitek IT.
> > 
> > Tahap 4: Menanamkan (Embed) dan Mengukur
> > 
> > 16. Sponsor data asset valuation: Mensponsori inisiatif untuk menilai aset data.
> > 
> > 17. Embed data governance: Menanamkan DG ke dalam operasional bisnis sehari-hari sehingga menjadi "business as usual".

> [!cornell] #### Summary
> 
> **Implementasi praktis Data Governance dimulai dengan menetapkan `Data Policies` (aturan fundamental tertulis) dan melakukan `Data Asset Valuation` (menghitung nilai ekonomi data) untuk membenarkan investasi dan prioritas. Proses implementasinya mengikuti alur aktivitas yang sistematis, dimulai dari mendefinisikan strategi dan menilai kesiapan (Tahap 1), merancang framework dan kebijakan (Tahap 2), mengimplementasikan standar dan Business Glossary (Tahap 3), hingga akhirnya menanamkan (embed) DG ke dalam operasional sehari-hari (Tahap 4).**

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis: Contoh Sederhana Data Policy
> 
> Kebijakan (Policy) seringkali bersifat _high-level_ dan berbasis prinsip. Standar (Standard) adalah turunan teknisnya.
> 
> **Contoh Data Policy (Prinsip):**
> 
> - **Nama Policy:** Kebijakan Klasifikasi Data
>     
> - **Prinsip:** "Semua data perusahaan harus diklasifikasikan berdasarkan tingkat sensitivitasnya (misal: Publik, Internal, Rahasia, Sangat Rahasia) untuk memastikan tingkat perlindungan yang sesuai."
>     
> 
> **Contoh Data Standard (Aturan Teknis Turunan):**
> 
> - **Nama Standar:** Standar Penanganan Data Rahasia
>     
> - **Aturan:**
>     
>     1. "Data berklasifikasi 'Rahasia' tidak boleh disimpan di perangkat pribadi (laptop pribadi, flashdisk)."
>         
>     2. "Data 'Rahasia' harus dienkripsi saat transit (email, transfer file) dan saat diam (database)."
>         
>     3. "Akses ke data 'Rahasia' harus dicatat (di-log) dan ditinjau setiap 3 bulan."
>         
> 
> #### Eksplorasi Mandiri
> 
> - Jika Anda menganggap data transkrip nilai Anda sebagai aset, coba lakukan "Data Asset Valuation" sederhana. Berapa `Replacement Cost`-nya (waktu, tenaga jika hilang)? Berapa `Risk Cost`-nya (jika transkrip Anda dipalsukan atau bocor ke publik)?
>