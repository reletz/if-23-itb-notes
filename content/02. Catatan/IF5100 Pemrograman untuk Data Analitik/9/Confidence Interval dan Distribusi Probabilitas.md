---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5100 Pemrograman untuk Data Analitik]]

> [!cornell] Confidence Interval dan Distribusi Probabilitas
>
> > ## Questions/Cues
> >
> > - Bagaimana variasi data diukur dengan **standard deviation**, dan mengapa harus dibandingkan dengan mean?
> > - Apa itu **confidence interval**, dan apa isi **Empirical Rule** (68-95-99,7)?
> > - Asumsi apa yang diperlukan agar Empirical Rule berlaku?
> > - Apa beda variabel acak **diskrit** dan **kontinu**, dan apa fungsi **PDF**?
> > - Distribusi apa saja yang disebut (normal, uniform, gamma, Poisson) dan kapan dipakai?
> >
> > ## Reference Points
> >
> > - IF5100 — Monte Carlo Simulation and Probability Distribution (Pages 13-21)
>
> > ### Mengukur Variasi Data
> >
> > **Standard deviation** adalah akar kuadrat dari **variansi**. Dua hal yang perlu diingat: **outlier** dapat berpengaruh besar, dan standard deviation sebaiknya selalu dipertimbangkan **relatif terhadap mean**. Misalnya simpangan baku 10 berarti sangat kecil bila mean 10.000, tetapi besar bila mean 20.
> >
> > ```python
> > def getMeanAndStd(X):
> >     mean = sum(X)/float(len(X))
> >     tot = 0.0
> >     for x in X:
> >         tot += (x - mean)**2
> >     std = (tot/len(X))**0.5
> >     return mean, std
> > ```
> >
> > Perhatikan bahwa rumus ini membagi dengan `len(X)` (standar deviasi populasi), bukan `len(X)-1`.
> >
> > ### Confidence Level dan Interval
> >
> > Alih-alih mengestimasi parameter tak diketahui dengan **satu nilai** (mis. mean sejumlah trial), **confidence interval** memberi **rentang** yang kemungkinan memuat nilai sebenarnya, plus **tingkat keyakinan** bahwa nilai itu berada di rentang tersebut.
> >
> > **Empirical Rule** (dengan asumsi tertentu) untuk data:
> >
> > - sekitar **68%** berada dalam 1 simpangan baku dari mean,
> > - sekitar **95%** dalam **1,96** simpangan baku,
> > - sekitar **99,7%** dalam 3 simpangan baku.
> >
> > Versi lain pada slide berikutnya (**aturan 68-95-99,7**): 68,27% dalam 1 simpangan baku, 95,45% dalam 2, dan 99,73% dalam 3. Perhatikan 95% tepat berada di 1,96, sedangkan 95,45% tepat di 2.
> >
> > **Asumsi**: **galat estimasi mean adalah nol** (tidak bias) dan **distribusinya normal**. Bila asumsi gagal, persentase tersebut tidak berlaku.
> >
> > ### Distribusi Probabilitas
> >
> > **Probability distribution** menangkap gagasan **frekuensi relatif** dengan mana variabel acak mengambil nilai tertentu.
> >
> > - **Variabel acak diskrit**: nilai dari himpunan **hingga**; cukup daftarkan probabilitas tiap nilai, total harus **1**.
> > - **Variabel acak kontinu**: nilai dari bilangan **real** di antara dua angka (himpunan tak hingga); tidak bisa mendaftar probabilitas tiap nilai.
> >
> > Untuk kasus kontinu dipakai **probability density function (PDF)**: sebuah kurva di mana sumbu x berada di antara nilai minimum dan maksimum variabel, dan **luas di bawah kurva** antara dua titik adalah **probabilitas** contoh jatuh dalam rentang itu.
> >
> > ### Distribusi yang Dikenal
> >
> > - **Normal (Gaussian)**: kurva lonceng, simetris di sekitar mean; dasar Empirical Rule.
> > - **Uniform**: `f(x) = 1/(b - a)` untuk `a ≤ x ≤ b`. Slide bertanya distribusi apa yang kita dapat dari library `random` Python; jawabannya `random.random()` dan `random.choice` menghasilkan distribusi **uniform**.
> > - **Gamma**: distribusi kontinu bernilai positif untuk waktu tunggu dan variabel positif miring ke kanan.
> > - **Poisson**: probabilitas jumlah kejadian `k` dalam interval waktu atau ruang tetap bila kejadian terjadi dengan **laju rata-rata konstan** `λ` dan **independen** dari waktu sejak kejadian terakhir. Contoh: panggilan telepon masuk ke sistem, foton yang tiba di teleskop, pelanggan yang tiba di loket atau call center, dan jumlah gol dalam pertandingan olahraga dua tim.
> >
> > ```mermaid
> > graph TD
> >     R["Variabel acak"] --> D["Diskrit<br/>daftar probabilitas, total 1"]
> >     R --> C["Kontinu<br/>PDF, luas = probabilitas"]
> >     C --> N["Normal"]
> >     C --> U["Uniform"]
> >     C --> G["Gamma"]
> >     D --> P["Poisson<br/>kejadian per interval"]
> > ```

> [!cornell] #### Summary
>
> **Standard deviation** mengukur penyebaran data dan harus dibaca relatif terhadap mean (outlier berpengaruh besar). **Confidence interval** memberi rentang dan tingkat keyakinan, bukan satu angka; menurut **Empirical Rule**, sekitar 68% data dalam 1 simpangan baku, 95% dalam 1,96 (atau 95,45% dalam 2), dan 99,7% dalam 3, dengan asumsi galat mean nol dan distribusi normal. **Distribusi probabilitas** memodelkan keacakan: diskrit (daftar probabilitas, total 1) dan kontinu (PDF, luas di bawah kurva adalah probabilitas); contohnya normal, uniform (`f(x) = 1/(b-a)`, yang dihasilkan library `random`), gamma, dan Poisson untuk jumlah kejadian per interval dengan laju rata-rata tetap.

> [!ad-libitum]- Additional Information
>
> #### Dari Empirical Rule ke Confidence Interval Monte Carlo
>
> Bila `n` hasil trial independen punya mean `m` dan simpangan baku `s`, galat baku mean adalah `s/sqrt(n)`. Interval kepercayaan 95% kira-kira `m ± 1,96 · s/sqrt(n)`. Misalnya, estimasi `π` dengan `n = 10.000` titik: `p̂ ≈ 0,785`, galat baku `sqrt(p̂(1-p̂)/n) ≈ 0,0041`, jadi interval `π/4` sekitar ±0,008, atau `π` dalam ±0,032. Agar interval menyempit setengahnya, butuh 4 kali lebih banyak sampel.
>
> #### Library Python
>
> `random.gauss(mu, sigma)`, `random.uniform(a, b)`, `random.gammavariate(alpha, beta)`; NumPy: `rng.normal`, `rng.uniform`, `rng.gamma`, `rng.poisson(lam, size)`. SciPy menyediakan `scipy.stats.norm.pdf/cdf`, `poisson.pmf` untuk perhitungan eksak. Rumus Poisson: `P(k) = λ^k e^{-λ} / k!`, dengan mean dan variansi sama dengan `λ`.
>
> #### Std Populasi vs Sampel
>
> `getMeanAndStd` membagi dengan `N`. Untuk menaksir simpangan baku populasi dari sampel kecil, gunakan `N-1` (koreksi Bessel): `statistics.stdev` memakai `N-1` sedangkan `statistics.pstdev` dan `numpy.std` (default) memakai `N`.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Bangkitkan 100.000 sampel dari `random.gauss(0, 1)` dan verifikasi persentase dalam 1, 1,96, 2, 3 simpangan baku terhadap angka pada slide.
> 2. Ulangi untuk distribusi uniform dan gamma; amati bahwa Empirical Rule **tidak** berlaku persis.
> 3. Simulasikan kedatangan pelanggan Poisson (`λ = 4` per menit) dan bandingkan histogram dengan `P(k)` teoretis.
> 4. Bangun interval kepercayaan 95% untuk estimasi `π` dari `n = 1000` titik dan periksa seberapa sering ia memuat `π` dalam 1.000 pengulangan (coverage).
>
> #### Bacaan Lanjutan
>
> - Guttag, *Introduction to Computation and Programming Using Python*, 3rd Ed. — bab 15 dan 16 (sesuai rujukan deck).
> - MIT OCW 6.0002 (Fall 2016), *Lecture 6: Monte Carlo Simulation* dan *Lecture 7: Confidence Intervals*.
> - Wikipedia: *List of probability distributions*; *Poisson distribution*; *Normal distribution*.
