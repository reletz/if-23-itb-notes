---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Pengembangan Aplikasi pada Platform Khusus]]

> [!cornell] Mobile Application Typologies and Development Approaches
>
> > ## Questions/Cues
> >
> > - Apa kriteria aplikasi dianggap sebagai mobile app?
> > - Kelebihan dan kekurangan native vs web apps?
> > - Bagaimana games berbeda dari aplikasi mobile umum?
> > - Pendekatan pengembangan multi-platform?
> > - Faktor kunci desain aplikasi mobile?
> >
> > ## Reference Points
> >
> > - Arsitektur Mobile Platform dan Mobile App (Halaman 17-23, 25-33)
> > - Fling, B. Mobile Design and Development (Halaman 23, 25-27, 29)
> > - Stefan Braehler. Analysis of the Android Architecture (Halaman 33)
>
> > ### Definisi Aplikasi Mobile
> >
> > Aplikasi mobile didefinisikan sebagai perangkat lunak yang dirancang khusus untuk berjalan pada perangkat bergerak dengan pertimbangan konteks penggunaan yang unik. Karakteristik utama mencakup kemampuan beroperasi dalam lingkungan dengan sumber daya terbatas (CPU, memori, baterai), sensitivitas terhadap perubahan lokasi, dan interaksi berbasis tugas-tugas spesifik. Contohnya termasuk aplikasi navigasi yang menyesuaikan rute berdasarkan lokasi pengguna secara real-time.
> > Kriteria penting yang membedakan aplikasi mobile dari aplikasi desktop/web tradisional adalah portabilitas tinggi, ketergantungan pada input metode sentuh/gestur, dan optimasi untuk penggunaan dalam kondisi mobilitas tinggi. Meskipun laptop secara teknis termasuk perangkat bergerak, aplikasi yang dijalankan umumnya tidak diklasifikasikan sebagai aplikasi mobile karena tidak dirancang khusus untuk konteks mobilitas.
> >
> > ### Jenis-jenis Aplikasi Mobile
> >
> > Terdapat empat kategori utama aplikasi mobile berdasarkan teknologi implementasinya:
> >
> > 1. **Text-based Apps**: Aplikasi berbasis teks sederhana seperti SMS banking atau layanan USSD yang beroperasi melalui jaringan seluler dasar. Contohnya adalah kode *123# untuk mengecek pulsa yang menggunakan protokol USSD.
> > 2. **Mobile Web Apps**: Aplikasi berbasis browser yang diakses melalui HTTP/HTTPS menggunakan HTML, CSS, dan JavaScript. Meski menawarkan pengalaman mirip aplikasi asli (native-like), keterbatasannya terletak pada akses fitur perangkat yang terbatas. Facebook Lite adalah contoh implementasi yang menggabungkan elemen web dan native.
> > 3. **Native Apps**: Dibangun menggunakan bahasa pemrograman dan tools spesifik platform (Java/Kotlin untuk Android, Swift untuk iOS). Keunggulan utamanya adalah performa optimal dan akses penuh ke fitur perangkat seperti GPS, kamera, dan sensor lainnya. Contohnya adalah aplikasi kamera bawaan ponsel.
> > 4. **Mobile Games**: Biasanya dikembangkan sebagai aplikasi native dengan penekanan pada grafis dan interaksi real-time. Modern Combat 5 menunjukkan bagaimana game mobile bisa mencapai kualitas konsol dengan memanfaatkan API grafis khusus seperti Vulkan atau Metal.
> >
> > ### Pertimbangan Pengembangan
> >
> > Pengembangan aplikasi mobile memerlukan pendekatan khusus karena beberapa faktor kritis:
> >
> > - **Keterbatasan Hardware**: Optimasi penggunaan memori (biasanya dibatasi 100-200MB untuk aplikasi biasa), manajemen baterai, dan adaptasi dengan berbagai ukuran layar. Contoh implementasi: WhatsApp yang tetap berfungsi pada perangkat entry-level dengan RAM 1GB.
> > - **Konteks Penggunaan**: Aplikasi harus responsif terhadap perubahan lingkungan seperti rotasi layar, konektivitas jaringan yang fluktuatif, dan interupsi (telepon masuk). Spotify menunjukkan ini dengan melanjutkan pemutaran musik setelah panggilan telepon selesai.
> > - **Arsitektur Sistem**: Pilihan antara thin-client (beban utama di server) atau thick-client (proses di perangkat). Aplikasi perbankan umumnya menggunakan hybrid approach dengan komputasi sensitif di server.
> >
> > ### Strategi Pengembangan Multi-Platform
> >
> > Terdapat tiga pendekatan utama dalam pengembangan aplikasi lintas platform:
> >
> > 1. **Cross-Platform Frameworks**: Menggunakan React Native, Flutter, atau Xamarin yang mengkompilasi kode ke native components. Keuntungan: codebase tunggal untuk iOS dan Android. Contoh implementasi: aplikasi Instagram yang menggunakan React Native untuk fitur-fitur tertentu.
> > 2. **Progressive Web Apps (PWA)**: Kombinasi web app dengan kemampuan native melalui service workers dan manifest. Dapat diinstall seperti aplikasi native tanpa melalui app store. Twitter Lite adalah contoh PWA yang mengurangi penggunaan data hingga 70%.
> > 3. **Hybrid Apps**: Membungkus web app dalam container native menggunakan Cordova atau Capacitor. Memungkinkan akses terbatas ke fitur perangkat melalui plugin. Aplikasi Philips Hue menggunakan pendekatan ini untuk kontrol lampu IoT.

> [!cornell] #### Summary
> **Aplikasi mobile** didefinisikan oleh karakteristik portabilitas, interaksi terbatas, dan sensitivitas konteks penggunaan. Terdapat empat **jenis utama**: text-based, web apps, native apps, dan games, masing-masing dengan kelebihan dan batasan teknis. Pengembangan memerlukan pertimbangan khusus terhadap **keterbatasan hardware** dan **konteks mobilitas**. **Strategi multi-platform** seperti cross-compiling frameworks dan PWA menawarkan solusi efisiensi dengan trade-off dalam performa dan akses fitur perangkat. **Faktor kunci sukses** meliputi optimasi sumber daya, desain responsif, dan manajemen status aplikasi selama interupsi.

> [!ad-libitum]- Additional Information
>
> #### Arsitektur Hybrid Apps Modern
> Framework modern seperti Flutter menggunakan pendekatan "widget-based rendering" dimana UI dirender langsung pada canvas grafis bukan melalui komponen native. Ini memungkinkan konsistensi visual antar platform tetapi memerlukan bridge khusus untuk akses fitur perangkat. React Native mengambil pendekatan berbeda dengan memanfaatkan komponen UI native melalui JavaScript bridge.
>
> Performa hybrid apps umumnya 60-80% dari aplikasi native murni, dengan pengecualian Flutter yang bisa mencapai 90% melalui kompilasi AOT (Ahead-Of-Time). Tes benchmark menunjukkan waktu render Flutter rata-rata 58fps vs 60fps pada native Android.
>
> #### Progressive Web Apps (PWA) Advanced Features
> Fitur lanjutan PWA mencakup:
> - **Background Sync**: Menyinkronkan data saat konektivitas pulih (misalnya mengirim pesan offline)
> - **Push Notifications**: Menggunakan Web Push API dengan enkripsi VAPID
> - **Geofencing**: Deteksi lokasi melalui service workers
> - **Install Prompt**: Memungkinkan instalasi tanpa app store
>
> Tantangan utama adalah batasan penyimpanan (biasanya 50% disk space) dan akses hardware terbatas seperti NFC atau sensor biometrik.
>
> #### Optimasi Performa Native Apps
> Teknik lanjutan untuk aplikasi native:
> - **Memory Pools**: Alokasi memori dinamis menggunakan object pools pattern
> - **JNI Optimization**: Minimasi crossing antara Java dan native code di Android
> - **Metal/Vulkan**: API grafis low-level untuk mengurangi driver overhead
> - **Battery Optimization**: Menggunakan WorkManager untuk penjadwalan tugas berat
>
> Studi kasus menunjukkan pengurangan penggunaan CPU hingga 40% dengan implementasi tepat pipeline rendering.
>
> #### Self-Exploration Projects
> 1. Bangun aplikasi todo list dengan tiga variasi: native (Java/Kotlin), hybrid (Ionic), dan PWA. Bandingkan performa, ukuran aplikasi, dan konsumsi daya.
> 2. Implementasikan background location tracking pada Android menggunakan Foreground Service dengan optimasi baterai melalui Fused Location Provider API.
> 3. Eksperimen dengan WebAssembly untuk porting library C++ ke aplikasi web mobile dan ukur kecepatan eksekusi relatif terhadap implementasi JavaScript.
>
> #### Tools and Resources
> - **Profiling Tools**: Android Profiler, Xcode Instruments, Chrome DevTools
> - **Cross-Platform Frameworks**: Flutter SDK, React Native CLI
> - **PWA Tools**: Workbox, Lighthouse, PWA Builder
> - **Testing Platforms**: Firebase Test Lab, BrowserStack, AWS Device Farm
>
> #### Further Reading
> - "Mobile Application Development: A Beginner’s Approach" oleh Rohit Ghatol (Chapter 5: Platform Architecture Considerations)
> - "Progressive Web Apps Cookbook" oleh Matthew Cannady (Case Study: Flipkart PWA Implementation)
> - "Flutter in Action" oleh Eric Windmill (Performance Optimization Techniques)
> - Dokumentasi Resmi:
> - Android Developer Guides: Optimizing App Startup Time
> - Web.dev: Modern PWA Development Techniques
> - Apple Developer: Metal Best Practices Guide