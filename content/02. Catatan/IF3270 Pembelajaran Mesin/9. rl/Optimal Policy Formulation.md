---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3270 Pembelajaran Mesin]]

> [!cornell] Optimal Policy Formulation
>
> > ## Questions/Cues
> >
> > - Bagaimana interface RL diformalkan sebagai Markov Decision Process?
> > - Apa itu Return Gt dan bagaimana cara menghitungnya?
> > - Mengapa kita memerlukan discount factor γ?
> > - Apa definisi optimal policy π*?
> > - Bagaimana hubungan value function dengan policy?
> >
> > ## Reference Points
> >
> > - IF3270 Pembelajaran Mesin - Reinforcement Learning (Pages 31-34)
>
> > ### Formalisasi Interface RL: Markov Decision Process
> >
> > Interaksi agent-environment diformalkan sebagai **Markov Decision Process (MDP)**, sebuah tuple yang terdiri dari: himpunan **states (S)**, himpunan **actions (A)**, fungsi **transition** yang menentukan probabilitas state berikutnya P(s' | s, a), dan fungsi **reward** R(s, a) yang menyatakan reward yang diharapkan saat mengambil aksi a di state s. MDP bersandar pada **Markov property**: state berikutnya dan reward hanya bergantung pada state dan aksi saat ini, bukan pada seluruh riwayat — artinya state telah merangkum semua informasi relevan dari masa lalu.
> >
> > ### Return Gt
> >
> > Tujuan agent bukan reward sesaat melainkan **Return (Gt)**, yaitu **akumulasi reward masa depan** mulai dari langkah t. Karena reward yang jauh di masa depan dianggap kurang bernilai dibanding yang dekat, setiap reward masa depan didiskon dengan **discount factor γ** (0 ≤ γ ≤ 1). Return didefinisikan sebagai jumlah reward terdiskon:
> >
> > ```
> > Gt = Rt+1 + γ·Rt+2 + γ²·Rt+3 + γ³·Rt+4 + ...
> >    = Σ (k=0 → ∞) γ^k · Rt+k+1
> >
> > Bentuk rekursif:
> > Gt = Rt+1 + γ·Gt+1
> > ```
> >
> > Semakin kecil γ (mendekati 0), agent semakin **myopic** (hanya peduli reward dekat); semakin besar γ (mendekati 1), agent semakin **far-sighted** (memperhitungkan reward jangka panjang).
> >
> > ### Mengapa Discounting
> >
> > Penggunaan **discount factor** memiliki beberapa alasan. Pertama, secara **matematis** ia menjamin Return konvergen (terbatas) untuk tugas yang berlangsung tak hingga (γ < 1). Kedua, ia merepresentasikan **ketidakpastian masa depan** — reward yang jauh lebih tidak pasti sehingga wajar dinilai lebih rendah. Ketiga, ada **preferensi terhadap reward yang lebih cepat** (analogi nilai waktu uang dalam ekonomi). Dengan discounting, agent secara alami menyeimbangkan reward langsung dengan reward jangka panjang.
> >
> > ### Optimal Policy π*
> >
> > Sebuah **policy π** memetakan state ke aksi (atau distribusi atas aksi). Setiap policy memiliki **value function** yang mengukur ekspektasi Return jika mengikuti policy tersebut: state-value v_π(s) = E_π[Gt | St = s], dan action-value q_π(s, a) = E_π[Gt | St = s, At = a]. **Optimal policy π\*** adalah **policy yang memaksimalkan expected return (value)** di seluruh state. Policy ini menghasilkan value function optimal v\*(s) dan q\*(s, a) — nilai tertinggi yang dapat dicapai dari setiap state atau pasangan state-aksi.
> >
> > ### Hubungan Value Function dengan Policy
> >
> > Value function dan policy saling terkait erat dalam siklus dua arah. Diberikan sebuah policy, kita dapat **mengevaluasinya** dengan menghitung value function-nya. Sebaliknya, diberikan value function, kita dapat **memperbaiki policy** dengan memilih aksi yang memaksimalkan value (bertindak *greedy* terhadap value function). Begitu kita memiliki **q\*(s, a)**, optimal policy diperoleh secara langsung: **π\*(s) = argmax_a q\*(s, a)**. Inilah dasar yang memungkinkan metode value-based menemukan kebijakan optimal hanya dengan mempelajari value function.

> [!cornell] #### Summary
>
> Interface RL diformalkan sebagai **Markov Decision Process (MDP)** berisi **states, actions, fungsi transition, dan reward**, yang bertumpu pada **Markov property**. Tujuan agent adalah memaksimalkan **Return Gt**, yaitu akumulasi reward masa depan terdiskon **Gt = Rt+1 + γRt+2 + γ²Rt+3 + ...** dengan **discount factor γ** yang menjamin konvergensi, merepresentasikan ketidakpastian masa depan, dan memberi preferensi pada reward lebih cepat. **Optimal policy π\*** adalah policy yang **memaksimalkan expected return (value)**, menghasilkan value function optimal v\* dan q\*. Karena value function dan policy saling terkait, optimal policy dapat diturunkan langsung dari q\* melalui **π\*(s) = argmax_a q\*(s, a)**.

> [!ad-libitum]- Additional Information
>
> #### Bellman Equation
> Sifat rekursif Return melahirkan **Bellman equation**, fondasi seluruh algoritma RL. Bellman expectation: v_π(s) = Σ_a π(a|s) Σ_s',r p(s',r|s,a)[r + γ v_π(s')]. Bellman optimality: v\*(s) = max_a Σ_s',r p(s',r|s,a)[r + γ v\*(s')]. Persamaan inilah yang "dipecah" oleh Value Iteration, Policy Iteration, dan metode TD.
>
> #### Episodic vs Continuing Tasks
> Pada **episodic tasks** terdapat terminal state sehingga Gt adalah jumlah berhingga, dan γ = 1 bisa dipakai. Pada **continuing tasks** (tak berujung), γ < 1 wajib agar Return terbatas. Beberapa formulasi alternatif memakai *average reward* alih-alih discounted return.
>
> #### Proyek Eksplorasi Mandiri
> 1. Hitung Gt secara manual untuk urutan reward [1, 0, 2, -1] dengan γ = 0.9 dan γ = 0.5, lalu bandingkan.
> 2. Implementasikan Value Iteration pada grid world kecil dan turunkan π\* dari v\*.
> 3. Amati efek mengubah γ terhadap kebijakan optimal pada lingkungan dengan reward tertunda.
>
> #### Bacaan Lanjutan
> - Sutton, R. S., & Barto, A. G. (2018). *Reinforcement Learning: An Introduction* (Bab 3-4: MDPs &amp; Dynamic Programming).
> - Bellman, R. (1957). *Dynamic Programming*. Princeton University Press.
> - David Silver, *RL Course — Lecture 2: Markov Decision Processes*.
