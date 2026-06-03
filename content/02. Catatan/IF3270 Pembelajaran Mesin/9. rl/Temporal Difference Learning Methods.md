---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3270 Pembelajaran Mesin]]

> [!cornell] Temporal Difference Learning Methods
>
> > ## Questions/Cues
> >
> > - Apa keunggulan TD Learning dibanding Monte Carlo?
> > - Bagaimana algoritma SARSA bekerja dan mengapa disebut on-policy?
> > - Bagaimana Q-Learning bekerja dan mengapa disebut off-policy?
> > - Apa itu episode/trial dalam interaksi agent-environment?
> > - Bagaimana perhitungan nilai Q pada contoh GridWorld?
> >
> > ## Reference Points
> >
> > - IF3270 Pembelajaran Mesin - Reinforcement Learning (Pages 35-52)
>
> > ### Temporal Difference (TD) Learning
> >
> > **Temporal Difference (TD) Learning** adalah metode model-free yang belajar langsung dari pengalaman. Keunggulan utamanya: **TD tidak perlu menunggu Return Gt penuh** seperti yang dibutuhkan **Monte Carlo**. Karena itu, TD **dapat belajar dari urutan observasi yang tidak lengkap (incomplete sequences)** dan **memperbarui estimasi setiap timestep**, tanpa harus menunggu episode berakhir. Ide naturalnya adalah menerapkan TD pada action value **q(s, a)** dan meng-update-nya pada setiap langkah menggunakan estimasi langkah berikutnya (*bootstrapping*). Terdapat **dua algoritma TD Control**: **on-policy control (SARSA)** dan **off-policy control (Q-Learning)**.
> >
> > ### SARSA (On-Policy)
> >
> > **SARSA** adalah metode **on-policy** yang dijuluki **"learn on the job"** — ia belajar tentang policy π dari pengalaman yang juga di-sample dari π itu sendiri. Namanya berasal dari **quintuple (St, At, Rt+1, St+1, At+1)** yang menjadi dasar setiap update. Aturan update-nya:
> >
> > ```
> > Q([s], a) = Q([s], a) + α( R + γ·Q(s', a') − Q([s], a) )
> > ```
> >
> > Di sini a' adalah **aksi berikutnya yang benar-benar dipilih oleh policy** di state s'. Karena update memakai aksi yang akan benar-benar dilakukan, SARSA mengevaluasi dan memperbaiki policy yang sama yang sedang dijalankan.
> >
> > ### Q-Learning (Off-Policy)
> >
> > **Q-Learning** adalah metode **off-policy**. Perbedaan kuncinya: alih-alih memakai aksi berikutnya yang benar-benar dipilih, Q-Learning **menggunakan nilai maksimum Q untuk next state**. Aturan update-nya:
> >
> > ```
> > Q([s], a) = Q([s], a) + α( R + γ·max_a' Q(s', a') − Q([s], a) )
> > ```
> >
> > Karena update memakai **max** (aksi greedy terbaik) terlepas dari aksi mana yang sebenarnya diambil saat eksplorasi, Q-Learning belajar langsung tentang **policy optimal** sambil tetap mengikuti policy eksplorasi (mis. ε-greedy).
> >
> > ```mermaid
> > flowchart TD
> >     S["State s, ambil aksi a, terima R, s'"]
> >     S --> SAR["SARSA (on-policy)"]
> >     S --> QL["Q-Learning (off-policy)"]
> >     SAR --> SA["Pilih a' dari policy<br/>di s' (mis. e-greedy)"]
> >     SA --> SU["Target = R + g*Q(s',a')<br/>memakai aksi nyata"]
> >     QL --> QM["Ambil max Q(s',a')<br/>atas semua aksi"]
> >     QM --> QU["Target = R + g*max Q(s',a')<br/>memakai aksi greedy"]
> > ```
> >
> > ### Episode / Trial
> >
> > **Episode (trial)** adalah subbarisan dari interaksi agent-environment. Setiap **episode berakhir di terminal state**, lalu diikuti **reset** ke standard starting state atau ke sampel dari distribusi standar state awal. Pembelajaran TD berlangsung lintas banyak episode sehingga nilai Q secara bertahap konvergen.
> >
> > ### Contoh GridWorld
> >
> > Pada GridWorld dengan **learning rate α = 0.5** dan **discount factor γ = 0.9**, semua Q diinisialisasi 0. Tiga episode dijalankan: Episode-1 (1,1)→(1,2)→(2,2)→(3,2); Episode-2 (1,1)→(2,1)→(3,1); Episode-3 (1,1)→(2,1)→(2,2)→(3,2). Mencapai (3,2) memberi reward +10, sedangkan (3,1) memberi reward −10.
> >
> > **SARSA — Episode-1** (perhitungan langkah per langkah):
> >
> > ```
> > (1,1) ↑ : Q([1,1],up)    = 0 + 0.5(0 + 0.9·Q([1,2],right) − 0)
> >                          = 0 + 0.5(0 + 0.9·0 − 0)        = 0
> > (1,2) → : Q([1,2],right) = 0 + 0.5(0 + 0.9·Q([2,2],right) − 0)
> >                          = 0 + 0.5(0 + 0.9·0 − 0)        = 0
> > (2,2) → : Q([2,2],right) = 0 + 0.5(10 + 0.9·Q([3,2],*) − 0)
> >                          = 0 + 0.5(10 + 0.9·0 − 0)       = 5
> > ```
> >
> > **SARSA — Episode-2:**
> >
> > ```
> > (1,1) → : Q([1,1],right) = 0 + 0.5(0 + 0.9·Q([2,1],right) − 0)
> >                          = 0 + 0.5(0 + 0.9·0 − 0)        = 0
> > (2,1) → : Q([2,1],right) = 0 + 0.5(−10 + 0.9·Q([3,1],*) − 0)
> >                          = 0 + 0.5(−10 + 0.9·0 − 0)      = −5
> > ```
> >
> > **SARSA — Episode-3:**
> >
> > ```
> > (1,1) → : Q([1,1],right) = 0 + 0.5(0 + 0.9·Q([2,1],up) − 0)
> >                          = 0 + 0.5(0 + 0.9·0 − 0)        = 0
> > (2,1) ↑ : Q([2,1],up)    = 0 + 0.5(0 + 0.9·Q([2,2],right) − 0)
> >                          = 0 + 0.5(0 + 0.9·5 − 0) = 0.5·4.5 = 2.25
> > (2,2) → : Q([2,2],right) = 5 + 0.5(10 + 0.9·Q([3,2],*) − 5)
> >                          = 5 + 0.5(10 + 0 − 5) = 5 + 0.5·5  = 7.5
> > ```
> >
> > Setelah tiga episode, SARSA memiliki nilai Q seperti Q([2,2],right)=7.5, Q([2,1],up)=2.25, dan Q([2,1],right)=−5, yang membentuk gradien menuju goal (3,2).
> >
> > ### Perbandingan Optimal Policy SARSA vs Q-Learning
> >
> > Pada contoh ini, **Q-Learning** menghasilkan urutan perhitungan serupa namun target memakai **max Q(s', a')** alih-alih nilai aksi yang benar-benar dipilih; pada inisialisasi nol kedua metode menghasilkan angka yang sama untuk langkah-langkah awal (karena max atas nilai nol tetap nol). Perbedaan muncul setelah beberapa nilai Q positif terbentuk: Q-Learning lebih agresif menyebarkan nilai dari aksi optimal sehingga konvergen ke **policy optimal yang lebih "berani"** (jalur terpendek dekat reward negatif), sedangkan SARSA cenderung menghasilkan **policy yang lebih hati-hati (safe path)** karena memperhitungkan eksplorasi aktual yang berisiko terkena reward −10.

> [!cornell] #### Summary
>
> **Temporal Difference (TD) Learning** belajar dari pengalaman tanpa menunggu **Return Gt penuh** seperti **Monte Carlo**, mampu belajar dari **sequence tidak lengkap**, dan meng-update **tiap timestep** via bootstrapping. Dua algoritma TD Control adalah **SARSA** — **on-policy** ("learn on the job") dengan quintuple **(St, At, Rt+1, St+1, At+1)** dan update **Q([s],a) = Q([s],a) + α(R + γQ(s',a') − Q([s],a))** — dan **Q-Learning** — **off-policy** yang memakai **max Q** untuk next state. Pembelajaran berlangsung lintas **episode** yang berakhir di **terminal state** lalu reset. Pada contoh **GridWorld (α=0.5, γ=0.9)** diperoleh mis. Q([2,2],right)=5 lalu 7.5 dan Q([2,1],up)=2.25. SARSA cenderung menghasilkan **policy aman**, sedangkan Q-Learning konvergen ke **policy optimal yang lebih agresif**.

> [!ad-libitum]- Additional Information
>
> #### Cliff Walking: Ilustrasi Klasik SARSA vs Q-Learning
> Pada problem *Cliff Walking* (Sutton & Barto), **Q-Learning** belajar jalur optimal tepat di tepi jurang namun sering jatuh saat eksplorasi ε-greedy, sehingga reward online-nya lebih buruk. **SARSA** belajar jalur lebih aman menjauhi jurang karena memperhitungkan risiko aksi eksplorasi, menghasilkan reward online lebih tinggi meski jalur lebih panjang.
>
> #### Expected SARSA dan n-step TD
> Varian **Expected SARSA** mengganti Q(s',a') dengan ekspektasi atas policy: Σ_a' π(a'|s')Q(s',a'), mengurangi varians. **n-step TD** dan **TD(λ)** menjembatani TD (1-step) dan Monte Carlo dengan menggabungkan beberapa langkah reward, menyeimbangkan bias-varians.
>
> #### Proyek Eksplorasi Mandiri
> 1. Implementasikan SARSA dan Q-Learning pada Cliff Walking dan bandingkan jalur serta reward kumulatif yang dihasilkan.
> 2. Selesaikan ketiga episode GridWorld untuk Q-Learning secara manual dan bandingkan tabel Q akhir dengan SARSA.
> 3. Variasikan α dan γ, lalu amati pengaruhnya terhadap kecepatan konvergensi dan policy akhir.
>
> #### Bacaan Lanjutan
> - Sutton, R. S., & Barto, A. G. (2018). *Reinforcement Learning: An Introduction* (Bab 6: Temporal-Difference Learning).
> - Watkins, C. J. C. H., & Dayan, P. (1992). *Q-learning*. Machine Learning.
> - David Silver, *RL Course — Lecture 5: Model-Free Control*.
