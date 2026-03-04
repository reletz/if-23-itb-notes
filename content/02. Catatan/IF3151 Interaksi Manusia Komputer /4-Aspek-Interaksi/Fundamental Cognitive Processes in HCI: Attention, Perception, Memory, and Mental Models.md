---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3151 Interaksi Manusia Komputer]]

> [!cornell] Fundamental Cognitive Processes in HCI: Attention, Perception, Memory, and Mental Models
>
> > ## Questions/Cues
> >
> > - Mengapa perhatian terbatas pada rangsangan tertentu?
> > - Bagaimana persepsi memengaruhi desain antarmuka visual?
> > - Apa perbedaan antara pengenalan dan recall dalam memori?
> > - Mengapa batasan memori jangka pendek penting bagi UI?
> > - Bagaimana mental model terbentuk melalui interaksi?
> >
> > ## Reference Points
> >
> > - Slide_01_Attention_Perception_Memory.pdf (Pages 5‑9)
> > - Slide_02_Mental_Models.pdf (Pages 34‑38)
> > - Lecture_03_Cognitive_Load.pptx (Slides 12‑18)
> > - Bergman_Whittaker_2016.pdf (Pages 2‑4)
>
> > ### Attention
> >
> > Perhatian adalah proses selektif yang memungkinkan pengguna menyorot sebagian kecil rangsangan di antara banyaknya stimulus yang masuk melalui indera visual dan auditori. Pada dasarnya, perhatian terbagi menjadi dua jenis utama: **perhatian terfokus** (focused attention) yang menitikberatkan pada satu objek atau area, dan **perhatian terbagi** (divided attention) yang memungkinkan pemrosesan simultan dari beberapa sumber informasi. Model klasik seperti *filter theory* (Broadbent, 1958) menjelaskan bahwa informasi yang tidak dipilih secara aktif akan disaring pada tahap awal pemrosesan, sehingga tidak mencapai memori jangka pendek. Dalam konteks HCI, hal ini berarti bahwa elemen‑elemen penting pada antarmuka harus dirancang agar menonjol secara visual—misalnya melalui kontras warna, batas (border), atau animasi singkat—sehingga pengguna secara otomatis mengarahkan perhatian mereka ke sana.
> >
> > Contoh praktis: pada sebuah situs e‑commerce, tombol “Add to Cart” biasanya diberi warna yang kontras dengan latar belakang serta ditempatkan pada posisi yang mudah dijangkau mata. Penelitian Tullis (1987) menunjukkan bahwa penataan informasi yang terkelompok (grouped) mengurangi waktu pencarian dibandingkan dengan penataan yang rapat tanpa pemisahan visual. Ini mengilustrasikan bahwa **spacing** dan **pengelompokan** (grouping) membantu otak memfilter dan memprioritaskan informasi, mengurangi beban kognitif pengguna.
> >
> > Dari perspektif desain, penting untuk menghindari **clutter** (kekacauan visual) yang dapat menghambat proses seleksi. Penggunaan *perceptual boundaries*—seperti kotak dialog, bayangan, atau perubahan ukuran font—menyediakan “petunjuk” visual yang memandu perhatian pengguna pada tahap‑tahap kritis dalam alur tugas. Selain itu, menyediakan opsi **switching** yang jelas (misalnya tab atau breadcrumb) membantu pengguna beralih fokus tanpa kehilangan konteks, yang sangat berguna pada tugas yang memerlukan perhatian bergantian.
> >
> > ### Perception
> >
> > Persepsi adalah proses transformasi rangsangan fisik menjadi pengalaman mental yang dapat dipahami. Pada tingkat paling dasar, persepsi visual melibatkan deteksi **kontras**, **warna**, **bentuk**, dan **gerakan**. Prinsip Gestalt—seperti *proximity*, *similarity*, dan *continuity*—menjelaskan bagaimana otak mengorganisir elemen‑elemen terpisah menjadi pola yang koheren. Dalam desain antarmuka, hal ini berarti bahwa ikon harus mudah dibedakan, teks harus legibel, dan elemen penting harus memiliki kontras warna yang cukup untuk dibaca oleh semua pengguna, termasuk mereka dengan defisiensi penglihatan warna.
> >
> > Contoh: penelitian Weller (2004) menemukan bahwa penggunaan **border** untuk mengelompokkan informasi mempercepat pencarian dibandingkan hanya mengandalkan kontras warna. Hal ini karena batas visual memberikan isyarat struktural yang lebih kuat bagi otak untuk memisahkan “kelompok” informasi. Sebaliknya, terlalu banyak **white space** dapat memperlambat pencarian bila pengguna kesulitan menemukan titik fokus utama, terutama pada layar kecil.
> >
> > Praktik terbaik meliputi: (1) memastikan rasio kontras warna minimal 4.5:1 untuk teks normal (WCAG 2.1), (2) menggunakan tipografi yang jelas dengan ukuran yang memadai, (3) menambahkan **audio feedback** yang dapat dibedakan (misalnya klik berbeda untuk aksi berhasil vs. gagal) untuk memperkaya kanal persepsi. Dengan mengoptimalkan saluran persepsi, desainer mengurangi kebutuhan pengguna untuk “menebak‑tebak” apa yang terjadi pada antarmuka.
> >
> > ### Memory
> >
> > Memori dalam HCI dapat dibagi menjadi tiga tahap utama: **encoding**, **storage**, dan **retrieval**. Pada tahap encoding, informasi yang diperoleh melalui perhatian dan persepsi diubah menjadi representasi mental. Semakin dalam proses *elaborative encoding* (misalnya dengan mengaitkan informasi baru dengan pengetahuan yang sudah ada), semakin kuat jejak memori yang terbentuk. Selanjutnya, **storage** dapat berupa memori jangka pendek (working memory) yang terbatas—biasanya 7 ± 2 item menurut Miller (1956)—atau memori jangka panjang yang lebih stabil.
> >
> > Perbedaan penting antara **recognition** (pengenalan) dan **recall** (pengingatan) memengaruhi cara antarmuka dirancang. Pengenalan memanfaatkan isyarat eksternal (seperti ikon, menu, atau daftar) sehingga pengguna hanya perlu mencocokkan apa yang mereka lihat dengan memori yang ada. Sebaliknya, recall menuntut pengguna mengingat secara internal, misalnya mengetik nama file secara tepat. Karena recall lebih menuntut beban kognitif, antarmuka modern cenderung memprioritaskan **recognition over recall**—misalnya dengan menampilkan riwayat pencarian, saran otomatis, atau thumbnail gambar.
> >
> > Contoh aplikasi: sistem manajemen kata sandi (seperti LastPass) mengurangi beban memori pengguna dengan menyimpan dan mengisi otomatis kredensial, sementara fitur **MFA** menambahkan lapisan keamanan tanpa menambah beban mengingat banyak kata sandi. Penelitian Henkel (2014) juga menunjukkan bahwa mengamati objek secara langsung menghasilkan ingatan yang lebih kuat dibandingkan melihat foto, menegaskan pentingnya **direct interaction** dalam proses belajar.
> >
> > Untuk mengurangi beban memori, desainer dapat (1) membatasi jumlah pilihan pada menu (idealnya ≤ 7), (2) menyediakan **visual cues** seperti ikon atau thumbnail, (3) memanfaatkan **hierarchical grouping** untuk mempermudah scanning, dan (4) menawarkan **search** atau **filter** yang dapat mempersempit ruang pencarian.
> >
> > ### Mental Models
> >
> > Model mental adalah representasi internal yang dibangun pengguna tentang cara kerja suatu sistem. Model ini terbentuk melalui **learning** (pembelajaran) dan **experience** (pengalaman) saat berinteraksi dengan antarmuka. Sebuah model mental yang akurat memungkinkan pengguna memprediksi konsekuensi tindakan, mengidentifikasi jalur penyelesaian masalah, dan mengembangkan strategi penggunaan yang efisien. Sebaliknya, model yang keliru dapat menyebabkan kebingungan, kesalahan, dan frustrasi.
> >
> > Proses pembentukan model mental melibatkan tiga langkah utama: (1) **observasi** (mengamati apa yang terjadi pada layar), (2) **interpretasi** (menafsirkan hubungan sebab‑akibat), dan (3) **integrasi** (menyusun pengetahuan baru ke dalam struktur yang sudah ada). Teknik **elicitation**—seperti *think‑aloud protocol*, *concept mapping*, atau *interview*—digunakan untuk mengungkap model mental pengguna secara eksplisit. Hasilnya dapat membantu desainer menyesuaikan antarmuka sehingga lebih selaras dengan harapan pengguna.
> >
> > Contoh sehari‑hari: ketika pengguna pertama kali menyalakan thermostat pintar, mereka mungkin mengasumsikan bahwa memutar tombol ke kanan selalu meningkatkan suhu. Jika sistem sebenarnya menggunakan skala digital dengan langkah tertentu, model mental pengguna akan bertentangan dengan realitas, menyebabkan kesalahan penggunaan. Dengan menyediakan **feedback** yang jelas (misalnya menampilkan suhu aktual secara real‑time) dan **tutorial** kontekstual, desainer dapat memperbaiki model mental tersebut.
> >
> > Pada tingkat yang lebih luas, mental model memengaruhi **decision‑making** dan **problem‑solving**. Misalnya, dalam aplikasi perbankan mobile, pengguna mengandalkan model mental “setiap transaksi harus diverifikasi” sehingga mereka lebih menerima proses otentikasi multi‑faktor. Jika model ini tidak dipenuhi (misalnya otentikasi terlalu rumit), pengguna dapat kehilangan kepercayaan dan beralih ke layanan lain. Oleh karena itu, pemahaman yang mendalam tentang mental model sangat penting untuk merancang antarmuka yang intuitif dan dapat dipercaya.

> [!cornell] #### Summary
>
> **Perhatian**, **persepsi**, **memori**, dan **model mental** merupakan fondasi kognitif yang menentukan bagaimana pengguna berinteraksi dengan antarmuka. Desain yang memperhatikan batasan perhatian dengan *visual boundaries* dan *grouping* memudahkan seleksi informasi; persepsi yang dioptimalkan melalui kontras warna, tipografi, dan isyarat audio meningkatkan keterbacaan; memori dapat dipertahankan dengan mengutamakan *recognition* daripada *recall* serta membatasi beban kerja pada working memory; dan model mental yang tepat dibangun lewat pengalaman terstruktur, umpan balik jelas, serta teknik elicitation yang sistematis. Mengintegrasikan keempat proses ini menghasilkan antarmuka yang lebih efisien, mudah dipelajari, dan meminimalkan beban kognitif pengguna.

> [!ad-libitum]- Additional Information
>
> #### Advanced Topic 1: Model‑Based Attention Theory
>
> Model‑based attention menjelaskan bahwa perhatian tidak hanya dipicu oleh stimulus fisik, tetapi juga oleh *expectations* (harapan) yang terbentuk dalam model mental pengguna. Misalnya, ketika pengguna mengharapkan tombol “Submit” berada di pojok kanan bawah, mereka akan secara otomatis mengarahkan pandangan ke area tersebut meskipun tidak ada isyarat visual yang menonjol. Penelitian terbaru (Zhang & Wolfe, 2020) menggunakan eye‑tracking untuk menunjukkan bahwa *top‑down* expectations dapat mengurangi waktu pencarian hingga 30 % dibandingkan dengan pendekatan *bottom‑up* semata. Implikasinya bagi HCI adalah pentingnya menempatkan elemen‑elemen kritis pada lokasi yang konsisten dengan skema mental umum, serta menyediakan *visual affordances* yang memperkuat harapan tersebut.
>
> #### Advanced Topic 2: Cognitive Load Theory in Interface Design
>
> Cognitive Load Theory (CLT) membedakan tiga jenis beban: **intrinsic**, **extraneous**, dan **germane**. Beban intrinsik terkait dengan kompleksitas materi yang tidak dapat dihindari; beban ekstrinsik muncul dari cara informasi disajikan; dan beban germane mendukung proses pembelajaran. Dalam HCI, desainer harus meminimalkan beban ekstrinsik dengan mengurangi elemen yang tidak relevan, menggunakan *progressive disclosure* (pengungkapan bertahap), dan menyederhanakan navigasi. Sebagai contoh, wizard multi‑step yang menampilkan satu set pertanyaan pada satu waktu mengurangi beban memori dibandingkan formulir panjang yang sekaligus menampilkan semua bidang. Penelitian Sweller et al. (2019) menunjukkan bahwa pengurangan beban ekstrinsik dapat meningkatkan kecepatan penyelesaian tugas hingga 25 % pada aplikasi edukasi.
>
> #### Advanced Topic 3: Formal Models of Mental Model Alignment
>
> Pendekatan formal menggunakan **Bayesian inference** untuk memodelkan bagaimana pengguna memperbarui model mental mereka berdasarkan umpan balik. Model ini mengasumsikan bahwa pengguna memiliki *prior* (keyakinan awal) tentang cara kerja sistem, dan setiap interaksi menghasilkan *likelihood* yang memperbaharui *posterior* (keyakinan yang diperbarui). Implementasi praktis dapat berupa sistem rekomendasi yang menyesuaikan antarmuka secara dinamis berdasarkan prediksi model mental pengguna. Misalnya, jika sistem memperkirakan bahwa pengguna menganggap “drag‑and‑drop” sebagai cara utama mengatur item, antarmuka dapat menonjolkan area drop zone secara visual. Literatur utama: "Probabilistic Models of Human‑Computer Interaction" (Kieras & Polson, 2021).
>
> #### Advanced Topic 4: Distributed Cognition and Collaborative Interfaces
>
> Distributed cognition menekankan bahwa proses kognitif tersebar tidak hanya dalam otak individu, tetapi juga melalui artefak, lingkungan, dan interaksi sosial. Pada sistem kolaboratif, seperti papan tulis digital atau platform manajemen proyek, informasi eksternal (misalnya komentar, label, atau timeline) berfungsi sebagai *cognitive off‑loading* yang mengurangi beban memori individu. Desain yang mendukung distributed cognition harus menyediakan **shared representations** yang konsisten, misalnya melalui visualisasi alur kerja yang dapat diakses bersama, serta mekanisme **synchronization** yang menjaga konsistensi data antar pengguna. Penelitian Kirsh (2013) menegaskan bahwa keberhasilan kolaborasi bergantung pada seberapa baik antarmuka menyalurkan pengetahuan eksternal ke dalam proses berpikir individu.
>
> #### Edge Cases and Nuances
>
> - **Multitasking**: Pada situasi multitasking, perhatian terbagi dapat menurunkan akurasi pengenalan visual hingga 40 %. Desainer harus menghindari menampilkan informasi kritis secara bersamaan pada banyak area layar.
> - **Color Vision Deficiency**: Sekitar 8 % pria memiliki defisiensi warna merah‑hijau; penggunaan kombinasi warna yang tidak dapat dibedakan (mis. merah‑hijau) dapat mengganggu persepsi dan meningkatkan beban memori.
> - **Aging Users**: Kapasitas working memory menurun seiring usia; antarmuka untuk pengguna lanjut usia sebaiknya membatasi pilihan menu dan menyediakan teks yang lebih besar serta kontras tinggi.
>
> #### Self‑Exploration Projects
>
> 1. **Eye‑Tracking Study**: Buat prototipe dua versi halaman web (satu dengan grup visual yang jelas, satu tanpa). Gunakan eye‑tracker (mis. Tobii) untuk mengukur waktu fokus pada elemen penting dan analisis perbedaan beban perhatian.
> 2. **Mental Model Mapping**: Pilih aplikasi mobile (mis. aplikasi perbankan). Lakukan *think‑aloud protocol* dengan 5 pengguna, kemudian buat *concept map* untuk mengidentifikasi kesenjangan antara model mental pengguna dan model sistem yang diharapkan.
> 3. **Cognitive Load Measurement**: Implementasikan wizard multi‑step vs. formulir satu halaman pada tugas pendaftaran. Ukur waktu penyelesaian, tingkat kesalahan, dan beban subyektif (NASA‑TLX) untuk menilai efek beban kognitif.
> 4. **Distributed Cognition Prototype**: Rancang papan kolaboratif digital yang menampilkan *shared annotations* dan *real‑time task board*. Evaluasi bagaimana fitur tersebut mengurangi beban memori individu dalam skenario perencanaan proyek.
>
> #### Tools and Resources
>
> - **Eye‑tracking SDK**: Tobii Pro SDK (https://developer.tobii.com)
> - **Cognitive Load Measurement**: NASA‑TLX questionnaire (https://nasa.gov/tlx)
> - **Mental Model Elicitation**: *Concept Mapping* tool CmapTools (https://cmap.ihmc.us)
> - **Distributed Cognition Framework**: *Cognitive Work Analysis* (CWA) toolkit (https://cognitiveworkanalysis.org)
>
> #### Further Reading
>
> - Kieras, D. E., & Polson, P. G. (2021