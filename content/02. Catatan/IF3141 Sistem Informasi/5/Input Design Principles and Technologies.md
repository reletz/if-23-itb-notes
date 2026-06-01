---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Desain Sistem Informasi]]

> [!cornell] Input Design Principles and Technologies
>
> > ## Questions/Cues
> >
> > - Mengapa verifikasi penting dalam desain input?
> > - Bagaimana memilih teknologi input yang sesuai?
> > - Tahapan utama dalam proses input data?
> > - Perbedaan OCR, OMR, dan MICR?
> > - Prinsip minimasi data dalam desain input?
> >
> > ## Reference Points
> >
> > - IF3141 System Design (Slides 10-15)
> > - IF3141 System Design (Slide 44)
>
> > ### Definisi dan Tujuan Desain Input
> >
> > Desain input bertujuan menentukan cara sistem mengumpulkan data mentah (seperti formulir kertas atau database sistem pihak ketiga) dan mengubahnya ke format internal yang dapat dipahami sistem. Proses ini melibatkan konversi data dari berbagai sumber ke representasi biner (0 dan 1) yang digunakan komputer secara internal. Tujuan utamanya adalah memastikan akurasi, efisiensi, dan keandalan dalam pengumpulan data.
> >
> > Contoh penting: Sistem pembayaran digital mengonversi input nominal uang dari tombol-tombol antarmuka pengguna menjadi nilai biner untuk diproses oleh CPU. Kesalahan desain input dapat menyebabkan transaksi gagal atau salah jumlah.
> >
> > ### Tahapan Proses Input Data
> >
> > Terdapat enam tahap utama dalam proses input data:
> >
> > 1. **Pencatatan Awal**: Data diciptakan atau ditangkap di sumbernya (misal: formulir kertas atau sensor IoT).
> > 2. **Transmisi**: Data dikirim ke lokasi pengolahan (misal: melalui jaringan WiFi atau Bluetooth).
> > 3. **Transkripsi**: Konversi data ke format digital (contoh: operator memasukkan data formulir ke database).
> > 4. **Verifikasi**: Pemeriksaan kesalahan input dasar (contoh: memastikan tanggal lahir tidak mengandung huruf).
> > 5. **Validasi**: Pemeriksaan integritas data sesuai aturan bisnis (contoh: cek stok sebelum pemesanan).
> > 6. **Penyimpanan**: Penyimpanan data di media permanen (seperti database server atau cloud storage).
> >
> > Analogi: Proses input seperti mengisi dokumen imigrasi - data ditulis (pencatatan), diberikan ke petugas (transmisi), dipindai (transkripsi), diperiksa kelengkapannya (verifikasi), divalidasi kebenarannya (validasi), lalu diarsipkan (penyimpanan).
> >
> > ### Prinsip Panduan Desain Input
> >
> > Terdapat lima prinsip utama dalam desain input:
> >
> > 1. **Minimasi Pencatatan Data**: Hanya kumpulkan data esensial. Contoh: Formulir pendaftaran online hanya meminta email dan password wajib, data lain opsional.
> > 2. **Minimasi Transmisi Data**: Kurangi jarak pengiriman data. Contoh: Edge computing untuk olah data lokal di perangkat IoT.
> > 3. **Minimasi Transkripsi Data**: Otomatisasi konversi data. Contoh: Scanner barcode menggantikan input manual kode produk.
> > 4. **Verifikasi dan Validasi**: Gunakan teknik seperti double-keying (input ganda oleh operator berbeda) dan kode self-checking (kode dengan digit validasi).
> > 5. **Pemilihan Teknologi Tepat**: Pertimbangkan faktor biaya, kecepatan, dan akurasi. Contoh: Touchscreen cocok untuk restoran cepat saji yang perlu input cepat.
> >
> > ### Teknologi Input Umum
> >
> > Berbagai teknologi input beserta aplikasinya:
> >
> > - **Keyboard & Mouse**: Input teks dan navigasi standar untuk aplikasi desktop
> > - **Touchscreen**: Dominan di smartphone/tablet, cocok untuk interaksi langsung
> > - **Barcode Scanner**: Retail dan manajemen inventaris (contoh: scanner produk di supermarket)
> > - **OCR (Optical Character Recognition)**: Konversi teks tercetak ke digital (aplikasi: scan dokumen KTP)
> > - **OMR (Optical Mark Recognition)**: Deteksi tanda pada formulir (contoh: lembar jawaban ujian)
> > - **MICR (Magnetic Ink Character Recognition)**: Pengenalan karakter tinta magnetik di cek bank
> > - **RFID**: Pelacakan aset tanpa kontak (contoh: sistem parkir nirkabel)
> > - **Pengenalan Suara**: Asisten virtual seperti Siri/Alexa menggunakan teknologi ini
> >
> > Perbandingan teknologi: OCR membutuhkan kualitas gambar baik untuk akurasi tinggi, sedangkan RFID bekerja tanpa line-of-sight tetapi lebih mahal.
> >
> > ### Antarmuka Pengguna Input
> >
> > Empat model antarmuka input utama:
> >
> > 1. **Menu**: Hierarki pilihan terstruktur (contoh: ATM bank)
> > 2. **Pengisian Formulir**: Field terdefinisi jelas (contoh: pendaftaran akun e-commerce)
> > 3. **Bahasa Perintah**: Instruksi tekstual (contoh: query SQL atau command prompt)
> > 4. **Tanya-Jawab**: Interaksi langkah-demi-langkah (contoh: chatbot customer service)
> >
> > Prinsip usability: Formulir harus memiliki label jelas, placeholder text, dan validasi real-time. Contoh buruk: Form tanpa indikator wajib diisi menyebabkan pengguna lupa mengisi field penting.

> [!cornell] #### Summary
>
> **Desain input** merupakan proses kritis dalam pengembangan sistem yang fokus pada **akuisisi data akurat** melalui teknologi tepat. Prosesnya melibatkan enam tahap berurutan dari pencatatan hingga penyimpanan, dengan prinsip utama **minimasi data** dan **verifikasi-validasi ganda**. Pemilihan teknologi (seperti OCR, RFID, atau touchscreen) harus mempertimbangkan **konteks pengguna**, **biaya**, dan **kecepatan input**. Antarmuka yang dirancang baik (formulir, menu, dll) meningkatkan **kepatuhan pengguna** dan **akurasi data**, sementara kegagalan desain dapat menyebabkan **kesalahan sistem** dan **biaya perbaikan tinggi**.

> [!ad-libitum]- Additional Information
>
> #### Analisis Biaya-Manfaat Teknologi Input
>
> Pemilihan teknologi input memerlukan analisis ROI mendalam. Scanner barcode memiliki biaya awal Rp 5-10 juta per unit tetapi mengurangi kesalahan input hingga 99% dibanding manual entry. Sistem RFID lebih mahal (Rp 15-50 juta) namun cocok untuk lingkungan dengan throughput tinggi seperti logistik. Kalkulasi break-even point perlu mempertimbangkan volume transaksi harian dan biaya kesalahan data.
>
> #### Studi Kasus: Implementasi OCR di Perbankan
>
> Bank XYZ mengimplementasikan OCR untuk proses KYC (Know Your Customer), mengurangi waktu proses dari 2 hari menjadi 15 menit. Teknologi ini menggunakan CNN (Convolutional Neural Network) dengan akurasi 98,7% pada dataset 500.000 gambar KTP. Tantangan utama: handling gambar buram dan tanda air pada dokumen.
>
> #### Tren Teknologi Input Masa Depan
>
> 1. **Computer Vision**: Deteksi objek cerdas untuk input visual (contoh: sistem inventaris otomatis)
> 2. **Gesture Recognition**: Kontrol sistem melalui gerakan tubuh (aplikasi: augmented reality)
> 3. **BCI (Brain-Computer Interface)**: Teknologi eksperimental untuk input langsung dari sinyal otak
> 4. **Haptic Feedback**: Pengembangan touchscreen dengan respon taktil untuk input lebih presisi
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Bangun sistem input formulir dengan validasi real-time menggunakan HTML5, JavaScript, dan regex
> 2. Eksperimen dengan library Tesseract.js untuk OCR dokumen sederhana
> 3. Bandingkan akurasi input suara menggunakan Google Speech API vs Mozilla DeepSpeech
>
> #### Alat dan Framework
>
> - **OCR**: Tesseract (Open Source), Google Cloud Vision API
> - **Barcode**: ZXing (Zebra Crossing) Library
> - **Form Validation**: jQuery Validation Plugin, Formik untuk React
> - **Pengenalan Suara**: Mozilla DeepSpeech, Web Speech API
>
> #### Bacaan Lanjut
>
> - Shneiderman, B. (2016). "Designing the User Interface: Strategies for Effective Human-Computer Interaction" (Bab 8: Input Devices)
> - Norman, D. A. (2013). "The Design of Everyday Things" (Bab 5: Human Error? No, Bad Design)
> - Dokumentasi Google Material Design: Input Controls Guidelines
> - Kursus Coursera: "UI/UX Design Specialization" oleh CalArts
> - Research Paper: "Comparative Study of Input Methods for Touchscreen Devices" (ACM Transactions)