---
type: Note

course: IF-3170 Inteligensi Artifisial

tags: [AI, Clustering, Unsupervised, Theory]

cssclasses:

- cornell-notes
---

_Back to_ [[IF3170 Inteligensi Artifisial]]

> [!cornell] Topic: 1. Dasar Clustering (Basic Concepts)
> 
> > ## Questions/Cues
> >
> > - Definisi Clustering & Konsep Dasar
> >     
> > - Unsupervised Learning
> >     
> > - Intra-class vs Inter-class Similarity
> >     
> > - Kualitas Cluster
> >     
> > - Contoh Aplikasi (Search, Bio, Marketing)
> >     
> > - Tahapan Proses Clustering
> >     
> > - Feature Selection vs Extraction
> >     
> > - Proximity Measure
> >     
> > - Hard vs Soft Clustering
> >     
> > - Representasi Cluster
> >     
> > - Taksonomi Metode (5 Kategori)
> >     
> > - Partitioning, Hierarchical, Density, Grid, Model-Based
> >     
> >
> > ## Reference Points
> >
> > - Slide 1-6 (Definisi & Konsep)
> >     
> > - Slide 7-12 (Aplikasi)
> >     
> > - Slide 13-14 (Tahapan)
> >     
> > - Slide 15-16 (Representasi)
> >     
> > - Slide 17-19 (Kategori Metode)
> >     
> 
> > ### Apa itu Clustering?
> >
> > **Clustering** adalah proses pengelompokan sekumpulan objek data (pola) ke dalam himpunan-himpunan (disebut _cluster_) berdasarkan kesamaan data (_data similarity_).
> >
> > Tujuan utamanya adalah menemukan struktur intrinsik dalam data mentah (_raw data_) tanpa bantuan label yang sudah ada sebelumnya.
> >
> > **Konsep Kunci: Unsupervised Learning**
> > 
> > Clustering termasuk dalam kategori Unsupervised Learning.
> >
> > - Berbeda dengan klasifikasi (_supervised_) di mana kita memiliki "kunci jawaban" (label kelas seperti "Sakit" vs "Sehat"), pada clustering kita tidak tahu apa-apa tentang label tersebut.
> >     
> > - Algoritma harus "belajar sendiri" dengan mengukur seberapa mirip satu data dengan data lainnya.
> >     
> >
> > **Prinsip Kualitas Cluster yang Baik:**
> > 
> > Kualitas hasil clustering sangat ditentukan oleh dua metrik utama:
> >
> > 1. **High Intra-class Similarity (Compactness):**
> >     
> >     - Objek-objek di dalam satu cluster yang sama haruslah **semirip mungkin** atau jaraknya sangat dekat satu sama lain.
> >         
> >     - Semakin rapat (_compact_) anggota cluster, semakin baik.
> >         
> > 2. **Low Inter-class Similarity (Separation):**
> >     
> >     - Objek antar cluster yang berbeda haruslah **seberbeda mungkin** atau jaraknya sangat jauh.
> >         
> >     - Cluster satu dengan yang lain harus terpisah secara jelas (_well-separated_).
> >         
> >
> > ### Mengapa Perlu Clustering? (Aplikasi Riil)
> >
> > Clustering digunakan untuk eksplorasi data (_data discovery_) di berbagai domain:
> >
> > - **Search Engine (Mesin Pencari):**
> >     
> > 	- _Masalah:_ Mencari kata kunci yang ambigu (misal: "Apple").
> > 			
> > 	- _Solusi:_ Mengelompokkan hasil pencarian menjadi topik-topik terpisah seperti "Apple (Buah)", "Apple (Perusahaan)", "Resep", dll. (Contoh: Yippy Search).
> > 			
> > - **News Aggregator:**
> >     
> > 	- Mengelompokkan ribuan artikel berita yang masuk setiap menit menjadi topik kejadian yang sama (misal: "Gempa Bumi Cianjur", "Pemilu 2024"). Contoh: Google News.
> > 			
> > - **Bioinformatika (Analisis Gen):**
> >     
> > 	- Mengelompokkan gen yang memiliki pola ekspresi serupa dalam kondisi tertentu, yang seringkali mengindikasikan fungsi biologis yang sama atau terkait. Visualisasi sering menggunakan _heatmap_.
> > 			
> > - **Marketing (Customer Segmentation):**
> >     
> > 	- Membagi basis pelanggan ke dalam segmen-segmen seperti "High Spender Young", "Low Spender Senior", dll., berdasarkan atribut Umur, Pendapatan, dan Resensi (kapan terakhir belanja).
> > 			
> >
> > ### Tahapan Proses Clustering
> >
> > Proses clustering bukan hanya menjalankan algoritma, tetapi melibatkan siklus (_feedback loops_):
> >
> > 1. **Feature Selection & Extraction (Pra-pemrosesan):**
> >     
> > 	- **Feature Selection:** Memilih subset fitur asli yang paling relevan untuk membedakan objek (misal: memilih fitur 'Gaji' tapi membuang 'Nama').
> > 			
> > 	- **Feature Extraction:** Mentransformasi data asli menjadi fitur baru yang lebih representatif (misal: PCA).
> > 			
> > 2. **Proximity Measure (Pengukuran Jarak):**
> >     
> > 	- Menentukan cara matematis untuk menghitung "kemiripan".
> > 			
> > 	- Contoh: Jarak Euclidean (garis lurus), Manhattan, atau Cosine Similarity. Pilihan jarak harus sesuai dengan domain masalah.
> > 			
> > 3. **Grouping (Pengelompokan):**
> >     
> > 	- Menjalankan algoritma clustering.
> > 			
> > 	- Output bisa berupa **Hard Clustering** (setiap data pasti masuk ke 1 cluster) atau **Soft Clustering** (setiap data memiliki _membership degree_ atau probabilitas masuk ke beberapa cluster sekaligus).
> >         
> > 4. **Data Abstraction (Opsional):**
> >     
> > 	- Menyederhanakan hasil cluster agar mudah dipahami manusia.
> >         
> > 5. **Assessment (Evaluasi):**
> >     
> > 	- Menilai apakah hasil cluster valid (bagus/buruk) menggunakan metrik evaluasi.
> > 			
> >
> > ### Representasi Cluster
> >
> > Setelah cluster terbentuk, bagaimana kita menyimpannya atau mendeskripsikannya?
> >
> > 1. **Centroid:**
> >     
> > 	- Cluster diwakili oleh satu titik pusat (rata-rata). Paling umum digunakan (misal: K-Means).
> >         
> > 2. **Set of Distant Points:**
> >     
> > 	- Cluster diwakili oleh beberapa titik terjauh (boundary) untuk menggambarkan bentuk atau batas wilayahnya.
> >         
> > 3. **Logical Nodes (Classification Tree):**
> >     
> > 	- Cluster diwakili oleh aturan logika konjungtif dalam struktur pohon.
> > 			
> > 	- Contoh: Cluster 1 adalah data di mana $(X_1 < 3)$, Cluster 2 adalah data di mana $(X_1 > 3 \text{ AND } X_2 < 2)$.
> > 			
> >
> > ### Taksonomi Metode Clustering
> >
> > Ada ribuan algoritma clustering, namun umumnya dikategorikan menjadi 5 pendekatan utama:
> >
> > **1. Partitioning-Based (Partisi)**
> >
> > - **Konsep:** Membagi data secara langsung menjadi $k$ kelompok yang saling lepas (_exclusive_).
> >     
> > - **Cara Kerja:** Biasanya menggunakan teknik iteratif untuk memindahkan objek antar grup guna meminimalkan error.
> >     
> > - **Contoh:** K-Means (paling populer), K-Medoids (PAM), CLARA.
> >     
> >
> > **2. Hierarchical-Based (Hirarki)**
> >
> > - **Konsep:** Membuat struktur pengelompokan bertingkat seperti struktur pohon (_dendrogram_).
> >     
> > - **Dua Jenis Pendekatan:**
> >     
> >     - **Agglomerative (Bottom-Up):** Mulai dengan setiap data sebagai 1 cluster, lalu digabung-gabungkan (_merge_) secara bertahap hingga menjadi 1 cluster besar.
> >         
> >     - **Divisive (Top-Down):** Mulai dengan 1 cluster besar berisi semua data, lalu dipecah-pecah (_split_) hingga menjadi cluster kecil-kecil.
> >         
> > - **Contoh:** BIRCH, CURE, ROCK, Chameleon.
> >     
> >
> > **3. Density-Based (Berbasis Kepadatan)**
> >
> > - **Konsep:** Menganggap cluster sebagai wilayah yang titik-titiknya **padat**, yang dipisahkan oleh wilayah yang titik-titiknya **jarang** (_noise_).
> >     
> > - **Keunggulan:** Bisa menemukan cluster dengan bentuk aneh (bukan hanya bulat) dan tahan terhadap outlier.
> >     
> > - **Contoh:** DBSCAN, OPTICS.
> >     
> >
> > **4. Grid-Based (Berbasis Grid)**
> >
> > - **Konsep:** Membagi ruang data menjadi sel-sel grid yang terhingga (kuantisasi ruang). Operasi clustering dilakukan pada struktur grid tersebut, bukan pada titik data individu.
> >     
> > - **Keunggulan:** Sangat cepat karena waktu prosesnya bergantung pada jumlah sel grid, bukan jumlah data. Cocok untuk data spasial masif.
> >     
> > - **Contoh:** STING (Statistical Information Grid), WaveCluster, CLIQUE.
> >     
> >
> > **5. Model-Based (Berbasis Model Statistika)**
> >
> > - **Konsep:** Mengasumsikan bahwa setiap cluster cocok dengan model distribusi statistik tertentu (biasanya Gaussian). Tujuannya adalah mencari parameter model yang paling pas dengan data.
> >     
> > - **Contoh:** EM (Expectation-Maximization), SOM (Self-Organizing Maps).
> >     

> [!cornell] #### Summary
> 
> Clustering adalah teknik inti dalam Unsupervised Learning yang bertujuan mengelompokkan data mentah ke dalam struktur bermakna berdasarkan kemiripan intrinsik. Kualitas clustering yang baik ditandai dengan kohesi (kerapatan) intra-cluster yang tinggi dan separasi (pemisahan) inter-cluster yang jauh. Proses ini melibatkan tahapan krusial mulai dari seleksi fitur, pemilihan metode jarak, hingga eksekusi algoritma yang bisa bersifat hard (pasti) atau soft (probabilistik). Metode clustering dikategorikan menjadi pendekatan Partisi (memecah data langsung), Hirarki (struktur pohon), Densitas (kepadatan titik), Grid (kuantisasi ruang), dan Model (distribusi statistik), di mana masing-masing memiliki kegunaan spesifik tergantung pada bentuk dan karakteristik data.

> [!ad-libitum]- Ad Libitum: Pendalaman Teknis & Strategi
> 
> #### 1. Deep Dive: Feature Selection vs Extraction
> 
> Kesalahan terbesar dalam clustering sering terjadi di tahap ini.
> 
> - **Feature Selection (Seleksi):** Kita **memilih** fitur terbaik dari himpunan fitur yang ada.
>     
>     - _Contoh:_ Anda punya data (Tinggi Badan, Warna Baju, IQ). Untuk mengelompokkan kemampuan akademis, Anda memilih 'IQ' dan membuang 'Tinggi Badan' & 'Warna Baju'. Fitur tidak berubah, hanya berkurang.
>         
> - **Feature Extraction (Ekstraksi):** Kita **menciptakan** fitur baru dari kombinasi fitur lama.
>     
>     - _Contoh:_ Menggunakan PCA (_Principal Component Analysis_) untuk mereduksi 100 fitur yang berkorelasi menjadi 2 fitur utama (Principal Components) yang menampung 95% variansi data. Bentuk data berubah total.
>         
> 
> #### 2. Skalabilitas Algoritma (Complexity Note)
> 
> Mengapa ada kategori Grid-Based?
> 
> - Sebagian besar algoritma clustering (seperti K-Means atau Hierarchical) memiliki kompleksitas yang bergantung pada $N$ (jumlah data). Jika $N$ mencapai jutaan, algoritma menjadi lambat.
>     
> - **Grid-Based** memecah area menjadi misal 100x100 sel. Algoritma hanya memproses 10.000 sel tersebut, tidak peduli apakah di dalamnya ada 1 juta atau 1 miliar data. Ini membuatnya sangat _scalable_.
>     
> 
> #### 3. Hard vs Soft Clustering (Fuzzy)
> 
> - **Hard Clustering:** Sebuah titik $x$ adalah anggota cluster $A$ ATAU cluster $B$. Sifatnya biner (0 atau 1). Contoh: K-Means standar.
>     
> - **Soft (Fuzzy) Clustering:** Sebuah titik $x$ bisa menjadi anggota cluster $A$ dengan probabilitas 0.7 dan cluster $B$ dengan probabilitas 0.3. Sangat berguna untuk data yang berada di perbatasan. Contoh: Fuzzy C-Means (FCM).
>     

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Apa perbedaan mendasar antara "Agglomerative" dan "Divisive" dalam Hierarchical Clustering?</strong></summary>
> 
> <strong>Agglomerative (Bottom-up):</strong> Mulai dari N cluster (setiap data adalah cluster sendiri), lalu digabung-gabungkan secara bertahap hingga menjadi 1 cluster.
> 
> <strong>Divisive (Top-down):</strong> Mulai dari 1 cluster besar, lalu dipecah-pecah secara bertahap hingga menjadi N cluster kecil.
> 
> </details>
>
> <details>
> 
> <summary><strong>2. Mengapa "Feature Selection" sangat krusial sebelum melakukan clustering?</strong></summary>
> 
> Karena algoritma clustering menghitung jarak berdasarkan semua fitur yang diberikan ("Garbage In, Garbage Out"). Jika kita menyertakan fitur yang tidak relevan (noise), perhitungan jarak akan terdistorsi, menyebabkan hasil pengelompokan menjadi tidak bermakna.
> 
> </details>
>
> <details>
> 
> <summary><strong>3. Jelaskan konsep "Grid-Based Clustering" dan keunggulan utamanya!</strong></summary>
> 
> Grid-Based Clustering membagi ruang data menjadi sel-sel grid yang terhingga dan melakukan operasi pada sel tersebut, bukan pada titik datanya. Keunggulan utamanya adalah <strong>kecepatan pemrosesan</strong> yang sangat tinggi karena tidak bergantung pada jumlah objek data, melainkan pada jumlah sel grid.
> 
> </details>