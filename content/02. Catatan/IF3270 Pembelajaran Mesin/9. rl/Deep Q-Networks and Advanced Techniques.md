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
> > - Mengapa neural network digunakan dalam Q-Learning?
> > - Bagaimana replay memory mengatasi masalah korelasi data?
> > - Apa fungsi target network dalam DQN?
> > - Mengapa diperlukan random sampling pada replay memory?
> > - Bagaimana DQN menghitung nilai target untuk loss function?
> >
> > ## Reference Points
> >
> > - Lecture_RL.pptx (Slides 51-57)
> > - Raschka (2022) Chapter 19
> >
>
> > ### Konsep Dasar Deep Q-Network (DQN)
> > Deep Q-Network (DQN) merupakan pengembangan dari algoritma Q-Learning klasik yang mengintegrasikan neural network untuk memperkirakan nilai Q. Dalam Q-Learning tradisional, nilai Q disimpan dalam tabel (tabular), namun pendekatan ini tidak feasible untuk masalah dengan state space yang sangat besar seperti permainan video atau robotika. DQN menggantikan tabel Q dengan neural network yang memetakan state ke nilai Q untuk semua aksi yang mungkin.
> > Arsitektur neural network pada DQN biasanya berupa multilayer perceptron (MLP) untuk lingkungan dengan state representasi vektor, atau convolutional neural network (CNN) untuk lingkungan visual. Contoh penerapannya adalah pada sistem yang memainkan permainan Atari, di mana input berupa piksel layar dan output adalah nilai Q untuk setiap gerakan joystick.
> > Keunggulan utama DQN dibanding Q-Learning tradisional adalah kemampuannya melakukan generalisasi. Neural network dapat mengenali pola dalam state yang serupa dan memberikan estimasi Q-value yang konsisten untuk state yang belum pernah dilihat sebelumnya, mirip seperti bagaimana manusia dapat mengenali situasi baru berdasarkan pengalaman masa lalu.
> > ### Replay Memory dan Random Sampling
> > Replay memory adalah teknik penyimpanan pengalaman (experience) agent dalam bentuk transition tuple (state, action, reward, next_state, done). Setiap kali agent berinteraksi dengan lingkungan, pengalaman baru disimpan dalam buffer berukuran terbatas (biasanya 100,000-1,000,000 transition). Ketika buffer penuh, pengalaman lama akan dihapus secara berurutan.
> > Masalah utama dalam pembelajaran online adalah korelasi tinggi antara sampel data berurutan. Seperti siswa yang hanya mempelajari soal ujian secara berurutan tanpa mengacak, agent akan kesulitan belajar pola umum. Replay memory mengatasi ini dengan melakukan random sampling minibatch (biasanya 32-512 sampel) dari buffer untuk pelatihan jaringan.
> > Analogi: Bayangkan mahasiswa yang membuat kartu catatan dari setiap masalah yang dihadapi. Alih-alih mempelajarinya secara berurutan, mahasiswa mengambil kartu secara acak untuk latihan, sehingga memahami pola umum bukan sekadar menghafal urutan.
> > ### Target Network dan Perhitungan Loss
> > Target network adalah teknik stabilisasi pelatihan dengan menggunakan jaringan kedua yang identik dengan jaringan utama (main network). Parameter target network diperbarui secara periodik (setiap 100-10,000 langkah) dengan menyalin parameter dari main network, sementara nilai target untuk loss function dihitung menggunakan target network yang lebih stabil.
> > Rumus perhitungan loss menggunakan Mean Squared Error (MSE):
> > ```
> > Loss = (Q_target - Q_main)^2
> > Q_target = r + γ * max_a Q_target(next_state, a)
> > ```
> > Dengan:
> > - r: immediate reward
> > - γ: discount factor (0.99 umumnya)
> > - Q_target: nilai dari target network
> > - Q_main: prediksi jaringan utama
> > Tanpa target network, perubahan parameter jaringan yang cepat akan menyebabkan target nilai Q berubah secara drastis (seperti target bergerak), sehingga pelatihan menjadi tidak stabil. Teknik ini analog dengan guru yang menggunakan kunci jawaban tetap selama satu semester sebelum memperbaruinya, memberi kesempatan siswa (main network) untuk konsisten belajar.
> > ### Implementasi DQN dengan PyTorch
> > Implementasi dasar DQN melibatkan empat komponen utama:
> > 1. **Q-Network**: Neural network dengan input layer sesuai dimensi state dan output layer sesuai jumlah aksi
> > 2. **Replay Buffer**: Struktur data deque atau circular buffer untuk menyimpan experience
> > 3. **Optimizer**: Biasanya Adam atau RMSProp dengan learning rate 0.0001-0.001
> > 4. **Exploration Strategy**: Epsilon-greedy dengan ε menurun dari 1.0 ke 0.01 selama pelatihan
> > Proses pelatihan iteratif:
> > 1. Agent mengumpulkan experience dengan menjelajah lingkungan
> > 2. Menyimpan experience dalam replay memory
> > 3. Sample minibatch secara acak dari buffer
> > 4. Hitung target Q-values menggunakan target network
> > 5. Update main network dengan meminimalkan loss
> > 6. Periodik update target network
> > Contoh snippet PyTorch untuk Q-network:
> > ```python
> > class DQN(nn.Module):
> > def __init__(self, input_dim, output_dim):
> > super().__init__()
> > self.fc1 = nn.Linear(input_dim, 128)
> > self.fc2 = nn.Linear(128, 128)
> > self.fc3 = nn.Linear(128, output_dim)
> > def forward(self, x):
> > x = F.relu(self.fc1(x))
> > x = F.relu(self.fc2(x))
> > return self.fc3(x)
> > ```

> [!cornell] #### Summary
>
> **Deep Q-Networks (DQN)** mengkombinasikan Q-Learning dengan neural network untuk menyelesaikan masalah RL kompleks dengan state space besar. **Replay memory** mengatasi masalah korelasi data melalui random sampling pengalaman masa lalu, sementara **target network** menstabilkan pelatihan dengan memberikan target nilai Q yang konsisten. Implementasi praktis memerlukan teknik **epsilon-greedy** untuk eksplorasi dan optimasi neural network dengan **backpropagation**. **Kemampuan generalisasi** DQN memungkinkannya beroperasi efektif dalam lingkungan yang belum pernah dilihat sebelumnya.
>

> [!ad-libitum]- Additional Information
>
> #### Double DQN dan Dueling DQN
> Double DQN memisahkan seleksi dan evaluasi aksi untuk mengurangi overestimasi nilai Q. Algoritma ini menggunakan main network untuk memilih aksi terbaik, tetapi target network untuk mengevaluasi nilainya. Rumus modifikasi:
> ```
> Q_target = r + γ * Q_target(next_state, argmax_a Q_main(next_state, a))
> ```
>
> Dueling DQN memisahkan arsitektur jaringan menjadi dua stream: nilai state (V(s)) dan keuntungan aksi (A(s,a)). Nilai Q kemudian dihitung sebagai:
> ```
> Q(s,a) = V(s) + (A(s,a) - mean_a A(s,a))
> ```
> Arsitektur ini membantu agent memahami nilai state secara intrinsik tanpa terpaku pada aksi spesifik.
>
> #### Prioritized Experience Replay
> Teknik ini memberikan prioritas lebih tinggi pada transisi dengan error prediksi besar (TD-error). Transisi "penting" di-sample lebih sering menggunakan struktur data heap atau segment tree. Sampling prioritas memerlukan importance sampling correction untuk menghindari bias.
>
> #### Overestimation Bias dan Mitigasinya
> DQN cenderung overestimate nilai Q karena max operator dalam target Q-value. Selain Double DQN, teknik mitigasi meliputi:
> - KL penalty pada loss function
> - Target policy smoothing (menambahkan noise pada aksi target)
> - Clipping nilai Q maksimum
>
> #### Implementasi Lanjutan dengan Frameworks
> 1. **Rainbow DQN**: Mengkombinasikan 6 peningkatan DQN (Double, Dueling, PER, Noisy Nets, etc.)
> 2. **Distributional RL**: Memodelkan distribusi nilai Q alih-alih nilai ekspektasi
> 3. **Recurrent DQN**: Menggunakan LSTM/GRU untuk lingkungan dengan observasi parsial
>
> #### Self-Exploration Projects
> 1. Implementasikan DQN dasar untuk lingkungan CartPole-v1 di OpenAI Gym:
> - Bandingkan performa dengan/ tanpa target network
> - Eksperimen dengan ukuran replay buffer berbeda
> 2. Modifikasi arsitektur jaringan untuk game Pong:
> - Gunakan CNN sebagai feature extractor
> - Tambahkan frame stacking untuk informasi temporal
> 3. Terapkan prioritized replay pada lingkungan MountainCar:
> - Ukur kecepatan konvergensi vs uniform sampling
>
> #### Tools and Resources
> - **OpenAI Gym**: Platform benchmark lingkungan RL
> - **Stable Baselines3**: Implementasi DQN dan variannya di PyTorch
> - **RLlib**: Scalable RL library untuk distributed training
> - **TensorBoard**: Visualisasi metrik pelatihan
>
> #### Further Reading
> - [Hessel et al. (2017)] Rainbow: Combining Improvements in Deep Reinforcement Learning
> - [Wang et al. (2016)] Dueling Network Architectures for Deep Reinforcement Learning
> - [Schaul et al. (2015)] Prioritized Experience Replay
> - Dokumentasi resmi PyTorch: https://pytorch.org/tutorials/intermediate/reinforcement_q_learning.html