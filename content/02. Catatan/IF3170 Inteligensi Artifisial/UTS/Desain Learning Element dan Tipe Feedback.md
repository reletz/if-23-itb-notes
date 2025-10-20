---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3170 Inteligensi Artifisial]]

> [!cornell] Topic: Desain Elemen Pembelajaran dan Tipe Umpan Balik
> 
> > ## Questions/Cues
> > 
> > - Apa 4 pertimbangan utama dalam merancang _Learning Element_?
> >     
> > - Apa itu _Supervised Learning_?
> >     
> > - Apa contoh _Supervised Learning_ pada agen supir taksi?
> >     
> > - Apa itu _Unsupervised Learning_?
> >     
> > - Apa contoh _Unsupervised Learning_ pada agen supir taksi?
> >     
> > - Apa itu _Reinforcement Learning_?
> >     
> > - Apa contoh _Reinforcement Learning_ pada agen supir taksi?
> >     
> > - Apa perbedaan utama ketiganya?
> >     
> > 
> > ## Reference Points
> > 
> > - IF3170 - Materi 08 - Seg 01, Slide 7-9
> >     
> > - Russell, S. J., & Norvig, P. (2010). Artificial Intelligence- A Modern Approach.
> >     
> 
> > ### Desain Elemen Pembelajaran (Learning Element)
> > 
> > 
> > Merancang _Learning Element_ yang efektif memerlukan empat keputusan desain utama. Keputusan ini menentukan bagaimana agen akan belajar dari lingkungannya.
> > 
> > 1. **Komponen mana yang akan dipelajari?**
> >     
> >     - Kita harus menentukan bagian mana dari _Performance Element_ yang akan dimodifikasi. Apakah agen akan belajar aturan baru, cara memetakan kondisi ke aksi, atau cara memprediksi hasil dari sebuah aksi?
> >         
> > 2. **Umpan balik (feedback) apa yang tersedia?**
> >     
> >     - Jenis dan ketersediaan umpan balik sangat menentukan pendekatan belajar yang bisa digunakan. Apakah ada "guru" yang memberikan jawaban benar? Ataukah agen hanya menerima sinyal "sukses" atau "gagal" di akhir? Ataukah tidak ada umpan balik sama sekali?
> >         
> > 3. **Representasi apa yang digunakan?**
> >     
> >     - Kita harus memilih cara untuk merepresentasikan pengetahuan atau komponen yang sedang dipelajari. Pilihan representasi bisa berupa aturan logika, jaringan saraf tiruan, fungsi probabilitas, atau pohon keputusan (_decision tree_). Pilihan ini akan membatasi apa yang bisa dipelajari oleh agen.
> >         
> > 4. **Pengetahuan awal (prior knowledge) apa yang tersedia?**
> >     
> >     - Apakah agen memulai dari nol (_tabula rasa_), atau kita memberikannya beberapa pengetahuan dasar untuk mempercepat proses belajar? Pengetahuan awal dapat secara signifikan membantu agen belajar lebih cepat dan lebih akurat.
> >         
> > 
> > ### Contoh Kasus: Agen Supir Taksi
> > 
> > Mari kita gunakan contoh agen supir taksi untuk memahami bagaimana berbagai jenis umpan balik bekerja dalam praktik.
> > 
> > - **Tugas: Keputusan Mengerem (Brake Decision)**
> >     
> >     - **Umpan Balik**: Seorang instruktur di sampingnya berteriak "REM!" setiap kali ada bahaya.
> >         
> >     - **Jenis Belajar**: Ini adalah **Supervised Learning**. Agen diberikan pasangan input (situasi di jalan) dan output yang benar (mengerem atau tidak).
> >         
> > - **Tugas: Mengenali Bus (Buses Recognition)**
> >     
> >     - **Umpan Balik**: Diberikan sekumpulan gambar, lalu seorang manusia melabeli mana yang gambar bus dan mana yang bukan.
> >         
> >     - **Jenis Belajar**: Ini juga **Supervised Learning**. Agen belajar fungsi pemetaan dari input (gambar) ke output (label 'bus' atau 'bukan bus').
> >         
> > - **Tugas: Mengenali Hari Macet/Lancar (Good/Bad Traffic Day)**
> >     
> >     - **Umpan Balik**: Tidak ada umpan balik langsung. Agen hanya mengamati pola lalu lintas (kecepatan rata-rata, jumlah mobil, dll) dari hari ke hari dan harus menyimpulkan sendiri konsep "hari macet" dan "hari lancar".
> >         
> >     - **Jenis Belajar**: Ini adalah **Unsupervised Learning**. Agen harus menemukan struktur atau pola tersembunyi dalam data tanpa label.
> >         
> > - **Tugas: Mengenali Perilaku Mengemudi yang Disukai Penumpang**
> >     
> >     - **Umpan Balik**: Di akhir perjalanan, penumpang memberikan tip (atau tidak memberikan tip). Tip ini adalah sinyal positif (reward).
> >         
> >     - **Jenis Belajar**: Ini adalah **Reinforcement Learning**. Agen tidak diberi tahu aksi mana yang salah/benar secara spesifik, tetapi ia menerima sinyal umpan balik (reward/punishment) setelah serangkaian aksi. Tugas agen adalah mencari tahu urutan aksi mana yang menghasilkan reward terbaik.
> >         
> > 
> > ### Tipe Pembelajaran Berdasarkan Umpan Balik
> > 
> > 1. **Supervised Learning (Pembelajaran Terawasi)**
> >     
> >     - **Definisi**: Agen belajar dari sekumpulan contoh data yang sudah diberi label dengan benar (pasangan input-output). Tujuannya adalah untuk mempelajari sebuah fungsi `f` yang dapat memetakan input `x` ke output `y` (`y = f(x)`).
> >         
> >     - **Analogi**: Belajar dengan seorang guru yang selalu memberikan kunci jawaban.
> >         
> > 2. **Unsupervised Learning (Pembelajaran Tak Terawasi)**
> >     
> >     - **Definisi**: Agen belajar dari sekumpulan data yang tidak memiliki label. Tujuannya adalah untuk menemukan pola, struktur, atau klaster yang menarik dalam data.
> >         
> >     - **Analogi**: Menganalisis data pelanggan dan menemukan sendiri grup-grup pelanggan (misalnya "pembeli hemat", "pembeli loyal") tanpa diberi tahu kategori tersebut sebelumnya.
> >         
> > 3. **Reinforcement Learning (Pembelajaran Penguatan)**
> >     
> >     - **Definisi**: Agen belajar melalui interaksi dengan lingkungannya. Agen menerima **rewards** (penghargaan) untuk aksi yang baik dan **punishments** (hukuman) untuk aksi yang buruk. Tujuannya adalah untuk mempelajari sebuah kebijakan (_policy_)—yaitu strategi tindakan—yang memaksimalkan total reward yang diterima dari waktu ke waktu.
> >         
> >     - **Analogi**: Melatih seekor anjing. Kita tidak memberitahu "gerakkan kaki kirimu 3 cm ke depan", tetapi kita memberikan hadiah saat ia berhasil melakukan trik yang kita inginkan.
> >         

> [!cornell] #### Summary
> 
> Desain sebuah elemen pembelajaran bergantung pada empat faktor kunci: komponen apa yang dipelajari, umpan balik apa yang tersedia, representasi pengetahuan yang digunakan, dan pengetahuan awal yang dimiliki. Jenis umpan balik ini mengkategorikan proses belajar menjadi tiga tipe utama: _**Supervised Learning**_ (belajar dari contoh berlabel), _**Unsupervised Learning**_ (menemukan pola pada data tak berlabel), dan _**Reinforcement Learning**_ (belajar dari sinyal penghargaan dan hukuman untuk memaksimalkan hasil jangka panjang).

> [!ad-libitum]- Additional Information
> 
> #### Kapan Menggunakan Setiap Tipe Pembelajaran?
> 
> - **Gunakan Supervised Learning ketika**: Anda memiliki akses ke data historis yang bersih dan berlabel dengan baik, dan Anda memiliki tujuan prediksi yang jelas. Contoh: prediksi harga rumah, klasifikasi email spam, pengenalan wajah.
>     
> - **Gunakan Unsupervised Learning ketika**: Anda tidak memiliki data berlabel dan ingin memahami data Anda lebih dalam. Contoh: segmentasi pasar, deteksi anomali (misalnya transaksi kartu kredit mencurigakan), sistem rekomendasi.
>     
> - **Gunakan Reinforcement Learning ketika**: Masalah yang dihadapi melibatkan serangkaian keputusan dari waktu ke waktu dan umpan balik tidak datang secara langsung setelah setiap aksi. Contoh: robotika (belajar berjalan), game (catur, Go), manajemen portofolio saham, optimalisasi rute pengiriman.
>     
> 
> #### Tantangan dalam Reinforcement Learning: _Credit Assignment Problem_
> 
> Salah satu tantangan terbesar dalam _Reinforcement Learning_ adalah _Credit Assignment Problem_. Bayangkan agen catur melakukan 50 langkah dan akhirnya menang. Langkah mana dari ke-50 langkah tersebut yang paling berkontribusi pada kemenangan? Apakah langkah ke-5, ke-32, atau kombinasi dari semuanya? Menentukan aksi mana yang pantas mendapatkan "kredit" (reward) adalah masalah yang sangat sulit, terutama ketika umpan balik baru diterima jauh setelah aksi dilakukan.
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Video**: MIT 6.S191: Deep Reinforcement Learning - Memberikan intuisi visual yang bagus tentang bagaimana RL bekerja.
>     
> - **Artikel**: "A Gentle Introduction to Reinforcement Learning" oleh Ankur A. Patel.
>