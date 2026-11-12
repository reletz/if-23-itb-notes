---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5100 Pemrograman untuk Data Analitik]]

> [!cornell] Standard Error of the Mean
>
> > ## Questions/Cues
> >
> > - Apa fungsi **error bar**, dan apa yang diperlihatkannya pada sampel suhu?
> > - Mengapa CLT memungkinkan kita memakai hanya satu sampel, dan apa itu **standard error of the mean** (SEM)?
> > - Bagaimana mengestimasi SEM bila standard deviation populasi tidak diketahui?
> > - Apakah bentuk distribusi (skew) dan ukuran populasi memengaruhi akurasi estimasi?
> > - Apa lima langkah mengestimasi mean populasi dari satu sampel?
> >
> > ## Reference Points
> >
> > - IF5100 — Sampling and Standard Error (Pages 13-26)
>
> > ### Error Bars
> >
> > **Error bar** adalah representasi grafis dari variabilitas data dan cara memvisualisasikan **ketidakpastian**. Pada data suhu, error bar menunjukkan confidence interval untuk tiap ukuran sampel. Deck mencatat bahwa memperbesar sampel dari 50 ke 600 mengecilkan interval dari sekitar 1,2 C menjadi sekitar 0,34 C.
> >
> > ### Masalah: Sampling Besar Itu Mahal
> >
> > Namun cara tadi membutuhkan 600 data x 1000 percobaan = **600 ribu** data, padahal seluruh populasi hanya sekitar **422 ribu**. Lalu apa untungnya sampling? Berkat [[Central Limit Theorem]], kita cukup memakai **satu sampel berukuran 600** saja. Kuncinya klaim ke-3 CLT: variansi sample means kira-kira variansi populasi dibagi ukuran sampel.
> >
> > ### Standard Error of the Mean (SEM)
> >
> > Dari klaim ke-3 CLT, standard deviation sample means (disebut **standard error of the mean**, SEM atau SE) adalah:
> >
> > **SEM = sigma / sqrt(n)**
> >
> > ```python
> > def sem(popSD, sampleSize):
> >     return popSD/sampleSize**0.5
> > ```
> >
> > Cek dengan data suhu: sigma populasi 9,44 dan n = 100 menghasilkan 0,944, sangat dekat dengan std sample means hasil eksperimen (0,94). Untuk n = 200 diperoleh 0,667, dekat dengan hasil eksperimen 0,662. Slide 18 menguji SEM ini dengan membandingkan SEM teoretis dan std terukur untuk berbagai ukuran sampel.
> >
> > ### Standard Deviation Sampel vs Populasi
> >
> > Masalah praktis: biasanya kita **tidak tahu** standard deviation populasi. Bagaimana mengaproksimasinya? Dengan **standard deviation sampel**. Slide 20-21 menunjukkan bahwa begitu sampel mencapai ukuran yang **cukup besar**, standard deviation sampel menjadi aproksimasi yang baik terhadap standard deviation populasi. Apakah ini hanya berlaku untuk contoh ini? Deck mengujinya dengan memvariasikan distribusi dan ukuran populasi.
> >
> > ### Apakah Distribusi dan Ukuran Populasi Berpengaruh?
> >
> > Tiga distribusi dibandingkan: `random.random()` (uniform), `random.gauss(0, 1)` (normal), dan `random.expovariate(0.5)` (eksponensial, miring ke kanan).
> >
> > - **Distribusi berpengaruh karena skew.** **Skew** adalah ukuran ketidaksimetrisan distribusi probabilitas; makin miring populasi, makin besar sampel yang dibutuhkan agar standard deviation sampel mendekati standard deviation populasi.
> > - **Ukuran populasi** (slide 25) diuji juga; kesimpulan pokok deck adalah ukuran sampel dan skew yang menentukan, bukan ukuran populasi.
> >
> > ### Lima Langkah Mengestimasi Mean dari Satu Sampel
> >
> > 1. Pilih **ukuran sampel** berdasarkan estimasi **skew** populasi.
> > 2. Pilih **sampel acak** dari populasi.
> > 3. Hitung **mean dan standard deviation** sampel tersebut.
> > 4. Gunakan standard deviation sampel untuk **mengestimasi SE**.
> > 5. Gunakan SE terestimasi untuk membuat **confidence interval** di sekitar mean sampel.
> >
> > Prosedur ini bekerja baik bila sampel yang dipilih **independen dan acak**. Itu tidak selalu mudah dicapai, "seperti yang terus dipelajari para pollster politik".
> >
> > ```mermaid
> > graph LR
> >     A["Pilih ukuran n<br/>(lihat skew)"] --> B["Ambil 1 sampel acak"]
> >     B --> C["Hitung mean dan SD sampel"]
> >     C --> D["SE = SD / akar n"]
> >     D --> E["CI = mean +- 1,96 SE"]
> > ```

> [!cornell] #### Summary
>
> **Error bar** memvisualisasikan ketidakpastian; sampel lebih besar (50 ke 600) memperkecil interval (1,2 C ke 0,34 C), tetapi mengulang 1000 kali terlalu mahal. Berkat **CLT**, satu sampel cukup: **standard error of the mean** = sigma / sqrt(n) dan terbukti cocok dengan data suhu (9,44 / 10 = 0,944). Karena sigma populasi biasanya tak diketahui, dipakai standard deviation sampel, yang menjadi aproksimasi baik setelah sampel cukup besar. **Skew** populasi memengaruhi ukuran sampel yang dibutuhkan. Prosedurnya: pilih n berdasarkan skew, ambil sampel acak, hitung mean dan SD, estimasi SE dari SD sampel, lalu bangun confidence interval sekitar mean sampel; syaratnya sampel independen dan acak.

> [!ad-libitum]- Additional Information
>
> #### Rumus Interval dan Koreksi
>
> Confidence interval 95% untuk mean: x_bar plus-minus 1,96 x s / sqrt(n). Untuk n kecil dan sigma tidak diketahui, memakai nilai kritis dari **distribusi t** (derajat kebebasan n - 1) lebih tepat daripada 1,96. Untuk sampel tanpa pengembalian dari populasi kecil, ada **finite population correction** sqrt((N - n) / (N - 1)), yang menjelaskan mengapa ukuran populasi biasanya tak berpengaruh bila n jauh lebih kecil daripada N.
>
> #### SD Sampel: ddof
>
> `numpy.std` secara bawaan membagi dengan n (`ddof=0`), sedangkan estimator tak bias untuk sampel memakai `ddof=1` (membagi n - 1). Fungsi `getMeanAndStd` pada deck memakai pembagi n; selisihnya kecil untuk n besar.
>
> ```python
> import numpy as np
> s = np.random.default_rng(0).choice(pop, 600, replace=False)
> se = s.std(ddof=1) / np.sqrt(len(s))
> print(s.mean() - 1.96*se, s.mean() + 1.96*se)
> ```
>
> `scipy.stats.sem(s)` menghitung SE yang sama.
>
> #### Margin of Error pada Jajak Pendapat
>
> Untuk proporsi p, SE = sqrt(p (1 - p) / n). Dengan n = 835 dan p = 0,5, SE = 0,0173 sehingga 1,96 SE sekitar plus-minus 3,4 poin persentase. Margin yang dilaporkan jajak pendapat umumnya dihitung dengan cara ini.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Bangkitkan populasi `expovariate(0.5)` dan ukur seberapa sering CI 95% dari satu sampel memuat mean sebenarnya untuk n = 10, 30, 100, 600 (coverage).
> 2. Bandingkan coverage memakai 1,96 vs nilai kritis t pada n kecil.
> 3. Bandingkan SE dengan dan tanpa finite population correction pada populasi 1000 data.
>
> #### Bacaan Lanjutan
>
> - Guttag, *Introduction to Computation and Programming Using Python*, 3rd Ed. — Bab 17.
> - MIT OCW 6.0002, *Lecture 8: Sampling and Standard Error*.
