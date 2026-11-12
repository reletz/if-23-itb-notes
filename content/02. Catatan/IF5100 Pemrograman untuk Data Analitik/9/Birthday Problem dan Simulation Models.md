---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5100 Pemrograman untuk Data Analitik]]

> [!cornell] Birthday Problem dan Simulation Models
>
> > ## Questions/Cues
> >
> > - Apa itu **Birthday Problem**, dan bagaimana peluangnya dihitung secara matematis lewat komplemen?
> > - Bagaimana peluang tersebut disimulasikan, dan fungsi apa saja yang terlibat?
> > - Mengapa menghitung peluang 3 orang berulang tahun sama jauh lebih sulit secara matematis tetapi mudah disimulasikan?
> > - Mengapa tanggal lahir tidak seragam, dan bagaimana model simulasi disesuaikan?
> > - Apa itu **simulation model**, dan mengapa disebut deskriptif, bukan preskriptif?
> >
> > ## Reference Points
> >
> > - IF5100 — Stochastic Thinking and Random Walk (Pages 16-25)
>
> > ### Birthday Problem
> >
> > Pertanyaan: berapa peluang bahwa **sedikitnya dua orang** dalam suatu kelompok berulang tahun pada tanggal yang sama? Jika kelompok beranggotakan **367 orang**, jawabannya pasti 1 (hanya ada 366 tanggal, termasuk 29 Februari; ini prinsip **pigeonhole**). Untuk kelompok yang lebih kecil jawabannya tidak intuitif.
> >
> > Cara matematisnya memakai **komplemen**: hitung peluang bahwa semua tanggal lahir **berbeda**, lalu kurangkan dari 1. Untuk `N` orang:
> >
> > `P(minimal dua sama) = 1 - 366! / (366^N × (366 - N)!)`
> >
> > Asumsinya: setiap tanggal lahir **sama mungkin**. Tanpa asumsi itu, perhitungannya sangat rumit.
> >
> > ```python
> > def birthdayProb(numPeople):
> >     numerator = math.factorial(366)
> >     denom = (366**numPeople)*math.factorial(366-numPeople)
> >     return 1 - numerator/denom
> > ```
> >
> > Beberapa nilai yang saya verifikasi dengan kode di atas: `N = 10` memberi sekitar 0,117; `N = 20` sekitar 0,411; `N = 23` sekitar 0,506 (melewati 50%); `N = 40` sekitar 0,891; dan `N = 100` praktis 1,0.
> >
> > ### Mengaproksimasi dengan Simulasi
> >
> > Simulasi memakai dua fungsi. `sameDate` menjalankan satu percobaan: tiap orang mendapat tanggal lahir acak, lalu diperiksa apakah ada tanggal yang dipakai minimal `numSame` orang.
> >
> > ```python
> > def sameDate(numPeople, numSame):
> >     possibleDates = range(366)
> >     birthdays = [0]*366
> >     for p in range(numPeople):
> >         birthDate = random.choice(possibleDates)
> >         birthdays[birthDate] += 1
> >     return max(birthdays) >= numSame
> >
> > def birthdayProbSim(numPeople, numSame, numTrials):
> >     numHits = 0
> >     for t in range(numTrials):
> >         if sameDate(numPeople, numSame):
> >             numHits += 1
> >     return numHits/numTrials
> > ```
> >
> > Lalu hitung dan bandingkan untuk `numPeople` dalam `[10, 20, 40, 100]` antara `birthdayProb` dan `birthdayProbSim`. Catatan: pada slide pemanggilan `birthdayProbSim(numPeople, 2)` hanya memberi dua argumen padahal fungsi butuh tiga (`numTrials`), jadi saat dijalankan sendiri argumen `numTrials` perlu ditambahkan.
> >
> > ### Mengapa Kasus 3 Orang Jauh Lebih Sulit
> >
> > Untuk dua orang, komplemennya sederhana: "semua tanggal berbeda". Untuk **tiga orang sama**, komplemennya menjadi **disjungsi rumit**: semua berbeda, *atau* satu pasangan sisanya berbeda, *atau* dua pasangan sisanya berbeda, dan seterusnya. Sebaliknya, pada simulasi cukup mengubah parameter `numSame` dari 2 menjadi 3. Itu keunggulan simulasi.
> >
> > ### Tanggal Lahir Tidak Seragam
> >
> > Data nyata menunjukkan tidak semua tanggal sama sering (slide menampilkan grafik frekuensi kelahiran harian dari Matt Stiles / The Daily Viz). Menyesuaikan **model matematis** menyakitkan, sedangkan menyesuaikan **model simulasi** mudah: cukup **menduplikasi tanggal** yang lebih umum di `possibleDates` sehingga lebih sering terpilih.
> >
> > ```python
> > possibleDates = 4*list(range(0, 57)) + [58] \
> >                 + 3*list(range(59, 366)) \
> >                 + 2*list(range(180, 270))
> > ```
> >
> > Karena `random.choice` memilih seragam atas elemen list, tanggal yang muncul lebih banyak kali di list memiliki bobot peluang lebih besar.
> >
> > ```mermaid
> > graph TD
> >     Q["Pertanyaan peluang"] --> M{"Rumus tertutup<br/>mudah?"}
> >     M -- "Ya (2 orang, seragam)" --> C["Hitung dengan komplemen"]
> >     M -- "Tidak (3 orang, tidak seragam)" --> S["Simulasikan<br/>ubah parameter / bobot"]
> >     C --> V["Bandingkan hasil"]
> >     S --> V
> > ```
> >
> > ### Simulation Models
> >
> > **Simulation model** adalah deskripsi komputasi yang memberi informasi berguna tentang **kemungkinan perilaku** sistem yang dimodelkan. Ciri pentingnya:
> >
> > - **Deskriptif**, bukan preskriptif (menggambarkan apa yang mungkin terjadi, bukan apa yang harus dilakukan).
> > - Hanya **aproksimasi** realitas: "All models are wrong, but some are useful." (George Box).
> >
> > Simulasi banyak dipakai untuk memodelkan sistem yang **intractable secara matematis**, mengambil **hasil antara** yang berguna, serta mudah dikembangkan lewat **successive refinement** dan pertanyaan "what if". Titik awalnya pada kuliah ini adalah **random walk**.

> [!cornell] #### Summary
>
> **Birthday Problem** menanyakan peluang minimal dua orang dalam kelompok berulang tahun sama; dihitung lewat komplemen `1 - 366!/(366^N (366-N)!)` dengan asumsi tanggal sama mungkin, dan hasilnya naik cepat (N = 23 sudah melewati 50%). Simulasi (`sameDate` + `birthdayProbSim`) memberi hasil serupa, dan unggul saat soal diubah: untuk 3 orang sama komplemennya menjadi disjungsi rumit tetapi simulasi hanya mengganti `numSame`; untuk tanggal lahir tidak seragam, cukup menduplikasi tanggal di `possibleDates`. **Simulation model** bersifat deskriptif dan hanya aproksimasi ("all models are wrong, but some are useful"), berguna untuk sistem yang intractable secara matematis dan mudah disempurnakan bertahap.

> [!ad-libitum]- Additional Information
>
> #### Mengapa Hasilnya Mengejutkan
>
> Intuisi kita membandingkan "ada yang sama dengan **saya**" (hanya `N-1` pasangan), padahal soalnya menghitung **semua pasangan**: `N(N-1)/2`. Untuk 23 orang ada 253 pasangan, sehingga peluang bertemu minimal satu kecocokan menjadi tinggi. Pendekatan cepat: `P ≈ 1 - exp(-N(N-1)/(2·366))`.
>
> #### Perhitungan Numerik yang Lebih Aman
>
> `math.factorial(366)` menghasilkan bilangan sangat besar; pembagian integer ke float tetap jalan di Python karena int berpresisi arbitrer, tetapi lebih ringkas dan stabil memakai perkalian bertahap: `p = 1; for i in range(N): p *= (366 - i)/366` lalu `1 - p`. Fungsi `math.perm(366, N) / 366**N` (Python 3.8+) juga setara.
>
> #### Sampling dengan Bobot
>
> Menduplikasi list hanya praktis untuk bobot bilangan bulat. Alternatif lebih umum: `random.choices(range(366), weights=w, k=numPeople)` atau `numpy.random.choice(366, size=numPeople, p=probs)`.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Jalankan `birthdayProbSim` dengan `numTrials = 10000` untuk `N` 10, 20, 23, 40, 100 dan bandingkan dengan `birthdayProb`.
> 2. Cari `N` terkecil agar peluang 3 orang berulang tahun sama melewati 50% (hasil simulasi).
> 3. Implementasikan versi tanggal tidak seragam memakai `random.choices` dengan bobot dari data kelahiran yang kamu buat sendiri, lalu bandingkan dengan versi seragam.
> 4. Ganti `birthdayProb` dengan versi perkalian bertahap dan periksa kesamaan hasilnya.
>
> #### Bacaan Lanjutan
>
> - Guttag, *Introduction to Computation and Programming Using Python*, 3rd Ed. — bagian Birthday Problem pada bab simulasi/probabilitas (bab 11 dan 14 per deck).
> - MIT OCW 6.0002 (Fall 2016), *Lecture 4: Stochastic Thinking*.
