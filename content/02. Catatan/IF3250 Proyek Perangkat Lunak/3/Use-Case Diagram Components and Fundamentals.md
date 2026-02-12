---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF2150 - Pemodelan Berbasis Skenario]]

> [!cornell] Use-Case Diagram Components and Fundamentals
>
> > ## Questions/Cues
> >
> > - Apa ciri-ciri utama aktor dalam use-case diagram?
> > - Bagaimana membedakan use-case yang valid dan tidak valid?
> > - Mengapa deskripsi use-case diperlukan selain diagram?
> > - Peran paket dalam pengorganisasian use-case
> > - Langkah sistematis membangun model use-case
> >
> > ## Reference Points
> >
> > - SCENARIO BASED MODELING REVIEW (Halaman 2-27)
>
> > ### Definisi dan Tujuan Diagram Use-Case
> >
> > Diagram use-case merupakan alat visual dalam rekayasa perangkat lunak yang menggambarkan interaksi antara sistem dengan entitas eksternal (aktor). Menurut Ivar Jacobson, use-case berfungsi untuk "mendefinisikan apa yang ada di luar sistem (aktor) dan apa yang harus dilakukan oleh sistem (use-case)".
> >
> > Diagram ini bertindak sebagai jembatan komunikasi antara pengguna dan pengembang, memvisualisasikan fungsi sistem dari perspektif pengguna akhir. Contoh penerapannya adalah dalam sistem akademik seperti SIKAD, di mana mahasiswa berinteraksi dengan fitur pengambilan mata kuliah.
> >
> > ### Karakteristik dan Jenis Aktor
> >
> > Aktor merepresentasikan entitas eksternal yang berinteraksi dengan sistem, tetapi bukan bagian dari sistem itu sendiri. Terdapat tiga jenis aktor utama:
> >
> > 1. **Aktor Aktif**: Secara langsung memulai interaksi dengan sistem (contoh: mahasiswa menginput FRS)
> > 2. **Aktor Pasif**: Hanya menerima informasi dari sistem (contoh: penerima laporan bulanan)
> > 3. **Aktor Sistem**: Sistem eksternal yang terintegrasi (contoh: gateway pembayaran)
> >
> > Analogi aktor seperti pelanggan di restoran: mereka memesan makanan (interaksi aktif), menerima makanan (interaksi pasif), namun bukan bagian dari dapur restoran (sistem). Setiap aktor harus memiliki nama yang merefleksikan peran semantiknya (misal: "Mahasiswa" bukan "Pengguna").
> >
> > ### Struktur dan Kriteria Use-Case
> >
> > Use-case merepresentasikan urutan aksi yang memberikan nilai tambah kepada aktor. Untuk dikategorikan valid, use-case harus memenuhi kriteria:
> >
> > - **Kompleks**: Mewakili alur pekerjaan lengkap (misal: "Ambil Mata Kuliah" bukan "Klik Tombol Simpan")
> > - **Bernilai Bisnis**: Memberikan hasil yang berarti bagi aktor (misal: "Cetak Transkrip" memberikan dokumen resmi)
> > - **Terukur**: Memiliki titik awal dan akhir yang jelas (trigger dan hasil akhir)
> >
> > Contoh use-case tidak valid: "Login Sistem" karena tidak memberikan nilai bisnis mandiri, sebaiknya bagian dari use-case lebih besar seperti "Ajukan Usulan Mata Kuliah".
> >
> > ### Deskripsi dan Diagram Pendukung
> >
> > Deskripsi use-case merupakan narasi pendek (2-3 baris) yang menjelaskan:
> >
> > - Tujuan aktor
> > - Urutan interaksi utama
> > - Hasil yang diharapkan
> >
> > Untuk use-case kompleks, digunakan diagram pendukung:
> >
> > 1. **Diagram Statechart**: Memetakan keadaan sistem (state) selama eksekusi use-case
> > 2. **Diagram Aktivitas**: Menunjukkan urutan aksi sistem dan aktor
> > 3. **Diagram Interaksi**: Memvisualisasikan pertukaran pesan antar objek
> >
> > Contoh: Use-case "Pembayaran UKT" dapat dilengkapi diagram aktivitas yang menunjukkan urutan verifikasi data, konfirmasi pembayaran, dan generasi kuitansi.
> >
> > ### Penggunaan Paket dalam Organisasi Use-Case
> >
> > Paket digunakan untuk mengelompokkan use-case yang terkait secara fungsional atau bisnis. Manfaat utamanya:
> >
> > - **Modularitas**: Memisahkan fitur inti dengan modul tambahan (misal: paket "Akademik" vs "Keuangan")
> > - **Manajemen Kompleksitas**: Membagi sistem besar menjadi subsistem yang lebih kecil
> > - **Paralelisasi Pengembangan**: Memungkinkan kerja tim paralel pada paket berbeda
> >
> > Contoh implementasi: Sistem ERP kampus menggunakan paket terpisah untuk "Registrasi Mahasiswa", "Penilaian Akademik", dan "Pengelolaan Keuangan".
> >
> > ### Metodologi Pemodelan Berbasis Skenario
> >
> > Proses sistematis membangun diagram use-case:
> >
> > 1. **Identifikasi Aktor**: Tentukan semua entitas eksternal yang berinteraksi (manusia, sistem, perangkat)
> > 2. **Identifikasi Use-Case**: Daftar fungsi utama sistem dari perspektif aktor (gunakan kata kerja)
> > 3. **Konstruksi Diagram**: Hubungkan aktor dengan use-case terkait menggunakan garis asosiasi
> > 4. **Pengembangan Skenario**: Buat narasi interaksi untuk setiap use-case (alur normal dan alternatif)
> >
> > Contoh praktis: Untuk sistem perpustakaan, identifikasi aktor "Anggota", "Pustakawan", "Sistem Katalog Eksternal", lalu definisikan use-case seperti "Pinjam Buku", "Perpanjang Masa Pinjam", dan "Cari Katalog".

> [!cornell] #### Summary
>
> **Diagram use-case** merupakan alat fundamental dalam rekayasa perangkat lunak yang memvisualisasikan interaksi antara **aktor** (entitas eksternal) dan **use-case** (fungsi sistem). Setiap use-case harus merepresentasikan **alur kerja lengkap** yang memberikan nilai bisnis, didukung oleh **deskripsi tekstual** dan **diagram pendukung** seperti aktivitas atau statechart. Penggunaan **paket** membantu mengelola kompleksitas sistem besar dengan mengelompokkan use-case terkait. Proses pemodelan yang efektif dimulai dari identifikasi aktor dan use-case secara sistematis, dilanjutkan dengan konstruksi diagram dan pengembangan skenario terstruktur.

> [!ad-libitum]- Additional Information
>
> #### Analisis Kompleksitas Use-Case
>
> Kompleksitas use-case dapat diukur menggunakan metrik:
>
> - **Jumlah Skenario Alternatif**: Setiap cabang logika menambah kompleksitas
> - **Kopling antar Use-Case**: Ketergantungan tinggi antar use-case meningkatkan risiko perubahan kaskade
> - **Kohesi Fungsional**: Use-case dengan tujuan tunggal lebih mudah dikelola
>
> Studi kasus menunjukkan sistem dengan >20 use-case memerlukan teknik modularisasi seperti paket untuk mempertahankan maintainability.
>
> #### Best Practice Penamaan Use-Case
>
> Konvensi penamaan efektif:
>
> - Gunakan format [Kata Kerja] + [Objek] ("Ajukan Proposal Penelitian")
> - Hindari istilah teknis dalam nama ("Execute SQL Query" → "Generate Laporan")
> - Gunakan tata bahasa aktif ("Mahasiswa Memilih Mata Kuliah")
>
> Penelitian oleh Overgaard & Palmkvist menunjukkan penamaan sesuai domain bisnis meningkatkan pemahaman pemangku kepentingan sebesar 40%.
>
> #### Studi Kasus Implementasi Nyata
>
> Sistem Tiket Kereta Api Indonesia:
>
> - **Aktor Utama**: Penumpang, Agen Perjalanan, Sistem Pembayaran Bank
> - **Use-Case Kritis**: Pesan Tiket, Batalkan Pemesanan, Cetak E-Tiket
> - **Kompleksitas**: Rata-rata 5 skenario alternatif per use-case (overbooking, pembayaran gagal, dll)
>
> Analisis kegagalan menunjukkan 70% masalah berasal dari use-case yang tidak lengkap dalam menangani edge case.
>
> #### Tools Pemodelan UML Profesional
>
> 1. Enterprise Architect: Fitur lanjut untuk generate code dari use-case
> 2. Visual Paradigm: Kolaborasi tim real-time dengan version control
> 3. PlantUML: Bahasa markup untuk diagram berbasis teks
> 4. Lucidchart: Solusi cloud dengan template industri
>
> #### Self-Exploration Projects
>
> 1. Bangun model use-case untuk aplikasi e-commerce lokal dengan kriteria:
> - Minimal 5 aktor berbeda
> - 10 use-case inti
> - 3 paket fungsional
> 2. Analisis diagram use-case aplikasi Gojek/Bukalapak, identifikasi:
> - Pola umum struktur use-case
> - Kesesuaian nama use-case dengan best practice
> - Keterbacaan diagram untuk non-teknis
>
> #### Further Reading
>
> - Jacobson, I., et al. "Object-Oriented Software Engineering: A Use Case Driven Approach"
> - Larman, C. "Applying UML and Patterns: An Introduction to Object-Oriented Analysis and Design"
> - Dokumentasi UML Resmi: https://www.omg.org/spec/UML/
> - Studi Kasus UML Industri: https://www.uml-diagrams.org/use-case-diagrams-examples.html