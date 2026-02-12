---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Genomic and Morphological Computational Tools in Biodiversity
>
> > ## Questions/Cues
> >
> > - Bagaimana transcriptomics memetakan ekspresi gen terkait keragaman morfologi?
> > - Peran machine learning dalam identifikasi pola biodiversitas akustik?
> > - Mengapa pemodelan 3D penting untuk studi evolusi bentuk tubuh?
> > - Bagaimana QTL mapping menghubungkan genetik dengan variasi fenotip?
> > - Tantangan utama dalam analisis morfometrik 3D?
> >
> > ## Reference Points
> >
> > - Biological Diversity [part 2] IF3211 (Halaman 57-66)
> > - O'Quin et al. (2013) BMC Genomics (Halaman 60,64)
> > - Guerrero et al. (2023) Methods in Ecology and Evolution (Halaman 61,64)
> > - Martín-Serra et al. (2014) BMC Evolutionary Biology (Halaman 63,64)
> >
>
> > ### Transcriptomics dalam Studi Biodiversitas
> > Transcriptomics merupakan studi komprehensif tentang semua RNA (transkrip) yang diekspresikan dalam sel atau jaringan pada waktu tertentu. Teknik ini memungkinkan peneliti untuk memetakan pola ekspresi gen yang terkait dengan perkembangan embrio dan evolusi bentuk tubuh pada berbagai spesies.
> > Contoh aplikasi: Pada ikan cichlid *Metriaclima zebra*, pemetaan *Quantitative Trait Loci* (QTL) mengidentifikasi gen yang mengontrol pigmentasi (hlm 60). Dengan menganalisis 798 SNP pada 160 individu, peneliti menemukan lokus genetik spesifik yang mempengaruhi distribusi sel pigmen (xanthophores dan melanophores). Ini menunjukkan bagaimana variasi genetik sederhana dapat menghasilkan keragaman fenotip yang kompleks.
> > Keunggulan utama: Memungkinkan korelasi langsung antara pola ekspresi gen dengan karakteristik fisik organisme, membantu memahami dasar molekuler dari keanekaragaman hayati.
> > ### Machine Learning untuk Analisis Biodiversitas
> > Algoritma machine learning (ML) digunakan untuk mengidentifikasi pola kompleks dalam data ekologis yang sulit dianalisis secara manual. Pendekatan *unsupervised learning* seperti *clustering* dan *dimensionality reduction* (misalnya t-SNE) efektif untuk mengelompokkan pola suara hewan tanpa identifikasi manual.
> > Studi kasus: Guerrero et al. (2023) menggunakan rekaman audio dari hutan hujan tropis untuk mengidentifikasi keragaman spesies berdasarkan pola akustik (hlm 61). Dengan menganalisis vokalisasi burung, serangga, dan amfibi, model ML dapat memetakan perbedaan keragaman spasial dan berfungsi sebagai indikator biodiversitas otomatis.
> > Analogi: Seperti mengenali lagu berdasarkan pola melodinya, bukan liriknya. Sistem "mendengarkan" sidik jari akustik ekosistem untuk mengkuantifikasi kesehatan biodiversitas.
> > ### Pemodelan Morfologi 3D
> > Teknik ini merekonstruksi bentuk tiga dimensi organisme menggunakan data CT-scan, mikroskop elektron, atau citra digital. Dalam studi evolusi, pemodelan 3D memungkinkan analisis kuantitatif perubahan morfologi antar spesies dan uji hipotesis adaptasi.
> > Contoh: Martín-Serra et al. (2014) menganalisis tulang tungkai belakang karnivora darat (hlm 63). Dengan membandingkan spesies yang masih ada dan punah, penelitian ini mengungkap bagaimana ukuran tubuh dan perilaku lokomotor membatasi evolusi morfologi tulang.
> > Signifikansi: Memungkinkan visualisasi perubahan evolusioner yang tidak terlihat pada studi 2D tradisional, seperti rotasi sendi atau perubahan densitas tulang.
> > ### Integrasi Alat Komputasi
> > Kombinasi transcriptomics, ML, dan pemodelan 3D menciptakan pendekatan holistik untuk studi biodiversitas. Data ekspresi gen dapat dikorelasikan dengan perubahan morfologi terukur, sementara ML mengidentifikasi pola tersembunyi dalam dataset besar.
> > Contoh integrasi: Studi pigmentasi ikan cichlid (transcriptomics) dapat dilengkapi dengan pemindaian 3D pola warna dan ML untuk mengklasifikasikan variasi morfologi secara otomatis. Pendekatan multi-disiplin ini memperkuat validasi temuan biologis.

> [!cornell] #### Summary
> **Transcriptomics** memungkinkan pemetaan hubungan gen-fenotip melalui analisis ekspresi RNA, seperti studi QTL pada ikan cichlid. **Machine learning** mengotomatisasi identifikasi pola biodiversitas melalui analisis akustik dan citra, menawarkan solusi skala besar untuk pemantauan ekosistem. **Pemodelan morfologi 3D** memberikan kerangka kuantitatif untuk mempelajari adaptasi evolusioner, seperti analisis tulang karnivora. **Integrasi ketiga alat** ini membentuk paradigma baru dalam penelitian biodiversitas yang menggabungkan data molekuler, morfologis, dan ekologis.
>

> [!ad-libitum]- Additional Information
>
> #### Algoritma Machine Learning Lanjut
> Teknik *deep learning* seperti Convolutional Neural Networks (CNN) semakin digunakan untuk klasifikasi spesies berdasarkan citra atau suara. Arsitektur ResNet-50 yang dimodifikasi dapat mencapai akurasi >95% dalam identifikasi spesies burung dari rekaman audio. Tantangan utama termasuk kebutuhan dataset pelatihan yang besar dan masalah *overfitting* pada lingkungan dengan variasi akustik tinggi.
>
> #### Teknik Pemindaian 3D Mutakhir
> Mikro-CT scan dengan resolusi sub-mikron memungkinkan rekonstruksi struktur internal tanpa perusakan spesimen. Teknik *diffusion tensor imaging* (DTI) mulai digunakan untuk memetakan jaringan lunak fosil. Keterbatasan mencakup biaya peralatan tinggi dan kebutuhan keahlian pengolahan data khusus.
>
> #### Tantangan Komputasi
> 1. *Data dimensionality*: Dataset transcriptomic bisa mencapai terabyte untuk satu spesies
> 2. *Noise dalam data ekologis*: Variabilitas lingkungan mengganggu identifikasi pola
> 3. *Integrasi multi-modal data*: Kesulitan menyelaraskan data genetik, morfologi, dan perilaku
>
> #### Proyek Eksplorasi Mandiri
> 1. Bangun pipeline ML sederhana untuk klasifikasi suara serangga menggunakan dataset Kaggle
> 2. Analisis morfometrik 3D foto hewan peliharaan dengan aplikasi *photogrammetry* gratis
> 3. Eksplorasi database GEO untuk data transcriptomic spesies terancam punah
>
> #### Tools & Sumberdaya
> - Galaxy Project (platform analisis transcriptomics): https://usegalaxy.org
> - MorphoSource (arsip model 3D spesies): https://www.morphosource.org
> - BioAcoustica (database suara hewan): https://bio.acousti.ca
>
> #### Bacaan Lanjutan
> - "Computational Methods for Single-Cell Transcriptomics" (Nature Reviews Genetics)
> - "Deep Learning for Biological Image Classification" (Journal of Computational Biology)
> - Kursus Coursera: "3D Data Visualization for Science Communication"