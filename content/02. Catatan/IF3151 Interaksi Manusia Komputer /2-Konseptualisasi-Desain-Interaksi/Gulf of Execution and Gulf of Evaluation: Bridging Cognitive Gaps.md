---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3151 Interaksi Manusia Komputer]]

> [!cornell] Gulf of Execution and Gulf of Evaluation: Bridging Cognitive Gaps
>
> > ## Questions/Cues
> >
> > - Mengapa pengguna tidak menemukan tindakan yang tepat?
> > - Bagaimana sistem memberi isyarat yang jelas?
> > - Apa penyebab kebingungan setelah respons sistem muncul?
> > - Bagaimana memetakan niat pengguna ke operasi sistem?
> > - Teknik apa yang memperkecil jurang evaluasi?
> > - Contoh konkret jurang eksekusi dalam formulir online?
> > - Cara mengukur kejelasan umpan balik sistem?
> >
> > ## Reference Points
> >
> > - Interaksi_Manusia‑Komputer_IF3151.pdf (Halaman 20‑23)
> > - Interaksi_Manusia‑Komputer_IF3151.pdf (Halaman 24‑26)
> > - Interaksi_Manusia‑Komputer_IF3151.pdf (Halaman 30‑31)
>
> > ### Gulf of Execution
> >
> > Jurang eksekusi merupakan jarak kognitif antara apa yang pengguna harapkan dapat dicapai dan operasi yang tersedia pada antarmuka. Ketika pengguna memiliki niat tertentu—misalnya ingin mengirimkan data—mereka harus menemukan elemen antarmuka yang dapat mewujudkan niat tersebut. Jika elemen tersebut tidak terlihat, tidak memiliki label yang tepat, atau tidak berada pada lokasi yang logis, pengguna akan terpaksa menebak‑tebak atau mencari alternatif lain. Hal ini meningkatkan beban mental dan menurunkan efisiensi interaksi.
> >
> > Salah satu penyebab utama jurang eksekusi adalah kurangnya **affordance** yang tepat. Affordance adalah sifat visual atau tekstural yang memberi petunjuk tentang cara suatu objek dapat digunakan. Misalnya, tombol yang tampak menonjol dan berbayang memberi sinyal bahwa ia dapat ditekan. Jika affordance tidak konsisten—seperti tombol yang tampak tidak dapat ditekan padahal fungsinya aktif—pengguna akan mengalami kebingungan.
> >
> > **Signifier** berperan melengkapi affordance dengan menambahkan petunjuk eksplisit, seperti ikon panah pada kontrol slider atau label “Submit” pada tombol kirim. Signifier membantu pengguna memetakan niat mereka ke operasi yang tersedia. Tanpa signifier yang jelas, pengguna mungkin tidak menyadari bahwa suatu elemen dapat diinteraksikan, sehingga jurang eksekusi melebar.
> >
> > **Mapping** atau pemetaan hubungan antara kontrol dan hasilnya juga penting. Pemetaan yang intuitif (misalnya, memutar knob ke kanan untuk meningkatkan volume) mengurangi kebutuhan pengguna untuk mengingat aturan‑aturan khusus. Ketika pemetaan tidak logis—seperti menempatkan tombol “Simpan” di pojok kanan atas sementara “Batal” di kiri bawah—pengguna harus menghabiskan waktu ekstra untuk menebak fungsi masing‑masing, yang memperlebar jurang eksekusi.
> >
> > **Contoh praktis**: Pada sebuah formulir online, pengguna ingin mengirimkan data tetapi tidak menemukan tombol “Kirim”. Sebaliknya, terdapat teks berwarna biru “Lanjutkan” yang tidak jelas apakah berfungsi sebagai tombol kirim atau hanya navigasi ke halaman berikutnya. Karena affordance dan signifier tidak konsisten, pengguna mengalami jurang eksekusi yang signifikan.
> >
> > ### Gulf of Evaluation
> >
> > Jurang evaluasi adalah jarak kognitif antara perubahan yang terjadi pada sistem setelah operasi dilakukan dan kemampuan pengguna untuk menafsirkan perubahan tersebut sebagai indikasi pencapaian tujuan. Setelah pengguna menekan tombol atau melakukan operasi lain, sistem harus memberikan **feedback** yang dapat dipahami dengan cepat. Jika umpan balik tidak jelas, tidak konsisten, atau terlambat, pengguna tidak dapat menilai apakah tindakan mereka berhasil atau tidak.
> >
> > **Feedback** dapat berupa perubahan visual (misalnya, perubahan warna tombol menjadi abu‑abu), audio (bunyi klik), atau teks (pesan konfirmasi). Feedback yang baik harus memenuhi tiga kriteria: (1) **keterlihatan** (mudah dilihat atau didengar), (2) **kesesuaian waktu** (segera muncul setelah aksi), dan (3) **keterkaitan** (menunjukkan secara langsung hubungan antara aksi dan hasil). Jika salah satu kriteria tidak terpenuhi, jurang evaluasi akan melebar.
> >
> > **Status** dan **representasi sistem** membantu pengguna memahami keadaan internal sistem. Misalnya, pada proses unggahan file, indikator progres berbentuk bar yang mengisi secara bertahap memberi gambaran berapa persen data telah terkirim. Tanpa representasi ini, pengguna mungkin mengira proses selesai padahal masih berlangsung, sehingga menilai hasil secara keliru.
> >
> > **Contoh praktis**: Setelah menekan “Submit” pada formulir, halaman hanya melakukan reload tanpa menampilkan pesan apa pun. Pengguna tidak dapat mengetahui apakah data berhasil dikirim atau terjadi error. Karena tidak ada feedback yang memadai, jurang evaluasi menjadi lebar, dan pengguna cenderung mengulangi aksi atau meninggalkan aplikasi.
> >
> > ### Bridging the Gaps: Affordance, Signifier, Mapping, Feedback, Status, and Representation
> >
> > Mengurangi jurang eksekusi dan evaluasi memerlukan pendekatan terintegrasi yang memperhatikan semua elemen di atas. Pertama, **affordance** harus dirancang agar secara visual menonjol dan konsisten dengan fungsi yang diharapkan. Kedua, **signifier** harus melengkapi affordance dengan label atau ikon yang eksplisit, sehingga tidak ada ambiguitas tentang apa yang dapat dilakukan. Ketiga, **mapping** harus mengikuti konvensi budaya atau standar industri sehingga pengguna tidak perlu belajar kembali cara kerja kontrol.
> >
> > Pada sisi evaluasi, **feedback** harus diberikan segera setelah aksi, dengan tingkat kejelasan yang cukup untuk menginformasikan status sistem. **Status** dapat ditampilkan melalui indikator progres, perubahan warna, atau notifikasi teks yang menjelaskan hasil secara spesifik (misalnya, “Data berhasil disimpan”). **Representasi sistem** yang baik menyajikan informasi internal (seperti jumlah item dalam keranjang belanja) dalam format yang mudah dipahami. Kombinasi elemen‑elemen ini menciptakan “jembatan” yang menghubungkan niat pengguna dengan hasil sistem secara mulus.
> >
> > **Prinsip desain** yang dapat diikuti: (a) gunakan warna kontras untuk menandai elemen interaktif, (b) berikan label yang singkat namun deskriptif, (c) tempatkan kontrol pada posisi yang logis sesuai alur kerja, (d) tampilkan umpan balik dalam rentang waktu kurang dari 100 ms untuk interaksi cepat, dan (e) sediakan opsi bantuan atau tooltip bagi pengguna yang membutuhkan penjelasan tambahan. Dengan menerapkan prinsip‑prinsip ini, jurang kognitif dapat diperkecil secara signifikan.
> >
> > ### Diagnostic Process Using the Gaps
> >
> > Analisis interaksi yang bermasalah dapat dimulai dengan mengidentifikasi di mana jurang paling lebar muncul. Langkah pertama adalah menanyakan: “Apakah pengguna dapat menemukan operasi yang tepat untuk mencapai niatnya?” Jika jawabannya negatif, fokus pada **jurang eksekusi**. Selanjutnya, periksa apakah setelah operasi dilakukan, pengguna menerima umpan balik yang cukup untuk menilai hasil. Jika tidak, fokus pada **jurang evaluasi**.
> >
> > Pada tahap diagnostik, pengamat dapat mencatat titik‑titik friksi, seperti klik yang tidak menghasilkan perubahan visual, atau tampilan halaman yang tidak memberikan konfirmasi. Data ini kemudian dihubungkan kembali ke elemen‑elemen desain (affordance, signifier, mapping, feedback, status, representasi) untuk menemukan akar penyebab. Misalnya, jika banyak pengguna melaporkan kebingungan pada tombol “Lanjutkan”, kemungkinan signifier tidak cukup jelas atau mapping tidak intuitif.
> >
> > Setelah penyebab diidentifikasi, solusi dapat dirumuskan secara spesifik: mengganti teks tombol, menambahkan ikon, menyesuaikan warna, atau menambahkan notifikasi konfirmasi. Proses ini bersifat iteratif; setiap perubahan diuji kembali untuk memastikan jurang telah menyempit. Dengan pendekatan berbasis jurang, tim desain dapat bergerak dari “keluhan umum” ke “diagnosis terperinci” tanpa menyalahkan pengguna.
> >
> > ### Common Pitfalls and Design Implications
> >
> > Beberapa kesalahan desain yang sering memperlebar jurang eksekusi meliputi: (1) **elemen tersembunyi**—kontrol yang berada di dalam menu dropdown yang tidak terlihat pada pandangan pertama; (2) **label ambigu**—kata-kata yang dapat diinterpretasikan ganda, seperti “Simpan” yang dapat berarti menyimpan draft atau mengirim final; (3) **inkonsistensi visual**—tombol dengan gaya berbeda pada halaman yang sama, membuat pengguna ragu apakah semuanya berfungsi.
> >
> > Pada sisi evaluasi, kesalahan umum meliputi: (1) **feedback yang terlambat**—proses yang memakan waktu lama tanpa indikator progres; (2) **pesan error yang tidak informatif**—hanya menampilkan “Error” tanpa menjelaskan penyebabnya; (3) **hilangnya status penting**—misalnya, tidak menampilkan jumlah item dalam keranjang belanja setelah penambahan.
> >
> > Implikasi desainnya adalah perlunya **audit konsistensi** secara berkala, penggunaan **pattern library** yang mendefinisikan affordance, signifier, dan feedback standar, serta **pengujian kegunaan** yang menekankan pada deteksi jurang. Dengan mengintegrasikan audit ini ke dalam siklus pengembangan, tim dapat mencegah jurang berkembang menjadi masalah besar.

> [!cornell] #### Summary
>
> **Jurang eksekusi** muncul ketika niat pengguna tidak dapat dipetakan ke operasi antarmuka yang jelas, sementara **jurang evaluasi** terjadi ketika respons sistem tidak memberikan umpan balik yang dapat dipahami. Kedua jurang dapat dipersempit dengan memperkuat **affordance**, **signifier**, **mapping**, serta menyediakan **feedback**, **status**, dan **representasi** yang tepat waktu dan mudah dimengerti. Proses diagnosis berfokus pada identifikasi titik‑titik friksi, menghubungkannya ke elemen desain, dan melakukan iterasi perbaikan. Menghindari kesalahan umum seperti elemen tersembunyi, label ambigu, dan feedback yang tidak informatif merupakan langkah kunci untuk menciptakan interaksi yang mulus dan efektif.

> [!ad-libitum]- Additional Information
>
> #### Formal Cognitive Model of Interaction Gaps
>
> Model kognitif yang sering dipakai untuk menjelaskan jurang eksekusi dan evaluasi adalah **Model Proses Informasi** yang melibatkan tiga tahap utama: (1) **Persepsi** (pengguna mengamati antarmuka), (2) **Interpretasi** (pengguna menafsirkan apa yang dilihat), dan (3) **Aksi** (pengguna melakukan operasi). Dalam konteks jurang, kesenjangan terjadi ketika persepsi tidak cukup kuat untuk menghasilkan interpretasi yang akurat, atau ketika interpretasi tidak dapat diterjemahkan menjadi aksi yang tepat. Formalisasi matematis dapat menggunakan fungsi probabilitas P(A|I) yang menggambarkan kemungkinan aksi A diberikan informasi I yang dipersepsikan. Meminimalkan entropi H(A|I) berarti mengurangi ketidakpastian pengguna, yang secara langsung memperkecil jurang.
>
> Model ini juga dapat diperluas dengan **Model Kontrol Feedback** yang menambahkan loop evaluasi: setelah aksi, sistem menghasilkan sinyal S, dan pengguna memperbarui model internal M′ = f(M, S). Jika fungsi f tidak dapat diprediksi karena sinyal S tidak representatif, jurang evaluasi tetap lebar. Pendekatan formal ini membantu perancang mengkuantifikasi kejelasan sinyal dan mengoptimalkan desain berdasarkan metrik entropi atau mutual information.
>
> #### Measurement and Evaluation Techniques
>
> Untuk mengukur lebar jurang secara empiris, peneliti dapat menggunakan **metode think‑aloud protocol**, di mana pengguna mengungkapkan pikirannya secara verbal selama interaksi. Analisis transkrip mengidentifikasi titik di mana pengguna menyatakan kebingungan atau harus menebak‑tebak, yang menandakan jurang eksekusi. Selain itu, **eye‑tracking** dapat mengungkapkan apakah pengguna melihat elemen yang diharapkan (affordance) atau beralih ke area lain karena tidak menemukan petunjuk yang jelas.
>
> Pada sisi evaluasi, **log analisis** (misalnya, mencatat waktu antara aksi dan munculnya pesan konfirmasi) memberikan data kuantitatif tentang latency feedback. **Questionnaire SUS‑like** yang dimodifikasi khusus untuk jurang (misalnya, “Saya yakin bahwa sistem memberi tahu saya hasil tindakan saya”) dapat menghasilkan skor yang di‑benchmark terhadap standar industri. Kombinasi teknik kualitatif dan kuantitatif ini memberikan gambaran menyeluruh tentang seberapa efektif jembatan desain.
>
> #### Advanced Design Patterns for Reducing Gaps
>
> Beberapa pola desain lanjutan telah terbukti efektif dalam memperkecil jurang. **Progressive Disclosure** menampilkan kontrol tambahan hanya ketika diperlukan, sehingga mengurangi beban kognitif pada tahap awal dan memperjelas affordance. **Skeleton Screens** memberikan representasi visual sementara data sedang dimuat, sehingga pengguna tidak berada dalam keadaan “gelap” menunggu respons. **Micro‑animations** yang menandai transisi (misalnya, animasi tombol berubah warna saat ditekan) meningkatkan kejelasan feedback tanpa menambah beban visual.
>
> Pola **Error‑Preventive Design** (misalnya, menonaktifkan tombol “Submit”