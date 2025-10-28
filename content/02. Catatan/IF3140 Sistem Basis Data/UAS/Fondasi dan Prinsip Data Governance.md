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
> > - Apa itu Data Governance (DG)?
> >     
> > - Apa tujuan utama DG?
> >     
> > - Apa bedanya DG & Data Management?
> >     
> > - Mengapa DG penting (Business Drivers)?
> >     
> > - Pendorong: Kepatuhan & Analitik
> >     
> > - Pendorong: Resiko & Proses
> >     
> > - Apa 3 syarat keberhasilan DG?
> >     
> > - Apa saja prinsip-prinsip inti DG?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides 4-5, 7-13
> >     
> 
> > ### Definisi dan Tujuan Data Governance
> > 
> > **Data Governance (DG)** adalah pelaksanaan **otoritas dan kontrol** (mencakup perencanaan, pemantauan, dan penegakan) atas pengelolaan aset data.
> > 
> > Sederhananya, DG berfokus pada _bagaimana_ sebuah organisasi membuat keputusan terkait data dan _bagaimana_ orang serta proses diharapkan berperilaku seputar data.
> > 
> > Tujuannya adalah untuk memastikan bahwa data dikelola dengan baik, sesuai dengan kebijakan (internal) dan regulasi (eksternal), serta praktik terbaik (best practices).
> > 
> > ### Perbedaan Data Governance vs Data Management
> > 
> > Ini adalah konsep kunci. Ada pemisahan tugas yang jelas antara pengawasan dan eksekusi:
> > 
> > - **Data Governance (Pengawasan):**
> >     
> >     - Fungsinya seperti legislatif atau dewan pengawas.
> >         
> >     - Tugasnya adalah _memastikan_ data dikelola dengan benar.
> >         
> >     - Fokus pada: "Do the right things" (Melakukan hal yang benar) — Menetapkan kebijakan, standar, dan aturan main.
> >         
> > - **Data Management (Eksekusi):**
> >     
> >     - Fungsinya seperti eksekutif atau tim pelaksana.
> >         
> >     - Tugasnya adalah _mengelola_ data secara aktif untuk mencapai tujuan.
> >         
> >     - Fokus pada: "Do things right" (Melakukan hal dengan benar) — Melaksanakan aktivitas harian seperti penyimpanan, pemrosesan, dan pengamanan data sesuai aturan yang ditetapkan DG.
> >         
> > 
> > **Analogi:** Jika data adalah lalu lintas di kota, Data Governance adalah "DPRD dan Dinas Perhubungan" yang merancang undang-undang, menetapkan batas kecepatan, dan memutuskan di mana lampu merah harus dipasang. Data Management adalah "Polisi dan Petugas di lapangan" yang mengatur lalu lintas, menilang pelanggar, dan memastikan jalanan aman setiap hari.
> > 
> > ### Pendorong Bisnis (Business Drivers)
> > 
> > Ini adalah alasan "Mengapa" organisasi perlu repot-repot menerapkan DG.
> > 
> > 1. **Kepatuhan Regulasi (Regulatory Compliance):**
> >     
> >     - Ini adalah pendorong paling umum, terutama di industri yang diatur ketat (misal: Keuangan, Kesehatan).
> >         
> >     - Organisasi harus patuh pada undang-undang (Contoh: UU Pelindungan Data Pribadi, aturan OJK/BI) yang terus berkembang. DG menyediakan proses yang ketat untuk ini.
> >         
> > 2. **Advanced Analytics & Data Science:**
> >     
> >     - Ledakan penggunaan AI, Machine Learning, dan analitik canggih menuntut data yang berkualitas tinggi, bersih, dan tepercaya.
> >         
> >     - Prinsip "Garbage In, Garbage Out" sangat berlaku. DG memastikan data yang masuk ("In") berkualitas.
> >         
> > 3. **Mengurangi Resiko (Reducing Risks):**
> >     
> >     - **Manajemen Resiko Umum:** Mengawasi resiko finansial atau reputasi yang bisa ditimbulkan oleh data (misal: data bocor, keputusan salah).
> >         
> >     - **Keamanan Data:** Melindungi aset data melalui kontrol ketersediaan, integritas, dan keamanan.
> >         
> >     - **Privasi:** Mengontrol data sensitif atau **PII (Personal Identifying Information)** melalui kebijakan dan pemantauan kepatuhan.
> >         
> > 4. **Memperbaiki Proses (Improving Processes):**
> >     
> >     - **Peningkatan Kualitas Data:** Membuat data lebih andal sehingga meningkatkan kinerja bisnis.
> >         
> >     - **Manajemen Metadata:** Membangun **Business Glossary** (kamus istilah bisnis) agar seluruh organisasi memiliki pemahaman yang sama tentang data (misal: "Pelanggan Aktif" definisinya apa).
> >         
> >     - **Efisiensi Proyek:** Mengurangi "hutang teknis" (_technical debt_) terkait data dalam siklus pengembangan perangkat lunak (SDLC).
> >         
> >     - **Manajemen Vendor:** Mengontrol kontrak terkait data (misal: penggunaan cloud storage, pembelian data eksternal, penjualan data).
> >         
> > 
> > ### Tujuan dan Syarat Keberhasilan DG
> > 
> > Tujuan utamanya adalah **memampukan organisasi mengelola data sebagai ASET berharga**. Untuk mencapainya, program DG harus:
> > 
> > 1. **Berkelanjutan (Sustainable):** DG bukan proyek sekali jadi, tapi proses berkelanjutan yang butuh komitmen, sponsor, dan kepemilikan dari pimpinan bisnis.
> >     
> > 2. **Tertanam (Embedded):** Aktivitas DG harus "tertanam" atau diintegrasikan ke dalam alur kerja normal, seperti pengembangan software, proses analitik, dan manajemen risiko.
> >     
> > 3. **Terukur (Measured):** DG yang baik harus memberi dampak finansial positif. Ini perlu dibuktikan dengan cara mengukur kemajuan dari titik awal (baseline) dan merencanakan perbaikan yang terukur.
> >     
> > 
> > ### Prinsip-Prinsip Data Governance
> > 
> > Ini adalah fondasi yang memandu semua aktivitas dan kebijakan DG:
> > 
> > 4. **Kepemimpinan & Strategi:** Harus dimulai dari pimpinan yang visioner. Strategi data harus selaras dengan strategi bisnis utama.
> >     
> > 5. **Digerakkan Bisnis (Business-driven):** DG adalah program bisnis, bukan program IT. DG mengatur keputusan IT terkait data, sama seperti mengatur interaksi bisnis dengan data.
> >     
> > 6. **Tanggung Jawab Bersama (Shared Responsibility):** Tanggung jawab dibagi antara _Business Data Stewards_ (pihak bisnis yang paham data) dan _Technical Data Management Professionals_ (pihak IT).
> >     
> > 7. **Berlapis (Multi-layered):** DG terjadi di berbagai level, mulai dari level enterprise (seluruh perusahaan) hingga level lokal (divisi atau departemen).
> >     
> > 8. **Berbasis Framework (Framework-based):** Karena perlu koordinasi lintas fungsi, DG harus punya _Operating Framework_ yang jelas mendefinisikan akuntabilitas dan interaksi.
> >     
> > 9. **Berbasis Prinsip (Principle-based):** Semua kebijakan dan aktivitas DG harus didasarkan pada prinsip-prinsip panduan yang telah disepakati.
> >     

> [!cornell] #### Summary
> 
> **Data Governance (DG) adalah fungsi pengawasan bisnis yang menetapkan otoritas dan kontrol atas aset data, dengan tujuan utama mengelola data sebagai aset strategis. Berbeda dari Data Management yang fokus pada eksekusi, DG fokus pada penetapan aturan dan kebijakan. Pendorong utamanya adalah kebutuhan kepatuhan regulasi, analitik canggih, manajemen risiko, dan perbaikan proses. Agar berhasil, program DG harus Berkelanjutan (didukung pimpinan), Tertanam (terintegrasi dalam proses bisnis), dan Terukur (menunjukkan dampak positif), serta dijalankan berdasarkan prinsip-prinsip yang digerakkan oleh bisnis dan tanggung jawab bersama.**

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis: DAMA DMBOK DG Context Diagram (Slide 6)
> 
> Diagram di slide 6 adalah rangkuman komprehensif dari seluruh ekosistem Data Governance menurut DAMA (Lembaga Manajemen Data profesional). Ini menunjukkan DG sebagai fungsi yang sangat terhubung:
> 
> - **Inputs (Apa yang dibutuhkan DG):**
>     
>     - `Business/IT Strategies & Goals:` Arah bisnis dan IT.
>         
>     - `Organization Policies & Standards:` Aturan internal yang sudah ada.
>         
>     - `Business Culture & Data Maturity Assessment:` Seberapa siap budaya dan kematangan data perusahaan.
>         
>     - `Regulatory Requirements:` Tuntutan hukum dan regulasi eksternal.
>         
> - **Key Activities (Proses Inti DG):**
>     
>     1. `Define DG for the Organization (Plan):` Mendefinisikan DG, melakukan penilaian kesiapan, menyelaraskan dengan bisnis.
>         
>     2. `Define the DG Strategy (Plan):` Menentukan _operating framework_, tujuan, prinsip, kebijakan, dan mengelola perubahan (change management).
>         
>     3. `Implement Data Governance (Operate):` Mensponsori standar, mengembangkan _Business Glossary_, berkoordinasi dengan tim arsitektur.
>         
>     4. `Embed Data Governance (Control/Operate):` Menanamkan DG dalam organisasi.
>         
> - **Participants (Siapa saja yang terlibat):**
>     
>     - `Suppliers:` Pihak yang memberi masukan (Eksekutif Bisnis, Pakar/SME, Regulator, Arsitek).
>         
>     - `Participants (Internal):` Pelaku inti (Steering Committee, CDO, Data Stewards, Tim Kepatuhan, PMO).
>         
>     - `Consumers:` Pihak yang menerima hasil (Badan DG, Manajer Proyek, Tim Bisnis, Mitra).
>         
> - **Deliverables (Apa yang dihasilkan DG):**
>     
>     - `Data Governance Strategy & Roadmap:` Peta jalan implementasi.
>         
>     - `Principles & Policies:` Aturan main tertulis.
>         
>     - `Operating Framework:` Struktur organisasi dan tanggung jawab.
>         
>     - `Business Glossary:` Kamus data terpusat.
>         
>     - `Data Governance Scorecard:` Laporan kemajuan.
>         
>     - `Recognized Data Value:` Pengakuan bahwa data memiliki nilai.
>         
> 
> #### Eksplorasi Mandiri
> 
> - Coba cari satu contoh kasus pelanggaran data besar di Indonesia (misal: kebocoran data e-commerce atau instansi). Analisis bagaimana program Data Governance yang kuat (khususnya di area Resiko Privasi dan Keamanan Data) seharusnya dapat mencegah insiden tersebut.
>     
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **DAMA DMBOK: Data Management Body of Knowledge, 2nd Edition, Technics Publications, 2017.** (Ini adalah sumber utama materi dan "kitab suci" untuk profesional manajemen data).
>