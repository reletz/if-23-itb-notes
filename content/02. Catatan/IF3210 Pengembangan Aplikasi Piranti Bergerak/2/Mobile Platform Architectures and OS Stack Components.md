---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Pengembangan Aplikasi pada Platform Khusus]]

> [!cornell] Mobile Platform Architectures and OS Stack Components
>
> > ## Questions/Cues
> >
> > - Bagaimana arsitektur platform mobile diorganisasikan?
> > - Peran kernel Linux dalam stack Android?
> > - Komponen utama OS stack mobile?
> > - Mengapa abstraksi hardware penting?
> > - Perbedaan native libraries vs framework?
> > - Tantangan pengembangan multi-platform?
> >
> > ## Reference Points
> >
> > - IF3210 Slides (Halaman 31-36)
> > - Android Developer Documentation (Halaman 33)
> > - B'Far (2005) Mobile Computing Principles
>
> > ### Arsitektur Platform Mobile Secara Umum
> >
> > Platform mobile terdiri dari lapisan hardware dan software yang terintegrasi. Pada lapisan hardware, terdapat prosesor, memori, sensor, dan modul komunikasi yang dirancang untuk efisiensi daya. Lapisan software meliputi sistem operasi khusus yang mengoptimalkan kinerja pada resource terbatas.
> > Contoh struktur umum:
> >
> > 1. **Kernel**: Mengelola resource hardware dan tugas dasar sistem
> > 2. **Native Libraries**: Penyedia fungsi sistem seperti grafis dan jaringan
> > 3. **Runtime Environment**: Eksekusi kode aplikasi (contoh: ART di Android)
> > 4. **Application Framework**: API untuk pengembangan aplikasi
> > 5. **Aplikasi**: Layer terakhir yang berinteraksi dengan pengguna
> >
> > Analogi: Seperti bangunan bertingkat di mana setiap lantai bergantung pada fondasi di bawahnya namun menyediakan layanan untuk lantai di atasnya.
> >
> > ### Komponen OS Stack pada Android
> >
> > Android menggunakan arsitektur layered dengan komponen utama:
> > **Linux Kernel**: Menyediakan abstraksi hardware dan menangani:
> >
> > - Manajemen memori
> > - Driver perangkat
> > - Keamanan dasar
> > - Power management
> >
> > **Hardware Abstraction Layer (HAL)**: Jembatan antara kernel dan library sistem. Memungkinkan vendor hardware mengimplementasikan antarmuka standar tanpa mengubah kernel. Contoh: HAL kamera memungkinkan aplikasi mengakses fitur kamera tanpa mengetahui detail hardware spesifik.
> > **Native C/C++ Libraries**: Komponen performa-kritis seperti:
> >
> > - Surface Manager (komposisi UI)
> > - OpenGL ES (grafik 3D)
> > - Media Framework (pemutar audio/video)
> > - SQLite (basis data lokal)
> >
> > ### Application Framework dan Runtime
> >
> > **Android Runtime (ART)**: Menggantikan Dalvik sejak Android 5.0, menggunakan kompilasi Ahead-of-Time (AOT) untuk meningkatkan performa. ART menjalankan file DEX (Dalvik Executable) yang dioptimalkan untuk perangkat low-memory.
> > **Java API Framework**: Layer yang diekspos ke pengembang aplikasi melalui Android SDK, menyediakan:
> >
> > - Sistem View untuk UI
> > - Resource Manager
> > - Notification Manager
> > - Activity Manager
> >
> > Contoh implementasi: Saat aplikasi membutuhkan lokasi, framework akan mengelola permintaan ke GPS provider melalui Location Manager API tanpa perlu berinteraksi langsung dengan hardware.
> >
> > ### Pertimbangan Pengembangan Multi-Platform
> >
> > Tantangan utama dalam pengembangan aplikasi mobile multi-platform meliputi:
> >
> > - **Fragmentasi Hardware**: Perbedaan resolusi layar, kapasitas sensor, dan kemampuan prosesor
> > - **Varian OS**: Implementasi kustom vendor (contoh: MIUI di Xiaomi, OneUI di Samsung)
> > - **Keterbatasan Resource**: Optimasi penggunaan memori dan CPU
> >
> > Solusi arsitektural:
> >
> > 1. **Thin Client**: Logika bisnis di server, UI di device
> > 2. **Thick Client**: Prosesing data lokal dengan sinkronisasi berkala
> > 3. **Hybrid Approach**: Kombinasi web view dan native modules
> >
> > Studi kasus: Aplikasi streaming video menggunakan thick client untuk cache konten lokal sementara mengandalkan server untuk manajemen DRM dan rekomendasi konten.

> [!cornell] #### Summary
> **Arsitektur platform mobile** terstruktur dalam lapisan yang saling mendukung, dimulai dari kernel hingga aplikasi pengguna. **Android** sebagai contoh implementasi menggunakan kernel Linux dengan HAL untuk abstraksi hardware, didukung native libraries dan runtime yang dioptimalkan. **Application framework** menyediakan API tingkat tinggi untuk pengembangan aplikasi sementara **tantangan multi-platform** memerlukan pendekatan arsitektural khusus seperti model hybrid atau thick client untuk menyeimbangkan performa dan kompatibilitas.

> [!ad-libitum]- Additional Information
>
> #### Perbandingan Arsitektur OS Mobile
> **iOS vs Android**:
> - iOS menggunakan XNU kernel (hybrid Mach/BSD) dengan emphasis pada sandboxing
> - Android memodifikasi kernel Linux dengan tambahan seperti Binder IPC dan Wakelocks
> - Windows Mobile menggunakan arsitektur NT kernel dengan modul khusus untuk mobile
>
> **Security Model**:
> - SELinux mandatory access control di Android
> - Capability-based security di Fuchsia OS
> - Sandboxing aplikasi melalui app containers
>
> #### Keamanan Kernel Linux pada Perangkat Mobile
> Modifikasi kernel Android mencakup:
> - Binder Driver: IPC antar proses dengan kontrol izin
> - Low Memory Killer: Manajemen memori agresif
> - Power Management: Wakelocks untuk kontrol penggunaan daya
> - ASLR (Address Space Layout Randomization): Mitigasi exploit buffer overflow
>
> #### Proyek Eksplorasi Mandiri
> 1. **Analisis Performa ART vs Dalvik**:
> - Bangun aplikasi benchmark sederhana
> - Ukur waktu startup, penggunaan memori, dan konsumsi daya
> - Bandingkan pada versi Android berbeda
>
> 2. **Implementasi HAL Sederhana**:
> - Buat driver virtual untuk sensor suhu
> - Implementasikan antarmuka HAL sesuai spesifikasi Android
> - Integrasikan dengan aplikasi demo melalui SensorManager API
>
> #### Alat dan Framework
> - **Android NDK**: Pengembangan library native dalam C/C++
> - **AOSP**: Kode sumber Android untuk modifikasi kernel
> - **LineageOS**: Custom ROM untuk eksperimen sistem operasi
> - **QEMU**: Emulasi arsitektur ARM untuk pengujian low-level
>
> #### Bacaan Lanjutan
> - "Embedded Android" oleh Karim Yaghmour (O'Reilly)
> - "Android Internals" oleh Jonathan Levin
> - Paper: "Security Enhanced Linux on Android" (NSA, 2013)
> - Dokumentasi Resmi Android Architecture: https://source.android.com/docs/core/architecture