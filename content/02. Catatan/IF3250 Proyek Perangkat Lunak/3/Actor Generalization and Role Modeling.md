---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3250 Proyek Perangkat Lunak]]

> [!cornell] Actor Generalization and Role Modeling
>
> > ## Questions/Cues
> >
> > - Mengapa generalisasi aktor diperlukan dalam pemodelan?
> > - Bagaimana membedakan peran aktor yang tumpang tindih?
> > - Kriteria apa yang menentukan perlu generalisasi aktor?
> > - Teknik penamaan aktor yang efektif untuk generalisasi
> > - Implikasi generalisasi pada desain sistem
> >
> > ## Reference Points
> >
> > - SCENARIO BASED MODELING REVIEW (Slides 14-16, 19)
>
> > ### Konsep Generalisasi Aktor
> >
> > Generalisasi aktor adalah teknik pemodelan untuk menyederhanakan representasi aktor-aktor yang memiliki karakteristik dan tanggung jawab serupa dalam sistem. Contohnya pada sistem akademik, mahasiswa S1, S2, dan S3 yang memiliki kemampuan berinteraksi serupa dengan use-case "Daftar Ulang" dapat digeneralisasi menjadi satu aktor "Mahasiswa".
> >
> > Proses ini mengurangi kompleksitas diagram dengan mengelompokkan aktor-aktor spesifik ke dalam kategori umum. Analoginya mirip pewarisan dalam pemrograman berorientasi objek dimana aktor spesifik (child) mewarisi sifat dari aktor umum (parent). Penting dicatat bahwa generalisasi hanya dilakukan ketika aktor-aktor tersebut memiliki tujuan dan perilaku interaksi yang sama terhadap use-case tertentu.
> >
> > ### Identifikasi dan Pembatasan Peran
> >
> > Identifikasi peran aktor dimulai dengan menentukan:
> >
> > 1. Entitas eksternal yang berinteraksi dengan sistem
> > 2. Tanggung jawab spesifik masing-masing entitas
> > 3. Batasan wewenang dan kebutuhan informasi
> >
> > Contoh dalam sistem perpustakaan kampus: meskipun dosen dan mahasiswa sama-sama dapat meminjam buku, dosen memiliki kuota pinjam lebih besar dan akses ke koleksi khusus. Jika perbedaan ini signifikan terhadap alur sistem, kedua peran harus dipisahkan meskipun memiliki beberapa kesamaan fungsional.
> >
> > ### Teknik Pemodelan Peran Efektif
> >
> > 1. Gunakan terminologi yang mencerminkan tanggung jawab bukan jabatan (misal: "Peminjam" bukan "Mahasiswa")
> > 2. Definisikan hierarki peran untuk relasi generalisasi/spesialisasi
> > 3. Buat matriks tanggung jawab untuk mengidentifikasi overlap
> > 4. Dokumentasi batasan setiap peran dalam skenario
> >
> > Contoh praktis: Pada sistem e-commerce, "Pembeli" dan "Penjual" merupakan peran terpisah meskipun satu user bisa memiliki kedua peran tersebut. Generalisasi tidak tepat karena tiap peran memiliki use-case yang berbeda secara fundamental.

> [!cornell] #### Summary
>
> **Generalisasi aktor** merupakan teknik optimasi model dengan mengelompokkan aktor-aktor spesifik yang memiliki **tanggung jawab dan interaksi serupa** ke dalam kategori umum. Proses identifikasi peran memerlukan analisis **perbedaan fungsional**, **kebutuhan informasi**, dan **otoritas akses** untuk menentukan batasan generalisasi yang tepat. Pemodelan peran efektif membutuhkan **pemilihan terminologi semantik** yang akurat dan **dokumentasi batasan interaksi** untuk menghindari ambiguitas dalam implementasi sistem.

> [!ad-libitum]- Additional Information
>
> #### Analisis Komparatif Teknik Generalisasi
>
> Studi kasus pada sistem SIMAK UI menunjukkan implementasi hierarki aktor tiga tingkat:
>
> - Level 1: Pengguna Sistem (general)
> - Level 2: Mahasiswa/Dosen/Admin (spesialisasi)
> - Level 3: Mahasiswa Reguler/Internasional (spesialisasi lanjut)
>
> Pendekatan ini memungkinkan reuse permission structure sambil mempertahankan fleksibilitas untuk kebutuhan khusus tiap subkelompok. Tantangan utamanya adalah mengelola kompleksitas ketika jumlah subkelompok melebihi 10 varian.
>
> #### Studi Kasus Kompleks: Sistem Multi-Tenant
>
> Pada platform SaaS enterprise, teknik role inheritance digunakan untuk memodelkan hubungan:
>
> Super Admin → Tenant Admin → Department Manager → Staff
>
> Setiap level memiliki perluasan wewenang dengan overriding capability. Implementasi teknis menggunakan pola Role-Based Access Control (RBAC) dengan fitur permission inheritance.
>
> #### Implikasi Teknis dalam Implementasi
>
> Generelisasi aktor mempengaruhi desain:
>
> 1. Struktur tabel database untuk manajemen peran
> 2. Mekanisme autentikasi dan autorisasi
> 3. Desain API endpoint
> 4. Log auditing
>
> Contoh pola implementasi: Strategy Pattern untuk menangani variasi perilaku antar sub-aktor.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Bangun model peran untuk sistem rumah sakit dengan aktor: Dokter Umum, Dokter Spesialis, Perawat, Pasien, Admin Farmasi. Identifikasi titik generalisasi yang mungkin dan batasan tiap peran.
> 2. Implementasikan sistem RBAC sederhana menggunakan Python dengan fitur role inheritance. Gunakan library Django Guardian untuk menangani permission object-level.
>
> #### Bacaan Lanjutan
>
> - Fowler, M. (2003). _Patterns of Enterprise Application Architecture_: Bab "Role Patterns"
> - Sandhu, R.S. (1996). _Role-Based Access Control Models_
> - UML Specification v2.5.1: Bagian 11.4 Generalization
> - Tutorial OWASP: Implementasi RBAC Aman di Aplikasi Web