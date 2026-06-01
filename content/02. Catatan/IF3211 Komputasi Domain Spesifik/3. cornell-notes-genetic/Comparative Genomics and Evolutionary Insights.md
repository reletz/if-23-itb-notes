---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Comparative Genomics and Evolutionary Insights
>
> > ## Questions/Cues
> >
> > - Mengapa perbandingan genom memberi wawasan evolusi?
> > - Bagaimana ukuran genom bervariasi antar domain?
> > - Apa peran bioinformatika dalam analisis genom?
> > - Contoh gen yang berkembang lebih cepat pada manusia?
> > - Bagaimana perbedaan 1,2 % antara manusia‑chimpanzee diinterpretasikan?
> >
> > ## Reference Points
> >
> > - Campbell Biology in Focus (Chapter 18) (Slides 31‑48)
> > - Lecture Slides IF3211 (Pages 31‑48)
>
> > ### Overview of Genome Mining
> >
> > Genom lengkap telah tersedia untuk banyak organisme, mulai dari bakteri *E. coli* hingga mamalia besar seperti manusia dan panda. Ketersediaan data ini memungkinkan ilmuwan **menambang** informasi genetik untuk memahami bagaimana spesies‑spesies terkait secara evolusioner. Misalnya, dengan membandingkan urutan DNA seluruh genom manusia dengan genom simpanse, peneliti dapat mengidentifikasi gen‑gen yang **konservatif** (tetap hampir tidak berubah) serta gen‑gen yang mengalami **perubahan cepat**, yang sering kali berhubungan dengan adaptasi spesifik seperti resistensi penyakit atau peningkatan ukuran otak. Proses ini bukan sekadar pencocokan urutan, melainkan melibatkan analisis struktural, fungsional, dan regulasi gen.
> >
> > ### Variasi Ukuran dan Kepadatan Genom
> >
> > Ukuran genom bervariasi secara dramatis antara domain kehidupan. Bakteri dan arkea biasanya memiliki genom berukuran **1‑6 Mbp**, sementara eukariota, khususnya tumbuhan dan hewan, sering kali melebihi **100 Mbp**; manusia memiliki sekitar **3 000 Mbp**. Namun, tidak ada korelasi linier yang kuat antara ukuran genom dan kompleksitas fenotip; misalnya, beberapa tanaman memiliki genom jauh lebih besar daripada mamalia tanpa menunjukkan peningkatan kompleksitas struktural. **Kepadatan gen** (jumlah gen per Mbp) juga bervariasi: bakteri dapat memiliki lebih dari **900 gen/Mbp**, sedangkan mamalia biasanya hanya **≈2‑10 gen/Mbp**. Perbedaan ini mencerminkan akumulasi elemen non‑kodifikasi seperti intron, transposon, dan DNA satelit.
> >
> > ### Peran Bioinformatika dalam Analisis Genom
> >
> > Bioinformatika menyediakan **metode komputasional** untuk penyimpanan, penyusunan, dan analisis data genomik berskala besar. Algoritma‑algoritma seperti *de Bruijn graph* untuk perakitan shotgun, *BLAST* untuk pencarian homologi, dan *multiple sequence alignment* (MSA) untuk identifikasi wilayah konservatif menjadi inti dalam **comparative genomics**. Selain itu, basis data publik—misalnya NCBI GenBank, Ensembl, dan UCSC Genome Browser—menyajikan antarmuka yang memungkinkan peneliti mengakses jutaan urutan sekaligus metadata fungsional. Dengan memanfaatkan teknik **machine learning**, ilmuwan kini dapat memprediksi fungsi gen yang belum terkarakterisasi serta mengidentifikasi pola evolusi yang tersembunyi.
> >
> > ### Evolusi melalui Perbandingan Genom Dekat dan Jauh
> >
> > Pada level **dekat**, perbandingan antara spesies yang baru saja berpisah (misalnya manusia vs. simpanse) mengungkap perbedaan **single‑nucleotide polymorphisms (SNPs)** sekitar **1,2 %**, serta **indel** (insertion‑deletion) sekitar **2,7 %**. Analisis ini memungkinkan penelusuran **regulasi gen** yang berubah, seperti varian pada gen‑gen imun yang berhubungan dengan resistensi malaria. Pada level **jauh**, gen‑gen yang sangat terkonservasi (misalnya gen‑gen ribosomal) tetap hampir tidak berubah selama miliaran tahun, memberikan **tanda molekuler** untuk menyusun **filogeni** tiga domain kehidupan (Bakteri, Arkea, Eukariota). Penemuan bahwa beberapa wilayah manusia lebih mirip dengan bonobo daripada dengan simpanse menegaskan **admixtur** evolusioner dan **introgression** genetik dalam sejarah hominin.
> >
> > ### Implikasi Evolusi pada Pengembangan Teknologi Biologis
> >
> > Pemahaman tentang **konservasi** dan **divergensi** genetik tidak hanya penting bagi teori evolusi, tetapi juga bagi **rekayasa genetika**. Misalnya, gen‑gen yang tetap konstan di seluruh spesies dapat dijadikan **target** untuk terapi gen karena risiko efek samping yang rendah. Sebaliknya, gen‑gen yang cepat berubah dapat memberi petunjuk tentang **mekanisme adaptasi** yang dapat dimanfaatkan dalam pengembangan obat, pertanian tahan penyakit, atau bioteknologi lingkungan.

> [!cornell] #### Summary
>
> **Genomik komparatif** memberikan jendela unik ke dalam proses evolusi dengan menghubungkan variasi ukuran, kepadatan, dan urutan gen di seluruh kehidupan. Melalui **bioinformatika**, ilmuwan dapat menyusun, membandingkan, dan menafsirkan data genomik, mengidentifikasi gen‑gen konservatif serta yang mengalami evolusi cepat, dan menelusuri hubungan filogenetik yang mendalam. Perbedaan kecil antara **manusia‑simapanse** (≈1,2 % SNP) serta perbandingan jauh antar‑domain mengungkap pola evolusi yang menuntun pada adaptasi spesifik, sekaligus membuka peluang bagi aplikasi bioteknologi modern.

> [!ad-libitum]- Additional Information
>
> #### Formal Methods in Whole‑Genome Alignment
>
> Alignmen genom secara keseluruhan memerlukan pendekatan yang memperhitungkan **rearrangement**, **inversions**, dan **segmental duplications**. Algoritma seperti **MUMmer**, **LASTZ**, dan **Cactus** menggunakan struktur data berbasis suffix tree atau graph untuk menemukan **maximal unique matches (MUMs)** yang kemudian di‑anchor untuk menghasilkan alignment multi‑spesies. Analisis statistik terhadap **synteny blocks** memungkinkan identifikasi wilayah yang tetap terjaga urutannya sepanjang evolusi, yang sering kali mengandung gen‑gen esensial.
>
> #### Phylogenomics and Molecular Clock Calibration
>
> **Filogenomik** menggabungkan data genomik dengan model evolusi molekuler untuk membangun pohon filogenetik yang lebih akurat. Metode **Bayesian inference** (misalnya BEAST) memperhitungkan **molecular clock**—asumsi laju mutasi konstan—tetapi dapat dikalibrasi dengan fosil atau peristiwa geologis. Dengan menyesuaikan **rate heterogeneity** antar‑garis, peneliti dapat memperkirakan waktu divergensi antara spesies, misalnya memprediksi bahwa perpecahan manusia‑simapanse terjadi sekitar **6‑7 juta tahun yang lalu**.
>
> #### Horizontal Gene Transfer (HGT) and Its Evolutionary Impact
>
> Pada prokariot, **transfer gen horizontal** merupakan mekanisme utama yang mengakselerasi evolusi, terutama dalam penyebaran resistensi antibiotik. Deteksi HGT melibatkan **phylogenetic incongruence**, **GC‑content deviation**, dan **codon usage bias**. Studi komparatif menunjukkan bahwa sekitar **10‑15 %** gen pada bakteri patogen dapat ditelusuri kembali ke transfer silang spesies, menyoroti peran HGT dalam adaptasi cepat terhadap tekanan lingkungan.
>
> #### Self-Exploration Projects
>
> 1. **Analisis SNP antara manusia dan simpanse**: Unduh data varian publik (misalnya 1000 Genomes Project) dan gunakan paket *vcftools* serta *PLINK* untuk menghitung persentase perbedaan serta mengidentifikasi gen‑gen dengan rasio dN/dS tinggi.
> 2. **Pemetaan synteny pada dua spesies tanaman**: Pilih genom *Arabidopsis thaliana* dan *Zea mays*, gunakan *MUMmer* untuk menghasilkan blok‑blok synteny, lalu visualisasikan dengan *Circos* untuk mengamati perbedaan struktur kromosom.
>
> #### Tools and Resources
>
> - **NCBI Genome** (https://www.ncbi.nlm.nih.gov/genome) – repositori urutan genom lengkap.
> - **Ensembl Comparative Genomics** (https://www.ensembl.org/info/genome/compara) – toolbox untuk orthology, paralogy, dan alignment.
> - **MAFFT** dan **Clustal Omega** – program alignmen multiple sequence.
> - **BEAST** – perangkat lunak untuk analisis filogenomik dengan kalibrasi molecular clock.
>
> #### Further Reading
>
> - *Evolutionary Genomics* oleh N. H. G. Edwards, Springer, 2021.
> - *Comparative Genomics* dalam *Nature Reviews Genetics* (Vol. 22, 2021) – artikel tinjauan tentang metode terbaru.
> - *Bioinformatics Algorithms* oleh Phillip Compeau & Pavel Pevzner, MIT Press, 2020.