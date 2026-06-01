---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3210 Pengembangan Aplikasi Peranti Bergerak]]

> [!cornell] Mobile vs. Web Application Paradigms
>
> > ## Questions/Cues
> >
> > - Mengapa pangsa pasar aplikasi mobile terus meningkat?
> > - Perbedaan arsitektur native vs hybrid vs web apps
> > - Kelebihan akses hardware pada aplikasi mobile
> > - Keuntungan updateability aplikasi berbasis web
> > - Alasan preferensi hybrid apps untuk startup
> > - Contoh implementasi PWA vs native apps
> >
> > ## Reference Points
> >
> > - Pengantar Kuliah IF3210 (Halaman 1-20)
> > - BrowserStack Mobile vs Web Report (Halaman 9)
> >
>
> > ### Klasifikasi Aplikasi Berdasarkan Platform
> > Aplikasi mobile dan web merupakan dua paradigma pengembangan yang berbeda secara fundamental. Aplikasi mobile didesain khusus untuk berjalan pada sistem operasi perangkat bergerak (seperti Android atau iOS), sementara aplikasi web diakses melalui browser tanpa perlu instalasi khusus. Perbedaan utama terletak pada metode distribusi - aplikasi mobile umumnya didistribusikan melalui App Store/Play Store, sedangkan aplikasi web dapat langsung diakses melalui URL.
> > Contoh nyata perbedaan implementasi dapat dilihat pada Google Workspace yang memiliki versi web (melalui browser) dan versi mobile (aplikasi terinstal). Versi mobile biasanya memiliki akses lebih baik ke fitur hardware seperti notifikasi push dan GPS, sementara versi web lebih mudah diupdate tanpa melalui proses review app store.
>
> > ### Native vs Hybrid vs Web Apps
> > **Aplikasi Native** dikembangkan menggunakan bahasa pemrograman dan SDK khusus platform (Kotlin/Java untuk Android, Swift untuk iOS). Keunggulannya mencakup performa optimal dan akses penuh ke fitur hardware, tetapi memerlukan pengembangan terpisah untuk setiap platform. Contoh: aplikasi kamera bawaan ponsel.
> > **Aplikasi Hybrid** menggunakan pendekatan "write once, run anywhere" dengan framework seperti Flutter atau React Native. Solusi ini populer di kalangan startup karena mengurangi biaya pengembangan, meski mungkin ada trade-off dalam performa dan akses hardware. Contoh: aplikasi e-commerce menengah.
> > **Aplikasi Web** (termasuk PWA) berjalan di browser dengan teknologi HTML/CSS/JavaScript. Tidak memerlukan instalasi dan mudah diupdate, tetapi memiliki keterbatasan dalam akses fitur device. Contoh: versi mobile dari situs berita.
>
> > ### Perbandingan Teknis Mobile vs Web
> > **Kinerja:** Aplikasi native umumnya memiliki performa terbaik karena dioptimalkan untuk hardware spesifik dan dapat menggunakan kompilasi native. Aplikasi hybrid menggunakan bridge yang dapat memperlambat proses tertentu, sementara web apps tergantung pada kemampuan browser.
> > **Akses Hardware:** Aplikasi mobile (baik native maupun hybrid) memiliki akses lebih baik ke sensor perangkat seperti GPS, kamera, dan accelerometer. Web apps memerlukan API khusus (seperti Geolocation API) yang membutuhkan izin pengguna dan memiliki keterbatasan fungsional.
> > **Pemeliharaan:** Aplikasi web memiliki keunggulan dalam hal update karena perubahan langsung terlihat oleh pengguna. Aplikasi mobile memerlukan proses update melalui app store dan mungkin ada delay adopsi versi terbaru oleh pengguna.
>
> > ### Pertimbangan Bisnis dan Pengembangan
> > **Biaya Pengembangan:** Pengembangan aplikasi native paling mahal karena memerlukan tim khusus untuk setiap platform. Hybrid mengurangi biaya hingga 30-40% dengan codebase tunggal. Web apps paling ekonomis untuk MVP (Minimum Viable Product).
> > **Engagement Pengguna:** Aplikasi mobile memiliki tingkat engagement lebih tinggi (15-20% lebih baik menurut studi 2022) karena kemudahan akses melalui ikon di layar utama. Notifikasi push pada aplikasi mobile juga lebih efektif dengan open rate 45% dibandingkan web notifications (20%).
> > **Kompatibilitas:** Aplikasi web memiliki jangkauan lebih luas karena dapat diakses dari perangkat apapun dengan browser modern. Aplikasi mobile terbatas pada versi OS yang didukung dan mungkin memerlukan spesifikasi hardware tertentu.
>
> > ### Tren dan Evolusi Teknologi
> > PWA (Progressive Web Apps) merupakan teknologi hibrida yang mencoba menggabungkan keunggulan web dan mobile apps. Fitur seperti instalasi offline, push notifications, dan akses terbatas ke hardware membuatnya semakin kompetitif. Namun, untuk aplikasi kompleks seperti editor video mobile atau AR games, solusi native masih diperlukan.
> > Tren "Mobile-First Development" semakin dominan dengan 68% traffic internet global berasal dari perangkat mobile pada 2023. Strategi ini memprioritaskan pengalaman pengguna mobile dalam desain UI dan fungsionalitas, meskipun versi web tetap dibutuhkan untuk pengguna desktop.

> [!cornell] #### Summary
>
> **Paradigma pengembangan mobile dan web** menawarkan trade-off berbeda dalam hal **kinerja, akses hardware, dan biaya pengembangan**. Aplikasi native unggul dalam **optimasi hardware dan performa** tetapi memerlukan investasi besar, sementara **web apps menawarkan jangkauan lebih luas** dengan biaya lebih rendah. **Hybrid apps dan PWA** muncul sebagai solusi kompromi dengan **codebase tunggal** yang memadukan beberapa keunggulan kedua pendekatan. Pemilihan paradigma harus mempertimbangkan **target pengguna, kompleksitas fitur, dan sumber daya pengembangan** yang tersedia.
>

> [!ad-libitum]- Additional Information
>
> #### Analisis Kompleksitas Pengembangan
>
> **Native Development:** Memerlukan penguasaan bahasa spesifik platform (Kotlin untuk Android, Swift untuk iOS) dan toolchain khusus (Android Studio, Xcode). Proses build dan testing lebih rumit karena harus mempertimbangkan fragmentasi perangkat (versi OS, resolusi layar, chipset). Waktu pengembangan rata-rata untuk aplikasi native sederhana adalah 600-800 jam kerja.
>
> **Hybrid Development:** Menggunakan JavaScript/TypeScript sebagai bahasa utama dengan abstraksi melalui framework. Kompleksitas muncul dalam menangani perbedaan perilaku antar platform dan optimasi performa. Waktu pengembangan dapat berkurang 30-40% dibandingkan solusi native ganda.
>
> **Web Development:** Mengandalkan responsive design dan browser APIs. Tantangan utama terletak pada konsistensi tampilan di berbagai browser (Chrome, Safari, Firefox) dan implementasi fitur progresif. Waktu pengembangan paling cepat dengan rata-rata 200-300 jam untuk aplikasi dasar.
>
> #### Pertimbangan Arsitektur Lanjut
>
> **State Management:** Aplikasi mobile native biasanya menggunakan arsitektur MVVM atau MVI dengan library seperti Android Jetpack Compose. Hybrid apps mengadopsi pola Redux/MobX. Web apps modern menggunakan reactive frameworks seperti React/Vue.
>
> **Offline Capability:** Aplikasi mobile dapat menggunakan local databases (Room, Realm) untuk operasi offline lengkap. Web apps mengandalkan service workers dan cache API untuk fungsionalitas offline terbatas.
>
> **Keamanan:** Aplikasi native memiliki akses ke keamanan tingkat OS (biometric auth, secure enclave). Web apps bergantung pada protokol HTTPS dan WebAuthn untuk autentikasi.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Bandingkan performa aplikasi todo list yang dibangun dengan tiga paradigma berbeda (native Android, Flutter, PWA) dalam hal: waktu startup, konsumsi memori, dan responsivitas UI.
>
> 2. Implementasikan fitur geolocation tracking pada aplikasi hybrid dan ukur akurasi posisi dibandingkan versi native di perangkat yang sama.
>
> 3. Analisis dampak App Store Optimization (ASO) terhadap discoverability aplikasi mobile vs strategi SEO untuk aplikasi web progresif.
>
> #### Alat dan Kerangka Kerja
>
> - **Profiling Tools:** Android Profiler, Xcode Instruments, Chrome DevTools
> - **Cross-Platform:** Flutter (Dart), React Native (JavaScript), Ionic (WebView)
> - **PWA Tools:** Workbox, Lighthouse, PWA Builder
> - **Testing Frameworks:** Appium (mobile), Cypress (web), Detox (native)
>
> #### Bacaan Lanjutan
>
> - "Progressive Web Apps" oleh Jason Kerr & Dean Hume
> - "Flutter in Action" oleh Eric Windmill
> - "Mobile App Development with Flutter" oleh Deven Joshi
> - Dokumentasi PWA Google: https://web.dev/progressive-web-apps/
> - Studi Kasus Hybrid Apps: https://medium.com/flutter-community