---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Regulasi Siklus Sel dan Pembelahan Mitosis
>
> > ### Pertanyaan/Petunjuk
> > 
> > - Mengapa regulasi siklus sel penting dalam perkembangan organisme?
> > - Bagaimana tahapan mitosis memastikan pembagian kromosom yang setara?
> > - Peran apa yang dimainkan titik pemeriksaan siklus sel?
> > - Bagaimana hubungan antara siklus sel dan penyakit kanker?
> > - Mekanisme molekuler apa yang mengendalikan transisi fase siklus sel?
> > 
> > ### Referensi
> > 
> > - Campbell Biology in Focus Ed.3 (Halaman 5-19, 32-37)
> > - Materi Kuliah IF3211 ITB (Halaman 1-13, 84-86, 120-124)
>
> > ### Konsep Utama 1: Pengantar Siklus Sel
>>  Siklus sel adalah proses teratur yang mengatur pertumbuhan, replikasi DNA, dan pembelahan sel dalam organisme eukariotik. Terdiri dari dua fase utama: **Interfase** (persiapan pembelahan) dan **Fase M** (pembelahan sel sebenarnya). Interfase dibagi menjadi tiga tahap:
> > - **Fase G1**: Pertumbuhan sel dan sintesis komponen seluler
> > - **Fase S**: Replikasi DNA dan sintesis protein histon
> > - **Fase G2**: Persiapan akhir untuk pembelahan sel
> > 
> > Contoh analogi: Bayangkan siklus sel seperti persiapan pindah rumah. G1 = mengumpulkan kebutuhan, S = mengemas barang, G2 = memastikan semua siap, M = proses pindah itu sendiri.
> > 
> > ### Konsep Utama 2: Fase Pembelahan Mitosis
> > Mitosis terdiri dari lima tahap berurutan yang menjamin pembagian materi genetik secara setara:
> > 1. **Profase**: Kromosom mengkondensasi, membran inti menghilang
> > 2. **Prometafase**: Mikrotubulus melekat pada kinetokor
> > 3. **Metafase**: Kromosom berjajar di bidang ekuator
> > 4. **Anafase**: Kromatid saudara terpisah ke kutub berlawanan
> > 5. **Telofase**: Membran inti terbentuk kembali, kromosom dekondensasi
> > 
> > Contoh visual: Proses ini mirip mengatur buku di perpustakaan. Profase = menyortir buku, Metafase = menyusun rapi di rak, Anafase = memindahkan ke rak baru, Telofase = sistem rak baru siap digunakan.
> > 
> > ### Konsep Utama 3: Regulasi Siklus Sel
> > Sistem kontrol siklus sel bergantung pada kompleks **siklin-CDK** (Cyclin-Dependent Kinases):
> > - **Siklin**: Protein yang kadarnya berfluktuasi selama siklus
> > - **CDK**: Enzim kinase yang diaktifkan oleh siklin
> > - **Titik Pemeriksaan**: Mekanisme pengawasan di G1, G2, dan M
> > 
> > Contoh medis: Mutasi pada gen regulator siklus sel seperti p53 dapat menyebabkan kanker. Sel kanker seperti mobil tanpa rem - terus membelah tanpa kendali karena titik pemeriksaan rusak.
> > 
> > ### Konsep Utama 4: Sitokinesis dan Pembentukan Sel Anak
> > Sitokinesis adalah proses fisik pembagian sitoplasma yang terjadi paralel dengan telofase:
> > - Pada sel hewan: Pembentukan **cincin kontraktil** aktin-miosin
> > - Pada sel tumbuhan: Pembentukan **lempeng sel** dari vesikel Golgi
> >  Kedua sel anak hasil pembelahan memiliki materi genetik identik secara genetik.

> [!cornell] #### Ringkasan
> **Siklus sel** adalah proses fundamental yang diatur ketat melalui interaksi kompleks protein siklin-CDK dan titik pemeriksaan molekuler. **Mitosis** menjamin distribusi kromosom yang setara melalui lima tahap terkoordinasi, sementara **sitokinesis** menyelesaikan pembelahan fisik sel. **Gangguan regulasi** siklus sel berperan penting dalam patogenesis kanker, menjadikan pemahaman mekanisme ini penting dalam penelitian onkologi modern.
>

> [!ad-libitum]- Informasi Tambahan
>
> #### Mekanisme Molekuler Detail Regulasi CDK
> Aktivasi CDK memerlukan dua langkah kunci: 1) Pengikatan siklin, dan 2) Fosforilasi pada residu treonin spesifik. Inhibitor seperti p27 (Kip1) dapat menahan CDK pada fase G1. Mekanisme degradasi siklin melalui kompleks **APC/C** (Anaphase-Promoting Complex) memastikan transisi fase yang tepat.
>
> #### Model Matematika Kontrol Siklus Sel
> Persamaan diferensial Hodgkin-Huxley dapat dimodifikasi untuk memodelkan osilasi konsentrasi siklin. Model Novak-Tyson menunjukkan sifat bistabilitas sistem, di mana transisi fase terjadi ketika konsentrasi siklin melampaui nilai ambang tertentu.
>
> #### Kasus Khusus dan Nuansa
> - **Sel Poliploid**: Sel hati manusia sering memiliki 4n atau 8n kromosom melalui siklus sel tanpa sitokinesis
> - **Endoreduplikasi**: Pada beberapa jaringan tumbuhan, sel mengalami replikasi DNA berulang tanpa pembelahan
> - **Checkpoint Adaptasi**: Sel dapat "mengabaikan" kerusakan DNA setelah waktu tertentu jika tidak diperbaiki
>
> #### Proyek Eksplorasi Mandiri
> 1. Simulasi komputer menggunakan COPASI untuk memodelkan dinamika konsentrasi siklin-CDK selama siklus sel
> 2. Analisis data ekspresi gen siklus sel dari database single-cell RNA-seq menggunakan paket R/Bioconductor
> 3. Eksperimen mikroskop fluoresens untuk melacak ekspresi siklin B1-GFP dalam sel HeLa sinkronisasi
>
> #### Alat dan Sumber Daya
> - **CompuCell3D**: Platform simulasi berbasis agen untuk pemodelan siklus sel
> - **CellProfiler**: Perangkat lunak analisis citra untuk mengkuantifikasi fase sel
> - **KEGG Pathway**: Database pathway regulasi siklus sel (map04110)
>
> #### Bacaan Lanjutan
> - Alberts B, et al. "Molecular Biology of the Cell" Ed.7, Bab 17
> - Nurse P. "A Long Twentieth Century of the Cell Cycle" (Nature, 2000)
> - Hanahan D & Weinberg RA. "Hallmarks of Cancer" (Cell, 2011)
> - Tutorial Video: "Mitosis Live-Cell Imaging" oleh Nikon Instruments