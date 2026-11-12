---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5100 Pemrograman untuk Data Analitik]]

> [!cornell] Random Walk - Sanity Check dan Biased Walker
>
> > ## Questions/Cues
> >
> > - Mengapa hasil pertama `walkTest` tampak tidak masuk akal?
> > - Apa itu **sanity check**, dan bagaimana uji 0, 1, 2 langkah membongkar bug?
> > - Bagaimana pola jarak `UsualWalker` setelah bug diperbaiki, dan apa artinya "jauh lebih pendek dari jumlah langkah"?
> > - Mengapa `NorthernWalker` menjauh jauh lebih cepat?
> > - Pelajaran proses apa yang ditarik dari seluruh pembahasan random walk?
> >
> > ## Reference Points
> >
> > - IF5100 — Stochastic Thinking and Random Walk (Pages 43-52)
>
> > ### Hasil Pertama yang Mencurigakan
> >
> > Menjalankan `walkTest((10, 100, 1000, 10000), 100, UsualWalker)` memberi mean sekitar 9,0 (10 langkah), 9,0 (100), 8,7 (1000), dan 8,0 (10000). Jarak rata-rata **tidak bertambah** padahal langkahnya makin banyak, bahkan 10 langkah memberi maksimum 23,0 yang mustahil (maksimum teoretis hanya 10). Slide bertanya: apakah masuk akal, dan apa yang salah?
> >
> > ### Sanity Check
> >
> > Kita tidak pernah tahu pasti apakah simulasi benar-benar mewakili dunia nyata. Karena itu: **uji pada kasus yang kita yakini hasilnya**. Ini langkah pencegahan yang sangat penting.
> >
> > Uji dengan 0, 1, dan 2 langkah memberi mean 8,8, 8,9, 8,6 dengan max 21,6, 26,9, 20,6. Hasil ini **mustahil**: 0 langkah harus 0,0; 1 langkah harus tepat 1,0; 2 langkah maksimal 2,0. Pasti ada bug, dan sumbernya adalah baris
> >
> > ```python
> > distances.append(round(walk(f, walker, numTrials), 1))
> > ```
> >
> > yang memakai `numTrials` (100) sebagai jumlah langkah, bukan `numSteps`. Jadi semua walk selalu 100 langkah.
> >
> > Setelah diperbaiki (`numSteps`), uji ulang memberi: 0 langkah mean 0,0; 1 langkah mean 1,0 (max dan min 1,0); 2 langkah mean 1,228, max 2,0, min 0,0. Ini cocok dengan perhitungan tangan: setelah dua langkah, kemungkinan jaraknya 0 (kembali), 2 (lurus), atau `sqrt(2) ≈ 1,414` (belok).
> >
> > ```mermaid
> > graph TD
> >     A["Jalankan simulasi"] --> B["Hasil terlihat aneh?"]
> >     B --> C["Uji kasus mudah<br/>0, 1, 2 langkah"]
> >     C --> D{"Sesuai perhitungan<br/>tangan?"}
> >     D -- "Tidak" --> E["Cari bug<br/>(numTrials vs numSteps)"]
> >     E --> A
> >     D -- "Ya" --> F["Percayai hasil<br/>untuk kasus besar"]
> > ```
> >
> > ### UsualWalker Setelah Perbaikan
> >
> > Hasil `walkTest((10, 100, 1000, 10000), 100, UsualWalker)` yang benar pada deck:
> >
> > | Langkah | Mean | Max | Min |
> > | --- | --- | --- | --- |
> > | 10 | 2,89 | 6,3 | 0,0 |
> > | 100 | 9,156 | 26,6 | 1,4 |
> > | 1000 | 29,157 | 82,0 | 3,2 |
> > | 10000 | 84,736 | 204,8 | 10,0 |
> >
> > Jarak tumbuh, tetapi **jauh lebih lambat** dari jumlah langkah. Maksimum 204,8 pada 10.000 langkah sangat pendek dibanding 10.000. Pola ini sesuai intuisi bahwa langkah acak saling membatalkan; setiap kali langkah naik 100 kali lipat, jarak hanya naik sekitar 10 kali (skala `sqrt(n)`).
> >
> > ### NorthernWalker
> >
> > Dengan walker yang cenderung ke utara:
> >
> > | Langkah | Mean | Max | Min |
> > | --- | --- | --- | --- |
> > | 10 | 2,846 | 6,7 | 0,4 |
> > | 100 | 9,147 | 23,8 | 1,0 |
> > | 1000 | 56,047 | 102,4 | 8,1 |
> > | 10000 | 514,005 | 645,9 | 293,1 |
> >
> > Untuk walk pendek, kedua jenis walker hampir sama, tetapi untuk 10.000 langkah mean-nya sekitar **514 versus 85**. Penyebabnya adalah **bias (drift)**: rata-rata perubahan `y` per langkah adalah `(1,1 - 0,9)/4 = 0,05`, sehingga setelah 10.000 langkah ada pergeseran sistematis sekitar 500 ke utara. Bias kecil yang konsisten akhirnya mengalahkan keacakan, dan jarak tumbuh **linear** terhadap jumlah langkah, bukan akar kuadrat.
> >
> > ### Visualisasi dan Pelajaran Proses
> >
> > Dengan mensimulasikan banyak panjang walk untuk tiap jenis walker lalu memplot jarak akhir, tampak dua kurva: **Distance Trend** (jarak vs langkah, `UsualWalker` melandai, `NorthernWalker` naik hampir linear) dan **Ending Locations** (sebaran titik akhir; `UsualWalker` berpusat di sekitar origin, `NorthernWalker` bergeser ke sumbu y positif). Visualisasi dibahas lebih jauh pada materi berikutnya.
> >
> > Ringkasan proses dari deck: yang penting bukan simulasinya, melainkan **cara membangunnya**: mulai dengan mendefinisikan class, bangun fungsi untuk satu trial, banyak trial, dan pelaporan; lakukan **perubahan inkremental** (versi sederhana dulu, **sanity check**, lalu elaborasi satu langkah demi satu); dan gunakan **plot** untuk memperoleh insight.

> [!cornell] #### Summary
>
> Hasil awal `walkTest` tidak masuk akal (mean sekitar 9 untuk semua panjang; 10 langkah dengan max 23) sehingga dilakukan **sanity check** pada 0, 1, dan 2 langkah, yang membuktikan adanya bug: `walk(f, walker, numTrials)` seharusnya `numSteps`. Setelah diperbaiki, jarak `UsualWalker` tumbuh lambat (10.000 langkah hanya sekitar 85 mean, 204,8 max) sesuai skala `sqrt(n)`, sedangkan `NorthernWalker` yang punya drift 0,05 per langkah mencapai mean sekitar 514 dan tumbuh linear. Pelajaran prosesnya: bangun versi sederhana dulu, sanity check, elaborasi bertahap, dan pakai plot untuk insight.

> [!ad-libitum]- Additional Information
>
> #### Pola Pengujian Simulasi
>
> Selain sanity check kasus kecil, praktik baik lain: (1) **unit test** untuk komponen deterministik (`Location.distFrom`, `move`); (2) **property check**, mis. jarak tidak boleh melebihi jumlah langkah; (3) **seeding** agar bug acak dapat direproduksi; (4) membandingkan dengan hasil analitik (`E[d²] = n`). Bug `numTrials` vs `numSteps` akan tertangkap oleh assertion sederhana `assert dist <= numSteps`.
>
> #### Drift vs Difusi
>
> Pada walk bias, posisi rata-rata bergerak `n·μ` (drift) sementara fluktuasinya tumbuh `sqrt(n)`. Untuk `NorthernWalker`, `μ_y = 0,05`; pada `n = 10.000` drift = 500 sementara fluktuasi sekitar 100, sehingga drift mendominasi. Pada `n` kecil (10-100) fluktuasi mendominasi dan kedua walker tampak mirip, sebagaimana tabel di atas.
>
> #### Peringatan Terkait Perbandingan Hasil
>
> Setiap run memakai angka acak, jadi nilai mean dapat berbeda sedikit dari tabel deck. Yang penting adalah **orde besar dan tren**, bukan digit spesifik.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Perbaiki bug lalu tambahkan `assert` bahwa tiap jarak `<= numSteps`.
> 2. Plot `mean distance` vs `numSteps` pada skala log-log untuk `UsualWalker` dan periksa kemiringan sekitar 0,5; ulangi untuk `NorthernWalker` (kemiringan mendekati 1 pada `n` besar).
> 3. Variasikan bias (`1.1/-0.9` menjadi `1.5/-0.5`) dan lihat dampaknya pada drift.
> 4. Buat scatter plot titik akhir 500 walk untuk kedua walker dengan `matplotlib`.
>
> #### Bacaan Lanjutan
>
> - Guttag, *Introduction to Computation and Programming Using Python*, 3rd Ed. — bab random walk, bagian "Biased Random Walks".
> - MIT OCW 6.0002 (Fall 2016), *Lecture 5: Random Walks*.
