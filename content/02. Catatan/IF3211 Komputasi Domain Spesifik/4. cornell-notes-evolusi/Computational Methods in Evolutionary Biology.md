---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Komputasi Spesifik Domain IF3211]]

> [!cornell] Metode Komputasi dalam Biologi Evolusioner
>
> > ### Pertanyaan/Pemicu
>
> - Bagaimana PSO meniru perilaku alam untuk optimisasi?
> - Langkah-langkah rekonstruksi pohon filogeni komputasional
> - Perbandingan algoritma genetika dan optimisasi kawanan
> - Aplikasi pembelajaran mesin dalam analisis parameter hematologi
> - Fungsi alat MEGA vs BEAST dalam analisis evolusioner
> - Kelebihan simulasi forward-in-time dalam genetika populasi
>
> > ### Referensi
>
> - Evolution_IF3211_Domain_Specific_Computation (Halaman 88-96)
> - Rapid_protocols_Covid19_diagnosis (DOI: 10.21203/rs.3.rs-1247951/v1)
> - Hybrid_AI_steel_columns (DOI: 10.3390/ma12101670)
>
> > ### Optimisasi Kawanan Partikel (PSO)
> Particle Swarm Optimization (PSO) adalah algoritma metaheuristik yang terinspirasi dari perilaku kolektif kawanan burung atau ikan. Algoritma ini mencari solusi optimal dengan menggerakkan partikel-partikel virtual dalam ruang pencarian. Setiap partikel merepresentasikan kandidat solusi yang memiliki posisi dan kecepatan, serta mengingat posisi terbaiknya sendiri (pBest) dan posisi terbaik kelompok (gBest).
>
> Contoh aplikasi dalam biologi evolusioner adalah optimisasi parameter diagnostik COVID-19 berdasarkan data hematologi. Dalam penelitian Gomes et al. (2022), PSO digunakan untuk menyeleksi kombinasi parameter darah yang paling informatif, seperti kadar leukosit dan trombosit, untuk membangun model klasifikasi akurat. Analoginya seperti kawanan burung yang secara kolektif mencari daerah dengan makanan terbanyak - setiap partikel "mencicipi" kualitas solusi dan berbagi informasi dengan kelompok.
>
> Keunggulan PSO dibanding algoritma evolusioner lain seperti Algoritma Genetika adalah tidak memerlukan operator crossover dan mutation, sehingga lebih cepat konvergensinya untuk masalah berdimensi tinggi. Namun memerlukan tuning parameter inertia weight dan acceleration coefficients untuk hasil optimal.
>
> > ### Rekonstruksi Pohon Filogeni
> Rekonstruksi pohon filogeni adalah proses komputasional untuk merekonstruksi hubungan evolusioner antar takson menggunakan data sekuens biologis (DNA, protein). Metode ini menggunakan model matematika seperti Maximum Likelihood atau Bayesian Inference untuk menghitung probabilitas pohon berdasarkan kesamaan sekuens.
>
> Langkah utama meliputi: (1) Alignment sekuens multi-saluran (MSA) menggunakan alat seperti MUSCLE atau ClustalW, (2) Pemilihan model evolusi (misalnya Jukes-Cantor atau Kimura-2 parameter), (3) Penghitungan skor likelihood untuk setiap topologi pohon, (4) Optimisasi pencarian pohon terbaik. Contoh nyata terlihat pada analisis evolusi virus SARS-CoV-2 dimana pohon filogeni membantu melacak varian baru.
>
> Tantangan utama adalah ruang pencarian yang bersifat kombinatorial - untuk n spesies terdapat (2n-3)!! kemungkinan pohon berakar. Teknik heuristik seperti hill-climbing atau simulated annealing diperlukan untuk masalah praktis dengan >50 sekuens.
>
> > ### Alat Komputasi Biologi Evolusioner
> Beberapa toolkit penting dalam analisis evolusioner:
> 1. **MEGA (Molecular Evolutionary Genetics Analysis)**: Antarmuka grafis untuk analisis filogeni dasar, cocok untuk pemula. Menyediakan alat alignment, konstruksi pohon (NJ, ML), dan uji bootstrap.
> 2. **BEAST (Bayesian Evolutionary Analysis Sampling Trees)**: Untuk inferensi Bayesian dengan fitur penanggalan molekuler dan model evolusi kompleks. Ideal untuk studi epidemiologi dengan kerangka waktu.
> 3. **Biopython**: Library Python untuk manipulasi sekuens biologis, alignment, dan akses database GenBank. Contoh penggunaan: menghitung matriks jarak genetik dari file FASTA.
>
> Studi kasus: Analisis Sun & Zou (2019) menggunakan kombinasi Biopython untuk pra-pemrosesan data dan BEAST untuk inferensi pohon Bayesian, menghasilkan rekonstruksi sejarah migrasi populasi Drosophila yang akurat.
>
> > ### Integrasi Pembelajaran Mesin
> Teknik machine learning semakin terintegrasi dalam biologi evolusioner melalui:
> - **Klasifikasi spesies** menggunakan convolutional neural networks pada data morfologi
> - **Prediksi rekombinasi genetik** dengan supervised learning (SVM, Random Forest)
> - **Analisis big data genomik** melalui teknik dimensi reduksi (t-SNE, PCA)
>
> Contoh aplikasi: Penelitian Le et al. (2019) mengembangkan hybrid AI untuk prediksi mutasi adaptif menggunakan kombinasi PSO untuk seleksi fitur dan deep learning untuk pemodelan non-linear. Arsitektur ini meningkatkan akurasi prediksi laju mutasi hingga 23% dibanding metode konvensional.
>

> [!cornell] #### Ringkasan
> **Metode komputasi** menjadi tulang punggung analisis biologi evolusioner modern dengan **PSO** menyediakan optimisasi efisien untuk masalah multidimensi seperti seleksi parameter diagnostik. **Rekonstruksi filogeni** mengandalkan algoritma probabilistik dan heuristik untuk menangani kompleksitas kombinatorial, diimplementasikan dalam toolkit seperti **BEAST** untuk analisis Bayesian. Integrasi dengan **pembelajaran mesin** melalui hybrid AI memungkinkan pemodelan pola evolusioner kompleks yang tidak tertangkap metode statistik tradisional. Pemahaman kekuatan dan keterbatasan setiap alat komputasi penting untuk desain penelitian yang rigor.
>

> [!ad-libitum]- Informasi Tambahan
>
> #### Analisis Matematis PSO
> PSO diatur oleh dua persamaan utama:
>
> 1. Update kecepatan:
> $$v_i(t+1) = \omega v_i(t) + c_1 r_1 (pBest_i - x_i(t)) + c_2 r_2 (gBest - x_i(t))$$
>
> 2. Update posisi:
> $$x_i(t+1) = x_i(t) + v_i(t+1)$$
>
> Dimana:
> - $\omega$: inertia weight (biasanya 0.4-0.9)
> - $c_1, c_2$: acceleration coefficients (biasanya 1.4-2.0)
> - $r_1, r_2$: bilangan acak uniform [0,1]
>
> Konvergensi optimal memerlukan penentuan parameter melalui analisis sensitivitas. Studi parametrik menunjukkan rasio c1/c2 ≈ 1 memberikan eksplorasi-eksploitasi seimbang.
>
> #### Perbandingan Alat Filogeni
> | Alat       | Metode          | Kelebihan                          | Keterbatasan               |
> |------------|-----------------|------------------------------------|----------------------------|
> | **MEGA**   | Maximum Parsimony | GUI intuitif, cocok pemula        | Terbatas untuk dataset besar |
> | **BEAST**  | Bayesian         | Model kompleks, penanggalan molekuler | Membutuhkan spesifikasi prior |
> | **RAxML**  | Maximum Likelihood| Cepat untuk dataset besar         | Hanya command-line interface |
>
> #### Proyek Eksplorasi Mandiri
> 1. **Implementasi PSO untuk Seleksi Fitur Genetik**:
> Gunakan dataset SNP dari 1000 Genomes Project dan implementasikan PSO dalam Python untuk memilih subset SNP paling informatif menggunakan library DEAP atau PySwarms.
>
> 2. **Analisis Perbandingan Alat Filogeni**:
> Unduh 50 sekuens protein hemoglobin dari NCBI, bandingkan hasil pohon filogeni menggunakan MEGA (Neighbor-Joining), BEAST (Bayesian), dan RAxML (ML). Evaluasi konsistensi topologi dengan Robinson-Foulds distance.
>
> #### Tool dan Resource
> - **Galaxy Project**: Platform cloud untuk analisis bioinformatika tanpa instalasi lokal (https://galaxyproject.org)
> - **Phylo.io**: Visualisasi interaktif pohon filogeni (https://phylo.io)
> - **EvolView**: Anotasi dan kustomisasi visual pohon evolusioner (https://evolgenius.info)
>
> #### Bacaan Lanjutan
> - "Bioinformatics Algorithms: An Active Learning Approach" oleh Phillip Compeau & Pavel Pevzner
> - "Evolutionary Optimization Algorithms" oleh Dan Simon (Bab 15: PSO Applications)
> - Tutorial BEAST 2 oleh Remco Bouckaert et al. (https://beast.community/tutorials)
> - Kursus Coursera "Bioinformatics Specialization" oleh UC San Diego