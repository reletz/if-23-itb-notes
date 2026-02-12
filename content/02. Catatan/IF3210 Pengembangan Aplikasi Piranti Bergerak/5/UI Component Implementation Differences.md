---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Mobile Application Development]]

> [!cornell] UI Component Implementation Differences
>
> > ## Questions/Cues
> >
> > - Perbedaan jenis tombol pada Android vs iOS?
> > - Bagaimana implementasi konten terenkapsulasi?
> > - Pendekatan input teks di kedua platform?
> > - Pola navigasi spesifik komponen UI?
> > - Konsep elevation vs blur effects?
> >
> > ## Reference Points
> >
> > - UI/UX Principles in Mobile Apps Development (Pages 8-11)
>
> > ### Perbedaan Implementasi Tombol
> >
> > Pada Material Design (Android), terdapat empat jenis tombol utama dengan tingkat penekanan berbeda:
> >
> > 1. **Text Button**: Tombol minimalis tanpa latar, digunakan untuk tindakan sekunder
> > 2. **Elevated Button**: Memiliki bayangan dan elevasi, untuk tindakan penting
> > 3. **Filled Button**: Tombol padat warna, untuk tindakan utama
> > 4. **Outlined Button**: Garis tepi dengan latar transparan, untuk tindakan penting tapi kurang menonjol
> >
> > Human Interface Guidelines (iOS) menggunakan pendekatan berbeda:
> >
> > - **System Button**: Tombol standar dengan teks atau ikon
> > - **Detail Disclosure Button**: Untuk menampilkan detail tambahan
> > - **Info Button**: Ikon 'i' lingkaran untuk informasi kontekstual
> >
> > Perbedaan filosofis: Android menekankan hierarki visual melalui variasi bentuk, sedangkan iOS lebih konsisten dengan fungsionalitas spesifik.
> >
> > Contoh implementasi: Di formulir Android, tombol "Submit" menggunakan Filled Button sedangkan "Batal" menggunakan Text Button. Di iOS, tombol "Edit" menggunakan System Button standar tanpa variasi bentuk ekstensif.
> >
> > ### Kartu vs Collection Views
> >
> > Material Design menggunakan **Card** sebagai wadah konten terstruktur:
> >
> > - Mengenkapsulasi gambar, teks, dan tombol aksi
> > - Memiliki bayangan untuk menunjukkan kedalaman (elevation)
> > - Contoh: Daftar produk di e-commerce Android
> >
> > iOS tidak memiliki komponen Card khusus tetapi mencapai fungsi serupa dengan **Collection Views**:
> >
> > - Mengatur item dalam grid atau layout fleksibel
> > - Menggunakan blur effect untuk lapisan tambahan
> > - Contoh: Galeri foto di aplikasi iOS
> >
> > Perbedaan utama: Android menggunakan komponen khusus dengan aturan desain ketat, sedangkan iOS mengandalkan komponen generik dengan konfigurasi fleksibel.
> >
> > ### Implementasi Field Teks
> >
> > Material Design menerapkan **TextField** dengan:
> >
> > - Label tetap di atas field
> > - Helper text di bawah untuk petunjuk
> > - Floating label saat aktif
> > - Error state dengan warna merah dan pesan
> >
> > Human Interface Guidelines menggunakan pendekatan minimalis:
> >
> > - Label terintegrasi dalam field (placeholder)
> > - Auto-correction dan prediksi teks bawaan
> > - Search field khusus dengan ikon pencarian
> >
> > Perbedaan krusial: Android menyediakan petunjuk konstan melalui helper text, sedangkan iOS mengandalkan placeholder yang menghilang saat input.
> >
> > ### Pola Navigasi Komponen Spesifik
> >
> > Material Design menggunakan **Navigation Drawer**:
> >
> > - Panel samping tersembunyi yang muncul dengan geser
> > - Menampilkan menu utama aplikasi
> > - Contoh: Menu profil di Gmail Android
> >
> > iOS mengimplementasikan **Tab Bar**:
> >
> > - Bar persisten di bawah layar
> > - Ikon dan teks untuk bagian utama
> > - Maksimal 5 item dengan penanda aktif
> >
> > Perbedaan interaksi: Drawer Android memerlukan gesture khusus, sedangkan Tab Bar iOS selalu terlihat dan mudah dijangkau ibu jari.

> [!cornell] #### Summary
>
> **Perbedaan implementasi komponen UI** antara Material Design dan HIG mencakup empat area utama: (1) **Tombol** di Android memiliki variasi hierarkis (Text, Elevated, Filled, Outlined) sedangkan iOS menggunakan tipe fungsional spesifik (System, Detail Disclosure); (2) **Konten terenkapsulasi** di Android menggunakan Card dengan shadow sedangkan iOS mengandalkan Collection Views dengan efek blur; (3) **Input teks** Android menyertakan label permanen dan helper text, berbeda dengan placeholder iOS yang menghilang; (4) **Pola navigasi** khusus Android menggunakan Navigation Drawer yang tersembunyi, kontras dengan Tab Bar iOS yang selalu terlihat. **Kunci perbedaan** terletak pada pendekatan hierarki visual vs konsistensi fungsional.

> [!ad-libitum]- Additional Information
>
> #### Teknik Implementasi Lanjutan
>
> **Customization Android:**
>
> - Membuat custom button dengan XML drawable
> - Mengatur elevation programmatically: `button.elevation = 8f`
> - Custom shape menggunakan MaterialShapeDrawable
>
> **Adaptif Layout iOS:**
>
> - Menggunakan UIStackView untuk tata letak responsif
> - Mengimplementasikan Dynamic Type untuk ukuran teks adaptif
> - Memanfaatkan trait collections untuk berbagai ukuran layar
>
> #### Edge Cases dan Solusi
>
> 1. **Multiline Text in Buttons:**
> - Android: Gunakan `android:lines="2"` dengan padding disesuaikan
> - iOS: Implementasikan UIButton subclass dengan titleLabel.lineBreakMode
> 2. **Accessibility Challenges:**
> - Contrast issues di Android dengan warna material: solusi dengan ThemeOverlay
> - VoiceOver di iOS untuk ikon abstrak: tambahkan accessibilityLabel deskriptif
>
> #### Self-Exploration Projects
>
> 1. **Comparative Component Library:**
> - Bangun komponen tombol/kartu yang sama di Android Studio dan Xcode
> - Bandingkan jumlah baris kode dan kompleksitas implementasi
> 2. **Behavior Testing:**
> - Uji responsivitas TextField saat rotasi layar di kedua platform
> - Ukur performa render Card vs Collection View dengan 100+ item
>
> #### Tools dan Resources
>
> - **Android:** Material Components for Android (GitHub)
> - **iOS:** UIKit Catalog (Apple Developer)
> - **Prototyping:** Figma Mobile Design Kits (Material & HIG versi)
>
> #### Further Reading
>
> - "Material Components Implementation Guide" (Android Developers)
> - "Human Interface Guidelines: Components" (Apple Developer Documentation)
> - "Cross-Platform UI Design Patterns" by UI Engineering Blog