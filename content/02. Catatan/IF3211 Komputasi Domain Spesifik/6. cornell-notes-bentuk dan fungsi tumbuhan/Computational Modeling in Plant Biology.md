---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Domain Specific Computation]]

> [!cornell] Computational Modeling in Plant Biology
>
> > ## Questions/Cues
> >
> > - Bagaimana L-systems memodelkan pola percabangan tanaman?
> > - Aplikasi algoritma genetik dalam simulasi pemuliaan tanaman
> > - Teknik image processing untuk analisis morfologi bunga
> > - Integrasi prediksi genomik dalam seleksi induk tanaman
> > - Implementasi sistem klasifikasi bunga berbasis machine learning
> >
> > ## Reference Points
> >
> > - Lecture_01_DFS.pptx (Slides 79-86)
> > - Prusinkiewicz & Lindenmayer (1990) - The Algorithmic Beauty of Plants
> > - Chung & Liao (2022) - Front Plant Sci
> > - Nilsback & Zisserman (2008) - IEEE Conference Proceedings
> >
>
> > ### Pemodelan Pertumbuhan Tanaman dengan L-systems
> > L-systems (Lindenmayer systems) adalah sistem matematika yang digunakan untuk memodelkan proses perkembangan biologis, khususnya pola percabangan tanaman. Sistem ini bekerja dengan menerapkan aturan produksi paralel pada string simbol secara iteratif. Setiap simbol merepresentasikan instruksi geometris seperti "bergerak maju" (F), "belok kanan" (+), atau "belok kiri" (-).
> > Contoh implementasi dasar: Aksiom awal "F" dengan aturan produksi "F → F[+F]F[-F]F" akan menghasilkan struktur percabangan biner setelah beberapa iterasi. Simbol "[" dan "]" bertindak sebagai stack untuk menyimpan dan mengembalikan posisi saat ini, memungkinkan pembentukan struktur hierarkis yang kompleks. Pendekatan ini efektif untuk mensimulasikan berbagai morfologi tanaman karena kemampuannya menangkap sifat rekursif dan berdasar-diri (self-similar) dari pertumbuhan botani.
> > ### Optimasi Pemuliaan Tanaman dengan Algoritma Genetik
> > Algoritma genetik digunakan untuk mensimulasikan proses seleksi buatan dalam pemuliaan tanaman dengan mengoptimalkan kombinasi sifat genetik. Pendekatan ini melibatkan representasi kromosom yang mengkodekan karakteristik tanaman, fungsi fitness yang mengukur performa (misalnya hasil panen, ketahanan penyakit), dan operator evolusi seperti seleksi, crossover, dan mutasi.
> > Studi Chung & Liao (2022) memperkenalkan indeks seleksi terintegrasi yang menggabungkan nilai pemuliaan genomik (GEBV) dengan keragaman genetik. Metode ini menggunakan algoritma optimasi multi-tujuan untuk mengidentifikasi pasangan induk optimal yang menyeimbangkan potensi hasil dengan keragaman genetik. Implementasi praktisnya tersedia dalam paket R bernama IPLGP (Integrated Parental Lines Genomic Prediction).
> > ### Analisis Keragaman Tanaman dengan Machine Learning
> > Machine learning diaplikasikan dalam klasifikasi otomatis spesies bunga berdasarkan fitur morfologi. Nilsback & Zisserman (2008) mengembangkan pipeline pemrosesan gambar yang mengekstraksi: (1) fitur bentuk menggunakan kontur bunga, (2) tekstur melalui analisis warna lokal, dan (3) distribusi spasial pola kelopak. Model SVM (Support Vector Machine) kemudian digunakan untuk klasifikasi multi-kelas.
> > Teknik dasar image processing meliputi: segmentasi bunga dari background menggunakan thresholding warna, penghitungan kelopak melalui deteksi tepi (edge detection), dan analisis simetri dengan transformasi Fourier. Pendekatan ini memungkinkan kuantifikasi objektif karakteristik bunga yang sebelumnya bergantung pada observasi manual.

> [!cornell] #### Summary
> **Pemodelan komputasi** dalam biologi tanaman mencakup tiga pendekatan utama: (1) **L-systems** untuk simulasi struktur pertumbuhan melalui aturan produksi paralel, (2) **Algoritma genetik** mengoptimalkan seleksi induk tanaman dengan mempertimbangkan nilai pemuliaan dan keragaman genomik, dan (3) **Machine learning** memungkinkan analisis kuantitatif morfologi bunga melalui ekstraksi fitur gambar dan klasifikasi multivariat. Integrasi metode komputasi ini mempercepat penelitian biologi tanaman dengan menyediakan **simulasi prediktif** dan **analisis data skala besar**.
>

> [!ad-libitum]- Additional Information
>
> #### Implementasi Teknis L-systems
> Bahasa pemrograman seperti Python (dengan modul Turtle graphics) atau lingkungan khusus seperti L-Py menyediakan framework implementasi L-systems. Parameter kritis meliputi sudut rotasi (25°-45° untuk simulasi percabangan realistis) dan kedalaman iterasi (biasanya 4-7 level). Kompleksitas komputasional meningkat secara eksponensial dengan jumlah iterasi karena sifat aturan produksi paralel.
>
> Contoh kode Python sederhana:
> ```python
> import turtle
> def l_system(axiom, rules, iterations):
> for _ in range(iterations):
> axiom = ''.join(rules.get(c,c) for c in axiom)
> return axiom
> # Aturan produksi untuk pohon fractal
> rules = {'F':'FF+[+F-F-F]-[-F+F+F]'}
> turtle.speed(0)
> ```
>
> #### Analisis Kompleksitas Algoritma Genetik
> Kompleksitas waktu algoritma genetik untuk pemuliaan tanaman bergantung pada tiga faktor utama: ukuran populasi (N), jumlah generasi (G), dan evaluasi fitness (O(M) untuk M marker genomik). Kompleksitas keseluruhan adalah O(N×G×M), dengan bottleneck komputasi pada kalkulasi matriks kekerabatan genomik. Optimasi melalui parallel computing dan pendekatan dimensionality reduction (seperti PCA) sering diperlukan untuk dataset besar.
>
> #### Dataset dan Evaluasi Model Klasifikasi Bunga
> Dataset Oxford Flowers 102 berisi 8,189 gambar bunga dari 102 spesies menjadi benchmark utama. Metrik evaluasi meliputi akurasi klasifikasi (mencapai 80-92% pada state-of-the-art), precision-recall untuk kelas tidak seimbang, dan visualisasi t-SNE untuk verifikasi clustering. Tantangan utama meliputi variasi iluminasi, oklusi kelopak, dan polimorfisme intra-spesies.
>
> #### Proyek Eksplorasi Mandiri
> 1. **Simulasi Pertumbuhan Tanaman Interaktif**: Bangun simulator L-systems berbasis web dengan kontrol parameter real-time (sudut, aturan produksi) menggunakan JavaScript dan p5.js.
> 2. **Optimasi Virtual Tanaman Hias**: Terapkan algoritma genetik untuk "menciptakan" morfologi tanaman hias baru berdasarkan preferensi estetika pengguna melalui evaluasi fitness interaktif.
>
> #### Alat dan Resource
> - **L-Py**: Software khusus untuk pemodelan L-systems (http://lpy.github.io)
> - **IPLGP R Package**: Untuk genomic selection dalam pemuliaan tanaman (https://cran.r-project.org)
> - **Oxford Flowers Dataset**: Dataset benchmark klasifikasi bunga (https://www.robots.ox.ac.uk/~vgg/data/flowers)
>
> #### Bacaan Lanjutan
> - Prusinkiewicz, P., et al. (2018). "L-systems: From Theory to Applications" dalam _ACM SIGGRAPH Courses_
> - Crossa, J., et al. (2017). "Genomic Selection in Plant Breeding" di _Methods in Molecular Biology_
> - Lee, S.H., et al. (2018). "Deep Learning for Image-Based Plant Disease Detection" di _Frontiers in Plant Science_