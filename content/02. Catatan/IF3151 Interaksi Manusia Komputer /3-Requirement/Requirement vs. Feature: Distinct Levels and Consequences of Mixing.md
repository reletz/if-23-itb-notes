---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3151 Interaksi Manusia Komputer]]

> [!cornell] Requirement vs. Feature: Distinct Levels and Consequences of Mixing
>
> > ## Questions/Cues
> >
> > - Mengapa requirement tidak boleh dicampur feature?
> > - Bagaimana requirement berhubungan dengan goal?
> > - Apa contoh konsekuensi pencampuran level?
> > - Bagaimana konteks penggunaan memengaruhi requirement?
> > - Contoh perbedaan feature untuk satu requirement yang sama
> >
> > ## Reference Points
> >
> > - IF3151_Interaction_Design.pdf (Pages 3-7, 12-15, 18-22, 33)
> > - IF3151_Case_Study_ECommerce.pdf (Pages 19-21)
>
> > ### Perbedaan Fundamental antara Requirement dan Feature
> >
> > **Requirement** adalah pernyataan tentang *kapabilitas* sistem yang diperlukan agar suatu **goal** pengguna dapat tercapai dalam **konteks** tertentu. Ia menjawab pertanyaan “*apa* yang harus dapat dilakukan sistem?” tanpa menyebutkan *bagaimana* cara melakukannya. Misalnya, “sistem harus memungkinkan verifikasi status transaksi secara jelas.” Requirement berada pada **level konseptual**; ia bersifat abstrak, dapat dievaluasi secara kualitatif, dan tetap valid meskipun teknologi atau tampilan berubah.
> >
> > **Feature**, di sisi lain, adalah realisasi konkret dari requirement. Ia menjawab “*bagaimana* kebutuhan tersebut diwujudkan dalam produk?” Contohnya, menambahkan tombol “Lihat Status” dengan tampilan pop‑up berwarna hijau. Feature berada pada **solution space**; ia mengikat keputusan desain UI, teknologi, atau arsitektur. Karena bersifat spesifik, feature dapat berubah tanpa mengubah requirement yang mendasarinya.
> >
> > Perbedaan ini dapat diibaratkan seperti **peta** (requirement) versus **jalan raya** (feature). Peta memberi arah umum (tujuan dan batasan), sementara jalan raya menentukan rute spesifik yang dilalui. Memahami perbedaan ini penting agar tim tidak terjebak dalam debat preferensi estetika ketika masalah yang sebenarnya adalah pemahaman kebutuhan pengguna.
> >
> > ### Mengapa Tidak Memulai dari Feature?
> >
> > Praktik “Tambahkan search”, “Perlu filter”, atau “Harus ada notifikasi” langsung menempatkan tim pada **solution space** sebelum problem space dipahami secara mendalam. Pada tahap ini, belum jelas apakah masalah yang ingin dipecahkan memang memerlukan fitur tersebut, atau apakah ada kebutuhan yang lebih fundamental yang belum teridentifikasi.
> >
> > Analogi yang berguna adalah **membangun rumah tanpa fondasi**. Menentukan jenis jendela atau warna cat sebelum mengetahui ukuran ruangan, beban struktural, atau kebutuhan penghuni dapat menghasilkan solusi yang tidak cocok atau bahkan harus dibongkar kembali. Dengan memulai dari requirement, tim dapat memastikan bahwa setiap feature yang dirancang memang menanggapi kebutuhan yang terukur, bukan sekadar keinginan subjektif.
> >
> > Selain itu, memulai dari feature meningkatkan risiko **bias desain**: keputusan teknis atau estetika mendominasi diskusi, sehingga pertanyaan riset (“apakah kebutuhan ini benar‑benar ada?”) terabaikan. Hal ini mengakibatkan produk yang mungkin tampak menarik tetapi tidak menyelesaikan masalah pengguna secara efektif.
> >
> > ### Konsekuensi Jika Requirement dan Feature Tercampur
> >
> > Ketika requirement dan feature dicampur dalam satu pernyataan, diskusi tim cenderung beralih menjadi **debat preferensi** (misalnya, “saya suka tombol biru vs. merah”) alih‑alih menilai apakah kebutuhan yang lebih tinggi sudah terpenuhi. Akibatnya:
> >
> > 1. **Diagnosa masalah menjadi kabur** – tidak jelas apakah kegagalan berasal dari pemahaman kebutuhan atau dari implementasi teknis.
> > 2. **Evaluasi kehilangan pijakan** – tanpa requirement yang terdefinisi, tidak ada kriteria objektif untuk mengukur keberhasilan fitur.
> > 3. **Fleksibilitas desain berkurang** – feature yang sudah ditetapkan mengunci pilihan arsitektur, menyulitkan iterasi atau adaptasi ketika konteks berubah.
> >
> > Memisahkan kedua level menjaga **ketepatan diagnosis** (memahami apa yang sebenarnya dibutuhkan) dan **fleksibilitas desain** (memilih cara terbaik untuk memenuhinya). Tim dapat dengan mudah mengganti satu feature dengan alternatif lain tanpa harus meninjau kembali seluruh kebutuhan.
> >
> > ### Hubungan Requirement dengan Goal dan Context
> >
> > Setiap requirement harus berakar pada **goal** pengguna dan **konteks penggunaan**. Goal menjawab “*mengapa* pengguna melakukan sesuatu”, sedangkan konteks menjawab “*di mana* dan *dengan kondisi apa* tindakan itu terjadi”. Misalnya, goal “melacak status pengiriman” memerlukan requirement “sistem menyediakan status yang dapat dipahami dan diperbarui secara konsisten”. Jika konteks berubah – misalnya, dari **ruang operasi** (kecepatan tinggi, minim distraksi) ke **ruang administrasi** (detail lengkap, dokumentasi) – requirement yang sama dapat menghasilkan feature yang berbeda (tampilan ringkas vs. tampilan detail).
> >
> > Dengan mengekspresikan requirement sebagai fungsi **f(goal, context)**, desainer dapat memastikan bahwa setiap perubahan konteks tidak mengubah esensi kebutuhan, melainkan hanya memicu variasi feature yang sesuai. Ini juga memudahkan **evaluasi**: apakah sistem masih memenuhi requirement ketika konteks berubah?
> >
> > ### Contoh Kasus: Satu Requirement, Berbagai Feature
> >
> > Pada kasus **perbandingan produk** dalam e‑commerce, requirement yang sama adalah “pengguna dapat membandingkan alternatif produk”. Feature yang dapat dipilih meliputi:
> >
> > - **Tampilan berdampingan** (grid side‑by‑side)
> > - **Highlight otomatis** (menyoroti perbedaan utama)
> > - **Ringkasan naratif** (deskripsi teks perbandingan)
> > - **Visualisasi grafik** (chart perbandingan harga/fitur)
> >
> > Semua feature tersebut melayani requirement yang sama, namun masing‑masing menyesuaikan dengan **preferensi pengguna**, **platform** (mobile vs. desktop), atau **kebijakan bisnis**. Karena requirement tetap stabil, tim dapat bereksperimen dengan berbagai feature tanpa harus kembali ke tahap riset kebutuhan.
> >
> > ### Ringkasan Perbedaan Level
> >
> > - **Requirement** = *apa* yang dibutuhkan; bersifat abstrak, terikat pada goal & context.
> > - **Feature** = *bagaimana* kebutuhan diwujudkan; bersifat konkret, dipengaruhi oleh teknologi & desain UI.
> > - Memisahkan level menghindari debat preferensi, meningkatkan fleksibilitas, dan menyediakan pijakan evaluasi yang jelas.
> > - Contoh nyata menunjukkan satu requirement dapat menghasilkan banyak feature yang berbeda, tergantung pada konteks dan tujuan bisnis.

> [!cornell] #### Summary
>
> **Requirement** adalah pernyataan konseptual tentang kapabilitas sistem yang diperlukan untuk mencapai **goal** pengguna dalam **konteks** tertentu, sedangkan **feature** adalah realisasi konkret dari requirement tersebut. Mencampur kedua level menyebabkan diskusi beralih ke preferensi desain, mengaburkan diagnosis masalah, dan mengurangi fleksibilitas iterasi. Dengan memisahkan requirement dari feature, tim dapat menjaga **ketepatan diagnosis**, **fleksibilitas desain**, serta **evaluasi objektif**, memungkinkan satu requirement menghasilkan beragam feature yang disesuaikan dengan konteks dan kebutuhan pengguna.

> [!ad-libitum]- Additional Information
>
> #### Analisis Struktural Requirement vs. Feature
>
> Secara struktural, requirement dapat dipetakan ke dalam **model konseptual** yang menghubungkan tiga elemen utama: *Goal*, *Task*, dan *Action*. Model ini bersifat **hierarkis**; goal berada di puncak, diikuti oleh task yang mendukung goal, dan action yang mengeksekusi task. Feature, di sisi lain, berada pada **lapisan implementasi** yang menerjemahkan action menjadi antarmuka, logika bisnis, atau infrastruktur teknis. Pendekatan ini memungkinkan penggunaan **diagram UML** (misalnya, use‑case diagram) untuk memvisualisasikan requirement, sementara **wireframe** atau **prototype** menggambarkan feature. Dengan memisahkan diagram konseptual dan artefak desain, tim dapat melacak perubahan pada satu level tanpa mengganggu level lainnya.
>
> #### Strategi Pemisahan dalam Proses Desain
>
> 1. **Workshop Goal‑Requirement** – Fasilitasi sesi bersama stakeholder untuk menuliskan goal, kemudian mengubahnya menjadi requirement yang terukur (misalnya, “sistem harus menampilkan status transaksi dalam <2 detik”).
> 2. **Inventarisasi Feature** – Setelah requirement disepakati, lakukan brainstorming feature yang dapat memenuhi requirement tersebut, kemudian evaluasi masing‑masing berdasarkan kriteria *feasibility*, *cost*, dan *user value*.
> 3. **Traceability Matrix** – Buat matriks pelacakan yang menghubungkan setiap requirement dengan satu atau lebih feature. Ini memudahkan audit ketika perubahan konteks atau regulasi terjadi, karena dampak pada feature dapat diidentifikasi secara cepat.
>
> Strategi ini membantu menghindari **feature creep** (penambahan fitur tanpa dasar kebutuhan) dan memastikan bahwa setiap keputusan desain dapat ditelusuri kembali ke requirement yang valid.
>
> #### Implikasi pada Evaluasi dan Validasi
>
> Karena requirement bersifat abstrak, evaluasinya dapat dilakukan melalui **metode kualitatif** (wawancara pengguna, observasi) serta **metode kuantitatif** (ukuran kepuasan, waktu penyelesaian task). Feature, sebaliknya, dievaluasi lewat **usability testing**, **A/B testing**, atau **benchmark performa**. Memisahkan kedua level memungkinkan penggunaan **metrik yang tepat** pada tiap level: misalnya, *goal attainment rate* untuk requirement, dan *click‑through rate* atau *error rate* untuk feature. Pendekatan ini meningkatkan validitas hasil evaluasi dan memudahkan iterasi berkelanjutan.
>
> #### Tools, Resources, and Further Reading
>
> - **Book:** “Designing Interactive Systems” (Rogers, Sharp, Preece) – bab tentang *requirements engineering* dan *design implementation*.
> - **Paper:** “From Requirements to Features: A Systematic Mapping Study” – International Journal of Human‑Computer Studies, 2022.
> - **Tool:** **Atlassian Jira** dengan plugin *Requirements & Test Management* untuk melacak traceability antara requirement dan feature.
> - **Tool:** **Figma** – prototyping tool yang memungkinkan tim membuat feature secara visual sambil tetap mengaitkan elemen ke requirement melalui plugin *FigJam*.
>
> #### Self‑Exploration Projects
>
> 1. **Analisis Feature Variasi:** Pilih satu requirement dari aplikasi e‑commerce (misalnya, “menampilkan status pengiriman”) dan buat tiga prototype feature yang berbeda (tabel, grafik, notifikasi push). Lakukan usability test dengan 5 pengguna dan laporkan mana yang paling efektif dalam memenuhi requirement.
> 2. **Traceability Matrix Builder:** Kembangkan spreadsheet atau aplikasi kecil yang secara otomatis menghasilkan matriks traceability antara requirement dan feature, termasuk kolom untuk status validasi, prioritas, dan catatan perubahan konteks.
>
> #### Further Reading
>
> - **“Interaction Design: Beyond Human‑Computer Interaction”** – Helen Sharp, Yvonne Rogers, Jenny Preece, 4th ed. (Bab 4 tentang requirement analysis).
> - **“The Elements of User Experience”** – Jesse James Garrett (Konsep “strategy layer” vs. “surface layer”).
> - **Online Course:** Coursera – “Human‑Centered Design: From Requirements to Prototypes” (University of California, San Diego).
> - **Resource:** **Visualgo** (https://visualgo.net) – visualisasi perbedaan antara requirement (goal) dan feature (implementation) dalam konteks algoritma.