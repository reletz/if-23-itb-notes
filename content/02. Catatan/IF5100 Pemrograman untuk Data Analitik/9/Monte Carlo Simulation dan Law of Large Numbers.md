---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5100 Pemrograman untuk Data Analitik]]

> [!cornell] Monte Carlo Simulation dan Law of Large Numbers
>
> > ## Questions/Cues
> >
> > - Bagaimana sejarah **Monte Carlo simulation**, dan apa kaitannya dengan Ulam serta Von Neumann?
> > - Bagaimana Monte Carlo memakai prinsip **inferential statistics** (population vs sample)?
> > - Mengapa keyakinan kita pada estimasi koin berbeda untuk 1, 2, dan 100 lemparan?
> > - Apa isi **Law of Large Numbers**, dan apa yang tidak dijaminnya?
> > - Apa itu **Monte Carlo Fallacy** (gambler's fallacy)?
> >
> > ## Reference Points
> >
> > - IF5100 — Monte Carlo Simulation and Probability Distribution (Pages 1-12)
>
> > ### Sedikit Sejarah
> >
> > **Ulam**, yang sedang memulihkan diri dari sakit, banyak bermain solitaire. Ia mencoba menghitung peluang menang dan gagal. Ia berpikir untuk memainkan banyak permainan dan menghitung kemenangan, tetapi memutuskan itu memakan waktu bertahun-tahun. Ia lalu meminta **Von Neumann** membuat program yang mensimulasikan banyak permainan di **ENIAC**. Dari sinilah lahir metode **Monte Carlo**.
> >
> > ### Monte Carlo Simulation
> >
> > **Monte Carlo simulation** adalah metode untuk **mengestimasi nilai suatu besaran yang tidak diketahui** dengan prinsip **inferential statistics**:
> >
> > - **Population**: himpunan contoh.
> > - **Sample**: **himpunan bagian sejati** dari populasi.
> > - **Fakta kunci**: sampel acak cenderung memiliki **properti yang sama** dengan populasi asalnya.
> >
> > Ini persis yang kita lakukan pada random walk: sejumlah walk acak (sampel) dipakai untuk menyimpulkan perilaku semua walk yang mungkin (populasi).
> >
> > ### Contoh: Estimasi Koin
> >
> > Diberi satu koin, estimasi **fraksi kepala** jika koin dilempar tak hingga kali.
> >
> > - **Satu lemparan** yang menghasilkan kepala: seberapa yakin menjawab 1,0? Hampir tidak yakin sama sekali.
> > - **Dua lemparan** (mis. kepala dua kali): masih ragu apakah lemparan berikut juga kepala.
> > - **100 lemparan** dengan 52 kepala: estimasi terbaik untuk lemparan berikutnya adalah 52/100, tetapi masih perlu hati-hati menyebutnya sebagai probabilitas sebenarnya. Berdasarkan data, itu estimasi terbaik, **namun keyakinannya tidak boleh tinggi**.
> >
> > Keyakinan terhadap estimasi bergantung pada dua hal:
> >
> > - **Ukuran sampel** (100 vs 2).
> > - **Variansi sampel** (semua kepala vs 52 kepala).
> >
> > Makin besar variansi, makin besar sampel yang dibutuhkan untuk tingkat keyakinan yang sama.
> >
> > ### Law of Large Numbers
> >
> > **Law of Large Numbers**: pada pengujian independen berulang dengan probabilitas sebenarnya `p` untuk suatu hasil, peluang bahwa fraksi kemunculan hasil itu **berbeda dari `p`** akan **konvergen ke nol** saat jumlah percobaan menuju tak hingga.
> >
> > Slide mengajukan pertanyaan kritis: apakah ini berarti penyimpangan dari perilaku yang diharapkan akan "dikompensasi" oleh penyimpangan berlawanan di masa depan? Jawabannya **tidak**, dan inilah dasar fallacy berikut.
> >
> > ### Monte Carlo Fallacy (Gambler's Fallacy)
> >
> > **Monte Carlo Fallacy** adalah keyakinan keliru bahwa jika suatu kejadian muncul lebih sering dari biasanya di masa lalu, maka kejadian itu **lebih kecil kemungkinannya** di masa depan (atau sebaliknya), padahal telah terbukti bahwa peluang kejadian itu tidak bergantung pada masa lalu.
> >
> > Contoh koin: setelah 4 kepala berturut-turut, apa yang berikutnya? Kejadian "5 kepala berturut-turut" dan "4 kepala lalu 1 ekor" **sama-sama mungkin**, masing-masing 1/32. Lemparan berikutnya tetap 50-50. Contoh paling terkenal terjadi di **Kasino Monte Carlo** tahun 1913. Grafik pada deck menunjukkan bahwa proporsi merah/biru mendekati 50-50 seiring waktu, tetapi **selisih absolutnya tidak menurun secara sistematis menuju nol**.
> >
> > Jadi LLN menjamin **rata-rata/proporsi** konvergen karena kejadian lama "diencerkan" oleh kejadian baru, bukan karena ada "koreksi" atas kejadian lama.
> >
> > ### Mengambil Sampel dari Ruang Hasil
> >
> > Sampling tidak pernah dapat menjamin akurasi sempurna, namun itu tidak berarti estimasi pasti salah. Pertanyaan kuncinya: **berapa banyak sampel** yang perlu dilihat agar keyakinan kita dapat dibenarkan? Jawabannya bergantung pada **variabilitas distribusi** yang mendasarinya.
> >
> > ```mermaid
> > graph TD
> >     P["Population"] --> S["Random sample"]
> >     S --> E["Estimasi besaran tak diketahui"]
> >     E --> K{"Seberapa yakin?"}
> >     K --> N["Ukuran sampel"]
> >     K --> V["Variansi sampel"]
> >     N --> L["Law of Large Numbers<br/>makin besar, makin dekat"]
> >     V --> M["Variansi besar, butuh<br/>sampel lebih banyak"]
> > ```

> [!cornell] #### Summary
>
> **Monte Carlo simulation** lahir dari ide Ulam (dengan Von Neumann dan ENIAC) untuk mengestimasi peluang menang solitaire lewat banyak simulasi, dan bertumpu pada **inferential statistics**: sampel acak cenderung memiliki properti populasinya. Keyakinan pada estimasi (mis. fraksi kepala koin) bergantung pada **ukuran** dan **variansi** sampel. **Law of Large Numbers** menjamin proporsi konvergen ke `p` saat percobaan bertambah, tetapi tidak berarti penyimpangan lalu akan "dikompensasi"; anggapan itu adalah **Monte Carlo (gambler's) Fallacy**, karena lemparan independen (mis. 5 kepala berturut-turut dan 4 kepala lalu ekor sama-sama 1/32). Banyaknya sampel yang dibutuhkan ditentukan oleh variabilitas distribusi.

> [!ad-libitum]- Additional Information
>
> #### Monte Carlo Klasik: Estimasi Pi
>
> Contoh klasik (tidak ada di deck): tebar titik acak `(x, y)` seragam di persegi `[0,1]×[0,1]`, hitung fraksi yang jatuh dalam seperempat lingkaran (`x²+y² ≤ 1`). Fraksinya mendekati `π/4`, jadi `π ≈ 4 × fraksi`. Galatnya turun sebagai `1/sqrt(n)`, sehingga untuk satu digit tambahan akurasi diperlukan 100 kali lebih banyak sampel.
>
> ```python
> import random
> def estPi(n):
>     inside = sum(random.random()**2 + random.random()**2 <= 1 for _ in range(n))
>     return 4 * inside / n
> ```
>
> #### Weak vs Strong LLN dan Central Limit Theorem
>
> LLN lemah menyatakan konvergensi dalam probabilitas, LLN kuat konvergensi hampir pasti. Terpisah dari itu, **Central Limit Theorem** menyatakan bahwa rata-rata sampel berukuran `n` berdistribusi mendekati normal dengan simpangan baku `σ/sqrt(n)`. Inilah dasar memakai interval kepercayaan pada Monte Carlo (dibahas di catatan berikutnya).
>
> #### Fakta tentang Gambler's Fallacy
>
> Kasus Monte Carlo 1913 adalah rolet yang jatuh ke hitam 26 kali beruntun; para penjudi bertaruh besar pada merah dengan keyakinan "sudah waktunya", dan banyak yang kalah. Fallacy ini berlaku untuk percobaan independen; pada proses dengan memori (mis. mengambil kartu tanpa pengembalian) peluang memang berubah.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Simulasikan 10.000 lemparan koin, plot fraksi kepala kumulatif dan selisih absolut `|#kepala - #ekor|` pada skala sama untuk melihat bahwa fraksi menyempit sedangkan selisih absolut tidak.
> 2. Implementasikan `estPi(n)` untuk `n = 10^2 ... 10^7` dan plot galat vs `n` pada skala log-log (kemiringan sekitar -0,5).
> 3. Simulasikan "setelah 4 kepala berturut-turut" dengan mengumpulkan semua kemunculan pola itu dan hitung fraksi kepala pada lemparan ke-5.
> 4. Estimasi peluang menang solitaire sederhana (mis. permainan kartu yang kamu definisikan sendiri) sebagai latihan ide Ulam.
>
> #### Bacaan Lanjutan
>
> - Guttag, *Introduction to Computation and Programming Using Python*, 3rd Ed. — bab 15 dan 16 (sesuai rujukan deck).
> - MIT OCW 6.0002 (Fall 2016), *Lecture 6: Monte Carlo Simulation*.
> - Metropolis dan Ulam, "The Monte Carlo Method", *Journal of the American Statistical Association*, 1949.
