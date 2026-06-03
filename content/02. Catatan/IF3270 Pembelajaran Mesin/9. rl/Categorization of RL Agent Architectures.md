---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3270 Pembelajaran Mesin]]

> [!cornell] Categorization of RL Agent Architectures
>
> > ## Questions/Cues
> >
> > - Bagaimana agent dikategorikan berdasarkan komponen yang dimilikinya?
> > - Apa perbedaan Value Based, Policy Based, dan Actor Critic?
> > - Apa perbedaan agent Model Free dan Model Based?
> > - Mengapa mata kuliah ini berfokus pada pendekatan Model Free?
> > - Bagaimana taksonomi agent RL secara keseluruhan?
> >
> > ## Reference Points
> >
> > - IF3270 Pembelajaran Mesin - Reinforcement Learning (Pages 28-30)
>
> > ### Kategorisasi Berdasarkan Komponen
> >
> > Agent RL dapat dikategorikan menurut komponen mana yang ia simpan secara eksplisit. **Value Based**: agent hanya menyimpan **value function**, sedangkan **policy bersifat implisit** — aksi dipilih dengan, misalnya, mengambil aksi bernilai (value) tertinggi. **Policy Based**: agent menyimpan **policy secara langsung tanpa value function**, langsung memetakan state ke aksi (atau distribusi aksi). **Actor Critic**: agent menggabungkan keduanya — menyimpan **policy (actor) sekaligus value function (critic)**, sehingga critic mengevaluasi aksi yang dipilih actor untuk memandu perbaikan policy.
> >
> > ### Kategorisasi Berdasarkan Model
> >
> > Dimensi kedua membedakan apakah agent memiliki model lingkungan. **Model Free**: agent hanya memiliki **policy dan/atau value function tanpa model lingkungan**; ia belajar langsung dari pengalaman interaksi tanpa pernah memprediksi dinamika environment. **Pendekatan inilah yang menjadi fokus mata kuliah ini**, dan mencakup algoritma seperti SARSA, Q-Learning, hingga DQN. **Model Based**: agent memiliki **model lingkungan** (prediksi transisi state dan reward) dengan **policy dan/atau value function yang bersifat opsional**; model ini dapat digunakan untuk perencanaan (planning) sebelum bertindak.
> >
> > ### Agent Taxonomy
> >
> > Kedua dimensi di atas membentuk **taksonomi agent** yang dapat saling dikombinasikan. Sumbu pertama (Value Based / Policy Based / Actor Critic) menentukan komponen keputusan yang disimpan, sementara sumbu kedua (Model Free / Model Based) menentukan apakah agent memodelkan dinamika lingkungan. Sebuah agent nyata menempati satu posisi pada masing-masing sumbu — misalnya Q-Learning adalah *value based* dan *model free*, sedangkan algoritma seperti Dyna menggabungkan *value based* dengan *model based*.
> >
> > ```mermaid
> > flowchart TD
> >     AG["RL Agent"]
> >     AG --> K1["Berdasarkan Komponen"]
> >     AG --> K2["Berdasarkan Model"]
> >     K1 --> VB["Value Based<br/>(value function,<br/>policy implisit)"]
> >     K1 --> PB["Policy Based<br/>(policy,<br/>tanpa value function)"]
> >     K1 --> AC["Actor Critic<br/>(policy + value function)"]
> >     K2 --> MF["Model Free<br/>(tanpa model)<br/>fokus mata kuliah"]
> >     K2 --> MB["Model Based<br/>(dengan model lingkungan)"]
> > ```

> [!cornell] #### Summary
>
> Agent RL dikategorikan pada dua dimensi. **Berdasarkan komponen**: **Value Based** (hanya value function, policy implisit), **Policy Based** (hanya policy, tanpa value function), dan **Actor Critic** (policy + value function). **Berdasarkan model**: **Model Free** (hanya policy dan/atau value function, tanpa model lingkungan — **fokus mata kuliah ini**) versus **Model Based** (memiliki model lingkungan dengan policy/value opsional). Kedua dimensi membentuk **taksonomi agent** yang dapat dikombinasikan untuk mendeskripsikan posisi setiap algoritma RL.

> [!ad-libitum]- Additional Information
>
> #### Trade-off Model Free vs Model Based
> **Model Free** lebih sederhana dan tahan terhadap kesalahan pemodelan, tetapi cenderung **kurang sample-efficient** karena hanya belajar dari pengalaman nyata. **Model Based** dapat jauh lebih efisien data karena agent bisa "berlatih" pada model internal (planning), tetapi performanya bergantung pada **akurasi model**; model yang bias dapat menyesatkan policy.
>
> #### Contoh Algoritma per Kategori
> Value Based: **Q-Learning, SARSA, DQN**. Policy Based: **REINFORCE, PPO (variannya)**. Actor Critic: **A2C/A3C, DDPG, SAC, PPO**. Model Based: **Dyna-Q, MuZero, World Models**. Pemetaan ini membantu memilih algoritma sesuai karakteristik masalah.
>
> #### Proyek Eksplorasi Mandiri
> 1. Buat tabel yang memetakan minimal enam algoritma RL populer ke posisi taksonomi (komponen × model).
> 2. Bandingkan sample efficiency Dyna-Q (model based) vs Q-Learning (model free) pada grid world kecil.
> 3. Implementasikan satu agent Actor Critic sederhana dan amati peran terpisah actor dan critic selama pelatihan.
>
> #### Bacaan Lanjutan
> - Sutton, R. S., & Barto, A. G. (2018). *Reinforcement Learning: An Introduction* (Bab 8: Planning and Learning).
> - David Silver, *RL Course — Lecture 1* (slide Agent Taxonomy).
> - [OpenAI Spinning Up — Kinds of RL Algorithms](https://spinningup.openai.com/en/latest/spinningup/rl_intro2.html)
