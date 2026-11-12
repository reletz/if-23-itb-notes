---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5100 Pemrograman untuk Data Analitik]]

> [!cornell] Distribusi Normal dan Empirical Rule
>
> > ## Questions/Cues
> >
> > - Apa isi **empirical rule** (aturan 68-95-99.7), dan asumsi apa yang melandasinya?
> > - Bagaimana membangkitkan data berdistribusi normal dan memeriksa fraksi data di sekitar mean dengan `random.gauss`?
> > - Apa itu **probability density function** (PDF), dan mengapa nilai pada sumbu y bukan probabilitas?
> > - Bagaimana `scipy.integrate.quad` dipakai untuk memverifikasi empirical rule?
> > - Mengapa distribusi normal begitu populer?
> >
> > ## Reference Points
> >
> > - IF5100 — Confidence Interval (Pages 3-12)
>
> > ### Recap Empirical Rule
> >
> > **Empirical rule** (aturan **68-95-99.7**) menyatakan bahwa pada data yang berdistribusi normal:
> >
> > - sekitar **68%** data berada dalam 1 **standard deviation** dari mean,
> > - sekitar **95%** data berada dalam **1,96** standard deviation dari mean,
> > - sekitar **99,7%** data berada dalam 3 standard deviation dari mean.
> >
> > Aturan ini berlaku dengan dua asumsi: **galat estimasi mean adalah nol** dan **distribusinya normal**. Catatan: nilai 95,45% yang tertera di slide recap sebenarnya milik batas **2** standard deviation; untuk batas **1,96** nilai tepatnya 95,00%, dan inilah yang dibuktikan oleh output slide 11.
> >
> > ### Membangkitkan Data Normal Secara Empiris
> >
> > Deck membangkitkan satu juta sampel dengan `random.gauss(0, 100)`, lalu menggambar **histogram** 100 bin dengan bobot `1/numSamples` sehingga sumbu y menjadi **relative frequency**. Dengan menjumlahkan bin ke-30 sampai ke-69 (kira-kira jarak 200 dari mean, atau 2 sigma) diperoleh fraksi sekitar **0,957**.
> >
> > ```python
> > dist, numSamples = [], 1000000
> > for i in range(numSamples):
> >     dist.append(random.gauss(0, 100))
> > v = pylab.hist(dist, bins=100, weights=[1/numSamples]*len(dist))
> > print('Fraction within ~200 of mean =', sum(v[0][30:70]))
> > ```
> >
> > Histogram ini adalah **aproksimasi diskret** terhadap PDF distribusi normal (Gaussian).
> >
> > ### Probability Density Function (PDF)
> >
> > Distribusi didefinisikan oleh **PDF**, yaitu kurva yang menggambarkan probabilitas variabel acak berada di antara dua nilai. Pertanyaan kunci: apakah nilai pada sumbu y adalah probabilitas? **Bukan.** Itu adalah **density**, yaitu turunan dari **cumulative distribution function**. Karena itu kita memakai **integrasi** untuk menafsirkan PDF:
> >
> > - Probabilitas variabel jatuh dalam suatu rentang = **luas di bawah kurva** (integral PDF) pada rentang tersebut.
> > - PDF **tidak pernah negatif**, dan luas total di bawah seluruh kurva sama dengan **1**.
> > - Probabilitas satu nilai tunggal pada variabel kontinu adalah nol; yang bermakna hanya probabilitas pada rentang.
> >
> > Fungsi Gaussian yang diimplementasikan di slide:
> >
> > ```python
> > def gaussian(x, mu, sigma):
> >     factor1 = (1.0 / (sigma*((2*pylab.pi)**0.5)))
> >     factor2 = pylab.e ** -(((x-mu)**2)/(2*sigma**2))
> >     return factor1 * factor2
> > ```
> >
> > ### Memeriksa Empirical Rule dengan Integrasi
> >
> > Alih-alih menghitung dari sampel, fungsi `checkEmpirical` memilih `mu` dan `sigma` acak lalu menghitung luas di bawah kurva Gaussian untuk 1, 1,96, dan 3 standard deviation memakai `scipy.integrate.quad`. Hasilnya **sama untuk semua pasangan mu dan sigma**: 0,6827; 0,95; dan 0,9973. Artinya fraksi data dalam k standard deviation hanya bergantung pada k, bukan pada skala atau lokasi distribusi.
> >
> > ```mermaid
> > graph TD
> >     N["Distribusi normal<br/>mu, sigma"] --> A["1 sigma<br/>0,6827"]
> >     N --> B["1,96 sigma<br/>0,95"]
> >     N --> C["3 sigma<br/>0,9973"]
> >     N --> P["PDF: luas = probabilitas"]
> >     P --> I["scipy.integrate.quad"]
> > ```
> >
> > ### Mengapa Semua Orang Menyukai Distribusi Normal
> >
> > Distribusi normal **sering muncul** di dunia nyata (contoh di slide: skor SAT, tinggi badan populasi) dan memiliki **sifat matematis yang baik**. Namun tidak semua distribusi normal, dan itu mengarah ke topik berikutnya: mengapa empirical rule tetap berguna untuk data non-normal (lihat [[Central Limit Theorem]]).

> [!cornell] #### Summary
>
> **Empirical rule** menyatakan bahwa pada data normal sekitar 68% data berada dalam 1 sigma, 95% dalam 1,96 sigma, dan 99,7% dalam 3 sigma dari mean, dengan asumsi galat mean nol dan distribusi normal. Simulasi 1 juta sampel `random.gauss` memberi fraksi sekitar 0,957 dalam kira-kira 2 sigma. **PDF** mendefinisikan distribusi kontinu: nilai y adalah density, probabilitas rentang adalah luas di bawah kurva (integral), PDF tak negatif, dan luas totalnya 1. Dengan `scipy.integrate.quad` pada fungsi `gaussian`, fraksi 0,6827/0,95/0,9973 terbukti sama untuk sembarang mu dan sigma.

> [!ad-libitum]- Additional Information
>
> #### Nilai Eksak di Balik Aturan
>
> Fraksi data dalam k sigma pada distribusi normal adalah erf(k / sqrt(2)). Dengan begitu 1 sigma = 0,6827; 1,96 sigma = 0,9500; 2 sigma = 0,9545; 3 sigma = 0,9973. Angka 1,96 adalah **z-score** kritis untuk tingkat kepercayaan 95% dua sisi, itulah mengapa ia dipakai pada confidence interval. Bisa dicek cepat dengan `scipy.stats.norm.cdf(1.96) - scipy.stats.norm.cdf(-1.96)`.
>
> #### Density vs Probabilitas
>
> Pada N(0, 1), puncak PDF bernilai sekitar 0,399 (1 / sqrt(2 pi)), dan pada N(0, 0,1) puncaknya sekitar 3,99 - lebih dari 1. Itu sah karena yang harus bernilai 1 adalah luasnya, bukan tingginya. Ini alasan mengapa histogram dengan bobot `1/numSamples` menghasilkan relative frequency per bin, bukan density; untuk density gunakan `density=True` pada histogram.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Ulangi `checkEmpirical` dengan `scipy.stats.norm.cdf` dan bandingkan hasilnya dengan `quad`.
> 2. Bangkitkan data dari `random.expovariate` lalu hitung fraksi data dalam 1, 2, 3 sigma dari mean; bandingkan dengan 68/95/99.7 dan jelaskan selisihnya.
> 3. Gambar PDF Gaussian untuk beberapa sigma dalam satu plot dan amati bagaimana tinggi puncaknya berubah.
>
> #### Bacaan Lanjutan
>
> - Guttag, *Introduction to Computation and Programming Using Python*, 3rd Ed. — Bab 16 (Monte Carlo Simulation), bagian tentang distribusi normal dan empirical rule.
> - MIT OCW 6.0002, *Lecture 7: Confidence Intervals*.
