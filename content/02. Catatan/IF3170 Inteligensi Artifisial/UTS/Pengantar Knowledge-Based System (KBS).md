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
> > - Apa itu KBS?
> >     
> > - Beda KBS & Expert System?
> >     
> > - Mengapa menggunakan KBS?
> >     
> > - Beda KBS & Program Konvensional?
> >     
> > - Apa itu 'ill-structured problem'?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides 1-8
> >     
> 
> > ### Definisi Knowledge-Based System (KBS)
> > 
> > Secara mendasar, **Knowledge-Based System (KBS)** adalah sebuah sistem yang menerapkan pengetahuan (_knowledge_) untuk menyelesaikan suatu masalah. Ini adalah istilah payung yang mencakup beberapa jenis sistem cerdas:
> > 
> > - **Knowledge-based expert system**: Sistem yang secara spesifik menerapkan pengetahuan untuk memecahkan masalah.
> >     
> > - **Expert System (ES)**: Jenis KBS yang lebih spesifik, dirancang untuk merekonstruksi keahlian (_expertise_) dan kemampuan penalaran (_reasoning_) dari seorang spesialis manusia dalam domain yang terbatas. Tujuannya adalah memberikan "saran" atau "nasihat" kepada pengguna non-ahli.
> >     
> > - **Knowledge-based agent**: Sebuah agen cerdas yang menggunakan penalaran logis (_logical reasoning_) untuk bertindak di lingkungannya.
> >     
> > 
> > ### Perbedaan KBS dan Expert System (ES)
> > 
> > Meskipun sering dianggap sama, **KBS tidak sama dengan Expert System**. Expert System adalah _salah satu jenis_ dari KBS. Perbedaannya terletak pada arsitektur dan tujuannya. Sebuah Expert System memiliki komponen khas seperti:
> > 
> > 1. **Knowledge Base**: Tempat menyimpan pengetahuan dari seorang pakar.
> >     
> > 2. **Inference Engine**: "Otak" yang melakukan penalaran berdasarkan pengetahuan yang ada.
> >     
> > 3. User Interface: Jembatan antara pengguna non-ahli dan sistem, di mana pengguna bisa bertanya (query) dan sistem memberikan nasihat (advice).
> >     
> >     KBS adalah konsep yang lebih luas dan tidak selalu memiliki arsitektur yang berfokus pada interaksi pengguna non-ahli seperti ini.
> >     
> > 
> > ### Alasan Penggunaan KBS (Why KBS)
> > 
> > KBS merupakan salah satu pendekatan utama dalam mengembangkan agen AI, khususnya yang berfokus pada **penalaran logis (logical reasoning)** atau "berpikir secara rasional". Pendekatan ini berbeda dari metode AI lainnya seperti:
> > 
> > - Pengenalan pola berbasis template, statistik, atau sintaktik.
> >     
> > - Deep learning.
> >     
> >     Dengan kata lain, KBS digunakan ketika kita ingin membangun sistem yang dapat "berpikir" dan menarik kesimpulan secara logis dari informasi yang dimilikinya.
> >     
> > 
> > ### Perbandingan KBS dengan Program Konvensional
> > 
> > Perbedaan paling mendasar antara KBS dan program konvensional terletak pada jenis masalah yang ditangani dan cara kerjanya.
> > 
> > |**Fitur**|**Knowledge-Based System (KBS)**|**Program Konvensional**|
> > |---|---|---|
> > |**Jenis Masalah**|_Ill-structured problem_ (masalah tidak terstruktur).|_Well-structured problem_ (masalah terstruktur).|
> > |**Penentu Aksi**|Pakar menentukan aksi, namun urutan eksekusi ditentukan oleh _interpreter_ (inference engine) saat runtime.|Programmer menentukan aksi dan urutan eksekusinya secara eksplisit.|
> > |**Komponen**|Metode pemecahan masalah + Pengetahuan domain + Data.|Algoritma + Data.|
> > 
> > Pada KBS, ada pemisahan antara "pengetahuan" (apa yang diketahui sistem) dan "mesin inferensi" (bagaimana sistem berpikir), membuatnya lebih fleksibel.
> > 
> > ### Karakteristik Masalah (Well-formed vs Ill-structured)
> > 
> > - **Well-formed Problem (Masalah Terstruktur Baik)**:
> >     
> > - Solusinya pasti dan eksak.
> >     
> > - Tujuannya jelas (_explicit goal_).
> >     
> > - Operator atau langkah-langkah untuk mencapai tujuan sudah jelas (_explicit operator_).
> >     
> > - Contoh: Mengurutkan daftar angka, mencari rute terpendek di peta yang jelas.
> >     
> > - **Ill-structured Problem (Masalah Tidak Terstruktur)**:
> >     
> > - Solusinya tidak pasti atau bisa ada banyak kemungkinan (_uncertain solution_).
> >     
> > - Tujuannya tidak terdefinisi dengan jelas (_undefined goal_).
> >     
> > - Operator atau cara untuk mencapai solusi tidak diketahui di awal (_unknown operator_).
> >     
> > - Contoh: Mendiagnosis penyakit berdasarkan gejala, memprediksi pergerakan pasar saham, atau merancang sebuah bangunan.
> >     

> [!cornell] #### Summary
> 
> **Knowledge-Based System (KBS) adalah pendekatan dalam AI yang berfokus pada penggunaan basis pengetahuan (knowledge base) dan penalaran logis untuk menyelesaikan masalah yang kompleks dan tidak terstruktur (ill-structured problems). Berbeda dari program konvensional yang mengandalkan algoritma tetap, KBS memisahkan pengetahuan dari mekanisme penalarannya, sehingga lebih fleksibel. Expert System adalah salah satu implementasi spesifik dari KBS yang dirancang untuk meniru kemampuan seorang pakar dalam domain terbatas dan memberikan saran kepada pengguna.**