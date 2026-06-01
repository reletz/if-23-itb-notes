---
type: Note

tags: [Statistika, Non-Parametrik, Analisis-Data]

cssclasses:

- cornell-notes
---

_Back to_ [[MA2281 Statistika nonparametrik]]

> [!cornell] Topic: Uji Wilcoxon Rank-Sum & Mann-Whitney U Test
> 
> > ## Questions/Cues
> >
> > - **Definisi Dasar**
> >     
> > - **Kapan digunakan?**
> >     
> > - **Asumsi Utama**
> >     
> > - **Analogi Sederhana**
> >     
> >
> > ## Reference Points
> >
> > - PDF: 3. Uji Wilcoxon Rank-Sum
> >     
> > - PDF: 4. Mann-Whitney U Test
> >     
> > - PDF: Catatan Kuis 1 Statnonpar
> >     
> 
> > ### Konsep Dasar & Tujuan
> >
> > Apa itu Uji Wilcoxon Rank-Sum / Mann-Whitney U?
> > 
> > Ini adalah uji statistik non-parametrik yang digunakan untuk membandingkan dua populasi yang independen (saling bebas).
> >
> > **Tujuannya:** Menentukan apakah dua sampel berasal dari populasi dengan distribusi yang sama (khususnya melihat perbedaan _median_ atau lokasi pusat data).
> >
> > **Kapan Kita Menggunakannya?**
> >
> > 1. **Data Tidak Normal:** Ketika data Anda melanggar asumsi normalitas (misalnya, ada outlier ekstrim atau menceng).
> >     
> > 2. **Sampel Kecil:** Ketika jumlah sampel sedikit sehingga sulit memastikan distribusi normal.
> >     
> > 3. **Data Ordinal:** Atau data interval/rasio yang diubah menjadi peringkat.
> >     
> >
> > **Hubungan dengan Uji-t (t-test):**
> > 
> > Jika Uji-t (parametrik) membandingkan rata-rata (mean) dengan asumsi data normal, maka Wilcoxon/Mann-Whitney adalah alternatifnya yang membandingkan peringkat (rank) tanpa asumsi normalitas.
> >
> > **Analogi Pemula:**
> >
> > > Bayangkan sebuah lomba lari antara Tim A dan Tim B.
> >
> > - **Uji Parametrik (t-test):** Kita menghitung rata-rata waktu lari. Jika satu orang di Tim A sangat lambat (outlier), rata-rata tim hancur.
> >     
> > - **Uji Non-Parametrik (Wilcoxon):** Kita tidak peduli waktunya, tapi **urutan finish-nya**. Siapa yang juara 1, 2, 3, dst. Jika juara 1 dari Tim A, juara 2 dari Tim A, dan juara 3 dari Tim A, kita bisa bilang Tim A lebih cepat, tidak peduli berapa detik waktu mereka.
> >     
> >
> > ### Prosedur & Perhitungan (Step-by-Step)
> >
> > **Langkah 1: Penggabungan & Peringkat**
> > 
> > Gabungkan data dari kedua sampel ($n_1$ dan $n_2$) menjadi satu kelompok besar. Urutkan dari nilai terkecil ke terbesar.
> >
> > - Berikan peringkat (ranking) mulai dari 1 sampai $N$ (total data).
> >     
> >
> > **Langkah 2: Penanganan "Ties" (Angka Kembar)**
> > 
> > Jika ada nilai yang sama persis (ties), peringkatnya adalah rata-rata dari peringkat yang seharusnya ditempati.
> >
> > - _Contoh:_ Data ke-7 dan ke-8 nilainya sama. Maka keduanya mendapat peringkat: $\frac{7+8}{2} = 7.5$.
> >     
> >
> > Langkah 3: Penjumlahan Peringkat ($W$)
> > 
> > Pisahkan kembali data ke kelompok asal. Hitung jumlah peringkat untuk sampel yang lebih kecil ($n_1$), sebut ini $w_1$. Hitung juga untuk sampel besar ($w_2$).
> >
> > - _Validasi:_ $w_1 + w_2 = \frac{(n_1+n_2)(n_1+n_2+1)}{2}$. Ini adalah rumus jumlah deret aritmatika.
> >     
> >
> > ### Contoh Kasus & Perhitungan Manual
> >
> > **Skenario:**
> > 
> > Kita membandingkan efisiensi bahan bakar dua jenis ban.
> > 
> > Catatan: Untuk contoh manual ini, kita ambil 5 mobil pertama dari tiap grup sebagai sampel independen.
> >
> > **Data Mentah:**
> >
> > - **Ban Radial (A):** 4.2, 4.7, 6.6, 7.0, 6.7
> >     
> > - **Ban Belted (B):** 4.1, 4.9, 6.2, 6.9, 6.8
> >     
> >
> > **Langkah 1: Urutkan & Ranking Gabungan**
> >
> > |**Nilai**|**Asal Kelompok**|**Peringkat (Rank)**|
> > |---|---|---|
> > |4.1|Belted (B)|1|
> > |4.2|Radial (A)|2|
> > |4.7|Radial (A)|3|
> > |4.9|Belted (B)|4|
> > |6.2|Belted (B)|5|
> > |6.6|Radial (A)|6|
> > |6.7|Radial (A)|7|
> > |6.8|Belted (B)|8|
> > |6.9|Belted (B)|9|
> > |7.0|Radial (A)|10|
> >
> > **Langkah 2: Hitung Wilcoxon Rank Sum ($W$)**
> > 
> > Jumlahkan peringkat masing-masing kelompok:
> >
> > - $W_A$ **(Radial):** $2 + 3 + 6 + 7 + 10 = \mathbf{28}$  
> >     
> > - $W_B$ **(Belted):** $1 + 4 + 5 + 8 + 9 = \mathbf{27}$  
> >     
> >
> > _Validasi:_ Total $W = 28 + 27 = 55$. Rumus: $\frac{10(11)}{2} = 55$. (Cocok).
> >
> > **Langkah 3: Hitung Mann-Whitney ($U$)**
> > 
> > Transformasi $W$ menjadi $U$ untuk melihat "jumlah kemenangan".
> >
> > $$U_A = W_A - \frac{n_A(n_A+1)}{2} = 28 - \frac{5(6)}{2} = 28 - 15 = \mathbf{13}$$$$U_B = W_B - \frac{n_B(n_B+1)}{2} = 27 - \frac{5(6)}{2} = 27 - 15 = \mathbf{12}$$
> >
> > **Hasil Akhir ($U$ Statistik):**
> > 
> > Kita ambil nilai terkecil: $U = 12$.
> >
> > ### Perbedaan: Statistik $U$ vs $W$  
> >
> > **1.** Wilcoxon Rank **Sum (**$W$**):**
> >
> > - **Apa itu?** Murni jumlah peringkat.
> >     
> > - **Kelemahan:** Nilainya bergantung pada seberapa banyak sampel yang Anda miliki. Makin banyak sampel, makin besar nilai $W$. Sulit dibandingkan antar studi.
> >     
> > - **Dalam Contoh:** $W_A = 28$.
> >     
> >
> > **2. Mann-Whitney (**$U$**):**
> >
> > - **Apa itu?** Jumlah pasangan dimana satu grup "mengalahkan" grup lain.
> >     
> > - **Interpretasi:**
> >     
> >     - $U_A = 13$ artinya: Ada 13 kejadian di mana skor Radial > skor Belted (jika diadu satu lawan satu).
> >         
> >     - $U_B = 12$ artinya: Ada 12 kejadian di mana skor Belted > skor Radial.
> >         
> > - **Keunggulan:** Nilainya selalu antara $0$ sampai $n_1 \times n_2$. Lebih terstandarisasi.
> >     
> > - **Dalam Contoh:** $U = 12$ (skor minimum).
> >     
> >
> > ### Statistik Uji ($U$ vs $W$)
> >
> > **Rumus Transformasi:**
> > 
> > $$U_1 = w_1 - \frac{n_1(n_1+1)}{2}$$$$U_2 = w_2 - \frac{n_2(n_2+1)}{2}$$
> >
> > **Pengambilan Keputusan:**
> > 
> > Bandingkan nilai $U$ hitung dengan Tabel Kritis.
> >
> > - Tolak $H_0$ jika $U_{hitung} \le U_{tabel}$. (Perhatikan: di sini kita mencari nilai yang _kecil_ atau _ekstrim_).
> >     
> >
> > ### Aproksimasi Normal (Sampel Besar)
> >
> > **Kapan menggunakan pendekatan Normal?**
> > 
> > Ketika ukuran sampel cukup besar (biasanya $n_1 > 8$ dan $n_2 > 8$, atau salah satu $>20$), distribusi statistik $U$ mendekati distribusi Normal (Kurva Lonceng).
> >
> > **Parameter Statistik Z:**
> > 
> > Kita menstandarisasi nilai $U$ menjadi nilai $Z$ (Z-score):
> > 
> > $$Z = \frac{U - \mu_U}{\sigma_U}$$
> >
> > Dimana:
> >
> > - Mean ($\mu_U$): Nilai harapan rata-rata.
> >     
> >     $$\mu_U = \frac{n_1 n_2}{2}$$
> > - Standar Deviasi ($\sigma_U$): Ukuran penyebaran peringkat.
> >     
> >     $$\sigma_U = \sqrt{\frac{n_1 n_2 (n_1 + n_2 + 1)}{12}}$$
> >
> > _Catatan:_ Jika menggunakan Z-score, bandingkan dengan tabel Z standar (misal $\pm 1.96$ untuk $\alpha=5\%$).

> [!cornell] #### Summary
> 
> **Uji Wilcoxon Rank-Sum** (dan ekuivalensinya, **Mann-Whitney U Test**) adalah metode statistik **non-parametrik** untuk membandingkan dua **sampel independen** tanpa asumsi normalitas. Inti metodenya adalah mengubah data menjadi **peringkat (ranks)**. Statistik $W$ adalah jumlah peringkat salah satu grup, sedangkan statistik $U$ adalah ukuran "dominasi" satu grup terhadap grup lain (jumlah kemenangan head-to-head). Keduanya ekuivalen secara matematis: $U = W - \text{faktor koreksi}$. Untuk sampel besar ($n > 8$), kita menggunakan aproksimasi Normal (Z-score) untuk menarik kesimpulan.

> [!ad-libitum]- Ad Libitum: Pendalaman Teknis & Matematis
> 
> Bagian ini membahas detail matematis untuk penanganan _ties_ (angka kembar) dan bukti ekuivalensi.
> 
> #### 1. Koreksi Varians untuk Data Ties (Angka Kembar)
> 
> Rumus varians TERKOREKSI (jika ada ties):
> 
> $$\mathbb{V}ar(W_{n}) = \frac{n_1 n_2 (N+1)}{12} - \frac{n_1 n_2 \sum_{i=1}^{k} (t_i^3 - t_i)}{12 N (N+1)}$$
> 
> - $t_i$: Banyaknya angka yang sama dalam satu grup kembar.
>     
> - Faktor $(t_i^3 - t_i)$ mengurangi varians karena angka kembar mengurangi variasi peringkat yang mungkin.
>     
> 
> #### 2. Ekuivalensi Matematis
> 
> $$U = W_{sampel\_kecil} - \frac{n_1(n_1+1)}{2}$$
> 
> $U$ pada dasarnya menghitung: "Jika kita pasangkan setiap anggota Grup A dengan setiap anggota Grup B, berapa kali A menang?".
> 
> #### 3. Implementasi Code (Python)
> 
> ```
> from scipy.stats import mannwhitneyu
> # Data dari contoh di atas
> radial = [4.2, 4.7, 6.6, 7.0, 6.7]
> belted = [4.1, 4.9, 6.2, 6.9, 6
> ```

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Apa perbedaan interpretasi antara nilai W (Wilcoxon) dan U (Mann-Whitney)?</strong></summary>
> 
> $W$ adalah jumlah peringkat absolut (bergantung ukuran sampel), sedangkan $U$ merepresentasikan jumlah "kemenangan" head-to-head antar grup (lebih terstandarisasi antara 0 hingga $n_1 \times n_2$).
> 
> </details>
>
> <details>
> 
> <summary><strong>2. Dalam contoh perhitungan di atas, mengapa U = 12 dipilih sebagai statistik uji?</strong></summary>
> 
> Karena dalam uji dua sisi, kita memilih nilai minimum antara $U_1$ (13) dan $U_2$ (12). Nilai $U$ yang lebih kecil menunjukkan pemisahan distribusi yang lebih kuat (salah satu grup mendominasi peringkat ujung).
> 
> </details>
>
> <details>
> 
> <summary><strong>3. Jika kita memiliki data: Grup A [10, 10] dan Grup B [20, 30], berapakah nilai U untuk Grup A?</strong></summary>
> 
> Grup A nilainya (10, 10) lebih kecil dari semua Grup B (20, 30).
> 
> Rank A: 1.5, 1.5 -> $W_A = 3$.
> 
> $U_A = 3 - \frac{2(3)}{2} = 0$.
> 
> Artinya Grup A menang 0 kali melawan Grup B.
> 
> </details>