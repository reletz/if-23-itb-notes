---
type: Note
cssclasses:
- cornell-notes
---

_Back to_ [[IF3170 Inteligensi Artifisial]]


> [!cornell] Topic
> 
> > ## Questions/Cues
> > 
> > - Apa saja komponen inti arsitektur KBS?
> >     
> > - Apa fungsi dari Knowledge Base?
> >     
> > - Apa isi dari Knowledge Base?
> >     
> > - Apa fungsi dari Inference Engine?
> >     
> > - Apa peran User Interface?
> >     
> > - Bagaimana alur interaksi dalam sistem?
> >     
> > - Apa perbedaan KBS Interaktif & Embedded?
> >     
> > - Bagaimana proses Akuisisi Pengetahuan?
> >     
> > - Apa saja jenis Akuisisi Pengetahuan?
> >     
> > - Berikan contoh penerapan arsitektur KBS!
> >     
> > 
> > ## Reference Points
> > 
> > - IF3170-Materi-05-Seg-01-KBS---WhatWhy.pdf
> >     
> 
> > ### Arsitektur Umum Knowledge-Based System
> > 
> > Arsitektur KBS, khususnya yang dicontohkan pada _Expert System_, dirancang untuk memisahkan basis pengetahuan dari mekanisme pemrosesan atau penalarannya. Ini adalah prinsip desain kunci yang membuatnya fleksibel dan modular. Arsitektur ini terdiri dari tiga komponen utama yang saling berinteraksi.
> > 
> > ![[Pasted image 20251022012006.png]]
> > 
> > #### 1. Knowledge Base (Basis Pengetahuan)
> > 
> > Ini adalah **repositori atau "perpustakaan"** dari sistem. Komponen ini berfungsi untuk menyimpan semua pengetahuan yang relevan dengan domain masalah tertentu. Pengetahuan ini diekstraksi dari seorang pakar manusia (_human expert_) atau sumber data lainnya.
> > 
> > - **Isi**: Berisi **fakta-fakta** (data yang pasti benar), **aturan-aturan** (_rules_ dalam format IF-THEN), konsep, relasi antar konsep, dan **heuristik** (aturan praktis berdasarkan pengalaman yang mungkin tidak selalu 100% akurat tapi efektif).
> >     
> > - **Analogi**: Jika sistem adalah seorang dokter, _Knowledge Base_ adalah gabungan dari semua buku teks kedokteran, jurnal penelitian, dan pengalaman klinis yang dimilikinya.
> >     
> > 
> > #### 2. Inference Engine (Mesin Inferensi)
> > 
> > Ini adalah **"otak" atau unit pemrosesan pusat** dari KBS. Komponen ini berfungsi untuk melakukan penalaran (_reasoning_) dengan cara menggunakan pengetahuan yang ada di _Knowledge Base_ untuk menyelesaikan masalah atau menarik kesimpulan baru.
> > 
> > - **Fungsi**: Ia mengambil fakta-fakta yang diberikan oleh pengguna (melalui User Interface) atau data dari sensor, mencocokkannya dengan pengetahuan di _Knowledge Base_, dan menarik kesimpulan atau solusi.
> >     
> > - **Mekanisme**: Menggunakan strategi penalaran seperti _Forward Chaining_ (dari data ke kesimpulan) atau _Backward Chaining_ (dari hipotesis ke data pendukung) untuk menavigasi aturan dan fakta.
> >     
> > 
> > #### 3. User Interface (Antarmuka Pengguna)
> > 
> > Ini adalah **jembatan komunikasi** antara pengguna dan sistem. Komponen ini memungkinkan pengguna non-ahli untuk berinteraksi dengan sistem secara efektif.
> > 
> > - **Input**: Pengguna memasukkan pertanyaan (_query_), fakta, atau detail masalah ke dalam sistem.
> >     
> > - **Output**: Sistem menyajikan hasil, kesimpulan, penjelasan (_explanation facility_), atau saran (_advice_) kepada pengguna dalam format yang mudah dimengerti.
> >     
> >  ### Arsitektur Berbasis Komponen (Lebih Detail)
> > 
> > ![[Pasted image 20251022015355.png]]
> > 
> > **Komponen Inti (Core System):**
> > 
> > - **Problem Solving Component**: Ini adalah nama lain untuk **Inference Engine**. Komponen inilah yang melakukan penalaran untuk menemukan solusi.
> >     
> > - **Knowledge Acquisition Component**: Modul yang didedikasikan untuk proses akuisisi pengetahuan. Pakar atau KE berinteraksi dengan komponen ini untuk menambah atau memodifikasi pengetahuan dalam sistem.
> >     
> > - **Explanation Component**: Salah satu fitur canggih KBS. Komponen ini berfungsi untuk **menjelaskan alur penalaran** kepada pengguna ("Bagaimana sistem sampai pada kesimpulan ini?"). Ini penting untuk membangun kepercayaan pengguna dan untuk proses debugging.
> >     
> > - **Interviewer Component**: Ini adalah bagian dari User Interface yang bertugas untuk **mengumpulkan informasi dan fakta** dari pengguna terkait masalah yang sedang dihadapi.
> >     
> > 
> > **Repositori Pengetahuan:**
> > 
> > - **Domain-Specific Knowledge Base (DSKB)**: Ini adalah **Knowledge Base** utama yang berisi pengetahuan jangka panjang (aturan, fakta domain). Ini adalah "memori permanen" sistem.
> >     
> > - **Case-Specific Facts (CSF)**: Ini adalah "memori kerja" atau "working memory" sistem. Isinya adalah **fakta-fakta yang relevan hanya untuk kasus atau masalah yang sedang berjalan**, yang biasanya didapat dari pengguna melalui _Interviewer Component_. Data di CSF akan dihapus atau direset untuk kasus baru.
> >     
> > 
> > 
> > ### Tipe Sistem KBS: Interaktif vs. Embedded
> > 
> > ![[Pasted image 20251022014603.png]]
> > 
> > Berdasarkan cara interaksinya, arsitektur KBS dapat diimplementasikan dalam dua mode utama:
> > 
> > - **KBS Interaktif (Interactive KBS):**
> >     
> > 	Sistem ini bekerja seperti seorang konsultan digital. Pengguna secara aktif berdialog dengan sistem, memberikan informasi, dan menerima saran. Contoh klasiknya adalah Expert System untuk diagnosis medis, di mana dokter memasukkan gejala pasien dan sistem memberikan kemungkinan diagnosis.
> >     
> > - **KBS Tertanam (Embedded KBS):**
> >     
> >     Sistem ini berfungsi sebagai komponen cerdas di dalam sistem yang lebih besar dan seringkali bekerja secara otonom di latar belakang. Tidak ada interaksi langsung layaknya sesi tanya jawab. Contohnya adalah sistem kontrol penerbangan yang secara otomatis menyesuaikan sayap pesawat berdasarkan data sensor, menggunakan basis pengetahuan tentang aerodinamika.
> >     
> > 
> > ### Akuisisi Pengetahuan (Knowledge Acquisition)
> >
> > Ini adalah proses **mengekstrak, menstrukturkan, dan mengorganisir pengetahuan dari pakar manusia untuk dimasukkan ke dalam Knowledge Base**. Proses ini merupakan 'bottleneck' kritis dalam pembangunan KBS. Berdasarkan alurnya, terdapat dua pendekatan utama: tidak langsung dan langsung.
> > 
> > ![[Pasted image 20251022015100.png]]
> >
> > #### Akuisisi Pengetahuan Tidak Langsung (Indirect)
> >
> > Ini adalah metode yang paling umum, yang melibatkan seorang perantara profesional.
> >
> > - **Peran Kunci**: Terdapat **Knowledge Engineer (KE)**, yaitu seorang analis sistem yang bertindak sebagai jembatan antara pakar dan sistem.
> >     
> > - **Proses**:
> >     
> >     1. **Elisitas (Elicitation)**: KE melakukan sesi penggalian pengetahuan dengan pakar melalui wawancara, observasi, dan diskusi. Ini adalah proses komunikasi dua arah untuk memahami cara pakar berpikir.
> >         
> >     2. **Representasi (Representation)**: KE menerjemahkan pengetahuan yang telah digali ke dalam bahasa formal yang dapat dimengerti komputer (misalnya, aturan IF-THEN, frames) untuk dimasukkan ke `Knowledge Base`.
> >         
> > - **Analogi**: Seorang koki senior (pakar) menjelaskan resep rahasianya kepada penulis kuliner (KE). Penulis inilah yang menstrukturkan dan menuliskannya ke dalam buku resep digital (`Knowledge Base`) agar bisa dibaca oleh robot pemasak.
> >     
> >
> > #### Akuisisi Pengetahuan Langsung (Direct)
> >
> > Dalam metode ini, pakar berinteraksi langsung dengan sistem tanpa perantara.
> >
> > - **Alur Kerja**: Pakar langsung memasukkan atau memodifikasi pengetahuan (misalnya, aturan baru) ke dalam `Knowledge Base`, seringkali melalui antarmuka khusus yang terhubung dengan `Inference Engine`.
> >     
> > - **Syarat**: Pendekatan ini memerlukan pakar yang memiliki pemahaman teknis yang cukup atau sistem KBS yang memiliki antarmuka akuisisi yang sangat canggih dan intuitif.
> >     
> > - **Analogi**: Koki senior (pakar) langsung mengetikkan resepnya ke dalam aplikasi buku resep digital (`Knowledge Base`) karena ia sudah tahu format yang benar dan cara menggunakan aplikasinya.
> >     
> >
> >     
> > 
> > ### Contoh Penerapan: Sistem Diagnosis Medis Sederhana
> > 
> > Mari kita lihat bagaimana arsitektur ini bekerja dalam skenario praktis.
> > 
> > 1. **Skenario**: Seorang dokter ingin mendiagnosis penyakit pernapasan pada pasien.
> >     
> > 2. **User Interface**: Dokter membuka aplikasi dan melihat form untuk memasukkan gejala. Dokter memasukkan: `Demam = Ya`, `Batuk = Kering`, `Sesak Napas = Ringan`.
> >     
> > 3. **Inference Engine**: Menerima input ini sebagai fakta awal.
> >     
> > 4. **Knowledge Base**: _Inference Engine_ mengakses _Knowledge Base_ yang berisi aturan seperti:
> >     
> >     - **Aturan 1**: `IF (Demam = Ya) AND (Batuk = Kering) THEN Kemungkinan_Penyakit = Pneumonia`.
> >         
> >     - **Aturan 2**: `IF (Kemungkinan_Penyakit = Pneumonia) AND (Sesak Napas = Ringan) THEN Rekomendasi = "Lakukan tes X-Ray dada"`.
> >         
> >     - **Aturan 3**: `IF (Demam = Ya) AND (Sakit Tenggorokan = Ya) THEN Kemungkinan_Penyakit = Radang Tenggorokan`.
> >         
> > 5. **Proses Penalaran**: _Inference Engine_ mencocokkan fakta dari dokter dengan Aturan 1, sehingga menghasilkan fakta baru: `Kemungkinan_Penyakit = Pneumonia`. Kemudian, fakta baru ini bersama dengan input `Sesak Napas = Ringan` cocok dengan Aturan 2, menghasilkan kesimpulan akhir: `Rekomendasi = "Lakukan tes X-Ray dada"`.
> >     
> > 6. **Output**: **User Interface** menampilkan hasil kepada dokter: "Berdasarkan gejala, terdapat kemungkinan Pneumonia. Direkomendasikan untuk melakukan tes X-Ray dada untuk konfirmasi."
> >     

> [!cornell] #### Summary
> 
> **Arsitektur fundamental sebuah Knowledge-Based System (KBS) secara sengaja memisahkan repositori pengetahuan (Knowledge Base) dari mesin penalarannya (Inference Engine), yang memungkinkan fleksibilitas dan skalabilitas.** Arsitektur ini dapat diimplementasikan dalam dua mode utama: **interaktif**, di mana sistem bertindak sebagai konsultan digital bagi pengguna, dan **embedded**, di mana ia berfungsi sebagai komponen cerdas otonom dalam sistem yang lebih besar. Pengisian _Knowledge Base_, yang merupakan jantung dari sistem, dilakukan melalui proses sistematis yang disebut **akuisisi pengetahuan**, yaitu proses mengekstrak dan memformalkan keahlian pakar ke dalam format yang dapat digunakan oleh _Inference Engine_ untuk memecahkan masalah kompleks.

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis: Strategi Inference Engine
> 
> Inference Engine tidak hanya sekadar mencocokkan data, tetapi menggunakan strategi yang terstruktur:
> 
> - **Forward Chaining (Penalaran Berbasis Data)**:
>     
>     - **Cara Kerja**: Dimulai dari fakta yang diketahui, kemudian menerapkan aturan secara berulang untuk menghasilkan fakta baru hingga tujuan tercapai atau tidak ada aturan lagi yang bisa diterapkan.
>         
>     - **Analogi**: Seperti seorang detektif yang mengumpulkan petunjuk satu per satu (fakta), lalu menggabungkannya untuk membangun sebuah kasus hingga menemukan pelakunya (kesimpulan).
>         
>     - **Cocok Untuk**: Masalah monitoring, kontrol, dan perencanaan.
>         
> - **Backward Chaining (Penalaran Berbasis Tujuan)**:
>     
>     - **Cara Kerja**: Dimulai dari sebuah hipotesis atau tujuan (misalnya, "Apakah pasien menderita Pneumonia?"), lalu mencari aturan yang dapat membuktikan hipotesis tersebut. Jika premis aturan belum diketahui, sistem akan menjadikannya sebagai sub-tujuan baru dan mencarinya lebih lanjut, atau bertanya kepada pengguna.
>         
>     - **Analogi**: Seperti seorang dokter yang sudah memiliki dugaan penyakit (hipotesis), lalu mencari gejala-gejala spesifik (premis) untuk mengonfirmasi atau menolak dugaannya.
>         
>     - **Cocok Untuk**: Masalah diagnostik dan konsultasi.
>         
> 
> #### Pendalaman Teknis: Metode Representasi Pengetahuan
> 
> Isi dari Knowledge Base tidak hanya "disimpan", tetapi direpresentasikan dalam format tertentu:
> 
> - **Production Rules (IF-THEN)**: Format paling umum, intuitif bagi pakar dan mudah diproses oleh Inference Engine. Contoh: `IF suhu > 100°C THEN status = overheat`.
>     
> - **Semantic Networks**: Merepresentasikan pengetahuan sebagai graf, di mana simpul (node) adalah objek/konsep dan busur (edge) adalah relasi antar objek. Sangat baik untuk menunjukkan hubungan.
>     
> - **Frames**: Struktur data yang merepresentasikan objek atau konsep stereotip (misalnya, frame untuk "Mobil"). Frame memiliki "slot" untuk atribut (seperti `Warna`, `Jumlah_Roda`) yang dapat diisi dengan nilai spesifik atau bahkan frame lain.
>     
> 
> #### Eksplorasi Mandiri
> 
> - Coba rancang beberapa aturan IF-THEN sederhana untuk domain yang Anda kenal, misalnya "Memilih Jurusan Kuliah" atau "Menentukan Aktivitas Akhir Pekan".
>     
> - Cari dan coba _expert system shell_ sederhana seperti **CLIPS** (dikembangkan oleh NASA) untuk merasakan bagaimana aturan diimplementasikan dan diproses.
>     
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Buku**: "Artificial Intelligence: A Modern Approach" oleh Stuart Russell dan Peter Norvig – Dianggap sebagai buku teks standar dalam dunia AI.
>     
> - **Buku**: "Expert Systems: Principles and Programming" oleh Giarratano dan Riley – Fokus mendalam pada pengembangan Expert System.
>

> [!cornell] #### Summary
> 
> **Arsitektur fundamental sebuah Knowledge-Based System (KBS) secara modular memisahkan pengetahuan dari pemrosesan. Ia terdiri dari tiga komponen inti: Knowledge Base yang menyimpan pengetahuan domain dari seorang pakar, Inference Engine yang berfungsi sebagai "otak" untuk melakukan penalaran logis, dan User Interface yang menjadi jembatan interaksi antara pengguna dan sistem. Ketiga komponen ini bekerja sama untuk menerima masalah, menganalisisnya berdasarkan pengetahuan yang tersimpan, dan memberikan solusi atau saran.**

> [!ad-libitum]- Additional Information
> 
> #### Topik Teknis 1: Peran "Knowledge Engineer"
> 
> Proses mengekstraksi pengetahuan dari seorang pakar manusia dan merepresentasikannya di dalam _Knowledge Base_ tidaklah trivial. Proses ini dilakukan oleh seorang spesialis yang disebut **Knowledge Engineer**. Tugas mereka meliputi:
> 
> - **Wawancara Pakar**: Melakukan sesi wawancara mendalam dengan pakar domain untuk memahami cara mereka berpikir, aturan yang mereka gunakan, dan heuristik yang mereka terapkan.
>     
> - **Formalisasi Pengetahuan**: Menerjemahkan pengetahuan yang seringkali bersifat implisit atau tidak terstruktur dari pakar menjadi representasi formal yang dapat dimengerti oleh komputer (misalnya, menjadi _production rules_ atau _semantic networks_).
>     
> - **Validasi & Iterasi**: Bekerja sama dengan pakar untuk menguji dan memvalidasi _Knowledge Base_, lalu memperbaikinya secara berulang hingga performa sistem memuaskan.
>     
> 
> #### Topik Teknis 2: "Knowledge Acquisition Bottleneck"
> 
> Salah satu tantangan terbesar dalam membangun KBS secara historis adalah **Knowledge Acquisition Bottleneck** (hambatan akuisisi pengetahuan). Ini merujuk pada kesulitan dalam mentransfer pengetahuan dari kepala seorang ahli ke dalam _Knowledge Base_. Penyebabnya antara lain:
> 
> - **Pengetahuan Implisit**: Pakar seringkali tidak menyadari semua aturan atau pengetahuan yang mereka gunakan; banyak yang sudah menjadi "intuisi".
>     
> - **Komunikasi**: Pakar mungkin kesulitan menjelaskan proses berpikir mereka dalam kata-kata yang dapat diformalkan.
>     
> - Waktu & Biaya: Proses knowledge engineering sangat memakan waktu dan mahal karena melibatkan waktu dari pakar yang sangat berharga.
>     
>     Untuk mengatasi ini, beberapa sistem modern menyertakan Knowledge Acquisition Component, sebuah alat yang membantu pakar untuk memasukkan pengetahuan mereka langsung ke sistem dengan lebih mudah.
>     
> 
> #### Eksplorasi Mandiri
> 
> - **Riset Sistem Pakar Klasik**: Cari tahu tentang sistem pakar terkenal seperti **MYCIN** (diagnosis medis), **DENDRAL** (analisis kimia), dan **XCON** (konfigurasi komputer). Pelajari domain masalah mereka dan bagaimana arsitektur KBS diterapkan.
>     
> - **Komponen Penjelasan (**_**Explanation Component**_**)**: Banyak _expert system_ memiliki komponen tambahan yang tidak ditampilkan di diagram dasar, yaitu _Explanation Component_. Komponen ini memungkinkan sistem untuk menjelaskan _mengapa_ ia sampai pada suatu kesimpulan ("_Why?_") dan _bagaimana_ caranya ("_How?_"), biasanya dengan menunjukkan rantai aturan yang dieksekusi. Ini sangat penting untuk membangun kepercayaan pengguna.

