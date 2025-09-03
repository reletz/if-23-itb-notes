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
> > - Apa definisi Agent?
> >     
> > - Bagaimana hubungan Agent & Lingkungan?
> >     
> > - Apa itu Sensor & Actuator?
> >     
> > - Contoh-contoh Agent?
> >     
> > - Bagaimana cara memodelkan dunia Agent?
> >     
> > - Apa tujuan dari Desain Agent?
> >     
> > - Apa itu Agent Rasional?
> >     
> > - Apa itu Ukuran Kinerja (Performance Measure)?
> >     
> > - Beda Rasionalitas vs. Kesempurnaan?
> >     
> > - Apa itu Rasionalitas Terbatas & PEAS?
> >     
> >
> > ## Reference Points
> >
> > - Modul: Intelligent Agent (IF3170)
> >     
> 
> > ### Definisi dan Konsep Dasar Agent
> >
> > **Agent** adalah segala sesuatu yang dapat **melihat (perceiving)** lingkungannya melalui **sensor** dan **bertindak (acting)** terhadap lingkungan tersebut melalui **aktuator**. Secara fundamental, agent adalah entitas komputasi yang dirancang untuk berperilaku secara **otonom** atau mandiri.
> >
> > **Analogi Sederhana:** Pikirkan sebuah robot penyedot debu otomatis.
> >
> > - **Agent:** Robot itu sendiri.
> >     
> > - **Lingkungan:** Lantai ruangan yang mungkin kotor atau bersih.
> >     
> > - **Sensor:** Sensor inframerah untuk mendeteksi dinding, sensor debu untuk mengetahui apakah area di bawahnya kotor.
> >     
> > - **Aktuator:** Roda untuk bergerak dan motor penyedot untuk membersihkan.
> >     
> >
> > ### Interaksi Agent dan Lingkungan
> >
> > Interaksi ini adalah sebuah siklus yang berkelanjutan:
> >
> > 1. **Percepts:** Agent menerima masukan atau data dari lingkungan melalui **sensor**-nya. Kumpulan data yang diterima pada satu waktu disebut _percept_.
> > 2. **Actions:** Agent melakukan tindakan yang telah diputuskan menggunakan **aktuator**-nya, yang kemudian mengubah keadaan lingkungan.
> >     
> >
> > ### Contoh-contoh Agent, Sensor, dan Aktuator
> >|**Agent**|**Sensor (Input)**|**Aktuator (Output)**|
> > | :--- | :--- | :--- |
> > |**Manusia**|Mata, telinga, hidung, kulit|Tangan, kaki, mulut, otot|
> > |**Robot Penyelesai Rubik**|Kamera Raspberry Pi (untuk membaca warna kubus)|Motor Pivot (untuk memutar), Motor Shuffler (untuk menggeser)|
> > |**Program Belanja Web**|Halaman web (HTML), data produk, input pengguna|Klik mouse (simulasi), pengisian formulir, request HTTP|
> > |**Pabrik Otomatis**|Sensor suhu, sensor tekanan, kamera pengawas|Lengan robot, katup, ban berjalan|
> >
> > ### Model Dunia Agent dan Desain Agent
> >
> > Untuk merancang agent secara formal, kita perlu memodelkan dunianya:
> >
> > - **Percept Space:** Seluruh kemungkinan _percept_ yang bisa diterima agent.
> >     
> > - **Action Space:** Seluruh kemungkinan _action_ yang bisa dilakukan agent.
> >     
> > - **Internal State (S):** Representasi internal agent tentang keadaan dunia.
> >     
> > - **World Dynamics ($S \times A \rightarrow S$):** Mendefinisikan bagaimana dunia berubah. Jika dunia berada dalam keadaan _S_ dan agent melakukan aksi _A_, dunia akan bertransisi ke keadaan baru.
> >     
> > ![[Pasted image 20250903075340.png]]
> > ![[Pasted image 20250903073418.png]]
> >
> > **Tujuan Desain Agent:**
> > 
> > Masalah utama dalam desain agent adalah menemukan pemetaan (fungsi) yang ideal dari urutan persepsi ($P^*$) ke sebuah aksi ($A$). Tujuannya adalah untuk memilih aksi yang akan memaksimalkan Fungsi Utilitas ($U$), yaitu sebuah ukuran seberapa "baik" atau "diinginkan" urutan keadaan dunia ($S$) yang dihasilkan.
> >
> > ### Agent Rasional (Rational Agent)
> >
> > Agent rasional adalah agent yang berusaha **melakukan hal yang benar (**_**do the right thing**_**)** berdasarkan apa yang ia persepsikan dan tindakan yang bisa ia lakukan.
> >
> > **Ukuran Kinerja (Performance Measure):**
> > 
> > "Hal yang benar" ini didefinisikan oleh Ukuran Kinerja, yang merupakan sebuah kriteria objektif untuk menilai keberhasilan perilaku agent. Agent dianggap rasional jika ia memilih tindakan yang diharapkan dapat memaksimalkan ukuran kinerjanya, berdasarkan bukti dari urutan persepsi yang telah diterima dan pengetahuan bawaan yang dimilikinya.
> >
> > **Rasionalitas BUKAN Kesempurnaan:**
> >
> > - Rasionalitas **bukanlah** _**Omniscience**_ (Maha Tahu). Agent tidak mengetahui hasil pasti dari tindakannya. Ia bekerja berdasarkan ekspektasi dari informasi yang ada.
> >     
> > - Rasionalitas **tidak menjamin** _**Success**_ (Kesuksesan). Bisa saja tindakan yang rasional secara ekspektasi ternyata menghasilkan outcome yang buruk.
> >     
> >
> > _Contoh:_ Anda melihat langit cerah (percept) dan memutuskan tidak membawa payung (action) untuk memaksimalkan kenyamanan (ukuran kinerja). Jika tiba-tiba hujan badai, keputusan Anda tetap rasional berdasarkan informasi yang ada, meskipun hasilnya tidak sukses.
> >
> > ### Rasionalitas Terbatas (Limited Rationality)
> >
> > Dalam praktiknya, agent memiliki **keterbatasan komputasi** (waktu dan memori). Oleh karena itu, agent beroperasi dalam _rasionalitas terbatas_. Tujuannya tetap sama: memaksimalkan fungsi utilitas, namun kini **dibatasi oleh kendala komputasi** yang ada.
> >
> > Kerangka kerja yang umum digunakan untuk mendefinisikan masalah bagi agent rasional adalah **PEAS**:
> >
> > - **P**erformance (Ukuran Kinerja)
> >     
> > - **E**nvironment (Lingkungan)
> >     
> > - **A**ctuators (Aktuator)
> >     
> > - **S**ensors (Sensor)
> >     

> [!cornell] #### Summary
> Agent adalah entitas otonom yang berinteraksi dengan lingkungannya melalui siklus persepsi (menggunakan sensor) dan aksi (menggunakan aktuator). Tujuan dari perancangan agent adalah untuk memetakan urutan persepsi ke aksi yang dapat memaksimalkan ukuran kinerja objektif (Fungsi Utilitas), yang mendefinisikan perilaku rasional. Namun, rasionalitas ini tidak berarti maha tahu atau jaminan kesuksesan, melainkan tindakan terbaik berdasarkan informasi yang tersedia dan seringkali dibatasi oleh kendala komputasi (rasionalitas terbatas).

> [!ad-libitum]- Additional Information
> 
> #### Fungsi Agent vs. Program Agent
> 
> Penting untuk membedakan dua hal ini:
> 
> - **Fungsi Agent:** Ini adalah konsep **abstrak matematis** yang memetakan setiap urutan persepsi (P∗) ke sebuah aksi (A). f:P∗rightarrowA. Ini adalah deskripsi ideal dari perilaku agent.
>     
> - **Program Agent:** Ini adalah **implementasi konkret** yang berjalan pada arsitektur fisik (misalnya, komputer atau robot). Program ini yang menjalankan fungsi agent tersebut.
>     
> 
> #### Detail Matematis: World Dynamics & Utility Function
> 
> - **World Dynamics (**StimesArightarrowS**):** Notasi ini adalah inti dari pemodelan lingkungan. Artinya, jika kita tahu keadaan dunia saat ini (_S_) dan aksi (_A_) yang diambil oleh agent, kita dapat memprediksi keadaan dunia selanjutnya. Dalam dunia nyata, fungsi ini sering bersifat probabilistik (tidak pasti).
>     
> - **Utility Function (U):** Fungsi ini memberikan **nilai numerik** untuk setiap urutan keadaan dunia. Agent yang rasional akan selalu mencoba bertindak sedemikian rupa sehingga urutan keadaan yang dihasilkannya memiliki nilai utilitas yang paling tinggi. Misalnya, dalam catur, keadaan "menang" memiliki utilitas +1, "kalah" -1, dan "seri" 0.
>     
> 
> #### Eksplorasi Mandiri: Analisis PEAS
> 
> Coba definisikan kerangka **PEAS** untuk agent-agent berikut untuk memperdalam pemahaman:
> 
> 1. **Mobil Self-Driving:**
>     
>     - **Performance:** Keamanan (tidak ada kecelakaan), kecepatan, kenyamanan penumpang, efisiensi bahan bakar.
>         
>     - **Environment:** Jalan raya, lalu lintas, pejalan kaki, marka jalan, cuaca.
>         
>     - **Actuators:** Setir, pedal gas, rem, lampu sein, klakson.
>         
>     - **Sensors:** Kamera, LiDAR, radar, GPS, odometer.
>         
> 2. **Filter Email Spam:**
>     
>     - **Performance:** Meminimalkan email spam di inbox (presisi tinggi), meminimalkan email non-spam yang masuk ke folder spam (recall tinggi).
>         
>     - **Environment:** Server email, akun pengguna, email yang masuk.
>         
>     - **Actuators:** Menandai email sebagai spam, memindahkannya ke folder spam.
>         
>     - **Sensors:** Penganalisis konten email (header, pengirim, isi teks).
>         
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Buku Teks:** "Artificial Intelligence: A Modern Approach" oleh Stuart Russell dan Peter Norvig. Bab 2 dari buku ini adalah sumber definitif dan pembahasan yang jauh lebih mendalam untuk semua konsep yang disajikan di modul ini.
>     
> - **Tools & Software:** Cobalah untuk mengimplementasikan agent sederhana, seperti _simple reflex agent_ untuk vacuum-cleaner world, menggunakan bahasa pemrograman Python untuk melihat bagaimana konsep ini diwujudkan dalam kode.
>