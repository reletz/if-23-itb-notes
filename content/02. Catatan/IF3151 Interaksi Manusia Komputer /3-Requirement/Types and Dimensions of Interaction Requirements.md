---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3151 Interaksi Manusia Komputer]]

> [!cornell] Types and Dimensions of Interaction Requirements
>
> > ## Questions/Cues
> >
> > - Mengapa requirement berakar pada goal?
> > - Bagaimana konteks memengaruhi requirement?
> > - Apa perbedaan requirement fungsional dan data?
> > - Contoh requirement yang mencerminkan karakteristik pengguna?
> > - Dimensi apa yang termasuk dalam konteks penggunaan?
> >
> > ## Reference Points
> >
> > - Requirements , Goals , dan Context of Use IF3151 (Slide 1)
> > - Intro Fokus: disiplin berpikir dalam problem space (Slide 2)
> > - Apa Itu Requirement ? (Slide 6)
> > - Requirement dan Struktur Interaksi (Slide 7)
> > - Jenis‑Jenis Requirement (Slide 10)
> > - Dimensi Konteks & Kualitas (Slide 11)
> > - Requirement Berlapis (Slide 9)
> > - Konteks Multidimensional (Slide 17)
> > - Contoh Kasus E‑Commerce Indonesia vs. Belanda (Slides 20‑21)
>
> > ### Definisi Requirement Interaksi
> >
> > Requirement interaksi menyatakan kemampuan sistem untuk mendukung goal pengguna dalam konteks tertentu. Tidak seperti fitur yang menjelaskan *bagaimana* sesuatu diwujudkan, requirement menjawab *apa* yang harus dapat dilakukan sistem. Misalnya, pada aplikasi pembayaran, requirement dapat berupa “sistem harus menampilkan status transaksi secara jelas dan dapat diperbarui secara real‑time”. Requirement tidak menyebutkan warna tombol atau teknologi yang dipakai; ia fokus pada kapabilitas yang diperlukan untuk mencapai tujuan pengguna.
> >
> > Requirement berfungsi sebagai jembatan antara pemahaman masalah (problem space) dan solusi (solution space). Dengan menuliskan requirement secara eksplisit, tim desain dapat mengevaluasi apakah solusi yang diusulkan memang memenuhi kebutuhan yang telah diidentifikasi, tanpa terjebak pada preferensi pribadi atau solusi teknis yang belum teruji.
> >
> > ### Hubungan Requirement dengan Goal dan Context
> >
> > Setiap requirement harus dapat dijawab melalui dua pertanyaan kunci: *Goal siapa yang didukung?* dan *Dalam konteks apa interaksi terjadi?* Goal menggambarkan tujuan akhir pengguna, misalnya “menyelesaikan pembayaran dengan aman”. Context mencakup faktor‑faktor fisik, sosial, teknis, dan organisasi yang memengaruhi cara interaksi terjadi. Sebagai contoh, dokter yang mengakses data pasien di ruang operasi membutuhkan tampilan yang cepat dan minim distraksi, sedangkan di ruang administrasi dokter memerlukan detail lengkap dan kemampuan pencarian yang mendalam. Meskipun goal tetap sama (akses data pasien), requirement berubah karena konteks berbeda.
> >
> > Analogi yang berguna adalah membayangkan sebuah resep masakan. Goal adalah “menyajikan hidangan lezat”, sementara context adalah “dapur dengan peralatan terbatas” atau “dapur profesional”. Requirement adalah daftar bahan dan teknik dasar yang harus ada, terlepas dari peralatan spesifik yang akan dipilih (itu adalah feature).
> >
> > ### Jenis‑Jenis Requirement Interaksi
> >
> > **Functional requirements** – menyatakan apa yang sistem harus lakukan untuk mendukung task pengguna. Contohnya, “sistem harus memungkinkan pengguna membandingkan produk secara side‑by‑side”.
> >
> > **Data requirements** – berkaitan dengan informasi yang harus tersedia untuk pengambilan keputusan. Misalnya, “sistem harus menampilkan riwayat transaksi lengkap dengan timestamp”.
> >
> > **User characteristics requirements** – menyesuaikan interaksi dengan kemampuan, pengetahuan, dan mental model pengguna. Contoh: “antarmuka harus dapat dioperasikan dengan satu tangan bagi pengguna lansia”.
> >
> > Ketiga jenis requirement ini tidak berdiri sendiri; mereka saling melengkapi. Functional requirement menentukan aksi, data requirement menyediakan bahan keputusan, dan user characteristics requirement memastikan aksi dapat dipahami dan dijalankan oleh pengguna.
> >
> > ### Dimensi Konteks dan Kualitas
> >
> > Konteks penggunaan bersifat multidimensional: **fisik** (ruang, pencahayaan), **sosial** (interaksi dengan orang lain), **teknis** (koneksi jaringan, perangkat keras), dan **organisasi** (prosedur kerja, regulasi). Setiap dimensi dapat menimbulkan constraint yang harus dipertimbangkan dalam merumuskan requirement.
> >
> > Selain konteks, requirement juga mencakup dimensi kualitas yang biasanya diukur melalui **usability goals** (efektivitas, efisiensi, tingkat error) dan **UX goals** (kepercayaan, kepuasan, keterlibatan). Misalnya, dalam e‑commerce Indonesia, requirement “sistem harus mengkomunikasikan mekanisme escrow secara eksplisit” berfokus pada membangun trust melalui transparansi, sementara di Belanda requirement “sistem harus menyediakan prosedur pengembalian yang jelas” menekankan pada kejelasan prosedural untuk meningkatkan kepuasan pengguna.
> >
> > Memahami dimensi‑dimensi ini membantu tim mengidentifikasi kebutuhan yang bersifat kontekstual dan kualitas yang harus dipenuhi, sehingga requirement menjadi model konseptual yang komprehensif.
> >
> > ### Requirement Berlapis: Manusia, Sistem, dan Konteks
> >
> > Requirement tidak hanya berupa fungsi sistem; ia merepresentasikan pemahaman tentang tiga lapisan utama: **Manusia** (kemampuan, batasan, tujuan), **Sistem** (kapabilitas teknis, arsitektur), dan **Konteks** (lingkungan fisik, sosial, teknis, organisasi). Contoh: “sistem harus memungkinkan verifikasi status transaksi secara jelas” mencakup kebutuhan manusia (memahami status), kebutuhan sistem (menyediakan data real‑time), dan konteks (misalnya, dalam situasi jaringan yang tidak stabil, sistem harus tetap menampilkan status terbaru).
> >
> > Dengan memandang requirement secara berlapis, desainer dapat memastikan bahwa setiap aspek interaksi dipertimbangkan secara holistik, mengurangi risiko solusi yang hanya mengoptimalkan satu lapisan sementara mengabaikan yang lain.
> >
> > ### Contoh Kasus: Perbedaan Requirement antara Indonesia dan Belanda
> >
> > Pada platform e‑commerce, goal pengguna di kedua negara serupa: “membeli produk dengan aman”. Namun, konteks sosial‑teknis berbeda. Di Indonesia, kepercayaan dibangun melalui **escrow** yang dijelaskan secara eksplisit; requirementnya: “sistem harus mengkomunikasikan mekanisme perlindungan transaksi”. Di Belanda, regulasi konsumen kuat, sehingga fokusnya pada prosedur retur; requirementnya: “sistem harus menyediakan prosedur pengembalian yang jelas”. Kedua requirement tetap berakar pada goal yang sama, namun menyesuaikan dengan konteks budaya, hukum, dan ekspektasi risiko masing‑masing.
> >
> > Contoh ini menegaskan bahwa requirement bukan sekadar daftar fungsi, melainkan refleksi dari interaksi antara goal, konteks, dan kualitas yang diharapkan oleh pengguna.
> >
> > ### Ringkasan Perbedaan Requirement dan Feature (Catatan Singkat)
> >
> > Meskipun dalam materi terdapat pembahasan tentang perbedaan requirement dan feature, penjelasan detail mengenai hal tersebut tidak dibahas di sini untuk menghindari pengulangan konsep yang sudah tercakup pada bagian lain.
> >
> > [Continue for all major concepts in the material]

> [!cornell] #### Summary
>
> **Requirement interaksi** adalah pernyataan kapabilitas sistem yang mendukung goal pengguna dalam konteks tertentu, tidak membahas detail implementasi. Mereka terbagi menjadi functional, data, dan user‑characteristics, serta dipengaruhi oleh dimensi konteks fisik, sosial, teknis, dan organisasi serta tujuan kualitas seperti efektivitas dan trust. Dengan memandang requirement secara berlapis (manusia, sistem, konteks) dan mengaitkannya dengan contoh kasus nyata, desainer dapat menghasilkan solusi yang relevan, dapat dievaluasi, dan adaptif terhadap perbedaan budaya atau lingkungan.

> [!ad-libitum]- Additional Information
>
> #### Formal Modeling of Interaction Requirements
>
> Untuk keperluan analisis yang lebih rigour, requirement dapat diformalkan menggunakan notasi **Goal‑Question‑Metric (GQM)** atau **KAOS**. Pada pendekatan GQM, setiap goal dipecah menjadi pertanyaan yang dapat diukur, kemudian metrik yang konkret didefinisikan. Misalnya, goal “meningkatkan kepercayaan pengguna” dapat diubah menjadi pertanyaan “berapa persen pengguna melaporkan rasa aman setelah transaksi?” dengan metrik “persentase rating trust ≥ 4 pada skala 5”. Pendekatan KAOS menambahkan diagram goal‑refinement yang menghubungkan goal tingkat tinggi dengan sub‑goal dan requirement operasional, memudahkan traceability dari requirement ke tujuan bisnis.
>
> Formalisasi ini membantu tim menghindari ambiguitas, memfasilitasi verifikasi otomatis, dan menyediakan dasar untuk **model checking** pada prototipe interaktif.
>
> #### Requirement Elicitation Techniques
>
> Meskipun teknik riset pengguna secara detail dilarang, ada metode umum yang tetap relevan untuk mengumpulkan requirement: **contextual inquiry**, **card sorting**, dan **scenario‑based walkthroughs**. Contextual inquiry melibatkan observasi pengguna dalam lingkungan kerja mereka, sehingga konteks fisik dan sosial dapat ditangkap secara langsung. Card sorting membantu mengidentifikasi struktur informasi yang sesuai dengan mental model pengguna, yang pada gilirannya memunculkan user‑characteristics requirement. Scenario‑based walkthroughs memungkinkan tim mengevaluasi apakah requirement yang dirumuskan dapat menyelesaikan task dalam situasi yang realistis.
>
> Penggunaan teknik ini secara iteratif meningkatkan validitas requirement sebelum masuk ke fase desain.
>
> #### Requirement Validation and Traceability
>
> Setelah requirement dirumuskan, penting untuk melakukan **validation** melalui prototyping dan usability testing. Setiap requirement harus dapat dipetakan ke satu atau lebih tes yang mengukur kepatuhan. Misalnya, requirement “sistem harus menampilkan status transaksi secara real‑time” dapat divalidasi dengan tes latency < 200 ms pada jaringan seluler. Traceability matrix (RTM) menjadi alat penting untuk melacak hubungan antara requirement, design artefacts, dan test cases, memastikan tidak ada requirement yang terlewat selama siklus pengembangan.
>
> Selain itu, **change impact analysis** dapat dilakukan dengan memeriksa bagaimana perubahan pada satu requirement memengaruhi requirement lain, terutama ketika requirement bersifat berlapis.
>
> #### Advanced Topics: Prioritization and Conflict Resolution
>
> Dalam proyek berskala besar, tidak semua requirement dapat dipenuhi sekaligus. Metode **MoSCoW** (Must, Should, Could, Won’t) atau **Kano model** membantu tim memprioritaskan requirement berdasarkan nilai bisnis dan kepuasan pengguna. Konflik antar requirement (misalnya, kebutuhan keamanan tinggi vs. kecepatan akses) dapat dianalisis dengan **trade‑off analysis**, menggunakan diagram **Pareto** atau **cost‑benefit matrix** untuk menemukan solusi optimal.
>
> Pendekatan ini memastikan bahwa keputusan desain didasarkan pada data dan bukan pada preferensi subjektif.
>
> #### Self-Exploration Projects
>
> 1. **Studi Kasus Multikonteks**: Pilih dua aplikasi yang melayani pasar dengan konteks budaya berbeda (misalnya, layanan streaming di Asia vs. Eropa). Identifikasi goal yang sama, kemudian rumuskan requirement yang berbeda berdasarkan konteks fisik, sosial, dan regulasi masing‑masing. Buat tabel perbandingan dan analisis implikasi desain.
> 2. **Prototipe Requirement‑Driven UI**: Gunakan alat prototyping (misalnya Figma atau Axure) untuk membuat dua versi antarmuka yang memenuhi requirement yang sama tetapi dengan feature yang berbeda (misalnya, tampilan tabel vs. visualisasi grafik). Lakukan usability test singkat dengan 5 peserta dan evaluasi mana yang lebih efektif dalam memenuhi usability goals yang telah didefinisikan.
>
> #### Tools and Resources
>
> - **KAOS Goal Modeling Tool** – https://kaostool.org
> - **GQM+Strategies** – buku “Goal Question Metric” oleh Basili & Weiss (1994)
> - **Figma** – platform desain UI/UX berbasis web, mendukung prototyping interaktif
> - **Axure RP** – alat prototyping dengan kemampuan conditional logic untuk menguji requirement dinamis
> - **Usability.gov** – panduan standar untuk merumuskan dan menguji usability goals
>
> #### Further Reading
>
> - Nielsen, J., & Molich, R. (1990). *Heuristic Evaluation of User Interfaces*.
> - ISO 9241‑210:2019 – *Ergonomic requirements for interactive systems*.
> - Cooper, A., Reimann, R., & Cronin, D. (2014). *About Face: The Essentials of Interaction Design*.
> - “Designing Interactive Systems” – ACM SIGCHI Conference Proceedings (latest editions).