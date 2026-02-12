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
> > - Mengapa TD Learning lebih efisien daripada Monte Carlo?
> > - Bagaimana SARSA mengupdate nilai Q secara on-policy?
> > - Apa perbedaan fundamental Q-Learning dengan SARSA?
> > - Bagaimana formula update nilai Q pada metode TD?
> > - Kapan menggunakan pendekatan off-policy vs on-policy?
> >
> > ## Reference Points
> >
> > - IF3270 Pembelajaran Mesin Slides (Halaman 35-50)
> > - Sutton & Barto (2018) Chapter 6
> >
>
> > ### Konsep Dasar Temporal Difference Learning
> > Temporal Difference (TD) Learning merupakan pendekatan pembelajaran yang menggabungkan ide dari *dynamic programming* dan *Monte Carlo methods*. Berbeda dengan Monte Carlo yang harus menunggu hingga episode selesai untuk mengupdate nilai, TD Learning dapat melakukan update setelah setiap langkah (time-step). Ini membuatnya lebih efisien untuk lingkungan dengan episode panjang atau tak terbatas.
> > Contoh konkret: Bayangkan belajar berjalan menuju kantin kampus. Metode Monte Carlo mengharuskan Anda sampai ke kantin dulu sebelum mengevaluasi seluruh rute, sedangkan TD Learning memungkinkan evaluasi dan perbaikan rute setiap kali Anda melewati satu koridor.
> > Formula dasar TD update untuk nilai state:
> > ```math
> > V(S_t) ← V(S_t) + α [R_{t+1} + γV(S_{t+1}) - V(S_t)]
> > ```
> > Di mana α adalah *learning rate* dan γ adalah *discount factor*.
> > ### SARSA (On-Policy TD Control)
> > SARSA (State-Action-Reward-State-Action) merupakan algoritma TD Learning yang bersifat *on-policy*, artinya mempelajari nilai Q berdasarkan kebijakan (policy) yang sedang dijalankan. Algoritma ini mengikuti urutan:
> > 1. Memilih aksi A dari state S menggunakan policy π
> > 2. Melakukan aksi dan menerima reward R
> > 3. Memilih aksi berikutnya A' dari state S'
> > 4. Mengupdate nilai Q(S,A)
> > Update rule untuk SARSA:
> > ```math
> > Q(S,A) ← Q(S,A) + α [R + γQ(S',A') - Q(S,A)]
> > ```
> > Contoh implementasi pada GridWorld: Jika agent bergerak dari (1,1) ke (1,2) dengan reward 0, nilai Q diupdate berdasarkan nilai Q dari state berikutnya (1,2) dan aksi berikutnya yang dipilih.
> > ### Q-Learning (Off-Policy TD Control)
> > Q-Learning merupakan algoritma *off-policy* yang mempelajari nilai Q optimal terlepas dari policy yang digunakan. Perbedaan utama dengan SARSA terletak pada penggunaan nilai Q maksimal dari state berikutnya:
> > ```math
> > Q(S,A) ← Q(S,A) + α [R + γ max_a Q(S',a) - Q(S,A)]
> > ```
> > Dalam contoh GridWorld, saat agent bergerak dari (2,1) ke (3,1), nilai Q diupdate berdasarkan reward langsung dan nilai Q maksimum di state (3,1), tanpa bergantung pada aksi berikutnya yang akan diambil.
> > ### Analisis Perilaku pada GridWorld
> > Studi kasus dengan parameter α=0.5 dan γ=0.9 menunjukkan:
> > - **SARSA**: Mengembangkan policy yang lebih hati-hati karena mempertimbangkan aksi aktual yang akan diambil (termasuk kemungkinan kesalahan)
> > - **Q-Learning**: Cenderung menemukan policy optimal lebih cepat karena langsung mengeksploitasi nilai Q maksimum
> > Contoh perhitungan Episode-1 SARSA:
> > 1. Q(1,1,↑) = 0 + 0.5[0 + 0.9*Q(1,2,→) - 0] = 0.5[0 + 0.9*0] = 0
> > 2. Q(1,2,→) = 0 + 0.5[0 + 0.9*Q(2,2,→) - 0] = 0.5[0 + 0.9*0] = 0
> > 3. Q(2,2,→) = 0 + 0.5[1 + 0.9*0 - 0] = 0.5*1 = 0.5

> [!cornell] #### Summary
>
> **Temporal Difference Learning** menyediakan framework efisien untuk pembelajaran penguatan dengan **update incremental** setelah setiap langkah. **SARSA** sebagai metode *on-policy* cocok untuk lingkungan dengan risiko tinggi dimana eksplorasi harus diperhitungkan, sementara **Q-Learning** sebagai *off-policy* lebih efektif untuk menemukan kebijakan optimal secara langsung. Perbedaan fundamental terletak pada penggunaan **nilai ekspektasi vs nilai maksimum** dalam update rule, yang menghasilkan perilaku eksplorasi yang berbeda.
>

> [!ad-libitum]- Additional Information
>
> #### Analisis Matematis Update Rule
> Update rule TD dapat diturunkan dari persamaan Bellman:
> ```math
> δ_t = R_{t+1} + γV(S_{t+1}) - V(S_t)
> ```
> Error δ_t merepresentasikan perbedaan antara estimasi nilai saat ini dan target yang diimprovisasi. Konvergensi dijamin ketika learning rate α memenuhi kondisi Robbins-Monro:
> ```math
> Σα = ∞, Σα^2 < ∞
> ```
>
> #### Perbandingan Performa SARSA vs Q-Learning
> - **Cliff Walking Problem**: SARSA menghasilkan path lebih aman dengan menghindari jurang, sementara Q-Learning menemukan path terpendek tetapi lebih berisiko
> - **Konvergensi**: Q-Learning konvergen ke Q* dibawah kondisi tertentu, sedangkan SARSA konvergen ke Qπ untuk policy π yang digunakan
> - **Sensitivity to Hyperparameters**: SARSA lebih toleran terhadap pemilihan γ yang tinggi karena mempertimbangkan risiko nyata
>
> #### Implementasi pada Environment Stochastic
> Pada lingkungan dengan transisi stokastik (contoh: action "move north" 80% berhasil, 20% gagal):
> - SARSA: Menyesuaikan nilai Q berdasarkan distribusi transisi aktual
> - Q-Learning: Tetap mengupdate berdasarkan max Q meskipun transisi tidak deterministik
> Hasil eksperimen menunjukkan SARSA lebih robust dalam lingkungan dengan noise tinggi.
>
> #### Self-Exploration Projects
> 1. Implementasikan algoritma TD Learning pada game Snake sederhana:
> - Bandingkan performa SARSA vs Q-Learning dalam menghindari loop infinit
> - Modifikasi reward structure untuk studi kasus sparse reward
> 2. Eksperimen dengan berbagai skema eksplorasi (ε-greedy vs softmax):
> - Ukuran pengaruh terhadap kecepatan konvergensi
> - Analisis trade-off antara eksplorasi dan eksploitasi
>
> #### Tools and Resources
> - **OpenAI Gym**: Library untuk environment RL standar (FrozenLake, CliffWalking)
> - **TensowFlow Agents**: Implementasi ready-to-use untuk algoritma TD Learning
> - **GridWorld Generator**: Custom environment builder untuk eksperimen kebijakan
>
> #### Further Reading
> - Sutton & Barto Chapter 6: "Temporal-Difference Learning" (edisi ke-2, 2018)
> - "Convergence of Stochastic Iterative Algorithms" (Tsitsiklis, 1994)
> - Paper "Q-Learning vs SARSA: A Comparative Analysis" (Hashim et al., 2021)