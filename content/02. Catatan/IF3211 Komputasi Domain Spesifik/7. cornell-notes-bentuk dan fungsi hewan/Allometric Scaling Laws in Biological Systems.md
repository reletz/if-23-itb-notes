---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Domain Specific Computation]]

> [!cornell] Allometric Scaling Laws in Biological Systems
>
> > ## Questions/Cues
> >
> > - Mengapa ukuran tubuh mempengaruhi laju metabolisme?
> > - Bagaimana hukum penskalaan menjelaskan adaptasi sistem biologis?
> > - Apa hubungan alometrik antara massa tubuh dan parameter fisiologis?
> > - Bagaimana hukum Kleiber diterapkan dalam ekologi?
> > - Mengapa penskalaan bersifat non-linear?
> >
> > ## Reference Points
> >
> > - Animal form and function (Slides 4-6)
> > - Campbell Biology in Focus (Pages 36-37)
> >
>
> > ### Konsep Dasar Penskalaan Alometrik
> > Penskalaan alometrik mengacu pada hubungan matematis antara ukuran tubuh organisme dengan karakteristik fisiologis, morfologis, atau ekologisnya. Dalam sistem biologis, hubungan ini biasanya bersifat **non-linear** dan mengikuti pola hukum pangkat (power-law).
> > Contoh klasik adalah hubungan antara laju metabolisme basal (BMR) dengan massa tubuh, di mana BMR berbanding lurus dengan massa tubuh pangkat 0,75. Ini berarti hewan besar memiliki efisiensi metabolik lebih tinggi per gram jaringan dibanding hewan kecil. Sebagai analogi, gajah mengonsumsi lebih sedikit energi per kilogram dibandingkan tikus untuk mempertahankan fungsi tubuhnya.
> > ### Hukum Kleiber dan Mekanisme Dasar
> > Hukum Kleiber (1932) menyatakan bahwa laju metabolisme (M) berkorelasi dengan massa tubuh (W) melalui persamaan: **M = kW<sup>¾</sup>**. Eksponen ¾ ini muncul karena keterbatasan sistem distribusi dalam tubuh:
> > 1. **Sistem peredaran darah**: Jaringan pembuluh darah membentuk struktur fraktal yang mengoptimalkan distribusi nutrisi
> > 2. **Luas permukaan pertukaran**: Efisiensi pertukaran gas/nutrisi menurun seiring peningkatan ukuran tubuh
> > 3. **Konstrain geometris**: Volume tubuh tumbuh lebih cepat daripada luas permukaan (hukum kuadrat-kubus)
> > Contoh aplikasi: Pada burung migran, kemampuan terbang jarak jauh berhubungan dengan penskalaan massa tubuh terhadap konsumsi energi, di mana burung dengan massa 100g memiliki kebutuhan energi 3x lebih besar per gram dibanding burung 1kg.
> > ### Implikasi Ekologis dan Evolusioner
> > Hukum alometrik menjelaskan pola keanekaragaman hayati:
> > - **Strategi reproduksi**: Spesies kecil cenderung bereproduksi cepat dengan banyak keturunan (strategi-r), sedangkan spesies besar berinvestasi pada sedikit keturunan dengan perawatan intensif (strategi-K)
> > - **Distribusi ukuran tubuh**: Dalam komunitas ekologis, sebagian besar biomassa biasanya dipegang oleh individu berukuran menengah
> > - **Adaptasi termoregulasi**: Hewan besar lebih mampu mempertahankan suhu tubuh konstan karena rasio luas permukaan-volume lebih kecil
> > Studi pada mamalia menunjukkan bahwa kebutuhan energi harian berbanding lurus dengan W<sup>0,71</sup>, menjelaskan mengapa gajah membutuhkan 25kg makanan/hari sementara tikus hanya 5% berat badannya.

> [!cornell] #### Summary
>
> **Hukum penskalaan alometrik** menjelaskan hubungan non-linear antara ukuran tubuh dengan parameter fisiologis melalui persamaan hukum pangkat. **Hukum Kleiber** (M ∝ W<sup>¾</sup>) menjadi fondasi memahami efisiensi metabolik pada berbagai skala biologis. Pola ini muncul dari **keterbatasan geometris sistem distribusi** dalam tubuh dan memiliki implikasi signifikan dalam ekologi, evolusi, serta desain sistem biologis. Aplikasi praktisnya mencakup prediksi kebutuhan energi, strategi konservasi satwa, dan desakan alat medis yang sesuai skala tubuh.
>

> [!ad-libitum]- Additional Information
>
> #### Analisis Matematis Penskalaan
> Persamaan dasar penskalaan alometrik: Y = Y<sub>0</sub>M<sup>b</sup>
> - Y: Variabel fisiologis (mis. laju metabolisme)
> - M: Massa tubuh
> - b: Eksponen alometrik (biasanya 0.67-0.75 untuk metabolisme)
> - Y<sub>0</sub>: Konstanta proporsionalitas
>
> Transformasi logaritma menghasilkan hubungan linear: log Y = log Y<sub>0</sub> + b log M. Analisis regresi linear ini memungkinkan identifikasi eksponen b dari data empiris.
>
> #### Penskalaan Jaringan dan Organ
> - **Otak**: Volume otak ∝ W<sup>0,75</sup>
> - **Jantung**: Massa jantung ∝ W<sup>0,98</sup>
> - **Paru-paru**: Kapasitas paru ∝ W<sup>0,95</sup>
> - **Usus**: Panjang usus ∝ W<sup>0,39</sup>
> Perbedaan eksponen menunjukkan adaptasi fungsional spesifik organ terhadap ukuran tubuh.
>
> #### Batasan Teori Penskalaan
> 1. Variasi intraspesifik bisa menyimpang dari pola interspesifik
> 2. Hewan endoterm vs ektoderm menunjukkan pola berbeda
> 3. Adaptasi lingkungan ekstrem (contoh: mamalia laut) mengubah parameter penskalaan
> 4. Metode pengukuran metabolisme mempengaruhi hasil (respirometri vs kalorimetri)
>
> #### Proyek Eksplorasi Mandiri
> 1. Analisis dataset mamalia dari [Pantheria](https://esapubs.org/archive/ecol/E090/184/):
> - Hitung eksponen alometrik untuk laju metabolik vs massa tubuh
> - Bandingkan pola antara karnivora dan herbivora
> 2. Simulasi komputer sistem pembuluh darah fraktal menggunakan [NetLogo](https://ccl.northwestern.edu/netlogo/):
> - Modifikasi parameter percabangan dan ukuran jaringan
> - Ukuran efisiensi distribusi "nutrisi" dalam model
>
> #### Alat dan Sumber Daya
> - **Paket R**: `smatr` (Standardised Major Axis Regression) untuk analisis alometrik
> - **Basis Data**: [Animal Diversity Web](https://animaldiversity.org/) untuk data morfometrik
> - **Visualisasi**: [Allometric Explorer](https://www.allometric.com/tools) untuk simulasi interaktif
>
> #### Bacaan Lanjutan
> - West, G.B., et al. (1997). _"A General Model for the Origin of Allometric Scaling Laws in Biology"_. Science
> - Schmidt-Nielsen, K. (1984). _"Scaling: Why is Animal Size So Important?"_ Cambridge University Press
> - Glazier, D.S. (2005). _"Beyond the '3/4-power law': variation in the intra- and interspecific scaling of metabolic rate in animals"_. Biological Reviews
> - Kursus Online: [Scaling in Biology](https://www.complexityexplorer.org/) oleh Santa Fe Institute