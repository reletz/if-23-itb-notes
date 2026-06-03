---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3141 Sistem Informasi]]

> [!cornell] Usability Testing
>
> > ## Questions/Cues
> >
> > - Apa itu usability testing dan apa tujuannya?
> > - Apa empat metrik usability (time, accuracy, recall, emotional response)?
> > - Apa yang BUKAN usability testing?
> > - Apa itu think-aloud protocol dan eye tracking?
> > - Apa itu hallway testing, aturan Nielsen 5 user, dan model U=1-(1-p)^n?
> >
> > ## Reference Points
> >
> > - IF3141 Sistem Informasi — System Testing (Slides 28-45)
>
> > ### Definisi dan Tujuan Usability Testing
> >
> > **Usability testing** adalah teknik yang digunakan dalam desain. Ini adalah cara bagi desainer untuk **memperbaiki produk dengan mengukur usability**-nya, atau **user-friendliness** (keramahan pengguna). Produk dapat berupa objek buatan manusia (halaman web, antarmuka komputer, dokumen, atau perangkat) untuk **tujuan yang dimaksudkan (intended purpose)**-nya.
> >
> > Jika usability testing mengungkap kesulitan — seperti orang sulit memahami instruksi, memanipulasi bagian, atau menafsirkan feedback — maka developer harus **memperbaiki desain dan mengujinya lagi (iteratif)**. Selama usability testing, tujuannya adalah **mengamati orang menggunakan produk dalam situasi serealistis mungkin** untuk menemukan error dan area perbaikan.
> >
> > ### Empat Metrik Usability
> >
> > Usability testing umumnya mengukur seberapa baik subjek uji merespons di **empat area**, dan hasil tes pertama dapat diperlakukan sebagai **baseline/control** untuk perbandingan tes berikutnya:
> >
> > - **Time on Task** — Berapa lama orang menyelesaikan tugas dasar? (Misalnya menemukan barang untuk dibeli, membuat akun baru, dan memesan barang.)
> > - **Accuracy** — Berapa banyak kesalahan yang dibuat orang? (Apakah fatal atau dapat dipulihkan dengan informasi yang tepat?)
> > - **Recall** — Berapa banyak yang diingat seseorang setelahnya atau setelah periode tidak digunakan?
> > - **Emotional Response** — Bagaimana perasaan orang terhadap tugas yang diselesaikan? (Percaya diri? Stres? Apakah akan merekomendasikan sistem ini ke teman?)
> >
> > ```mermaid
> > mindmap
> >   root(("Usability<br/>Metrics"))
> >     T["Time on Task<br/>seberapa cepat"]
> >     A["Accuracy<br/>jumlah kesalahan"]
> >     R["Recall<br/>seberapa diingat"]
> >     E["Emotional Response<br/>perasaan pengguna"]
> > ```
> >
> > Empat metrik usability; tes pertama menjadi baseline untuk perbandingan tes berikutnya.
> >
> > ### Apa yang BUKAN Usability Testing
> >
> > Sekadar **mengumpulkan opini** tentang sebuah objek/dokumen adalah **market research, bukan usability testing**. Usability testing biasanya melibatkan **eksperimen terkontrol** untuk menentukan seberapa baik orang dapat menggunakan produk.
> >
> > Alih-alih menunjukkan draf kasar dan bertanya "Apakah Anda memahami ini?", usability testing melibatkan **mengamati orang mencoba menggunakan sesuatu untuk tujuan yang dimaksud**. Contoh: saat menguji instruksi perakitan mainan, subjek uji diberi instruksi dan sekotak komponen — frasa instruksi, kualitas ilustrasi, dan desain mainan semua memengaruhi proses perakitan.
> >
> > ### Metode Usability Testing
> >
> > Menyiapkan usability test melibatkan **membuat skenario (scenario)** realistis di mana orang melakukan daftar tugas menggunakan produk yang diuji sementara **observer mengamati dan mencatat**. Instrumen lain seperti **scripted instructions**, **paper prototypes**, dan **kuesioner pra/pasca-tes** juga digunakan untuk mengumpulkan feedback. Contoh: untuk menguji fungsi attachment program e-mail, skenario menggambarkan situasi seseorang perlu mengirim attachment dan diminta melakukan tugas tersebut. Teknik populer untuk mengumpulkan data: **think aloud protocol** dan **eye tracking**.
> >
> > **Think Aloud Protocol** — Melibatkan partisipan **berpikir keras (thinking aloud)** sambil melakukan tugas yang ditentukan. Pengguna diminta mengatakan apa pun yang mereka lihat, pikirkan, lakukan, dan rasakan saat menjalankan tugas. Ini memungkinkan observer melihat langsung **proses penyelesaian tugas** (bukan hanya produk akhirnya). Observer diminta mencatat secara **objektif** semua yang dikatakan pengguna **tanpa berusaha menafsirkan**. Sesi sering direkam audio dan video agar developer dapat merujuk kembali. Tujuannya **membuat eksplisit apa yang implisit** pada subjek yang mampu melakukan tugas.
> >
> > **Eye Tracking** — Proses mengukur **point of gaze** ("ke mana kita melihat") atau gerakan mata relatif terhadap kepala. **Eye tracker** adalah perangkat untuk mengukur posisi dan gerakan mata. Desain yang paling banyak digunakan saat ini adalah **video-based eye tracker** — kamera difokuskan pada satu/dua mata dan merekam gerakannya saat penonton melihat suatu stimulus.
> >
> > ### Hallway Usability Testing & Model Nielsen
> >
> > **Hallway usability testing** adalah metodologi spesifik di mana, alih-alih kelompok tester terlatih in-house, hanya **lima hingga enam orang acak (random people)** dibawa untuk menguji software. Teorinya, diadopsi dari riset **Jakob Nielsen**, adalah bahwa **95%** masalah usability dapat ditemukan dengan teknik ini.
> >
> > Pada awal 1990-an, Nielsen mempopulerkan konsep menggunakan banyak tes usability kecil — biasanya hanya **lima subjek tiap tes** — pada berbagai tahap pengembangan. Argumennya: begitu ditemukan dua-tiga orang benar-benar bingung dengan home page, sedikit yang didapat dari menonton lebih banyak orang menderita pada desain cacat yang sama.
> >
> > Klaim **"Five users is enough"** kemudian dijelaskan dengan model matematis untuk proporsi masalah yang terungkap U:
> >
> > `U = 1 − (1 − p)^n`
> >
> > di mana **p** adalah probabilitas satu subjek mengidentifikasi suatu masalah spesifik dan **n** adalah jumlah subjek. Model ini muncul sebagai **grafik asimptotik** menuju jumlah masalah nyata yang ada.
> >
> > **Dua Tantangan Kunci**: (1) Karena usability terkait dengan **set pengguna spesifik**, sampel sekecil itu kemungkinan **tidak representatif** terhadap populasi total, sehingga data lebih mencerminkan kelompok sampel daripada populasi. (2) Banyak masalah usability dalam pengujian cenderung **mencegah terungkapnya masalah lain**, membuat mustahil memprediksi persentase masalah yang dapat diungkap tanpa mengetahui hubungan antar-masalah yang ada. Karena itu sebagian besar peneliti kini sepakat bahwa meski 5 user menghasilkan banyak data, **banyak aplikasi memerlukan sampel lebih dari lima** — yang dapat dibagi menjadi tes-tes kecil dengan lima user masing-masing.

> [!cornell] #### Summary
>
> **Usability testing** mengukur **user-friendliness** produk untuk tujuan yang dimaksud melalui **eksperimen terkontrol** (bukan sekadar mengumpulkan opini = market research), dengan mengamati pengguna nyata secara iteratif. Empat metriknya: **Time on Task, Accuracy, Recall, dan Emotional Response**, dengan tes pertama sebagai baseline. Metodenya membangun **skenario** realistis plus scripted instructions, paper prototype, dan kuesioner; data dikumpulkan via **think-aloud protocol** (pengguna verbalisasi pikiran, observer mencatat objektif) dan **eye tracking** (mengukur point of gaze). **Hallway testing** memakai 5-6 orang acak; riset **Nielsen** mengklaim ~95% masalah terungkap dengan lima user, dimodelkan **U = 1 − (1 − p)^n** (asimptotik). Namun **dua tantangan** — sampel kecil tak representatif dan masalah saling menutupi — membuat banyak aplikasi tetap butuh lebih dari lima user.

> [!ad-libitum]- Additional Information
>
> #### UX vs Usability
>
> Usability (kemudahan penggunaan) adalah bagian dari **User Experience (UX)** yang lebih luas. Nielsen merumuskan lima komponen usability: **Learnability, Efficiency, Memorability, Errors, dan Satisfaction** — selaras dengan metrik time/accuracy/recall/emotional response.
>
> #### Metode Evaluasi Terkait
>
> - **Heuristic evaluation** — pakar menilai UI terhadap 10 heuristik Nielsen
> - **Cognitive walkthrough** — evaluasi langkah demi langkah dari sudut pandang pengguna baru
> - **A/B testing** — perbandingan kuantitatif dua varian dengan pengguna nyata
> - **SUS (System Usability Scale)** — kuesioner 10 item untuk skor usability
>
> #### Tools
>
> - **Hotjar, Crazy Egg** — heatmap & rekaman sesi
> - **Tobii, Gazepoint** — eye tracker video-based
> - **Maze, UserTesting, Lookback** — remote usability testing
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Jalankan hallway test dengan 5 partisipan pada prototipe dan hitung U dengan asumsi p tertentu.
> 2. Lakukan sesi think-aloud terekam dan susun daftar masalah usability dengan severity rating.
> 3. Bandingkan dua desain home page memakai SUS dan uji signifikansinya.
>
> #### Bacaan Lanjutan
>
> - Nielsen, J. *Usability Engineering*. Morgan Kaufmann.
> - Krug, S. *Don't Make Me Think*. New Riders.
> - Rubin, J. & Chisnell, D. *Handbook of Usability Testing*. Wiley.
