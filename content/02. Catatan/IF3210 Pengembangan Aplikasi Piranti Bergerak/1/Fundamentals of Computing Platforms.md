---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3210 Pengembangan Aplikasi Peranti Bergerak]]

> [!cornell] Fundamentals of Computing Platforms
>
> > ## Questions/Cues
> >
> > - Definisi platform dalam konteks komputasi
> > - Karakteristik utama platform mobile
> > - Perbedaan platform generik vs spesifik
> > - Fungsi platform sebagai lingkungan eksekusi
> > - Contoh implementasi berbagai tingkat abstraksi platform
> >
> > ## Reference Points
> >
> > - Pengantar Kuliah IF3210 (Slides 5-8, 11-14, 17-18)
> > - Informasi Kuliah IF3210 (Slides 2-4)
> >
>
> > ### Konsep Dasar Platform Komputasi
> > Platform dalam komputasi merujuk pada lingkungan operasional tempat aplikasi dapat dijalankan dan menyediakan kemampuan yang dapat digunakan kembali. Menurut definisi dari berbagai sumber (Martin Fowler, TechTarget, Wikipedia), platform mencakup berbagai tingkat abstraksi termasuk arsitektur perangkat keras, sistem operasi, dan pustaka runtime.
> > Sebagai analogi, platform ibarat panggung teater tempat pertunjukan (aplikasi) berlangsung. Panggung menyediakan infrastruktur dasar seperti pencahayaan, panggung, dan sistem suara (API dan layanan platform), sementara aktor (aplikasi) harus bekerja dalam batasan yang ditentukan oleh panggung tersebut.
> > Contoh konkret: Android sebagai platform menyediakan lingkungan eksekusi untuk aplikasi mobile dengan menyediakan API untuk mengakses GPS, kamera, dan layanan lainnya. Tanpa platform ini, setiap aplikasi harus membuat sistem akses hardware sendiri dari nol.
>
> > ### Hierarki dan Jenis Platform
> > Platform komputasi dapat diklasifikasikan berdasarkan tingkat abstraksinya:
> > 1. **Platform Perangkat Keras**: Arsitektur prosesor (ARM vs x86), sistem embedded
> > 2. **Platform Sistem Operasi**: Windows, Linux, Android, iOS
> > 3. **Platform Runtime**: Java Virtual Machine (JVM), .NET CLR
> > 4. **Platform Aplikasi**: Salesforce, SAP Business Platform
> > Setiap lapisan platform menyediakan antarmuka (interface) dan batasan (constraints) untuk lapisan di atasnya. Misalnya, aplikasi Android harus mematuhi aturan lifecycle yang ditetapkan oleh OS Android, sementara OS Android sendiri harus berjalan pada arsitektur prosesor tertentu.
>
> > ### Karakteristik Platform Mobile
> > Platform mobile memiliki karakteristik khusus yang membedakannya dari platform desktop/server:
> > 1. **Sumber Daya Terbatas**: Memori lebih kecil, kapasitas baterai terbatas
> > 2. **Kondisi Jaringan Berubah-ubah**: Koneksi seluler yang tidak stabil vs WiFi
> > 3. **Input Multimodal**: Layar sentuh, sensor gerak, lokasi GPS
> > 4. **Pola Penggunaan Sporadik**: Aplikasi sering diinterupsi (panggilan masuk, notifikasi)
> > Contoh implementasi: Sistem operasi Android memiliki manajer memori khusus yang lebih agresif membunuh proses latar belakang dibandingkan OS desktop. Hal ini merupakan adaptasi terhadap karakteristik platform mobile yang memiliki memori terbatas.
>
> > ### Fungsi Platform sebagai Lingkungan Eksekusi
> > Platform menyediakan tiga fungsi utama untuk aplikasi:
> > 1. **Abstraksi Hardware**: Aplikasi tidak perlu berinteraksi langsung dengan perangkat keras
> > 2. **Manajemen Sumber Daya**: Alokasi CPU, memori, dan perangkat I/O
> > 3. **Layanan Sistem**: Autentikasi, penyimpanan data, komunikasi jaringan
> > Contoh konkret: Saat aplikasi meminta akses lokasi, platform mobile akan mengelola komunikasi dengan modul GPS, menangani izin pengguna, dan menyediakan API standar untuk aplikasi mengakses data lokasi. Tanpa platform, setiap aplikasi perlu mengimplementasikan driver GPS sendiri.
>
> > ### Desain Aplikasi Berbasis Platform
> > Merancang aplikasi untuk platform tertentu memerlukan pemahaman tentang:
> > - **Constraint-Based Design**: Membatasi pilihan desain sesuai kemampuan platform
> > - **Platform-Specific Idioms**: Mengikuti pola UI/UX yang umum untuk platform target
> > - **Optimalisasi Sumber Daya**: Memanfaatkan fitur platform untuk efisiensi
> > Studi kasus: Aplikasi pemetaan untuk Android harus mempertimbangkan fragmentasi perangkat (berbagai ukuran layar, versi OS), sementara aplikasi yang sama di iOS memiliki lingkungan perangkat yang lebih seragam.

> [!cornell] #### Summary
>
> **Platform komputasi** merupakan fondasi penting yang menyediakan lingkungan eksekusi dan layanan sistem untuk aplikasi, dengan tingkat abstraksi mulai dari perangkat keras hingga runtime environment. **Platform mobile** memiliki karakteristik khusus seperti sumber daya terbatas dan kondisi jaringan dinamis yang mengharuskan pendekatan desain aplikasi berbeda. Memahami **batasan dan kemampuan platform** target merupakan keterampilan kritis dalam pengembangan aplikasi, khususnya untuk memastikan kinerja optimal dan pengalaman pengguna yang konsisten sesuai standar platform.
>

> [!ad-libitum]- Additional Information
>
> #### Arsitektur Platform Modern
> Platform kontemporer umumnya mengadopsi arsitektur berlapis dengan mekanisme keamanan berbasis kemampuan (capability-based security). Contoh: Android menggunakan kernel Linux yang dimodifikasi dengan tambahan security modules seperti SELinux dan permission model berbasis izin runtime. Arsitektur ini memungkinkan isolasi proses antara aplikasi dan proteksi sumber daya sistem.
>
> #### Analisis Perbandingan Platform Mobile
> | Karakteristik | Android            | iOS                |
> |---------------|--------------------|--------------------|
> | Model Eksekusi | ART/Dalvik VM     | Native (ARM)       |
> | Bahasa Utama  | Kotlin/Java       | Swift/Objective-C  |
> | Update Policy | Fragmented        | Terpusat           |
> | App Distribution | Multiple Stores | App Store Tunggal  |
>
> #### Tantangan Pengembangan Multi-Platform
> Pengembangan aplikasi untuk beberapa platform menghadapi tantangan teknis seperti sinkronisasi state antar perangkat, konsistensi UI, dan manajemen dependensi lintas platform. Teknik seperti Model-View-ViewModel (MVVM) dengan lapisan domain yang terisolasi membantu mengurangi kompleksitas ini dengan memisahkan logika bisnis dari implementasi spesifik platform.
>
> #### Proyek Eksplorasi Mandiri
> 1. Analisis perbedaan implementasi sistem notifikasi pada Android vs iOS dengan membuat aplikasi demo sederhana
> 2. Eksperimen dengan virtualisasi platform menggunakan Android Emulator dan iOS Simulator untuk memahami perbedaan arsitektur
> 3. Implementasi aplikasi sederhana yang mengakses sensor perangkat (akselerometer, GPS) pada dua platform berbeda
>
> #### Bacaan Lanjut
> - Tanenbaum, A.S. & Bos, H. (2015). *Modern Operating Systems*. Bab 10 tentang sistem operasi mobile
> - ARM Architecture Reference Manual untuk memahami dasar perangkat keras mobile
> - Dokumentasi resmi Android Architecture Components: https://developer.android.com/topic/architecture
> - Whitepaper Apple tentang Secure Enclave di iOS: https://support.apple.com/guide/security/secure-enclave-sec59b0b31ff/web