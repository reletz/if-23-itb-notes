---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Pengembangan Aplikasi pada Platform Khusus]]

> [!cornell] Mobile Computing Fundamentals and Distinctions
>
> > ## Questions/Cues
> >
> > - Mengapa ukuran fisik penting di komputasi mobile?
> > - Bagaimana mobilitas memengaruhi desain aplikasi?
> > - Perbedaan utama sumber daya sistem mobile vs stasioner
> > - Tantangan konektivitas nirkabel pada perangkat bergerak
> > - Mengapa konteks penggunaan krusial di komputasi mobile?
> > - Hubungan orthogonal antara mobilitas dan konektivitas
> >
> > ## Reference Points
> >
> > - Dosen IF3210 STEI ITB (Halaman 1-4, 6-7, 16-22, 31-36)
> > - Reza B'Far. Mobile Computing Principles (Halaman yang relevan)
> > - Fling, B. Mobile Design and Development (Halaman yang relevan)
>
> > ### Definisi Sistem Komputasi Mobile
> >
> > Sistem komputasi mobile merujuk pada perangkat komputasi yang dapat dipindahkan secara fisik dan tetap berfungsi selama proses perpindahan. Contoh utama termasuk laptop, PDA, dan ponsel pintar. Karakteristik pembeda utamanya dibanding sistem stasioner meliputi: konektivitas jaringan nirkabel yang dominan, ukuran fisik yang kompak, sifat penggunaan yang portable, ketergantungan pada sumber daya baterai, dan fungsi khusus untuk pengguna bergerak.
> > Konsep kunci adalah "mobilitas operasional" - kemampuan sistem untuk tetap berfungsi penuh selama berpindah lokasi. Misalnya, laptop yang digunakan di kereta api tetap dapat mengakses jaringan melalui WiFi atau seluler selama perjalanan. Ini berbeda dengan sistem stasioner seperti PC desktop yang terikat pada lokasi dan sumber daya tetap.
> >
> > ### Dimensi Mobilitas
> >
> > Mobilitas dalam komputasi mobile memiliki empat dimensi utama:
> >
> > 1. **Mobilitas Perangkat**: Kemampuan fisik perangkat untuk dibawa ke berbagai lokasi
> > 2. **Mobilitas Pengguna**: Perpindahan lokasi pengguna selama menggunakan sistem
> > 3. **Mobilitas Sesii**: Kelanjutan sesi komputasi selama perpindahan jaringan
> > 4. **Mobilitas Layanan**: Ketersediaan layanan yang sama di berbagai lokasi
> >
> > Contoh konkret adalah penggunaan aplikasi pemetaan di smartphone: pengguna bergerak dari satu lokasi ke lokasi lain (mobilitas pengguna), perangkat terus memperbarui posisi (mobilitas perangkat), koneksi beralih antara WiFi dan seluler tanpa terputus (mobilitas sesi), dan layanan peta tetap konsisten (mobilitas layanan).
> >
> > ### Perbedaan Utama dengan Sistem Stasioner
> >
> > Terdapat lima perbedaan mendasar antara sistem mobile dan stasioner:
> >
> > 1. **Keterbatasan Sumber Daya**: Prosesor lebih lambat, memori terbatas, penyimpanan kecil
> > 2. **Konektivitas Dinamis**: Jaringan sering berubah kualitas dan tipe koneksi
> > 3. **Konsumsi Daya**: Ketergantungan pada baterai mempengaruhi desain hardware/software
> > 4. **Konteks Penggunaan**: Lingkungan fisik (cahaya, suara, gerakan) mempengaruhi interaksi
> > 5. **Model Interaksi**: Input/output terbatas (layar kecil, virtual keyboard)
> >
> > Analogi: Komputer stasioner seperti rumah permanen dengan listrik stabil dan ruang luas, sedangkan komputasi mobile seperti caravan yang harus hemat energi, adaptif dengan lingkungan, dan memiliki fasilitas kompak.
> >
> > ### Pertimbangan Desain Aplikasi Mobile
> >
> > Pengembangan aplikasi mobile memerlukan pendekatan khusus karena:
> >
> > - **Multiplatform**: Keragaman sistem operasi dan spesifikasi hardware
> > - **Portabilitas Kode**: Kode harus berjalan di berbagai arsitektur
> > - **Trade-off Abstraksi vs Performa**: Lapisan abstraksi hardware mengurangi kinerja
> > - **Model Arsitektur**: Pilihan antara thin-client, thick-client, atau aplikasi mandiri
> >
> > Contoh praktis: Aplikasi mobile banking menggunakan arsitektur thick-client untuk komputasi lokal sensitif, tetapi tetap memerlukan koneksi server untuk transaksi. Ini berbeda dengan aplikasi web mobile yang sepenuhnya bergantung pada server (thin-client).
> >
> > ### Karakteristik Pengguna Mobile
> >
> > Pengguna sistem mobile memiliki pola penggunaan yang unik:
> >
> > - **Perhatian Terbagi**: Tidak fokus penuh pada perangkat selama penggunaan
> > - **Tuntutan Responsivitas**: Harapan respon sistem yang instan
> > - **Perpindahan Tugas Cepat**: Sering berganti aplikasi atau fungsi
> > - **Akses Ubiquitous**: Keinginan menggunakan sistem di mana saja
> >
> > Studi kasus: Pengguna yang memesan taksi online sambil berjalan membutuhkan antarmuka yang dapat dioperasikan dengan satu tangan, notifikasi jelas, dan transaksi cepat tanpa langkah berlebihan.

> [!cornell] #### Summary
>  **Sistem komputasi mobile** didefinisikan oleh kemampuan operasional selama perpindahan fisik, dengan karakteristik utama meliputi konektivitas nirkabel, ukuran kompak, dan ketergantungan baterai. **Dimensi mobilitas** mencakup perangkat, pengguna, sesi, dan layanan yang saling berinteraksi. Perbedaan utama dengan sistem stasioner terletak pada **keterbatasan sumber daya**, **konektivitas dinamis**, dan **konteks penggunaan yang variatif**. Pengembangan aplikasi mobile memerlukan pertimbangan khusus terhadap **fragmentasi platform**, **kendala performa**, dan **pola interaksi pengguna** yang unik, terutama terkait perhatian terbagi dan kebutuhan responsivitas tinggi.

> [!ad-libitum]- Additional Information
>
> #### Analisis Teknis Keterbatasan Daya
> Konsumsi energi pada perangkat mobile mengikuti persamaan:
> ```
> E_total = (P_computation × t_computation) + (P_communication × t_communication) + P_idle × t_idle
> ```
> Dimana P_computation dipengaruhi oleh frekuensi CPU dan kompleksitas algoritma. Teknik penghematan daya meliputi DVFS (Dynamic Voltage and Frequency Scaling) dan arsitektur big.LITTLE yang menggabungkan core berdaya tinggi dan rendah. Batasan fisik baterai lithium-ion modern memiliki kepadatan energi ~250-693 Wh/L, menciptakan trade-off antara kapasitas dan berat perangkat.
>
> #### Perbandingan Arsitektur Mobile-Stasioner
> | Aspek             | Mobile                  | Stasioner               |
> |-------------------|-------------------------|-------------------------|
> | Manajemen Memori  | Agresif (pembunuhan proses) | Long-running processes |
> | Skema Penyimpanan | Flash-based (eMMC/UFS) | Disk-based (HDD/SSD)   |
> | Model Keamanan    | Sandboxing ketat        | Privilege separation   |
> | Update Sistem     | OTA (Over-The-Air)      | Manual/automatic       |
>
> #### Tantangan Konektivitas Dinamis
> Perubahan koneksi jaringan (handover) pada perangkat mobile menyebabkan masalah:
> - Paket loss selama transisi antara WiFi dan seluler
> - Perubahan latensi mendadak yang mengganggu aplikasi real-time
> - Variasi bandwidth yang mempengaruhi kualitas streaming
> Solusi teknis termasuk Multipath TCP dan protokol QUIC yang dirancang khusus untuk koneksi tidak stabil.
>
> #### Proyek Eksplorasi Mandiri
> 1. Ukur konsumsi daya aplikasi mobile menggunakan Android Profiler atau Xcode Instruments. Bandingkan penggunaan energi antara aplikasi native vs hybrid dalam skenario yang sama.
> 2. Bangun aplikasi sederhana dengan tiga arsitektur berbeda (thin-client, thick-client, standalone). Analisis trade-off performa, konsumsi data, dan responsivitas.
>
> #### Bacaan Lanjutan
> - Roy Want. "An Introduction to Ubiquitous Computing" (IEEE Pervasive Computing)
> - Mahadev Satyanarayanan. "Mobile Computing: The Next Decade" (ACM SIGMOBILE)
> - Workshop on Mobile Computing Systems and Applications (HotMobile)
> - Dokumentasi Android Performance Tunung: https://developer.android.com/topic/performance