---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5100 Pemrograman untuk Data Analitik]]

> [!cornell] Central Limit Theorem
>
> > ## Questions/Cues
> >
> > - Mengapa empirical rule tampak berlaku pada hasil lemparan dadu padahal dadu berdistribusi uniform?
> > - Apa tiga klaim **Central Limit Theorem** (CLT)?
> > - Bagaimana eksperimen dadu kontinu memperlihatkan CLT?
> > - Apa implikasi CLT bagi perhitungan **confidence interval**?
> >
> > ## Reference Points
> >
> > - IF5100 — Confidence Interval (Pages 13-18)
>
> > ### Tidak Semua Distribusi Normal
> >
> > Empirical rule dibuktikan untuk distribusi normal. Tetapi hasil lemparan dadu **tidak** berdistribusi normal: setiap sisi sama mungkin, jadi distribusinya **uniform**. Lalu mengapa empirical rule masih bisa dipakai pada simulasi dadu?
> >
> > Jawabannya: kita tidak bernalar tentang **satu lemparan**, melainkan tentang **mean dari sekumpulan lemparan**. Untuk besaran inilah **Central Limit Theorem** berlaku.
> >
> > ### Tiga Klaim CLT
> >
> > Diberikan sampel yang cukup besar:
> >
> > 1. **Mean dari sampel-sampel** (sample means) dalam himpunan sampel akan **berdistribusi hampir normal**.
> > 2. Distribusi normal itu memiliki **mean yang dekat dengan mean populasi**.
> > 3. **Variansi sample means** mendekati **variansi populasi dibagi ukuran sampel**.
> >
> > Klaim ketiga inilah yang nanti melahirkan **standard error** (lihat [[Standard Error of the Mean]]).
> >
> > ### Eksperimen: Dadu Kontinu
> >
> > Fungsi `plotMeans` mensimulasikan dadu kontinu dengan nilai `5*random.random()` (uniform pada 0 sampai 5, mean teoretis 2,5). Ia melempar `numDice` dadu, mengambil rata-ratanya, mengulangi sampai total `numRolls` lemparan terpakai, lalu menggambar histogram dari rata-rata tersebut.
> >
> > | Kasus | Mean | Std |
> > | --- | --- | --- |
> > | 1 dadu | 2,4976 | 1,4439 |
> > | Rata-rata 50 dadu | 2,4999 | 0,2049 |
> >
> > Kedua mean hampir sama dengan 2,5, tetapi histogram 1 dadu **datar** (uniform) sedangkan histogram rata-rata 50 dadu **berbentuk lonceng** dan jauh lebih sempit. Std turun dari 1,444 menjadi 0,205; ini cocok dengan klaim ketiga: 1,444 / sqrt(50) = 0,204.
> >
> > ```mermaid
> > graph LR
> >     P["Populasi<br/>bentuk apa pun"] --> S["Ambil banyak sampel<br/>ukuran n besar"]
> >     S --> M["Hitung mean tiap sampel"]
> >     M --> D["Sample means ~ normal<br/>mean ~ mean populasi<br/>var ~ var populasi / n"]
> >     D --> E["Empirical rule<br/>bisa dipakai"]
> > ```
> >
> > ### Moral
> >
> > **Bentuk distribusi nilai tidak penting** bila kita mengestimasi mean populasi dengan sampel yang cukup besar. CLT membolehkan kita memakai **empirical rule** untuk menghitung **confidence interval**, bahkan ketika populasinya sendiri tidak normal.

> [!cornell] #### Summary
>
> Empirical rule dibuat untuk data normal, tetapi tetap berguna pada dadu (uniform) karena yang kita nalar adalah **mean sekumpulan sampel**, bukan satu nilai. **Central Limit Theorem** menyatakan bahwa untuk sampel cukup besar, sample means berdistribusi hampir normal, bermean dekat mean populasi, dengan variansi sekitar variansi populasi dibagi ukuran sampel. Eksperimen dadu kontinu (mean 2,5) menunjukkan std turun dari 1,444 (1 dadu) menjadi 0,205 (rata-rata 50 dadu) dan bentuknya menjadi lonceng. Akibatnya, bentuk distribusi populasi tak menjadi soal dan empirical rule dapat dipakai untuk confidence interval.

> [!ad-libitum]- Additional Information
>
> #### Pernyataan Formal dan Syarat
>
> Untuk variabel acak i.i.d. dengan mean mu dan variansi hingga sigma^2, distribusi (mean sampel - mu) / (sigma / sqrt(n)) konvergen ke N(0, 1) saat n membesar. Syarat penting: sampel **independen**, dan variansi populasi **hingga** (distribusi Cauchy melanggar sehingga CLT tidak berlaku). Untuk populasi yang sangat miring (skewed), n yang dibutuhkan jauh lebih besar; aturan praktis n >= 30 hanya cocok untuk distribusi yang cukup simetris.
>
> #### Mengapa Std Berkurang Sebesar Akar n
>
> Variansi jumlah n variabel independen adalah n kali variansi tiap variabel. Rata-rata membagi jumlah dengan n, sehingga variansi dibagi n^2, hasilnya sigma^2 / n. Karena itu penyempitan sebanding dengan akar n: untuk memperkecil galat setengahnya, butuh sampel empat kali lebih besar.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Jalankan `plotMeans` dengan `random.expovariate(0.5)` (distribusi miring) dan cari berapa dadu yang diperlukan agar histogram tampak simetris.
> 2. Buat eksperimen yang sama dengan numpy: `np.random.uniform(0, 5, (10000, n)).mean(axis=1)` untuk n = 1, 2, 5, 50, lalu plot sebagai subplot.
> 3. Uji CLT pada distribusi Cauchy dan amati mengapa rata-rata tidak stabil.
>
> #### Bacaan Lanjutan
>
> - Guttag, *Introduction to Computation and Programming Using Python*, 3rd Ed. — Bab 16.
> - MIT OCW 6.0002, *Lecture 7: Confidence Intervals*.
