---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3151 Interaksi Manusia Komputer]]

> [!cornell] Norman’s Seven Stages of Action as an Interaction Cycle
>
> > ## Questions/Cues
> >
> > - Mengapa tahap niat penting?
> > - Bagaimana persepsi memengaruhi evaluasi?
> > - Apa perbedaan eksekusi dan evaluasi?
> > - Kapan tahapan menjadi sadar?
> > - Bagaimana mengidentifikasi jurang pada tiap tahap?
> > - Apa contoh kegagalan pada tahap aksi?
> > - Bagaimana desain menutup jurang eksekusi?
> >
> > ## Reference Points
> >
> > - Lecture_Interaction_Cycle.pdf (Pages 17‑19)
> > - Interaction_Design_Notes.pptx (Slides 10‑12)
> > - Norman_The_Design_of_Everyday_Things (Chapter 7, Pages 115‑122)
>
> > ### Tahapan Eksekusi (Doing)
> >
> > Norman membagi interaksi menjadi dua fase utama: **eksekusi** dan **evaluasi**. Pada fase eksekusi terdapat empat langkah berurutan. Langkah pertama adalah **pembentukan tujuan** (goal formation), di mana pengguna secara mental menetapkan apa yang ingin dicapai, misalnya “Saya ingin menyalakan lampu”. Langkah kedua, **pembentukan niat** (intention formation), melibatkan pemilihan strategi yang diyakini dapat memenuhi tujuan, contohnya “Saya akan menekan saklar di dinding”. Langkah ketiga, **penentuan aksi** (specifying action), mengkonkretkan niat menjadi gerakan fisik atau perintah digital, seperti “Menggerakkan tangan kanan ke saklar”. Langkah keempat, **pelaksanaan aksi** (executing the action), dimana aksi tersebut benar‑benar dilakukan pada antarmuka atau perangkat fisik. Pada tugas rutin, keempat langkah ini sering terjadi secara otomatis di bawah kesadaran, mirip dengan kebiasaan mengunci pintu rumah tanpa berpikir panjang.
> >
> > Pada setiap langkah, terdapat **jurang eksekusi** (gulf of execution) yang muncul bila pengguna tidak dapat menemukan atau memahami aksi yang diperlukan. Misalnya, jika saklar tidak terlihat jelas atau ikon tombol tidak memberi petunjuk yang cukup, pengguna akan kesulitan menghubungkan niat dengan aksi yang tersedia. Desainer harus menyediakan affordance, signifier, dan mapping yang tepat untuk memperkecil jurang ini, meskipun istilah‑istilah tersebut tidak dijelaskan secara detail di sini.
> >
> > Contoh konkret: seorang pengguna ingin mengirim email. Tujuannya (goal) adalah “mengirim pesan”. Niatnya adalah “menggunakan tombol kirim”. Penentuan aksi menjadi “klik tombol ‘Send’”. Jika tombol tersebut tersembunyi di menu dropdown, jurang eksekusi muncul, menyebabkan kebingungan atau kegagalan.
> >
> > Secara keseluruhan, fase eksekusi menekankan **hubungan sebab‑akibat** antara apa yang diinginkan pengguna dan apa yang dapat dilakukan sistem. Memahami tiap langkah membantu analis mengidentifikasi titik lemah sebelum aksi terjadi.
> >
> > ### Tahapan Evaluasi (Interpreting)
> >
> > Setelah aksi dieksekusi, fase **evaluasi** dimulai, terdiri dari tiga langkah. Langkah kelima adalah **persepsi perubahan sistem** (perceiving the state), di mana pengguna mengamati apa yang terjadi pada antarmuka atau perangkat, misalnya “Apakah lampu sudah menyala?”. Langkah keenam, **penafsiran** (interpreting the perception), melibatkan pemaknaan informasi yang diterima; pengguna menilai apakah perubahan yang terlihat sesuai dengan harapan, seperti “Lampu menyala berarti tujuan tercapai”. Langkah ketujuh, **evaluasi tujuan** (evaluating the goal), menutup siklus dengan memeriksa apakah tujuan awal telah terpenuhi; bila tidak, pengguna dapat kembali ke fase eksekusi dengan tujuan atau niat yang diperbarui.
> >
> > Pada tahap ini muncul **jurang evaluasi** (gulf of evaluation) bila sistem tidak memberikan umpan balik yang jelas atau bila pengguna tidak dapat mengaitkan perubahan visual dengan konsekuensi yang diharapkan. Contohnya, setelah menekan tombol “Submit”, halaman hanya memuat ulang tanpa pesan konfirmasi; pengguna tidak dapat menilai apakah data berhasil terkirim. Desainer harus menyediakan feedback yang eksplisit (misalnya, notifikasi “Data berhasil dikirim”) untuk menutup jurang ini.
> >
> > Evaluasi tidak selalu bersifat sadar; pada interaksi rutin, pengguna mungkin hanya merasakan “semuanya beres” tanpa analisis mendalam. Namun, ketika terjadi kegagalan atau situasi baru, proses penafsiran menjadi lebih eksplisit dan dapat menimbulkan frustrasi bila tidak didukung oleh desain yang memadai.
> >
> > Dengan memahami tiga langkah evaluasi, analis dapat menelusuri mengapa pengguna merasa “tidak tahu apa yang terjadi” dan mengidentifikasi titik di mana sistem harus memperbaiki representasi status.
> >
> > ### Hubungan Siklus dan Diagnosa Masalah Interaksi
> >
> > Norman menekankan bahwa **tujuh tahapan ini membentuk siklus berulang**. Jika pada salah satu tahapan terjadi kegagalan, siklus dapat terhenti atau berulang dengan tujuan yang dimodifikasi. Misalnya, bila jurang evaluasi lebar, pengguna mungkin kembali ke tahap niat dengan strategi baru (“Mungkin saya harus menekan tombol lain”). Sebaliknya, jurang eksekusi yang lebar dapat menghentikan siklus sebelum aksi terjadi, sehingga pengguna tidak pernah sampai pada fase evaluasi.
> >
> > Dalam praktik diagnostik, analis menanyakan serangkaian pertanyaan berurutan: *Apa tujuan pengguna?* → *Strategi apa yang dipikirkan?* → *Aksi apa yang dipilih?* → *Bagaimana sistem merespons?* → *Apakah pengguna dapat menilai respons?* Dengan menelusuri tiap langkah, kita dapat memetakan **dimensi kegagalan** (eksekusi vs. evaluasi) dan merumuskan rekomendasi desain yang spesifik.
> >
> > Contoh kasus: pengguna mengeluh “Form ini ribet”. Analisis menggunakan tujuh tahapan mengungkap bahwa tujuan (mengirim data) tercapai, tetapi respons sistem (halaman reload tanpa pesan) tidak dapat dipersepsikan, sehingga jurang evaluasi menjadi penyebab utama. Perbaikan berupa menambahkan pesan konfirmasi akan menutup jurang tersebut.
> >
> > Secara konseptual, siklus ini membantu memindahkan **keluhan subjektif** menjadi **diagnosa objektif** yang dapat diuji dan diulang dalam proses iteratif desain.
> >
> > ### Implikasi Desain Berbasis Tujuh Tahapan
> >
> > Desainer dapat memetakan setiap tahapan ke dalam **prinsip desain** yang spesifik. Pada fase eksekusi, penting menyediakan **affordance** yang jelas (misalnya, tombol yang tampak dapat ditekan) dan **signifier** yang memberi petunjuk fungsi. Pada fase evaluasi, fokus pada **feedback** yang tepat waktu, **status indicator**, dan **representasi visual** yang mudah dipahami.
> >
> > Praktik terbaik meliputi: (1) Menyederhanakan jalur niat‑aksi dengan mengurangi langkah yang tidak perlu; (2) Menyajikan preview atau simulasi hasil sebelum aksi final (misalnya, “preview email”); (3) Menyediakan pesan konfirmasi atau error yang spesifik setelah aksi; (4) Menggunakan animasi halus untuk menandai perubahan status sehingga persepsi menjadi lebih jelas.
> >
> > Dengan meninjau desain melalui lensa tujuh tahapan, tim dapat **menutup jurang** secara sistematis, meningkatkan kepuasan pengguna, dan mengurangi beban kognitif yang tidak perlu.
> >
> > ### Contoh Implementasi dalam Aplikasi Mobile
> >
> > Pada aplikasi pengatur cahaya pintar, tujuan pengguna “menambah cahaya” diikuti niat “menyalakan lampu ruang tamu”. Penentuan aksi menjadi “menekan ikon lampu di layar”. Setelah aksi, aplikasi menampilkan animasi lampu menyala (persepsi), menampilkan teks “Lampu ruang tamu aktif” (penafsiran), dan mengubah status ikon menjadi terang (evaluasi). Jika animasi tidak muncul atau teks tidak muncul, pengguna akan mengalami jurang evaluasi, yang dapat diatasi dengan menambahkan indikator haptic atau suara.
> >
> > Contoh lain: pada sistem pembayaran online, setelah menekan “Pay”, sistem menampilkan spinner (persepsi) dan kemudian notifikasi “Pembayaran berhasil” (penafsiran). Jika notifikasi tidak muncul, pengguna tidak dapat mengevaluasi tujuan, sehingga mereka mungkin mengulangi pembayaran atau menghubungi dukungan.
> >
> > Kedua contoh menunjukkan bagaimana **setiap tahapan harus didukung** oleh elemen UI/UX yang tepat untuk memastikan siklus berjalan mulus.
> >
> > ### Ringkasan
> >
> > **Norman’s Seven Stages of Action** menggambarkan interaksi sebagai siklus berulang yang mencakup empat langkah eksekusi (tujuan, niat, aksi, pelaksanaan) dan tiga langkah evaluasi (persepsi, penafsiran, evaluasi tujuan). Kegagalan pada salah satu tahapan menghasilkan **jurang eksekusi** atau **jurang evaluasi**, yang dapat diidentifikasi melalui analisis berurutan. Desain yang efektif menyediakan affordance, signifier, mapping, serta feedback yang jelas untuk menutup jurang‑jurang tersebut, sehingga pengguna dapat mencapai tujuan dengan beban kognitif minimal.

> [!cornell] #### Summary
>
> **Norman’s Seven Stages of Action** menyatukan proses niat‑aksi‑persepsi‑penafsiran‑evaluasi dalam satu siklus berulang, di mana setiap langkah berpotensi menimbulkan jurang eksekusi atau jurang evaluasi. Dengan memetakan tujuan, niat, aksi, serta respons sistem secara berurutan, desainer dapat mengubah keluhan subjektif menjadi diagnosis objektif dan merancang affordance serta feedback yang menutup jurang‑jurang tersebut. Implementasi yang konsisten pada aplikasi nyata—seperti kontrol pencahayaan pintar atau sistem pembayaran—menunjukkan pentingnya mendukung tiap tahapan untuk mencapai pengalaman pengguna yang lancar dan dapat diprediksi.

> [!ad-libitum]- Additional Information
>
> #### Formal Modeling of the Interaction Cycle
>
> Secara formal, siklus tujuh tahapan dapat direpresentasikan sebagai **Markov Decision Process (MDP)** dengan state space yang mencakup *Goal*, *Intention*, *Action*, *SystemState*, *Perception*, *Interpretation*, dan *Evaluation*. Transisi antar‑state dipengaruhi oleh kebijakan (policy) pengguna dan fungsi reward yang mencerminkan kepuasan tujuan. Model ini memungkinkan simulasi probabilistik untuk mengukur **expected time to goal** serta mengidentifikasi state yang paling rentan terhadap kegagalan (misalnya, state *Perception* dengan probabilitas rendah untuk menghasilkan sinyal feedback yang jelas). Literatur yang relevan meliputi:
>
> - Norman, D. A. (2013). *The Design of Everyday Things* (2nd ed.). Basic Books. (Bab 7)
> - Rasmussen, J. (1986). *Information Processing and Human-Machine Interaction*. North‑Holland.
> - Sutton, R. S., & Barto, A. G. (2018). *Reinforcement Learning: An Introduction* (2nd ed.). MIT Press. (Bagian tentang MDP)
>
> Dengan memodelkan siklus sebagai MDP, peneliti dapat menguji **intervensi desain** (misalnya, menambahkan feedback visual) dan mengukur dampaknya pada probabilitas keberhasilan melalui simulasi Monte‑Carlo.
>
> #### Cognitive Load Analysis per Stage
>
> Setiap tahapan menuntut beban kognitif yang berbeda. Pada tahap **tujuan** dan **niat**, beban utama adalah **memori kerja** (working memory) untuk memelihara tujuan jangka panjang dan memetakan strategi. Pada **penentuan aksi** dan **pelaksanaan**, beban beralih ke **koordinasi motorik** dan **persepsi visual**. Tahap **persepsi** dan **penafsiran** menuntut **pemrosesan visual‑spasial** serta **pengetahuan domain** untuk mengaitkan perubahan sistem dengan makna. Penelitian oleh Sweller (1994) tentang **Cognitive Load Theory** menyarankan bahwa desain harus meminimalkan beban **extraneous** (misalnya, antarmuka berantakan) dan memaksimalkan beban **germane** (informasi yang membantu pembelajaran tujuan). Praktik yang dapat diterapkan:
>
> - Menggunakan **progressive disclosure** untuk menunda informasi yang tidak relevan sampai diperlukan.
> - Menyediakan **visual cues** yang konsisten untuk mengurangi beban pencarian aksi.
> - Menyajikan **feedback** yang langsung dan kontekstual untuk mengurangi beban interpretasi.
>
> Studi kasus: pada aplikasi e‑learning, menambahkan **highlight** pada elemen yang baru di‑update mengurangi beban persepsi dan meningkatkan akurasi evaluasi tujuan belajar.
>
> #### Comparison with Other Interaction Models
>
> Model Norman sering dibandingkan dengan **GOMS** (Goals, Operators, Methods, and Selection rules) dan **KLM‑Keystroke Level Model**. GOMS memecah tugas menjadi goal‑operator‑method, mirip dengan tiga level pertama Norman (goal, task, action), namun tidak secara eksplisit mencakup fase evaluasi. KLM fokus pada **waktu eksekusi** operator (misalnya, keystroke, mouse click) dan mengabaikan persepsi serta penafsiran. Keunggulan Norman terletak pada **dimensi evaluatif** yang memungkinkan analisis kegagalan pasca‑aksi, sementara GOMS lebih kuat dalam **prediksi waktu** dan KLM dalam **optimasi performa**. Kombinasi ketiganya dapat menghasilkan kerangka kerja yang komprehensif:
>
> 1. Gunakan **Norman** untuk mengidentifikasi jurang eksekusi/evaluasi.
> 2. Terapkan **GOMS** untuk merinci operator yang diperlukan pada tiap aksi.
> 3. Hitung **KLM** untuk memperkirakan waktu total dan mengoptimalkan alur kerja.
>
> Referensi lanjutan:
>
> - Card, S. K., Moran, T. P., & Newell, A. (1983). *The Psychology of Human‑Computer Interaction*. Lawrence Erlbaum.
> - Nielsen, J. (1993). *Usability Engineering*. Morgan Kaufmann.
>
> #### Design Patterns to Support Each Stage
>
> Beberapa **design pattern** UI/UX secara khusus menargetkan tahapan Norman:
>
> - **Progress Indicator** (misalnya, stepper bar) mendukung **persepsi** dan **penafsiran** dengan memberi tahu pengguna di mana mereka berada dalam proses.
> - **Undo/Redo** memperkecil jurang eksekusi dengan memberi jalan kembali bila aksi salah.
> - **Inline Validation** (validasi langsung pada field) menutup jurang evaluasi dengan memberi feedback segera setelah aksi.
> - **Affordance‑Rich Controls** (tombol dengan ikon yang jelas) mempermudah **penentuan aksi**.
>
> Implementasi pola‑pola ini dapat dievaluasi melalui **heuristic evaluation** atau **cognitive walkthrough** yang secara eksplisit menelusuri ketujuh tahapan.
>
> #### Edge Cases and Limitations
>
> Meskipun kuat, model Norman memiliki batasan:
>
> 1. **Interaksi Multimodal** (suara, gestur, VR) dapat melibatkan tahapan paralel yang tidak linier; misalnya, persepsi dapat terjadi bersamaan dengan aksi.
> 2. **Pengguna dengan Disabilitas** mungkin memiliki jalur niat‑aksi yang berbeda (misalnya, penggunaan pembaca layar), sehingga affordance tradisional tidak memadai.
> 3. **Sistem Adaptif** yang mengubah antarmuka secara dinamis dapat mengubah **system image** di tengah siklus, menyebabkan kebingungan pada tahap penafsiran.
>
> Mengatasi edge case ini memerlukan **customization** dan **personalization** yang memperhitungkan model pengguna yang lebih fleksibel.
>
> #### Self-Exploration Projects
>
> 1. **Simulasi Siklus Tujuh Tahapan**: Buat prototipe interaktif (misalnya, menggunakan Figma atau Adobe XD) yang menampilkan setiap tahapan secara eksplisit, kemudian lakukan uji kegunaan dengan peserta untuk mengidentifikasi jurang yang paling sering muncul.
>
> 2