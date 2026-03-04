---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3151 Interaksi Manusia Komputer]]

> [!cornell] Goal‑Task‑Action Framework for Systematic Interaction Analysis
>
> > ## Questions/Cues
> >
> > - Bagaimana membedakan goal, task, dan action?
> > - Mengapa penting memisahkan level‑level interaksi?
> > - Langkah apa dalam analisis berbasis goal‑task‑action?
> > - Bagaimana mengidentifikasi kesenjangan antara tujuan dan aksi?
> > - Apa contoh konkret penerapan kerangka G‑T‑A?
> > - Bagaimana menguji asumsi desain menggunakan G‑T‑A?
> > - Bagaimana menghubungkan interpretasi pengguna dengan system image?
> >
> > ## Reference Points
> >
> > - Konseptualisasi Desain Interaksi IF3151 (Slides 11‑26)
> > - Konseptualisasi Desain Interaksi IF3151 (Slides 27‑33)
>
> > ### Goal
> >
> > **Goal** adalah keadaan akhir yang ingin dicapai oleh pengguna. Goal bersifat berorientasi hasil, tidak tergantung pada cara antarmuka menampilkannya. Misalnya, “Saya ingin mengirim uang ke teman” atau “Saya ingin memastikan tugas sudah terkumpul”. Goal berada pada level paling tinggi dalam hierarki interaksi; ia mencerminkan motivasi atau kebutuhan pengguna yang mendasari seluruh rangkaian aktivitas. Karena goal tidak terikat pada elemen visual, ia tetap valid meskipun desain antarmuka berubah, sehingga menjadi acuan stabil untuk evaluasi kegagalan.
> >
> > Pada tahap analisis, peneliti pertama‑tama menanyakan: *Apa tujuan akhir pengguna pada situasi ini?* Jawaban ini menjadi titik tolak untuk menelusuri seluruh proses interaksi. Jika goal tidak jelas, seluruh rangkaian analisis menjadi tidak terarah, sehingga penting bagi desainer untuk mengekspresikan goal secara eksplisit dalam dokumentasi kebutuhan.
> >
> > ### Task
> >
> > **Task** adalah rangkaian aktivitas terstruktur yang diperkirakan diperlukan untuk mencapai goal. Task berada di antara goal dan action; ia masih bersifat konseptual dan dipengaruhi oleh cara sistem memungkinkan pengguna melaksanakan aktivitas tersebut. Contoh task meliputi “mengisi formulir transfer”, “mengunggah file”, atau “memeriksa status pesanan”. Task dapat terdiri dari beberapa sub‑task yang saling bergantung, sehingga analisis task sering kali memanfaatkan diagram alur atau hierarki tugas (task hierarchy).
> >
> > Pentingnya memisahkan task dari goal terletak pada kemampuan untuk mengidentifikasi apakah kegagalan terjadi karena pengguna memiliki pemahaman yang keliru tentang langkah‑langkah yang diperlukan (mis‑task) atau karena sistem tidak menyediakan dukungan yang cukup untuk melaksanakan task tersebut. Dengan menuliskan task secara terperinci, desainer dapat mengevaluasi kelengkapan fungsi sistem dan menghindari asumsi berlebihan tentang kemampuan pengguna.
> >
> > ### Action
> >
> > **Action** adalah operasi konkret pada antarmuka yang dapat dilakukan pengguna, misalnya mengetik angka, menekan tombol “Submit”, atau memilih item dari dropdown. Action sepenuhnya bergantung pada desain visual dan interaktif; ia merupakan titik kontak fisik atau digital antara pengguna dan sistem. Karena action terikat pada elemen UI, perubahan desain (misalnya mengganti tombol dengan ikon) dapat mengubah cara action diidentifikasi tanpa mengubah goal atau task yang mendasarinya.
> >
> > Analisis action melibatkan pertanyaan: *Apakah aksi yang tersedia jelas, dapat ditemukan, dan dapat dieksekusi dengan usaha minimal?* Jika action tidak sesuai dengan harapan pengguna, maka akan muncul kesenjangan yang dapat diidentifikasi sebagai masalah desain. Dokumentasi action biasanya mencakup label, posisi, affordance visual, serta respons sistem yang diharapkan.
> >
> > ### Pentingnya Pemisahan Level‑Level Interaksi
> >
> > Kesalahan umum dalam evaluasi interaksi adalah mencampuradukkan goal, task, dan action menjadi satu istilah. Misalnya, menyatakan “goal saya mengisi formulir” padahal mengisi formulir adalah task, bukan goal. Pemisahan yang jelas memungkinkan analis untuk melacak sumber kegagalan pada transisi antar level:
> >
> > 1. **Goal → Task**: Apakah pengguna memahami langkah‑langkah konseptual yang diperlukan?
> > 2. **Task → Action**: Apakah sistem menyediakan aksi yang dapat mengeksekusi task?
> > 3. **Action → Evaluasi**: Apakah respons sistem dapat ditafsirkan untuk menilai pencapaian goal?
> >
> > Dengan menandai titik‑titik transisi ini, tim desain dapat mengidentifikasi apakah masalah terletak pada *jurang eksekusi* (gap antara goal/task dan action) atau pada *jurang evaluasi* (gap antara respons sistem dan interpretasi pengguna). **Catatan:** konsep jurang eksekusi dan jurang evaluasi disebutkan hanya sebagai referensi umum; penjelasan rinci tentang keduanya tidak dibahas di sini sesuai kebijakan konten.
> >
> > ### Proses Analisis Berbasis Goal‑Task‑Action
> >
> > Analisis sistematis mengikuti urutan langkah berikut:
> >
> > 1. **Identifikasi Goal** – Tanyakan apa yang ingin dicapai pengguna pada momen interaksi. Dokumentasikan goal dalam bentuk pernyataan hasil yang dapat diukur (misalnya “Pengguna berhasil mengirim uang sebesar Rp100.000”).
> > 2. **Rumuskan Task** – Tentukan rangkaian aktivitas konseptual yang diperlukan untuk mencapai goal. Buat diagram alur atau tabel yang menampilkan urutan sub‑task, kondisi masuk, dan kondisi keluar.
> > 3. **Spesifikasikan Action** – Catat setiap aksi UI yang harus dilakukan untuk melaksanakan setiap sub‑task. Sertakan detail label, lokasi, dan mekanisme (klik, swipe, ketik).
> > 4. **Ekspektasi vs. Realitas** – Bandingkan ekspektasi pengguna (apa yang mereka harapkan terjadi setelah action) dengan respons aktual sistem (system image).
> > 5. **Interpretasi Pengguna** – Analisis bagaimana pengguna menafsirkan respons tersebut terhadap goal mereka. Jika interpretasi tidak selaras, maka terdapat kesenjangan evaluasi.
> > 6. **Diagnosa Kesenjangan** – Tentukan apakah kesenjangan berada pada transisi goal‑task, task‑action, atau action‑evaluasi. Catat temuan dalam format “Goal – Task – Action – Respons – Interpretasi”.
> >
> > Proses ini dapat diulang secara iteratif selama fase desain dan evaluasi, sehingga setiap temuan dapat ditindaklanjuti dengan perbaikan antarmuka atau penyesuaian asumsi desain.
> >
> > ### Contoh Diagnostik Interaksi: Formulir “Ribet”
> >
> > **Keluhan pengguna:** “Form ini ribet”.
> >
> > **Langkah‑langkah analisis:**
> >
> > 1. **Goal:** Mengirim data (misalnya mengirim formulir pendaftaran).
> > 2. **Task:** Mengisi dan mengirim formulir.
> > 3. **Action:** Menekan tombol “Submit”.
> > 4. **Respons sistem:** Halaman reload tanpa pesan konfirmasi.
> > 5. **Interpretasi pengguna:** Tidak jelas apakah data berhasil terkirim; status goal tidak terlihat.
> >
> > Dari sini dapat disimpulkan bahwa terdapat **kesenjangan evaluasi** karena respons sistem tidak memberikan feedback yang dapat ditafsirkan. Solusi potensial meliputi menambahkan pesan konfirmasi atau indikator status.
> >
> > ### Asumsi Desain dan Eksplisitasi
> >
> > Setiap desain mengandung asumsi tentang goal, task, dan action yang dianggap “jelas” oleh perancang. Asumsi ini sering kali implisit dan tidak diuji, sehingga dapat menyebabkan jurang tersembunyi. Kerangka G‑T‑A membantu menjadikan asumsi tersebut **objek analisis**:
> >
> > - **Asumsi Goal:** “Pengguna ingin mengirim uang”.
> > - **Asumsi Task:** “Pengguna akan mengisi formulir transfer”.
> > - **Asumsi Action:** “Pengguna akan menekan tombol ‘Kirim’ yang terlihat jelas”.
> >
> > Dengan menuliskan asumsi secara eksplisit, tim dapat merancang *testabilitas*—misalnya, melakukan uji kegunaan yang memeriksa apakah pengguna memang mengidentifikasi tombol yang dimaksud atau apakah mereka mengerti urutan sub‑task. Jika asumsi terbukti keliru, desain dapat direvisi sebelum implementasi akhir.
> >
> > ### Hubungan dengan System Image dan Mental Model
> >
> > **System image** adalah apa yang ditampilkan sistem kepada pengguna (tampilan UI, pesan, ikon). **Mental model** adalah gambaran internal pengguna tentang cara kerja sistem. Analisis G‑T‑A menekankan bahwa action harus konsisten dengan system image sehingga mental model dapat terbentuk secara akurat. Misalignment antara system image dan mental model sering kali muncul ketika action tidak mencerminkan ekspektasi pengguna, yang pada gilirannya memperlebar kesenjangan evaluasi.
> >
> > Dengan memetakan setiap level (goal, task, action) ke elemen system image yang relevan, desainer dapat memastikan bahwa mental model pengguna terbentuk secara tepat, sehingga interaksi menjadi lebih intuitif.
> >
> > [Continue for all major concepts in the material]

> [!cornell] #### Summary
>
> **Goal‑Task‑Action** merupakan kerangka analisis yang memisahkan tujuan akhir pengguna (goal), rangkaian aktivitas konseptual (task), dan operasi UI konkret (action). Pemisahan ini memungkinkan identifikasi tepat pada transisi‑transisi kritis, sehingga masalah interaksi dapat didiagnosa sebagai kesenjangan eksekusi atau evaluasi. Dengan menuliskan asumsi desain secara eksplisit dan menghubungkannya ke system image serta mental model, tim dapat merancang solusi yang meningkatkan kejelasan aksi dan feedback, menghasilkan pengalaman yang lebih terarah dan dapat diukur.

> [!ad-libitum]- Additional Information
>
> #### Formal Representasi Goal‑Task‑Action
>
> Untuk keperluan analisis yang lebih terstruktur, G‑T‑A dapat direpresentasikan menggunakan notasi diagram alur tugas (Task Flow Diagram) atau bahasa pemodelan seperti UML Activity Diagram. Pada diagram tersebut, **Goal** ditandai sebagai *final node* (state akhir), **Task** sebagai *activity nodes* yang dapat memiliki sub‑activities, dan **Action** sebagai *action nodes* yang terhubung ke elemen UI. Notasi ini memungkinkan simulasi alur kerja dan identifikasi titik bottleneck secara visual. Contoh sederhana:
>
> ```
>
> [Goal: Kirim Uang] --> (Task: Isi Form Transfer) --> [Action: Ketik Nomor Rekening]
>
> --> [Action: Pilih Bank]
>
> --> [Action: Tekan Submit]
>
> --> (Task: Konfirmasi) --> [Action: Lihat Notifikasi Berhasil]
>
> ```
>
> Dengan model ini, setiap jalur dapat dianalisis untuk *reachability* (apakah goal dapat dicapai) dan *dead‑ends* (apakah ada aksi yang tidak menghasilkan respons yang dapat ditafsirkan).
>
> #### Integrasi dengan Metode Evaluasi Kognitif
>
> G‑T‑A dapat digabungkan dengan teknik evaluasi kognitif seperti **Cognitive Walkthrough** atau **Heuristic Evaluation**. Pada Cognitive Walkthrough, evaluator menelusuri setiap task dan action sambil menanyakan empat pertanyaan kunci (apakah pengguna akan mencoba aksi tersebut, apakah aksi dapat dilihat, apakah aksi akan menghasilkan respons yang diharapkan, dan apakah respons tersebut dapat dipahami). Dengan menambahkan lapisan G‑T‑A, evaluator dapat memetakan pertanyaan-pertanyaan tersebut ke level yang tepat, sehingga temuan menjadi lebih terfokus pada asumsi yang melanggar.
>
> #### Analisis Log Interaksi Berbasis G‑T‑A
>
> Pada sistem berbasis web atau aplikasi seluler, data log (misalnya klik, waktu tampilan, error) dapat dianalisis dengan kerangka G‑T‑A. Setiap event log dikategorikan sebagai **action**; rangkaian event yang berurutan di‑cluster menjadi **task**, dan kumpulan task yang mengarah pada pencapaian **goal** dapat diukur keberhasilannya. Metode ini memungkinkan peneliti mengidentifikasi pola kegagalan secara kuantitatif, misalnya persentase task yang tidak berujung pada goal karena aksi yang tidak terdeteksi atau respons sistem yang tidak jelas.
>
> #### Edge Cases dan Nuansa
>
> - **Goal Ambigu**: Pengguna dapat memiliki tujuan yang tidak terdefinisi dengan jelas (misalnya “ingin bersenang‑senang”). Analisis harus mengklarifikasi goal yang dapat diukur sebelum melanjutkan.
> - **Multi‑Goal Scenarios**: Pada aplikasi kompleks, satu sesi dapat melibatkan beberapa goal yang bersaing (misalnya “membeli tiket” sekaligus “menyimpan kartu kredit”). G‑T‑A harus memetakan prioritas dan interaksi antar goal.
> - **Concurrent Actions**: Pada antarmuka yang mendukung multitasking, satu action dapat memicu beberapa task secara paralel; model harus memperhitungkan sinkronisasi dan potensi konflik.
>
> #### Self‑Exploration Projects
>
> 1. **Studi Kasus Formulir Web** – Buat sebuah formulir pendaftaran sederhana dengan tiga field dan tombol submit. Kumpulkan data log (klik, waktu) dari 10 pengguna, kemudian lakukan analisis G‑T‑A untuk mengidentifikasi titik kegagalan dan usulkan perbaikan UI.
> 2. **Checklist Desain G‑T‑A** – Rancang sebuah checklist yang dapat digunakan tim desain selama fase prototyping. Checklist harus mencakup pertanyaan tentang goal