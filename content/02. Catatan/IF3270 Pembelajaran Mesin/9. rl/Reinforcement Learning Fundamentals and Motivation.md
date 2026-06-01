---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Pembelajaran Mesin IF3270]]

> [!cornell] Reinforcement Learning Fundamentals and Motivation
>
> > ## Questions/Cues
> >
> > - Apa beda RL dengan pembelajaran terawasi?
> > - Mengapa umpan balik RL bersifat tertunda?
> > - Bagaimana RL terkait dengan ilmu kontrol optimal?
> > - Kapan RL lebih unggul dari metode ML lain?
> > - Mengapa eksplorasi penting dalam RL?
> >
> > ## Reference Points
> >
> > - RL_Slides_IF3270.pptx (Slides 5-11, 27)
> > - cs224r.stanford.edu/slides (Slide 9, 11)
> >
>
> > ### Definisi Reinforcement Learning
> > Reinforcement Learning (RL) merupakan paradigma pembelajaran mesin di mana agen belajar membuat keputusan optimal melalui interaksi dengan lingkungan. Berbeda dengan pembelajaran terawasi yang memerlukan dataset berlabel, RL hanya mengandalkan sinyal reward yang mungkin diterima secara tertunda. Contoh analogi: seperti bayi belajar berjalan dengan mencoba berbagai gerakan dan menerima umpan balik (jatuh atau berhasil) untuk menyesuaikan strateginya.
> > RL bersifat goal-oriented dengan fokus pada maksimalisasi reward kumulatif jangka panjang. Sistem ini tidak memerlukan contoh perilaku optimal seperti pada pembelajaran terawasi, melainkan menemukan strategi optimal melalui trial-and-error. Contoh aplikasi nyata termasuk robotika (belajar berjalan secara mandiri) atau sistem rekomendasi (mempelajari preferensi pengguna dari interaksi).
> > ### Perbandingan dengan Paradigma ML Lain
> > RL memiliki tiga karakteristik pembeda utama:
> > 1. **Tidak ada supervisi langsung**, hanya sinyal reward yang mungkin jarang dan tertunda
> > 2. **Konsekuensi temporal** di mana keputusan sekarang mempengaruhi keadaan masa depan
> > 3. **Ketergantungan urutan waktu** yang membuat data tidak independen dan identik terdistribusi (non-IID)
> > Berbeda dengan unsupervised learning yang fokus pada pola data tanpa tujuan spesifik, RL memiliki tujuan kumulatif yang jelas. Contoh: Sistem klasifikasi gambar (supervised) vs. agen game yang belajar strategi menang (RL).
> > ### Motivasi Penggunaan RL
> > Empat alasan utama menggunakan RL:
> > 1. **Solusi masalah keputusan berurutan** seperti kontrol robot atau manajemen portofolio investasi
> > 2. **Kemampuan belajar tanpa dataset berlabel** yang mahal untuk dikumpulkan
> > 3. **Potensi menemukan strategi baru** yang tidak terpikirkan oleh desainer manusia
> > 4. **Aplikasi luas** mulai dari optimasi logistik hingga sistem dialog cerdas
> > Contoh implementasi sukses: AlphaGo yang mengalahkan juara dunia Go dengan strategi inovatif yang belum pernah ada dalam literatur permainan.
> > ### Dilema Eksplorasi vs Eksploitasi
> > Agen RL menghadapi trade-off fundamental:
> > - **Eksploitasi**: Memanfaatkan pengetahuan saat ini untuk memaksimalkan reward
> > - **Eksplorasi**: Mencoba tindakan baru untuk memperoleh informasi lebih
> > Contoh restoran: Eksploitasi berarti selalu ke restoran favorit, sedangkan eksplorasi mencoba restoran baru yang mungkin lebih baik. Kedua strategi diperlukan karena eksploitasi berlebihan menyebabkan suboptimal, sementara eksplorasi berlebihan mengurangi efisiensi.

> [!cornell] #### Summary
>
> **Reinforcement Learning** adalah paradigma pembelajaran mesin yang memungkinkan agen belajar melalui interaksi dengan lingkungan menggunakan **sinyal reward tertunda** tanpa supervisi langsung. RL unggul untuk masalah keputusan berurutan dengan **efek jangka panjang** seperti kontrol robot atau strategi game, serta memungkinkan penemuan solusi inovatif. Tantangan utama meliputi **penyeimbangan eksplorasi-eksploitasi** dan pengelolaan **ketergantungan temporal** dalam data pembelajaran.
>

> [!ad-libitum]- Additional Information
>
> #### Teori Matematika Dasar RL
> Proses keputusan RL dapat dimodelkan sebagai Proses Keputusan Markov (MDP) yang memenuhi properti Markov: keadaan masa depan hanya bergantung pada keadaan saat ini, bukan sejarah sebelumnya. Secara formal, MDP didefinisikan sebagai tuple (S, A, P, R, γ) dimana:
> - S: Himpunan keadaan
> - A: Himpunan tindakan
> - P: Fungsi transisi P(s'|s,a)
> - R: Fungsi reward R(s,a,s')
> - γ: Faktor diskon untuk reward masa depan
>
> Meskipun model ini ideal, banyak aplikasi RL nyata menggunakan pendekatan model-free karena kompleksitas lingkungan.
>
> #### Aplikasi Industri RL
> Implementasi RL di industri mencakup:
> 1. **Optimasi jaringan komunikasi 5G**: Alokasi sumber daya dinamis
> 2. **Manajemen rantai pasok**: Optimasi inventori real-time
> 3. **Trading algoritmik**: Strategi portofolio adaptif
> 4. **Kontrol HVAC**: Efisiensi energi bangunan cerdas
>
> #### Tantangan Riset Terkini
> 1. **Sample efficiency**: Mengurangi jumlah interaksi dengan lingkungan
> 2. **Transfer learning**: Pengetahuan antar domain berbeda
> 3. **Multi-agent RL**: Koordinasi agen otonom
> 4. **Safety constraints**: Memastikan perilaku aman selama eksplorasi
>
> #### Proyek Eksplorasi Mandiri
> 1. Implementasikan agen RL sederhana untuk permainan GridWorld menggunakan library Python seperti Gymnasium
> 2. Eksperimen dengan berbagai strategi eksplorasi (ε-greedy, UCB) dan amati pengaruhnya terhadap performa
> 3. Visualisasi trajectory agen menggunakan Matplotlib untuk memahami proses pembelajaran
>
> #### Sumber Lanjutan
> - Sutton & Barto, "Reinforcement Learning: An Introduction" (Bab 1-3)
> - Kursus online: "Stanford CS234: Reinforcement Learning"
> - Toolkit: OpenAI Gym (https://gymnasium.farama.org/)
> - Paper: "Human-level control through deep reinforcement learning" (Nature 2015)