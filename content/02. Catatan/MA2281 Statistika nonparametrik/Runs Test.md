---
type: Note

tags: [Statistika, Non-Parametrik, Uji-Keacakan]

cssclasses:

- cornell-notes
---

_Back to_ [[MA2281 Statistika nonparametrik]]

> [!cornell] Topic: Runs Test (Uji Runtun/Iterasi)
> 
> > ## Questions/Cues
> >
> > - **Definisi Dasar**
> >     
> > - **Apa itu "Run"?**
> >     
> > - **Hipotesis (**$H_0$**)**
> >     
> > - **Kapan Digunakan?**
> >     
> > - **Logika Pengujian**
> >     
> >
> > ## Reference Points
> >
> > - PDF: 5. Runs Test
> >     
> 
> > ### Konsep Dasar & Tujuan
> >
> > **Apa itu Runs Test?**
> > 
> > Runs Test adalah uji statistik non-parametrik yang digunakan untuk menentukan apakah urutan kejadian dalam sampel bersifat acak (random) atau tidak.
> >
> > **Mengapa Penting?**
> > 
> > Banyak uji statistik (seperti t-test atau ANOVA) berasumsi data diambil secara acak. Runs test memvalidasi asumsi tersebut. Jika data memiliki pola (tren atau siklus), berarti data tersebut tidak acak.
> >
> > **Definisi "Run" (Runtun):**
> > 
> > Sebuah "Run" adalah sub-urutan dari simbol identik yang berurutan.
> >
> > - _Simbol:_ Bisa berupa kategori (Laki/Perempuan) atau tanda matematis (+/-).
> >     
> >
> > **Analogi Pemula:**
> >
> > > Bayangkan Anda melempar koin:
>> 
> > - **Hasil 1:** `G G G G G A A A A A` (Tidak acak, "Runs" sedikit, berkelompok).
> >     
> > - **Hasil 2:** `G A G A G A G A G A` (Tidak acak, "Runs" terlalu banyak, selang-seling sempurna).
> >     
> > - **Hasil 3:** `G G A G A A A G A G` (Tampak acak, "Runs" moderat).
> >     
> >
> > Runs Test mendeteksi apakah jumlah run terlalu sedikit atau terlalu banyak.
> >
> > ### Prosedur Dasar
> >
> > 1. Konversi Data ke Simbol Biner
> > 
> > Runs test membagi data menjadi dua kategori eksklusif:
> >
> > - **Data Kualitatif:** L/P, Sukses/Gagal, Kepala/Ekor.
> >     
> > - **Data Kuantitatif:** Diubah menjadi `+` (di atas median) dan `-` (di bawah median). **Catatan:** Nilai yang sama persis dengan median diabaikan/dibuang.
> >     
> >
> > **2. Identifikasi Parameter**
> >
> > - $n_1$: Jumlah simbol tipe pertama.
> >     
> > - $n_2$: Jumlah simbol tipe kedua.
> >     
> > - $v$ (nu): Total jumlah runs yang terjadi.
> >     
> >
> > **3. Hipotesis**
> >
> > - $H_0$: Urutan data adalah **acak**.
> >     
> > - $H_1$: Urutan data **tidak acak**.
> >     
> >
> > ### Contoh Kasus 1: Data Kualitatif (Poll)
> >
> > **Skenario:**
> > 
> > Survei terhadap 12 orang ($n=12$) mengenai penggunaan produk. Urutan responden dicatat berdasarkan jenis kelamin (M=Male, F=Female).
> >
> > **Data Urutan:**
> > 
> > M M F F F M F F M M M M
> >
> > **Langkah Analisis:**
> >
> > 1. Kelompokkan Runs:
> >     
> >     (M M) (F F F) (M) (F F) (M M M M)
> >     
> > 2. **Hitung Parameter:**
> >     
> > 	- $n_1$ (F) = 5
> > 			
> > 	- $n_2$ (M) = 7
> > 			
> > 	- $v$ (Jumlah run) = 5
> >         
> >
> > Kesimpulan:
> > 
> > Melihat tabel statistik (Tabel A.18 di referensi), untuk $n_1=5, n_2=7$, nilai $v=5$ memiliki P-value > 0.05.
> >
> > - **Keputusan:** Terima $H_0$. Data diambil secara acak.
> >     
> >
> > ### Contoh Kasus 2: Data Kuantitatif (Mesin Cat)
> >
> > **Skenario (Example 16.7):**
> > 
> > Mesin pengisi cat diuji untuk melihat apakah volume cat bervariasi secara acak.
> > 
> > Data (Liter): 3.6, 3.9, 4.1, 3.6, 3.8, 3.7, 3.4, 4.0, 3.8, 4.1, 3.9, 4.0, 3.8, 4.2, 4.1
> >
> > **Langkah 1: Tentukan Median ($\tilde{x}$)**
> > 
> > Urutkan data untuk cari median (atau hitung manual dari data di atas). Diketahui Median = 3.9.
> >
> > **Langkah 2: Konversi ke Simbol (+/-)**
> > 
> > Bandingkan setiap data dengan 3.9:
> >
> > - 3.6 (< 3.9) $\to$ **-**
> >     
> > - 3.9 (= 3.9) $\to$ **Abaikan**
> >     
> > - 4.1 (> 3.9) $\to$ **+**
> >     
> > - ...dan seterusnya.
> >     
> >
> > Hasil Urutan:
> > 
> > - + - - - - + - + + - + - + +
> >
> > **Langkah 3: Hitung Runs**
> > 
> > (-) (+) (----) (+) (-) (++) (-) (+) (-) (++)
> >
> > - $n_1$ (tanda -) = 6
> >     
> > - $n_2$ (tanda +) = 7
> >     
> > - $v$ (jumlah runs) = 8
> >     
> >
> > **Keputusan:**
> > 
> > Dari tabel, P-value untuk $v=8$ (dengan $n_1=6, n_2=7$) adalah besar (P=1.0).
> >
> > - **Terima** $H_0$**:** Variasi mesin bersifat acak.
> >     
> >
> > ### Runs Test untuk Dua Sampel
> >
> > **Fungsi Alternatif:**
> > 
> > Runs Test juga bisa digunakan sebagai alternatif Uji Wilcoxon/Mann-Whitney untuk menguji apakah dua populasi memiliki distribusi yang sama.
> >
> > **Logika:**
> > 
> > Gabungkan kedua sampel dan urutkan. Tandai asal sampel (A atau B).
> >
> > - Jika $H_0$ benar (distribusi sama): A dan B akan tercampur rata $\to$ **Banyak Runs**.
> >     
> > - Jika $H_0$ salah (beda mean): A akan mengumpul di kiri, B di kanan (atau sebaliknya) $\to$ **Sedikit Runs**.
> >     
> > - _Kelemahan:_ Kurang _powerful_ dibanding Wilcoxon, dan sulit menangani _ties_ antar grup.
> >     
> >
> > ### Aproksimasi Normal (Sampel Besar)
> >
> > Jika $n_1 > 10$ dan $n_2 > 10$, distribusi jumlah runs ($V$) mendekati Normal.
> >
> > Mean ($\mu_V$):
> > 
> > $$\mu_V = \frac{2n_1n_2}{n_1+n_2} + 1$$
> >
> > Varians ($\sigma_V^2$):
> > 
> > $$\sigma_V^2 = \frac{2n_1n_2(2n_1n_2 - n_1 - n_2)}{(n_1+n_2)^2(n_1+n_2-1)}$$
> >
> > Statistik Z:
> > 
> > $$Z = \frac{V - \mu_V}{\sigma_V}$$

> [!cornell] #### Summary
> 
> **Runs Test** adalah metode non-parametrik untuk mengevaluasi **keacakan** sebuah urutan data. Sebuah "Run" adalah serangkaian simbol identik yang berurutan. Uji ini bekerja dengan membandingkan jumlah runs ($v$) yang diamati dengan jumlah runs yang diharapkan secara statistik. Jumlah runs yang **terlalu sedikit** mengindikasikan pengelompokan (trend), sedangkan runs yang **terlalu banyak** mengindikasikan pola osilasi sistematis. Untuk data kuantitatif, data dikonversi menjadi simbol positif/negatif relatif terhadap **median**.

> [!ad-libitum]- Ad Libitum: Pendalaman Teknis
> 
> #### 1. Interpretasi Ekstrim Runs
> 
> - Runs Sangat Sedikit (Clustering/Trend):
> 	
> 	Contoh: ++++++------ ($v=2$).
> 	
> 	Ini menunjukkan adanya bias sistematis. Dalam kontrol kualitas, ini bisa berarti mesin bergeser (drift) dari settingan awal seiring waktu.
> 	
> - Runs Sangat Banyak (Mixing/Cyclical):
> 	
> 	Contoh: +-+-+-+-+-+- ($v=12$).
> 	
> 	Ini menunjukkan keteraturan buatan. Data random jarang sekali berselang-seling sesempurna ini.
> 	
> 
> #### 2. Perbandingan dengan Wilcoxon Rank-Sum
> 
> Meskipun Runs Test (Wald-Wolfowitz) bisa digunakan untuk menguji dua sampel ($H_0: F(x) = G(x)$), ia memiliki _power_ yang lebih rendah dibandingkan Wilcoxon Rank-Sum.
> 
> - **Wilcoxon:** Memanfaatkan besaran peringkat (magnitude of ranks).
>     
> - Runs Test: Hanya memanfaatkan urutan grup (clustering of groups).
>     
>     Runs test dua sampel umumnya hanya sensitif jika perbedaan antar populasi sangat ekstrem (misal: tidak ada overlap sama sekali).
>     
> 
> #### 3. Rumus Varians
> 
> Rumus varians Runs Test terlihat kompleks:
> 
> $$\sigma_V^2 = \frac{2n_1n_2(2n_1n_2 - n_1 - n_2)}{(n_1+n_2)^2(n_1+n_2-1)}$$
> 
> Rumus ini diturunkan dari teori kombinatorik hipergeometrik. Pembagian dengan $(n_1+n_2-1)$ adalah penyesuaian derajat kebebasan.

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Apa yang dimaksud dengan "Run" dalam konteks uji ini?</strong></summary>
> 
> Run adalah sub-urutan dari satu atau lebih simbol identik yang muncul berurutan dalam rangkaian data. Contoh: AA adalah satu run, B adalah satu run.
> 
> </details>
>
> <details>
> 
> <summary><strong>2. Jika data adalah angka (kuantitatif), bagaimana cara kita melakukan Runs Test?</strong></summary>
> 
> Tentukan median sampel terlebih dahulu. Ubah setiap data menjadi tanda + jika di atas median, dan - jika di bawah median. Data yang sama persis dengan median dibuang.
> 
> </details>
>
> <details>
> 
> <summary><strong>3. Apa yang diindikasikan jika jumlah runs (v) jauh lebih kecil dari nilai harapan?</strong></summary>
> 
> Mengindikasikan bahwa data tidak acak karena adanya pengelompokan (clustering) atau tren tertentu (misal: data awal positif semua, data akhir negatif semua).
> 
> </details>
>
> <details>
> 
> <summary><strong>4. Mengapa Runs Test dianggap kurang "powerful" dibanding Wilcoxon untuk membandingkan dua populasi?</strong></summary>
> 
> Karena Runs Test hanya melihat urutan grup (apakah grup A dan