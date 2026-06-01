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
> > - Bagaimana arsitektur KBA generik?
> >     
> > - Bagaimana proses pengembangan KBA?
> >     
> > - Apa itu Representasi Pengetahuan (KR)?
> >     
> > - Beda Sintaks & Semantik?
> >     
> > - Apa syarat-syarat KR yang baik?
> >     
> > - Bagaimana memilih KR yang tepat?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides 16-21
> >     
> 
> > ### Arsitektur Knowledge-Based Agent Generik
> > 
> > Sebuah agen berbasis pengetahuan generik beroperasi dalam sebuah siklus. Fungsi `KB-AGENT` menerima persepsi (`percept`) dari lingkungan dan mengembalikan sebuah aksi (`action`).
> > 
> > Prosesnya adalah sebagai berikut:
> > 
> > 1. **TELL**: Agen "memberi tahu" _Knowledge Base_ (KB) tentang apa yang ia persepsikan saat ini. Informasi ini diubah menjadi sebuah kalimat formal. Ini adalah proses _assertion_ atau menambahkan fakta baru.
> >     
> > 2. **ASK**: Agen "bertanya" kepada KB tindakan apa yang harus dilakukan. Ini adalah proses _reasoning_ atau inferensi, di mana KB menggunakan pengetahuan yang ada untuk menurunkan aksi terbaik.
> >     
> > 3. **TELL**: Agen "memberi tahu" KB tentang aksi yang telah dipilihnya. Ini penting untuk melacak status dan sejarah tindakan.
> >     
> > 4. **Return Action**: Agen mengembalikan aksi yang telah dipilih untuk dieksekusi di lingkungan.
> >     
> > 
> > Siklus `TELL` (persepsi) -> `ASK` (penalaran) -> `TELL` (aksi) ini terus berulang.
> > 
> > ### Proses Pengembangan Knowledge-Based Agent
> > 
> > Pengembangan KBA bersifat inkremental (bertahap) dan fleksibel, terutama karena perancang tidak selalu tahu solusi akhir atau semua kemungkinan situasi.
> > 
> > - **Mulai dari KB Kosong**: Proses dimulai dengan basis pengetahuan yang kosong.
> >     
> > - **Input Pengetahuan**: Perancang dapat "memberi tahu" (TELL) kalimat-kalimat atau aturan-aturan ke dalam KB satu per satu.
> >     
> > - **Tujuan**: Tujuannya adalah agar agen pada akhirnya mengetahui cara beroperasi di lingkungannya.
> >     
> > 
> > Pendekatan ini sangat berguna ketika:
> > 
> > - Perancang tidak tahu solusi pasti dari masalah.
> >     
> > - Perancang tidak dapat mengantisipasi semua kemungkinan situasi.
> >     
> > - Lingkungan dapat berubah seiring waktu.
> >     
> > 
> > ### Definisi Representasi Pengetahuan (Knowledge Representation - KR)
> > 
> > **Knowledge Representation** adalah sebuah **bahasa formal** untuk merepresentasikan pengetahuan atau informasi. Bahasa ini memiliki dua komponen utama:
> > 
> > 1. **Sintaks (Syntax)**: Aturan yang mendeskripsikan ekspresi apa yang legal atau valid untuk ditulis dalam bahasa tersebut. Ini adalah tentang **struktur** kalimat. Contoh: Dalam logika proposisional, `P ∧ Q` adalah sintaks yang valid, sedangkan `P ∧ ∧ Q` tidak.
> >     
> > 2. **Semantik (Semantic)**: Cerita atau interpretasi yang menjelaskan **makna** dari ekspresi-ekspresi tersebut. Ini adalah tentang arti dari sebuah kalimat. Contoh: Semantik dari `P ∧ Q` adalah "proposisi P benar DAN proposisi Q benar."
> >     
> > 
> > ### Syarat-syarat Representasi Pengetahuan
> > 
> > Agar efektif, sebuah KR harus memenuhi beberapa syarat:
> > 
> > - **Tidak ada kontradiksi**: Representasi tidak boleh mengandung informasi yang saling bertentangan.
> >     
> > - **Setiap simbol harus unik**: Setiap simbol harus memiliki makna yang jelas dan tunggal.
> >     
> > - **Mampu menjelaskan objek, relasi, dan atribut**: Harus bisa mendeskripsikan dunia dengan cukup detail.
> >     
> > - **Manipulasi yang efisien**: Harus bisa diproses oleh komputer secara efisien.
> >     
> > 
> > ### Contoh Metode Representasi Pengetahuan
> > 
> > Berikut adalah beberapa metode populer yang digunakan untuk merepresentasikan pengetahuan dalam KBS:
> > 
> > 1. **Logika Proposisional & Predikat**: Fondasi dari penalaran logis. Logika proposisional menggunakan variabel yang bernilai benar/salah, sedangkan logika predikat lebih ekspresif karena dapat mendeskripsikan properti objek dan relasi antar objek.
> >     
> > 2. **Aturan Produksi (Production Rules)**: Bentuk paling umum dalam _expert systems_. Pengetahuan direpresentasikan dalam format `IF [kondisi] THEN [aksi/konsekuensi]`. Sangat intuitif dan modular.
> >     
> > 3. **Jaringan Semantik (Semantic Networks)**: Merepresentasikan pengetahuan sebagai sebuah graf, di mana **simpul (node)** mewakili objek atau konsep, dan **tepi (edge)** mewakili relasi antar konsep tersebut (misalnya, "adalah_sebuah", "memiliki_bagian").
> >     
> > 4. **Frame**: Struktur data yang merepresentasikan konsep atau objek stereotipikal. Sebuah frame memiliki **slot** untuk berbagai atribut dan dapat diisi dengan nilai spesifik. Mendukung pewarisan (inheritance) dari frame lain.
> >     
> > 5. **Pohon Keputusan (Decision Trees)**: Model berbentuk pohon yang digunakan untuk masalah klasifikasi dan pengambilan keputusan. Setiap simpul internal merepresentasikan sebuah tes pada atribut, dan setiap cabang adalah hasil tes, yang mengarah ke keputusan akhir di daun.
> > 6. **Bayesian Network**: Model graf probabilistik yang merepresentasikan variabel dan kebergantungan kondisionalnya. Sangat baik untuk **penalaran dalam ketidakpastian** (reasoning under uncertainty). Contoh: memprediksi kemungkinan suatu penyakit berdasarkan gejala-gejala yang ada.
> > 7. **Case-Based Reasoning (CBR)**: Bukan hanya representasi, tapi juga metode penalaran. Solusi untuk masalah baru ditemukan dengan mencari dan mengadaptasi solusi dari **kasus-kasus lampau** yang mirip. Prosesnya mengikuti siklus: _Retrieve_ (ambil kasus serupa), _Reuse_ (gunakan solusinya), _Revise_ (sesuaikan solusinya), dan _Retain_ (simpan sebagai kasus baru).
> > 
> > ### Pemilihan Metode Representasi Pengetahuan
> > 
> > Memilih metode KR yang tepat sangat bergantung pada konteks masalah dan pengguna. Kriteria pemilihannya adalah:
> > 
> > - **Kesesuaian dengan domain masalah**:
> >     
> > 	- _Decision Tree_ cocok untuk masalah klasifikasi.
> > 	    
> > 	- _Rule_ (aturan) bersifat umum dan bisa digunakan di banyak domain.
> > 	    
> > - **Kesesuaian dengan tugas (inferensi)**:
> >     
> > 	- _Decision Tree_ cocok untuk proses wawancara atau diagnosis bertahap.
> > 	    
> > 	- Model probabilitas cocok untuk pengambilan keputusan dalam ketidakpastian.
> >     
> > - **Kesesuaian dengan pengguna (manusia atau mesin)**:
> >     
> > 	- _Semantic network_ lebih mudah dipahami oleh manusia secara visual.
> > 	    
> > 	- _Rule_ lebih mudah diproses oleh mesin.
> >     

> [!cornell] #### Summary
> 
> **Pengembangan Knowledge-Based Agent (KBA) mengikuti siklus TELL-ASK di mana agen secara terus-menerus memperbarui basis pengetahuannya (KB) dengan persepsi baru dan menggunakan penalaran untuk menentukan tindakan. Inti dari KBA adalah Representasi Pengetahuan (KR), sebuah bahasa formal dengan sintaks (struktur) dan semantik (makna) yang jelas, yang harus dipilih secara cermat agar sesuai dengan domain masalah, tugas inferensi, dan pengguna akhir untuk memastikan efisiensi dan akurasi sistem.**
