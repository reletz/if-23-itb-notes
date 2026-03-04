---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3151 Interaksi Manusia Komputer]]

> [!cornell] External and Distributed Cognition: Offloading, Annotations, and Computational Support
>
> > ## Questions/Cues
> >
> > - Mengapa off‑loading meningkatkan kinerja kognitif?
> > - Bagaimana anotasi memengaruhi memori eksternal?
> > - Apa perbedaan utama antara distributed dan external cognition?
> > - Kapan penggunaan kalkulator lebih menguntungkan daripada perhitungan mental?
> > - Bagaimana desain visual dapat memfasilitasi computational offloading?
> >
> > ## Reference Points
> >
> > - Lecture_Cognition.pptx (Slides 40‑45)
> > - Distributed_Cognition_Handbook.pdf (Pages 112‑119)
> > - Hutchins_1995_Theory_of_Distributed_Cognition.pdf (Pages 23‑30)
>
> > ### Distributed Cognition
> >
> > Distributed cognition (kognisi terdistribusi) menekankan bahwa proses mental tidak terbatas pada otak individu, melainkan tersebar melintasi orang, artefak, dan lingkungan fisik. Konsep ini pertama kali dipopulerkan oleh Edwin Hutchins (1995) yang menunjukkan bagaimana kapal laut mengandalkan peta, jam, sinyal suara, serta koordinasi kru untuk menyelesaikan tugas navigasi yang kompleks. Dalam konteks HCI, distributed cognition menjelaskan bagaimana antarmuka, perangkat keras, dan media eksternal (misalnya, diagram, tabel, atau dashboard) berperan sebagai “ekstensi” kognitif, memungkinkan pengguna mengalih‑dayakan beban mental ke representasi luar.
> >
> > Salah satu implikasi utama adalah bahwa desain harus memperhatikan alur transformasi informasi antar representasi internal dan eksternal. Misalnya, ketika seorang analis data memindahkan data mentah ke visualisasi grafik, ia tidak lagi harus mengingat setiap nilai numerik; grafik menjadi medium yang mengekspresikan pola secara visual, sehingga otak dapat fokus pada interpretasi pola alih‑alih mengingat angka satu per satu. Proses ini meningkatkan efisiensi kognitif karena meminimalkan beban memori kerja (working memory) yang terbatas.
> >
> > Distributed cognition juga menyoroti pentingnya “propagasi representasional” – cara informasi berubah bentuk ketika berpindah media. Setiap transformasi (misalnya, dari teks ke diagram) harus dirancang agar tidak menimbulkan ambiguitas atau kehilangan makna. Oleh karena itu, konsistensi simbolik, konvensi visual, dan affordance (kemampuan memberi petunjuk tentang cara penggunaan) menjadi faktor kritis dalam menciptakan sistem yang mendukung kolaborasi tim dan interaksi manusia‑mesin yang mulus.
> >
> > Secara praktis, penerapan distributed cognition dapat dilihat pada sistem kolaboratif seperti Google Docs, di mana perubahan dokumen secara real‑time menjadi representasi eksternal yang dapat diakses, diedit, dan dipantau oleh banyak pengguna secara simultan. Setiap pengguna tidak perlu menyimpan seluruh riwayat perubahan dalam ingatan; sistem menyimpan dan menampilkan status terkini, sehingga tim dapat berkoordinasi tanpa beban memori yang berlebihan.
> >
> > ### External Cognition
> >
> > External cognition (kognisi eksternal) merupakan sub‑set dari distributed cognition yang berfokus pada cara artefak fisik atau digital membantu individu mengingat, merencanakan, atau memecahkan masalah. Contoh paling sederhana adalah penggunaan catatan tempel (post‑it), kalender, atau daftar belanja. Dengan menuliskan tugas pada media eksternal, individu mengalihkan beban penyimpanan (encoding) ke objek fisik, sehingga memori jangka pendek dapat dialokasikan untuk proses berpikir yang lebih tinggi seperti analisis atau kreativitas.
> >
> > Penelitian menunjukkan bahwa eksternalisasi informasi dapat meningkatkan akurasi recall dan mengurangi kesalahan. Misalnya, dalam studi Bergman & Whittaker (2016) tentang personal information management, partisipan yang menggunakan struktur folder yang konsisten bersama label yang bermakna berhasil menemukan file lebih cepat dibandingkan yang mengandalkan ingatan semata. Hal ini menegaskan bahwa “naming” dan “categorizing” bukan sekadar estetika, melainkan strategi kognitif yang memanfaatkan memori semantik eksternal.
> >
> > Selain catatan analog, teknologi digital menyediakan bentuk eksternal yang lebih dinamis, seperti bookmark, tag, atau sistem pencarian berbasis AI. Fitur pencarian “partial match” atau “fuzzy search” memungkinkan pengguna menemukan dokumen meski tidak mengingat nama lengkapnya, sehingga beban memori retrieval berkurang secara signifikan. Namun, desain harus menghindari overload visual; terlalu banyak label atau warna dapat menciptakan kebingungan, melanggar prinsip “salience” yang dibahas pada slide sebelumnya.
> >
> > External cognition juga berperan dalam proses pembelajaran. Misalnya, diagram konsep yang menghubungkan ide‑ide utama membantu siswa membangun mental model yang lebih terstruktur, karena diagram berfungsi sebagai “scaffold” eksternal yang menuntun proses internalisasi. Dengan demikian, eksternalisasi tidak hanya mengurangi beban memori, tetapi juga memperkaya kualitas representasi mental.
> >
> > ### Computational Offloading
> >
> > Computational offloading (pembebanan komputasi) merujuk pada praktik memindahkan operasi perhitungan atau pemrosesan data dari otak manusia ke alat eksternal—baik itu kalkulator, spreadsheet, atau algoritma otomatis. Contoh klasik adalah menghitung perkalian besar secara manual versus menggunakan kalkulator. Pada slide 43, pertanyaan “234 × 456” menyoroti bahwa melakukan perhitungan pada kertas (pen‑and‑paper) lebih mudah daripada menghitung secara mental karena kertas menyediakan ruang eksternal untuk menulis langkah‑langkah intermediate.
> >
> > Offloading memiliki dua manfaat utama: pertama, mengurangi beban pada memori kerja yang terbatas (biasanya 7 ± 2 item menurut Miller). Kedua, meningkatkan akurasi karena proses eksternal dapat diulang, diverifikasi, atau divisualisasikan. Dalam konteks HCI, desain antarmuka yang menyediakan “computational scaffolds”—seperti tabel pivot, visualisasi interaktif, atau rekomendasi otomatis—memungkinkan pengguna menyelesaikan tugas kompleks tanpa harus mengingat semua aturan atau prosedur.
> >
> > Namun, offloading tidak selalu menguntungkan. Jika alat eksternal tidak dapat diakses (misalnya, koneksi internet terputus) atau jika pengguna terlalu bergantung pada bantuan eksternal, kemampuan mental untuk melakukan perhitungan dasar dapat menurun (fenomena “digital amnesia”). Oleh karena itu, desain yang baik harus menyeimbangkan antara menyediakan bantuan eksternal dan melatih keterampilan internal, misalnya dengan menampilkan langkah‑langkah perhitungan secara bertahap sehingga pengguna tetap terlibat secara kognitif.
> >
> > Selain kalkulator, contoh offloading yang lebih canggih meliputi sistem rekomendasi berbasis machine learning yang menyaring ribuan opsi produk, atau visual analytics yang mengubah dataset besar menjadi heatmap. Kedua contoh tersebut mengubah data mentah menjadi representasi yang dapat diproses secara visual, sehingga otak manusia dapat fokus pada interpretasi pola alih‑alih mengolah data mentah.
> >
> > ### Annotation and Cognitive Tracing
> >
> > Anotasi (annotation) adalah tindakan menambahkan tanda, catatan, atau highlight pada representasi yang sudah ada. Pada slide 44, contoh anotasi meliputi mencoret, menandai, atau menggarisbawahi. Anotasi berfungsi sebagai “external memory cue” yang memperkuat encoding dan retrieval. Ketika seorang pembaca menandai kalimat penting, ia tidak hanya mengubah tampilan visual, tetapi juga menciptakan jalur memori tambahan yang menghubungkan informasi dengan konteks fisik (posisi pada halaman).
> >
> > Cognitive tracing (penelusuran kognitif) memperluas konsep anotasi dengan memanipulasi urutan atau struktur item eksternal untuk mendukung proses berpikir. Contoh permainan Scrabble atau susunan kartu menunjukkan bagaimana mengatur kembali elemen eksternal dapat memicu pemikiran strategis. Dalam lingkungan kerja, teknik seperti “kanban board” atau “story mapping” memungkinkan tim menelusuri alur kerja secara visual, memindahkan kartu tugas dari “To‑Do” ke “Done”. Proses ini tidak hanya memvisualisasikan status, tetapi juga mengurangi beban mental dalam melacak progres.
> >
> > Penelitian menunjukkan bahwa anotasi kolaboratif meningkatkan pemahaman bersama. Misalnya, dalam sistem pembelajaran daring, mahasiswa dapat menambahkan komentar pada slide presentasi; komentar tersebut menjadi artefak eksternal yang dapat diakses kembali oleh seluruh kelas, memperkaya pengetahuan kolektif. Namun, penting untuk mengatur standar anotasi (warna, simbol) agar tidak menimbulkan ambiguitas.
> >
> > Dari perspektif desain, antarmuka harus menyediakan alat anotasi yang intuitif (misalnya, drag‑and‑drop highlight) serta kemampuan untuk menyimpan, mengekspor, atau berbagi anotasi. Fitur “undo/redo” dan “layered annotations” memungkinkan pengguna bereksperimen tanpa takut kehilangan informasi asli, sehingga proses eksplorasi kognitif menjadi lebih aman dan produktif.
> >
> > ### Design Implications for External & Distributed Cognition
> >
> > Memahami distributed dan external cognition mengarahkan desainer untuk menciptakan lingkungan kerja yang “cognitively supportive”. Beberapa prinsip utama meliputi:
> >
> > 1. **Representational Consistency** – Pastikan simbol, warna, dan ikon konsisten di seluruh antarmuka sehingga pengguna dapat mentransfer pengetahuan antar konteks tanpa kebingungan.
> > 2. **Salient Grouping** – Gunakan batas visual (border), spasi, atau warna untuk mengelompokkan informasi yang terkait, memudahkan proses off‑loading dan retrieval.
> > 3. **Scaffolded Computation** – Sediakan alat bantu (kalkulator, visualisasi, auto‑complete) yang menampilkan langkah‑langkah intermediate, sehingga pengguna tetap terlibat secara kognitif.
> > 4. **Editable Annotations** – Izinkan pengguna menambahkan, mengubah, atau menghapus anotasi dengan mudah, serta menyimpan riwayat perubahan untuk kolaborasi.
> > 5. **Adaptive Search & Retrieval** – Implementasikan pencarian fuzzy, tag otomatis, atau rekomendasi berbasis konteks untuk mengurangi beban memori retrieval.
> >
> > Dengan mengintegrasikan prinsip‑prinsip ini, sistem tidak hanya mengurangi beban kognitif, tetapi juga memperluas kapasitas kognitif pengguna melalui eksternalisasi yang terstruktur dan kolaboratif.

> [!cornell] #### Summary
>
> **Distributed cognition** menekankan bahwa proses berpikir tersebar melintasi individu, artefak, dan lingkungan, sehingga desain harus memfasilitasi alur transformasi informasi antar representasi. **External cognition** memperkuat memori dengan mengalih‑dayakan beban penyimpanan ke media eksternal seperti catatan, tag, atau sistem pencarian cerdas. **Computational offloading** mengurangi beban memori kerja dengan memindahkan perhitungan ke alat eksternal, sementara **annotation serta cognitive tracing** menyediakan jejak eksternal yang memperkuat encoding dan memungkinkan penelusuran logika secara visual. Implementasi prinsip‑prinsip ini menghasilkan antarmuka yang **cognitively supportive**, meningkatkan efisiensi, akurasi, dan kolaborasi pengguna.

> [!ad-libitum]- Additional Information
>
> #### Formal Models of Distributed Cognition
>
> Salah satu kerangka formal yang banyak dipakai adalah **Cognitive Task Analysis (CTA)** yang memetakan alur informasi antara agen (manusia atau mesin) dan artefak. Model ini biasanya direpresentasikan dalam diagram alur (flow diagram) yang mencakup tiga komponen utama: (1) *information source* (misalnya sensor atau database), (2) *representation transformation* (misalnya visualisasi atau konversi data), dan (3) *action execution* (misalnya perintah ke perangkat). Dengan memformalkan proses ini, peneliti dapat menghitung beban kognitif pada tiap tahapan menggunakan metrik seperti **cognitive load index (CLI)** atau **GOMS (Goals, Operators, Methods, and Selection rules)**. Analisis GOMS memungkinkan estimasi waktu eksekusi dan memori yang diperlukan untuk tiap operasi UI, sehingga desainer dapat mengidentifikasi titik kritis di mana off‑loading paling dibutuhkan.
>
> Model formal ini juga mendukung **simulation**: dengan mensimulasikan alur kerja pada perangkat lunak seperti *Cognitive Architecture* (misalnya ACT‑R, Soar), peneliti dapat menguji skenario off‑loading sebelum implementasi nyata, mengurangi risiko kegagalan desain.
>
> #### Comparative Analysis of Offloading Strategies
>
> Terdapat tiga strategi utama dalam computational offloading: (a) **Manual Offloading** (menggunakan kertas, kalkulator), (b) **Semi‑Automatic Offloading** (fitur spreadsheet, auto‑complete), dan (c) **Fully Automatic Offloading** (AI‑driven recommendation, real‑time analytics). Manual offloading memberikan kontrol penuh dan transparansi, namun memerlukan interaksi berulang. Semi‑automatic mengurangi interaksi dengan menyediakan template atau fungsi yang dapat dipanggil, meningkatkan kecepatan tanpa mengorbankan pemahaman. Fully automatic menawarkan kecepatan maksimum, tetapi berisiko menurunkan keterampilan mental pengguna (digital amnesia) dan menimbulkan masalah kepercayaan bila hasil tidak dapat dijelaskan (black‑box problem).
>
> Penelitian oleh **Kelley et al. (2020)** menunjukkan bahwa kombinasi semi‑automatic dan manual offloading menghasilkan **optimal trade‑off** antara akurasi dan pembelajaran jangka panjang pada mahasiswa teknik. Oleh karena itu, desain sistem yang adaptif—misalnya, menampilkan langkah‑langkah perhitungan pada awalnya dan kemudian menyembunyikannya setelah pengguna terbiasa—dapat memaksimalkan manfaat kedua pendekatan.
>
> #### Edge Cases and Nuances
>
> 1. **Multimodal Offloading** – Penggunaan suara (speech‑to‑text) atau gestur (hand‑tracking) sebagai media eksternal dapat menambah dimensi baru pada off‑loading, namun menimbulkan tantangan seperti ambiguitas pengenalan suara atau kelelahan otot pada gestur panjang.
> 2. **Context‑Sensitive Retrieval** – Sistem yang mengandalkan tag otomatis dapat gagal ketika konteks pengguna berubah secara cepat (misalnya, berpindah proyek). Solusinya adalah menyediakan mekanisme “context switch” yang memungkinkan pengguna meng‑override atau menyesuaikan tag secara manual.
> 3. **Privacy & Security** – Menyimpan anotasi atau catatan eksternal di cloud meningkatkan risiko kebocoran data pribadi. Desainer harus mengimplementasikan enkripsi end‑to‑end dan kontrol akses berbasis peran (RBAC) untuk melindungi informasi sensitif.
>
> Memahami nuansa‑nuansa ini penting agar solusi off‑loading tidak menimbulkan masalah baru yang mengganggu kognisi pengguna.
>
> #### Self‑Exploration Projects
>
> 1. **Visual Offloading Prototype** – Buat aplikasi web yang memungkinkan pengguna menulis perhitungan matematika pada kanvas, kemudian secara otomatis mengubahnya menjadi diagram alur (flowchart) menggunakan library *JointJS*. Evaluasi seberapa cepat pengguna dapat menyelesaikan masalah dibandingkan dengan perhitungan manual.
> 2. **Collaborative Annotation Platform** – Kembangkan ekstensi browser yang menambahkan fitur anotasi warna‑kod, komentar, dan tagging pada PDF akademik. Tambahkan fungsi pencarian berbasis tag dan analisis statistik penggunaan anotasi (berapa banyak anotasi per dokumen, warna yang paling sering dipakai).
> 3. **Adaptive Offloading Assistant** – Implementasikan chatbot berbasis GPT‑4 yang mendeteksi ketika pengguna mengajukan pertanyaan perhitungan kompleks, lalu menawarkan solusi semi‑automatic (menyajikan langkah‑langkah) atau full‑automatic (hasil akhir). Ukur perubahan beban kognitif dengan menggunakan NASA‑TLX questionnaire sebelum dan sesudah penggunaan.
>
> #### Tools and Resources
>
> - **ACT‑R Cognitive Architecture** – Platform simulasi kognitif untuk memodelkan beban memori dan proses off‑loading.
> - **JointJS** – Library JavaScript untuk membuat diagram interaktif, cocok untuk visual off‑loading.
> - **Zotero** – Manajer referensi yang membantu mengorganisir literatur tentang distributed cognition.
> - **Google Cloud Vision API** – Dapat dipakai untuk meng‑extract teks dari gambar anotasi fisik, memungkinkan integrasi antara anotasi analog dan digital.
> - **NASA‑TLX** – Instrumen standar untuk mengukur beban kerja kognitif pada pengguna.
>
> #### Further Reading
>
> - Hutchins, E. (1995). *