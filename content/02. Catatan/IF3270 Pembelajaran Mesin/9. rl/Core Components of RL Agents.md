---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3270 Pembelajaran Mesin]]

> [!cornell] Core Components of RL Agents
>
> > ## Questions/Cues
> >
> > - Apa fungsi policy dalam agent RL?
> > - Bagaimana value function memandu pengambilan keputusan?
> > - Mengapa model environment bersifat opsional?
> > - Peran reward signal dalam pembelajaran agen
> > - Contoh interaksi agent-environment dalam labirin
> >
> > ## Reference Points
> >
> > - RL_Slides_IF3270.pptx (Halaman 13-27)
> > - Sutton & Barto (2018) Bab 3.1-3.3
> > - Raschka (2022) Bab 15.2
> >
>
> > ### Konsep Dasar Interaksi Agen-Environment
> > Reinforcement Learning (RL) melibatkan interaksi dinamis antara **agent** dan **environment**. Pada setiap langkah waktu (t), agent menerima observasi keadaan (O_t) dan reward (R_t) dari environment, kemudian merespons dengan melakukan aksi (A_t). Environment kemudian memberikan observasi baru (O_{t+1}) dan reward berikutnya (R_{t+1}) sebagai umpan balik. Siklus ini membentuk dasar pembelajaran melalui pengalaman.
> > Contoh konkret dapat dilihat pada masalah labirin: agent (pemecah labirin) menerima informasi posisi saat ini (state), memilih aksi (bergerak atas/bawah/kiri/kanan), menerima reward (positif jika mencapai tujuan, negatif jika menabrak dinding), dan berpindah ke posisi baru. Interaksi berulang ini memungkinkan agent belajar pola gerakan optimal.
> > ### Policy sebagai Strategi Pengambilan Keputusan
> > **Policy** (π) adalah strategi yang menentukan perilaku agent, berupa pemetaan dari state ke action. Policy menjawab pertanyaan: "Aksi apa yang harus diambil ketika berada dalam state tertentu?" Terdapat dua jenis utama policy:
> > 1. Deterministik: π(s) = a (aksi spesifik untuk setiap state)
> > 2. Stokastik: π(a|s) = probabilitas (distribusi probabilitas atas aksi)
> > Contoh pada labirin: policy deterministik mungkin selalu memilih aksi "kanan" di state (1,1), sedangkan policy stokastik mungkin memberikan probabilitas 70% untuk "kanan" dan 30% untuk "bawah". Policy terus diperbaiki selama pembelajaran untuk memaksimalkan akumulasi reward.
> > ### Value Function sebagai Estimasi Imbalan Masa Depan
> > **Value function** (V(s)) mengukur nilai jangka panjang dari suatu state, merepresentasikan total reward yang diharapkan jika agent memulai dari state tersebut dan mengikuti policy tertentu. Fungsi ini membantu agent membuat keputusan dengan mempertimbangkan konsekuensi masa depan daripada hanya reward instan.
> > Dalam contoh labirin, state yang dekat dengan tujuan mungkin memiliki value tinggi meskipun reward instannya kecil, karena potensi mencapai reward besar di langkah berikutnya. Perhitungan value function melibatkan diskon faktor (γ) yang menentukan pentingnya reward masa depan.
> > ### Model Environment sebagai Representasi Dunia
> > **Model** adalah representasi internal agent tentang bagaimana environment bekerja, memprediksi state berikutnya (s') dan reward (r) berdasarkan state saat ini (s) dan aksi yang diambil (a). Model bersifat opsional dalam RL:
> > - Model-based: Agent menggunakan model untuk perencanaan
> > - Model-free: Agent belajar langsung dari pengalaman tanpa model
> > Contoh model dalam labirin mungkin memprediksi: "Dari state (2,2), aksi 'atas' akan membawa ke state (1,2) dengan reward -1". Model yang akurat memungkinkan simulasi pengalaman tanpa interaksi langsung dengan environment nyata.
> > ### Mekanisme Reward Signal sebagai Umpan Balik
> > **Reward signal** (R) adalah umpan balik numerik yang mengindikasikan seberapa baik aksi yang diambil dalam state tertentu. Reward berfungsi sebagai "kompas" yang memandu agent menuju tujuan. Desain reward yang tepat sangat penting:
> > - Reward positif untuk perilaku diinginkan
> > - Reward negatif untuk perilaku tidak diinginkan
> > - Reward jarang (sparse) membuat pembelajaran lebih sulit
> > Pada labirin, reward +10 untuk mencapai tujuan, -1 untuk setiap langkah, dan -5 untuk menabrak dinding. Agent belajar memaksimalkan akumulasi reward dengan menemukan jalan terpendek dan menghindari tabrakan.

> [!cornell] #### Summary
>
> **Komponen inti agent RL** meliputi **policy** sebagai strategi pengambilan keputusan, **value function** untuk estimasi imbalan jangka panjang, dan **model** sebagai representasi opsional environment. Interaksi fundamental terjadi melalui **reward signal** yang memberikan umpan balik instan dan **environment** yang merespons aksi agent. **Desain reward** yang tepat menjadi kritis dalam membentuk perilaku agent, sementara pemahaman hubungan antara komponen-komponen ini memungkinkan pembelajaran efektif melalui eksperimen berulang.
>

> [!ad-libitum]- Additional Information
>
> #### Desain Reward yang Efektif
> Masalah utama dalam implementasi RL adalah **reward engineering**. Reward yang dirancang buruk dapat menyebabkan **perilaku tidak diharapkan** (reward hacking). Contoh kasus: robot yang diminta mengumpulkan benda mungkin belajar mendorong benda keluar arena untuk "mengumpulkan" tanpa henti. Solusi termasuk **reward shaping** (menambahkan reward intermediate) dan **inverse reinforcement learning** (mempelajari fungsi reward dari demonstrasi ahli).
>
> #### Implementasi Teknis Value Function
> Dalam implementasi nyata, value function sering diestimasi menggunakan **fungsi aproksimasi** seperti jaringan saraf tiruan, terutama ketika state space sangat besar. Tantangan teknis meliputi **non-stasioneritas target** (target value berubah saat policy diperbarui) dan **korelasi tinggi** antara sampel data berturut-turut. Teknik seperti **target network** yang diperbarui berkala membantu menstabilkan pembelajaran.
>
> #### Trade-off Eksplorasi-Eksploitasi
> Dilema mendasar dalam RL adalah memilih antara **eksplorasi** (mencoba aksi baru untuk memperoleh informasi) dan **eksploitasi** (menggunakan pengetahuan saat ini untuk memaksimalkan reward). Strategi seperti **ε-greedy** (memilih aksi acak dengan probabilitas ε) dan **Upper Confidence Bound** (UCB) menyeimbangkan keduanya. Pada sistem kritis, eksplorasi berlebihan dapat berisiko sehingga diperlukan pendekatan hati-hati.
>
> #### Tools dan Implementasi Praktis
> - **OpenAI Gym**: Platform standar untuk mengembangkan dan membandingkan algoritma RL dengan berbagai environment standar
> - **Stable Baselines3**: Implementasi algoritma RL state-of-the-art yang teroptimasi
> - **RLlib**: Library terdistribusi untuk pelatihan RL skala besar pada Apache Spark
> - **Unity ML-Agents**: Toolkit untuk mengembangkan lingkungan RL 3D interaktif
>
> #### Self-Exploration Projects
> 1. Implementasikan agent sederhana untuk environment **FrozenLake** dari Gym: bandingkan performance policy acak vs policy terlatih
> 2. Bangun labirin kustom dengan reward berbeda, analisis bagaimana perubahan reward mempengaruhi policy yang dipelajari
> 3. Eksperimen dengan strategi eksplorasi berbeda (ε-greedy vs softmax) dan ukur dampaknya terhadap kecepatan konvergensi
>
> #### Further Reading
> - Sutton & Barto Bab 4: Dynamic Programming untuk pemahaman matematis value function
> - Paper "Reinforcement Learning: The Good, The Bad, and The Ugly" tentang tantangan praktis RL
> - Dokumentasi Resmi OpenAI Gym: https://gym.openai.com/docs/
> - Tutorial RL dengan TensorFlow: https://www.tensorflow.org/agents