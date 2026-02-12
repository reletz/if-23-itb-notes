---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Analisis Filogenetik dan Identifikasi Berbasis DNA
>
> > ## Questions/Cues
> >
> > - Mengapa pohon filogenetik penting dalam studi evolusi?
> > - Bagaimana metode distance-based berbeda dari character-based?
> > - Apa keunggulan DNA barcoding dibanding identifikasi morfologi?
> > - Langkah-langkah utama konstruksi pohon filogenetik
> > - Peran alignment sequence dalam analisis filogenetik
> >
> > ## Reference Points
> >
> > - Biological Diversity [part 1] (Halaman 65-72)
> > - Campbell Biology in Focus Ch.20 (Halaman 4-15)
> > - Geneious Academy Guide (Referensi 2)
> >
>
> > ### Konsep Filogenetik dan Tujuannya
> > Filogenetik adalah studi tentang hubungan evolusioner antar organisme melalui analisis **perubahan genetik** yang terakumulasi sepanjang waktu. Pohon filogenetik merupakan representasi visual hubungan kekerabatan ini, menunjukkan bagaimana spesies berevolusi dari nenek moyang bersama. Contoh: Pohon mamalia menunjukkan bahwa paus lebih dekat kekerabatan dengan kuda nil daripada dengan ikan hiu, meski secara morfologi mirip hewan air.
> > Analisis ini membantu menjawab pertanyaan biologis mendasar seperti:
> > 1. Asal-usul patogen baru dalam wabah penyakit
> > 2. Pola penyebaran spesies invasif
> > 3. Konservasi spesies langka berdasarkan keunikan evolusionernya
> > ### DNA Barcoding sebagai Alat Identifikasi
> > DNA barcoding menggunakan **penanda genetik pendek** yang konservatif (biasanya gen COI pada hewan atau rbcL/matK pada tumbuhan) untuk identifikasi spesies. Metode ini mengatasi keterbatasan identifikasi morfologi ketika:
> > - Hanya bagian tubuh tertentu yang tersedia (daun tanpa bunga)
> > - Spesimen dalam tahap perkembangan sulit diidentifikasi (larva serangga)
> > - Analisis kandungan makanan dalam sampel feses
> > Contoh aplikasi: Identifikasi pollen pada lebah madu membantu melacak sumber nektar dan memahami jejak penyerbukan ekosistem. Studi Soininen dkk. (2009) berhasil mengidentifikasi 42 spesies tumbuhan dalam sampel feses rusa kutub menggunakan teknik ini.
> > ### Metode Konstruksi Pohon Filogenetik
> > Terdapat dua pendekatan utama:
> > **1. Distance-based methods:**
> > - Berdasarkan **total perbedaan nukleotida** antar sekuens
> > - *Neighbor joining*: Mulai dari "pohon bintang", kelompokkan dua takson terdekat secara iteratif
> > - Contoh: Analisis cepat hubungan galur virus influenza
> > 
> > **2. Character-based methods:**
> > - Menganalisis setiap posisi nukleotida secara individual
> > - *Maximum parsimony*: Memilih pohon dengan perubahan evolusioner paling sedikit
> > - *Maximum likelihood*: Menggunakan model evolusi matematis untuk menemukan pohon paling probable
> > Perbandingan: Metode character-based lebih akurat tetapi membutuhkan daya komputasi lebih tinggi, cocok untuk dataset kecil (<100 sekuens). Distance-based efisien untuk dataset besar (>1000 sekuens).
> > ### Validasi Pohon Filogenetik
> > Pohon hasil konstruksi perlu divalidasi secara statistik:
> > - **Bootstrap resampling**: Menguji konsistensi pengelompokan dengan membuat subset data acak berulang kali
> > - **Jackknife resampling**: Mirip bootstrap tetapi dengan penghapusan sebagian data
> >
> > Nilai bootstrap >70% umumnya dianggap mendukung pengelompokan yang kuat
> > 
> > **Contoh**: Analisis hubungan primata menunjukkan pengelompokan manusia-simpanse dengan nilai bootstrap 98%, menguatkan teori nenek moyang bersama baru.
> > ### Integrasi Alat Komputasi
> > Proses analisis filogenetik modern melibatkan pipeline komputasi:
> > 1. *Sequence alignment* dengan MAFFT atau ClustalW
> > 2. Pemilihan model evolusi menggunakan jModelTest
> > 3. Konstruksi pohon dengan software seperti MEGA atau RAxML
> > 4. Visualisasi dengan FigTree atau iTOL
> > Tantangan utama meliputi pemilihan model substitusi nukleotida yang tepat dan penanganan missing data pada sekuens genomik parsial.

> [!cornell] #### Ringkasan
>
> **Analisis filogenetik** merupakan tulang punggung studi evolusi molekuler yang memungkinkan rekonstruksi hubungan kekerabatan melalui **perubahan genetik terakumulasi**. **DNA barcoding** menawarkan revolusi dalam identifikasi spesies dengan memanfaatkan penanda genetik pendek yang konsisten, terutama berguna ketika karakter morfologi tidak tersedia. Konstruksi pohon filogenetik mengandalkan dua paradigma utama: metode berbasis jarak genetik (*distance-based*) yang efisien untuk dataset besar, dan metode berbasis karakter (*character-based*) seperti *maximum likelihood* yang lebih akurat tetapi intensif komputasi. Validasi statistik melalui **resampling** dan integrasi alat bioinformatika mutakhir menjadi kunci dalam menghasilkan pohon filogenetik yang andal untuk berbagai aplikasi ekologis dan medis.
>

> [!ad-libitum]- Informasi Tambahan
>
> #### Perbandingan Mendalam Metode Konstruksi
> **Neighbor Joining vs Maximum Likelihood:**
> - NJ: Kompleksitas waktu O(n³), cocok untuk analisis cepat
> - ML: Kompleksitas eksponensial, membutuhkan heuristik (mis. hill-climbing)
> - Studi simulasi menunjukkan ML lebih akurat ketika model evolusi sesuai dengan data
>
> **Pemilihan Model Evolusi:**
> - Model JC69 (Jukes-Cantor) mengasumsikan tingkat substitusi seragam
> - Model GTR+Γ memperhitungkan variasi laju antar situs dan bias substitusi
> - Tes AIC/BIC digunakan untuk memilih model terbaik secara statistik
>
> #### Tantangan Komputasi Modern
> - Analisis genom lengkap (>10.000 sekuens) memerlukan pendekatan *divide-and-conquer* seperti SATé
> - Implementasi algoritma paralelisasi GPU untuk percepatan perhitungan ML
> - Metode *supertree* untuk menggabungkan pohon dari gen berbeda menjadi *supertree* konsensus
>
> #### Studi Kasus Kompleks
> **Horizontal Gene Transfer (HGT) pada Prokariota:**
> - Mengacaukan asumsi pewarisan vertikal gen
> - Teknik *consensus network* digunakan untuk memvisualisasikan sinyal filogenetik yang bertentangan
> - Contoh: Analisis gen 16S rRNA vs gen resistensi antibiotik pada bakteri tanah
>
> #### Proyek Eksplorasi Mandiri
> 1. Bangun pohon filogenetik mitokondria manusia menggunakan data GenBank:
> - Unduh sekuens D-loop mtDNA dari 50 populasi global
> - Lakukan multiple alignment dengan MUSCLE
> - Konstruksi pohon menggunakan metode Maximum Parsimony di MEGA
> - Interpretasi pola migrasi manusia purba
>
> 2. Analisis DNA barcoding produk herbal:
> - Ekstrak DNA dari sampel pasar tradisional
> - Amplifikasi region ITS2 untuk identifikasi tumbuhan
> - Bandingkan hasil dengan database BOLD Systems
>
> #### Alat dan Sumber Daya
> - **Software**: Geneious Prime, BEAST2 (analisis Bayes), PhyloSuite
> - **Database**: BOLD Systems, GenBank, TreeBASE
> - **Tutorial Interaktif**: Phylogeny.fr, CIPRES Science Gateway
>
> #### Bacaan Lanjutan
> - Felsenstein, J. (2004). *Inferring Phylogenies*. Sinauer Associates
> - Yang, Z. (2014). *Molecular Evolution: A Statistical Approach*. Oxford Univ. Press
> - Kursus Online: "Bioinformatics: Phylogenetics" (Coursera)
> - Jurnal: *Molecular Phylogenetics and Evolution* (Elsevier)
> - Protokol Lab: "DNA Barcoding for Beginners" (Cold Spring Harbor Labs)