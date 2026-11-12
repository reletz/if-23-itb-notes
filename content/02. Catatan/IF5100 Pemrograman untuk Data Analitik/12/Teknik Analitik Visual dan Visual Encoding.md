---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5100 Pemrograman untuk Data Analitik]]

> [!cornell] Teknik Analitik Visual dan Visual Encoding
>
> > ## Questions/Cues
> >
> > - Tiga kelompok teknik analitik visual apa saja, dan pertanyaan analitik apa yang dijawab masing-masing?
> > - Apa saja tipe data (numerical, ordinal, categorical), abstract data set, dan marks dalam visualisasi?
> > - Bagaimana urutan akurasi persepsi untuk tugas kuantitatif (position sampai color)?
> > - Properti visual mana yang cocok untuk data numerical, ordinal, dan categorical?
> > - Mengapa warna (hue) tidak punya urutan alami, dan apa itu distinct values serta redundant encoding?
> >
> > ## Reference Points
> >
> > - IF5100 — Dataviz (Pages 27-48, 52)
>
> > ### Tiga Kelompok Visual Analytic Techniques
> >
> > Sebelum memilih chart, tanyakan **apa yang ingin dilihat dari data**. Slide mengelompokkannya menjadi tiga:
> >
> > | Kelompok | Aspek yang dianalisis |
> > | --- | --- |
> > | **Comparison and proportions** | Range dan distribution, ranking, measurement, judging |
> > | **Trend and pattern** | Direction, rate of change, fluctuation, significance, intersection |
> > | **Relationships and connections** | Exceptions, correlations, associations, clusters dan gaps, hierarchical relationships |
> >
> > Contoh: membandingkan penjualan antarcabang termasuk kelompok pertama (bar chart); melihat laju kenaikan kasus dari waktu ke waktu termasuk kelompok kedua (line chart); mencari hubungan BMI dengan biaya asuransi termasuk kelompok ketiga (scatter plot).
> >
> > ### Tipe Data, Abstract Data Set, dan Marks
> >
> > Tipe data (Munzner, Spoerri):
> >
> > - **Numerical**: bisa dikenai operasi aritmetika (tinggi, harga).
> > - **Ordinal**: mematuhi relasi urutan (kecil, sedang, besar).
> > - **Categorical**: hanya bisa dibandingkan sama atau tidak sama (provinsi, jenis kelamin).
> >
> > **Abstract data set** yang umum: symbolic, tabular, networked, hierarchical, dan textual information.
> >
> > **Marks** adalah bentuk dasar penggambar data:
> >
> > - **Points** (atribut: position, color, size)
> > - **Lines** (location, length, width, color)
> > - **Areas** (shading seragam atau halus)
> > - **Volumes** (resolution, translucency)
> >
> > ### Ranking Akurasi Persepsi
> >
> > Untuk tugas persepsi **kuantitatif**, manusia paling akurat membaca (dari paling akurat ke paling tidak akurat): **Position**, lalu **Length**, **Angle** dan **Slope**, lalu **Area**, **Volume**, dan paling lemah **Color** dan **Density**. Inilah alasan bar chart (posisi dan panjang) lebih mudah dibaca daripada pie chart (sudut dan luas) untuk membandingkan nilai.
> >
> > Peringkat properti visual juga berbeda menurut tipe data:
> >
> > | Numerical | Ordinal | Categorical |
> > | --- | --- | --- |
> > | Position | Position | Position |
> > | Length | Density | Color hue |
> > | Angle | Color saturation | Texture |
> > | Slope | Color hue | Connection |
> > | Area | Texture | Containment |
> > | Volume | Connection | Density |
> > | Density | Containment | Color saturation |
> > | Color saturation | Length | Shape |
> > | Color hue | Angle | Length |
> >
> > Position selalu berada di puncak untuk ketiganya, sehingga dimensi data terpenting sebaiknya dipetakan ke posisi.
> >
> > ```mermaid
> > graph LR
> >     A["Akurasi persepsi<br/>(kuantitatif)"] --> B["Position"]
> >     B --> C["Length"]
> >     C --> D["Angle / Slope"]
> >     D --> E["Area"]
> >     E --> F["Volume"]
> >     F --> G["Color / Density"]
> > ```
> >
> > ### Memilih Encoding yang Tepat
> >
> > Menurut **Iliinsky dan Steele**:
> >
> > - **Natural ordering**: posisi dan panjang punya urutan alami, sedangkan shape tidak; ketebalan garis berurutan, tetapi gaya garis (solid, dotted, dashed) tidak. Properti dengan urutan alami cocok untuk nilai kuantitatif (27, 33, 41) atau ordinal (kecil, sedang, besar).
> > - **Warna tidak berurutan**: hue tidak punya urutan alami di otak kita. Yang berurutan adalah **brightness (luminance)** dan **saturation (intensity)**. Karena itu untuk data berurutan (misalnya choropleth tingkat kemiskinan) pakai gradasi terang-gelap satu hue, bukan pelangi.
> > - **Distinct values**: tiap properti visual hanya mampu menampilkan sejumlah nilai berbeda yang masih bisa **dipersepsi, dibedakan, dan diingat** pembaca. Misalnya pembaca hanya mampu membedakan sekitar 5 hingga 8 hue pada legenda; lebih dari itu perlu encoding lain.
> > - **Redundant encoding**: bila masih ada properti visual yang menganggur setelah dimensi utama dienkode, gunakan untuk mengenkode ulang dimensi yang sama (misalnya kategori dengan warna **dan** bentuk). Informasi masuk lewat lebih banyak kanal sehingga lebih cepat, mudah, dan akurat ditangkap, serta membantu pembaca buta warna.
> >
> > Dua slide "Example Analysis" membedah visualisasi nyata dari sisi dimensi data yang dienkode ke properti visual apa.
>
> [!cornell] #### Summary
> Pemilihan visualisasi dimulai dari pertanyaan analitik: comparison and proportions, trend and pattern, atau relationships and connections. Data dibedakan menjadi numerical, ordinal, dan categorical, digambar dengan marks (points, lines, areas, volumes). Akurasi persepsi kuantitatif tertinggi pada position, lalu length, angle/slope, area, volume, dan terendah color/density, sehingga dimensi terpenting dipetakan ke posisi. Properti visual harus punya urutan alami yang sesuai tipe data (hue tidak berurutan, brightness dan saturation berurutan), dibatasi jumlah distinct values yang bisa dibedakan pembaca, dan boleh dienkode ganda (redundant encoding) untuk memperkuat pembacaan.

> [!ad-libitum]- Additional Information
>
> #### Hierarki Efektivitas Cleveland-McGill
> Urutan akurasi di slide berakar dari eksperimen **Cleveland dan McGill (1984)** tentang persepsi grafis: judgment pada skala posisi bersama paling akurat, lalu posisi tidak bersama, panjang, sudut/slope, luas, volume, dan shading/warna. Mackinlay (1986) memperluasnya menjadi sistem *APT* yang menyusun peringkat tiap channel menurut tipe data, dan inilah dasar tabel peringkat di atas.
>
> #### Channel Tipe Magnitude vs Identity
> Munzner membedakan channel yang menyampaikan **magnitude** (berapa banyak: position, length, area, luminance) dan **identity** (apa/di mana: hue, shape, motion, spatial region). Kesalahan umum: memakai hue untuk nilai kuantitatif atau memakai length untuk kategori.
>
> #### Palet Warna di Matplotlib dan Seaborn
> - Sequential: `viridis`, `Blues` (data ordinal/numerik berurutan).
> - Diverging: `RdBu`, `coolwarm` (ada titik tengah bermakna, misalnya korelasi 0).
> - Qualitative: `tab10`, `Set2` (kategori, jumlah kecil).
> - `viridis` dirancang **perceptually uniform** dan aman bagi sebagian besar jenis buta warna; hindari `jet`/rainbow.
>
> #### Proyek Eksplorasi Mandiri
> - Plot data yang sama (5 kategori) sebagai bar chart, pie chart, dan bubble chart, lalu minta teman mengurutkannya dan ukur akurasi.
> - Buat peta panas satu variabel dengan `viridis` lalu dengan `jet`; bandingkan kemudahan membaca urutan nilai.
>
> #### Bacaan Lanjutan
> - Cleveland dan McGill, "Graphical Perception" (JASA, 1984).
> - Tamara Munzner, *Visualization Analysis and Design* (2014).
> - Noah Iliinsky, "Choosing Visual Properties for Successful Visualizations".
