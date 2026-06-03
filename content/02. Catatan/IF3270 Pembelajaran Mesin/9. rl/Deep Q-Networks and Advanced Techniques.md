---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3270 Pembelajaran Mesin]]

> [!cornell] Deep Q-Networks and Advanced Techniques
>
> > ## Questions/Cues
> >
> > - Bagaimana deep Q-learning menggantikan tabel Q?
> > - Apa itu Deep Q-Network (DQN) dan bagaimana bobotnya diperbarui?
> > - Mengapa Replay Memory diperlukan dalam DQN?
> > - Apa isi transition quintuple yang disimpan di memory buffer?
> > - Bagaimana target value ditentukan untuk menghitung loss?
> >
> > ## Reference Points
> >
> > - IF3270 Pembelajaran Mesin - Reinforcement Learning (Pages 53-59)
>
> > ### Deep Q-Learning
> >
> > Pada Q-Learning tabular, nilai Q disimpan dalam **tabel Q** berukuran |S| × |A|. Pendekatan ini tidak skalabel untuk state space besar atau kontinu (mis. piksel layar game). **Deep Q-Learning menggantikan tabel Q dengan sebuah neural network** yang **melakukan forward pass untuk menghitung action values**. Alih-alih mencari nilai dalam tabel, agent memberi state sebagai input ke jaringan, dan jaringan mengeluarkan estimasi Q untuk setiap aksi yang mungkin. Pemilihan aksi dari Q-Learning kini dimodifikasi menjadi sebuah fungsi yang menjalankan forward pass jaringan.
> >
> > ### Deep Q-Network (DQN)
> >
> > **Deep Q-Network (DQN)** adalah neural network yang berperan sebagai approximator fungsi Q. **Bobot jaringan diperbarui menggunakan algoritma Q-Learning** — yaitu jaringan dilatih agar output Q-nya mendekati target Q-Learning. DQN mengandalkan **dua teknik kunci** agar pelatihannya stabil: **replay memory** dan **penentuan target value untuk menghitung loss**.
> >
> > ### Replay Memory
> >
> > Pada DQN, **memperbarui bobot untuk satu pasangan state-aksi kemungkinan mempengaruhi output state lain**, karena bobot jaringan dibagi bersama (berbeda dengan tabel di mana tiap entri independen). Selain itu, **pelatihan multi-epoch klasik tidak feasible**, sebab episode berubah selama pelatihan dan beberapa state yang dikunjungi di tahap awal menjadi kurang mungkin dikunjungi kemudian. Yang lebih kritis, **sampel dari satu episode bukan IID** karena membentuk **urutan transisi** yang berkorelasi kuat — ini melanggar asumsi data independen yang dibutuhkan pelatihan jaringan yang stabil.
> >
> > Solusinya adalah **Replay Memory**. Setiap interaksi menghasilkan **transition quintuple T: (xs, a, r, xs', done)** — state saat ini, aksi, reward, state berikutnya, dan flag terminal. Quintuple ini **disimpan dalam memory buffer berukuran terbatas (bounded)**. Saat pelatihan, **sebuah mini-batch dipilih secara acak dari memory buffer** untuk **menghitung loss dan memperbarui parameter jaringan**. Pengambilan acak ini **memecah korelasi temporal** antar sampel sehingga data menjadi lebih mendekati IID, dan memungkinkan tiap transisi dipakai berkali-kali (data efficiency lebih tinggi).
> >
> > ### Penentuan Target Value untuk Menghitung Loss
> >
> > Untuk melatih DQN, kita memerlukan **target value** sebagai acuan loss. Target dibentuk dari aturan Q-Learning: untuk transisi non-terminal, target y = r + γ·max_a' Q(xs', a'), sedangkan untuk transisi terminal (done = true), target y = r saja (tidak ada nilai masa depan). Loss kemudian dihitung sebagai selisih kuadrat antara prediksi jaringan Q(xs, a) dan target y, lalu parameter di-update lewat gradient descent untuk meminimalkan loss tersebut.
> >
> > ```mermaid
> > flowchart TD
> >     A["Agent amati state xs"] --> B["Pilih aksi a (e-greedy<br/>via forward pass DQN)"]
> >     B --> C["Eksekusi a, terima r, xs', done"]
> >     C --> D["Simpan transisi<br/>(xs, a, r, xs', done)<br/>ke Replay Memory"]
> >     D --> E["Ambil mini-batch acak<br/>dari memory buffer"]
> >     E --> F["Hitung target:<br/>y = r + g*max Q(xs',a')<br/>atau y = r jika done"]
> >     F --> G["Hitung loss (y − Q(xs,a))^2<br/>&amp; update bobot DQN"]
> >     G --> A
> > ```

> [!cornell] #### Summary
>
> **Deep Q-Learning** menggantikan **tabel Q** dengan **neural network** yang melakukan **forward pass untuk menghitung action values**, sehingga skalabel untuk state space besar. **Deep Q-Network (DQN)** melatih jaringan ini dengan **bobot diperbarui via algoritma Q-Learning** dan bergantung pada dua teknik kunci. **Replay Memory** mengatasi masalah bahwa update satu state-aksi mempengaruhi output state lain dan bahwa **sampel berurutan bukan IID**: setiap **transition quintuple (xs, a, r, xs', done)** disimpan di **memory buffer terbatas**, lalu **mini-batch acak** diambil untuk menghitung loss dan memperbarui parameter sehingga korelasi temporal terpecah. **Target value** dihitung dengan aturan Q-Learning (**y = r + γ·max Q(xs', a')**, atau y = r jika terminal) sebagai acuan untuk meminimalkan loss.

> [!ad-libitum]- Additional Information
>
> #### Target Network
> DQN orisinal (Mnih et al., 2015) menambahkan **target network** — salinan jaringan yang dibekukan dan hanya disinkronkan secara periodik. Target y dihitung memakai target network ini, bukan jaringan yang sedang dilatih, untuk mencegah "mengejar target bergerak" yang membuat pelatihan tidak stabil.
>
> #### Varian DQN Modern
> Pengembangan lanjutan meliputi **Double DQN** (mengurangi overestimasi nilai Q), **Dueling DQN** (memisahkan estimasi value dan advantage), **Prioritized Experience Replay** (mengambil sampel transisi penting lebih sering), dan **Rainbow** yang menggabungkan beberapa perbaikan sekaligus.
>
> #### Pencapaian Bersejarah
> DQN pertama kali memungkinkan satu arsitektur belajar memainkan puluhan **game Atari 2600** langsung dari piksel mentah hingga melampaui pemain manusia pada banyak game (Mnih et al., *Nature*, 2015) — tonggak penting kebangkitan deep RL.
>
> #### Proyek Eksplorasi Mandiri
> 1. Implementasikan DQN dengan replay buffer pada `CartPole-v1` dan amati efek mematikan replay memory terhadap kestabilan.
> 2. Bandingkan kurva belajar DQN dengan dan tanpa target network.
> 3. Tambahkan Prioritized Experience Replay dan ukur dampaknya terhadap kecepatan konvergensi.
>
> #### Bacaan Lanjutan
> - Mnih, V., et al. (2015). [Human-level control through deep reinforcement learning](https://www.nature.com/articles/nature14236). *Nature*.
> - Raschka, S., et al. (2022). *Machine Learning with PyTorch and Scikit-Learn* (Bab 19).
> - [PyTorch DQN Tutorial](https://pytorch.org/tutorials/intermediate/reinforcement_q_learning.html)
