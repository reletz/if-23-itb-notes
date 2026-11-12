---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5100 Pemrograman untuk Data Analitik]]

> [!cornell] Probability Sampling dan Stratified Sampling
>
> > ## Questions/Cues
> >
> > - Mengapa kita butuh teknik sampling bila sampel tidak dapat dibangkitkan lewat simulasi?
> > - Apa itu **probability sampling** dan **simple random sampling**?
> > - Kapan simple random sampling tidak tepat, dan bagaimana **stratified sampling** mengatasinya?
> > - Apa yang terjadi bila satu sampel 100 data diambil dari dataset suhu 21 kota, dan apa yang terjadi bila diulang 1000 kali?
> > - Berapa confidence interval 95% dari 1000 sampel berukuran 100?
> >
> > ## Reference Points
> >
> > - IF5100 — Sampling and Standard Error (Pages 3-12)
>
> > ### Dari Simulasi ke Sampling Nyata
> >
> > **Inferential statistics** adalah membuat kesimpulan tentang populasi dengan memeriksa satu atau lebih sampel acak darinya. Dengan Monte Carlo kita dapat membangkitkan banyak sampel dan memakainya untuk confidence interval. Tetapi bagaimana bila sampel **tidak dapat dibuat lewat simulasi**? Contoh slide: jajak pendapat Oktober 2016, "Clinton unggul 3,2 poin persentase di swing states, sampel 835 pemilih terdaftar, margin of error plus-minus 4 poin". Di dunia nyata kita hanya punya sampel yang dikumpulkan, sehingga cara memilihnya sangat menentukan.
> >
> > ### Probability Sampling
> >
> > Pada **probability sampling**, setiap anggota populasi memiliki probabilitas **tidak nol** untuk masuk sampel. Bentuk paling sederhana adalah **simple random sampling**: setiap anggota punya **peluang yang sama**.
> >
> > Namun ini tidak selalu tepat. Contoh: "Apakah lulusan ITB itu kutu buku?" Bila kita ambil 100 mahasiswa secara acak, apakah perlu mempertimbangkan pengelompokan menurut fakultas/sekolah, umur, dan sebagainya? Sampel acak sederhana bisa kebetulan terlalu banyak (atau sedikit) mewakili suatu kelompok.
> >
> > ### Stratified Sampling
> >
> > **Stratified sampling**:
> >
> > - **Partisi** populasi menjadi subkelompok (**strata**).
> > - Ambil **simple random sample dari tiap subkelompok**.
> >
> > Berguna ketika ada subkelompok kecil yang harus terwakili **proporsional dengan ukurannya** dalam populasi. Teknik ini juga bisa **mengurangi ukuran sampel** yang dibutuhkan, karena variabilitas di dalam subkelompok lebih kecil daripada variabilitas seluruh populasi. Syaratnya: harus dilakukan dengan hati-hati. Pada materi ini deck memakai simple random sample saja.
> >
> > ### Studi Kasus: Suhu Harian 21 Kota AS
> >
> > Data dari **NCEI** (U.S. National Centers for Environmental Information): suhu harian tertinggi dan terendah di **21 kota AS** (Albuquerque, Baltimore, Boston, ..., Tampa) selama 1961-2015, total **421.848 data point**. Data dianggap sebagai populasi.
> >
> > - Histogram seluruh populasi dibandingkan dengan histogram satu sampel acak berukuran 100.
> > - Populasi: mean **16,3**, standard deviation **9,44**. Sampel: mean **17,1**, standard deviation **10,4**.
> >
> > Apakah kemiripan itu kebetulan atau sesuatu yang bisa diharapkan? Deck mengulangi pengambilan sampel ukuran 100 sebanyak **1000 kali** dan memplot distribusi sample means.
> >
> > ### Mengulang 1000 Kali dan Menghitung Interval
> >
> > Hasil: mean dari sample means = **16,3** (sama dengan mean populasi) dan standard deviation dari sample means = **0,94**. Sesuai [[Central Limit Theorem]], distribusinya mendekati normal, sehingga empirical rule memberi **confidence interval 95%**:
> >
> > - 16,28 plus-minus 1,96 x 0,94, yaitu sekitar **14,5 sampai 18,1**.
> >
> > Interval ini memuat mean populasi, tetapi cukup lebar. Bagaimana mempersempitnya? Dua opsi dicoba:
> >
> > - **Lebih banyak sampel** (1000 menjadi 2000): std hanya berubah dari 0,943 menjadi 0,946, hampir tidak membantu.
> > - **Sampel lebih besar** (ukuran 100 menjadi 200): std turun dari 0,943 menjadi **0,662**.
> >
> > Jadi yang menyempitkan interval adalah **ukuran tiap sampel**, bukan jumlah sampel.
> >
> > ```mermaid
> > graph TD
> >     P["Populasi 421.848 data"] --> R["Simple random sampling"]
> >     P --> S["Stratified sampling<br/>partisi lalu sampel tiap strata"]
> >     R --> T["1000 sampel ukuran 100<br/>std sample means 0,94"]
> >     T --> A["Tambah jumlah sampel<br/>0,943 ke 0,946"]
> >     T --> B["Perbesar ukuran sampel<br/>0,943 ke 0,662"]
> > ```

> [!cornell] #### Summary
>
> Bila sampel tidak bisa disimulasikan, kita bergantung pada **probability sampling**, di mana tiap anggota populasi berpeluang tidak nol; **simple random sampling** memberi peluang sama, sedangkan **stratified sampling** mempartisi populasi lalu mengambil sampel acak per subkelompok sehingga subkelompok kecil terwakili proporsional dan ukuran sampel dapat dikurangi. Pada data suhu 21 kota AS (421.848 data, mean 16,3, std 9,44), 1000 sampel berukuran 100 menghasilkan mean sample means 16,3 dan std 0,94, sehingga CI 95% sekitar 14,5 sampai 18,1. Menambah jumlah sampel (1000 ke 2000) tidak mengubah std, sedangkan memperbesar ukuran sampel (100 ke 200) menurunkannya menjadi 0,662.

> [!ad-libitum]- Additional Information
>
> #### Jenis Sampling Lain dan Bias
>
> | Teknik | Cara kerja | Catatan |
> | --- | --- | --- |
> | Systematic | Ambil setiap anggota ke-k dari daftar terurut | Bisa bias bila daftar punya pola periodik |
> | Cluster | Pilih beberapa klaster utuh, lalu amati semua anggotanya | Murah, tetapi galat biasanya lebih besar |
> | Convenience (non-probability) | Ambil yang mudah dijangkau | Rawan **selection bias**, tidak mendukung inferensi |
>
> Pada stratified sampling proporsional, ukuran sampel strata ke-h adalah n x (N_h / N). Bila strata punya variansi berbeda, **Neyman allocation** mengalokasikan lebih banyak sampel ke strata dengan variansi besar.
>
> #### Pandas untuk Sampling
>
> ```python
> df.sample(n=100, random_state=0)                      # simple random
> df.groupby('city', group_keys=False).apply(
>     lambda g: g.sample(frac=0.01, random_state=0))    # stratified proporsional
> ```
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Muat CSV suhu (`temperatures.csv` bila tersedia), ambil 1000 sampel berukuran 100, dan replikasi mean 16,3 dan std 0,94.
> 2. Bandingkan std sample means dari simple random vs stratified (strata = kota) pada ukuran sampel yang sama.
> 3. Plot std sample means untuk ukuran sampel 50, 100, 200, 400, 800 dan cocokkan dengan kurva 9,44 / sqrt(n).
>
> #### Bacaan Lanjutan
>
> - Guttag, *Introduction to Computation and Programming Using Python*, 3rd Ed. — Bab 17 (Sampling and Standard Error).
> - MIT OCW 6.0002, *Lecture 8: Sampling and Standard Error*.
