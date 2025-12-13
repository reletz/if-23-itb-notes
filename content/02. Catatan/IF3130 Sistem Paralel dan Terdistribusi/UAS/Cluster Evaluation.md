---
type: Note

course: IF3170 Inteligensi Artifisial

tags: [AI, Clustering, Evaluation, Metrics]

cssclasses:

- cornell-notes
---

_Back to_ [[IF3170 Inteligensi Artifisial]]

> [!cornell] Topic: 4. Cluster Evaluation (Validity)
> >
> > ## Questions/Cues
> >
> > - **Mengapa Perlu Evaluasi?**
> >     
> > - **Internal Measures (Konsep)**
> >     
> > - **Cohesion vs Separation**
> >     
> > - **Silhouette Coefficient**
> >     
> > - **Studi Kasus: Hitung Silhouette**
> >     
> > - **External Measures (Konsep)**
> >     
> > - **Purity**
> >     
> > - **Studi Kasus: Hitung Purity**
> >     
> > - **Perbandingan Metode Evaluasi**
> >     
> >
> > ## Reference Points
> >
> > - Slide 48-51 (Motivasi)
> >     
> > - Slide 52-57 (Internal Measures)
> >     
> > - Slide 58-60 (External Measures)
> >     
> 
> > ### 1. Motivasi: Mengapa Evaluasi Cluster Penting?
> >
> > Dalam _Unsupervised Learning_, kita tidak memiliki label kelas ("kunci jawaban") saat proses pelatihan. Namun, evaluasi tetap krusial untuk:
> >
> > 1. **Menghindari Apophenia:** Mencegah algoritma menemukan pola semu pada data acak (_random noise_). Algoritma clustering akan selalu membagi data, bahkan jika datanya hanya semut yang menyebar acak. Kita butuh metrik untuk tahu apakah pembagian itu bermakna.
> >     
> > 2. **Membandingkan Algoritma:** Menentukan apakah K-Means bekerja lebih baik daripada DBSCAN untuk dataset spesifik.
> >     
> > 3. **Tuning Parameter:** Membantu memilih parameter optimal, seperti menentukan jumlah cluster ($k$) terbaik pada K-Means (menggunakan Elbow Method yang berbasis evaluasi internal).
> >     
> >
> > ### 2. Internal Measures (Evaluasi Internal)
> >
> > Metode ini digunakan saat **TIDAK ADA** label kelas eksternal (_ground truth_). Penilaian didasarkan murni pada struktur geometri data hasil clustering.
> >
> > **Dua Pilar Kualitas Internal:**
> >
> > - **Cohesion (Kekompakan):** Seberapa dekat/mirip objek-objek di dalam satu cluster.
> >     
> > 	- Diukur dengan _Within-Cluster Sum of Squares_ (WSS) atau SSE.
> > 			
> > 	- _Target:_ Semakin **kecil** semakin baik (anggota cluster saling berpelukan erat).
> >         
> > - **Separation (Pemisahan):** Seberapa jauh jarak antar cluster yang berbeda.
> >     
> > 	- Diukur dengan _Between-Cluster Sum of Squares_ (BSS).
> > 			
> > 	- _Target:_ Semakin **besar** semakin baik (antar kelompok saling menjauh).
> > 			
> >
> > **Silhouette Coefficient ($s$):**
> > 
> > Metrik yang menggabungkan cohesion dan separation untuk setiap titik data $i$.
> >
> > Rumus:
> > 
> > $$s(i) = \frac{b(i) - a(i)}{\max(a(i), b(i))}$$
> >
> > - $a(i)$: Rata-rata jarak titik $i$ ke semua titik lain di **cluster sendiri** (mengukur _cohesion_).
> >     
> > - $b(i)$: Rata-rata jarak titik $i$ ke semua titik di **cluster tetangga terdekat** (mengukur _separation_). Cluster tetangga adalah cluster lain yang rata-rata jaraknya paling minimal terhadap $i$.
> >     
> >
> > **Interpretasi Nilai (-1 s.d 1):**
> >
> > - **Mendekati +1**: Cluster Sangat Baik. (Jauh dari musuh, dekat dengan teman).
> >     
> > - **Sekitar 0**: _Overlapping_. Titik berada di perbatasan/bimbang antar dua cluster.
> >     
> > - **Negatif**: _Mis-clustered_. Titik lebih dekat ke cluster tetangga daripada clusternya sendiri.
> >     
> >
> > ### 3. Studi Kasus 1: Perhitungan Silhouette (Detail Slide 57)
> >
> > **Data:** Kita akan menghitung Silhouette untuk titik **A1(2,5)**.
> >
> > - **Cluster 1 (Home):** A1(2,5), A2(3,4), A3(4,6)
> >     
> > - **Cluster 2 (Neighbor):** B1(8,3), B2(9,2), B3(10,5)
> >     
> > - **Cluster 3 (Other):** C1(6,10), C2(7,8), C3(8,9)
> >     
> >
> > **Langkah 1: Hitung $a(A1)$ - Cohesion**
> > 
> > Rata-rata jarak A1 ke teman se-cluster (A2, A3).
> >
> > - $d(A1, A2) = \sqrt{(2-3)^2 + (5-4)^2} = \sqrt{1+1} \approx 1.414$  
> >     
> > - $d(A1, A3) = \sqrt{(2-4)^2 + (5-6)^2} = \sqrt{4+1} \approx 2.236$  
> >     
> > $$a(A1) = \frac{1.414 + 2.236}{2} = 1.825$$
> >
> > **Langkah 2: Hitung $b(A1)$ - Separation**
> > 
> > Rata-rata jarak A1 ke semua cluster lain, ambil yang paling kecil.
> >
> > - **Ke Cluster 2:**
> >     
> >   * $d(A1, B1) \approx 6.32$, $d(A1, B2) \approx 7.61$, $d(A1, B3) = 8.00$
> >   * Rata-rata = $(6.32+7.61+8.00)/3 \approx \mathbf{7.31}$
> > 
> >
> > - **Ke Cluster 3:**
> >     
> >   * $d(A1, C1) \approx 6.40$, $d(A1, C2) \approx 5.83$, $d(A1, C3) \approx 7.21$
> >   * Rata-rata = $(6.40+5.83+7.21)/3 \approx \mathbf{6.48}$
> > 
> >
> > - **Pilih Minimum:** $b(A1) = \min(7.31, 6.48) = \mathbf{6.48}$  
> >     
> >
> > **Langkah 3: Hitung Nilai Silhouette**
> > 
> > $$s(A1) = \frac{6.48 - 1.825}{\max(1.825, 6.48)} = \frac{4.655}{6.48} \approx \mathbf{0.718}$$
> >
> > _Kesimpulan:_ Nilai 0.718 cukup tinggi (dekat ke 1), menandakan A1 berada di cluster yang tepat dan terpisah cukup baik dari cluster tetangga.
> >
> > ### 4. External Measures (Evaluasi Eksternal)
> >
> > Metode ini digunakan ketika kita **MEMILIKI** label kelas asli (_ground truth_). Biasanya digunakan dalam riset untuk memvalidasi performa algoritma baru menggunakan dataset standar (seperti Iris dataset).
> >
> > **Purity (Kemurnian):**
> > 
> > Mengukur sejauh mana sebuah cluster hanya berisi data dari satu kategori kelas saja. Ini mirip dengan mengukur "akurasi" klasifikasi untuk setiap cluster.
> >
> > Rumus:
> > 
> > $$Purity = \frac{1}{N} \sum_{k=1}^{K} \max_{j}(\text{jumlah anggota kelas } j \text{ di cluster } k)$$
> ?
> > - Ambil kelas mayoritas di setiap cluster.
> >     
> > - Jumlahkan anggota kelas mayoritas tersebut dari semua cluster.
> >     
> > - Bagi dengan total data ($N$).
> >     
> >
> > ### 5. Studi Kasus 2: Perhitungan Purity (Detail Slide 60)
> >
> > Total Data ($N$): 17 Dokumen.
> > 
> > Cluster: 3 buah.
> > 
> > Label Asli: 🔴 (Merah/A), 🔵 (Biru/B), 🟢 (Hijau/C).
> >
> > |**Cluster**|**Komposisi Data (Label Asli)**|**Kelas Dominan**|**Jumlah Dominan**|
> > |---|---|---|---|
> > |**Cluster I**|🔴🔴🔴🔴🔴🔵 (5 Merah, 1 Biru)|**Merah**|5|
> > |**Cluster II**|🔴🔵🔵🔵🔵🟢 (1 Merah, 4 Biru, 1 Hijau)|**Biru**|4|
> > |**Cluster III**|🔴🔴🟢🟢🟢 (2 Merah, 3 Hijau)|**Hijau**|3|
> >
> > Perhitungan:
> > 
> > $$Purity = \frac{5 + 4 + 3}{17} = \frac{12}{17} \approx \mathbf{0.706}$$
> >
> > _Interpretasi:_ Sekitar **70.6%** data dikelompokkan dengan "benar" sesuai kelas mayoritasnya. Cluster I sangat murni (hanya 1 error), sedangkan Cluster III paling kotor (hampir seimbang antara Merah dan Hijau).
> >
> > ### 6. Perbandingan Kapan Menggunakan Apa
> >
> > |**Kondisi Data**|**Metode Evaluasi**|**Alasan**|
> > |---|---|---|
> > |**Data** Riil / **Wild**|**Internal** (Silhouette, Elbow)|Kita tidak punya label. Kita hanya bisa percaya pada geometri (kerapatan data).|
> > |**Data Benchmark**|**External** (Purity, NMI)|Kita punya label tersembunyi. Kita ingin menguji apakah algoritma mampu menemukan kembali label tersebut.|
> > |**Menentukan K**|**Internal** (Elbow Method)|Mencari keseimbangan variansi intra-cluster.|

> [!cornell] #### Summary
> 
> Evaluasi Cluster adalah tahap validasi untuk memastikan hasil algoritma bermakna dan bukan sekadar random chance. Metode dibagi dua: Internal Measures (seperti Silhouette Coefficient) digunakan saat tanpa label, berfokus pada keseimbangan kohesi (kedekatan internal) dan separasi (jarak eksternal). Nilai Silhouette positif tinggi indikasi cluster yang baik. External Measures (seperti Purity) digunakan saat label asli tersedia, mengukur konsistensi anggota cluster terhadap kelas aslinya. Meskipun Purity mudah dihitung, ia bias terhadap jumlah cluster yang besar, sehingga hasil harus diinterpretasi dengan hati-hati.

> [!ad-libitum]- Ad Libitum: Pendalaman Teknis & Metrik Lain
> 
> #### 1. Kelemahan Purity ("Game the System")
> 
> Purity memiliki kelemahan fatal: nilainya akan monoton naik jika jumlah cluster ($K$) ditambah.
> 
> - _Skenario Ekstrem:_ Jika kita set $K = N$ (setiap titik jadi 1 cluster), maka setiap cluster pasti "murni" (isi 1, dominan 1). Purity = 100%.
>     
> - Ini menyesatkan. Oleh karena itu, Purity tidak bisa digunakan untuk membandingkan dua model dengan jumlah cluster ($K$) yang berbeda jauh.
>     
> - _Solusi:_ Gunakan **Normalized Mutual Information (NMI)** atau **Adjusted Rand Index (ARI)** yang memberi penalti pada jumlah cluster yang berlebihan.
>     
> 
> #### 2. Dunn Index (Alternatif Internal)
> 
> Metrik internal yang lebih ketat daripada Silhouette.
> 
> $$DI = \frac{\min(\text{Jarak Antar Cluster})}{\max(\text{Diameter Intra Cluster})}$$
> 
> - Nilai tinggi berarti cluster terpisah jauh (pembilang besar) dan sangat padat (penyebut kecil).
>     
> - Sangat sensitif terhadap _noise_: satu titik outlier yang jauh bisa memperbesar diameter cluster secara drastis, menjatuhkan nilai Dunn Index.
>     
> 
> #### 3. Entropi (Alternatif External)
> 
> Kebalikan dari Purity. Mengukur tingkat "kekacauan" dalam cluster.
> 
> - Cluster yang isinya campur aduk (misal 3 Merah, 3 Biru) memiliki **Entropi** Tinggi (Buruk).
>     
> - Cluster yang homogen (6 Merah) memiliki **Entropi 0** (Sempurna).
>     

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Apa arti nilai Silhouette Coefficient bernilai negatif (misal -0.5)?</strong></summary>
> 
> Nilai negatif menunjukkan bahwa rata-rata jarak titik tersebut ke cluster tetangga lebih kecil daripada jarak ke clusternya sendiri ($b &lt; a$). Artinya, titik tersebut kemungkinan besar <strong>salah dikelompokkan</strong> (mis-clustered) dan seharusnya pindah ke cluster tetangga.
> 
> </details>
>
> <details>
> 
> <summary><strong>2. Mengapa kita tidak bisa selalu menggunakan Purity untuk mengevaluasi hasil clustering di dunia nyata?</strong></summary>
> 
> Karena di dunia nyata (problem unsupervised murni), kita biasanya <strong>tidak memiliki label kelas asli</strong> (ground truth). Purity hanya bisa dihitung jika kita punya label tersebut untuk dicocokkan.
> 
> </details>
>
> <details>
> 
> <summary><strong>3. Jelaskan konsep Cohesion dan Separation dalam satu kalimat!</strong></summary>
> 
> <strong>Cohesion</strong> adalah seberapa erat anggota cluster saling berpelukan (ingin jarak kecil), sedangkan <strong>Separation</strong> adalah seberapa jauh cluster saling menjaga jarak (ingin jarak besar).
> 
> </details>