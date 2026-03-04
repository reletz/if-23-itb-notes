---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3151 Interaksi Manusia Komputer]]

> [!cornell] User Research Methods and Data‑Gathering Principles for Validating Requirements
>
> > ## Questions/Cues
> >
> > - Mengapa riset pengguna penting sebelum merumuskan requirement?
> > - Kapan waktu yang tepat untuk memulai user research dalam proyek?
> > - Bagaimana prinsip triangulasi meningkatkan keandalan data?
> > - Apa perbedaan utama antara wawancara terstruktur dan semi‑terstruktur?
> > - Bagaimana cara mengubah temuan observasi menjadi requirement yang terverifikasi?
> >
> > ## Reference Points
> >
> > - Lecture_26_User_Research.pptx (Slides 26‑32)
> > - NNGroup_Article_Which_UX_Research_Methods.pdf (Pages 1‑4)
> > - Lecture_30_Data_Gathering_Principles.pptx (Slides 30‑31)
>
> > ### Pentingnya User Research dalam Validasi Requirement
> >
> > User research menempatkan pengguna di pusat proses desain, memastikan bahwa setiap requirement yang dirumuskan berakar pada kebutuhan nyata, bukan pada asumsi tim desain. Pada tahap *problem space*, peneliti mengumpulkan bukti empiris tentang tujuan (goal) pengguna, tugas (task) yang mereka lakukan, serta konteks penggunaan. Data ini menjadi pijakan logis untuk menilai apakah sebuah requirement memang diperlukan atau hanya sekadar ide fitur. Misalnya, sebelum menambahkan fungsi “filter produk”, tim harus mengetahui apakah pengguna mengalami kesulitan menemukan produk yang relevan dalam katalog yang luas. Tanpa riset, requirement dapat menjadi spekulatif dan berisiko menghasilkan solusi yang tidak dipakai.
> >
> > Selain mengurangi risiko kegagalan produk, user research juga membantu mengidentifikasi kebutuhan tersembunyi yang tidak terungkap melalui wawancara singkat. Observasi langsung di lapangan, misalnya, dapat mengungkap hambatan fisik atau sosial yang memengaruhi interaksi, seperti gangguan di ruang operasi atau keterbatasan bandwidth di daerah pedesaan. Temuan‑temuan ini kemudian di‑translate menjadi requirement yang lebih spesifik, misalnya “sistem harus menampilkan status transaksi dalam waktu kurang dari dua detik pada jaringan 3G”.
> >
> > Dengan demikian, user research berfungsi sebagai jembatan antara *goal* pengguna dan *requirement* yang dapat diukur, menjamin bahwa setiap keputusan desain memiliki dasar data yang dapat ditelusuri kembali ke perilaku atau kebutuhan aktual.
> >
> > ### Kapan Melakukan User Research
> >
> > Waktu pelaksanaan user research tidak bersifat statis; ia harus disesuaikan dengan tujuan spesifik proyek. Pada fase inisiasi, riset eksploratif (exploratory research) membantu mengkonfirmasi apakah problem space yang dipahami tim sudah tepat. Pada fase ini, teknik seperti wawancara terbuka, focus group, atau diary study sering dipilih karena fleksibilitasnya dalam menggali motivasi dan harapan pengguna. Setelah problem space terdefinisi, riset konfirmatori (confirmatory research) dilakukan untuk memvalidasi requirement yang telah dirumuskan, biasanya dengan metode kuantitatif seperti kuesioner terstruktur atau analisis log.
> >
> > Contoh praktis: sebuah tim e‑commerce yang ingin menambahkan mekanisme escrow dapat memulai dengan wawancara pengguna (buyer & seller) untuk memahami persepsi risiko. Setelah mengidentifikasi kebutuhan “transparansi transaksi”, tim dapat menguji prototipe melalui survei skala Likert untuk mengukur tingkat kepercayaan sebelum dan sesudah penambahan fitur. Jika data menunjukkan peningkatan signifikan, requirement “sistem harus mengkomunikasikan mekanisme escrow secara jelas” dapat dianggap terverifikasi.
> >
> > Penting untuk diingat bahwa user research bersifat iteratif. Hasil dari satu siklus dapat memunculkan pertanyaan baru yang memerlukan riset lanjutan, sehingga timeline proyek harus mengakomodasi fase‑fase ini.
> >
> > ### Prinsip‑prinsip Pengumpulan Data yang Baik
> >
> > 1. **Pertanyaan riset yang jelas** – Setiap instrumen harus berfokus pada satu tujuan spesifik, menghindari pertanyaan ganda yang dapat membingungkan responden.
> > 2. **Partisipan relevan** – Memilih sampel yang representatif terhadap populasi target (misalnya, dokter di ruang operasi vs. ruang administrasi) memastikan temuan dapat digeneralisasikan.
> > 3. **Metode sesuai** – Teknik kualitatif (wawancara, observasi) cocok untuk eksplorasi mendalam, sedangkan teknik kuantitatif (kuesioner, log analytics) cocok untuk mengukur prevalensi.
> > 4. **Etika dijaga** – Persetujuan tertulis, anonimitas, dan perlindungan data pribadi harus menjadi standar, terutama bila data sensitif (misalnya, catatan medis).
> > 5. **Triangulasi** – Menggabungkan beberapa sumber data (misalnya, wawancara + log + diary) meningkatkan validitas temuan, karena setiap metode melengkapi kelemahan yang lain.
> >
> > Implementasi prinsip‑prinsip ini menghasilkan data yang tidak hanya kaya secara konteks, tetapi juga dapat dipertanggungjawabkan secara ilmiah. Sebagai contoh, dalam proyek sistem pembayaran, observasi langsung dapat mengidentifikasi bahwa pengguna sering menunggu lama pada layar konfirmasi, sementara log analytics menunjukkan bahwa rata‑rata waktu respons melebihi 5 detik. Kedua data tersebut bersama‑sama memperkuat requirement “waktu respons konfirmasi tidak lebih dari 2 detik”.
> >
> > ### Metode User Research Utama
> >
> > **Wawancara** – Dapat dibagi menjadi tiga tipe: terstruktur (pertanyaan sudah ditetapkan sebelumnya), semi‑terstruktur (panduan topik dengan ruang untuk eksplorasi), dan tidak terstruktur (percakapan bebas). Wawancara semi‑terstruktur sering dipilih karena memberikan keseimbangan antara konsistensi data dan fleksibilitas menggali insight tak terduga.
> >
> > **Observasi** – Melibatkan pengamatan langsung perilaku pengguna dalam konteks alami. Teknik ini dapat bersifat pasif (menonton) atau partisipatif (peneliti ikut melakukan tugas). Observasi membantu mengidentifikasi “pain points” yang tidak diungkapkan secara verbal, seperti kebiasaan mengklik tombol “kembali” berulang kali karena kebingungan UI.
> >
> > **Kuesioner** – Instrumen kuantitatif yang memungkinkan pengumpulan data dari sampel besar dalam waktu singkat. Desain kuesioner harus memperhatikan skala pengukuran (Likert, semantic differential) dan menghindari bias leading.
> >
> > **Focus Group** – Diskusi terarah dengan 6‑10 peserta yang memiliki latar belakang serupa. Fokusnya pada dinamika kelompok, sehingga dapat mengungkap persepsi kolektif atau konflik kepentingan.
> >
> > **Diary Study** – Peserta mencatat aktivitas, perasaan, atau masalah selama periode tertentu (misalnya, satu minggu). Metode ini cocok untuk memahami interaksi jangka panjang, seperti penggunaan aplikasi kesehatan harian.
> >
> > **Log & Analytics** – Data otomatis yang dihasilkan oleh sistem (misalnya, click‑stream, waktu sesi). Analisis log memberikan gambaran kuantitatif tentang pola penggunaan, yang dapat dipadukan dengan data kualitatif untuk validasi requirement.
> >
> > Setiap metode memiliki kelebihan dan keterbatasan; pemilihan harus didasarkan pada tujuan riset, sumber daya, dan tingkat kedalaman insight yang dibutuhkan. Kombinasi metode (misalnya, wawancara + log) biasanya menghasilkan pemahaman yang paling komprehensif.
> >
> > ### Dari Temuan ke Requirement yang Terverifikasi
> >
> > Proses transformasi data menjadi requirement melibatkan tiga langkah utama: (1) **Sintesis** – Mengelompokkan temuan menjadi tema‑tema utama (misalnya, “kebutuhan transparansi transaksi”, “kecepatan respons”). (2) **Formulasi** – Menulis requirement dalam bentuk yang dapat diukur, misalnya “Sistem harus menampilkan status transaksi dalam waktu kurang dari 2 detik pada jaringan 3G”. (3) **Validasi** – Menguji requirement melalui prototipe atau studi A/B untuk memastikan bahwa implementasi memenuhi harapan yang diidentifikasi.
> >
> > Contoh konkret: setelah melakukan observasi dan wawancara pada dokter di ruang operasi, tim menemukan bahwa dokter membutuhkan tampilan ringkas hasil laboratorium dalam 5 detik. Requirement yang dihasilkan: “Sistem harus menampilkan ringkasan hasil laboratorium dalam tampilan satu layar dalam ≤5 detik”. Validasi dapat dilakukan dengan prototipe low‑fidelity dan mengukur waktu yang dibutuhkan dokter untuk menemukan informasi tersebut. Jika hasilnya memenuhi batas yang ditetapkan, requirement dianggap terverifikasi.
> >
> > Dengan pendekatan berulang ini, requirement tidak lagi bersifat spekulatif, melainkan berlandaskan bukti empiris yang dapat dipertanggungjawabkan kepada stakeholder.

> [!cornell] #### Summary
>
> **User research** merupakan fondasi kritis untuk memastikan bahwa requirement yang dirumuskan berakar pada kebutuhan nyata pengguna dan konteks penggunaan. Melakukan riset pada fase yang tepat—eksploratif untuk memahami problem space dan konfirmatori untuk memvalidasi requirement—memungkinkan tim menghindari asumsi berlebih. Prinsip‑prinsip pengumpulan data yang jelas, relevan, etis, dan tertriangulasi meningkatkan keandalan temuan, sementara beragam metode (wawancara, observasi, kuesioner, focus group, diary, log) memberikan perspektif yang saling melengkapi. Transformasi temuan menjadi requirement terukur dan terverifikasi menutup siklus iteratif, menghasilkan solusi yang lebih tepat guna dan dapat dipertanggungjawabkan.

> [!ad-libitum]- Additional Information
>
> #### Desain Studi Kuantitatif vs. Kualitatif
>
> Studi kuantitatif menekankan pada pengukuran numerik, biasanya melalui kuesioner berskala atau analisis log. Metode ini cocok untuk menguji hipotesis yang sudah terdefinisi, misalnya “80 % pengguna menganggap waktu respons > 3 detik tidak dapat diterima”. Analisis statistik (uji‑t, ANOVA, regresi) memberikan tingkat signifikansi yang dapat dipublikasikan.
>
> Sebaliknya, studi kualitatif (wawancara mendalam, observasi, focus group) menyoroti makna di balik perilaku, mengungkap motivasi, nilai, dan hambatan yang tidak dapat diukur secara numerik. Teknik coding tematik (misalnya, Braun & Clarke) membantu mengidentifikasi pola berulang. Kedua pendekatan dapat digabungkan dalam desain mixed‑methods, di mana temuan kualitatif membimbing pembuatan instrumen kuantitatif, dan hasil kuantitatif memperkuat generalisasi temuan kualitatif.
>
> #### Strategi Triangulasi Data untuk Validasi Requirement
>
> Triangulasi melibatkan tiga dimensi utama: (1) **Triangulasi sumber** – mengumpulkan data dari berbagai kelompok pengguna (misalnya, dokter, perawat, admin). (2) **Triangulasi metode** – menggabungkan wawancara, observasi, dan log analytics. (3) **Triangulasi teoritis** – memeriksa temuan terhadap kerangka teori yang relevan (misalnya, Theory of Planned Behavior).
>
> Praktik triangulasi meningkatkan kepercayaan bahwa requirement tidak hanya mencerminkan satu perspektif sempit. Misalnya, jika wawancara mengindikasikan kebutuhan “notifikasi real‑time”, log analytics yang menunjukkan rendahnya frekuensi notifikasi memperkuat urgensi requirement tersebut. Dokumentasi proses triangulasi penting untuk auditabilitas, terutama dalam proyek berskala besar atau regulasi ketat.
>
> #### Etika Penelitian Pengguna dan Kepatuhan
>
> Etika menjadi landasan utama dalam setiap aktivitas pengumpulan data. Peneliti harus memperoleh **informed consent** yang jelas, menjelaskan tujuan, prosedur, risiko, dan hak untuk menarik diri. Anonimitas dan **data minimization** (mengumpulkan hanya data yang diperlukan) melindungi privasi, terutama bila data bersifat sensitif (misalnya, data medis).
>
> Di Indonesia, pedoman **Peraturan Pemerintah No. 71/2019** tentang Penyelenggaraan Sistem dan Transaksi Elektronik serta **Undang‑Undang No. 27/2022** tentang Perlindungan Data Pribadi (PDP) mengatur persyaratan penyimpanan, pemrosesan, dan penghapusan data. Peneliti harus memastikan bahwa semua prosedur riset mematuhi regulasi ini, termasuk penggunaan server yang terlokalisasi dan mekanisme enkripsi data.
>
> #### Alat dan Platform Pendukung User Research
>
> Beberapa alat populer yang memudahkan pelaksanaan metode di atas antara lain:
>
> - **Qualtrics** – platform survei dengan logika cabang kompleks, cocok untuk kuesioner kuantitatif.
> - **Dovetail** – alat analisis kualitatif yang mendukung coding tematik, visualisasi insight, dan kolaborasi tim.
> - **Lookback.io** – merekam sesi penggunaan aplikasi (screen + audio) untuk analisis perilaku real‑time.
> - **Google Analytics / Firebase** – menyediakan log dan metrik penggunaan aplikasi mobile/web.
> - **NVivo** – software analisis data kualitatif yang kuat, mendukung integrasi data teks, audio, dan video.
>
> Memilih alat yang tepat harus mempertimbangkan skala proyek, anggaran, serta kepatuhan terhadap regulasi data. Integrasi antar‑alat (misalnya, mengimpor transkrip wawancara dari Dovetail ke NVivo) dapat mempercepat proses sintesis.
>
> #### Self‑Exploration Projects
>
> 1. **Studi Observasi dan Log pada Aplikasi Mobile** – Pilih sebuah aplikasi yang sering Anda gunakan, lakukan observasi penggunaan selama satu minggu, kumpulkan log (misalnya, dengan Firebase), kemudian analisis apakah terdapat gap antara persepsi pengguna (dari catatan observasi) dan data log. Buatlah setidaknya tiga requirement yang terverifikasi berdasarkan temuan tersebut.
> 2. **Desain dan Uji Kuesioner Validasi Requirement** – Pilih sebuah fitur yang sedang dipertimbangkan (misalnya, sistem rekomendasi produk). Rancang