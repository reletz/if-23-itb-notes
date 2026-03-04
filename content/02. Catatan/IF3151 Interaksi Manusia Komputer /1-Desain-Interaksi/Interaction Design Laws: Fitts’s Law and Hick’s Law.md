---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3151 Interaksi Manusia Komputer]]

> [!cornell] Interaction Design Laws: Fitts’s Law and Hick’s Law
>
> > ## Questions/Cues
> >
> > - Mengapa jarak memengaruhi waktu penekanan target?
> > - Bagaimana ukuran target mengurangi beban motorik?
> > - Kapan penggunaan Hick’s Law lebih relevan daripada Fitts’s Law?
> > - Apa arti koefisien *a* dan *b* dalam persamaan Fitts?
> > - Bagaimana cara menghitung *Index of Difficulty* secara praktis?
> >
> > ## Reference Points
> >
> > - Desain Interaksi & Faktor Manusia IF3151 (Halaman 24‑25)
>
> > ### Fitts’s Law – Prinsip Dasar
> >
> > Hukum Fitts menyatakan bahwa **waktu yang diperlukan untuk mengarahkan pointer (atau jari) ke sebuah target** meningkat secara logaritmik seiring bertambahnya jarak antara posisi awal pointer dan target, serta menurun ketika ukuran target menjadi lebih besar. Secara intuitif, hal ini dapat dibayangkan seperti mencoba menekan tombol pada layar sentuh: semakin jauh tombol tersebut dan semakin kecil ukurannya, semakin lama kita membutuhkan waktu untuk mencapainya. Persamaan matematis yang paling umum dipakai adalah:
> >
> > $$
> >
> > \text{Time (ms)} = a + b \cdot \log_2\!\left(\frac{D}{S}+1\right)
> >
> > $$
> >
> > di mana **D** adalah jarak Euclidean antara titik awal dan pusat target, **S** adalah lebar (atau diameter) target pada arah gerakan, dan **a**, **b** adalah konstanta yang ditentukan secara empiris untuk perangkat atau konteks tertentu. Bagian logaritma disebut *Index of Difficulty* (ID) dan mengukur “kesulitan” relatif dari gerakan tersebut.
> >
> > **Mengapa logaritma?** Penelitian awal Fitts (1954) menunjukkan bahwa hubungan antara jarak‑ukuran dan waktu tidak linear; manusia menyesuaikan kecepatan gerakan secara proporsional terhadap “informasi” yang harus diproses, yang dapat diukur dalam bit. Logaritma basis‑2 mengkonversi rasio D/S menjadi satuan informasi, sehingga setiap peningkatan satu bit (misalnya menggandakan rasio D/S) menambah waktu konstan *b*.
> >
> > **Implikasi desain:** Untuk antarmuka grafis, prinsip ini mendorong desainer membuat elemen yang sering dipilih **besar** dan **dekat** dengan area kerja utama. Contoh klasik adalah menempatkan tombol “Simpan” di pojok kanan‑bawah layar, dekat dengan posisi kursor setelah mengisi formulir, serta memberikan ukuran yang cukup agar mudah dijangkau pada perangkat mobile. Penggunaan tepi layar sebagai “target tak terbatas” (karena pointer tidak perlu bergerak melampaui batas) juga memanfaatkan Fitts’s Law untuk mempercepat interaksi.
> >
> > **Batasan:** Persamaan ini mengasumsikan gerakan satu‑dimensi lurus dan tidak memperhitungkan faktor-faktor seperti kelelahan otot, gangguan visual, atau variasi individu. Pada perangkat dengan kontrol non‑pointer (misalnya kontrol suara), Fitts’s Law tidak relevan.
> >
> > ### Hick’s Law – Prinsip Dasar
> >
> > Hukum Hick (atau Hick‑Hyman Law) menyatakan bahwa **waktu keputusan meningkat secara logaritmik dengan bertambahnya jumlah pilihan** yang tersedia bagi pengguna. Persamaan formalnya:
> >
> > $$
> >
> > \text{Time (ms)} = a + b \cdot \log_2 (n + 1)
> >
> > $$
> >
> > di mana **n** adalah jumlah alternatif yang dapat dipilih, dan **a**, **b** adalah konstanta empiris yang bergantung pada konteks (misalnya kompleksitas visual atau tingkat familiaritas pengguna). Penambahan “+1” memastikan bahwa ketika tidak ada pilihan (n = 0), waktu keputusan tidak menjadi negatif.
> >
> > **Mengapa logaritma?** Konsep ini berasal dari teori informasi: setiap pilihan menambah satu “bit” informasi yang harus diproses otak. Namun, otak manusia tidak memproses pilihan secara linear; penambahan pilihan pertama menambah beban kognitif yang signifikan, sedangkan penambahan pilihan selanjutnya memberikan peningkatan beban yang lebih kecil, sehingga hubungan logaritmik muncul.
> >
> > **Implikasi desain:** Pada menu, dialog, atau formulir, desainer sebaiknya **membatasi jumlah opsi** yang ditampilkan sekaligus. Teknik seperti *progressive disclosure* (menampilkan opsi tambahan hanya bila diperlukan) atau *categorical grouping* (mengelompokkan pilihan dalam sub‑menu) membantu menurunkan nilai *n* yang dirasakan pengguna. Contoh nyata: pada aplikasi pengaturan ponsel, opsi “Wi‑Fi”, “Bluetooth”, “Data Seluler” dikelompokkan dalam satu kategori “Koneksi”, sehingga pengguna tidak harus menilai semua opsi sekaligus.
> >
> > **Batasan:** Hick’s Law mengasumsikan bahwa semua pilihan memiliki tingkat kesetaraan dalam kompleksitas dan relevansi. Jika satu pilihan sangat menonjol (misalnya diberi warna atau ikon khusus), waktu keputusan dapat berkurang meskipun jumlah pilihan tetap tinggi. Selain itu, faktor budaya, pengalaman sebelumnya, dan konteks tugas dapat memodulasi nilai *b* secara signifikan.
> >
> > ### Perbandingan dan Kombinasi Kedua Hukum
> >
> > Meskipun Fitts’s Law berfokus pada **dimensi motorik** (gerakan fisik), Hick’s Law berurusan dengan **dimensi kognitif** (pemilihan keputusan). Dalam banyak antarmuka, kedua proses terjadi berurutan: pertama pengguna **memilih** sebuah opsi (Hick), kemudian **menargetkan** elemen UI yang mewakili opsi tersebut (Fitts). Oleh karena itu, desain yang optimal memperhatikan **kedua** aspek secara simultan. Misalnya, pada toolbar dengan banyak ikon, mengurangi jumlah ikon (Hick) sekaligus memperbesar ikon yang tersisa (Fitts) menghasilkan interaksi yang lebih cepat secara keseluruhan.
> >
> > **Strategi integratif:**
> >
> > 1. **Prioritaskan** elemen yang paling sering dipilih, tempatkan mereka dekat dengan area kerja utama dan beri ukuran yang cukup besar.
> > 2. **Kelompokkan** pilihan sekunder dalam submenu atau panel tersembunyi, sehingga nilai *n* pada tingkat pertama tetap rendah.
> > 3. **Gunakan** visual cue (warna, ikon) untuk menurunkan beban kognitif pada pilihan yang penting, sehingga nilai *b* pada Hick’s Law efektif berkurang.
> >
> > ### Contoh Praktis dalam Desain UI
> >
> > **Kasus 1 – Formulir Pendaftaran:** Pada halaman pendaftaran, terdapat tiga bidang utama (nama, email, kata sandi) dan satu tombol “Daftar”. Menurut Fitts, tombol “Daftar” harus **besar** dan **berdekatan** dengan bidang terakhir yang diisi, sehingga pengguna tidak harus menggerakkan pointer jauh. Menurut Hick, pilihan “Jenis Akun” (pribadi, bisnis, organisasi) sebaiknya ditampilkan sebagai **radio button** dalam satu baris, bukan sebagai dropdown dengan lima opsi, untuk mengurangi *n* pada tahap keputusan.
> >
> > **Kasus 2 – Aplikasi Mobile Banking:** Menu utama menampilkan lima ikon utama (Transfer, Bayar, Top‑up, Investasi, Lainnya). Untuk mengurangi beban keputusan, ikon “Lainnya” membuka submenu yang berisi opsi tambahan. Ikon‑ikon utama dibuat **besar** dan **diletakkan** di bagian bawah layar (dekat jari kanan pada kebanyakan pengguna), memanfaatkan Fitts’s Law pada perangkat sentuh.
> >
> > **Kasus 3 – Sistem Kendali Kendaraan:** Pada dashboard mobil, tombol “Darurat” (panic) berukuran besar dan terletak di tepi kanan setir, sehingga dalam situasi kritis pengguna dapat menekan dengan cepat (Fitts). Pilihan “Mode Berkendara” (Eco, Sport, Normal) biasanya dipilih melalui rotary knob dengan tiga posisi; jumlah pilihan yang terbatas (n = 3) memastikan keputusan cepat (Hick).
> >
> > ### Praktik Pengukuran dan Validasi
> >
> > Untuk mengaplikasikan hukum‑hukum ini secara ilmiah, desainer dapat melakukan **pengujian waktu** (time‑to‑acquire) dengan merekam **latency** antara tampilan target dan aksi klik pada berbagai jarak dan ukuran. Data yang terkumpul kemudian di‑fit ke persamaan linear pada skala logaritmik untuk mengekstrak nilai *a* dan *b*. Begitu pula, untuk Hick’s Law, waktu keputusan dapat diukur dengan menampilkan set pilihan dengan variasi *n* dan mencatat **reaction time**. Analisis regresi logaritmik memberikan estimasi koefisien yang dapat dibandingkan antar‑desain.
> >
> > **Catatan penting:** Pastikan kondisi percobaan konsisten (misalnya, pencahayaan, ukuran layar, postur pengguna) karena faktor‑faktor eksternal dapat memengaruhi nilai empiris.

> [!cornell] #### Summary
>
> **Fitts’s Law** menjelaskan bahwa waktu menargetkan sebuah elemen meningkat secara logaritmik dengan jarak dan menurun dengan ukuran, sehingga desain UI harus menempatkan elemen penting dekat dengan area kerja dan memberikannya ukuran yang memadai. **Hick’s Law** menyatakan bahwa waktu membuat keputusan tumbuh logaritmik seiring bertambahnya pilihan, mendorong desainer untuk membatasi jumlah opsi yang ditampilkan sekaligus menyorot pilihan utama. Kedua hukum saling melengkapi: mengurangi beban kognitif (Hick) sekaligus meminimalkan beban motorik (Fitts) menghasilkan interaksi yang lebih cepat, lebih akurat, dan lebih memuaskan bagi pengguna.

> [!ad-libitum]- Additional Information
>
> #### Formal Derivation of Fitts’s Index of Difficulty
>
> Asli Fitts menghubungkan gerakan manusia dengan teori informasi Shannon. Ia menganggap setiap gerakan sebagai transmisi sinyal dengan **bandwidth** terbatas, di mana **D/S** menjadi rasio sinyal‑to‑noise. Dengan mengasumsikan kecepatan konstan pada fase akselerasi dan deselerasi, ia memperoleh persamaan:
>
> $$
>
> ID = \log_2\!\left(\frac{D}{W}+1\right)
>
> $$
>
> di mana **W** adalah lebar target pada arah gerakan. Selanjutnya, **Index of Performance (IP)** didefinisikan sebagai:
>
> $$
>
> IP = \frac{1}{b}
>
> $$
>
> yang mengukur “kecepatan informasi” (bit per detik) yang dapat diproses oleh sistem motorik. Nilai IP yang tinggi menandakan efisiensi gerakan yang baik; dalam praktik, desainer UI dapat membandingkan IP antar‑versi prototipe untuk memilih layout yang paling ergonomis.
>
> #### Ekstensi dan Variasi pada Hick’s Law
>
> Model dasar Hick mengasumsikan pilihan **setara**. Beberapa penelitian menambahkan faktor **probabilitas** masing‑masing pilihan, menghasilkan **Hick‑Hyman Equation**:
>
> $$
>
> T = a + b \cdot \sum_{i=1}^{n} p_i \log_2\!\left(\frac{1}{p_i}\right)
>
> $$
>
> di mana \(p_i\) adalah probabilitas pilihan i. Persamaan ini mengakui bahwa pilihan yang lebih sering dipilih (probabilitas tinggi) menurunkan beban keputusan secara keseluruhan. Implementasi praktisnya meliputi penataan menu berdasarkan frekuensi penggunaan historis, sehingga opsi yang paling populer berada pada posisi yang paling mudah diakses.
>
> #### Optimasi Antarmuka Menggunakan Model Kombinasi
>
> Pendekatan **Multi‑Objective Optimization** dapat memformulasikan masalah penempatan elemen UI sebagai:
>
> $$
>
> \min_{x} \; \alpha \cdot \sum_{k} \bigl(a_k + b_k \log_2(D_k/S_k + 1)\bigr) + \beta \cdot \sum_{j} \bigl(c_j + d_j \log_2(n_j + 1)\bigr)
>
> $$
>
> di mana indeks *k* merujuk pada elemen target (Fitts) dan indeks *j* pada grup pilihan (Hick). Koefisien \(\alpha\) dan \(\beta\) menyeimbangkan prioritas motorik vs kognitif. Algoritma genetik atau simulated annealing sering dipakai untuk mencari konfigurasi layout yang meminimalkan fungsi biaya ini, terutama pada dashboard kompleks atau sistem kontrol industri.
>
> #### Edge Cases dan Nuansa Praktis
>
> 1. **Target “tak terbatas”** – Pada perangkat dengan tepi layar yang dapat dijangkau secara langsung (misalnya, swipe ke tepi), ukuran target efektif menjadi tak terbatas, sehingga ID mendekati 0. Namun, faktor **kecepatan gerakan** tetap dipengaruhi oleh jarak awal pointer ke tepi.
> 2. **Pilihan Hierarkis** – Jika pilihan disusun dalam hierarki (menu bertingkat), nilai *n* pada tingkat pertama biasanya kecil, tetapi total keputusan melibatkan **jumlah lapisan**. Total waktu keputusan menjadi penjumlahan logaritma pada tiap tingkat, sehingga menurunkan beban kognitif pada satu langkah tetapi menambah langkah keseluruhan.
> 3. **Pengaruh Multitasking** – Pada situasi multitasking, koefisien *b* pada kedua hukum dapat meningkat karena beban kognitif tambahan, sehingga estimasi waktu menjadi lebih konservatif.
>
> #### Self‑Exploration Projects
>
> 1. **Simulator Fitts‑Hick** – Buat aplikasi web yang memungkinkan pengguna mengatur nilai D, S, dan n, kemudian menampilkan prediksi waktu berdasarkan kedua hukum. Tambahkan opsi untuk mengubah koefisien a, b secara interaktif dan bandingkan hasil dengan data pengukuran nyata.
> 2. **Optimasi Layout Dashboard** – Implementasikan algoritma genetika yang mengoptimalkan posisi tombol pada dashboard (misalnya, sistem kontrol pabrik) dengan tujuan meminimalkan fungsi biaya gabungan Fitts‑Hick. Evaluasi hasil dengan uji pengguna dan analisis statistik.
>
> #### Tools and Resources
>
> - **FittsLawTool** (https://github.com/adamcoulter/fitts‑law‑tool) – kalkulator interaktif untuk menghitung ID dan IP pada berbagai perangkat.
> - **Hick’s Law Calculator** (https://hickslaw.com) – memungkinkan input jumlah pilihan dan menghasilkan estimasi waktu keputusan.
> - **Human‑Computer Interaction (HCI) Textbook** – *Interaction Design: Beyond Human‑Computer Interaction* oleh Preece, Rogers, & Sharp, bab 5 (pembahasan mendalam tentang Fitts & Hick).
> - **Research Paper**: “The Index of Difficulty Revisited” – MacKenzie, 1992, *Human Factors*.
> - **Course Material**: Stanford HCI Lectures (CS147) – video kuliah tentang model‑model kognitif dan motorik.
>
> #### Further Reading
>
> - Card, S. K., Moran, T. P., & Newell, A. (1983). *The Psychology of Human‑Computer Interaction*. Lawrence Erlbaum.
> - Accot, J., & Zhai, S. (1997). “Beyond Fitts’ Law: Models for Trajectory‑Based Interaction”. *Proceedings of CHI*.
> - Miller, G. A. (1956). “The Magical Number Seven, Plus or Minus Two”. *Psychological Review* – relevan untuk memahami batas kapasitas memori kerja yang memengaruhi Hick’s Law.
> - Norman, D. A. (2013). *The Design of Everyday Things* – bab tentang prinsip‑prinsip gerakan dan keputusan.
> - ISO 9241‑9:200