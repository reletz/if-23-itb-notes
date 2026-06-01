---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Pengembangan Aplikasi pada Platform Khusus]]

> [!cornell] Contextual Frameworks for Mobile Application Usage
>
> > ## Questions/Cues
> >
> > - Karakteristik utama pengguna aplikasi seluler?
> > - Perbedaan konteks Utility vs Locale?
> > - Mengapa konteks penting dalam desain mobile?
> > - Tantangan pengembangan berbasis konteks?
> > - Contoh immersive fullscreen application?
> > - Aspek desain untuk aplikasi produktivitas?
> >
> > ## Reference Points
> >
> > - Pengembangan Aplikasi pada Platform Khusus (Slides 18-32)
> > - Mobile Computing Principles (Reza B'Far)
> > - Mobile Design and Development (Fling, B.)
>
> > ### Karakteristik Pengguna Seluler
> >
> > Pengguna aplikasi seluler memiliki karakteristik unik yang membedakannya dari pengguna sistem stasioner. Mereka sering berpindah lokasi (baik lokasi yang diketahui maupun tidak diketahui), tidak sepenuhnya fokus pada tugas komputasi, dan membutuhkan responsivitas tinggi. Pengguna seluler cenderung berganti tugas secara cepat dan membutuhkan akses sistem kapan saja dan di mana saja. Contohnya adalah pengguna yang memeriksa email sambil berjalan atau mencari informasi navigasi saat mengemudi.
> > Pola interaksi ini menuntut desain antarmuka yang sederhana dengan urgensi penyelesaian tugas yang tinggi. Sistem harus mendukung interupsi dan penyimpanan konteks, seperti secara otomatis menyimpan draft email ketika pengguna beralih ke aplikasi lain. Tantangan utamanya adalah menjaga kualitas layanan meskipun terjadi perubahan kondisi jaringan dan perhatian pengguna yang terbagi.
> >
> > ### Klasifikasi Konteks Aplikasi
> >
> > Konteks aplikasi seluler dapat dikategorikan menjadi empat jenis utama berdasarkan pola penggunaan dan kebutuhan pengguna. **Utility Context** mengacu pada penggunaan aplikasi untuk skenario tugas pendek dengan interaksi minimal, seperti kalkulator atau pemantau cuaca. **Locale Context** bergantung pada lokasi pengguna untuk menyediakan layanan relevan seperti navigasi atau diskon toko terdekat.
> > **Informative Applications** berfokus pada penyediaan konten seperti berita atau direktori bisnis, sementara **Productivity Application Context** melibatkan tugas terstruktur dengan prioritas seperti manajemen kontak atau belanja online. Setiap konteks memerlukan pendekatan desain berbeda; misalnya aplikasi produktivitas membutuhkan alur kerja yang jelas, sedangkan aplikasi berbasis lokasi memerlukan integrasi sensor GPS dan kompas.
> >
> > ### Immersive Fullscreen Experience
> >
> > Aplikasi immersive menuntut fokus penuh pengguna dengan memanfaatkan seluruh layar, umumnya digunakan dalam game atau aplikasi media interaktif. Desain ini menghilangkan elemen UI eksternal untuk menciptakan pengalaman yang mendalam. Contohnya adalah game AR (Augmented Reality) seperti Pokémon GO yang memadukan lingkungan nyata dengan konten digital.
> > Tantangan utamanya adalah menjaga performa grafis tetap optimal di perangkat dengan spesifikasi terbatas dan mengelola konsumsi daya baterai. Pengembang harus mempertimbangkan teknik seperti dynamic resolution scaling dan optimasi aset grafis. Aplikasi jenis ini juga memerlukan penanganan khusus terhadap interupsi sistem (seperti panggilan masuk) tanpa mengganggu pengalaman pengguna.
> >
> > ### Pertimbangan Desain Berbasis Konteks
> >
> > Pengembangan aplikasi berbasis konteks memerlukan analisis tiga dimensi utama: **situasi penggunaan** (genggam vs meja), **tujuan pengguna** (pekerjaan vs hiburan), dan **lingkungan fisik** (cahaya terang, kebisingan). Desainer harus mempertimbangkan bagaimana konteks ini memengaruhi kebutuhan interaksi - misalnya antarmuka suara untuk lingkungan bising atau mode gelap untuk penggunaan malam hari.
> > Teknik seperti context-aware computing memungkinkan aplikasi beradaptasi secara dinamis. Contoh implementasinya adalah aplikasi pemutar musik yang secara otomatis menurunkan volume saat pengguna memasuki area perpustakaan (dideteksi via GPS atau NFC), atau aplikasi email yang beralih ke tampilan sederhana saat koneksi jaringan lemah.
> >
> > ### Tantangan Pengembangan
> >
> > Integrasi konteks menambah kompleksitas dalam pengembangan aplikasi seluler karena variasi kondisi perangkat dan lingkungan. Tantangan teknis utama meliputi: (1) akurasi sensor (GPS, akselerometer) yang bervariasi antar perangkat, (2) konsumsi daya untuk pemantauan konteks kontinu, dan (3) kompatibilitas lintas platform. Solusi umumnya melibatkan penggunaan abstraction layer untuk sensor dan algoritma hemat daya seperti adaptive sampling rate.
> > Dari sisi UX, tantangannya adalah menyeimbangkan personalisasi dengan privasi pengguna. Aplikasi harus meminta izin secara etis untuk mengakses data kontekstual (lokasi, kalender) dan memberikan opsi kontrol granular. Pola desain seperti progressive disclosure dapat membantu menyederhanakan kompleksitas fitur berbasis konteks bagi pengguna baru.

> [!cornell] #### Summary
>  **Konteks penggunaan** merupakan faktor kritis dalam desain aplikasi seluler yang mencakup **karakteristik mobilitas pengguna**, **lingkungan fisik**, dan **tujuan interaksi**. Empat kategori utama konteks aplikasi - utility, locale, informative, dan immersive - masing-masing memerlukan pendekatan desain spesifik dengan pertimbangan **responsivitas** dan **efisiensi sumber daya**. Implementasi yang sukses membutuhkan keseimbangan antara **adaptasi dinamis** terhadap kondisi pengguna dan **perlindungan privasi data kontekstual**. Pengembang harus mengatasi tantangan teknis seperti **variasi sensor perangkat** dan **konsumsi daya** melalui optimasi algoritma dan arsitektur hemat sumber daya.

> [!ad-libitum]- Additional Information
>
> #### Teknik Pemodelan Konteks Lanjutan
> Model konteks tingkat lanjut menggunakan pendekatan probabilistik seperti Bayesian Networks untuk mengatasi ketidakpastian data sensor. Contoh: memprediksi aktivitas pengguna (berjalan/mengemudi) dari gabungan data akselerometer, GPS, dan log aplikasi. Framework seperti ContextToolkit menyediakan middleware untuk abstraksi sumber konteks heterogen (sensor, kalender, preferensi pengguna) melalui arsitektur berbasis komponen.
>
> #### Evaluasi Pengalaman Pengguna Kontekstual
> Metode evaluasi khusus diperlukan untuk mengukur efektivitas desain berbasis konteks, antara lain:
> - **Experience Sampling Method (ESM)**: Pengguna memberikan umpan balik saat aplikasi mendeteksi perubahan konteks tertentu
> - **Context-Aware Logging**: Pencatatan otomatis parameter lingkungan (lokasi, waktu, kondisi jaringan) selama penggunaan
> - **Field Testing Terkontrol**: Simulasi skenario penggunaan nyata dengan variabel terkendali (mis. penggunaan di transportasi umum vs kantor)
>
> #### Edge Cases dan Batasan
> Situasi khusus yang perlu diantisipasi:
> - **False Positive Detection**: Aplikasi salah mengenali konteks (mis. mengira pengguna sedang menyetir saat hanya menggoyang ponsel)
> - **Multi-User Conflict**: Ketika beberapa pengguna berbagi perangkat dengan preferensi konteks berbeda
> - **Konteks Bersarang**: Pengguna memasuki lingkungan baru sementara aplikasi masih memproses konteks sebelumnya (mis. transit bandara sambil menjalankan tugas kerja)
> Solusi meliputi implementasi confidence level untuk prediksi konteks dan mekanisme fallback ke mode dasar.
>
> #### Proyek Eksplorasi Mandiri
> 1. Bangun aplikasi konteks-aware sederhana dengan MIT App Inventor atau Android Studio yang mengubah tema (terang/gelap) berdasarkan waktu lokal dan intensitas cahaya sekitar.
> 2. Eksperimen dengan TensorFlow Lite untuk membuat model klasifikasi aktivitas pengguna (berdiri/duduk/berlari) menggunakan data akselerometer ponsel.
> 3. Bandingkan konsumsi daya antara polling sensor kontinu vs event-based listening pada berbagai skenario penggunaan.
>
> #### Alat dan Framework
> - **Android Jetpack Compose**: Untuk UI adaptif yang merespons perubahan konteks perangkat
> - **Google Awareness API**: Menyediakan abstraksi untuk aktivitas pengguna, lokasi, dan kondisi lingkungan
> - **React Native Context API**: Manajemen state konteks dalam aplikasi hybrid
> - **SensorKinetic App**: Alat analisis performa sensor dan konsumsi daya
>
> #### Bacaan Lanjutan
> - Dey, A.K. "Understanding and Using Context". Personal and Ubiquitous Computing, 2001
> - Baldauf, M. et al. "A Survey on Context-Aware Systems". Int. J. Ad Hoc and Ubiquitous Computing, 2007
> - Dokumentasi Android Context Handling: https://developer.android.com/guide/topics/resources/runtime-changes
> - Coursera: "Context-Aware Computing" oleh University of London