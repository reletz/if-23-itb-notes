---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Free Energy, Stability, and Spontaneity
>
> > ## Questions/Cues
> >
> > - Apa itu **energi bebas Gibbs (ΔG)** dan bagaimana ia dihitung dari keadaan awal dan akhir?
> > - Apa beda reaksi **eksergonik** dan **endergonik**?
> > - Bagaimana **ΔG** berhubungan dengan **stabilitas**, **kesetimbangan**, dan kapasitas kerja?
> > - Apa itu **energy coupling** dan peran **ATP** di dalamnya?
> > - Bagaimana **ΔG** dapat dipandang sebagai **objective/cost function** dalam optimasi?
> >
> > ## Reference Points
> >
> > - IF3211 — Metabolism (PPT 6, bagian Free-Energy Change and Equilibrium)
> > - IF3211 — Metabolism (PPT 6, bagian Stability dan Spontaneous Change)
>
> > ### Energi Bebas dan Perubahannya (ΔG)
> >
> > **Free energy (energi bebas)** adalah porsi energi sebuah sistem yang *dapat melakukan kerja* ketika suhu dan tekanan seragam di seluruh sistem — kondisi yang berlaku di dalam sel hidup. **Perubahan energi bebas** selama reaksi kimia, $\Delta G$, didefinisikan sebagai selisih antara energi bebas keadaan akhir dan keadaan awal:
> >
> > $$\Delta G = G_{\text{final state}} - G_{\text{initial state}}$$
> >
> > Aturan kuncinya tegas: **hanya reaksi dengan ΔG negatif yang spontan**. Reaksi spontan ini dapat *dipanen* untuk melakukan kerja seluler. Sebaliknya, ΔG positif berarti reaksi tidak akan berjalan sendiri dan butuh pasokan energi.
> >
> > ### Eksergonik vs Endergonik
> >
> > Berdasarkan tanda ΔG, reaksi dibagi dua:
> >
> > - **Reaksi eksergonik (exergonic)** — $\Delta G < 0$; energi bebas *dilepaskan*, reaksi spontan, dan dapat melakukan kerja. Contoh: respirasi seluler memecah glukosa.
> > - **Reaksi endergonik (endergonic)** — $\Delta G > 0$; energi bebas *diserap*, reaksi nonspontan, dan menuntut input energi. Contoh: sintesis molekul kompleks.
> >
> > Besar $|\Delta G|$ menunjukkan "berapa banyak" kerja maksimum yang dapat dilakukan (eksergonik) atau dibutuhkan (endergonik).
> >
> > ### Stabilitas, Kesetimbangan, dan Spontanitas
> >
> > Energi bebas adalah **ukuran ketidakstabilan sistem** — kecenderungannya berubah menuju keadaan yang lebih stabil. Selama perubahan spontan, **energi bebas menurun dan stabilitas sistem meningkat**. Sistem tidak stabil (G tinggi) cenderung berubah hingga menjadi lebih stabil (G rendah) — bayangkan bola di puncak bukit yang menggelinding ke lembah.
> >
> > Pada **chemical equilibrium (kesetimbangan kimia)**, laju reaksi maju dan reaksi balik sama; ini adalah keadaan **stabilitas maksimum** dengan $\Delta G = 0$. Konsekuensi penting: **sebuah proses bersifat spontan dan dapat melakukan kerja hanya ketika ia sedang bergerak menuju kesetimbangan**. Di titik kesetimbangan, tidak ada lagi kerja bersih yang bisa diekstraksi — seperti baterai yang habis. Sel hidup justru *tidak pernah* mencapai kesetimbangan; ia menjaga jarak dari kesetimbangan dengan terus mengalirkan reaktan dan produk.
> >
> > ### Energy Coupling dan ATP
> >
> > **Energy coupling** adalah strategi sel untuk menjalankan reaksi endergonik (ΔG > 0) dengan *menggandengkannya* pada reaksi eksergonik (ΔG < 0) yang lebih besar, sehingga **ΔG total negatif**. Mata uang energi universal sel adalah **ATP (adenosine triphosphate)**. Hidrolisis ATP menjadi ADP + Pi bersifat sangat eksergonik; energi yang dilepas dipakai untuk "mendorong" reaksi anabolik, transport aktif, dan kerja mekanis. Selama ΔG gabungan tetap negatif, kombinasi reaksi tetap spontan dan dapat berjalan.
> >
> > ### Sudut Pandang Komputasi: ΔG sebagai Objective/Cost Function
> >
> > Bagi mahasiswa informatika, **ΔG sangat mirip dengan fungsi objektif (cost/loss) dalam optimasi**. Reaksi spontan = pergerakan ke arah *menurunkan* G, persis seperti **gradient descent** yang menuruni permukaan loss menuju minimum. **Kesetimbangan kimia** (ΔG = 0) analog dengan **titik konvergensi / minimum lokal** di mana gradien nol dan tidak ada lagi "kerja optimasi" yang bisa dilakukan.
> >
> > Lebih jauh: $\Delta G = \Delta H - T\Delta S$ menyerupai bentuk **regularized objective** — suku entalpi $\Delta H$ seperti term data-fit, dan suku $-T\Delta S$ seperti term regularisasi/entropi yang skalanya dikontrol "temperatur" $T$. Ini bukan kebetulan: algoritma **simulated annealing** meminjam langsung metafora ini, menggunakan distribusi Boltzmann $P \propto e^{-\Delta E / kT}$ dan menurunkan "temperatur" untuk lolos dari minimum lokal. **Energy coupling** pun punya padanan: untuk menjalankan langkah "mahal" (endergonik), gabungkan dengan langkah "murah" yang sangat menguntungkan sehingga total *biaya* tetap turun.
> >
> > ```mermaid
> > flowchart LR
> >     A["Keadaan awal<br/>G tinggi (tidak stabil)"] -->|"ΔG &lt; 0<br/>eksergonik / spontan"| B["Keadaan akhir<br/>G rendah (stabil)"]
> >     B -->|"butuh energi<br/>ΔG &gt; 0 (endergonik)"| A
> >     B --> EQ["Kesetimbangan: ΔG = 0<br/>stabilitas maksimum, kerja = 0"]
> > ```

> [!cornell] #### Summary
>
> **Energi bebas Gibbs (G)** adalah bagian energi sistem yang dapat melakukan kerja, dan **ΔG = G_akhir − G_awal** menentukan arah reaksi: hanya reaksi **ΔG negatif (eksergonik)** yang **spontan** dan dapat dipanen untuk kerja, sedangkan reaksi **ΔG positif (endergonik)** menuntut input energi. ΔG adalah ukuran **ketidakstabilan** — perubahan spontan menurunkan G dan menaikkan stabilitas hingga mencapai **kesetimbangan kimia (ΔG = 0)**, titik stabilitas maksimum tanpa kerja bersih. Sel menjalankan reaksi endergonik melalui **energy coupling** dengan hidrolisis **ATP** sehingga ΔG total tetap negatif. Secara komputasi, ΔG berperan seperti **objective/cost function** yang diminimalkan, paralel dengan [[Energy Forms and the Laws of Thermodynamics]] dan menyiapkan konsep [[Activation Energy and Enzyme Catalysis]].

> [!ad-libitum]- Additional Information
>
> #### Deeper Dive: ΔG vs ΔG°′ dan Kondisi Seluler
>
> Nilai ΔG yang menentukan spontanitas adalah ΔG *aktual*, bukan ΔG°′ (standar, pada konsentrasi 1 M, pH 7). Hubungannya: $\Delta G = \Delta G°' + RT \ln Q$, dengan $Q$ rasio reaksi (produk/reaktan). Karena sel menjaga konsentrasi jauh dari kesetimbangan (rasio ATP/ADP tinggi), banyak reaksi yang secara standar tampak nyaris setimbang tetap sangat eksergonik di kondisi nyata. Inilah mengapa sel "tidak pernah" mencapai kesetimbangan — kesetimbangan berarti kematian.
>
> #### CS / Computational Angle: Simulated Annealing dan Energy Landscapes
>
> Konsep **energy landscape** (lanskap energi bebas) langsung dipinjam ilmu komputer. Dalam **simulated annealing**, solusi kandidat "menggelinding" menuruni lanskap biaya, tetapi dengan probabilitas Boltzmann diperbolehkan naik sesekali untuk lolos dari minimum lokal — meniru fluktuasi termal. **Hopfield networks** dan banyak model **energy-based** (mis. Boltzmann machines) mendefinisikan fungsi energi yang diminimalkan saat inferensi, persis seperti sistem fisik mencari G minimum. Memahami ΔG memberi intuisi fisik untuk seluruh keluarga algoritma optimasi ini.
>
> #### Proyek Eksplorasi Mandiri
> 1. Implementasikan **gradient descent** dan **simulated annealing** pada fungsi 2D ber-multimodal; gambar lintasannya sebagai "menggelinding menuruni lanskap energi bebas" dan amati perbedaan kemampuan lolos minimum lokal.
> 2. Modelkan **energy coupling**: buat dua reaksi (ΔG = +5 dan ΔG = −10) lalu tunjukkan secara numerik bahwa gabungannya spontan; eksperimen dengan rasio coupling.
> 3. Plot ΔG = ΔG°′ + RT ln Q untuk reaksi ATP dan tunjukkan bagaimana rasio ATP/ADP menggeser spontanitas.
>
> #### Bacaan Lanjutan
> - Campbell Biology in Focus, 3rd ed., Chapter 6 — bagian *Free Energy and Metabolism*.
> - Kirkpatrick, Gelatt, Vecchi (1983). *Optimization by Simulated Annealing*, Science.
> - Nelson & Cox, *Lehninger Principles of Biochemistry* — bab Bioenergetics.
