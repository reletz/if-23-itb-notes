---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3151 Interaksi Manusia Komputer]]

> [!cornell] Conceptualizing Interaction: Problem Space, System Models, and Mental Models
>
> > ## Questions/Cues
> >
> > - Mengapa penting memisahkan *problem space* dan *solution space*?
> > - Bagaimana *system model* berbeda dari *system image*?
> > - Apa peran *mental model* pengguna dalam interaksi?
> > - Langkah‑langkah apa yang terjadi sebelum dan sesudah aksi?
> > - Bagaimana cara mendiagnosa masalah interaksi tanpa menyalahkan pengguna?
> >
> > ## Reference Points
> >
> > - Konseptualisasi Interaksi (Slides 5‑8)
> > - Model dan Interpretasi Sistem (Slides 7‑9)
> > - Interaksi sebagai Proses (Slides 9‑10)
> > - Dari Keluhan ke Diagnosis (Slides 24‑26)
> > - Penutup & Takeaway (Slides 32‑33)
>
> > ### Problem Space vs. Solution Space
> >
> > *Problem space* adalah wilayah konseptual di mana kita memetakan apa yang **gagal**, **kurang**, atau **menyulitkan** pengguna dalam berinteraksi dengan sistem. Fokusnya adalah pada **keluhan nyata**, bukan pada spekulasi atau preferensi pribadi. Misalnya, ketika seorang pengguna berkata “Aplikasinya ribet”, problem space menuntut kita menelusuri **dimana** dan **mengapa** kebingungan itu muncul, bukan sekadar menilai apakah tampilan aplikasi “bagus” atau tidak.
> >
> > Sebaliknya, *solution space* berisi semua kemungkinan solusi desain yang dapat kita tawarkan. Memisahkan kedua ruang ini penting karena **solusi yang tepat hanya dapat dirancang setelah masalah dipahami secara mendalam**. Jika kita melompat langsung ke solusi tanpa analisis problem space, risiko menghasilkan desain yang tidak menyentuh akar permasalahan meningkat drastis.
> >
> > Contoh praktis: Pada sebuah aplikasi perbankan, problem space mungkin mengidentifikasi bahwa pengguna tidak menemukan tombol “Transfer” karena label yang tidak konsisten. Solution space kemudian dapat mencakup redesign label, penambahan ikon, atau penempatan tombol di lokasi yang lebih intuitif.
> >
> > Dengan memisahkan ruang‑ruang ini, tim desain dapat **menjaga fokus pada kebutuhan pengguna** dan menghindari solusi yang hanya bersifat estetika atau teknis semata.
> >
> > ### System Model, System Image, and Mental Model
> >
> > **System model** adalah representasi internal yang menjelaskan **bagaimana sistem sebenarnya beroperasi** – algoritma, alur data, dan logika bisnis. Model ini biasanya diketahui oleh pengembang atau arsitek sistem, bukan oleh pengguna akhir.
> >
> > **System image** adalah apa yang **ditampilkan** oleh sistem kepada pengguna: antarmuka grafis, pesan, ikon, dan respons visual. Ini adalah jendela pertama yang dilihat pengguna, sehingga menjadi satu‑satunya sumber informasi yang dapat mereka gunakan untuk membangun pemahaman.
> >
> > **Mental model** adalah gambaran yang **dibentuk oleh pengguna** tentang cara kerja sistem, berdasarkan pengalaman, pengetahuan sebelumnya, dan interpretasi terhadap system image. Mental model bersifat subjektif dan dapat berbeda antar pengguna. Misalnya, seorang pengguna smartphone mungkin menganggap “swipe up” berarti “buka aplikasi”, sementara pengguna lain mengaitkannya dengan “menampilkan notifikasi”.
> >
> > Ketiga model ini berinteraksi secara dinamis: **system model → system image → mental model**. Ketidaksesuaian antara system image dan mental model dapat menimbulkan kebingungan, sedangkan perbedaan antara system model dan system image dapat menyebabkan kegagalan fungsional yang tidak terdeteksi oleh pengguna.
> >
> > Contoh: Pada sebuah website e‑commerce, sistem model mengeksekusi proses checkout dalam tiga langkah, tetapi system image menampilkan semua langkah sekaligus dalam satu halaman. Pengguna yang mengharapkan proses bertahap (berdasarkan mental model mereka tentang belanja online) mungkin merasa “terbebani” dan meninggalkan keranjang belanja.
> >
> > ### Interaction as a Process (Intent → Perception → Interpretation → Evaluation)
> >
> > Interaksi tidak dapat direduksi menjadi satu aksi tunggal seperti “klik tombol”. Sebaliknya, ia merupakan rangkaian **proses berkelanjutan** yang melibatkan beberapa tahap kognitif:
> >
> > 1. **Intent (Niat)** – Pengguna memiliki tujuan (misalnya, “mengirim uang”). Niat ini terbentuk sebelum ada tindakan fisik apa pun.
> > 2. **Perception (Persepsi)** – Setelah aksi dilakukan, pengguna **mengamati** perubahan pada system image (misalnya, munculnya notifikasi).
> > 3. **Interpretation (Interpretasi)** – Pengguna menafsirkan apa arti perubahan tersebut terhadap tujuan mereka (apakah uang sudah terkirim?).
> > 4. **Evaluation (Evaluasi)** – Pengguna menilai apakah tujuan tercapai atau masih ada langkah yang diperlukan.
> >
> > Proses ini bersifat **iteratif**; bila evaluasi menunjukkan kegagalan, siklus kembali ke niat atau aksi berikutnya. Analogi yang berguna adalah **bermain catur**: pemain memikirkan tujuan (menang), membuat langkah (memindahkan pion), mengamati respons lawan, menafsirkan posisi papan, dan menilai apakah strategi masih valid.
> >
> > Memahami interaksi sebagai proses membantu desainer mengidentifikasi **titik-titik kritis** di mana kegagalan dapat terjadi, misalnya ketika persepsi pengguna tidak sesuai dengan respons sistem karena system image yang ambigu.
> >
> > ### Diagnosing Interaction Problems without Blaming Users
> >
> > Pendekatan diagnosis yang tepat memisahkan **keluhan** (misalnya, “aplikasinya ribet”) dari **analisis struktural**. Langkah‑langkah utama meliputi:
> >
> > 1. **Identifikasi goal** pengguna secara implisit (apa yang ingin dicapai).
> > 2. **Uraikan task** yang diasumsikan pengguna untuk mencapai goal tersebut.
> > 3. **Catat action** yang sebenarnya dilakukan pada antarmuka.
> > 4. **Bandingkan respons sistem** (system image) dengan ekspektasi pengguna.
> > 5. **Interpretasi** perbedaan antara respons dan ekspektasi untuk menemukan jurang (gap) yang paling lebar.
> >
> > Selama proses ini, penting untuk **tidak menyalahkan pengguna**. Sebaliknya, fokus pada **asumsi desain** yang tertanam dalam system image dan bagaimana asumsi tersebut tidak mendukung mental model pengguna. Misalnya, jika pengguna menekan “Submit” dan halaman hanya reload tanpa pesan, kegagalan bukan karena “pengguna salah menekan”, melainkan karena **system image tidak memberikan umpan balik yang jelas**.
> >
> > Dengan menempatkan analisis pada level *problem space* dan menggunakan tiga model (system, image, mental), desainer dapat menghasilkan rekomendasi perbaikan yang bersifat **fungsional** dan **empatik**, bukan sekadar kritik subjektif.
> >
> > ### The Value of Conceptualization in Interaction Design
> >
> > Konseptualisasi memberikan **kerangka struktural** untuk mengorganisir pengalaman pengguna menjadi elemen‑elemen yang dapat dipelajari, diukur, dan diperbaiki. Tanpa kerangka ini, keluhan tetap bersifat **anektodal** dan tidak dapat diubah menjadi aksi desain yang terarah.
> >
> > Manfaat utama konseptualisasi meliputi:
> >
> > - **Strukturisasi pengalaman**: Memetakan hubungan antara goal, task, action, dan respons sistem.
> > - **Pemisahan keluhan dari diagnosis**: Mengubah “aplikasi ribet” menjadi rangkaian pertanyaan analitis yang dapat dijawab.
> > - **Komunikasi tim lintas disiplin**: Model yang jelas memudahkan dialog antara desainer, pengembang, dan peneliti.
> > - **Fokus pada fungsionalitas**: Mengarahkan upaya desain pada **keselarasan fungsional** antara system image dan mental model, bukan pada estetika semata.
> >
> > Contoh penerapan: Pada proyek redesign portal layanan publik, tim menggunakan konseptualisasi untuk mengidentifikasi bahwa **mental model warga** menganggap “pencarian layanan” harus berada di bagian atas halaman, sementara **system image** menempatkannya di footer. Dengan menggeser elemen tersebut, tingkat penyelesaian permohonan meningkat 27 %.
> >
> > Secara keseluruhan, konseptualisasi memungkinkan desainer bergerak dari **teori** ke **praktik** dengan cara yang terukur dan terfokus pada kebutuhan pengguna yang sebenarnya.

> [!cornell] #### Summary
>
> **Problem space** menyediakan landasan analitis untuk mengidentifikasi kegagalan interaksi sebelum merancang solusi, sementara **system model**, **system image**, dan **mental model** membentuk tiga lapisan yang saling memengaruhi dalam persepsi pengguna. Memahami interaksi sebagai proses berulang (niat → persepsi → interpretasi → evaluasi) membantu menemukan titik‑titik kritis di mana jurang muncul, dan diagnosis yang berfokus pada struktur ini menghindari menyalahkan pengguna. Akhirnya, konseptualisasi memberi kerangka kerja yang terstruktur, memungkinkan tim desain menghasilkan perbaikan fungsional yang selaras dengan harapan dan pemahaman pengguna.

> [!ad-libitum]- Additional Information
>
> #### Formal Modeling of Mental and System Models
>
> Untuk analisis yang lebih mendalam, peneliti interaksi sering menggunakan **model kognitif** seperti **GOMS** (Goals, Operators, Methods, and Selection rules) atau **KLM** (Keystroke‑Level Model). Kedua model ini memformalkan langkah‑langkah mental yang diperlukan pengguna untuk menyelesaikan sebuah task, sehingga memungkinkan perhitungan **waktu eksekusi** dan identifikasi **bottleneck**. Misalnya, dalam GOMS, setiap operator (mis. “menekan tombol”) diberikan waktu standar, dan urutan operator membentuk **method** yang dapat dibandingkan dengan **system model** untuk mengevaluasi kesesuaian.
>
> Selain itu, **model probabilistik** seperti **Bayesian Networks** dapat memodelkan ketidakpastian dalam interpretasi pengguna terhadap system image, memberikan prediksi tentang kemungkinan kesalahan persepsi. Implementasi praktis dapat dilakukan dengan paket Python seperti **pgmpy** atau **pomegranate**, yang memungkinkan simulasi skenario interaksi dan analisis sensitivitas.
>
> #### Advanced Techniques for Aligning Mental and System Models
>
> 1. **Elicitation of Mental Models** – Teknik seperti **concept mapping**, **interview semi‑terstruktur**, dan **think‑aloud protocol** membantu mengungkap mental model pengguna secara eksplisit. Data yang diperoleh kemudian dapat divisualisasikan menggunakan alat seperti **CmapTools** atau **Miro**, memudahkan perbandingan dengan system image.
> 2. **Participatory Design Workshops** – Mengundang pengguna dalam sesi co‑design memungkinkan desainer menguji asumsi system image secara real‑time, sekaligus memperkaya system model dengan perspektif pengguna. Metode ini terbukti meningkatkan **keselarasan fungsional** pada proyek perangkat lunak edukasi (Liu & Huang, 2022).
> 3. **Iterative Prototyping with Cognitive Walkthroughs** – Setiap iterasi prototipe diuji melalui **cognitive walkthrough**, di mana evaluator menilai apakah langkah‑langkah dalam mental model dapat dipetakan ke elemen system image. Hasilnya memberi umpan balik langsung untuk memperbaiki representasi visual dan interaksi.
>
> #### Edge Cases and Nuances
>
> - **Mismatched Mental Models Across Demografi**: Budaya, usia, atau latar belakang teknis dapat menghasilkan mental model yang sangat berbeda. Misalnya, pengguna dari budaya dengan orientasi kolektivistik mungkin mengharapkan **konfirmasi sosial** (seperti “like” atau “share”) sebelum menyelesaikan transaksi, sementara pengguna individualistik tidak.
> - **Dynamic Mental Models**: Pada sistem yang terus berubah (mis. aplikasi dengan pembaruan UI reguler), mental model pengguna dapat menjadi **usang**. Desainer harus menyediakan **transisi yang mulus** melalui tutorial kontekstual atau animasi penjelas.
> - **Ambiguitas dalam System Image**: Ikon yang terlalu abstrak atau teks yang tidak konsisten dapat menimbulkan interpretasi ganda. Penelitian menunjukkan bahwa **redundansi multimodal** (ikon + label) mengurangi ambiguitas hingga 40 % (Norman, 2013).
> - **Cognitive Load**: Jika proses interaksi melibatkan terlalu banyak langkah atau keputusan simultan, beban kognitif meningkat, yang dapat mengakibatkan **shortcutting** atau **error**. Menggunakan prinsip **Hick’s Law** (jumlah pilihan memengaruhi waktu keputusan) dapat membantu merancang system image yang lebih sederhana.
>
> #### Self-Exploration Projects
>
> 1. **Analisis Mental Model pada Aplikasi Mobile Banking** – Lakukan wawancara think‑aloud dengan 5 pengguna, buat concept map mental model mereka, dan bandingkan dengan system image aplikasi. Identifikasi tiga mismatch utama dan usulkan redesign.
> 2. **Simulasi GOMS untuk Proses Checkout E‑Commerce** – Implementasikan model GOMS dalam Python, hitung waktu eksekusi untuk dua desain checkout (single‑page vs. multi‑step). Analisis mana yang lebih efisien secara kognitif dan presentasikan temuan dalam laporan singkat.
> 3. **Evaluasi Dampak Pembaruan UI pada Mental Model** – Pilih sebuah aplikasi web yang baru saja mengalami redesign, rekrut 10 pengguna lama, dan ukur perubahan dalam persepsi mereka menggunakan questionnaire SUS (System Usability Scale) sebelum dan sesudah pembaruan.
>
> #### Tools and Resources
>
> - **Cognitive Walkthrough Toolkit** – https://cognitivewalkthrough.org (open‑source framework untuk evaluasi langkah‑per‑langkah).
> - **pgmpy** – Python library untuk membangun Bayesian Networks (https://pgmpy.org).
> - **Miro** – Platform kolaboratif untuk membuat concept maps dan diagram alur interaksi.
> - **"The Design of Everyday Things" (Norman, 2013)** – Bab tentang mental models dan system image (meskipun konsep *gulf* tidak dibahas di sini).
> - **"Interaction Design: Beyond Human‑Computer Interaction" (Preece, Rogers, & Sharp, 2021)** – Bab 4 tentang model sistem dan proses interaksi.
>
> #### Further Reading
>
> - Preece, J., Rogers, Y., & Sharp, H. (2021). *Interaction Design: Beyond Human‑Computer Interaction* (4th ed.). Wiley.
> - Liu, X., & Huang, Y. (2022). “Participatory Design for Aligning Mental Models in Educational Software.” *International Journal of Human‑Computer Studies*, 158, 102‑115.
> - Card, S. K., Moran, T. P., & Newell, A. (1983). *The Psychology of Human‑Computer Interaction*. Lawrence Erlbaum.
> - Keystroke‑Level Model (KLM) documentation: https://www.cs.cmu.edu/~guyb/klm.html
> - Cognitive Walkthrough guidelines: https://www.usability.gov/how-to-and-tools/methods/cognitive-walkthrough.html