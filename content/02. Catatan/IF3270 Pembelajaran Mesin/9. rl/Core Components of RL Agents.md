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
> > - Apa tiga konsep inti dalam sistem RL?
> > - Bagaimana loop interaksi agent-environment berlangsung tiap timestep?
> > - Apa perbedaan reward, value, dan action value?
> > - Apa saja komponen internal sebuah agent (policy, value function, model)?
> > - Apa itu dilema exploration vs exploitation?
> >
> > ## Reference Points
> >
> > - IF3270 Pembelajaran Mesin - Reinforcement Learning (Pages 12-27)
>
> > ### Konsep Inti: Environment, Reward, Agent
> >
> > Sistem RL dibangun di atas tiga konsep inti. **Environment** adalah dunia tempat agent beroperasi; ia menerima aksi dan mengembalikan observasi serta reward. **Reward Signal** adalah angka skalar yang menyatakan seberapa baik situasi pada suatu langkah, dan menjadi satu-satunya sinyal tujuan yang dimiliki agent. **Agent** adalah entitas pembelajar dan pengambil keputusan, yang di dalamnya dapat memiliki **agent state**, **policy**, **value function (kemungkinan besar)**, dan **model (opsional)**.
> >
> > ### Loop Agent-Environment
> >
> > Interaksi RL berlangsung sebagai siklus diskret berulang. **Pada setiap langkah t, agent menerima observasi Ot (dan reward Rt), lalu mengeksekusi aksi At**. Sebaliknya, **environment menerima aksi At, kemudian memancarkan observasi berikutnya Ot+1 (dan reward Rt+1)**. Siklus ini membentuk aliran data sekuensial yang terus berputar, di mana aksi agent dan respons environment saling mempengaruhi sepanjang waktu.
> >
> > ```mermaid
> > flowchart LR
> >     A["Agent"] -->|"Aksi At"| E["Environment"]
> >     E -->|"Observasi Ot+1<br/>&amp; Reward Rt+1"| A
> > ```
> >
> > ### Reward, Value, dan Aksi dalam Masalah Sekuensial
> >
> > **Reward** adalah umpan balik langsung pada satu langkah, sedangkan **value** adalah prediksi total reward yang diharapkan di masa depan jika mulai dari suatu state. Tujuan agent bukan memaksimalkan reward sesaat melainkan **memaksimalkan value**. Konsekuensinya, **aksi memiliki konsekuensi jangka panjang dan reward bisa tertunda**, sehingga **kadang lebih baik mengorbankan reward langsung demi reward jangka panjang yang lebih besar**.
> >
> > Beberapa contoh menggambarkan prinsip ini: (a) **investasi finansial** yang baru matang setelah berbulan-bulan; (b) **mengisi bahan bakar helikopter** yang mungkin mencegah kecelakaan beberapa jam kemudian; (c) **memblokir gerakan lawan** yang baru terbukti menguntungkan banyak langkah ke depan. **Action value** memperluas konsep value menjadi nilai dari mengambil aksi tertentu di state tertentu — inilah yang nantinya direpresentasikan sebagai Q(s, a).
> >
> > ### Komponen Internal Agent
> >
> > Sebuah agent dapat memiliki tiga komponen utama. **Policy** adalah **pemetaan dari state ke aksi** — strategi yang menentukan apa yang dilakukan agent di setiap situasi. **Value function** memprediksi seberapa baik suatu state atau pasangan state-aksi dalam jangka panjang. **Model** adalah representasi internal agent tentang bagaimana environment berperilaku, yaitu prediksi state berikutnya dan reward berikutnya.
> >
> > ### Contoh MAZE
> >
> > Contoh **MAZE (labirin)** mengilustrasikan ketiga komponen. **Policy** ditampilkan sebagai panah arah di tiap sel yang menunjukkan aksi yang dipilih untuk mencapai tujuan. **Value function** menampilkan angka pada tiap sel yang menyatakan ekspektasi total reward (mis. jarak negatif ke goal) sehingga sel dekat tujuan bernilai lebih tinggi. **Model** merepresentasikan pemahaman agent tentang dinamika labirin — kemana ia berpindah dan reward apa yang diterima saat bergerak dari satu sel ke sel lain.
> >
> > ### Exploration vs Exploitation
> >
> > Karena agent **belajar lewat trial and error**, ia menghadapi dilema mendasar. Agent harus **menemukan policy yang baik dari pengalaman baru tanpa terlalu banyak mengorbankan reward sepanjang prosesnya**. **Exploration** berarti mencari informasi baru, sedangkan **exploitation** berarti memanfaatkan informasi yang sudah diketahui untuk memaksimalkan reward. Keduanya penting dan harus diseimbangkan — masalah ini **tidak muncul pada supervised learning**. Contohnya: **memilih restoran** (datang ke favorit vs mencoba yang baru), **pengeboran minyak** (mengebor di lokasi terbaik yang diketahui vs lokasi baru), dan **bermain game** (memainkan langkah yang diyakini terbaik vs mencoba strategi baru).

> [!cornell] #### Summary
>
> Sistem RL bertumpu pada tiga konsep inti — **Environment**, **Reward Signal**, dan **Agent** — di mana agent dapat memiliki **agent state, policy, value function, dan model**. Interaksi terjadi dalam **loop tiap langkah t**: agent menerima **observasi Ot dan reward Rt** lalu mengeksekusi **aksi At**, sementara environment merespons dengan **Ot+1 dan Rt+1**. Tujuan agent adalah **memaksimalkan value** (total reward masa depan), bukan reward sesaat, sehingga **aksi punya konsekuensi jangka panjang** dan kadang **reward langsung dikorbankan**. Komponen agent meliputi **policy (state→aksi)**, **value function**, dan **model**, seperti diilustrasikan pada contoh **MAZE**. Agent juga harus menyeimbangkan **exploration** (mencari info baru) dan **exploitation** (memanfaatkan info yang diketahui).

> [!ad-libitum]- Additional Information
>
> #### Observability: MDP vs POMDP
> Ketika observasi Ot sepenuhnya mencerminkan state environment (Ot = St), masalahnya **fully observable** dan dimodelkan sebagai **Markov Decision Process (MDP)**. Jika observasi hanya parsial, masalahnya menjadi **Partially Observable MDP (POMDP)** dan agent perlu membangun *agent state* sendiri (mis. lewat memori atau RNN) untuk merangkum riwayat.
>
> #### Strategi Praktis Exploration
> Teknik umum menyeimbangkan exploration-exploitation meliputi **ε-greedy** (memilih aksi acak dengan probabilitas ε), **softmax/Boltzmann**, **optimistic initialization**, dan **Upper Confidence Bound (UCB)**. Pada deep RL, eksplorasi terarah seperti *intrinsic motivation* dan *curiosity* membantu di lingkungan dengan reward jarang (sparse).
>
> #### Proyek Eksplorasi Mandiri
> 1. Implementasikan grid maze sederhana dan visualisasikan policy serta value function setelah beberapa episode.
> 2. Bandingkan total reward antara strategi ε-greedy dengan nilai ε berbeda (0.01, 0.1, 0.3) pada masalah multi-armed bandit.
> 3. Eksperimen mengubah magnitude reward tertunda dan amati bagaimana agent menukar reward langsung dengan reward jangka panjang.
>
> #### Bacaan Lanjutan
> - Sutton, R. S., & Barto, A. G. (2018). *Reinforcement Learning: An Introduction* (Bab 1-3).
> - [The Multi-Armed Bandit Problem — Lilian Weng](https://lilianweng.github.io/posts/2018-01-23-multi-armed-bandit/)
> - David Silver, *RL Course — Lecture 1: Introduction to RL*.
