---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3151 Interaksi Manusia Komputer]]

> [!cornell] Use Case as a Formal Blueprint for Interaction Design
>
> > ## Questions/Cues
> >
> > - Mengapa use case diperlukan dalam desain interaksi?
> > - Bagaimana struktur dasar sebuah use case?
> > - Apa perbedaan essential dan fully‑dressed use case?
> > - Kapan sebaiknya memakai scenario versus use case?
> > - Bagaimana cara menghubungkan scenario dengan use case?
> >
> > ## Reference Points
> >
> > - IF3151_Interaction_Design.pptx (Slides 19‑30)
> > - Gottesdiener & Gorman (2012) – Agile Product Planning (Slide 18)
> > - Contoh Use Case “Travel Organizer” (Slides 23‑25)
>
> > ### Use Case sebagai Struktur Interaksi
> >
> > Use case merupakan deskripsi terperinci mengenai urutan interaksi antara **aktor** (pengguna atau sistem eksternal) dan **sistem** untuk mencapai suatu **goal** (tujuan). Berbeda dengan narasi bebas, use case menekankan pada langkah‑langkah yang dapat diikuti secara berulang, sehingga memudahkan tim desain dan pengembang untuk memahami apa yang harus dilakukan sistem pada tiap titik interaksi. Misalnya, pada aplikasi ride‑hailing, goal‑nya adalah “memesan kendaraan”. Use case akan merinci bagaimana pengguna memasukkan tujuan, sistem memvalidasi data, menghitung perkiraan tarif, dan akhirnya mengirimkan permintaan ke driver. Dengan menuliskan urutan ini, semua pihak memiliki gambaran yang sama tentang tanggung jawab masing‑masing.
> >
> > Konsep **aktor** tidak selalu berupa manusia; dapat berupa perangkat lain, layanan pihak ketiga, atau bahkan subsistem internal. Setiap aktor memiliki peran spesifik yang dijelaskan dalam use case, sehingga ketika terjadi perubahan pada salah satu komponen, dampaknya dapat dilacak dengan jelas. Pendekatan ini membantu menghindari ambiguitas yang sering muncul pada daftar kebutuhan yang terlalu abstrak.
> >
> > Use case juga menekankan **preconditions** (syarat sebelum interaksi dimulai) dan **postconditions** (hasil yang diharapkan setelah interaksi selesai). Dengan menuliskan kondisi ini, tim dapat memastikan bahwa semua prasyarat teknis terpenuhi dan hasil akhir dapat diverifikasi, misalnya “pengguna harus sudah login” sebagai precondition, dan “pesanan tercatat di basis data” sebagai postcondition.
> >
> > Secara keseluruhan, use case berfungsi sebagai jembatan antara pemahaman konseptual dan implementasi teknis, menjadikan proses desain lebih terstruktur dan dapat diuji secara sistematis.
> >
> > ### Struktur Use Case
> >
> > Sebuah use case standar biasanya mencakup enam elemen utama: **Actor**, **Goal**, **Preconditions**, **Main Success Scenario**, **Alternative Flows**, dan **Postconditions**.
> >
> > 1. **Actor**: siapa yang berinteraksi dengan sistem.
> > 2. **Goal**: apa yang ingin dicapai oleh aktor.
> > 3. **Preconditions**: kondisi yang harus dipenuhi sebelum use case dapat dijalankan.
> > 4. **Main Success Scenario**: rangkaian langkah ideal yang menghasilkan pencapaian goal tanpa gangguan.
> > 5. **Alternative Flows**: jalur alternatif yang terjadi ketika ada kegagalan atau pilihan lain (misalnya, “tidak ada driver tersedia”).
> > 6. **Postconditions**: keadaan sistem setelah use case selesai, baik berhasil maupun gagal.
> >
> > Contoh konkret dapat dilihat pada **Use Case “Travel Organizer”**: aktor memasukkan negara tujuan, sistem memvalidasi, meminta kewarganegaraan, memeriksa persyaratan visa, dan akhirnya menampilkan informasi. Setiap langkah memiliki tanggung jawab sistem yang jelas, sehingga developer dapat langsung memetakan fungsi-fungsi kode ke dalam diagram alur.
> >
> > Penting untuk menuliskan **alternative flows** secara eksplisit, karena mereka mengungkap titik‑titik potensial di mana sistem dapat gagal atau memerlukan penanganan khusus. Misalnya, jika nama negara tidak valid, sistem harus menampilkan pesan error dan kembali ke langkah pertama. Dengan menuliskan skenario ini, tim dapat merencanakan pengujian yang lebih komprehensif.
> >
> > ### Dua Gaya Penulisan Use Case
> >
> > **Essential Use Case** menyoroti niat pengguna dan tanggung jawab sistem secara singkat. Contohnya:
> >
> > - *User requests ride.*
> > - *System shows available drivers.*
> > - *User confirms selection.*
> > - *System dispatches driver.*
> >
> > Gaya ini berguna pada tahap awal ketika tim masih mengidentifikasi fungsi utama tanpa terperinci pada validasi atau penanganan error. Karena bersifat abstrak, essential use case mudah dipahami oleh stakeholder non‑teknis.
> >
> > **Fully‑Dressed Use Case** memperluas essential dengan detail operasional, termasuk preconditions, postconditions, dan semua alternatif. Pada contoh travel organizer, langkah‑langkah meliputi validasi negara, validasi kewarganegaraan, penanganan tidak ada data visa, serta opsi berbagi hasil ke media sosial. Gaya ini cocok untuk fase desain rinci, pembuatan dokumen spesifikasi, dan pembuatan test case otomatis.
> >
> > Memilih antara kedua gaya tergantung pada tujuan tim: jika fokus pada komunikasi lintas fungsi, essential sudah cukup; jika tujuan adalah menghasilkan spesifikasi yang dapat langsung di‑implementasikan, fully‑dressed menjadi pilihan utama.
> >
> > ### Fungsi Strategis Use Case
> >
> > Use case tidak hanya sekadar dokumen deskriptif; ia memiliki peran strategis dalam proses desain interaksi. Pertama, **memformalkan interaksi** memungkinkan semua anggota tim memiliki bahasa yang sama, mengurangi miskomunikasi antara desainer, developer, dan tester. Kedua, use case **menyelaraskan tim** dengan menekankan tanggung jawab sistem pada tiap langkah, sehingga prioritas pengembangan dapat diatur secara logis.
> >
> > Ketiga, use case berfungsi sebagai **alat verifikasi requirement**: dengan memeriksa apakah setiap requirement tercermin dalam setidaknya satu use case, tim dapat memastikan tidak ada kebutuhan yang terlewat. Keempat, use case membantu **mengidentifikasi titik kegagalan** melalui alternative flows, yang pada gilirannya memudahkan perancangan mekanisme penanganan error dan meningkatkan keandalan produk.
> >
> > Akhirnya, karena use case bersifat **preskriptif**, ia dapat dijadikan dasar untuk pembuatan prototipe interaktif atau bahkan otomatisasi pengujian (misalnya, dengan tools seperti Cucumber atau Behave). Dengan demikian, use case menjadi fondasi yang menghubungkan konsepsi konseptual dengan implementasi teknis.
> >
> > ### Perbandingan Scenario dan Use Case
> >
> > Meskipun keduanya berfokus pada interaksi manusia‑sistem, **scenario** menekankan konteks sosial, fisik, dan emosional melalui narasi yang hidup, sedangkan **use case** menekankan urutan langkah dan respons sistem secara terstruktur. Scenario membantu tim memahami **mengapa** suatu interaksi terjadi (misalnya, pengguna memegang payung saat hujan), sementara use case menjawab **bagaimana** sistem harus merespons (misalnya, menampilkan estimasi waktu kedatangan dengan ukuran tombol yang cukup besar).
> >
> > Kedua artefak saling melengkapi: scenario memberikan makna dan motivasi, use case memberikan kerangka operasional. Tanpa scenario, use case dapat terasa kering dan terlepas dari realitas pengguna; tanpa use case, scenario dapat berakhir pada cerita tanpa petunjuk implementasi.
> >
> > Praktik terbaik adalah memulai dengan scenario untuk mengeksplorasi ruang masalah, kemudian mentransformasikannya menjadi use case yang terstruktur. Proses ini memastikan bahwa desain tidak hanya fungsional tetapi juga relevan dengan kebutuhan pengguna yang sebenarnya.
> >
> > ### Kapan Menggunakan Scenario vs. Use Case
> >
> > **Scenario** sebaiknya dipilih ketika tim masih berada pada fase eksplorasi masalah, ketika konteks sosial atau emosional belum jelas, atau ketika diperlukan diskusi lintas stakeholder untuk menyamakan pemahaman. Contohnya, saat merancang aplikasi kesehatan yang harus mempertimbangkan kondisi stres pengguna, scenario dapat mengungkap kebutuhan tersembunyi.
> >
> > **Use Case** lebih tepat ketika interaksi sudah dipahami dan perlu diformalkan untuk pengembangan, pengujian, atau dokumentasi teknis. Pada fase ini, tim dapat menuliskan alur‑alur utama dan alternatif secara detail, sehingga developer dapat langsung mengimplementasikan logika bisnis.
> >
> > Memilih artefak yang tepat pada waktu yang tepat meningkatkan efisiensi tim dan kualitas hasil akhir.
> >
> > ### Integrasi Scenario dan Use Case dalam Proses Desain
> >
> > Integrasi dapat dilakukan dengan cara menurunkan elemen‑elemen penting dari scenario (goal, task, context) menjadi komponen use case (actor, goal, preconditions). Misalnya, scenario “Rina keluar kantor saat hujan, memegang payung, ingin melihat estimasi kedatangan” menghasilkan use case dengan aktor “Rina (commuter)”, goal “melihat estimasi waktu kedatangan”, precondition “tangan satu memegang payung”, dan main success scenario yang mencakup tampilan estimasi yang jelas. Dengan cara ini, insight kontekstual tetap terjaga, sementara struktur operasional menjadi terdefinisi.
> >
> > Proses iteratif antara scenario dan use case memungkinkan tim untuk **memvalidasi kembali** setiap perubahan desain: jika ada penambahan fitur, scenario dapat di‑update untuk mencerminkan konteks baru, kemudian use case disesuaikan untuk menambahkan alur alternatif. Siklus ini memastikan konsistensi antara makna pengguna dan implementasi teknis.

> [!cornell] #### Summary
>
> **Use case** menyediakan kerangka struktural yang men-detailkan urutan interaksi antara aktor dan sistem, sementara **scenario** memberikan konteks hidup yang menjelaskan mengapa interaksi itu penting. Dengan menggabungkan keduanya, tim dapat mengubah pemahaman konseptual menjadi spesifikasi operasional yang dapat diuji dan diimplementasikan. Pilihan antara scenario dan use case bergantung pada fase proyek: eksplorasi masalah memerlukan scenario, sedangkan formalitas pengembangan memerlukan use case. Integrasi yang tepat menghasilkan desain interaksi yang **konsisten**, **relevan**, dan **berorientasi pada pengguna**.

> [!ad-libitum]- Additional Information
>
> #### Formal Modeling of Use Cases (UML)
>
> Pada tingkat lanjutan, use case biasanya dimodelkan menggunakan **Unified Modeling Language (UML)**. Diagram use case UML menampilkan aktor sebagai stick figure dan use case sebagai oval, dengan hubungan «include», «extend», dan generalisasi. Hubungan «include» menandakan bahwa satu use case selalu memanggil use case lain (misalnya, “Validate Input” termasuk dalam hampir semua alur). Hubungan «extend» menggambarkan alur opsional yang hanya terjadi pada kondisi tertentu (misalnya, “Show Error Message” yang memperluas alur utama ketika validasi gagal). Dengan notasi ini, arsitek perangkat lunak dapat melihat dependensi antar fungsi secara visual, memudahkan analisis dampak perubahan.
>
> Diagram ini juga dapat di‑export ke alat‑alat CASE (Computer‑Aided Software Engineering) seperti **Enterprise Architect**, **Visual Paradigm**, atau **StarUML**, yang secara otomatis menghasilkan dokumen spesifikasi dan bahkan kerangka kode stub. Penggunaan model formal meningkatkan konsistensi antar tim dan meminimalkan risiko interpretasi yang berbeda.
>
> #### Extending Use Cases dengan Include & Extend Relationships
>
> Pada use case yang kompleks, sering kali muncul kebutuhan untuk **menggabungkan** atau **menyisipkan** alur‑alur kecil yang dapat dipakai ulang. Misalnya, pada aplikasi e‑commerce, proses “Login” dapat di‑include ke dalam hampir semua use case yang memerlukan otentikasi. Sebaliknya, alur “Apply Discount Code” dapat menjadi «extend» dari proses checkout, karena hanya terjadi bila pengguna memasukkan kode khusus.
>
> Dengan mendefinisikan **extension points** (titik ekstensi) pada use case utama, tim dapat menambahkan perilaku baru tanpa mengubah alur dasar. Ini mendukung prinsip **Open/Closed** dalam rekayasa perangkat lunak: sistem terbuka untuk ekstensi, tertutup untuk modifikasi. Praktik ini sangat berguna ketika produk harus beradaptasi dengan regulasi baru atau integrasi layanan pihak ketiga.
>
> #### Penanganan Alternative Flows yang Kompleks
>
> Alternative flows tidak hanya sekadar error handling; mereka dapat mencakup **branching logika bisnis** yang signifikan. Contohnya, pada sistem reservasi hotel, alur utama mengalokasikan kamar, tetapi terdapat alternatif “Jika kamar tidak tersedia, tawarkan alternatif lokasi”. Setiap alternatif harus memiliki **precondition** yang jelas (misalnya, “kamar penuh”) dan **postcondition** yang mendefinisikan status sistem setelah alternatif selesai (misalnya, “tawaran alternatif terkirim”).
>
> Pada implementasi, developer dapat memetakan setiap alternative flow ke dalam **state machine** atau **workflow engine** (misalnya, Camunda, Activiti). Hal ini memungkinkan eksekusi dinamis berdasarkan kondisi runtime, meningkatkan fleksibilitas sistem tanpa menambah kompleksitas kode yang berulang.
>
> #### Perbandingan dengan Artefak Lain (User Stories, Job Stories)
>
> Meskipun use case lebih terstruktur, **user story**