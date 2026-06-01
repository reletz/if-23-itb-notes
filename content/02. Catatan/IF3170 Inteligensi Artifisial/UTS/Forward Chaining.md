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
> > - Apa itu Forward Chaining?
> >     
> > - Apa nama lain dari proses ini?
> >     
> > - Bagaimana siklus Recognize-Act bekerja?
> >     
> > - Apa itu Conflict Set?
> >     
> > - Mengapa perlu Conflict Resolution?
> >     
> > - Apa saja strategi Global Control?
> >     
> > - Jelaskan Refractoriness.
> >     
> > - Jelaskan Selection by Order.
> >     
> > - Jelaskan Specificity.
> >     
> > - Apa saja strategi Local Control?
> >     
> > - Jelaskan Selection by Priority.
> >     
> > - Jelaskan Meta-rules.
> >     
> > 
> > ## Reference Points
> > 
> > - Materi-06-Seg-0102-RBS.pdf (Slides 16-26)
> >     
> 
> > ### Definisi Forward Chaining
> > 
> > **Forward Chaining** adalah metode inferensi (penalaran) dalam RBS yang bekerja secara **data-driven**. Artinya, proses dimulai dari sekumpulan fakta yang sudah ada di _Working Memory_ untuk kemudian mencari dan mengeksekusi aturan-aturan yang relevan hingga mencapai sebuah kesimpulan atau tujuan. Proses ini sering juga disebut **Siklus Kenali-Bertindak (Recognize-Act Cycle)**.
> > 
> > ### Siklus Recognize-Act
> > 
> > Proses ini berjalan dalam sebuah loop yang terdiri dari tiga fase utama:
> > 
> > 1. **Match (Pattern Matching)**: _Inference engine_ membandingkan kondisi (LHS) dari semua aturan di _Production Memory_ dengan fakta-fakta yang ada di _Working Memory_.
> >     
> > 2. **Conflict Resolution**: Semua aturan yang LHS-nya terpenuhi oleh fakta akan dimasukkan ke dalam sebuah himpunan yang disebut **Conflict Set** (atau Agenda). Dari himpunan ini, satu aturan dipilih untuk dieksekusi berdasarkan **strategi resolusi konflik**.
> >     
> > 3. **Act (Fire the rule)**: Aksi (RHS) dari aturan yang terpilih dieksekusi. Aksi ini biasanya mengubah isi _Working Memory_ (menambah atau menghapus fakta), yang akan memicu siklus berikutnya.
> >     
> > 
> > Siklus ini akan berhenti jika _Conflict Set_ kosong (tidak ada lagi aturan yang bisa dieksekusi) atau jika kondisi terminasi tertentu terpenuhi.
> > 
> > ![[Pasted image 20251001073737.png]]
> > 
> > ### Strategi Resolusi Konflik (Conflict-Resolution Strategy)
> > 
> > Strategi ini sangat penting untuk menentukan perilaku sistem. Strategi ini dibagi menjadi dua kategori:
> > 
> > #### 1. Global Control (Strategi Umum)
> > 
> > Strategi ini berlaku secara umum untuk semua aturan.
> > 
> > 1. **Refractoriness**: Strategi paling dasar. 
> > > Sebuah aturan tidak akan dieksekusi lebih dari satu kali dengan set fakta yang persis sama. Ini mencegah sistem masuk ke dalam _infinite loop_ yang trivial.
> >     
> > 2. **Selection by Order**:
> > > Memilih aturan berdasarkan urutan.
> >     
> > 3. **Rule Order (FIFO)**:
> > > Aturan yang pertama kali masuk ke _Conflict Set_ yang akan dieksekusi. Urutan aturan di _Knowledge Base_ menjadi penting.
> >     
> > 4. **Fact Recency (LIFO)**:
> > > Aturan yang dipicu oleh fakta yang paling baru ditambahkan ke _Working Memory_ yang akan dieksekusi. Ini membuat sistem lebih responsif terhadap perubahan terbaru.
> >     
> > 5. **Specificity**: 
> > > Memilih aturan yang paling spesifik. Aturan yang memiliki lebih banyak kondisi di bagian LHS-nya dianggap lebih spesifik dan akan diprioritaskan. Tujuannya adalah mendahulukan kasus-kasus khusus sebelum menangani kasus umum.
> >     
> > 
> > #### 2. Local Control (Strategi Khusus)
> > 
> > Strategi ini memberikan kontrol lebih kepada perancang sistem.
> > 
> > - **Selection by Priority**: Setiap aturan diberi bobot prioritas (misalnya, `salience` di CLIPS). Aturan dengan prioritas tertinggi dalam _Conflict Set_ yang akan dieksekusi. Ini memungkinkan perancang untuk secara eksplisit menentukan aturan mana yang lebih penting.
> >     
> > - **Selection by Meta-rules**: Menggunakan "aturan tentang aturan". Ini adalah aturan tingkat lanjut yang tugasnya adalah mengontrol atau mem-pruning (memangkas) aturan lain dalam _Conflict Set_. Contoh: "JIKA ada dua aturan yang bertentangan, dahulukan aturan yang berasal dari sumber yang lebih terpercaya."
> >     

> [!cornell] #### Summary
> 
> **Forward Chaining adalah proses inferensi data-driven yang beroperasi dalam siklus Recognize-Act: sistem mencocokkan fakta dengan aturan, mengumpulkan semua aturan yang valid ke dalam Conflict Set, lalu menggunakan strategi Resolusi Konflik (seperti Refractoriness, Order, Specificity, atau Priority) untuk memilih satu aturan untuk dieksekusi. Eksekusi aturan ini akan memperbarui fakta, dan siklus terus berlanjut hingga tidak ada lagi aturan yang dapat dijalankan.**

> [!ad-libitum]- Additional Information
> 
> #### Topik Teknis 1: Algoritma Rete - Optimalisasi Pattern Matching
> 
> Fase _Pattern Matching_ adalah bagian yang paling memakan waktu dalam siklus Recognize-Act, terutama jika ada ribuan aturan dan fakta. Untuk mengatasinya, sistem RBS modern seperti CLIPS tidak memindai ulang semua aturan setiap siklus. Mereka menggunakan **Algoritma Rete**.
> 
> Algoritma Rete mengkompilasi semua kondisi (LHS) dari aturan menjadi sebuah jaringan _node_ (graf). Ketika sebuah fakta ditambahkan atau dihapus dari _Working Memory_, ia akan "mengalir" melalui jaringan ini. Aliran ini secara efisien memperbarui _Conflict Set_ tanpa perlu mengevaluasi ulang semua aturan dari awal. Ini membuat _inference engine_ menjadi sangat cepat dan efisien.
> 
> #### Topik Teknis 2: Kapan Sebaiknya Menggunakan Forward Chaining?
> 
> Forward Chaining unggul dalam skenario di mana Anda memulai dengan sekumpulan data dan ingin melihat ke mana data tersebut akan membawa Anda. Beberapa kasus penggunaan idealnya adalah:
> 
> - **Sistem Monitoring & Kontrol Real-time**: Misalnya, sistem pemantauan pasien di ICU. Data baru dari sensor (detak jantung, tekanan darah) adalah fakta baru. Aturan akan terpicu jika ada data yang abnormal (misal: "IF detak_jantung < 50 THEN bunyikan_alarm"), menghasilkan respons langsung.
>     
> - **Tugas Konfigurasi & Desain**: Membangun sebuah konfigurasi PC. Anda mulai dengan fakta (misal: `budget = 15jt`, `tujuan = gaming`). Aturan akan menambahkan komponen satu per satu (`IF tujuan = gaming THEN jenis_GPU = high-end`) hingga konfigurasi lengkap terbentuk.
>     
> - **Simulasi & Prediksi**: Memprediksi hasil dari suatu situasi. Anda memasukkan kondisi awal sebagai fakta, dan membiarkan sistem menjalankan aturan untuk mensimulasikan apa yang akan terjadi.
>     
> 
> #### Eksplorasi Mandiri
> 
> - **Coba Latihan di Slide**: Ambil contoh kasus "pergi ke teater" dari slide 25. Coba selesaikan secara manual langkah demi langkah di atas kertas. Terapkan strategi `refractoriness` dan `specificity` untuk melihat aturan mana yang akan dieksekusi di setiap siklus dan apa hasil akhirnya.
>     
> - **Eksperimen dengan CLIPS**: Jika Anda tertarik, coba instal CLIPS (tersedia gratis). Jalankan contoh `horse.clp` yang dibahas di materi. Setelah itu, coba ubah fakta-fakta yang ada (misalnya, buat 'Prancer' tidak cepat) atau tambahkan aturan baru (misalnya, "IF kuda berharga DAN berasal dari arab THEN kuda_istimewa") dan lihat bagaimana outputnya berubah.
>     
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Buku Teks**: _Introduction to Expert Systems_ oleh Peter Jackson (disebutkan di referensi slide) adalah bacaan klasik yang sangat baik untuk memahami fundamentalnya.
>     
> - **Dokumentasi CLIPS**: Situs web resmi CLIPS menyediakan dokumentasi yang sangat lengkap, termasuk _User Guide_ dan _Basic Programming Guide_. Ini adalah sumber terbaik untuk belajar implementasi praktis.
>