---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Rekayasa Perangkat Lunak Mobile]]

> [!cornell] Agile Adaptation Strategies for Mobile Development
>
> > ## Questions/Cues
> >
> > - Mengapa Scrum cocok untuk pengembangan aplikasi mobile?
> > - Bagaimana prioritisasi fitur mempengaruhi kesuksesan MVP?
> > - Peran CI/CD dalam pengembangan mobile Agile?
> > - Mengapa kolaborasi lintas fungsi penting di mobile?
> > - Teknik pengumpulan feedback pengguna secara iteratif?
> >
> > ## Reference Points
> >
> > - IF3210_Proses_Pengembangan_Perangkat-Lunak_untuk_Aplikasi-Mobile.pptx (Halaman 23-27)
>
> > ### Kerangka Kerja Scrum dan Kanban untuk Mobile
> >
> > Scrum dan Kanban merupakan dua kerangka kerja Agile yang umum diadaptasi untuk pengembangan aplikasi mobile. **Scrum** menggunakan pendekatan berbasis sprint dengan siklus pengembangan tetap (biasanya 2-3 minggu), cocok untuk proyek dengan fitur yang jelas dan dapat diselesaikan dalam waktu singkat. Contoh implementasi: tim mengembangkan fitur pencarian produk dalam satu sprint. **Kanban** menggunakan pendekatan aliran berkelanjutan (continuous flow), ideal untuk pemeliharaan aplikasi atau perbaikan bug yang memerlukan respons cepat.
> > Perbedaan utama terletak pada metode pengelolaan tugas: Scrum membatasi pekerjaan dalam sprint melalui Sprint Backlog, sedangkan Kanban membatasi pekerjaan yang sedang berjalan (Work In Progress/WIP) melalui papan visual. Untuk aplikasi mobile dengan pembaruan rutin, kombinasi keduanya (Scrumban) sering digunakan - menggunakan Sprint untuk fitur utama dan Kanban untuk perbaikan bug.
> >
> > ### Perencanaan Sprint dan Prioritisasi Fitur
> >
> > Prioritisasi fitur merupakan kunci dalam menentukan **Minimum Viable Product (MVP)**. Teknik yang umum digunakan adalah **MoSCoW Method**:
> >
> > - **Must have**: Fitur inti tanpa aplikasi tidak berfungsi (autentikasi pengguna)
> > - **Should have**: Penting tapi tidak kritis (riwayat transaksi)
> > - **Could have**: Peningkatan pengalaman (animasi UI)
> > - **Won't have**: Ditunda untuk rilis berikutnya
> >
> > Contoh studi kasus: Aplikasi e-commerce mobile memprioritaskan fitur pencarian produk dan keranjang belanja sebagai Must have, sementara ulasan produk masuk Should have. Estimasi kompleksitas menggunakan **Story Points** (Fibonacci sequence) membantu tim mengalokasikan tugas secara realistis dalam sprint.
> >
> > ### Integrasi dan Deployment Berkelanjutan (CI/CD)
> >
> > Continuous Integration/Continuous Deployment (CI/CD) mempercepat pengiriman update dengan otomatisasi proses:
> >
> > 1. **Otomatisasi Build**: Tools seperti GitHub Actions atau Jenkins mengompilasi kode secara otomatis saat perubahan dikomit
> > 2. **Pengujian Otomatis**: Unit test, UI test (Appium), dan security test dijalankan paralel
> > 3. **Distribusi Beta**: Firebase App Distribution untuk Android/TestFlight untuk iOS
> > 4. **Feature Toggling**: Mengaktifkan fitur secara bertahap ke pengguna tertentu
> >
> > Manfaat utama: mengurangi bug sebelum rilis publik dan mempercepat waktu respons terhadap perubahan pasar. Contoh implementasi: Tim menggunakan Bitrise untuk mengotomatiskan deployment ke lingkungan staging setiap merge request.
> >
> > ### Kolaborasi Lintas Fungsi dalam Tim
> >
> > Tim Agile mobile yang efektif terdiri dari:
> >
> > - **Product Owner**: Menentukan prioritas backlog
> > - **Developer Mobile**: Frontend (Swift/Kotlin) & Backend (API)
> > - **UI/UX Designer**: Prototyping (Figma/Adobe XD)
> > - **QA Engineer**: Pengujian kompatibilitas perangkat
> >
> > Praktik kolaborasi harian:
> >
> > - **Daily Stand-up**: Laporan perkembangan 15 menit
> > - **Sprint Review**: Demo fitur akhir sprint
> > - **Retrospective**: Evaluasi proses tim
> >
> > Tools manajemen seperti JIRA membantu visualisasi tugas melalui papan Kanban digital dengan swimlanes untuk setiap peran.
> >
> > ### Pengumpulan Umpan Balik dan Iterasi Cepat
> >
> > Teknik pengumpulan feedback untuk iterasi cepat:
> >
> > - **Analitik Aplikasi**: Firebase Crashlytics untuk pelacakan error
> > - **A/B Testing**: Membandingkan dua versi UI/UX
> > - **Beta Tester Feedback**: Formulir Google terintegrasi
> > - **App Store Review Analysis**: Pemantauan rating dan komentar
> >
> > Siklus iterasi khas: Rilis versi beta → Kumpulkan feedback 1 minggu → Analisis data → Prioritasi perbaikan → Siklus deploy berikutnya. Contoh kasus: Aplikasi travel meningkatkan konversi 30% setelah merevisi alur pemesanan berdasarkan heatmap analytics.

> [!cornell] #### Summary
> **Adaptasi metodologi Agile untuk pengembangan mobile** memerlukan modifikasi kerangka kerja tradisional dengan penekanan pada **siklus rilis cepat** dan **responsivitas terhadap umpan balik pengguna**. Penerapan **Scrum/Kanban hybrid** memungkinkan pengembangan fitur inti secara terstruktur sekaligus respons terhadap perubahan pasar. Integrasi **CI/CD pipeline** menjadi kritis untuk memastikan kualitas aplikasi melalui otomatisasi pengujian dan deployment. Kesuksesan implementasi bergantung pada **kolaborasi lintas fungsi** dan **prioritisasi berbasis nilai bisnis**, dengan **MVP** sebagai fondasi iterasi berkelanjutan.

> [!ad-libitum]- Additional Information
>
> #### Kompleksitas Implementasi Agile di Skala Enterprise
> Tantangan utama dalam skala besar meliputi sinkronisasi multiple squad (menggunakan model Nexus) dan manajemen dependensi antar modul. Solusi yang umum adalah penerapan **Scaled Agile Framework (SAFe)** dengan Agile Release Train (ART) yang menyelaraskan siklus sprint antar tim. Penggunaan tools seperti Jira Align membantu visualisasi dependencies.
>
> #### Studi Kasus: Adaptasi Agile di Startup Fintech
> Startup pembayaran digital X menerapkan modifikasi Scrum dengan siklus sprint 1 minggu dan "hardening sprint" bulanan untuk technical debt. Hasilnya: peningkatan deployment frequency dari monthly menjadi weekly releases dengan penurunan 40% critical bugs.
>
> #### Tantangan Pengujian Otomatis Mobile
> Device fragmentation memerlukan strategi khusus:
> - Cloud testing platforms (BrowserStack, Sauce Labs)
> - Parallel test execution
> - AI-based visual regression testing (Applitools)
> Batasan: Biaya infrastruktur cloud dan pemeliharaan skrip tes untuk berbagai OS version.
>
> #### Tools Rekomendasi
> - **CI/CD**: Bitrise (mobile-first), GitHub Actions
> - **Monitoring**: Sentry (error tracking), Mixpanel (analytics)
> - **A/B Testing**: Firebase Remote Config, Optimizely
> - **Feature Flags**: LaunchDarkly, ConfigCat
>
> #### Proyek Eksplorasi Mandiri
> 1. Bangun pipeline CI/CD sederhana untuk aplikasi Android menggunakan GitHub Actions dengan tahapan: build → unit test → deploy ke Firebase App Distribution
> 2. Lakukan A/B testing pada dua versi UI checkout menggunakan Firebase Remote Config dan analisis konversi dengan Google Analytics
>
> #### Bacaan Lanjutan
> - "Agile Testing for Mobile Apps" oleh Daniel Knott
> - "Lean Mobile Development" oleh Mike van Drongelen
> - Dokumentasi Resmi Google: https://developer.android.com/studio/publish
> - Studi Kasus Spotify Squad Model: https://engineering.atspotify.com/2014/03/spotify-engineering-culture-part-1/