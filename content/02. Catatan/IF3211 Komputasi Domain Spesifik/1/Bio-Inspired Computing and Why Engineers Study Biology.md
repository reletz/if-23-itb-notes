---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Bio-Inspired Computing and Why Engineers Study Biology
>
> > ## Questions/Cues
> >
> > - Mengapa insinyur/informatika perlu mempelajari biologi?
> > - Apa contoh desain bio-inspired (Shinkansen/kingfisher) dan apa pelajarannya?
> > - Apa itu bio-inspired algorithms seperti genetic algorithm dan evolutionary computation?
> > - Bagaimana biologi menjadi sumber masalah komputasi berskala besar?
> > - Apa beda cara belajar biologi vs matematika vs fisika?
> >
> > ## Reference Points
> >
> > - IF3211 — Course Introduction (PPT 1, bagian Need for Biology)
> > - IF3211 — Course Introduction (PPT 1, bagian Bio-inspired Algorithms)
> > - IF3211 — Course Introduction (PPT 1, bagian Learning Biology vs Mathematics)
>
> > ### Mengapa Belajar Biologi?
> >
> > Deck membuka dengan klaim provokatif: **"tidak ada bedanya antara belajar matematika dan belajar biologi."** Bagi insinyur, biologi adalah **gudang solusi yang telah dioptimasi evolusi selama miliaran tahun**. Kopling **engineering–biology** memberi dua keuntungan: (1) biologi **menginspirasi** desain rekayasa, dan (2) rekayasa **memperbaiki kekurangan** sistem biologis — contohnya **retinal prosthetic** (prostesis retina) yang memulihkan penglihatan. Buah dari kopling ini meliputi **bio-sensors, bio-chips, bio-pesticides, dan self-healing concrete**.
> >
> > ### Studi Kasus Shinkansen dan Kingfisher
> >
> > Contoh ikonik **biomimicry**: kereta cepat **Shinkansen** awalnya menghasilkan *sonic boom* (ledakan suara) saat keluar terowongan akibat gelombang tekanan udara. Insinyur menyelesaikannya dengan mendesain ulang hidung kereta meniru **paruh burung kingfisher** — yang secara alami menembus air dari medium berkepadatan rendah ke tinggi tanpa percikan. Hasilnya: kereta lebih senyap, lebih cepat, dan lebih hemat energi. Pelajaran: **alam telah memecahkan banyak masalah optimasi**; tugas insinyur adalah **mengabstraksi prinsipnya**.
> >
> > ### Bio-Inspired Algorithms
> >
> > Biologi juga menginspirasi **kelas algoritma** sendiri. Yang paling terkenal adalah **genetic algorithm (GA)** dan keluarga **evolutionary computation**: solusi kandidat dikodekan sebagai "kromosom", lalu dievolusikan melalui **selection, crossover, dan mutation** terhadap sebuah **fitness function**. Keluarga bio-inspired lain mencakup **ant colony optimization**, **particle swarm optimization**, dan **artificial neural networks** (terinspirasi neuron). Semua berbagi pola: **meminjam mekanisme adaptif dari alam** untuk menjelajahi ruang solusi besar tanpa perlu turunan analitik.
> >
> > ### Cara Belajar: Biologi vs Matematika vs Fisika
> >
> > Deck membandingkan epistemologi tiga bidang. **Matematika** dipelajari lewat **pengulangan operasi** (penjumlahan, trigonometri, log, fungsi Bessel) hingga hafal/terbiasa. **Fisika** memakai **observasi** lalu diekspresikan secara matematis untuk kelengkapan. **Biologi** **didominasi observasi**, aturannya **belum universal**, dan representasi matematisnya **masih berkembang**. Implikasinya bagi mahasiswa CS: di biologi kita sering bekerja dengan **model probabilistik dan heuristik**, bukan hukum deterministik — sangat cocok untuk pendekatan **machine learning** dan **statistik**.
> >
> > ### Computational Framing: Biologi sebagai Sumber Masalah Skala Besar
> >
> > Biologi memberi insinyur **dua hal sekaligus**: *metafora algoritmik* (bio-inspired) dan *problem instances raksasa*. **Genetic algorithm** adalah **metaheuristic stochastic search** — berguna persis ketika ruang solusi terlalu besar untuk brute force dan fungsi objektif tidak konveks. Sementara itu, biologi memunculkan masalah **NP-hard** nyata: **multiple sequence alignment**, **protein folding**, **phylogeny reconstruction**. Keduanya adalah dua sisi koin: alam adalah **algoritma** sekaligus **benchmark**. Sifat biologi yang "belum universal" menjadikan **approximation algorithms** dan **probabilistic modeling** sebagai pendekatan default, bukan exact solver.
> >
> > ```mermaid
> > flowchart LR
> >     BIO["Biologi"] --> INS["Inspirasi Desain"]
> >     BIO --> PRB["Sumber Masalah<br/>Skala Besar"]
> >     INS --> BM["Biomimicry<br/>(Shinkansen/Kingfisher)"]
> >     INS --> ALG["Bio-inspired Algorithms<br/>(GA, Swarm, ANN)"]
> >     PRB --> NP["Masalah NP-hard<br/>(alignment, folding,<br/>phylogeny)"]
> >     ALG --> NP
> > ```

> [!cornell] #### Summary
>
> Insinyur dan informatikawan mempelajari biologi karena ia adalah **gudang solusi teroptimasi evolusi** sekaligus **sumber masalah komputasi berskala besar**. **Biomimicry** seperti hidung **Shinkansen** yang meniru paruh **kingfisher** menunjukkan cara mengabstraksi prinsip alam menjadi desain rekayasa, sementara kopling engineering–biology menghasilkan **retinal prosthetic, bio-sensors, bio-chips, dan self-healing concrete**. Dari sisi algoritma, biologi menginspirasi **genetic algorithm** dan **evolutionary computation** (selection–crossover–mutation atas fitness function) serta swarm dan neural networks. Epistemologinya berbeda dari matematika/fisika: biologi **didominasi observasi** dengan aturan **belum universal**, sehingga **model probabilistik, heuristik, dan ML** menjadi pendekatan alami. Konsep ini melengkapi taksonomi di [[Foundations of Computational Biology and Bioinformatics]].

> [!ad-libitum]- Additional Information
>
> #### Deeper Dive: Anatomi Genetic Algorithm
>
> Sebuah GA bersiklus: **inisialisasi populasi → evaluasi fitness → seleksi (mis. tournament/roulette) → crossover → mutasi → ulangi** hingga konvergen. Parameter kunci: ukuran populasi, *mutation rate*, dan *selection pressure*. Risiko utamanya **premature convergence** ke optimum lokal — diatasi dengan menjaga **keragaman** populasi (analogi langsung dari biologi).
>
> #### CS / Computational Angle
>
> GA dan teman-temannya adalah **black-box optimizers**: tidak butuh gradien, cocok untuk fungsi objektif diskrit/non-differentiable. Bandingkan trade-off-nya dengan gradient descent (cepat tapi perlu differentiability) dan simulated annealing. Ini menempatkan bio-inspired computing dalam lanskap **metaheuristics**.
>
> #### Proyek Eksplorasi Mandiri
> 1. Implementasikan GA sederhana untuk menyelesaikan *Traveling Salesman Problem* kecil, lalu bandingkan kualitas solusinya dengan nearest-neighbor heuristic.
> 2. Cari satu contoh biomimicry lain (mis. Velcro dari biji burdock) dan jelaskan prinsip biologis yang diabstraksi menjadi solusi rekayasa.
>
> #### Bacaan Lanjutan
> - Nemade, M. N., & Rane, M. D. "A Review on Bio-Inspired Computing Algorithms and Application." 2016.
> - Holland, J. H. *Adaptation in Natural and Artificial Systems*. 1975.
> - "Introduction to Genetic Algorithms" — Towards Data Science (medium.com).
