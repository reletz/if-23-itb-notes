---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3270 Pembelajaran Mesin]]

> [!cornell] Machine Learning Paradigms: Supervised, Unsupervised, and Reinforcement Learning
>
> > ## Questions/Cues
> >
> > - Apa perbedaan utama supervised vs unsupervised learning?
> > - Mengapa reinforcement learning disebut "berbasis hadiah"?
> > - Contoh aplikasi unsupervised learning di industri?
> > - Bagaimana agent berinteraksi dengan lingkungan di RL?
> > - Kapan menggunakan semi-supervised learning?
> >
> > ## Reference Points
> >
> > - Lecture_ML_Overview.pptx (Slides 17-18, 22)
> > - Machine_Learning_Textbook.pdf (Halaman 58-63)
> >
>
> > ### Pembelajaran Terawasi (Supervised Learning)
> > Pembelajaran terawasi melibatkan pelatihan model menggunakan dataset yang telah dilabeli, dimana setiap contoh pelatihan terdiri dari pasangan fitur (input) dan label (output target). Tujuan utamanya adalah mempelajari fungsi pemetaan dari input ke output sehingga dapat memprediksi label untuk data baru yang belum pernah dilihat.
> > 
> > Contoh aplikasi: Sistem rekomendasi produk e-commerce yang memprediksi rating pengguna berdasarkan histori pembelian. Dalam kasus ini, fitur berupa data pembelian dan demografi pengguna, sedangkan label adalah rating numerik (1-5). Model akan belajar pola hubungan antara karakteristik pengguna dan preferensi rating mereka.
> > 
> > Proses pembelajaran mengikuti siklus: 1) Koleksi data berlabel, 2) Pemilihan algoritma (misal: Decision Tree, SVM), 3) Pelatihan model hingga konvergensi, 4) Validasi menggunakan data tes. Tantangan utamanya termasuk kebutuhan data berlabel yang mahal dan risiko overfitting jika model terlalu kompleks.
> > 
> > ### Pembelajaran Tidak Terawasi (Unsupervised Learning)
> > Paradigma ini bekerja dengan data tanpa label, bertujuan menemukan pola atau struktur intrinsik dalam dataset. Algoritma unsupervised learning melakukan eksplorasi otomatis untuk mengidentifikasi kelompok data serupa (clustering), hubungan asosiatif (association rules), atau reduksi dimensi.
> > 
> > Contoh nyata: Segmentasi pelanggan retail berdasarkan perilaku belanja. Tanpa mengetahui kategori sebelumnya, algoritma seperti K-Means mengelompokkan pelanggan dengan karakteristik pembelian serupa. Hasilnya membantu perusahaan merancang strategi pemasaran yang lebih personalisasi.
> > 
> > Teknik utama mencakup:
> > - Clustering: Pengelompokan data berdasarkan kesamaan (contoh: DBSCAN, Hierarchical Clustering)
> > - Asosiasi: Menemukan hubungan antara variabel (contoh: Apriori untuk analisis keranjang belanja)
> > - Reduksi Dimensi: PCA atau t-SNE untuk visualisasi data kompleks
> > 
> > ### Pembelajaran Penguatan (Reinforcement Learning - RL)
> > RL melatih agent untuk mengambil keputusan optimal melalui interaksi berulang dengan lingkungan, menggunakan mekanisme reward (penghargaan) dan punishment (hukuman). Berbeda dengan paradigma lain, RL tidak memerlukan dataset statis tetapi belajar dari pengalaman dinamis.
> > 
> > Komponen utama:
> > - Agent: Entitas pembuat keputusan
> > - Environment: Dunia tempat agent beroperasi
> > - State: Representasi kondisi lingkungan saat ini
> > - Action: Keputusan yang diambil agent
> > - Reward: Umpan balik numerik untuk setiap aksi
> > 
> > Contoh implementasi: Sistem kontrol lampu lalu lintas adaptif yang meminimalkan kemacetan. Agent (sistem kontrol) belajar dengan mencoba berbagai durasi hijau-merah, menerima reward tinggi ketika mengurangi antrian dan penalty ketika terjadi kemacetan panjang.
> > ### Perbandingan dan Pemilihan Paradigma
> > | **Aspek**               | **Supervised**       | **Unsupervised**     | **Reinforcement**    |
> > |-------------------------|----------------------|----------------------|----------------------|
> > | **Data Input**          | Berlabel             | Tanpa label          | Interaktif           |
> > | **Umpan Balik**         | Langsung (label)     | Tidak ada            | Reward tertunda      |
> > | **Kompleksitas Komputasi** | Menengah          | Variatif             | Sangat Tinggi        |
> > | **Aplikasi Khas**       | Prediksi harga, klasifikasi | Segmentasi pasar, anomaly detection | Robotika, game AI |
> > Semi-supervised learning menjadi solusi hybrid ketika hanya sebagian data berlabel, memanfaatkan kedua pendekatan untuk meningkatkan akurasi dengan biaya pelabelan lebih rendah.

> [!cornell] #### Summary
>
> **Machine learning** memiliki tiga paradigma utama dengan karakteristik unik:
> - **Supervised learning** membutuhkan data berlabel untuk pelatihan model prediktif, cocok untuk tugas klasifikasi dan regresi
> - **Unsupervised learning** mengeksplorasi pola tersembunyi dalam data tanpa label, ideal untuk segmentasi dan reduksi kompleksitas
> - **Reinforcement learning** mengembangkan agent yang belajar optimal melalui trial-and-error dalam lingkungan dinamis.
> 
> **Faktor penentu pemilihan paradigma** meliputi ketersediaan data berlabel, sifat masalah, dan kebutuhan interaksi real-time. **Pendekatan hybrid** seperti semi-supervised learning menjembatani keterbatasan data berlabel.
>

> [!ad-libitum]- Additional Information
>
> #### Evaluasi Kinerja Antar Paradigma
> Metrik evaluasi berbeda untuk setiap pendekatan:
> - Supervised: Accuracy, Precision/Recall, RMSE
> - Unsupervised: Silhouette Score (clustering), Reconstruction Error (dimensionality reduction)
> - Reinforcement: Cumulative Reward, Convergence Rate, Exploration Efficiency
>
> Analisis bias-variance menunjukkan tradeoff unik di RL: eksplorasi berlebihan meningkatkan variance tetapi diperlukan untuk menemukan kebijakan optimal, sementara eksploitasi berlebihan menyebabkan bias terhadap pengalaman awal.
>
> #### Teknik Lanjutan Reinforcement Learning
> Deep Q-Networks (DQN) menggabungkan Q-learning dengan deep neural networks untuk menyelesaikan masalah high-dimensional state space. Teknik penting termasuk:
> - Experience Replay: Menyimpan transisi (state, action, reward) dalam buffer untuk pelatihan lebih stabil
> - Target Network: Jaringan terpisah yang diperbarui berkala untuk menghindari osilasi selama pelatihan
> - Double DQN: Mengurangi overestimasi nilai Q dengan mendekouple seleksi dan evaluasi aksi
>
> #### Proyek Eksplorasi Mandiri
> 1. Bangun sistem rekomendasi musik hybrid yang menggabungkan teknik supervised (berdasarkan rating pengguna) dan unsupervised learning (analisis similarity audio)
> 2. Implementasikan algoritma Q-learning sederhana untuk game CartPole dari OpenAI Gym, eksperimen dengan berbagai nilai discount factor (γ) dan learning rate (α)
> 3. Bandingkan performa algoritma clustering (K-Means vs DBSCAN) pada dataset penipuan kredit menggunakan metrik silhouette score dan waktu komputasi
>
> #### Bacaan Lanjutan
> - Sutton, R. S., & Barto, A. G. (2018). *Reinforcement Learning: An Introduction*. MIT Press (Bab 3-6)
> - Géron, A. (2022). *Hands-On Unsupervised Learning Using Python*. O'Reilly (Bab 4: Clustering Techniques)
> - Dokumentasi Resmi OpenAI Gym: https://gym.openai.com/docs/
> - Tutorial Scikit-learn: Comparing Different Clustering Algorithms