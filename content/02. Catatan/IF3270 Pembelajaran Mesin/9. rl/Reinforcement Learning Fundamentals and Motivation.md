---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3270 Pembelajaran Mesin]]

> [!cornell] Reinforcement Learning Fundamentals and Motivation
>
> > ## Questions/Cues
> >
> > - Apa itu Reinforcement Learning dan bagaimana proses belajarnya?
> > - Apa yang membedakan RL dari paradigma ML lain seperti supervised dan unsupervised learning?
> > - Disiplin ilmu apa saja yang menjadi akar RL?
> > - Mengapa RL penting bagi pengembangan sistem AI dan inteligensi?
> > - Bagaimana posisi RL di antara cabang-cabang Machine Learning?
> >
> > ## Reference Points
> >
> > - IF3270 Pembelajaran Mesin - Reinforcement Learning (Pages 5-11)
>
> > ### Apa Itu Reinforcement Learning
> >
> > **Reinforcement Learning (RL)** adalah paradigma pembelajaran di mana sebuah **agent** belajar dengan **berinteraksi dengan lingkungannya (environment)**. Sebagaimana manusia dan makhluk cerdas lain belajar dengan mencoba, mengamati konsekuensi, lalu menyesuaikan perilaku, agent RL melakukan hal serupa secara komputasional. RL bersifat **goal-directed**, artinya agent memiliki tujuan yang ingin dicapai dan setiap aksinya diarahkan untuk memaksimalkan pencapaian tujuan tersebut.
> >
> > Hal yang membuat RL istimewa adalah kemampuannya **belajar tanpa contoh perilaku optimal**. Tidak seperti supervised learning yang membutuhkan label "jawaban benar", agent RL tidak pernah diberi tahu aksi mana yang seharusnya dilakukan. Ia hanya menerima sinyal evaluatif berupa **reward** dan harus menemukan sendiri strategi terbaiknya melalui pengalaman. Karena itu, RL sering disebut sebagai **sains pengambilan keputusan dari interaksi (science of learning to make decisions from interaction)**.
> >
> > ### Karakteristik RL Dibanding Paradigma ML Lain
> >
> > RL memiliki sejumlah karakteristik yang membedakannya secara fundamental dari paradigma ML lain. Pertama, **tidak ada supervisi langsung, hanya ada sinyal reward**. Agent tidak menerima pasangan input-output yang benar, melainkan hanya angka skalar yang menandakan seberapa baik atau buruk situasi yang dihasilkan oleh aksinya.
> >
> > Kedua, **feedback dapat tertunda (delayed), bukan instan**. Konsekuensi dari sebuah aksi mungkin baru terlihat beberapa langkah kemudian, sehingga agent harus mampu mengaitkan reward yang datang belakangan dengan aksi yang menyebabkannya (masalah *credit assignment*). Ketiga, **waktu sangat penting (time matters)**: data RL bersifat sekuensial dan tidak independen — **keputusan yang diambil lebih awal mempengaruhi observasi dan interaksi berikutnya**. Asumsi data i.i.d. yang lazim pada supervised learning tidak berlaku di sini.
> >
> > ### Cabang-Cabang Machine Learning
> >
> > Machine Learning umumnya dibagi menjadi tiga cabang besar. **Supervised Learning** belajar dari data berlabel (pasangan x, y) untuk tugas klasifikasi dan regresi. **Unsupervised Learning** menemukan struktur tersembunyi dalam data tanpa label, misalnya clustering dan reduksi dimensi. **Reinforcement Learning** belajar melalui interaksi trial-and-error dengan lingkungan untuk memaksimalkan reward kumulatif. Ketiganya menjawab pertanyaan berbeda, dan RL secara khusus menangani **masalah pengambilan keputusan sekuensial**.
> >
> > ### Disiplin Terkait
> >
> > RL berdiri di persimpangan banyak disiplin ilmu. Dari **Computer Science** datang sudut pandang machine learning dan komputasi. **Neuroscience** menyumbang pemahaman tentang sistem reward di otak (mis. dopamin). **Psychology** memberi landasan melalui teori *operant/classical conditioning* (Pavlov, Skinner) tentang bagaimana perilaku dibentuk oleh penguatan. **Economics** berkontribusi lewat teori utilitas dan *bounded rationality*. **Engineering** menyumbang **optimal control**, dan **Mathematics/Operations Research** menyediakan kerangka optimasi keputusan. Konvergensi semua bidang ini menjadikan RL kerangka yang sangat kaya untuk memodelkan agen yang mengambil keputusan.
> >
> > ### Mengapa RL Penting
> >
> > Pertama, RL **melampaui keterbatasan supervised learning berbasis contoh (x, y)**. Ketika supervisi langsung tidak tersedia — dan masalah pengambilan keputusan ada di mana-mana — RL menjadi pendekatan yang natural. Kedua, RL **telah banyak digunakan dan dideploy untuk sistem AI berperforma tinggi**, contohnya melatih tugas fisik kompleks seperti **robot berkaki (legged robot)** untuk berjalan. Ketiga, **belajar dari pengalaman tampak fundamental bagi inteligensi** — RL mampu menemukan solusi baru yang tidak terpikirkan oleh perancang. Keempat, RL menyimpan **banyak masalah riset terbuka yang menarik**, mulai dari pertanyaan apakah RL bisa belajar memasak hingga apakah robot bisa berlatih sepenuhnya secara otonom.
> >
> > ```mermaid
> > flowchart TD
> >     ML["Machine Learning"]
> >     ML --> SL["Supervised Learning<br/>(data berlabel x, y)"]
> >     ML --> UL["Unsupervised Learning<br/>(struktur tanpa label)"]
> >     ML --> RL["Reinforcement Learning<br/>(interaksi &amp; reward)"]
> >     RL --> R1["Tanpa supervisi, hanya reward"]
> >     RL --> R2["Feedback tertunda"]
> >     RL --> R3["Sekuensial, waktu penting"]
> > ```

> [!cornell] #### Summary
>
> **Reinforcement Learning (RL)** adalah sains pengambilan keputusan di mana sebuah **agent** belajar dengan **berinteraksi dengan lingkungan** secara **goal-directed** dan **tanpa contoh perilaku optimal**. RL berbeda dari paradigma ML lain karena **tidak ada supervisi (hanya sinyal reward)**, **feedback dapat tertunda**, dan **waktu penting** sehingga keputusan awal mempengaruhi interaksi berikutnya. RL menempati satu dari tiga cabang ML bersama **supervised** dan **unsupervised learning**, dan berakar pada banyak disiplin (CS, neuroscience, psychology/operant conditioning, economics, optimal control, operations research). RL penting karena **melampaui supervisi berbasis (x, y)**, **menggerakkan sistem AI performant seperti robot berkaki**, mencerminkan **belajar dari pengalaman sebagai fondasi inteligensi**, dan menyimpan **banyak riset terbuka**.

> [!ad-libitum]- Additional Information
>
> #### Reward Hypothesis
> Inti teoretis RL adalah **reward hypothesis** (Sutton & Barto): "semua tujuan dapat dideskripsikan sebagai maksimisasi nilai harapan dari reward kumulatif". Hipotesis ini menjadi dasar mengapa satu sinyal skalar (reward) cukup untuk mengekspresikan tujuan yang kompleks sekalipun.
>
> #### Tonggak Sejarah RL
> Perkembangan RL mencakup TD-Gammon (Tesauro, 1992) yang mencapai level pemain backgammon dunia, kemenangan **AlphaGo** (DeepMind, 2016) atas juara Go dunia, hingga **AlphaZero** dan penerapan RLHF (*Reinforcement Learning from Human Feedback*) pada model bahasa besar modern.
>
> #### Proyek Eksplorasi Mandiri
> 1. Jalankan environment `CartPole-v1` pada library Gymnasium dan bandingkan kebijakan acak vs kebijakan terlatih sederhana.
> 2. Tuliskan tiga masalah dunia nyata (mis. penjadwalan, trading, rekomendasi) dan formulasikan masing-masing sebagai state, action, dan reward.
> 3. Bandingkan kurva belajar agent RL dengan akurasi model supervised pada tugas serupa untuk memahami perbedaan sinyal belajar.
>
> #### Bacaan Lanjutan
> - Sutton, R. S., & Barto, A. G. (2018). *Reinforcement Learning: An Introduction* (2nd ed.). MIT Press (Bab 1).
> - Raschka, S., et al. (2022). *Machine Learning with PyTorch and Scikit-Learn* (Bab 15). Packt.
> - [DeepMind x UCL Reinforcement Learning Lectures](https://www.youtube.com/playlist?list=PLqYmG7hTraZDVH599EItlEWsUOsJbAodm)
