---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3151 Interaksi Manusia Komputer]]

> [!cornell] Usability vs. User Experience and the Role of Explicit Design Assumptions
>
> > ## Questions/Cues
> >
> > - Mengapa usability tidak cukup untuk menilai UX?
> > - Bagaimana asumsi desain memengaruhi gulf of execution?
> > - Kapan gulf of evaluation menjadi indikator UX buruk?
> > - Apa langkah praktis membuat asumsi desain eksplisit?
> > - Bagaimana goal‑task‑action membantu memisahkan masalah usability?
> >
> > ## Reference Points
> >
> > - Konseptualisasi Desain Interaksi IF3151 (Slides 27‑33)
> > - Konseptualisasi Desain Interaksi IF3151 (Slides 24‑26)
> > - Konseptualisasi Desain Interaksi IF3151 (Slides 29‑31)
>
> > ### Usability dan User Experience: Definisi dan Perbedaan Utama
> >
> > **Usability** berfokus pada seberapa mudah pengguna dapat menyelesaikan *task* atau *action* tertentu pada sebuah antarmuka. Kriteria utama meliputi efektivitas (apakah tujuan tercapai), efisiensi (berapa banyak usaha yang diperlukan), dan kepuasan (perasaan pengguna setelah menyelesaikan tugas). Contoh klasik adalah formulir online yang “ribet”: pengguna tidak dapat menemukan tombol *Submit* atau tidak memahami pesan error, sehingga task gagal. Pada level ini, analisis bersifat *micro*—menilai tiap langkah operasional secara terpisah.
> >
> > **User Experience (UX)** mencakup spektrum yang lebih luas, meliputi persepsi emosional, nilai estetika, kepercayaan, dan hubungan jangka panjang antara pengguna dan produk. UX menilai bagaimana rangkaian *goal*‑*task*‑*action* membentuk narasi pengalaman yang koheren. Misalnya, meskipun sebuah aplikasi memiliki proses checkout yang “usable”, pengguna mungkin tetap merasa tidak aman karena tampilan yang tidak profesional atau kurangnya transparansi pada kebijakan privasi. UX menuntut pemahaman tentang konteks penggunaan, harapan pengguna, dan dampak psikologis yang muncul setelah interaksi selesai.
> >
> > Perbedaan utama terletak pada skala dan fokus: **usability** menilai *kualitas* tiap aksi, sedangkan **UX** menilai *kualitas* keseluruhan perjalanan pengguna. Kedua dimensi saling melengkapi; kegagalan pada satu sisi dapat merusak persepsi pada sisi lainnya. Oleh karena itu, analisis yang efektif harus mengintegrasikan kedua perspektif, bukan menganggap salah satunya sebagai satu‑satunya ukuran keberhasilan.
> >
> > ### Peran Asumsi Desain Eksplisit dalam Mengurangi Gulf
> >
> > Setiap desain mengandung asumsi tentang apa yang menjadi *goal* pengguna, *task* yang dibayangkan, dan *action* yang dianggap “jelas”. Asumsi‑asumsi ini sering kali tersimpan secara implisit dalam *system image*—apa yang ditampilkan oleh sistem kepada pengguna. Ketika asumsi tidak sesuai dengan realitas pengguna, *gulf of execution* atau *gulf of evaluation* menjadi lebar, menandakan adanya kesenjangan kognitif.
> >
> > **Gulf of Execution** muncul ketika pengguna memiliki tujuan (goal) atau tugas (task) yang jelas, tetapi tidak dapat menemukan aksi yang tepat pada antarmuka. Misalnya, sebuah aplikasi perbankan mengasumsikan bahwa pengguna akan menekan ikon “Transfer” yang berada di menu samping; namun pengguna baru yang mengharapkan tombol “Kirim Uang” di halaman utama akan kebingungan. Asumsi desain yang tidak dieksplisitkan menyebabkan pengguna harus menebak‑tebak, meningkatkan beban kognitif, dan menurunkan efisiensi.
> >
> > **Gulf of Evaluation** terjadi ketika aksi berhasil dilakukan, tetapi pengguna tidak dapat menafsirkan respons sistem untuk menentukan apakah goal tercapai. Contoh: setelah menekan “Submit”, halaman hanya melakukan reload tanpa pesan konfirmasi. Asumsi bahwa pengguna akan mengerti bahwa reload berarti “data berhasil dikirim” tidak selalu berlaku. Dengan membuat asumsi‑asumsi ini eksplisit, desainer dapat menambahkan umpan balik (feedback) yang tepat, seperti notifikasi “Data berhasil dikirim”, sehingga jarak evaluasi menyusut.
> >
> > Membuat asumsi desain eksplisit berarti menuliskannya dalam dokumen spesifikasi, menguji melalui prototipe, dan memvalidasi dengan pengguna nyata. Proses ini mengubah asumsi menjadi *objek* yang dapat diukur, direvisi, atau dibuang bila tidak terbukti.
> >
> > ### Analisis Goal‑Task‑Action sebagai Kerangka Diagnostik
> >
> > Kerangka **Goal‑Task‑Action (GTA)** menyediakan bahasa yang presisi untuk memisahkan keluhan umum menjadi diagnosis yang dapat ditindaklanjuti. Langkah pertama adalah mengidentifikasi *goal*—keadaan akhir yang ingin dicapai pengguna (misalnya “mengirim uang”). Selanjutnya, *task* menggambarkan rangkaian aktivitas konseptual yang pengguna bayangkan diperlukan (mengisi formulir transfer). Akhirnya, *action* adalah operasi konkret pada antarmuka (menekan tombol “Submit”).
> >
> > Dengan memetakan keluhan ke dalam tiga level ini, desainer dapat menilai di mana jurang paling lebar. Jika *goal* dan *task* jelas tetapi *action* tidak ditemukan, fokus perbaikan adalah pada *affordance* dan *signifier* (meskipun istilah ini tidak dijelaskan secara detail di sini). Jika *action* berhasil tetapi pengguna tidak dapat menilai hasilnya, perbaikan harus diarahkan pada *feedback* dan *status* yang ditampilkan.
> >
> > Contoh praktis: keluhan “Form ini ribet”. Analisis GTA menghasilkan:
> >
> > - **Goal:** mengirim data.
> > - **Task:** mengisi & mengirim formulir.
> > - **Action:** menekan “Submit”.
> > - **Respons Sistem:** halaman reload tanpa pesan.
> > - **Interpretasi Pengguna:** tidak tahu apakah data terkirim.
> >
> > Dari sini, jelas bahwa *gulf of evaluation* lebar, sehingga solusi utama adalah menambahkan konfirmasi visual atau teks yang jelas.
> >
> > ### Membuat Asumsi Desain Eksplisit: Metode dan Praktik
> >
> > 1. **Inventarisasi Asumsi** – Pada setiap fase desain (konsep, wireframe, prototipe), tim menuliskan semua asumsi tentang goal, task, dan action. Contohnya: “Pengguna akan menganggap ikon ‘Keranjang’ sebagai tempat melihat daftar belanja”.
> > 2. **Validasi dengan Pengguna** – Menggunakan teknik *think‑aloud* atau *cognitive walkthrough* untuk menguji apakah asumsi tersebut memang berlaku. Jika pengguna tidak menemukan ikon yang diharapkan, asumsi harus direvisi.
> > 3. **Pengujian A/B** – Membandingkan dua varian antarmuka yang mengasumsikan aksi berbeda (misalnya tombol “Kirim” vs “Submit”) dan mengukur metrik keberhasilan (completion rate, error rate).
> > 4. **Dokumentasi dan Iterasi** – Setiap temuan dicatat dalam *design decision log* sehingga tim dapat melacak perubahan asumsi seiring iterasi produk.
> >
> > Praktik ini tidak hanya memperkecil gulf, tetapi juga meningkatkan transparansi tim desain, memudahkan kolaborasi lintas disiplin, dan menghasilkan produk yang lebih responsif terhadap kebutuhan nyata pengguna.
> >
> > ### Ringkasan Perbandingan Usability dan UX
> >
> > **Usability** menilai *bagaimana* pengguna menyelesaikan tugas secara efisien dan bebas error.
> >
> > **UX** menilai *bagaimana* pengguna merasakan keseluruhan interaksi, termasuk kepercayaan, kepuasan emosional, dan nilai jangka panjang.
> >
> > Kedua dimensi harus dianalisis melalui **Goal‑Task‑Action**, dengan asumsi desain yang dibuat eksplisit untuk mengidentifikasi dan menutup *gulf of execution* serta *gulf of evaluation*.
> >
> > Dengan pendekatan ini, keluhan “aplikasinya ribet” dapat diubah menjadi diagnosis yang terukur dan solusi yang terarah.

> [!cornell] #### Summary
>
> **Usability** berfokus pada efektivitas dan efisiensi aksi individu, sementara **User Experience (UX)** mencakup persepsi emosional dan nilai jangka panjang yang terbentuk dari rangkaian *goal‑task‑action*. Kedua dimensi saling melengkapi dan harus dianalisis secara bersamaan. Asumsi desain yang tidak dieksplisitkan menjadi penyebab utama *gulf of execution* atau *gulf of evaluation*, sehingga membuat asumsi menjadi objek yang dapat diuji dan direvisi sangat penting. Dengan kerangka GTA, setiap keluhan dapat diurai menjadi diagnosis yang konkret, memungkinkan perbaikan yang terarah pada antarmuka maupun pada cara sistem memberikan umpan balik.

> [!ad-libitum]- Additional Information
>
> #### Formal Metrics for Usability Evaluation
>
> Pengukuran usability biasanya dilakukan dengan metrik kuantitatif seperti **System Usability Scale (SUS)**, **Task Completion Rate**, **Error Rate**, dan **Time on Task**. SUS memberikan skor 0‑100 yang dapat dibandingkan secara lintas produk; nilai di atas 68 umumnya dianggap “baik”. Task Completion Rate mengukur persentase tugas yang berhasil diselesaikan tanpa bantuan, sementara Error Rate mencatat jumlah kesalahan yang terjadi per tugas. **Time on Task** menilai efisiensi dengan mengukur durasi rata‑rata yang diperlukan untuk menyelesaikan suatu aksi. Kombinasi metrik ini memberikan gambaran menyeluruh tentang seberapa “usable” sebuah sistem.
>
> Selain metrik kuantitatif, **kuesioner kepuasan** (misalnya NASA‑TLX untuk beban kerja) dan **observasi langsung** dapat menambah dimensi kualitatif. Penting untuk menggabungkan data kuantitatif dengan wawancara pengguna agar dapat mengidentifikasi penyebab mendasar dari kegagalan usability.
>
> #### Advanced UX Measurement Techniques
>
> UX menuntut pendekatan yang lebih holistik. **AttrakDiff** mengukur dimensi hedonic (kesenangan) dan pragmatic (kegunaan) melalui skala bipolar (misalnya “menarik‑membosankan”). **Customer Journey Mapping** memvisualisasikan seluruh perjalanan pengguna, mengidentifikasi titik kontak (touchpoints) dan emosi yang muncul di setiap fase. **Emotion Analytics** menggunakan rekaman wajah atau sensor galvanic skin response (GSR) untuk menilai reaksi emosional secara real‑time. Metode‑metode ini membantu mengungkap aspek‑aspek UX yang tidak terlihat dalam metrik usability tradisional.
>
> Implementasi praktis dapat dimulai dengan **survei post‑task** yang menanyakan perasaan pengguna (misalnya “Seberapa puas Anda dengan proses ini?”) dan mengaitkannya dengan data kuantitatif untuk menemukan korelasi antara efisiensi dan kepuasan.
>
> #### Validasi Asumsi Desain melalui Metode Penelitian
>
> **Think‑Aloud Protocol** memungkinkan peneliti mendengar proses berpikir pengguna secara langsung, sehingga dapat mengidentifikasi asumsi yang tidak sesuai. **Cognitive Walkthrough** menilai setiap langkah aksi berdasarkan pertanyaan “Apakah pengguna akan tahu apa yang harus dilakukan?”. **A/B Testing** memberikan data empiris tentang mana dari dua varian asumsi yang lebih efektif, dengan mengukur metrik konversi atau error rate.
>
> Untuk menguji asumsi tentang *goal*, peneliti dapat menggunakan **Goal‑Directed Interviews**, di mana peserta diminta menjelaskan apa yang ingin mereka capai sebelum melihat antarmuka. Asumsi tentang *task* dapat divalidasi dengan **Task Analysis**, mengamati urutan langkah yang diambil pengguna secara alami. Sedangkan asumsi tentang *action* diuji lewat **Usability Lab Testing** dengan rekaman layar dan eye‑tracking untuk melihat apakah aksi yang diharapkan memang menjadi pilihan pertama.
>
> #### Edge Cases, Limitations, and Cultural Considerations
>
> Tidak semua asumsi bersifat universal. **Budaya** dapat memengaruhi interpretasi ikon, warna, atau urutan langkah. Misalnya, warna merah yang diartikan “bahaya” di sebagian budaya dapat berarti “keberuntungan” di budaya lain, sehingga asumsi tentang *signifier* harus diuji lintas‑konteks. **Keterbatasan kognitif** seperti disleksia atau gangguan penglihatan juga menuntut desain yang mempertimbangkan alternatif teks atau ukuran font yang dapat diakses.
>
> **Konflik antar‑asumsi** muncul ketika satu asumsi tentang *action* bertentangan dengan asumsi lain tentang *feedback*. Contohnya, asumsi bahwa pengguna akan menekan “Enter” untuk mengirim, sementara sistem menampilkan tombol “Kirim” yang tidak responsif. Mengidentifikasi dan menyelesaikan konflik ini memerlukan iterasi berulang dan dokumentasi yang jelas.
>
> #### Self‑Exploration Projects
>
> 1. **Prototipe Diagnostik Gulf** – Buat prototipe interaktif (misalnya dengan Figma atau Axure) yang meniru sebuah proses checkout. Tambahkan logika untuk merekam kapan pengguna mengalami gulf of execution atau evaluation, kemudian analisis data untuk mengidentifikasi asumsi yang gagal.
> 2. **Studi Perbandingan Metode UX** – Lakukan dua studi paralel pada aplikasi yang sama: satu menggunakan SUS + Task Completion Rate, dan satu lagi menggunakan AttrakDiff + Emotion Analytics. Bandingkan hasilnya untuk melihat bagaimana metrik usability dan UX saling melengkapi atau bertentangan.
>
> #### Tools and Resources
>
> - **Figma** – prototyping dengan fitur *interactive components* untuk menguji asumsi aksi.
> - **UsabilityHub** – platform untuk melakukan tes A/B cepat pada elemen UI.
> - **Morae** – software rekaman sesi pengguna lengkap dengan eye‑tracking.
> - **SUS Calculator** (online) – menghitung skor System Usability Scale secara otomatis.
> - **AttrakDiff Online** – mengumpulkan data hedonic‑pragmatic UX.
>
> #### Further Reading
>
> - Nielsen, J., & Molich, R. (1990). *Heuristic Evaluation of User Interfaces*.
> - Hassenzahl, M. (2010). *Experience Design: Technology for All the Right Reasons*.
> - Sauro, J., & Lewis, J. R. (2016). *Quantifying the User Experience: Practical Statistics for User Research*.
> - ISO 9241‑11:2018 – *Ergonomic requirements for office work with visual display terminals (VDTs) – Guidance on usability*.
> - Norman, D. A. (2013). *The Design of Everyday Things* (edisi revisi).