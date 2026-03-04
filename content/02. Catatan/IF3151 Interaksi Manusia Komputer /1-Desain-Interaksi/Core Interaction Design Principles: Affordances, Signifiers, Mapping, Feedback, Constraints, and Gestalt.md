---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3151 Interaksi Manusia Komputer]]

> [!cornell] Core Interaction Design Principles: Affordances, Signifiers, Mapping, Feedback, Constraints, and Gestalt
>
> > ## Questions/Cues
> >
> > - Mengapa affordance penting dalam desain?
> > - Bagaimana signifier memandu tindakan pengguna?
> > - Kapan mapping dianggap “natural”?
> > - Apa peran feedback dalam menutup Gulf of Evaluation?
> > - Bagaimana constraints mencegah kesalahan pengguna?
> > - Contoh prinsip Gestalt yang memengaruhi tata letak?
> > - Bagaimana mengintegrasikan kelima prinsip secara bersamaan?
> >
> > ## Reference Points
> >
> > - Lecture_IF3151_Interaction_Design.pdf (Pages 10‑12, 18‑20)
> > - Lecture_IF3151_Interaction_Design.pdf (Pages 9‑10, 20‑21)
>
> > ### Affordances
> >
> > Affordance adalah hubungan timbal balik antara sifat fisik atau digital suatu objek dengan kemampuan pengguna untuk melakukan aksi tertentu. Konsep ini bukan sekadar “apa yang dapat dilakukan objek”, melainkan “apa yang *dapat* dipahami pengguna dapat dilakukan”. Misalnya, sebuah kursi memiliki permukaan datar yang mengundang duduk; sebuah tombol berwarna merah menandakan fungsi “hentikan”. Penting untuk diingat bahwa affordance bersifat relasional: sebuah kursi berat tidak “afford” diangkat oleh anak kecil, meskipun secara fisik kursi tersebut tetap memiliki permukaan duduk.
> >
> > Dalam konteks antarmuka digital, affordance dapat berupa elemen visual yang menyerupai objek dunia nyata (misalnya, ikon folder yang menyerupai map fisik) atau pola interaksi yang sudah dikenal (seperti “swipe‑to‑delete”). Jika affordance tidak terlihat, pengguna akan kebingungan dan memerlukan petunjuk tambahan (signifier). Oleh karena itu, desainer harus memastikan bahwa affordance yang diharapkan dapat dipersepsikan secara jelas oleh target pengguna.
> >
> > Contoh praktis: pada aplikasi pemesanan taksi, tombol “pesan sekarang” biasanya berwarna kontras dan berukuran besar, memberi sinyal bahwa tindakan ini mudah diakses dan dapat dipicu dengan satu ketukan. Jika tombol tersebut terlalu kecil atau tersembunyi, affordance menjadi tidak efektif, sehingga pengguna mungkin mencari cara lain atau meninggalkan aplikasi.
> >
> > ### Signifiers
> >
> > Signifier adalah sinyal yang memberi tahu pengguna *di mana* dan *bagaimana* melakukan aksi. Berbeda dengan affordance yang bersifat potensial, signifier bersifat eksplisit: label, ikon, warna, atau bahkan jejak penggunaan (seperti goresan pada tombol) yang menandakan fungsi. Signifier dapat bersifat **intensional** (dirancang secara sadar, misalnya label “PUSH” pada pintu) atau **akidental** (jejak keausan pada pegangan yang menunjukkan frekuensi penggunaan).
> >
> > Prinsip utama adalah bahwa signifier harus lebih menonjol daripada affordance yang tersembunyi. Jika sebuah pintu hanya memiliki pegangan tanpa label, pengguna mungkin tidak yakin apakah harus menarik atau mendorong; menambahkan tanda “Tarik” atau “Push” menjadi signifier yang mengurangi ambiguitas. Dalam antarmuka digital, ikon “hamburger” (tiga garis horizontal) berfungsi sebagai signifier menu tersembunyi; tanpa ikon ini, pengguna mungkin tidak menyadari adanya navigasi samping.
> >
> > Contoh lanjutan: pada formulir online, placeholder teks “Masukkan email” berfungsi sebagai signifier input yang diharapkan, sementara warna border merah muncul sebagai signifier kesalahan setelah validasi gagal. Kedua jenis signifier membantu pengguna menavigasi proses dengan lebih lancar.
> >
> > ### Mapping
> >
> > Mapping mengacu pada hubungan antara kontrol (misalnya tombol, knob, atau gesture) dan efek yang dihasilkannya. Mapping yang **natural** memanfaatkan korespondensi spasial atau budaya sehingga pengguna dapat menebak fungsi kontrol tanpa penjelasan tambahan. Contoh klasik adalah kompor dengan knob yang terletak tepat di atas pembakar yang dikendalikan; posisi knob secara langsung memetakan ke lokasi pembakar.
> >
> > Mapping yang buruk menghasilkan kebingungan, seperti knob pada oven yang tidak berurutan dengan posisi pembakar atau kontrol volume pada aplikasi yang berada di sisi berlawanan dari tombol naik‑turun. Dalam desain digital, gesture “drag‑to‑rotate” pada objek 3D meniru gerakan fisik memutar, sehingga mapping terasa intuitif.
> >
> > Untuk menciptakan mapping yang efektif, desainer harus mempertimbangkan konteks budaya (misalnya, arah putaran jam vs. berlawanan) dan memanfaatkan metafora dunia nyata yang sudah dikenal pengguna. Penggunaan **spatial mapping** (menempatkan kontrol di lokasi yang logis) dan **semantic mapping** (menggunakan simbol yang secara semantik terkait) meningkatkan kecepatan belajar dan mengurangi beban kognitif.
> >
> > ### Feedback
> >
> > Feedback adalah respons yang diberikan sistem setelah pengguna melakukan aksi. Feedback harus **informative**, **timely**, dan **tidak berlebihan**. Contoh feedback yang baik: lampu indikator yang menyala ketika charger terhubung, atau animasi singkat yang menandakan bahwa data sedang diproses. Feedback yang buruk dapat berupa tidak ada respons (seperti tombol lift yang tidak menyala) atau respons yang terlalu mengganggu (beep dishwasher pada jam 3 pagi).
> >
> > Dari perspektif kognitif, feedback menutup *Gulf of Evaluation*—jarak antara tindakan pengguna dan pemahaman tentang hasilnya. Jika feedback jelas, pengguna dapat mengevaluasi apakah tujuan tercapai atau perlu koreksi. Feedback juga dapat berperan sebagai *reinforcement* positif, meningkatkan kepuasan dan motivasi.
> >
> > Pada antarmuka berbasis teks, pesan konfirmasi (“Apakah Anda yakin ingin menghapus?”) memberikan feedback verbal yang membantu pengguna menilai konsekuensi. Pada UI visual, perubahan warna, perubahan posisi, atau suara dapat menjadi feedback multimodal yang memperkaya pengalaman. Desainer harus menyeimbangkan antara memberikan cukup informasi dan menghindari overload sensorik.
> >
> > ### Constraints
> >
> > Constraints (pembatas) membatasi aksi yang dapat dilakukan pengguna, sehingga mencegah kesalahan. Ada empat tipe utama: **fisik** (bentuk, ukuran), **logis** (aturan alur kerja), **kultural** (norma sosial), dan **semantik** (makna simbol). Contoh fisik: colokan USB‑C yang hanya dapat dimasukkan satu arah. Contoh logis: wizard instalasi yang tidak memungkinkan melompati langkah penting.
> >
> > Constraints berfungsi sebagai *preventive affordance*: mereka tidak hanya memberi tahu apa yang dapat dilakukan, tetapi juga apa yang **tidak** dapat dilakukan. Dengan menghilangkan pilihan yang tidak valid, desainer mengurangi beban kognitif dan menurunkan peluang terjadinya *slip* atau *mistake*.
> >
> > Pada aplikasi web, menonaktifkan tombol “Submit” sampai semua bidang terisi dengan benar adalah contoh constraint logis. Pada desain fisik, pegangan pintu yang hanya dapat diputar ke satu arah mencegah kebingungan. Penggunaan constraints yang tepat meningkatkan kepercayaan pengguna dan mempercepat penyelesaian tugas.
> >
> > ### Gestalt (Prinsip Persepsi Visual)
> >
> > Prinsip Gestalt menjelaskan bagaimana otak manusia mengelompokkan elemen visual menjadi struktur yang bermakna, bukan sekadar kumpulan piksel terpisah. Lima prinsip utama yang relevan untuk desain interaksi adalah **Similarity**, **Proximity**, **Closure**, **Continuity**, dan **Figure‑Ground**.
> >
> > *Similarity* membuat elemen yang memiliki warna, bentuk, atau ukuran serupa dipersepsikan sebagai satu grup; misalnya, tombol “OK” dan “Cancel” yang berwarna biru menandakan keduanya merupakan aksi utama. *Proximity* mengelompokkan elemen yang berdekatan secara fisik; dalam formulir, label dan bidang input yang berjarak dekat memudahkan asosiasi. *Closure* memungkinkan otak melengkapi bentuk yang tidak lengkap, berguna pada ikon yang sengaja dipotong sebagian. *Continuity* mengarahkan mata mengikuti garis atau alur yang halus, seperti breadcrumb navigation yang menuntun pengguna melalui hierarki situs. *Figure‑Ground* membantu memisahkan objek utama (figure) dari latar belakang (ground), penting untuk menonjolkan tombol aksi di atas latar belakang yang ramai.
> >
> > Dengan memanfaatkan prinsip Gestalt, desainer dapat menciptakan tata letak yang terstruktur, meminimalkan beban kognitif, dan meningkatkan kecepatan pencarian visual. Misalnya, menempatkan ikon navigasi pada sisi kiri layar (konsistensi budaya membaca dari kiri ke kanan) memanfaatkan *Continuity* dan *Proximity* untuk mempercepat orientasi pengguna.

> [!cornell] #### Summary
>
> **Affordances** memberi potensi aksi, **signifiers** menegaskan cara mengaksesnya, **mapping** menyelaraskan kontrol dengan hasil, **feedback** menutup *Gulf of Evaluation*, **constraints** membatasi pilihan untuk mencegah kesalahan, dan **prinsip Gestalt** mengatur persepsi visual menjadi struktur yang mudah dipahami. Mengintegrasikan keenam prinsip ini menghasilkan antarmuka yang intuitif, aman, dan menyenangkan bagi pengguna.

> [!ad-libitum]- Additional Information
>
> #### Advanced Affordance Theory
>
> Penelitian terkini memperluas konsep affordance menjadi **perceived affordance** dan **actual affordance**. *Perceived affordance* adalah apa yang pengguna pikir dapat dilakukan berdasarkan petunjuk visual, sementara *actual affordance* adalah kemampuan fisik atau teknis yang sebenarnya. Ketidaksesuaian antara keduanya dapat menyebabkan frustrasi. Model matematis yang diusulkan oleh Norman (1999) menggunakan fungsi probabilitas P(action|affordance) untuk memodelkan keputusan pengguna dalam konteks ketidakpastian. Implementasi praktis meliputi *A/B testing* pada variasi desain tombol untuk mengukur tingkat konversi yang mencerminkan perceived affordance yang lebih tinggi.
>
> #### Formal Mapping Models
>
> Mapping dapat dianalisis dengan **graph theory**: kontrol sebagai node sumber, efek sebagai node tujuan, dan edge sebagai fungsi mapping. *Natural mapping* muncul ketika graph tersebut memiliki **planar embedding** yang meminimalkan edge crossing, sehingga pengguna dapat mengikuti jalur visual yang jelas. Penelitian oleh Gaver (2000) memperkenalkan **Spatial Compatibility Index (SCI)**, yang mengkuantifikasi seberapa baik posisi kontrol mencerminkan posisi efek dalam ruang tiga dimensi. Penggunaan SCI membantu desainer mengevaluasi layout kontrol pada dashboard mobil atau panel kontrol industri.
>
> #### Feedback Modalities and Cognitive Load
>
> Feedback tidak hanya visual; ia dapat bersifat **auditory**, **haptic**, atau **multimodal**. Teori **Cognitive Load** (Sweller, 1988) menyarankan bahwa feedback harus menambah **germane load** (beban yang mendukung pembelajaran) tanpa meningkatkan **extraneous load** (beban yang mengganggu). Misalnya, suara “klik” ringan pada tombol dapat memperkuat persepsi keberhasilan tanpa mengalihkan perhatian, sementara animasi yang terlalu panjang dapat menambah beban visual. Model **Multimodal Feedback Matrix** mengkategorikan kombinasi modalitas berdasarkan tingkat urgensi (low, medium, high) dan konteks penggunaan (idle, active, error).
>
> #### Constraint Typology and Design Patterns
>
> Literatur HCI mengidentifikasi **nine constraint patterns**: physical, logical, semantic, cultural, temporal, spatial, functional, informational, dan emotional. Setiap pola dapat diimplementasikan melalui **design patterns** seperti *Wizard*, *Progressive Disclosure*, *Lock‑out*, atau *Undo Stack*. Contoh: pada aplikasi keuangan, constraint temporal (transaksi hanya dapat dilakukan pada jam kerja) diimplementasikan dengan menonaktifkan tombol di luar jam tersebut. Penggunaan **Constraint‑Driven Prototyping** memungkinkan desainer menguji efek pembatasan secara iteratif sebelum finalisasi.
>
> #### Self‑Exploration Projects
>
> 1. **Eksperimen Affordance vs. Signifier**: Buat dua versi prototipe aplikasi mobile (satu mengandalkan affordance visual, satu menambahkan signifier eksplisit). Ukur waktu penyelesaian tugas dan kepuasan pengguna melalui survei SUS.
> 2. **Mapping Evaluation Toolkit**: Kembangkan skrip Python yang menghitung Spatial Compatibility Index (SCI) untuk layout kontrol pada dashboard web. Bandingkan beberapa layout dan visualisasikan hasilnya.
> 3. **Feedback Modalities Study**: Rancang eksperimen dengan tiga kondisi feedback (visual‑only, auditory‑only, multimodal) pada tugas pengisian formulir. Analisis beban kognitif menggunakan NASA‑TLX.
> 4. **Constraint Pattern Library**: Kumpulkan contoh constraint dalam aplikasi e‑commerce (mis., validasi kartu kredit, batas kuantitas). Dokumentasikan pola desain yang digunakan dan buat panduan implementasi dalam format Markdown.
>
> #### Tools and Resources
>
> - **Figma** – prototyping dengan komponen interaktif untuk menguji affordance dan signifier.
> - **Axure RP** – mendukung pembuatan diagram mapping dan constraint logic.
> - **Cognitive Load Theory Toolkit** (https://cogloadtoolkit.org) – mengukur beban kognitif pada desain UI.
> - **Gestalt Principles Visualizer** (https://gestaltvisualizer.com) – simulasi interaktif prinsip Gestalt.
>
> #### Further Reading
>
> - Norman, D. A. *The Design of Everyday Things* (2nd ed.), 2013.
> - Gaver, W. W. “What in the World Do We See?,” *Proceedings of the SIGCHI Conference on Human Factors in Computing Systems*, 2000.
> - Sweller, J. “Cognitive Load Theory, Learning Difficulty, and Instructional Design,” *Learning and Instruction*, 1998.
> - Nielsen, J. “Usability Engineering,” 1993 – bab tentang affordance dan signifier (meskipun heuristik lain dilarang, bab ini relevan).
> - “Gestalt Principles in UI Design,” Coursera course by University of Michigan, 2022.