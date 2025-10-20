---
type: Note
cssclasses:
- cornell-notes
---


_Back to_ [[IF3170 Inteligensi Artifisial]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> >
> > - Apa itu PEAS?
> >     
> > - Contoh PEAS untuk Taksi & Medis?
> >     
> > - Apa saja properti Lingkungan Tugas?
> >     
> > - Perbedaan properti lingkungan?
> >     
> > - Apa saja tipe-tipe struktur Agent?
> >     
> > - Bagaimana Simple Reflex Agent bekerja?
> >     
> > - Apa kelebihan Model-based Agent?
> >     
> > - Apa peran tujuan (Goal)?
> >     
> > - Kapan Utility-based Agent digunakan?
> >     
> > - Bagaimana Learning Agent berkembang?
> >     
> > - Contoh level agent di Wumpus World?
> >     
> >
> > ## Reference Points
> >
> > - Modul: Intelligent Agent - Agent Types (IF3170)
> >     
> 
> > ### Kerangka Kerja PEAS
> >
> > **PEAS** adalah sebuah kerangka kerja (framework) yang digunakan untuk merumuskan masalah bagi seorang agent. Ini membantu kita mendefinisikan tugas agent dengan jelas. PEAS adalah singkatan dari:
> >
> > - **P**erformance Measure (Ukuran Kinerja): Apa kriteria kesuksesan? Bagaimana kita mengukur keberhasilan agent?
> >     
> > - **E**nvironment (Lingkungan): Di mana agent beroperasi? Apa saja kondisi eksternalnya?
> >     
> > - **A**ctuators (Aktuator): Perangkat apa yang dimiliki agent untuk bertindak di lingkungan?
> >     
> > - **S**ensors (Sensor): Perangkat apa yang dimiliki agent untuk merasakan/mengamati lingkungan?
> >     
> >
> > ### Contoh Analisis PEAS
> >
> > |**Agent**|**Performance**|**Environment**|**Actuators**|**Sensors**|
> > | :--- | :--- | :--- |:--- | :--- |
> > |**Taksi Otomatis**|Aman, cepat, legal, nyaman, memaksimalkan profit|Jalan, lalu lintas lain, pejalan kaki, pelanggan|Setir, gas, rem, sinyal, klakson|Kamera, sonar, GPS, speedometer, keyboard|
> > |**Sistem Diagnosis Medis**|Pasien sehat, biaya minimal, menghindari tuntutan hukum|Pasien, rumah sakit, staf medis|Tampilan layar (pertanyaan, tes, diagnosis)|Keyboard (untuk memasukkan gejala, temuan)|
> >
> > ### Lingkungan Tugas (Task Environments)
> >
> > Lingkungan tempat agent beroperasi dapat diklasifikasikan berdasarkan beberapa properti utama. Properti ini sangat menentukan desain agent yang paling cocok.
> >
> > - **Fully vs Partially Observable**: Jika sensor agent dapat mengakses keadaan **lengkap** lingkungan pada setiap waktu, maka lingkungan itu _fully observable_. Jika tidak (misalnya, ada informasi tersembunyi), maka _partially observable_.
> >     
> > - **Deterministic vs Stochastic**: Jika keadaan lingkungan **selanjutnya** sepenuhnya ditentukan oleh keadaan **sekarang** dan aksi agent, maka lingkungan itu _deterministic_. Jika ada unsur ketidakpastian atau keacakan, maka _stochastic_ (probabilistik).
> >     
> > - **Episodic vs Sequential**: Dalam lingkungan _episodic_, pengalaman agent dibagi menjadi episode-episode atomik. Pilihan aksi di satu episode tidak memengaruhi episode berikutnya. Dalam lingkungan _sequential_, keputusan saat ini dapat memengaruhi semua keputusan di masa depan.
> >     
> > - **Static vs Dynamic**: Lingkungan disebut _dynamic_ jika dapat berubah saat agent sedang "berpikir" atau memproses. Jika lingkungan tidak berubah kecuali oleh aksi agent, maka disebut _static_. _Semidynamic_ berarti lingkungan tidak berubah seiring waktu, tetapi skor kinerja agent bisa berubah.
> >     
> > - **Discrete vs Continuous**: Jika ada jumlah persepsi (input/output) dan aksi yang terbatas dan terdefinisi dengan jelas, lingkungan itu _discrete_. Jika persepsi dan aksi berada dalam rentang nilai yang kontinu, maka _continuous_.
> >     
> > - **Single vs Multi-agent**: Apakah agent beroperasi sendiri (_single-agent_) atau ada agent lain di lingkungan yang juga bertindak (_multi-agent_)?
> > 
> > - **Known vs Unknown**: Jika agent familiar/tahu aturan akan lingkungannya, maka ia berada dalam lingkungan yang diketahui (_Known_). Sebaliknya pun berlaku.
> >
> >![[Pasted image 20250903083802.png]]
> >
> > ### Tipe-Tipe Struktur Agent
> >
> > Program agent menerjemahkan persepsi menjadi aksi. Ada beberapa tipe dasar program agent, dari yang paling sederhana hingga paling kompleks.
> >
> > 1. **Simple Reflex Agent**: Agent ini hanya bereaksi terhadap persepsi saat ini, mengabaikan riwayat persepsi. Mereka bekerja berdasarkan aturan **kondisi-aksi** (_condition-action rule_): "jika kondisi X, maka lakukan aksi Y". Cocok untuk lingkungan yang _fully observable_.
> >     
> > 2. **Model-based Reflex Agent**: Agent ini mampu menangani lingkungan yang _partially observable_. Mereka memelihara **model internal** atau representasi dari keadaan dunia yang tidak bisa dilihat saat ini. Model ini diperbarui berdasarkan riwayat persepsi dan aksi.
> >     
> > 3. **Goal-based Agent**: Selain memiliki model, agent ini memiliki informasi **tujuan (goal)**. Mereka memilih aksi yang akan membawa mereka lebih dekat ke tujuan tersebut. Ini memungkinkan fleksibilitas yang lebih besar; jika tujuan berubah, perilakunya juga berubah. Keputusan seringkali melibatkan _search_ dan _planning_.
> >     
> > 4. **Utility-based Agent**: Agent ini tidak hanya memiliki tujuan, tetapi juga **fungsi utilitas** yang mengukur tingkat "kebahagiaan" atau preferensi terhadap suatu keadaan. Ketika ada beberapa cara untuk mencapai tujuan, agent akan memilih cara yang memberikan utilitas tertinggi. Ini berguna ketika ada tujuan yang saling bertentangan atau ketika ada ketidakpastian.
> >     
> > 5. **Learning Agent**: Agent ini dapat beroperasi di lingkungan yang tidak diketahui dan menjadi lebih kompeten seiring berjalannya waktu. Terdiri dari empat komponen utama:
> >     
> >     - **Learning Element**: Bertanggung jawab untuk membuat perbaikan.
> >         
> >     - **Performance Element**: Bertanggung jawab untuk memilih aksi eksternal (ini adalah agent itu sendiri).
> >         
> >     - **Critic**: Memberikan umpan balik tentang seberapa baik kinerja agent.
> >         
> >     - **Problem Generator**: Menyarankan aksi eksplorasi yang akan menghasilkan pengalaman baru yang informatif.
> >         
> >
> > ### Level Agent dalam Wumpus World
> >
> > Wumpus World adalah sebuah gua yang terdiri dari kamar-kamar, berisi lubang (pit), Wumpus, dan emas. Ini adalah lingkungan pengujian klasik untuk agent.
> >
> > - **Level 1: Problem Solving Agent**: Agent ini memiliki peta lengkap gua (informasi semua state). Tugasnya adalah **mencari** jalur terpendek ke emas menggunakan algoritma pencarian seperti BFS, DFS, atau A*.
> >     
> > - **Level 2: Knowledge-based Agent**: Agent tidak memiliki peta. Ia hanya memiliki **pengetahuan dasar** (aturan), misalnya "jika ada hembusan angin (breeze), maka ada lubang di dekatnya". Agent menggunakan **penalaran (reasoning)** untuk menyimpulkan fakta baru dari apa yang ia persepsikan dan secara bertahap membangun pemahamannya tentang dunia. Solusinya dicari dengan _**premise deduction**_.
> >     
> > - **Level 3: Learning Agent**: Agent tidak memiliki peta maupun pengetahuan dasar. Ia **belajar** dari pengalaman. Dengan bermain berkali-kali (dan mungkin mati beberapa kali), agent mengumpulkan data observasi dan menggunakan algoritma pembelajaran (misalnya, _reinforcement learning_) untuk akhirnya mempelajari aturan dunia, seperti "kotak di sebelah lubang itu berangin". Setelah belajar, solusinya dicari dengan _**premise deduction**_.
> >     

> [!cornell] #### Summary
> Kerangka kerja PEAS digunakan untuk mendefinisikan masalah bagi seorang agent dengan jelas. Karakteristik lingkungan tugas (seperti observable, deterministic, static) sangat memengaruhi desain program agent yang dibutuhkan. Terdapat berbagai tipe struktur agent dengan kompleksitas yang meningkat, mulai dari Simple Reflex yang reaktif, Model-based yang memiliki state internal, Goal-based yang proaktif, Utility-based yang memaksimalkan kepuasan, hingga Learning Agent yang dapat beradaptasi dan meningkatkan kinerjanya melalui pengalaman.

> [!ad-libitum]- Additional Information
> 
> #### Lebih Jauh tentang Properti Lingkungan
> 
> - **Stochastic vs. Deterministic**: Perbedaan utamanya adalah pada **prediktabilitas**. Di dunia deterministik, jika Anda tahu aturannya, Anda bisa memprediksi masa depan dengan sempurna. Di dunia stochastic, bahkan jika Anda tahu aturannya (probabilitasnya), Anda tidak bisa memastikan hasilnya. Catur adalah deterministik, sementara permainan dadu adalah stochastic.
>     
> - **Static vs. Dynamic**: Contoh lingkungan statis adalah teka-teki silang; teka-teki itu tidak akan mengubah dirinya sendiri saat Anda berpikir. Mengemudi adalah contoh utama lingkungan dinamis; mobil lain terus bergerak bahkan saat Anda tidak melakukan apa-apa.
>     
> 
> #### Hubungan Antar Tipe Agent
> 
> Tipe-tipe agent ini bisa dilihat sebagai sebuah evolusi, di mana setiap tipe berikutnya menambahkan kapabilitas baru di atas tipe sebelumnya:
> 
> - Model-based = Simple Reflex + **Model Internal (State)**
>     
> - Goal-based = Model-based + **Tujuan (Goal)**
>     
> - Utility-based = Goal-based + **Fungsi Utilitas**
>     
> 
> Learning Agent adalah sebuah meta-tipe yang bisa diterapkan pada semua tipe di atas untuk memungkinkan mereka beradaptasi.
> 
> #### Eksplorasi Mandiri: Klasifikasi Lingkungan
> 
> Coba klasifikasikan lingkungan tugas untuk permainan-permainan berikut berdasarkan properti yang telah dibahas:
> 
> 1. **Catur:** Fully observable, deterministic, sequential, static, discrete, multi-agent.
>     
> 2. **Poker:** Partially observable (kartu lawan), stochastic (pembagian kartu), sequential, static, discrete, multi-agent.
>     
> 3. **Video Game Real-Time Strategy (RTS):** Partially observable ("kabut perang"), stochastic (tindakan lawan), sequential, dynamic, discrete (bisa diperdebatkan, cenderung ke arah continuous), multi-agent.
>