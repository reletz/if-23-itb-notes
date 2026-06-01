---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Pembelajaran Mesin Lanjut]]

> [!cornell] Categorization of RL Agent Architectures
>
> > ## Questions/Cues
> >
> > - Apa kriteria utama klasifikasi arsitektur agen RL?
> > - Bagaimana perbedaan agen berbasis nilai vs kebijakan?
> > - Mengapa actor-critic menggabungkan dua pendekatan?
> > - Kapan menggunakan model-free vs model-based RL?
> > - Apa implikasi praktis pemilihan tipe agen?
> >
> > ## Reference Points
> >
> > - Lecture_RL_IF3270.pptx (Slides 28-30)
> > - Sutton & Barto (2018) Ch.3
> >
>
> > ### Konsep Dasar Kategorisasi Agen RL
> > Arsitektur agen Reinforcement Learning diklasifikasikan berdasarkan tiga komponen utama: **kebijakan (policy)**, **fungsi nilai (value function)**, dan **model lingkungan**. Kebijakan menentukan perilaku agen (pemetaan state ke action), fungsi nilai memperkirakan reward jangka panjang, sementara model lingkungan merepresentasikan pengetahuan agen tentang dinamika lingkungan. Klasifikasi ini membantu memilih pendekatan yang sesuai untuk masalah spesifik.
> > Contoh analogi: Memilih antara dokter umum (policy-based) yang langsung memberi resep vs konsultan medis (value-based) yang menganalisis berbagai opsi sebelum memutuskan. Dalam kasus penyakit kompleks, mungkin dibutuhkan tim dokter-spesialis (actor-critic) yang menggabungkan kedua pendekatan.
> > ### Agen Berbasis Nilai (Value-Based)
> > Arsitektur ini fokus pada optimalisasi **fungsi nilai** (biasanya Q-value) tanpa kebijakan eksplisit. Agen memilih action dengan nilai tertinggi pada state saat ini. Keunggulannya terletak pada stabilitas pembelajaran dan kemampuan menemukan solusi optimal secara matematis. Contoh algoritma: Q-Learning (meskipun detail implementasi dikecualikan sesuai panduan).
> > Batasan utama: Menjadi tidak praktis di lingkungan dengan ruang aksi besar karena perlu menghitung nilai semua kemungkinan aksi. Analogi: Seperti mencoba menghitung semua rute mungkin sebelum menentukan jalan pulang - efektif untuk kota kecil tapi tidak feasible untuk metropolitan besar.
> > ### Agen Berbasis Kebijakan (Policy-Based)
> > Pendekatan ini langsung mempelajari **kebijakan optimal** tanpa mengandalkan fungsi nilai. Cocok untuk lingkungan dengan ruang aksi kontinu atau ketika diperlukan perilaku stokastik. Kelebihan utamanya adalah efisiensi komputasi dan kemampuan menangani kebijakan probabilistik.
> > Contoh aplikasi: Robotika dimana aksi berupa gerakan motorik kontinu. Policy gradient methods (REINFORCE) termasuk kategori ini. Kelemahan utama: Varians tinggi dalam estimasi gradien yang dapat memperlambat konvergensi.
> > ### Arsitektur Actor-Critic
> > Menggabungkan keunggulan value-based dan policy-based dengan dua komponen: **aktor** (policy) yang menentukan aksi, dan **kritikus** (value function) yang mengevaluasi kualitas aksi tersebut. Sinergi ini memungkinkan pembelajaran lebih stabil dibanding metode policy-based murni, sekaligus lebih fleksibel daripada value-based murni.
> > Analogi praktis: Penulis naskah (aktor) yang terus menghasilkan draf cerita, dengan editor (kritikus) yang memberikan umpan balik untuk perbaikan. Contoh implementasi: A2C (Advantage Actor-Critic) dan A3C (Asynchronous Advantage Actor-Critic).
> > ### Model-Based vs Model-Free RL
> > **Model-free** tidak membangun representasi eksplisit lingkungan, belajar langsung dari pengalaman (trial-and-error). Contoh: DQN dan policy gradients. Cocok ketika model lingkungan sulit/tidak mungkin dibangun. **Model-based** mempelajari/menggunakan model lingkungan untuk prediksi, memungkinkan perencanaan internal (seperti simulasi mental sebelum bertindak).
> > Pertimbangan pemilihan: Model-free lebih sederhana tapi kurang sample-efficient, model-based lebih kompleks tapi memungkinkan pembelajaran lebih cepat setelah model akurat. Contoh kasus: AlphaGo menggunakan kombinasi keduanya - model-based untuk simulasi permainan, model-free untuk evaluasi posisi.

> [!cornell] #### Summary
>
> **Klasifikasi arsitektur agen RL** didasarkan pada keberadaan **policy**, **value function**, dan **model lingkungan**. Value-based fokus pada optimasi fungsi nilai, policy-based langsung mempelajari pemetaan state-action, sementara actor-critic **menggabungkan kedua pendekatan** untuk stabilitas dan fleksibilitas. Pemilihan model-free/model-based bergantung pada kompleksitas lingkungan dan ketersediaan model dinamika sistem. **Pemilihan arsitektur** merupakan trade-off antara kompleksitas komputasi, sample efficiency, dan kebutuhan akurasi solusi.
>

> [!ad-libitum]- Additional Information
>
> #### Analisis Komparatif Mendalam
> - **Value-Based**: Konvergensi lebih terjamin secara teoritis tetapi terbatas pada ruang aksi diskrit kecil. Rentang terhadap overestimation bias dalam fungsi Q
> - **Policy-Based**: Dapat menangani kebijakan stokastik dan ruang aksi kontinu, tetapi cenderung memiliki varians tinggi dan konvergensi lebih lambat
> - **Actor-Critic**: Mengurangi varians policy gradient melalui baseline value function, tetapi memperkenulkan bias aproksimasi
>
> #### Trade-off Model-Based vs Model-Free
> | Karakteristik       | Model-Based          | Model-Free           |
> |---------------------|----------------------|----------------------|
> | Sample Efficiency   | Tinggi               | Rendah               |
> | Kompleksitas        | Tinggi               | Sedang               |
> | Kemampuan Generalisasi | Baik untuk lingkungan mirip | Terbatas pada pengalaman |
> | Kebutuhan Komputasi | Offline planning     | Online learning      |
>
> #### Studi Kasus Nyata
> 1. **AlphaGo Zero**: Model-based dengan Monte Carlo Tree Search untuk simulasi internal
> 2. **DeepMind's DQN**: Model-free dengan experience replay untuk stabilitas
> 3. **OpenAI Five (Dota 2)**: Actor-critic dengan PPO untuk kebijakan multi-agen
>
> #### Tantangan Implementasi
> - **Partial Observability**: Penggunaan RNN/LSTM untuk mempertahankan state history
> - **Non-stationarity**: Teknik importance sampling untuk lingkungan yang berubah dinamis
> - **Credit Assignment**: Penggunaan eligibility traces untuk pembelajaran temporal
>
> #### Proyek Eksplorasi Mandiri
> 1. Implementasikan agen policy-based sederhana untuk masalah CartPole menggunakan PyTorch
> 2. Bandingkan performa model-free (A2C) vs model-based (MBRL) pada lingkungan Maze sederhana
> 3. Eksperimen dengan berbagai rasio exploration-exploitation pada algoritma actor-critic
>
> #### Tools dan Framework
> - **OpenAI Gym**: Lingkungan standar untuk benchmarking
> - **Stable Baselines3**: Implementasi state-of-the-art algorithms
> - **Ray RLlib**: Library terdistribusi untuk training skala besar
>
> #### Bacaan Lanjutan
> - Sutton & Barto (2018) Bab 13: "Policy Gradient Methods"
> - Arxiv: "Model-Based Reinforcement Learning: A Survey" (2021)
> - Kursus DeepMind x UCL: Lecture 6 "Actor-Critic Methods"
> - Buku "Reinforcement Learning: Theory and Algorithms" oleh Alekh Agarwal