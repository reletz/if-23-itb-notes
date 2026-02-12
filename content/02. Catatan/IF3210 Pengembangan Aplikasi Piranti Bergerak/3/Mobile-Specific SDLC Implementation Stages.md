---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Pengembangan Perangkat Lunak untuk Aplikasi Mobile]]

> [!cornell] Mobile-Specific SDLC Implementation Stages
>
> > ## Questions/Cues
> >
> > - Mengapa pengujian perangkat penting untuk aplikasi mobile?
> > - Bagaimana desain UI/UX mobile berbeda dari desktop?
> > - Apa keuntungan pengembangan frontend/backend paralel?
> > - Mengapa ASO (App Store Optimization) krusial?
> > - Bagaimana pemeliharaan post-release dilakukan?
> >
> > ## Reference Points
> >
> > - IF3210_Pengembangan_Mobile.pptx (Halaman 8, 16-22)
> > - Referensi Tambahan: Firebase Dokumentasi (Halaman 28)
>
> > ### Tahap 1: Perencanaan & Analisis Kebutuhan
> >
> > Tahap awal ini fokus pada identifikasi kebutuhan spesifik pengguna mobile dan kelayakan teknis. Berbeda dari pengembangan desktop, faktor seperti kebiasaan pengguna mobile (gunakan waktu singkat, interaksi sentuh), konektivitas intermiten, dan integrasi fitur perangkat (GPS, kamera) harus dipertimbangkan. Contoh: Aplikasi e-commerce mobile perlu memprioritaskan checkout 1-tap dan integrasi pembayaran digital dibandingkan versi desktop.
> > Analisis kompetisi menjadi kritis untuk membedakan fitur unik. Studi kasus: Gojek melakukan riset mendalam tentang perilaku pengguna ojek online sebelum menentukan fitur pemesanan instan. Estimasi biaya harus mencakup pengujian multi-perangkat dan biaya publish ke app store.
> >
> > ### Tahap 2: Desain UI/UX Mobile-Spesifik
> >
> > Desain antarmuka mobile harus mengakomodasi keterbatasan layar kecil dan interaksi sentuh. Prinsip "thumb-friendly design" menyatakan bahwa elemen interaktif harus berada dalam jangkauan ibu jari (zona bawah layar). Contoh buruk: menu navigasi di pojok kanan atas sulit dijangkau pada perangkat besar.
> > Prototyping menggunakan tools seperti Figma harus mencakapkan user journey khusus mobile: transisi portrait-landscape, gestur swipe, dan notifikasi push. Studi kasus: Aplikasi banking menghindari form panjang dengan menerapkan wizard multi-step dan autofill OCR.
> >
> > ### Tahap 3: Pengembangan dengan Pendekatan Modular
> >
> > Pengembangan mobile menggunakan arsitektur modular untuk memfasilitasi pembaruan tanpa rebuild penuh. Frontend (UI) dan backend (API) dikerjakan paralel dengan sinkronisasi melalui contract-first development. Contoh teknis: Tim frontend menggunakan mock API sementara backend menyelesaikan implementasi sebenarnya.
> > Pemilihan framework (Flutter/React Native/Native) didasarkan pada target performa dan fitur platform spesifik. Contoh: Aplikasi yang membutuhkan akses hardware langsung (e.g., augmented reality) lebih cocok menggunakan native code (Kotlin/Swift).
> >
> > ### Tahap 4: Pengujian Multi-Dimensi
> >
> > Pengujian mobile mencakup empat dimensi utama: 1) Fungsional (fitur bekerja di semua OS versi), 2) Kinerja (responsif di jaringan lemah), 3) Keamanan (enkripsi data lokal), dan 4) Kompatibilitas (fragmentasi perangkat Android). Tools seperti Firebase Test Lab memungkinkan pengujian otomatis di ratusan device profile.
> > Beta testing melalui TestFlight (iOS) atau Firebase App Distribution wajib melibatkan pengguna nyata dengan berbagai tingkat literasi digital. Contoh masalah yang terungkap: Tombol tidak terlihat di mode gelap atau crash saat pindah jaringan 4G-WiFi.
> >
> > ### Tahap 5: Deployment dengan Strategi ASO
> >
> > Publikasi ke app store memerlukan persiapan metadata yang dioptimalkan untuk discoverability: judul mengandung kata kunci, deskripsi dengan value proposition jelas, dan screenshot yang menunjukkan user flow. Contoh teknik ASO: Shopee menggunakan kata kunci "belanja online gratis ongkir" di deskripsi.
> > Proses approval Apple Store yang ketat membutuhkan pemeriksaan ketat terhadap guideline privasi (misal: izin lokasi) dan konten. Kasus penolakan umum: Aplikasi finansial tanpa klarifikasi penggunaan data di App Privacy Nutrition Label.
> >
> > ### Tahap 6: Pemeliharaan Berbasis Analytics
> >
> > Fase post-release menggunakan alat seperti Firebase Crashlytics untuk melacak error runtime dan Sentry untuk performance monitoring. Update reguler diperlukan untuk menangani: 1) Bug spesifik OS versi baru, 2) Perubahan kebijakan app store, 3) Integrasi library pihak ketiga yang deprecated.
> > Contoh implementasi: Traveloka mengeluarkan hotfix dalam 24 jam saat terjadi crash di Android 14 karena perubahan permission model. Pembaruan konten melalui mekanisme seperti in-app CMS mengurangi kebutuhan update binary.

> [!cornell] #### Summary
> **Implementasi SDLC untuk aplikasi mobile** memerlukan adaptasi khusus menyangkut **fragmentasi perangkat**, **interaksi sentuh**, dan **ekosistem app store**. Tahapan kritis meliputi desain UI yang ergonomis, pengujian kompatibilitas lintas platform, dan strategi ASO untuk meningkatkan visibilitas. **Pemeliharaan pasca-rilis** menjadi pembeda krusial mengingat dinamika update OS dan perubahan kebijakan app store yang cepat.

> [!ad-libitum]- Additional Information
>
> #### Fragmentasi Perangkat Mobile
> Tantangan utama pengembangan Android adalah variasi kombinasi OS version, screen resolution, dan chipset. Solusi teknis meliputi: 1) Penggunaan vector assets代替 bitmap, 2) Adaptive layout dengan constraint-based design, 3) Penyediaan multiple APK untuk arsitektur CPU berbeda. Studi kasus: Aplikasi Samsung Health menyediakan 3 varian APK (arm64, x86, universal).
>
> #### Keamanan Data Lokal
> Mobile apps menyimpan sensitive data di perangkat yang rentan fisik. Implementasi security best practices: 1) Enkripsi menggunakan Android Keystore/iOS Keychain, 2) Certificate pinning untuk API communication, 3) Runtime protection (Jailbreak/Root detection). Tools: OWASP Mobile Security Testing Guide menyediakan checklist komprehensif.
>
> #### Self-Exploration Projects
> 1. Bangun aplikasi sederhana dengan fitur offline-first: Implementasi caching menggunakan Room/SQLite dan sinkronisasi latar belakang saat koneksi tersedia.
> 2. Lakukan A/B testing tampilan checkout: Bandingkan konversi antara layout single-page vs multi-step menggunakan Firebase Remote Config.
>
> #### Tools dan Resources
> - **Emulator Multi-Perangkat:** Genymotion (Android), Xcode iOS Simulator
> - **Performance Profiling:** Android Profiler, Instruments (Xcode)
> - **ASO Tools:** App Annie, Sensor Tower
>
> #### Further Reading
> - "Mobile App Development: A Guide to Development for iOS and Android" oleh Thomas Bresee
> - Google Play Policy Center: https://play.google.com/console/help/
> - Apple App Store Review Guidelines: https://developer.apple.com/app-store/review/guidelines/