---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3151 Interaksi Manusia Komputer]]

> [!cornell] Nielsen’s 10 Usability Heuristics and Their Application in Evaluation
>
> > ## Questions/Cues
> >
> > - Mengapa status sistem harus selalu terlihat?
> > - Bagaimana mencocokkan istilah sistem dengan dunia nyata?
> > - Kapan pengguna memerlukan kontrol “undo”?
> > - Apa peran konsistensi dalam mengurangi beban belajar?
> > - Bagaimana mencegah kesalahan sebelum terjadi?
> > - Mengapa pengenalan lebih dipilih daripada mengingat?
> > - Bagaimana desain minimalis meningkatkan efisiensi?
> >
> > ## Reference Points
> >
> > - IF3151_Lecture_Heuristics.pdf (Slides 4-14)
> > - IF3151_DesignGuidelines_ vs_Heuristics.pdf (Slides 1-15)
>
> > ### 1. Visibility of System Status
> >
> > Sistem harus selalu memberi tahu pengguna apa yang sedang terjadi dan bagaimana responsnya terhadap aksi pengguna. Informasi ini dapat disampaikan melalui feedback visual (misalnya, perubahan warna tombol), indikator status (seperti ikon loading), atau progress bar untuk operasi yang memakan waktu. Contoh klasik adalah ketika pengguna mengklik “Submit” pada formulir web; sebuah spinner muncul menandakan bahwa data sedang diproses, sehingga pengguna tidak mengira klik tidak berfungsi. Analogi yang berguna adalah lampu lalu lintas: warna merah, kuning, hijau memberi tahu pengendara secara real‑time tentang keadaan jalan.
> >
> > Dari perspektif kognitif, visibilitas mengurangi “gulf of execution” dan “gulf of evaluation” karena pengguna dapat memantau hasil tindakan mereka secara langsung. Tanpa indikator yang jelas, pengguna cenderung mengulangi aksi atau meninggalkan sistem karena kebingungan. Oleh karena itu, setiap perubahan status penting harus memiliki representasi yang dapat dipersepsikan dalam waktu singkat.
> >
> > ### 2. Match Between System and Real World
> >
> > Prinsip ini menuntut sistem menggunakan bahasa, metafora, dan urutan logika yang familiar bagi pengguna. Misalnya, ikon “keranjang belanja” pada situs e‑commerce meniru keranjang fisik di toko, sehingga pengguna secara otomatis mengerti fungsi tersebut tanpa penjelasan tambahan. Sebaliknya, istilah teknis seperti “HTTP 404” tanpa konteks dapat membingungkan pengguna awam.
> >
> > Implementasinya melibatkan pemetaan konsep dunia nyata ke dalam antarmuka digital, termasuk penggunaan format tanggal yang sesuai budaya, satuan ukuran yang familiar, dan urutan langkah yang mencerminkan prosedur nyata (misalnya, proses checkout yang mengikuti urutan “pilih barang → masukkan alamat → bayar”). Dengan mencocokkan sistem ke dunia nyata, mental model pengguna terbentuk secara akurat, mempercepat pembelajaran dan mengurangi kesalahan.
> >
> > ### 3. User Control and Freedom
> >
> > Pengguna sering melakukan aksi yang tidak diinginkan atau berubah pikiran; sistem harus menyediakan cara keluar yang jelas, seperti tombol “Cancel”, “Back”, atau fungsi “Undo/Redo”. Contoh praktis: pada editor teks, kombinasi Ctrl+Z memungkinkan pengguna membatalkan perubahan terakhir, sementara Ctrl+Y mengulangi aksi yang dibatalkan. Tanpa kontrol ini, pengguna akan merasa “terjebak” dan cenderung menghindari sistem.
> >
> > Dari sudut pandang desain, kontrol yang cukup memberi ruang bagi eksplorasi (trial‑and‑error) dan meningkatkan rasa aman. Implementasi yang baik mencakup konfirmasi sebelum aksi destruktif (misalnya, “Apakah Anda yakin ingin menghapus file ini?”) serta kemampuan untuk kembali ke keadaan sebelumnya tanpa kehilangan data.
> >
> > ### 4. Consistency and Standards
> >
> > Konsistensi berarti elemen yang serupa harus terlihat dan berperilaku serupa di seluruh sistem, serta mengikuti standar platform (misalnya, pedoman Material Design untuk Android). Jika tombol “Simpan” berwarna biru di satu layar, tombol dengan fungsi yang sama tidak boleh berubah menjadi hijau pada layar lain, karena hal ini menambah beban kognitif pengguna.
> >
> > Standar eksternal, seperti konvensi penempatan menu di bagian atas atau penggunaan ikon “gear” untuk pengaturan, membantu pengguna mentransfer pengetahuan dari aplikasi lain. Konsistensi internal dan eksternal mempercepat pembelajaran, mengurangi kebutuhan memori jangka pendek, dan menurunkan risiko kesalahan.
> >
> > ### 5. Error Prevention
> >
> > Lebih baik mencegah kesalahan daripada menanganinya setelah terjadi. Teknik pencegahan meliputi pembatasan input (constraint), validasi real‑time (misalnya, menandai format email yang salah saat mengetik), dan konfirmasi aksi berisiko tinggi (seperti “Hapus semua data?”). Contoh: pada formulir pembayaran, tombol “Submit” dinonaktifkan sampai semua bidang terisi dengan format yang valid.
> >
> > Pencegahan kesalahan mengurangi beban mental pengguna karena mereka tidak perlu mengingat langkah perbaikan. Selain itu, strategi ini menurunkan frekuensi “slips” (kesalahan eksekusi) yang sering muncul pada antarmuka yang kurang terstruktur.
> >
> > ### 6. Recognition Rather Than Recall
> >
> > Sistem harus menampilkan opsi, aksi, dan informasi secara langsung sehingga pengguna tidak perlu mengingatnya dari memori. Misalnya, menu dropdown yang menampilkan semua pilihan negara memudahkan pengguna dibandingkan meminta mereka mengetik kode ISO secara manual. Pada aplikasi mobile, ikon tab bar yang selalu terlihat membantu pengguna mengenali fungsi utama tanpa harus mengingat urutan menu tersembunyi.
> >
> > Prinsip ini selaras dengan batas kapasitas memori kerja manusia (sekitar 7 ± 2 item). Dengan menampilkan pilihan secara eksplisit, waktu pencarian berkurang, dan tingkat kesalahan menurun. Desain yang mengandalkan pengenalan juga lebih inklusif bagi pengguna dengan keterbatasan kognitif.
> >
> > ### 7. Flexibility and Efficiency of Use
> >
> > Sistem harus melayani dua kelompok utama: pengguna pemula yang membutuhkan panduan jelas, dan pengguna berpengalaman yang menginginkan kecepatan. Fitur shortcut (misalnya, Ctrl+S untuk menyimpan) atau akselerator (gesture swipe) memberikan jalur cepat bagi ahli, sementara tutorial atau tooltip membantu pemula. Personalisasi, seperti menyimpan preferensi tampilan, juga meningkatkan efisiensi.
> >
> > Contoh nyata: pada IDE pemrograman, pengguna dapat menyesuaikan keybinding sesuai kebiasaan mereka, sehingga alur kerja menjadi lebih cepat tanpa mengorbankan kegunaan bagi pengguna baru yang masih mengandalkan menu standar.
> >
> > ### 8. Aesthetic and Minimalist Design
> >
> > Desain yang bersih menampilkan hanya informasi yang relevan dengan tugas saat itu. Elemen dekoratif yang tidak diperlukan bersaing dengan konten penting, mengalihkan perhatian pengguna. Misalnya, halaman login yang hanya menampilkan bidang username, password, dan tombol “Login” lebih efektif daripada menambahkan gambar latar yang besar dan teks promosi.
> >
> > Prinsip estetika tidak berarti mengorbankan fungsi; sebaliknya, visual yang terstruktur dengan baik mempercepat pencarian informasi dan mengurangi beban kognitif. Penggunaan ruang putih (white space) secara strategis membantu memisahkan kelompok elemen, meningkatkan keterbacaan.
> >
> > ### 9. Help Users Recognize, Diagnose, and Recover from Errors
> >
> > Pesan kesalahan harus jelas, menggunakan bahasa yang dimengerti pengguna, dan menyertakan langkah perbaikan. Contoh: alih-alih menampilkan “Error 404”, sistem dapat menampilkan “Halaman tidak ditemukan. Periksa kembali URL atau kembali ke beranda.” Menyertakan tautan “Kembali ke beranda” atau “Hubungi dukungan” mempercepat pemulihan.
> >
> > Selain teks, visual cue seperti ikon peringatan berwarna merah membantu pengguna mengidentifikasi masalah dengan cepat. Penyediaan contoh solusi (misalnya, “Pastikan tidak ada spasi di akhir”) mengurangi frustrasi dan meningkatkan kepuasan.
> >
> > ### 10. Help and Documentation
> >
> > Idealnya, sistem dapat dipelajari tanpa bantuan, namun dokumentasi tetap penting untuk tugas kompleks atau situasi kegagalan. Dokumentasi harus mudah dicari (misalnya, melalui ikon “?” di pojok kanan atas), berorientasi pada tugas (langkah‑langkah spesifik), dan berisi contoh konkret. Video tutorial atau animasi interaktif dapat meningkatkan pemahaman dibandingkan teks panjang.
> >
> > Dokumentasi yang terintegrasi dalam konteks (in‑app help) memungkinkan pengguna mengakses bantuan tepat pada saat mereka membutuhkannya, mengurangi gangguan alur kerja.
> > 
> > ---
> >
> > ### 11. Using Heuristics for Evaluation
> >
> > Heuristik Nielsen bukanlah checklist biner “lulus/gagal”, melainkan kerangka kerja untuk mengidentifikasi masalah kegunaan, menganalisis penyebabnya, dan menghasilkan rekomendasi perbaikan. Proses evaluasi biasanya melibatkan 3‑5 evaluator yang menelusuri antarmuka secara independen, mencatat pelanggaran tiap heuristik, dan kemudian mengkonsolidasikan temuan. Setiap temuan diberi rating keparahan (severity rating) untuk memprioritaskan perbaikan.
> >
> > Evaluasi heuristik efektif pada tahap awal desain karena tidak memerlukan pengguna akhir, sehingga biaya dan waktu dapat ditekan. Namun, hasilnya tetap perlu divalidasi melalui pengujian pengguna sesungguhnya untuk memastikan bahwa perbaikan memang meningkatkan pengalaman nyata.
> >
> > ### 12. Severity Rating Scale
> >
> > Skala keparahan biasanya berkisar dari 0 (tidak masalah) hingga 4 (kritis). Penilaian mempertimbangkan frekuensi terjadinya masalah, dampaknya pada tugas, dan kemudahan perbaikan. Contoh: sebuah tombol “Submit” yang tidak responsif pada semua browser mendapat rating 4 karena menghentikan alur kerja utama, sedangkan teks kecil yang sulit dibaca pada layar besar mungkin mendapat rating 2.
> >
> > Dengan skala ini, tim desain dapat membuat roadmap perbaikan yang terstruktur, memfokuskan sumber daya pada isu‑isu yang paling merugikan pengguna.
> >
> > ### 13. Comparative Heuristic Adaptations
> >
> > Meskipun Nielsen’s 10 heuristik bersifat universal, beberapa domain (misalnya, perangkat medis, sistem kendaraan) menambahkan heuristik khusus seperti “Safety Critical Feedback” atau “Regulatory Compliance”. Adaptasi ini tetap berlandaskan pada prinsip dasar Nielsen, namun menyesuaikan contoh dan prioritasnya. Misalnya, pada sistem kontrol pesawat, “Error Prevention” menjadi lebih ketat dengan penggunaan interlock fisik.
> >
> > Memahami adaptasi ini membantu evaluator menilai apakah heuristik standar sudah cukup atau perlu diperluas untuk konteks tertentu.
> >
> > ### 14. Tool Support and Automation
> >
> > Berbagai alat bantu (tool) dapat mempercepat proses evaluasi heuristik, seperti Nielsen’s Heuristic Evaluation Checklist di dalam software prototyping (Figma, Adobe XD) atau plugin khusus untuk mengidentifikasi pelanggaran konsistensi otomatis. Meskipun otomatisasi tidak dapat menggantikan penilaian kualitatif, ia membantu mengumpulkan data kuantitatif (misalnya, jumlah elemen yang tidak memiliki label) yang dapat dipresentasikan kepada stakeholder.
> >
> > Integrasi dengan sistem pelacakan isu (Jira, Trello) memungkinkan tim mengubah temuan heuristik menjadi tiket perbaikan yang terstruktur.
> >
> > ### 15. Limitations and Critiques
> >
> > Heuristik Nielsen, meskipun populer, memiliki keterbatasan. Karena bersifat umum, mereka dapat terlalu luas untuk aplikasi yang sangat khusus, sehingga evaluator harus menafsirkan secara kontekstual. Selain itu, fokus pada “usability” saja tidak selalu mencakup aspek “accessibility” bagi pengguna dengan disabilitas. Kritik lain menyebutkan bahwa heuristik tidak memberikan panduan tentang prioritas implementasi tanpa skala keparahan yang terstandarisasi.
> >
> > Oleh karena itu, penggunaan heuristik sebaiknya dipadukan dengan metode lain seperti pengujian pengguna, analisis tugas, dan audit aksesibilitas untuk memperoleh gambaran yang lebih komprehensif.

> [!cornell] #### Summary
>
> **Nielsen’s 10 Usability Heuristics** menyediakan kerangka kerja universal untuk menilai dan memperbaiki kegunaan antarmuka, mulai dari memastikan visibilitas status sistem hingga menyediakan bantuan dokumentasi yang mudah diakses. Setiap heuristik menekankan prinsip psikologis manusia—seperti kebutuhan akan kontrol, pengenalan, dan konsistensi—yang bila dipenuhi akan mengurangi beban kognitif dan meminimalkan kesalahan. Evaluasi heuristik melibatkan identifikasi pelanggaran, penilaian keparahan, serta adaptasi kontekstual bila diperlukan, sementara alat bantu dan skala keparahan membantu mengubah temuan menjadi tindakan perbaikan yang terstruktur. Memahami keterbatasan heuristik dan menggabungkannya dengan metode lain memastikan solusi yang tidak hanya usable tetapi juga inklusif dan aman.

> [!ad-libitum]- Additional Information
>
> #### Formal Heuristic Evaluation Methodology
>
> Metodologi evaluasi heuristik biasanya mengikuti lima langkah utama: (1) persiapan materi (prototype atau sistem yang akan dievaluasi), (2) seleksi evaluator (biasanya 3‑5 orang dengan latar belakang desain atau pengembangan), (3) inspeksi independen dimana tiap evaluator mencatat pelanggaran per heuristik, (4) konsolidasi temuan melalui sesi de‑briefing, dan (5) prioritisasi berdasarkan severity rating. Penelitian oleh Nielsen (1990) menunjukkan bahwa tiga evaluator dapat menemukan sekitar 66 % masalah utama, sementara penambahan evaluator memberikan keuntungan marginal. Penting untuk mencatat konteks penggunaan (misalnya, perangkat mobile vs desktop) karena beberapa heuristik (seperti “Aesthetic and Minimalist Design”) dapat memiliki interpretasi berbeda tergantung pada ukuran layar.
>
> #### Severity Rating Scale – Detailed Guidelines
>
> Skala keparahan 0‑4 dapat diperkaya dengan kriteria kuantitatif:
>
> - **0 (Tidak ada masalah)**: Tidak memengaruhi tugas.
> - **1 (Minor)**: Menyebabkan sedikit gangguan, mudah diabaikan.
> - **2 (Moderate)**: Menghambat alur kerja, tetapi masih dapat diselesaikan dengan usaha ekstra.
> - **3 (Serius)**: Menghalangi penyelesaian tugas utama, memerlukan intervensi.
> - **4 (Kritis)**: Mengakibatkan kegagalan total atau potensi bahaya (misalnya, data hilang).
>
> Penilaian harus melibatkan diskusi tim untuk mengurangi bias individu. Beberapa studi (Sauro & Lewis, 2016) merekomendasikan penambahan dimensi “frequency” (jarang vs. sering) untuk menambah kedalaman analisis.
>
> #### Advanced Tool Support and Automation
>
> Beberapa platform prototyping modern menyediakan plugin heuristik otomatis. Misalnya, **Figma** memiliki plugin “Heuristic Checker” yang menandai elemen UI tanpa label, warna kontras rendah, atau inkonsistensi tipografi. **Axure RP** memungkinkan penambahan komentar berbasis heuristik langsung pada widget, memudahkan kolaborasi tim. Di sisi lain, **Eye‑Tracking** dapat dipadukan dengan heuristik untuk mengidentifikasi area yang tidak mendapat perhatian (misalnya, pesan error yang tidak dilihat). Integrasi data eye‑tracking dengan heuristik “Visibility of System Status” memberikan bukti empiris tentang efektivitas feedback visual.
>
> #### Limitations, Extensions, and Future Directions
>
> Kritik utama terhadap heuristik Nielsen adalah kurangnya fokus pada **aksesibilitas** (WCAG) dan **konteks budaya**. Penel